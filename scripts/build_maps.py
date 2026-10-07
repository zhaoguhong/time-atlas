"""Build attributed, global historical maps from the original Cliopatria data.

The downloaded source is cached (not committed); published derivatives and their
SHA-256 provenance manifest and lossless packs are committed so the app needs
no live data service. Run npm run data:pack after this importer.
"""
from pathlib import Path
from collections import Counter
import hashlib
import io
import json
import urllib.request
import zipfile
from shapely.geometry import shape, mapping, box

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data' / 'raw'
OUT = ROOT / 'public' / 'data'
ARCHIVES = ROOT / '.cache' / 'map-archives'
ARCHIVES.mkdir(parents=True, exist_ok=True)
RAW.mkdir(parents=True, exist_ok=True)
(OUT / 'maps').mkdir(parents=True, exist_ok=True)
LOCK = json.loads((ROOT / 'data' / 'sources.lock.json').read_text(encoding='utf-8'))
SOURCES = {source['filename']: source for source in LOCK['sources']}
DETAIL_REGION = box(40, -12, 150, 65)
REGION = box(-180, -85, 180, 85)
EPOCHS = [
    ('prehistory', -10000, -4001), ('early-civilizations', -4000, -2071),
    ('xia', -2070, -1601), ('shang', -1600, -1047),
    ('western-zhou', -1046, -771), ('spring', -770, -476),
    ('warring', -475, -222), ('qin', -221, -207), ('han', -206, 219),
    ('three', 220, 280), ('jin', 281, 420), ('north-south', 421, 580),
    ('sui', 581, 617), ('tang', 618, 906), ('five', 907, 959),
    ('song', 960, 1278), ('yuan', 1279, 1367), ('ming', 1368, 1643),
    ('qing', 1644, 1912),
]
ZH = {
    'Shang Dynasty': '商（来源推定）', 'Zhou Dynasty': '周（来源推定）',
    'Middle Kingdom of Egypt': '埃及中王国', 'New Kingdom of Egypt': '埃及新王国',
    'Roman Republic': '罗马共和国', 'Western Roman Empire': '西罗马帝国',
    'Achaemenid Empire': '阿契美尼德帝国', 'Kingdom of England': '英格兰王国',
    'United Kingdom': '英国', 'United States of America': '美国',
    'Kingdom of France': '法兰西王国', 'France': '法国', 'Spanish Empire': '西班牙帝国',
    'Kingdom of Spain': '西班牙王国', 'Kingdom of Portugal': '葡萄牙王国',
    'Inca Empire': '印加帝国', 'Aztec Empire': '阿兹特克帝国',
    'Kingdom of Kongo': '刚果王国', 'Kingdom of Aksum': '阿克苏姆王国',
    'Mali Empire': '马里帝国', 'Songhai Empire': '桑海帝国',
    'Zhou': '周', 'Jin': '晋', 'Qin': '秦', 'Qi': '齐', 'Chu': '楚',
    'Yan': '燕', 'Zhao': '赵', 'Wei': '魏', 'Han': '韩', 'Song': '宋',
    'Wu': '吴', 'Yue': '越', 'Lu': '鲁', 'Zheng': '郑', 'Zhongshan': '中山',
    'Qin Dynasty': '秦朝', 'Han Dynasty': '汉朝', 'Xin Dynasty': '新朝',
    'Eastern Wu': '吴', 'Shu Han': '蜀汉', 'Cao Wei': '曹魏',
    'Western Jin': '西晋', 'Eastern Jin': '东晋', 'Jin Dynasty': '晋朝',
    'Cheng Han': '成汉', 'Former Zhao': '前赵', 'Later Zhao': '后赵',
    'Former Qin': '前秦', 'Later Qin': '后秦', 'Western Qin': '西秦',
    'Former Yan': '前燕', 'Later Yan': '后燕', 'Southern Yan': '南燕',
    'Northern Yan': '北燕', 'Xia': '夏', 'Former Liang': '前凉',
    'Later Liang': '后凉', 'Northern Liang': '北凉', 'Southern Liang': '南凉',
    'Western Liang': '西凉', 'Northern Wei': '北魏', 'Eastern Wei': '东魏',
    'Western Wei': '西魏', 'Northern Qi': '北齐', 'Northern Zhou': '北周',
    'Liu Song Dynasty': '刘宋', 'Southern Qi': '南齐', 'Liang Dynasty': '梁',
    'Chen Dynasty': '陈', 'Sui Dynasty': '隋朝', 'Tang Dynasty': '唐朝',
    'Later Liang Dynasty': '后梁', 'Later Tang': '后唐', 'Later Jin': '后晋',
    'Later Han': '后汉', 'Later Zhou': '后周', 'Former Shu': '前蜀',
    'Later Shu': '后蜀', 'Wuyue': '吴越', 'Southern Wu': '吴',
    'Southern Tang': '南唐', 'Southern Han': '南汉', 'Jingnan': '荆南',
    'Min': '闽', 'Ma Chu': '楚', 'Northern Han': '北汉',
    'Former Jin': '晋', 'Northern Song': '北宋', 'Southern Song': '南宋',
    'Liao Dynasty': '辽', 'Western Xia': '西夏', 'Great Jin': '金',
    'Mongol Empire': '蒙古帝国', 'Yuan Dynasty': '元朝',
    'Ming Dynasty': '明朝', 'Southern Ming': '南明', 'Qing Dynasty': '清朝',
    'Later Jin Dynasty': '后金', 'Northern Yuan': '北元',
    'Xiongnu': '匈奴', 'Southern Xiongnu': '南匈奴', 'Xianbei': '鲜卑',
    'Rouran Khaganate': '柔然', 'Göktürk Khaganate': '突厥',
    'Turks': '突厥诸部', 'Eastern Turkic Khaganate': '东突厥',
    'Western Turkic Khaganate': '西突厥', 'Uyghur Khaganate': '回鹘',
    'Tibetan Empire': '吐蕃', 'Tibetans': '吐蕃诸部', 'Tibet': '西藏诸政权',
    'Nanzhao': '南诏', 'Kingdom of Dali': '大理',
    'Goguryeo': '高句丽', 'Gojoseon': '古朝鲜', 'Korean Jin': '辰国',
    'Baekje': '百济', 'Silla': '新罗', 'Balhae': '渤海', 'Goryeo': '高丽',
    'Joseon': '朝鲜', 'Mahan': '马韩', 'Jinhan': '辰韩', 'Byeonhan': '弁韩',
    'Asuka Japan': '日本 · 飞鸟时代', 'Nara Japan': '日本 · 奈良时代',
    'Heian Japan': '日本 · 平安时代', 'Kamakura Shogunate': '镰仓幕府',
    'Muromachi Shogunate': '室町幕府', 'Warring States Japan': '日本 · 战国时代',
    'Tokugawa Shogunate': '江户幕府', 'Empire of Japan': '日本',
    'Wusun': '乌孙', 'Great Yuan': '大宛', 'Kangju': '康居',
    'Yuezhi': '月氏', 'Kushan Empire': '贵霜', 'Parthian Empire': '安息',
    'Sasanian Empire': '萨珊波斯', 'Sassanid Empire': '萨珊波斯',
    'Maurya Empire': '孔雀王朝', 'Gupta Empire': '笈多王朝',
    'Delhi Sultanate': '德里苏丹国', 'Mughal Empire': '莫卧儿帝国',
    'Roman Empire': '罗马帝国', 'Eastern Roman Empire': '东罗马帝国',
    'Abbasid Caliphate': '阿拔斯王朝', 'Umayyad Caliphate': '倭马亚王朝',
    'Kara-Khanids': '喀喇汗王朝', 'Kara-Khitai': '西辽',
    'Ilkhanate': '伊儿汗国', 'Chagatai Khanate': '察合台汗国',
    'Golden Horde': '金帐汗国', 'Timurid Empire': '帖木儿帝国',
    'Dzungar Khanate': '准噶尔', 'Kazakh Khanate': '哈萨克汗国',
    'Mongol Khanate': '蒙古诸部', 'Khoshut Khanate': '和硕特汗国',
    'Safavid Empire': '萨法维王朝', 'Ottoman Empire': '奥斯曼帝国',
    'Dai Viet': '大越', 'Dai Co Viet': '大瞿越', 'Champa': '占城',
    'Khmer Empire': '高棉帝国', 'Ayutthaya Kingdom': '阿瑜陀耶',
    'Kingdom of Tungning': '东宁', 'Taiping Heavenly Kingdom': '太平天国',
    'Republic of China': '中华民国', 'Russian Empire': '俄罗斯帝国',
}
COLORS = ['#87a49a', '#c9b383', '#ad9dad', '#97acba', '#bea393', '#a7b487', '#c49c9c', '#b1b8ac']
SPECIAL = {'Cao Wei': '#91adb3', 'Shu Han': '#9bab83', 'Eastern Wu': '#d0b27f',
           'Han Dynasty': '#b5a280', 'Tang Dynasty': '#cba388',
           'Ming Dynasty': '#a6b798', 'Qing Dynasty': '#9aacb3',
           'Northern Song': '#9eb795', 'Southern Song': '#9eb795',
           'Great Jin': '#c3ad8c', 'Yuan Dynasty': '#ada4bd'}

def download(filename):
    source = SOURCES[filename]
    path = RAW / filename
    if not path.exists():
        print('Downloading', filename, flush=True)
        request = urllib.request.Request(source['url'], headers={'User-Agent': 'TimeAtlas/0.1 (+research)'})
        with urllib.request.urlopen(request, timeout=120) as res:
            path.write_bytes(res.read())
    content = path.read_bytes()
    if hashlib.sha256(content).hexdigest() != source['sha256']:
        raise ValueError(f'{filename}: SHA-256 differs from data/sources.lock.json')
    return content

def dump(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

def rounded(value):
    if isinstance(value, (list, tuple)):
        return [rounded(v) for v in value]
    return round(value, 4) if isinstance(value, float) else value

def geometry_json(geom):
    result = dict(mapping(geom))
    result['coordinates'] = rounded(result['coordinates'])
    return result

source_url = SOURCES['cliopatria.geojson.zip']['url']
blob = download('cliopatria.geojson.zip')
with zipfile.ZipFile(io.BytesIO(blob)) as archive:
    name = next(n for n in archive.namelist() if n.endswith('.geojson'))
    original = json.loads(archive.read(name))

maps = {epoch[0]: [] for epoch in EPOCHS}
names = Counter()
for i, feature in enumerate(original['features']):
    p = feature['properties']
    start, end = p['FromYear'], p['ToYear']
    if p['Type'] != 'POLITY' or end < -10000 or start > 1912:
        continue
    geom = shape(feature['geometry'])
    if geom.is_empty or not geom.intersects(REGION):
        continue
    if not geom.is_valid:
        geom = geom.buffer(0)
    # Preserve full global outlines, with more detail around China.
    tolerance = 0.035 if geom.intersects(DETAIL_REGION) else 0.09
    geom = geom.intersection(REGION).simplify(tolerance, preserve_topology=True)
    if geom.is_empty or geom.geom_type not in ['Polygon', 'MultiPolygon']:
        continue
    label = geom.representative_point()
    name = p['Name']
    digest = int(hashlib.sha256(name.encode()).hexdigest()[:8], 16)
    properties = {
        'id': f'cp-{i}', 'name': name, 'nameZh': ZH.get(name, name),
        'from': start, 'to': end, 'color': SPECIAL.get(name, COLORS[digest % len(COLORS)]),
        'label': [round(label.x, 4), round(label.y, 4)],
        'area': round(geom.area, 2), 'source': 'cliopatria',
        'wikidata': p.get('Wikidata', ''),
        'wikipedia': p.get('Wikipedia', ''),
    }
    item = {'type': 'Feature', 'id': properties['id'], 'properties': properties, 'geometry': geometry_json(geom)}
    for epoch_id, lo, hi in EPOCHS:
        if start <= hi and end >= lo:
            maps[epoch_id].append(item)
    names[name] += 1

manifest = {'region': [-180, -85, 180, 85], 'detailRegion': [40, -12, 150, 65], 'range': [-10000, 1912], 'downloadedAt': LOCK['acquiredAt'],
            'source': source_url, 'sha256': hashlib.sha256(blob).hexdigest(),
            'attribution': 'Cliopatria / Seshat Global History Databank; editors Ed Chalstrey, James Bennett and Erin Mutch, and contributors.',
            'licenseUrl': 'https://creativecommons.org/licenses/by/4.0/',
            'license': 'CC-BY-4.0', 'sourceRecords': len(original['features']),
            'processedRecords': sum(names.values()),
            'transformations': 'POLITY rows only; global bounds clipped only at Mercator polar limits; topology-preserving simplification at 0.035 degrees for records intersecting the detail region, 0.09 elsewhere; rounded to 4 decimal places. Original temporal intervals retained.',
            'epochs': []}
for epoch_id, lo, hi in EPOCHS:
    output = ARCHIVES / f'{epoch_id}.geojson'
    dump(output, {'type': 'FeatureCollection', 'features': maps[epoch_id]})
    manifest['epochs'].append({'id': epoch_id, 'from': lo, 'to': hi, 'records': len(maps[epoch_id]), 'bytes': output.stat().st_size})
    # Browser requests only an 20-year window, avoiding a 25 MB Qing payload.
    ordinal = lambda year: year - 1 if year > 0 else year
    year_of = lambda value: value + 1 if value >= 0 else value
    chunks = []
    (OUT / 'maps' / epoch_id).mkdir(exist_ok=True)
    for index, begin in enumerate(range(ordinal(lo), ordinal(hi) + 1, 20)):
        a, b = year_of(begin), year_of(min(begin + 19, ordinal(hi)))
        features = [f for f in maps[epoch_id] if f['properties']['from'] <= b and f['properties']['to'] >= a]
        chunk = OUT / 'maps' / epoch_id / f'{index}.geojson'
        dump(chunk, {'type': 'FeatureCollection', 'features': features})
        chunks.append({'file': f'{epoch_id}/{index}.geojson', 'from': a, 'to': b, 'records': len(features), 'bytes': chunk.stat().st_size, 'sha256': hashlib.sha256(chunk.read_bytes()).hexdigest()})
    manifest['epochs'][-1]['chunks'] = chunks
    print(epoch_id, len(maps[epoch_id]), output.stat().st_size, flush=True)

natural_sources = []
for layer in ['land', 'lakes', 'rivers_lake_centerlines']:
    filename = f'ne_50m_{layer}.geojson'
    url = SOURCES[filename]['url']
    raw = download(filename)
    collection = json.loads(raw)
    features = []
    for feature in collection['features']:
        geom = shape(feature['geometry'])
        if layer != 'land' and not geom.intersects(REGION):
            continue
        if not geom.is_valid:
            geom = geom.buffer(0)
        geom = geom.simplify(0.035, preserve_topology=True)
        if geom.is_empty:
            continue
        features.append({'type': 'Feature', 'properties': {}, 'geometry': geometry_json(geom)})
    dump(OUT / f'{layer}.geojson', {'type': 'FeatureCollection', 'features': features})
    natural_sources.append({'layer': layer, 'url': url, 'sha256': hashlib.sha256(raw).hexdigest(), 'license': 'Public domain'})
manifest['naturalEarth'] = natural_sources
dump(OUT / 'provenance.json', manifest)
print('Built global maps:', sum(names.values()), 'records;', len(names), 'polities')

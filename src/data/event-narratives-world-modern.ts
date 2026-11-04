import type { HistoryEvent, Source } from '../types'

const sourcesById: Record<string, Source[]> = {
  'depth-bank-france': [
    {
      title: 'Banque de France · L’histoire de la Banque de France',
      url: 'https://www.banque-france.fr/fr/banque-de-france/institution-ancree-histoire/histoire-banque-de-france',
      note: '1800—1806、1806—1870小节，区分成立与发行特权。',
    },
  ],
  'world-louisiana-purchase': [
    {
      title: '美国国家档案馆 · Louisiana Purchase Treaty (1803)',
      url: 'https://www.archives.gov/milestone-documents/louisiana-purchase-treaty',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-sokoto-reform': [
    {
      title:
        'Oxford Research Encyclopedia · Slavery and the Slave Trade in the Sokoto Caliphate（作者摘要）',
      url: 'https://academic.oup.com/edited-volume/61663/chapter-abstract/553500140?login=false',
      note: '依据作者公开摘要核实基础事实；不声称已读取付费全文。',
    },
    {
      title: 'Getty 地名词表 · Sokoto（7000538）',
      url: 'https://www.getty.edu/vow/TGNFullDisplay?english=Y&find=&nation=Nigeria&place=&subjectid=7000538',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-napoleon-empire': [
    {
      title: '拿破仑基金会 · The proclamation of Empire, 18 May 1804',
      url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-proclamation-of-empire/',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-napoleonic-civil-code': [
    {
      title: '拿破仑基金会 · The masses of granite: The Civil Code',
      url: 'https://www.napoleon.org/en/young-historians/napodoc/les-masses-de-granit-de-nouvelles-institutions-napoleoniennes',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-hegel-phenomenology': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Georg Wilhelm Friedrich Hegel',
      url: 'https://plato.stanford.edu/entries/hegel/',
      note: '第1节明确1806年底完成、1807年出版；第3.1.1节分析《精神现象学》。',
    },
  ],
  'world-slave-trade-abolition': [
    {
      title: 'UK Parliament · Parliament abolishes the slave trade',
      url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/tradeindustry/slavetrade/overview/parliament-abolishes-the-slave-trade/',
      note: '1807年法案提出及通过过程；禁止贸易与废除奴隶制度有别。',
    },
  ],
  'depth-faust-one': [
    {
      title: 'University of Göttingen · Goethe: Faust I (1808)',
      url: 'https://www.uni-goettingen.de/de/703224.html',
      note: '作品书目与教学介绍，明确第一部1808年。',
    },
  ],
  'world-spanish-america': [
    {
      title: 'OpenStax · World History 2 · 8-3-spanish-south-america',
      url: 'https://openstax.org/books/world-history-volume-2/pages/8-3-spanish-south-america',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-mexican-independence': [
    {
      title: '墨西哥国家档案馆 · Documentos de la consumación de la Independencia de México',
      url: 'https://www.gob.mx/agn/articulos/archivisticaclio-documentos-de-la-consumacion-de-la-independencia-de-mexico?idiom=es',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-hawaiian-kingdom': [
    {
      title: '美国国务院历史办公室 · Hawaii: Recognition and Diplomatic Relations',
      url: 'https://history.state.gov/countries/hawaii',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-vienna': [
    {
      title:
        'OpenStax · World History 2 · 7-4-nationalism-liberalism-conservatism-and-the-political-order',
      url: 'https://openstax.org/books/world-history-volume-2/pages/7-4-nationalism-liberalism-conservatism-and-the-political-order',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-waterloo': [
    {
      title: '英国国家陆军博物馆 · Battle of Waterloo',
      url: 'https://www.nam.ac.uk/explore/battle-waterloo',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-schopenhauer-world': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Arthur Schopenhauer',
      url: 'https://plato.stanford.edu/entries/schopenhauer/',
      note: '第1节 Life 明确1818年12月刊行及题年1819；第4—5节讨论意志与超越冲突的方式。',
    },
  ],
  'world-zulu-consolidation': [
    {
      title: '南非政府 · History',
      url: 'https://www.gov.za/about-sa/history',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-greek-independence': [
    {
      title:
        'OpenStax · World History 2 · Nationalism, Liberalism, Conservatism, and the Political Order',
      url: 'https://openstax.org/books/world-history-volume-2/pages/7-4-nationalism-liberalism-conservatism-and-the-political-order',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'depth-british-gold-resumption': [
    {
      title: 'Bank of England · History',
      url: 'https://www.bankofengland.co.uk/about/history',
      note: 'Restriction Period (1797—1821)与gold standard说明，区分暂停及恢复。',
    },
  ],
  'world-brazil': [
    {
      title: 'OpenStax · World History 2 · 8-4-portuguese-south-america',
      url: 'https://openstax.org/books/world-history-volume-2/pages/8-4-portuguese-south-america',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-monroe-doctrine': [
    {
      title: '美国国家档案馆 · Monroe Doctrine (1823)',
      url: 'https://www.archives.gov/milestone-documents/monroe-doctrine',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-ayacucho': [
    {
      title: 'OpenStax · World History 2 · 8-3-spanish-south-america',
      url: 'https://openstax.org/books/world-history-volume-2/pages/8-3-spanish-south-america',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'category-beethoven-ninth': [
    {
      title: '维也纳爱乐乐团 · 第九交响曲首演二百周年展',
      url: 'https://www.wienerphilharmoniker.at/en/orchestra/exhibitions/exhibition1',
      note: '展览开篇确认1824年5月7日及Kärntnertor Theater首演地点。',
    },
  ],
  'world-java-war': [
    {
      title: 'UNESCO · The Netherlands: Museums confront the country’s colonial past',
      url: 'https://www.unesco.org/en/articles/netherlands-museums-confront-countrys-colonial-past-0',
      note: 'An Indonesian hero’s dagger returned小节，明确1825—1830年战争及藏品背景。',
    },
    {
      title: 'UNESCO · Babad Diponegoro nomination',
      url: 'https://media.unesco.org/sites/default/files/webform/mow001/indonesia_netherlands_babad_diponegoro.pdf',
      note: '申报材料第6页，战争年代、流放与纪事成书时间。',
    },
  ],
  'category-hokusai': [
    {
      title: '大都会艺术博物馆 · The Great Wave: Anatomy of an Icon',
      url: 'https://www.metmuseum.org/essays/hokusai-great-wave',
      note: '开篇记1831年系列广告；图录断代约1830—1832年，并介绍普鲁士蓝和印刷。',
    },
  ],
  'depth-faraday-induction': [
    {
      title: 'Royal Institution · Michael Faraday’s generator',
      url: 'https://www.rigb.org/explore-science/explore/collection/michael-faradays-generator',
      note: '1831年8月发现与10月装置记录，区别基础实验和后续工程应用。',
    },
  ],
  'world-slavery-abolition-act': [
    {
      title: 'UK Parliament · The Transatlantic Slave Trade',
      url: 'https://heritagecollections.parliament.uk/stories/the-transatlantic-slave-trade/',
      note: 'Slavery Abolition Act, 1833小节，生效年份、赔偿与学徒制；学徒制1838年结束另见议会研究报告。',
    },
    {
      title: 'House of Commons Library · The public finances: a historical overview',
      url: 'https://researchbriefings.files.parliament.uk/documents/CBP-8265/CBP-8265.pdf',
      note: '2.4 Abolition of slavery，1834年实施、1838年完全结束学徒制及赔偿对象。',
    },
  ],
  'depth-factory-act': [
    {
      title: 'UK Parliament · The 1833 Factory Act',
      url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/',
      note: '年龄、工时、教育规定及Factory Inspectors执行局限。',
    },
  ],
  'world-peoples-charter': [
    {
      title: 'UK Parliament · The Chartist movement',
      url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/chartists/overview/chartistmovement/',
      note: '1838年宪章六项要求、1839年请愿及后续运动。',
    },
  ],
  'world-tanzimat': [
    {
      title: 'The Metropolitan Museum of Art · The Later Ottomans and the Impact of Europe',
      url: 'https://www.metmuseum.org/essays/the-later-ottomans-and-the-impact-of-europe',
      note: '阿卜杜勒迈吉德、Gülhane敕令与后续改革段；核对1839年改革起点。',
    },
  ],
  'depth-daguerre-photography': [
    {
      title: 'Library of Congress · Timeline of the Daguerreotype Era',
      url: 'https://www.loc.gov/collections/daguerreotypes/articles-and-essays/timeline-of-the-daguerreotype-era/',
      note: '1839年公开段及同期塔尔博特路线；后续商业推广分年记录。',
    },
  ],
  'world-waitangi': [
    {
      title: '新西兰文化与遗产部 · Signing the treaty',
      url: 'https://nzhistory.govt.nz/politics/treaty/making-the-treaty/signing-the-treaty',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-kierkegaard-either-or': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Søren Kierkegaard',
      url: 'https://plato.stanford.edu/entries/kierkegaard/',
      note: '第1节及 Chronology of Kierkegaard’s Works 列1843年《非此即彼》《恐惧与战栗》等；第3节讨论不同存在领域。',
    },
  ],
  'world-new-zealand-wars': [
    {
      title: '新西兰自然保护部 · New Zealand Wars',
      url: 'https://www.doc.govt.nz/our-work/heritage/heritage-topics/new-zealand-wars/',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-mexican-american-war': [
    {
      title: '美国国家档案馆 · Treaty of Guadalupe Hidalgo (1848)',
      url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-manifesto': [
    {
      title: 'OpenStax · World History 2 · 10-5-regulation-reform-and-revolutionary-ideologies',
      url: 'https://openstax.org/books/world-history-volume-2/pages/10-5-regulation-reform-and-revolutionary-ideologies',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-public-health': [
    {
      title: 'OpenStax · World History 2 · 10-5-regulation-reform-and-revolutionary-ideologies',
      url: 'https://openstax.org/books/world-history-volume-2/pages/10-5-regulation-reform-and-revolutionary-ideologies',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-revolutions-1848': [
    {
      title: '德国历史博物馆 · Die Revolution von 1848/49',
      url: 'https://www.dhm.de/lemo/kapitel/vormaerz-und-revolution/revolution-1848',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-seneca-falls': [
    {
      title: 'U.S. National Park Service · Nineteenth Century Activism',
      url: 'https://www.nps.gov/articles/featured_stories_wori.htm',
      note: '1848年7月19—20日大会、组织者及Declaration of Sentiments段。',
    },
  ],
  'world-crimean-war': [
    {
      title: '英国国家陆军博物馆 · Crimean War',
      url: 'https://www.nam.ac.uk/explore/crimean-war',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
    {
      title: '英国国家档案馆 · British Army operations up to 1913',
      url: 'https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/british-army-operations-up-to-1913',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-kanagawa-treaty': [
    {
      title: '美国国家档案馆 · The Treaty of Kanagawa',
      url: 'https://www.archives.gov/exhibits/featured-documents/treaty-of-kanagawa',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-india-1857': [
    {
      title: 'OpenStax · World History 2 · 9-3-colonial-empires',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-3-colonial-empires',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-kingitanga': [
    {
      title: 'New Zealand Ministry for Culture and Heritage · The search for a king',
      url: 'https://nzhistory.govt.nz/media/interactive/king-movement-map',
      note: '1858年6月恩加鲁阿瓦希亚拥立首位国王的地图与说明。',
    },
  ],
  'phil-mill-liberty': [
    {
      title: 'Stanford Encyclopedia of Philosophy · John Stuart Mill',
      url: 'https://plato.stanford.edu/entries/mill/',
      note: '条目导言列《论自由》1859年；有关政治、个性与自由的章节讨论伤害原则和社会压制。',
    },
  ],
  'world-italy': [
    {
      title:
        'OpenStax · World History 2 · 7-4-nationalism-liberalism-conservatism-and-the-political-order',
      url: 'https://openstax.org/books/world-history-volume-2/pages/7-4-nationalism-liberalism-conservatism-and-the-political-order',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-american-civil-war': [
    {
      title: '美国国家公园管理局 · The Civil War: Overview',
      url: 'https://www.nps.gov/civilwar/overview.htm',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-russian-emancipation': [
    {
      title: 'OpenStax · World History 2 · The Second Industrial Revolution',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-1-the-second-industrial-revolution',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
    {
      title: '狄金森学院 · Tsar Alexander II signs the legislation ending serfdom',
      url: 'https://hd.housedivided.dickinson.edu/node/34893',
      note: '亚历山大二世及改革年代参考；中文叙述由本站独立编写。',
    },
  ],
  'depth-les-miserables': [
    {
      title: 'Bibliothèque nationale de France · Les Misérables',
      url: 'https://catalogue.bnf.fr/ark:/12148/cb306255232',
      note: '馆藏书目Publication: Paris, Pagnerre, 1862；不混同小说情节的年代。',
    },
  ],
  'depth-war-peace-writing': [
    {
      title: 'State Museum of Leo Tolstoy · Fifteen beginnings of War and Peace',
      url: 'https://tolstoymuseum.ru/news/2025/09/25/80115/',
      note: '展览说明明确1863—1869年的构思、手稿与出版过程。',
    },
  ],
  'world-geneva-convention': [
    {
      title: 'International Committee of the Red Cross · Geneva Convention, 22 August 1864',
      url: 'https://ihl-databases.icrc.org/assets/treaties/120-IHL-GC1864-EN.pdf',
      note: '1864年公约正文，第1—6条及签署日期；不以其代替后续版本。',
    },
  ],
  'category-maxwell': [
    {
      title: 'James Clerk Maxwell Foundation · Facts about Maxwell',
      url: 'https://www.clerkmaxwellfoundation.org/html/key_facts_about_maxwell.html',
      note: '年表1861/2、1864、1865条，区分电磁理论前期研究、宣读与正式发表。',
    },
    {
      title: '英国皇家学会档案 · A dynamical theory of the electromagnetic field',
      url: 'https://catalogues.royalsociety.org/CalmView/Record.aspx?id=PT%2F72%2F7&src=CalmView.Catalog',
      note: 'PT/72/7，1865年《哲学汇刊》论文手稿记录；论文发表年与1864年宣读区分。',
    },
  ],
  'world-atlantic-telegraph': [
    {
      title: '英国科学博物馆 · Sending messages across the Atlantic',
      url: 'https://blog.sciencemuseum.org.uk/sending-messages-across-the-atlantic-156-years-on-from-the-first-transatlantic-cable/',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'depth-mendel-paper': [
    {
      title: 'Masaryk University Mendel Museum · Gregor Johann Mendel',
      url: 'https://mendelmuseum.muni.cz/o-muzeu/gregor-johann-mendel',
      note: '人物年表1865年报告及1866年论文出版。',
    },
  ],
  'world-canadian-confederation': [
    {
      title: '加拿大政府 · The history of Canada Day',
      url: 'https://www.canada.ca/en/canadian-heritage/campaigns/canada-day/about.html',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
    {
      title: 'OpenStax · World History 2 · The Second Industrial Revolution',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-1-the-second-industrial-revolution',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-marx-capital': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Karl Marx',
      url: 'https://plato.stanford.edu/entries/marx/',
      note: '第3节 Economics、尤其3.1 Reading Capital，说明政治经济学分析与作品范围。',
    },
    {
      title: 'UNESCO Memory of the World · Marx’s annotated Das Kapital',
      url: 'https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs',
      note: '馆藏图版说明第一卷首版为 Hamburg 1867；登记对象含作者批注本。',
    },
  ],
  'world-meiji': [
    {
      title: 'OpenStax · World History 2 · 9-3-colonial-empires',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-3-colonial-empires',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-russian-samarkand': [
    {
      title: '俄罗斯国家图书馆 · Conquest of Samarkand and War Trophies',
      url: 'https://expositions.nlr.ru/ve/RA6070/conquest-Samarkand',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
    {
      title: '美国国会图书馆 · 1868年撒马尔罕驻军影像档案',
      url: 'https://www.loc.gov/item/2007680333/',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-suez-canal': [
    {
      title: '苏伊士运河管理局 · Canal History',
      url: 'https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-us-transcontinental-railway': [
    {
      title: '美国国家公园管理局 · The Archeology of Chinese Laborers Who Connected the Country',
      url: 'https://home.nps.gov/articles/archeology-of-chinese-laborers-connected-country.htm',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'depth-mendeleev-periodic': [
    {
      title: 'Royal Society of Chemistry · Finding the periodic table',
      url: 'https://www.rsc.org/news/2019/january/finding-the-periodic-table',
      note: '1869年提出、同事代为报告及留空预测的说明。',
    },
  ],
  'world-second-industrial': [
    {
      title: 'OpenStax · World History 2 · 9-1-the-second-industrial-revolution',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-1-the-second-industrial-revolution',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-germany': [
    {
      title:
        'OpenStax · World History 2 · 7-4-nationalism-liberalism-conservatism-and-the-political-order',
      url: 'https://openstax.org/books/world-history-volume-2/pages/7-4-nationalism-liberalism-conservatism-and-the-political-order',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-paris-commune': [
    {
      title: 'Musée Carnavalet · Le parcours: La Commune de Paris',
      url: 'https://www.carnavalet.paris.fr/le-nouveau-parcours',
      note: '巴黎围城与公社展厅，1871年3月18日至5月28日及展品说明。',
    },
  ],
  'world-kumasi-1874': [
    {
      title: 'National Army Museum · Gold Coast Regiment Company arriving in Kumasi',
      url: 'https://collection.nam.ac.uk/detail.php?acc=1978-07-8-35',
      note: '馆藏说明追述1874年英军毁坏库马西部分城区与王宫；馆藏照片本身摄于1909年，不冒充战时影像。',
    },
  ],
  'depth-impressionist-exhibition': [
    {
      title: 'National Gallery of Art · 1874: The Birth of Impressionism',
      url: 'https://www.nga.gov/stories/articles/1874-birth-impressionism',
      note: '1874年展览、官方沙龙及巴黎社会背景。',
    },
  ],
  'depth-telephone-patent': [
    {
      title: 'Library of Congress · Invention of the Telephone',
      url: 'https://guides.loc.gov/chronicling-america-telephone-invention',
      note: '1876年专利与格雷争议，原始报刊研究指南。',
    },
  ],
  'depth-tokyo-university': [
    {
      title: 'The University of Tokyo · Chronology',
      url: 'https://www.u-tokyo.ac.jp/en/about/chronology.html',
      note: '1877年成立及法理文医四部门、1886年改称条目。',
    },
  ],
  'world-berlin-congress': [
    {
      title: 'U.S. Department of State · FRUS 1878 · The Treaty of Berlin',
      url: 'https://history.state.gov/historicaldocuments/frus1878/d523',
      note: '1878年7月13日条约正文及批准书交换记录；与非洲柏林会议严格区分。',
    },
  ],
  'modern-peirce-clear-ideas': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Charles Sanders Peirce',
      url: 'https://plato.stanford.edu/entries/peirce/',
      note: 'SEP Peirce关于1877—1878年Illustrations of the Logic of Science系列和实用准则的讨论。',
    },
  ],
  'phil-frege-concept-script': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Gottlob Frege',
      url: 'https://plato.stanford.edu/entries/frege/',
      note: '第1节 Life and Influences 明确1879年《概念文字》出版；第2节讨论谓词逻辑与证明。',
    },
  ],
  'category-bank-japan': [
    {
      title: '日本银行 · History',
      url: 'https://www.boj.or.jp/en/about/outline/history/',
      note: '1882年6月法律、10月10日开业；另参发行史区分1885年首批银行券。',
    },
  ],
  'depth-koch-tuberculosis': [
    {
      title: 'Nobel Foundation · Robert Koch and Tuberculosis',
      url: 'https://educationalgames.nobelprize.org/educational/medicine/tuberculosis/readmore.html',
      note: 'Koch’s Famous Lecture，1882年3月24日的病原研究报告。',
    },
  ],
  'phil-nietzsche-zarathustra': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Friedrich Nietzsche',
      url: 'https://plato.stanford.edu/entries/nietzsche/',
      note: '第1节 Life and Works 及主要著作目录列1883—1885年；第3、5节讨论价值创造与文体解释。',
    },
    {
      title: 'Kalliope · Goethe- und Schiller-Archiv · Zarathustra IV',
      url: 'https://kalliope.staatsbibliothek-berlin.de/ead?ead.id=DE-2060-BE-71-471226',
      note: '馆藏号 GSA 71/25a：第四部，C. G. Naumann，Leipzig 1885，Privatdruck；用于核对第四部私人印行的性质。',
    },
  ],
  'category-brooklyn': [
    {
      title: '美国国会图书馆 · Brooklyn Bridge, Fanfare and Fatalities',
      url: 'https://guides.loc.gov/chronicling-america-brooklyn-bridge',
      note: 'Introduction及Timeline列1883年5月24日开放，附同期报纸原始史料入口。',
    },
  ],
  'world-berlin-africa': [
    {
      title: 'OpenStax · World History 2 · 9-3-colonial-empires',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-3-colonial-empires',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-indian-national-congress': [
    {
      title: '印度国民大会党 · 历届大会原始年表',
      url: 'https://inc.in/inc-sessions',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
    {
      title: '印度国民大会党 · 1885—1895年创立时期',
      url: 'https://inc.in/brief-history-of-congress/1885-1895',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'category-pasteur': [
    {
      title: '巴斯德研究所 · Notre histoire',
      url: 'https://www.pasteur.fr/fr/nous-connaitre/notre-adn/histoire',
      note: '见“Un matin du 6 juillet 1885”及研究所创设背景。',
    },
  ],
  'world-brazil-abolition': [
    {
      title: 'OpenStax · World History 2 · 8-4-portuguese-south-america',
      url: 'https://openstax.org/books/world-history-volume-2/pages/8-4-portuguese-south-america',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'category-eiffel': [
    {
      title: '埃菲尔铁塔官方 · 1889–2019: 130 years of amazement',
      url: 'https://www.toureiffel.paris/en/news/130-years/1889-2019-130-years-amazement',
      note: '“March 31, 1889”段区分主体完成、内部施工与电梯尚未安装。',
    },
  ],
  'depth-van-gogh-starry-night': [
    {
      title: 'Museum of Modern Art · The Starry Night',
      url: 'https://www.moma.org/collection/works/79802',
      note: '馆藏472.1941，圣雷米1889年；About the work区分观察与想象。',
    },
  ],
  'world-nz-suffrage': [
    {
      title: '新西兰文化与遗产部 · Women win the right to vote',
      url: 'https://nzhistory.govt.nz/womens-suffrage-day',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-hawaiian-overthrow': [
    {
      title: '美国国家公园管理局 · Hawaiian History',
      url: 'https://www.nps.gov/locations/hawaii/history.htm',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
    {
      title: '美国国务院历史办公室 · The Spanish-American War, 1898',
      url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'depth-rontgen-xray': [
    {
      title: 'University of Zurich · Conrad Röntgen',
      url: 'https://www.physik.uzh.ch/en/department/Nobel_Prizes/Conrad-R%C3%B6ntgen.html',
      note: '1895年11月实验及随后发表的《一种新的射线》。',
    },
  ],
  'world-adwa': [
    {
      title: 'OpenStax · World History 2 · 9-4-exploitation-and-resistance',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-4-exploitation-and-resistance',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-philippine-independence-declaration': [
    {
      title: '菲律宾国家历史委员会 · The Philippine National Flag 历史标记',
      url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/the-philippine-national-flag/',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-spanish-american-war': [
    {
      title: '美国国务院历史办公室 · The Spanish-American War, 1898',
      url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'category-curie': [
    {
      title: '诺贝尔奖机构 · Marie and Pierre Curie and the discovery of polonium and radium',
      url: 'https://www.nobelprize.org/prizes/lists/marie-and-pierre-curie-and-the-discovery-of-polonium-and-radium/',
      note: '见“Marie and Pierre — a fruitful collaboration”和“Arduous work”，区分1898年报告与后续分离。',
    },
  ],
  'world-south-african-war': [
    {
      title: '英国国家陆军博物馆 · Boer War',
      url: 'https://www.nam.ac.uk/explore/boer-war',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-husserl-logical-investigations': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Edmund Husserl',
      url: 'https://plato.stanford.edu/entries/husserl/',
      note: '第1节 Life and work 明确1900—1901年出版；第2节讨论逻辑的理想性与意向性。',
    },
  ],
  'world-federation': [
    {
      title: '澳大利亚国家博物馆 · Defining moments timeline',
      url: 'https://www.nma.gov.au/defining-moments/defining-moments-timeline',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-flight': [
    {
      title: '美国国家公园管理局 · 1903 The First Flight',
      url: 'https://www.nps.gov/wrbr/learn/historyculture/thefirstflight.htm',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'modern-russell-principles': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Bertrand Russell',
      url: 'https://plato.stanford.edu/entries/russell/',
      note: 'SEP Russell关于悖论、类型理论与逻辑主义的专节及1903年Principles of Mathematics书目。',
    },
  ],
  'world-russo-japanese': [
    {
      title: '日本国立国会图书馆 · Modern Japan in archives: Russo-Japanese War',
      url: 'https://www.ndl.go.jp/modern/e/cha2/description26.html',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-russian-revolution-1905': [
    {
      title: 'OpenStax · World History 2 · The War Ends: The Russian Revolution',
      url: 'https://openstax.org/books/world-history-volume-2/pages/11-5-the-war-ends',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-maji-maji': [
    {
      title: 'University of Potsdam · Maji Maji War',
      url: 'https://www.uni-potsdam.de/en/botanischer-garten/unser-garten/kolonialismus/maji-maji-krieg',
      note: '大学植物园殖民史展，棉田、强制劳动、焦土镇压与饥荒；核对1905—1907年。',
    },
    {
      title: 'Bundesarchiv · Preußische und deutsche Streitkräfte 1867 bis 1918',
      url: 'https://www.bundesarchiv.de/im-archiv-recherchieren/archivgut-recherchieren/nach-themen/preussische-und-deutsche-streitkraefte-1867-bis-1918/',
      note: 'Kaiserliche Schutztruppen—Einsätze中的Maji-Maji-Aufstand 1905–07，用于军事时段核对。',
    },
  ],
  'world-persian-constitution': [
    {
      title: 'Encyclopaedia Iranica · Constitutional Revolution: The Constitution',
      url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii/',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'phil-james-pragmatism': [
    {
      title: 'Stanford Encyclopedia of Philosophy · William James',
      url: 'https://plato.stanford.edu/entries/james/',
      note: '条目导言及第6.1节 Pragmatism (1907)，说明出版年份、实用主义方法及真理讨论。',
    },
  ],
  'modern-bergson-creative-evolution': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Henri Bergson',
      url: 'https://plato.stanford.edu/entries/bergson/',
      note: 'SEP Bergson生平与Creative Evolution专节，明确1907年问世。',
    },
  ],
  'world-congo': [
    {
      title: 'OpenStax · World History 2 · 9-4-exploitation-and-resistance',
      url: 'https://openstax.org/books/world-history-volume-2/pages/9-4-exploitation-and-resistance',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-young-turk-revolution': [
    {
      title: '美国国会图书馆法律图书馆 · Civic Education Models: Turkey',
      url: 'https://tile.loc.gov/storage-services/service/ll/llglrd/2020714996/2020714996.pdf',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'world-korea-annexation': [
    {
      title: '日本国立国会图书馆 · Japan’s Annexation of Korea',
      url: 'https://www.ndl.go.jp/modern/e/cha2/description27.html',
      note: '史实与年代参考；中文叙述由本站独立编写。',
    },
  ],
  'world-mexican-revolution': [
    {
      title: '美国国会图书馆 · The Rise of Francisco Madero',
      url: 'https://www.loc.gov/exhibits/mexican-revolution-and-the-united-states/rise-of-madero.html',
      note: '史实、年代与地理背景参考；中文叙述由本站独立编写。',
    },
  ],
  'modern-principia-mathematica': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Bertrand Russell',
      url: 'https://plato.stanford.edu/entries/russell/',
      note: 'SEP Whitehead导言与SEP Russell逻辑主义讨论，明确三卷1910、1912、1913年。',
    },
    {
      title: 'Stanford Encyclopedia of Philosophy · Alfred North Whitehead',
      url: 'https://plato.stanford.edu/entries/whitehead/',
      note: 'SEP Whitehead导言与SEP Russell逻辑主义讨论，明确三卷1910、1912、1913年。',
    },
  ],
  'depth-tagore-gitanjali': [
    {
      title: 'University of Toronto Libraries · Nobel Prize for Literature',
      url: 'https://rpo.library.utoronto.ca/award/nobel-prize-literature',
      note: '泰戈尔段列孟加拉文1910年及英文1912年，区别1913年获奖。',
    },
  ],
  'east-nishida-inquiry-good': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Nishida Kitarō',
      url: 'https://plato.stanford.edu/entries/nishida-kitaro/',
      note: '§1 Biography、§2.1 Pure Experience及“Nishida’s works”书目：1870—1945年，《善的研究》初版1911年。',
    },
  ],
  'modern-husserl-ideas': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Edmund Husserl',
      url: 'https://plato.stanford.edu/entries/husserl/',
      note: 'SEP Husserl §3 The transcendental turn及作品书目，Ideen I初刊1913年。',
    },
  ],
  'modern-tagore-sadhana': [
    {
      title: 'Visva-Bharati University · Tagore bibliography: English works',
      url: 'https://www.visvabharati.ac.in/ENGLISH.html',
      note: 'Visva-Bharati大学英文书目：Sadhana，London: Macmillan，1913年10月，说明美国演讲背景。',
    },
  ],
  'modern-tagore-nobel': [
    {
      title: 'Nobel Foundation · Literature Prize 1913',
      url: 'https://www.nobelprize.org/prizes/literature/1913/summary/',
      note: '1913年文学奖官方记录与作品英文传播说明；本条不转载颁奖词。',
    },
  ],
  'modern-panama-canal': [
    {
      title: 'Autoridad del Canal de Panamá · Preguntas Frecuentes',
      url: 'https://pancanal.com/preguntas-frecuentes/',
      note: '核对1914年8月15日安孔号正式通航、1904年美国接续工程及施工劳工背景。',
    },
  ],
  'modern-first-world-war': [
    {
      title: 'OpenStax · World History 2 · 11.2 The Coming of War',
      url: 'https://openstax.org/books/world-history-volume-2/pages/11-2-the-collapse-of-the-ottomans-and-the-coming-of-war',
      note: '1914年危机、战争爆发及参战网络。',
    },
    {
      title: 'OpenStax · World History 2 · 11.5 The War Ends',
      url: 'https://openstax.org/books/world-history-volume-2/pages/11-5-the-war-ends',
      note: '1918年战争结束、革命与停战；与1919年和约分开。',
    },
  ],
  'modern-general-relativity': [
    {
      title: 'NASA · Einstein and General Relativity',
      url: 'https://www.nasa.gov/image-article/einstein-general-relativity/',
      note: '核对1915年11月理论突破与1916年发表的区别。',
    },
  ],
  'modern-dewey-democracy-education': [
    {
      title: 'Stanford Encyclopedia of Philosophy · John Dewey',
      url: 'https://plato.stanford.edu/entries/dewey/',
      note: 'SEP Dewey生平年表及教育哲学部分，Democracy and Education为1916年。',
    },
  ],
  'modern-russian-revolutions': [
    {
      title: 'OpenStax · World History 2 · 11.5 The War Ends',
      url: 'https://openstax.org/books/world-history-volume-2/pages/11-5-the-war-ends',
      note: '俄国1917年革命、退位、临时政府及布尔什维克掌权段。',
    },
  ],
  'modern-versailles': [
    {
      title:
        'U.S. Office of the Historian · The Paris Peace Conference and the Treaty of Versailles',
      url: 'https://history.state.gov/milestones/1914-1920/paris-peace',
      note: '核对1919年1月和会召开、6月28日对德条约签署及美国未批准。',
    },
  ],
  'modern-bauhaus': [
    {
      title: 'Bauhaus-Universität Weimar · History',
      url: 'https://bauhaus100.uni-weimar.de/en/history/',
      note: '大学百年专题History、Ideas、Work，核对1919年成立、1925年迁德绍、工作坊教育、政治压力与1933年师生迁徙。',
    },
  ],
  'modern-wittgenstein-tractatus': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Ludwig Wittgenstein',
      url: 'https://plato.stanford.edu/entries/wittgenstein/',
      note: 'SEP Wittgenstein §2.1及书目，明确1921年Annalen初刊、1922年书版。',
    },
    {
      title: 'Wittgenstein Archives at Bergen · Working Papers No. 7 (1993)',
      url: 'https://uhra.herts.ac.uk/id/eprint/12250/1/904279.pdf',
      note: 'Biggs与Pichler编书目，PDF第53页Part II的TLP1921*列Leipzig 1921，TLP1922列London德英对照版；用于区分初刊出版地与后版。',
    },
  ],
  'modern-ulysses': [
    {
      title: 'New York Public Library · Ulysses, first edition',
      url: 'https://old-digitalcollections.nypl.org/items/12311e40-df89-013a-e962-0242ac110004',
      note: '馆藏书目Date Issued为1922、Place为Paris、Publisher为Shakespeare and Co.；1935年题赠不是出版年。',
    },
  ],
  'modern-dewey-experience-nature': [
    {
      title: 'Stanford Encyclopedia of Philosophy · John Dewey',
      url: 'https://plato.stanford.edu/entries/dewey/',
      note: 'SEP Dewey关于1923年Carus Lectures和Experience and Nature（1925，1929修订）的段落。',
    },
  ],
  'modern-quantum-mechanics': [
    {
      title: 'CERN · A century of quantum mechanics',
      url: 'https://home.cern/century-quantum-mechanics/',
      note: '核对1925年海森堡论文及玻恩、约尔当等共同发展的顺序。',
    },
  ],
  'modern-nishida-place': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Nishida Kitarō',
      url: 'https://plato.stanford.edu/entries/nishida-kitaro/',
      note: 'SEP Nishida Kitarō场所逻辑讨论及书目，Basho为1926年，1926 & 1936文集注明两篇不同年代。',
    },
  ],
  'modern-heidegger-being-time': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Martin Heidegger',
      url: 'https://plato.stanford.edu/entries/heidegger/',
      note: 'SEP Heidegger关于Being and Time的分析及出版史，明确1927年；其书目中的图宾根1953年为第7版，1927年哈雷初版另据馆藏题录。',
    },
    {
      title: 'CiNii Books · Sein und Zeit, 1. Hälfte (1927)',
      url: 'https://ci.nii.ac.jp/ncid/BA0822464X',
      note: '书目BA0822464X：von Martin Heidegger，M. Niemeyer，1927，出版地Halle a.d.S.；不把后版出版地回填初版。',
    },
  ],
  'modern-suzuki-zen-essays': [
    {
      title: '金泽市铃木大拙馆 · 大拙年谱',
      url: 'https://www.kanazawa-museum.jp/daisetz/about.html',
      note: '金泽市铃木大拙馆年谱1927、1933、1934条；坐标为京都思想网络，不宣称英文书在京都首印。',
    },
  ],
  'modern-penicillin': [
    {
      title: 'Science History Institute · Alexander Fleming',
      url: 'https://www.sciencehistory.org/education/scientific-biographies/alexander-fleming/',
      note: '核对1928年发现、后续牛津团队研发及1945年获奖，区别发现与药物应用。',
    },
  ],
  'modern-krishnamurti-dissolution': [
    {
      title: 'Krishnamurti Foundation Trust · Dissolution Speech',
      url: 'https://kfoundation.org/dissolution-speech/',
      note: 'Krishnamurti Foundation Trust保存的Dissolution Speech，日期1929年8月3日，地点Ommen。',
    },
  ],
  'modern-great-depression': [
    {
      title: 'Federal Reserve History · The Great Depression',
      url: 'https://www.federalreservehistory.org/essays/great-depression',
      note: '核对1929年经济收缩、银行危机及1930年代持续衰退；保留各地复苏差异。',
    },
  ],
  'modern-popper-discovery': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Karl Popper',
      url: 'https://plato.stanford.edu/entries/popper/',
      note: 'SEP Popper原始书目列1935 Logik der Forschung与1959 The Logic of Scientific Discovery，生平段讨论早期出版。',
    },
  ],
  'modern-hoover-dam': [
    {
      title: 'U.S. Bureau of Reclamation · Hoover Dam chronology',
      url: 'https://www.usbr.gov/lc/hooverdam/history/articles/chrono.html',
      note: '1935年条记2月开始蓄水与9月30日典礼；后续发电和工程日期分列。',
    },
  ],
  'modern-ambedkar-annihilation-caste': [
    {
      title: 'Columbia University · Annihilation of Caste: About This MSE',
      url: 'https://ccnmtl.columbia.edu/projects/mmt/ambedkar/about.html',
      note: 'Columbia University MSE About、原作导言与时间线，明确1936年孟买自印及邀请撤销。',
    },
  ],
  'modern-horkheimer-critical-theory': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Max Horkheimer',
      url: 'https://plato.stanford.edu/entries/horkheimer/',
      note: 'SEP Horkheimer §1明确1933年法兰克福研究所被关闭、1934—1941年霍克海默主要在纽约工作；本条坐标指流亡学术网络，不判断期刊印刷地。§3及原始书目列Traditional and Critical Theory发表于1937年。',
    },
  ],
  'modern-guernica': [
    {
      title: 'Museo Reina Sofía · Guernica',
      url: 'https://www.museoreinasofia.es/colecciones/obra/guernica/',
      note: '馆藏DE00050，标1937年5月1日至6月4日于巴黎绘制，说明展览与保存经历。',
    },
  ],
  'modern-sartre-nausea': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Jean-Paul Sartre',
      url: 'https://plato.stanford.edu/entries/sartre/',
      note: 'SEP Sartre导言、关于Nausea的讨论及原始著作书目，明确1938年巴黎Gallimard出版。',
    },
  ],
  'modern-second-world-war': [
    {
      title: 'OpenStax · World History 2 · 13.2 Theaters of War',
      url: 'https://openstax.org/books/world-history-volume-2/pages/13-2-theaters-of-war',
      note: '欧洲、亚洲、北非与太平洋战事；战争终局及种族灭绝段。',
    },
  ],
  'modern-pearl-harbor': [
    {
      title: 'U.S. National Park Service · Pearl Harbor',
      url: 'https://www.nps.gov/articles/000/b-reactor-history-room-pearl-harbor.htm',
      note: '核对夏威夷当地12月7日袭击及美国12月8日宣战。',
    },
  ],
  'modern-camus-sisyphus': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Albert Camus',
      url: 'https://plato.stanford.edu/entries/camus/',
      note: 'SEP Camus关于The Myth of Sisyphus的专节及原始著作书目，1942年。',
    },
  ],
  'modern-stalingrad': [
    {
      title: 'Imperial War Museums · Second World War galleries',
      url: 'https://www.iwm.org.uk/sites/default/files/files/2023-10/second_world_war_galleries_large_print.pdf',
      note: '展厅文字“The Battle of Stalingrad”，1942年11月反攻与1943年2月投降段。',
    },
  ],
  'modern-sartre-being-nothingness': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Jean-Paul Sartre',
      url: 'https://plato.stanford.edu/entries/sartre/',
      note: 'SEP Sartre导言与§4、书目1943 L’être et le néant条目；不是1956或后来的英译年份。',
    },
  ],
  'modern-beauvoir-pyrrhus': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Simone de Beauvoir',
      url: 'https://plato.stanford.edu/entries/beauvoir/',
      note: 'SEP Beauvoir §4 Pyrrhus and Cinéas，明确1944年及自由、他人和伦理行动等论题。',
    },
  ],
  'modern-normandy-landings': [
    {
      title: 'Imperial War Museums · D-Day collection B 5165',
      url: 'https://www.iwm.org.uk/collections/item/object/205193059',
      note: '馆藏日期1944年6月6日及Normandy Landings事件关联；不是后期纪念照片。',
    },
  ],
  'modern-bretton-woods': [
    {
      title: 'International Monetary Fund · The IMF in History',
      url: 'https://www.imf.org/external/about/timeline/index.htm',
      note: '1944年7月Bretton Woods Conference条，核对44国代表及汇率与机构设计；1947年开始运营另列。',
    },
  ],
  'modern-merleau-perception': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Maurice Merleau-Ponty',
      url: 'https://plato.stanford.edu/entries/merleau-ponty/',
      note: 'SEP Merleau-Ponty生平、embodiment与Phénoménologie de la perception书目，1945年。',
    },
  ],
  'modern-popper-open-society': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Karl Popper',
      url: 'https://plato.stanford.edu/entries/popper/',
      note: 'SEP Popper政治思想专节及书目：The Open Society and Its Enemies，1945年两卷。',
    },
  ],
  'modern-auschwitz-liberation': [
    {
      title: 'Auschwitz-Birkenau Memorial · Day of liberation',
      url: 'https://www.auschwitz.org/en/history/liberation/day-of-liberation/',
      note: '核对1945年1月27日苏军进入、营地疏散与幸存者处境。',
    },
  ],
  'modern-atomic-bombings': [
    {
      title: 'The National WWII Museum · August–September 1945',
      url: 'https://www.nationalww2museum.org/sites/default/files/2023-04/80001674_WWII_Brick%20Book%20Guts.pdf',
      note: '1945年8月部分列广岛6日、长崎9日及后续伤亡；本条不照录不同口径的死亡估计。',
    },
  ],
  'modern-united-nations': [
    {
      title: 'United Nations · Charter research guide',
      url: 'https://research.un.org/en/docs/uncharter/intro',
      note: '宪章签署、批准与1945年生效的历史说明，结合宪章第110条。',
    },
  ],
  'modern-unesco-constitution': [
    {
      title: 'UNESCO · Constitution',
      url: 'https://www.unesco.org/en/legal-affairs/constitution',
      note: '组织法标题注明1945年11月16日伦敦通过；序言与宗旨条说明教育、科学、文化和和平的联系。',
    },
  ],
  'modern-indonesia-independence': [
    {
      title: 'Arsip Nasional Republik Indonesia · Presidenpedia',
      url: 'https://pusdipres.anri.go.id/presidenpedia/',
      note: '总统档案机构说明1945年8月17日苏加诺、哈达宣告独立及其后任职。',
    },
  ],
  'modern-sartre-existentialism-humanism': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Jean-Paul Sartre',
      url: 'https://plato.stanford.edu/entries/sartre/',
      note: 'SEP Sartre导言、关于1945年公开讲座及1946年Existentialism is a Humanism的说明。',
    },
  ],
  'modern-eniac': [
    {
      title: 'Computer History Museum · ENIAC dedication',
      url: 'https://www.computerhistory.org/tdih/february/16/',
      note: '馆方历史条目记1946年公开落成展示；不据此作有争议的“唯一第一台”判断。',
    },
  ],
  'modern-beauvoir-ambiguity': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Simone de Beauvoir',
      url: 'https://plato.stanford.edu/entries/beauvoir/',
      note: 'SEP Beauvoir关于The Ethics of Ambiguity的专节与原始书目，明确1947年。',
    },
  ],
  'modern-dialectic-enlightenment': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Max Horkheimer',
      url: 'https://plato.stanford.edu/entries/horkheimer/',
      note: 'SEP Adorno §2与Horkheimer相关讨论，区分1944文本及1947 Dialectic of Enlightenment正式版。',
    },
    {
      title: 'Stanford Encyclopedia of Philosophy · Theodor W. Adorno',
      url: 'https://plato.stanford.edu/entries/adorno/',
      note: 'SEP Adorno §2与Horkheimer相关讨论，区分1944文本及1947 Dialectic of Enlightenment正式版。',
    },
  ],
  'modern-india-partition': [
    {
      title: 'The National Archives · Partition of British India',
      url: 'https://www.nationalarchives.gov.uk/education/teaching-resources/partition-of-british-india/',
      note: 'Background information及Regions affected by partition，1947年8月独立与旁遮普、孟加拉分治。',
    },
  ],
  'modern-gatt': [
    {
      title: 'World Trade Organization · GATT 1947 and GATT 1994',
      url: 'https://www.wto.org/english/docs_e/legal_e/legalexplgatt1947_e.htm',
      note: '核对1947年协定、1948年1月1日临时适用及后来的制度关系。',
    },
  ],
  'modern-human-rights-declaration': [
    {
      title: 'OHCHR · International Bill of Human Rights',
      url: 'https://www.ohchr.org/sites/default/files/Documents/Publications/Compilation1.1en.pdf',
      note: '文件开头列1948年12月10日大会217 A(III)号决议及宣言全文。',
    },
  ],
  'modern-world-council-churches': [
    {
      title: 'World Council of Churches · First Assembly, Amsterdam 1948',
      url: 'https://oikoumene.org/about-the-wcc/organizational-structure/assembly',
      note: '第一届大会小节，1948年8月23日正式成立、147个成员教会及讨论主题。',
    },
  ],
  'modern-beauvoir-second-sex': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Simone de Beauvoir',
      url: 'https://plato.stanford.edu/entries/beauvoir/',
      note: 'SEP Beauvoir §7 The Second Sex: Woman As Other及书目，1949年法文两卷；不采用英译刊行年份。',
    },
  ],
  'modern-ryle-concept-mind': [
    {
      title: 'Stanford Encyclopedia of Philosophy · Gilbert Ryle',
      url: 'https://plato.stanford.edu/entries/ryle/',
      note: 'SEP Ryle导言及The Concept of Mind各节、原始书目，初版1949年。',
    },
  ],
  'modern-nato': [
    {
      title: 'U.S. Office of the Historian · North Atlantic Treaty Organization, 1949',
      url: 'https://history.state.gov/milestones/1945-1952/nato',
      note: '公约签署及欧洲重建、柏林危机背景；与成员后续扩展区分。',
    },
  ],
}

export const modernWorldNarratives: Record<
  string,
  { narrative: NonNullable<HistoryEvent['narrative']>; sources: Source[] }
> = {
  'depth-bank-france': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1800年，法兰西银行在巴黎成立。革命与战争之后，商人需要更可靠的支付和短期信用，执政府也希望恢复金融秩序；银行由私人资本参与，却从一开始便与国家权力紧密相连。',
            '银行通过贴现商业票据，把未来到期的债权换成可立即使用的资金，并发行可兑现银行券。票据是否可靠、准备金能否支持兑付，决定这种信用扩张能否持续。',
            '创设时的法兰西银行还没有后来全部中央银行权限。1803年取得巴黎发行特权、1848年形成全国发行垄断，属于后续变化；从商业银行业务走向全国货币管理，是逐步完成的。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-bank-france'],
  },
  'world-louisiana-purchase': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1803年，美国与法国签订路易斯安那购地条约，取得密西西比河以西广大地区的领土主张。美国原本关心的是新奥尔良港和密西西比河航运，法国最终提出转让整个路易斯安那。',
            '这使美国获得向西扩张的巨大空间，也留下边界、治理和居民身份问题。条约处理的是两国之间的权利安排，原住民并未因此同意交出自己的土地，法国此前也没有实际控制全部内陆。',
            '此后的勘察、移民与军事进入，把纸面上的转让变为逐步扩大的美国统治，同时带来原住民被迫迁移、土地争夺和奴隶制度向西扩展的冲突。',
          ],
        },
      ],
    },
    sources: sourcesById['world-louisiana-purchase'],
  },
  'world-sokoto-reform': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1804年，乌斯曼·丹·福迪奥领导的宗教改革运动转入战争，改变了西非豪萨地区的政治格局。批评统治者的宗教实践与征敛方式，使学者、支持者和不满现有秩序的群体逐渐汇合。',
            '随着战争扩大，新的埃米尔辖区相继形成，并与索科托的宗教政治权威保持联系。统治并非由一座首都直接管理所有事务，而是通过地方首领、学术网络和效忠关系连接起来。',
            '改革带来新的教育与政治组织，也伴随征服、奴役和人口迁徙。1804年标示战争开端，索科托政权的扩展及各地秩序建立则经历多年，不能只用宗教更新解释所有参与者的遭遇。',
          ],
        },
      ],
    },
    sources: sourcesById['world-sokoto-reform'],
  },
  'world-napoleon-empire': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1804年，法国从执政府转为帝国，拿破仑取得可以世袭的皇帝地位。革命后多次政权更替与长期战争，使稳定继承、集中行政和巩固个人权威成为他重建秩序的重要方向。',
            '5月的元老院决议建立制度框架，随后通过政治动员确认；12月在巴黎举行的加冕，则把新权力以宗教和王朝仪式公开展示。帝国的成立因此既是法律地位的改变，也是对社会支持与象征权威的组织。',
            '新帝国保留部分革命形成的财产和行政制度，同时进一步限制政治竞争。皇帝称号也没有结束对外战争，法国与欧洲各国的争夺很快继续扩大。',
          ],
        },
      ],
    },
    sources: sourcesById['world-napoleon-empire'],
  },
  'world-napoleonic-civil-code': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1804年，法国颁行统一《民法典》，把各地习惯法与革命以来的法律变化整理到共同框架之中。财产归属、契约、继承和家庭关系，从此有了更一致的国家规范。',
            '法典保护财产权，承认一部分革命确立的法律原则，却也强化父亲和丈夫在家庭中的权力，已婚妇女的行动能力受到明显限制。统一法律与让所有人享有同等权利，并不是同一个结果。',
            '随着法国势力扩张及后来的法律借鉴，法典影响超出法国。各地接受、改订或抵抗的方式不同，它的传播仍需放回当地社会与政治关系中理解。',
          ],
        },
      ],
    },
    sources: sourcesById['world-napoleonic-civil-code'],
  },
  'phil-hegel-phenomenology': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1807年，黑格尔出版《精神现象学》，尝试让读者跟随意识的不同形态，考察人如何把自己确信的东西当作知识，又怎样在矛盾中改变认识。重要写作已在1806年完成，出版与写作时间需要区分。',
            '书从感性确定性等问题推进到自我意识、承认、社会生活和历史，认识活动因而不只发生在孤立头脑里。人与他人的关系、制度和共同生活，也参与塑造能够被理解的世界。',
            '作品既是哲学论证，也是把经验组织成发展过程的尝试。用固定的“正反合”三步公式概括，会略去各段究竟检验什么主张、为何发生转变，反而失去它的具体问题。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-hegel-phenomenology'],
  },
  'world-slave-trade-abolition': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1807年，英国议会通过废除奴隶贸易的法律，禁止英国臣民和船只继续参与贩运被奴役者。长期请愿、公开揭露、宗教与政治动员，以及被奴役者的反抗，共同推动这一变化。',
            '法律打击的是贸易环节，殖民地已经被奴役的人没有因此立即获得自由，非法贩运也继续存在。1833年针对奴隶制度的立法是后来的另一节点。',
            '废奴需要的不只是宣布禁令，还包括海上执行、法庭裁判和对殖民经济的进一步改变。1807年削弱了贩运的法律基础，却没有当天终结依靠强迫劳动运转的社会关系。',
          ],
        },
      ],
    },
    sources: sourcesById['world-slave-trade-abolition'],
  },
  'depth-faust-one': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1808年，歌德在多年写作与改订后出版《浮士德》第一部。作品把一名学者对知识与生活的不满足，转化为与魔鬼约定、进入世俗经验的戏剧行动。',
            '浮士德追求超越眼前限制，格蕾琴却承担了欲望和社会规范交织的惨痛后果。作品因此不只歌颂永不满足的求索，也追问行动者怎样面对他人、怎样承担责任。',
            '诗体、戏剧、宗教与民间传说在书中相互交错。1808年问世的是第一部，第二部到歌德去世的1832年才出版，不能把后来完整作品的所有情节提前放进这一年。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-faust-one'],
  },
  'world-spanish-america': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1810年前后，西属美洲多个地区建立地方政治机构、展开争取自主的行动，随后发展为持续多年的独立战争。西班牙本土因拿破仑战争陷入王权危机，使谁有资格统治殖民地成为迫切问题。',
          ],
        },
        {
          title: '不同地区，走向不同的独立',
          paragraphs: [
            '地方精英、城市居民、农民、原住民和被奴役者并未始终站在同一阵营，他们对土地、税收和政治参与各有诉求。玻利瓦尔、圣马丁等人的军事行动促进多个地区脱离西班牙，但战争也伴随反复失败、内部冲突和跨地区协作。',
            '新的共和国陆续建立，原来殖民地的边界与行政区又被重新组合。独立结束了西班牙在美洲大陆大部分地区的统治，却没有自动解决土地集中、种族地位与性别不平等。',
          ],
        },
      ],
    },
    sources: sourcesById['world-spanish-america'],
  },
  'world-mexican-independence': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1810年，伊达尔戈在多洛雷斯发动起义，墨西哥独立战争由此展开。西班牙本土危机与新西班牙内部的社会分层相遇，使对殖民统治的不满迅速转为大规模动员。',
            '早期起义队伍失败后，莫雷洛斯等继续抵抗，独立阵营也不断重新组织。不同群体希望改变的既有政治归属，也有土地、赋税和社会身份，他们并不共享一套完整建国方案。',
            '1821年，新的政治联合促成独立实现，王国与共和等制度选择仍在此后争论。把1810年起事与1821年建国连读，才能看到独立是十一年战争、地方抵抗和谈判重组的结果。',
          ],
        },
      ],
    },
    sources: sourcesById['world-mexican-independence'],
  },
  'world-hawaiian-kingdom': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1810年，考艾岛统治者承认卡美哈梅哈一世的宗主地位，夏威夷群岛的政治统一达到关键节点。此前卡美哈梅哈已通过战争与联盟控制多个岛屿，但考艾的纳入主要通过协商完成。',
            '群岛联合使王权能够更集中地处理军事、贸易和对外交往，同时仍需协调不同岛屿首领及地方关系。王国后来逐步发展成文制度和外交网络，成为具有自身政治主体性的国家。',
            '1810年的统一不能用今天美国一州的身份倒看，也不表示各岛在同一年都经历相同的征服。后来王国被推翻与美国吞并，是另外的历史过程。',
          ],
        },
      ],
    },
    sources: sourcesById['world-hawaiian-kingdom'],
  },
  'world-vienna': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1814至1815年，欧洲列强在维也纳及相关谈判中重组拿破仑战争后的秩序。领土如何分配、哪些王朝恢复、怎样防止一个国家再次支配欧洲，是会议反复交涉的核心。',
            '各国以军事实力和外交交换争取利益，王朝合法性与势力均衡成为重要语言。波兰、德意志和意大利等地区的安排，更多反映大国协商，地方居民的民族与政治诉求并未获得平等表达。',
            '新的边界与列强协调机制降低了某些直接冲突的可能，也被用来压制革命和宪政要求。维也纳秩序因此同时关乎维护和平与保存既有统治，这两种目标并不总能一致。',
          ],
        },
      ],
    },
    sources: sourcesById['world-vienna'],
  },
  'world-waterloo': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1815年，拿破仑离开厄尔巴岛重掌法国后，在滑铁卢遭多国盟军击败，百日政权随之结束。威灵顿率领的军队坚守阵地，布吕歇尔的普鲁士军从另一方向赶来，使法军必须应付相互连接的战场。',
            '法军多次进攻未能瓦解威灵顿所部，普军到达又迫使拿破仑分兵。战斗后段，盟军转入反攻，法军退却并扩大为溃败。阵地、协调和时间相互作用，决定了部队能否在对方支援之前取得突破。',
            '滑铁卢并非英法两国独自决战，参战军中包括多个地区的士兵。战后拿破仑再次退位并被流放，欧洲也继续以条约和驻军安排处理法国问题。',
          ],
        },
      ],
    },
    sources: sourcesById['world-waterloo'],
  },
  'phil-schopenhauer-world': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1818年底，叔本华出版《作为意志和表象的世界》，题名页则署1819年。书中把经验世界作为主体认识中的表象，又以不断欲求的意志解释更深的存在与人生处境。',
            '欲望得到满足后还会产生新欲望，使生活反复在匮乏、痛苦与无聊之间摆动。但他也讨论艺术体验如何暂时减弱功利欲求、同情怎样让人理解他者，以及克制意志的可能。',
            '著作早期没有立即获得广泛响应，后来才对哲学、音乐和文学产生更大影响。它的悲观判断与审美、伦理思考应一同阅读，不能只缩成“人生都是痛苦”一句。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-schopenhauer-world'],
  },
  'world-zulu-consolidation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '19世纪初，沙卡时期的祖鲁王权在非洲东南部扩展，把更多共同体纳入军事与政治组织。约1820年的位置用于观察这一持续过程，并不指某一天完成一个边界固定的统一国家。',
            '军事整合、首领之间的联盟与征服相互配合，使王权能够集中人力、牲畜和兵员；失败者和被征服者则可能被迫迁徙，地方社会承受明显暴力。',
            '这一时期的区域动荡还涉及贸易、环境和其他政治集团的行动。后来叙事常把大范围人口移动全归于沙卡个人，应避免用一个君主的性格替代多地区共同发生的变化。',
          ],
        },
      ],
    },
    sources: sourcesById['world-zulu-consolidation'],
  },
  'world-greek-independence': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1821年，希腊反奥斯曼起事展开，随后经历战争、内部纷争和欧洲列强介入。地方武装、商人网络、侨民与支持者共同参与，但怎样组织新国家，并没有现成一致答案。',
            '军事冲突与外交谈判相互牵动，欧洲列强的支持既推动独立，也影响了国家边界和政治体制。1830年独立获得承认，后来又建立王国，起事与国际安排因而属于不同环节。',
            '新国家只包含部分希腊语人口居住区，不能把今日疆域提前套到1830年。独立后的财政、地方力量和王权关系仍需重新组织，民族自决的愿望也没有一次全部实现。',
          ],
        },
      ],
    },
    sources: sourcesById['world-greek-independence'],
  },
  'depth-british-gold-resumption': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1821年，英格兰银行恢复以黄金兑付银行券。此前在对法战争期间，兑金义务被暂停，纸币发行与国家战争融资的关系也更加紧密。',
            '恢复支付意味着持券人再次可以按规定换取黄金，货币当局因此受到黄金准备和对外流动的约束。兑付信用能够稳定部分交易预期，却也让国内信贷与国际收支更直接地相连。',
            '这是英国19世纪金本位运作的重要节点，其他国家采用金本位的时序与规则各不相同。它不代表1821年已经形成覆盖全球、始终稳定的同一货币制度。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-british-gold-resumption'],
  },
  'world-brazil': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1822年，佩德罗宣布巴西独立，以皇帝身份统治新国家。葡萄牙王室此前因欧洲战争迁到巴西，使这里一度成为帝国政治中心，王室回迁后的权力重组又加深了巴西精英对被重新从属的担忧。',
            '巴西借王室成员维持政治连续，与许多西属美洲地区建立共和国的道路不同。独立仍需在各省争取承认、击退反对力量，并建立新的财政与官署关系。',
            '君主制有助于部分地方精英继续合作，也保存了大量殖民社会关系，奴隶制度没有随独立结束。政治主权改变与社会平等，因而呈现明显不同的进程。',
          ],
        },
      ],
    },
    sources: sourcesById['world-brazil'],
  },
  'world-monroe-doctrine': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1823年，美国总统门罗在向国会提交的咨文中，警告欧洲国家不要在美洲继续殖民或干预新独立国家。这些原则后来被称为门罗主义，产生于拉丁美洲独立与欧洲列强重建秩序相交的局势。',
            '声明将美洲与欧洲的政治事务加以区分，表达美国对西半球的安全和地位要求。当时美国能够单独实施的力量有限，原则也不是各美洲国家共同签署的协议。',
            '后来的美国政府不断重释这些说法，有时以此反对欧洲介入，有时又据以扩大自己的干预。阅读1823年的文本，应把当时主张与后来形成的势力范围政策区分开。',
          ],
        },
      ],
    },
    sources: sourcesById['world-monroe-doctrine'],
  },
  'world-ayacucho': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1824年，苏克雷指挥的独立军在阿亚库乔击败西班牙王党军，西班牙在南美大陆的主要军事力量受到决定性打击。此前多年的跨地区作战，使独立军逐渐具备协同与持续推进的条件。',
            '王党军战败及随后投降，削弱了西班牙重新控制秘鲁等地的可能，但仍有据点和其他美洲地区继续维持不同处境。一次胜利没有让全部殖民统治同日结束。',
            '战场优势还需要转为稳定的国家制度：军队怎样供养、地方谁来管理、不同群体是否接受新权威，都成为独立之后的新问题。',
          ],
        },
      ],
    },
    sources: sourcesById['world-ayacucho'],
  },
  'category-beethoven-ninth': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1824年5月7日，贝多芬第九交响曲在维也纳首演。作品在末乐章引入独唱与合唱，以席勒诗歌表达欢乐与人类相联的愿望，把交响乐原有的器乐展开推向新的规模。',
            '人声并不是简单附在乐曲末尾，而是参与全曲主题和情绪的转变，使此前的冲突与追寻获得新的回应。首演依赖歌手、乐队与指挥协作，当晚还演出了贝多芬其他作品。',
            '作品后来进入不同国家、政治场合与纪念活动，意义不断被重释。1824年的演出首先是一次具体创作与表演实践，不能把后来的所有象征含义都视为作曲时已经固定。',
          ],
        },
      ],
    },
    sources: sourcesById['category-beethoven-ninth'],
  },
  'world-java-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1825年，蒂博尼哥罗及其支持者在爪哇与荷兰殖民军开战，战争持续到1830年。殖民干预、土地和地方权力关系的变化，与宗教及王朝正当性的诉求相互交织，使反抗超出一场宫廷争执。',
            '抵抗者利用地方网络与熟悉的地形行动，荷兰军则逐渐加强据点和道路控制。战争长期牵动村落、农业和人口，征发、饥饿与镇压造成广泛苦难。',
            '蒂博尼哥罗被捕流放后撰写《蒂博尼哥罗纪事》，留下他对自身使命和战争的叙述。它是重要见证，也体现作者立场，不能代替所有参战者与平民的声音。',
          ],
        },
      ],
    },
    sources: sourcesById['world-java-war'],
  },
  'category-hokusai': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '约1830至1832年，葛饰北斋与出版商推出《富岳三十六景》。系列把富士山放入不同距离、天气与劳动场景，使同一座山成为组织城市生活和地域景观的视觉线索。',
            '《神奈川冲浪里》中，近处巨浪、船中人的动作与远处较小的富士山形成对照，波涛的曲线又把视线引向画面深处。木版分色套印让这种构图能够以多个印本进入市场，画家、刻工、摺师和出版商共同完成传播。',
            '1831年已有广告，并不表示所有画幅同日制作；存世印本也有版次和保存差异。今天常见的一幅图像，实际上连接着一整套商业出版与制作劳动。',
          ],
        },
      ],
    },
    sources: sourcesById['category-hokusai'],
  },
  'depth-faraday-induction': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1831年，法拉第通过线圈、磁体和电流检测装置研究电磁感应，发现变化的磁作用能够产生电流。实验把原本看来分离的电与磁现象进一步联系起来。',
            '关键不只在于磁体是否存在，还在于磁场与导体关系怎样变化。把磁体移近、移开线圈，或改变邻近回路中的电流，可以在另一回路观察到相应效应。',
            '这些研究为发电装置提供重要原理，同年后来的旋转装置又作出新的演示。大型发电机、稳定输电与工业应用仍需材料和工程长期发展，不能把1831年实验直接写成电力时代已经全面到来。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-faraday-induction'],
  },
  'world-slavery-abolition-act': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1833年，英国议会通过《废除奴隶制法》，主要条款于1834年生效。它针对大部分英国殖民地的奴隶制度，比1807年禁止奴隶贸易推进了一步，但仍保留地域例外与过渡限制。',
          ],
        },
        {
          title: '法律解放与仍被控制的劳动',
          paragraphs: [
            '许多被解放者须继续接受强制学徒制，在原有种植园劳动。议会支付的赔偿主要给了奴隶主，被奴役者失去的劳动与自由并未获得同等补偿；学徒制直到1838年才提前结束。',
            '法律改变了人的身份，土地、就业与殖民权力却仍限制生活选择。废奴因而既有明确的制度突破，也有被解放者继续争取实际自主的长期过程。',
          ],
        },
      ],
    },
    sources: sourcesById['world-slavery-abolition-act'],
  },
  'depth-factory-act': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1833年，英国通过《工厂法》，限制纺织工厂中儿童的就业年龄和工作时长，并要求部分儿童接受基础教育。工业生产扩张后，童工的长时间劳动和健康损害日益成为公共争论。',
            '法律不只提出限制，也设置工厂监察员，使国家能够进入原本主要由雇主掌握的生产场所监督。不过最初只有四名监察员，难以覆盖大量工厂，年龄证明和实际工时也可能被规避。',
            '立法为持续干预劳动条件建立了入口，其范围和执行能力仍在后来扩大。1833年不是所有童工从此离厂，也不是家庭贫困和教育不足已经解决。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-factory-act'],
  },
  'world-peoples-charter': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1838年，英国改革者提出《人民宪章》，要求扩大男性选举权、秘密投票、议员领取报酬等六项改革。许多工人认为，缺少政治代表使他们难以改变工资、劳动和生活条件。',
            '围绕宪章形成的运动组织集会、报刊和全国请愿，在1839、1842和1848年多次向议会施压，也伴随如何运用群众力量的内部争论。议会没有在当时全面接受这些要求，参与者又面对镇压与经济压力。',
            '宪章运动扩大了工人的政治组织经验，若干诉求后来分别实现，但其男性普选目标仍没有包含妇女平等。它的意义在于把代表权变成群众行动的共同议题。',
          ],
        },
      ],
    },
    sources: sourcesById['world-peoples-charter'],
  },
  'world-tanzimat': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1839年，奥斯曼苏丹阿卜杜勒迈吉德颁布《玫瑰园敕令》，承诺保障臣民生命、财产与名誉，并整顿税收、征兵和司法。它通常被视为坦志麦特改革时期的开端。',
            '帝国面对军事竞争、财政困难及不同地区的统治问题，希望以更有规则的行政动员资源。敕令将安全和平等承诺用于不同宗教臣民，但落实需要官员、法庭和地方权力配合，并不只靠中央宣布。',
            '改革跨越此后数十年，既扩大国家组织能力，也引出新的社会与政治争论。1839年开启的是一项长期重组，不能简单写成帝国从此一次完成现代化。',
          ],
        },
      ],
    },
    sources: sourcesById['world-tanzimat'],
  },
  'depth-daguerre-photography': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1839年，达盖尔摄影法在巴黎公开，机械成像迅速进入公众视野。它在经过处理的银版上形成细密影像，让肖像、建筑与景物能够以新的方式被保存。',
            '图像需要经过曝光和显影等步骤，早期拍摄时间与器材条件又限制了动作、光线和场景选择。每块银版通常形成独一的影像，并不像后来负片那样便于重复制作相同照片。',
            '摄影的出现还依赖尼埃普斯等人的先行研究，并有其他路线同时发展。1839年是技术公开和传播的重要节点，随后照相馆、出版与日常观看习惯才逐渐发生更广变化。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-daguerre-photography'],
  },
  'world-waitangi': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1840年，英国代表与部分毛利首领在怀唐伊签署条约，签署活动随后扩展到新西兰其他地区。殖民政府希望据此建立权威，毛利首领则关心保护土地、贸易和自身政治地位。',
            '英语与毛利语文本对治理权、主权和首领权威的表达存在重要差别，签署者对让出了什么、保留了什么，并不必然具有同一理解；也不是所有首领都参与签署。',
            '此后殖民扩张与土地争议使条约成为长期冲突的中心，也成为毛利主张权利的重要依据。理解这次签署，必须把文本、翻译与各方实际期待一同考虑。',
          ],
        },
      ],
    },
    sources: sourcesById['world-waitangi'],
  },
  'phil-kierkegaard-either-or': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1843年，克尔凯郭尔出版《非此即彼》等著作，以不同化名和文体讨论人如何选择生活。审美式的追逐、伦理上的承诺与宗教信仰，并非一张可由外部替个人选定的路线图。',
            '《非此即彼》让不同声音分别呈现各自立场，读者须面对选择带来的责任；同年的《恐惧与战栗》又借亚伯拉罕故事追问信仰与普遍伦理之间的紧张。',
            '这些化名作者承担不同任务，不能把每句话都当成克尔凯郭尔本人直接宣布的教条。出版实验本身就在阻止读者只接受现成答案，转而审视自己怎样存在与行动。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-kierkegaard-either-or'],
  },
  'world-new-zealand-wars': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1845年起，新西兰多个地区围绕土地与政治权威反复开战。部分毛利部族反对英国及殖民政府扩张，另一些毛利群体与政府结盟，各地并不共享一条阵营边界。',
            '战事从北方延伸到塔拉纳基、怀卡托等地区，毛利堡垒、地形利用和机动作战对抗殖民军的兵力与火器。战争同时伴随土地没收、村落迁移和经济破坏，使控制土地与控制人口成为相互连接的目标。',
            '《怀唐伊条约》所承诺的权利，始终是争论背景。所谓新西兰战争包含多场起讫不同的冲突，1845年只是常用整体区间的起点，不能据此想象所有地方连续作战数十年。',
          ],
        },
      ],
    },
    sources: sourcesById['world-new-zealand-wars'],
  },
  'world-mexican-american-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1846年，美国与墨西哥围绕得克萨斯及边界争议开战。美国军队从多个方向推进，又登陆墨西哥湾沿岸、攻占墨西哥城，迫使墨西哥在巨大军事压力下谈判。',
            '1848年《瓜达卢佩—伊达尔戈条约》结束战争，墨西哥放弃对得克萨斯的主张，并割让今日加利福尼亚、新墨西哥等大片地区。美国扩张越过更广阔的大陆空间，也使奴隶制能否进入新领土的争论进一步激化。',
            '条约对割让地居民的财产和公民权作出安排，实际执行仍存在争夺与侵害。国家边界改变后，原住民和墨西哥裔居民并没有因此失去自身历史，也未自动获得平等保护。',
          ],
        },
      ],
    },
    sources: sourcesById['world-mexican-american-war'],
  },
  'world-manifesto': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1848年，马克思与恩格斯发表《共产党宣言》，为共产主义者同盟撰写政治纲领。欧洲革命浪潮展开之际，工业化、城市贫困与工人组织的成长，使社会应怎样改变成为迫切争论。',
            '文本把资本主义描述为不断改造生产、扩大市场又产生阶级冲突的力量，强调工人阶级通过组织参与政治。它既试图解释社会变化，也直接提出行动目标，因此具有鲜明的论战与动员性质。',
            '宣言的传播和地位后来经历多次变化。作者当时的分析、不同社会主义传统，以及后来的政党和国家实践，需要分别考察，不能把19世纪文本直接等同于此后所有以其名义采取的政策。',
          ],
        },
      ],
    },
    sources: sourcesById['world-manifesto'],
  },
  'world-public-health': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1848年，英国通过《公共卫生法》，为国家和地方参与城市卫生建立新的制度入口。工业城市人口密集，饮水、排污和恶劣居住条件把不同家庭的健康连在一起，单靠个人难以处理。',
            '法律推动设立卫生管理机构、调查地方状况，并为供水和排水等工程提供组织方式。它的作用取决于地方是否行动、能否筹资及怎样监督，而不是宣布目标后所有街区便立即得到改善。',
            '当时对疾病传播的理解仍在变化，后来的细菌研究又改写了部分解释。公共卫生制度与医学知识并行发展，使城市健康逐渐成为可持续承担的公共事务。',
          ],
        },
      ],
    },
    sources: sourcesById['world-public-health'],
  },
  'world-revolutions-1848': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1848年，革命从法国扩展到欧洲多地，要求宪法、政治参与、民族统一和改善社会生活的运动相互激荡。粮食与就业困难加深不满，新闻、集会和跨境消息又让各地行动产生联系。',
            '法国推翻七月王朝，德意志的法兰克福国民议会尝试以宪法组织统一国家，哈布斯堡统治下也出现多种民族与自由诉求。但自由派、工人和不同民族的目标并不相同，原先联盟很快发生分歧。',
            '君主和军队逐步恢复控制，多数革命在当时失败。宪法与民族国家的议题却继续影响后来的政治，1848年留下的既有镇压和失望，也有组织经验与无法再被忽略的要求。',
          ],
        },
      ],
    },
    sources: sourcesById['world-revolutions-1848'],
  },
  'world-seneca-falls': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1848年，妇女权利改革者在纽约州塞尼卡福尔斯召开大会，通过《感伤宣言》。文本借用美国《独立宣言》的语言，反问为何平等原则没有同样适用于妇女。',
            '与会者讨论教育、财产、婚姻中的法律地位、职业和投票权，政治代表因此与家庭及日常生活的制度限制联系起来。妇女选举权在当时仍是有争议的要求，会议没有立即带来法律上的全面改变。',
            '大会成为后来运动的重要标志，但争取妇女权利已有更早实践，参会者也不能代表所有种族、阶级和地区。它的重要之处，是把分散的不平等经验明确整理成公开的政治主张。',
          ],
        },
      ],
    },
    sources: sourcesById['world-seneca-falls'],
  },
  'world-crimean-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1853年，俄罗斯与奥斯曼的冲突升级为战争，英国、法国等随后参战。围绕奥斯曼领土、黑海与欧洲力量均衡的争夺，使地区争端变成多国战争。',
          ],
        },
        {
          title: '围城之外，补给同样决定生死',
          paragraphs: [
            '塞瓦斯托波尔围攻成为主要战场，双方围绕工事、炮兵和运输持续消耗；波罗的海、高加索等方向也有行动。疾病、严冬和军需失当造成大量死亡，战地医疗与后勤问题因而进入公众视野。',
            '战争最终以1856年巴黎和约告终，俄罗斯接受对黑海等问题的限制。军事实力的比较推动俄国等地重新审视制度与军队，但后来的改革仍有各自政治条件。',
          ],
        },
      ],
    },
    sources: sourcesById['world-crimean-war'],
  },
  'world-kanagawa-treaty': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1854年，日本幕府与美国签订《神奈川条约》，开放下田、箱馆供美船补给，约定援助遇难船员，并允许设置领事。佩里舰队展示的武力，使幕府难以继续完全拒绝接触。',
            '条约首先解决船舶、人员与外交驻留问题，还不是允许一般自由贸易的商业条约。1858年的通商安排进一步改变关税、贸易和司法关系，属于后续阶段。',
            '开放压力加深幕府如何应对外国的内部争论，地方势力与朝廷也更加卷入外交。幕府的统治危机因而扩大，但从签约到明治维新仍有多年政治与军事斗争。',
          ],
        },
      ],
    },
    sources: sourcesById['world-kanagawa-treaty'],
  },
  'world-india-1857': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1857年，英属印度部分士兵哗变，与地方统治者、农民及城市群体的反抗汇合。军营中的直接冲突，背后连着东印度公司的兼并、征收、宗教忧虑与地方权力被削弱等多重矛盾。',
            '起事在印度北部和中部多地扩大，参与者对恢复旧秩序、维护地方权利和驱逐殖民力量各有期待；也有许多地区与群体没有加入，或支持英国。战争与殖民报复使平民遭受严重杀戮和破坏。',
            '镇压之后，英国王室于1858年接管原东印度公司的统治，重新安排军队与对地方君主的关系。统治主体改变，殖民统治本身并未结束；事件的不同称呼，也反映殖民者、参与者与后世民族叙事的不同立场。',
          ],
        },
      ],
    },
    sources: sourcesById['world-india-1857'],
  },
  'world-kingitanga': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1858年，波塔陶·特·费罗费罗被拥立为首位毛利国王。支持者希望在殖民购地和政治压力下建立共同权威，减少土地分散出售，并加强不同毛利群体之间的协调。',
            '毛利国王运动结合了土地保护、协商与政治自主目标，并非把欧洲君主制原样移植，也没有让所有部族自动归入边界一致的国家。首领与共同体保留不同意见，参与程度并不相同。',
            '殖民政府把这一权威视为挑战，土地与主权冲突后来进入怀卡托战争。共同领导的建立因此既是自主组织的尝试，也是理解后续战争与持续政治传统的关键。',
          ],
        },
      ],
    },
    sources: sourcesById['world-kingitanga'],
  },
  'phil-mill-liberty': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1859年，约翰·斯图亚特·密尔出版《论自由》，追问国家或多数人的意见，何时可以正当地限制个人。自由在书中不仅是免受政府干预，也包括抵抗社会习惯对不同生活方式的压制。',
            '他以防止伤害他人为干预的重要理由，强调公开讨论能够检验意见，个人尝试不同生活方式也有助于社会学习。思想自由、个性与行动责任由此联系在一起。',
            '这并不意味着任何行动都免于批评或法律约束；原则怎样界定伤害、适用于哪些人，本身就引起争论。密尔的普遍自由论述与其殖民时代判断之间的张力，也需要同时审视。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-mill-liberty'],
  },
  'world-italy': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1861年，意大利王国宣告成立，以都灵为首都。撒丁王国的外交与战争、加里波第的军事行动及各地政治选择相互配合，使半岛多个政权被纳入同一王国。',
            '新国家当时尚不包括威尼斯和罗马，它们分别在后续战争与外交变化中加入。统一运动中的共和、君主与地方目标也并未完全一致，王国的形成是多种力量竞争后的安排。',
            '统一以后还需整合法律、财政和军队，南北经济、语言与社会条件差异继续影响居民生活。政治地图上的合并只是国家建设的新起点，不能提前当作整个社会已经均质化。',
          ],
        },
      ],
    },
    sources: sourcesById['world-italy'],
  },
  'world-american-civil-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1861年，美国南方各州围绕奴隶制度及其政治未来脱离联邦，内战随之爆发。邦联试图维持自身统治，联邦政府起初主要以保存国家统一为战争目标，解放政策后来逐步进入战争中心。',
          ],
        },
        {
          title: '解放怎样成为战争的实际力量',
          paragraphs: [
            '北方依靠人口、工业、铁路与海上封锁维持长期作战，南方则试图消耗对手、争取外援。战线跨越广阔地区，战斗、征发、毁坏与疾病给军民造成巨大伤亡。',
            '被奴役者逃离种植园、进入联邦军控制区并参加军队，主动削弱奴隶制度。1863年《解放宣言》与军事推进相互作用，1865年第十三修正案再从宪法上废除奴隶制。',
          ],
        },
        {
          paragraphs: [
            '联邦获胜后，公民权、土地和种族平等仍须在重建及长期斗争中争取。法律解放是关键改变，社会中的强迫与歧视并未随停战自行消失。',
          ],
        },
      ],
    },
    sources: sourcesById['world-american-civil-war'],
  },
  'world-russian-emancipation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1861年，亚历山大二世政府颁布改革，解除俄国大批农民对地主的人身依附。克里米亚战争后的制度反思、农村压力与国家发展需要，使农奴制度越来越难以原样维持。',
            '农民获得新的法律身份，能够更广泛地订立契约、经营与流动，但土地分配、赎买负担和村社约束，使自由并不等于立即获得足够土地或完全自主。地主与国家在安排中仍保有重要利益。',
            '改革为人口进入城市、工厂和其他地区创造条件，也留下长期土地争议。它改变农村社会的基本法律关系，后续工业化与革命中的许多矛盾，却仍从这些未解决问题继续发展。',
          ],
        },
      ],
    },
    sources: sourcesById['world-russian-emancipation'],
  },
  'depth-les-miserables': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1862年，雨果出版《悲惨世界》，以冉阿让出狱后的命运贯穿贫困、刑罚、照顾他人与追求正义的问题。小说跨越数十年，把家庭和街巷中的遭遇放入法国革命后社会的变化。',
            '冉阿让与沙威对法律、责任的不同理解，使读者看到守法与正义可能发生冲突；芳汀、珂赛特等人的生活又呈现贫困如何进入劳动、性别与儿童处境。作品在人物叙事之外不断讨论城市、宗教和历史。',
            '书中巴黎街垒发生于1832年，不能与1789年法国大革命混同。1862年是出版节点，小说通过重新安排过去的冲突，向当时读者追问社会应怎样对待弱者。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-les-miserables'],
  },
  'depth-war-peace-writing': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1863年起，托尔斯泰逐步构思、写作和修订《战争与和平》，随后分期刊出并形成完整版本。他把数个家族的生活放入拿破仑战争，使私人经验与大规模历史变化彼此穿插。',
            '人物希望通过计划掌握命运，战场和社会中的结果却不断超出个人意图。小说也直接反思以少数伟人解释战争的方式，强调众多行动、偶然与无法完全控制的条件。',
            '写作过程与小说中的战争年代不同，书中历史议论也带有托尔斯泰自己的判断。它为读者提供理解经验与历史力量的文学方式，而非可以代替所有军事文献的战场实录。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-war-peace-writing'],
  },
  'world-geneva-convention': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1864年，多国代表在日内瓦签订改善战地伤病军人处境的公约。此前战场上大量伤员得不到及时救护，使组织志愿救援、保护医务人员成为跨国讨论的具体问题。',
            '公约要求对伤兵施救，并保护执行救护任务的人员、机构和设施，使帮助敌方伤员也能具有共同承认的规则。相关标识帮助军队辨认医疗救援，国家承诺则为执行提供法律基础。',
            '首部公约集中处理战地救护，后来的保护范围经过多次修订扩大。签署意味着接受义务，实际战场是否遵守仍需组织、监督与追责，不能把后来四部公约的全部内容提前放入1864年。',
          ],
        },
      ],
    },
    sources: sourcesById['world-geneva-convention'],
  },
  'category-maxwell': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1865年，麦克斯韦的《电磁场的动力学理论》发表于《哲学汇刊》，此前一年已向学术界宣读。论文把电和磁的相互关系放进数学框架，并将光的传播与电磁作用联系起来。',
            '理论的力量在于，原本分别研究的电流、磁场和传播现象可以互相约束、产生新的推论。光不再只是另一类需要完全独立解释的现象，而可能属于同一物理关系。',
            '今日熟悉的简洁方程形式经过后来的整理，实验验证与无线电技术也有后续发展。1865年标示一次重要理论表达，不能把之后全部发现都写成原论文已经完成的成果。',
          ],
        },
      ],
    },
    sources: sourcesById['category-maxwell'],
  },
  'world-atlantic-telegraph': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1866年，新的跨大西洋海底电缆实现持续通信，欧洲与北美之间的消息不再完全等待船只运送。1858年的电缆曾短暂通报，却很快失效，后来的成功建立在多次失败之后。',
            '工程需要制造足够长且绝缘可靠的电缆，再由铺缆船控制张力、定位与修复。海底环境、信号衰减和设备故障，使材料、测量与大规模融资都成为必要条件。',
            '较快的电报改变了新闻、外交和商业决策的时间尺度，但费用与网络控制也使获得便利的人并不平等。海洋仍很辽阔，部分跨洋关系却开始依照分钟和小时来组织。',
          ],
        },
      ],
    },
    sources: sourcesById['world-atlantic-telegraph'],
  },
  'depth-mendel-paper': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1866年，孟德尔《植物杂交试验》论文刊行，把多年豌豆杂交观察转为可比较的数量关系。他先在1865年作报告，论文发表则是知识进入书面传播的下一步。',
            '研究选择可以区分的性状，安排亲本杂交，再追踪后代的表现和比例。性状有时在一代不显现、又在以后重新出现，使遗传不再只能被描述为亲本特征简单混合。',
            '论文当时没有立即成为生物学中心，后来经重新发现和解释进入现代遗传学。DNA、基因定位及更复杂的遗传机制属于后来的研究，不能拿这些概念直接覆盖孟德尔原有的实验论证。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-mendel-paper'],
  },
  'world-canadian-confederation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1867年，《英属北美法》生效，加拿大省、新不伦瑞克和新斯科舍组成加拿大自治领；原加拿大省分为安大略与魁北克。联邦安排把共同政府与省级权力结合，用来协调不同地区的政治和经济利益。',
            '新国家仍处在英帝国之内，当时疆域也远小于今天。西部扩张、其他省区加入与法律主权的变化，分别在后续发生，原住民的土地和治理权又在这一扩张中承受压力。',
            '1867年奠定了联邦国家的制度基础，却不是全部居民共同平等决定的建国时刻。不同语言、地区与原住民社会的关系，继续塑造加拿大的发展。',
          ],
        },
      ],
    },
    sources: sourcesById['world-canadian-confederation'],
  },
  'phil-marx-capital': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1867年，马克思在汉堡出版《资本论》第一卷，集中分析资本的生产过程。商品、货币和日常工资关系，在书中成为理解资本主义社会如何组织劳动与占有成果的入口。',
            '他考察劳动过程、工作日、剩余价值与资本积累，试图解释为何形式上自由的交换，仍能持续产生支配与不平等。论证结合抽象概念、工厂报告和历史材料，既是理论研究，也具有明确批判目的。',
            '第一卷发表后仍有修订，第二、三卷由恩格斯在作者身后整理。1867年并非三卷全部同时完成，后来的马克思主义传统也在不同问题上继续解释和争论这些分析。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-marx-capital'],
  },
  'world-meiji': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1868年，以天皇为中心的新政府取代幕府，明治维新进入国家重组阶段。外国压力与幕府统治危机相互作用，萨摩、长州等力量通过联盟与战争推动权力转移。',
          ],
        },
        {
          title: '从更换政权到重新组织国家',
          paragraphs: [
            '新政府随后调整藩县关系、税制、军队和学校，逐步把地方资源纳入中央统筹。身份秩序的改变给一些人带来机会，也使原有武士、地方首领和农户承受利益重分配，抵抗并未立即停止。',
            '工业建设、铁路和近代行政扩大了国家动员能力，但这些发展经历多年，并伴随对外战争与殖民扩张。1868年确立的是新的政治方向，不能把后来全部制度与工业成果压入这一年。',
          ],
        },
      ],
    },
    sources: sourcesById['world-meiji'],
  },
  'world-russian-samarkand': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1868年，俄军攻占原属布哈拉埃米尔国的撒马尔罕，俄国在中亚的扩张取得重要城市据点。军事进入改变了地方统治、贸易与居民同帝国权力之间的关系。',
            '征服也伴随文物和知识材料的移动。撒马尔罕著名《古兰经》后来被转往俄国，收藏史与战利品、军政压力及博物馆征集相连，不能仅按一件藏品从一座图书馆来到另一座来理解。',
            '城市仍保留自身宗教、商业和文化生活，但这些生活逐渐置于新的行政体系之下。1868年既是帝国地图的变化，也是地方社会重新应对外来统治的开始。',
          ],
        },
      ],
    },
    sources: sourcesById['world-russian-samarkand'],
  },
  'world-suez-canal': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1869年，苏伊士运河通航，连接地中海与红海。欧洲与亚洲之间的部分航程因此不再需要绕过非洲南端，埃及在全球海运中的战略地位明显上升。',
            '工程自1859年展开，需要大量挖掘、设备、资本与劳动，完成后又必须持续疏浚和组织通航。运河由公司经营，其股权、收益和债务关系，也使埃及财政与欧洲金融更紧密地相连。',
            '通航、拥有公司股份和控制埃及并不是同一件事。后来的股权转让与英国军事占领进一步改变权力格局，这条缩短航程的水道也由此成为帝国竞争的重要对象。',
          ],
        },
      ],
    },
    sources: sourcesById['world-suez-canal'],
  },
  'world-us-transcontinental-railway': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1869年，中央太平洋与联合太平洋铁路在犹他接轨，美国东西部铁路网络获得连续连接。线路把更远地区纳入人员、货物和军队能够快速往来的范围，也推动了向西移民和开发。',
            '接轨依赖大规模土地、融资与施工组织。华工承担中央太平洋铁路大量危险工作，在山地开凿、铺轨与严寒中劳动，却面对工资、待遇和公共纪念中的歧视。',
            '铁路扩张同时侵入原住民生活空间，改变狩猎、土地与地方权力关系。接轨庆典所展示的工程成功，应与这些不同参与者承担的成本一起阅读。',
          ],
        },
      ],
    },
    sources: sourcesById['world-us-transcontinental-railway'],
  },
  'depth-mendeleev-periodic': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1869年，门捷列夫依据原子量与化学性质整理元素，提出具有周期关系的体系。把性质相近的元素放在可比较的位置，使零散的化学事实开始呈现结构。',
            '当排列与已知数据冲突时，他为尚未发现的元素留下空位，并预测其部分性质。体系因此不仅整理已有知识，也提出能够由新实验检验的主张。',
            '早期周期表经过多次调整，现代以原子序数组织的解释属于后来的发展。门捷列夫工作的关键，在于让分类能够指导发现，而非1869年的表格已经与今天完全相同。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-mendeleev-periodic'],
  },
  'world-second-industrial': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '19世纪后期，钢铁、化工、电力和新的机械技术推动工业生产继续扩展，常被概括为第二次工业革命。约1870年只是便于观察的起点，各行业和国家的变化并不同步。',
            '铁路、通信和能源网络使更大企业能够协调远距离生产，实验室研究、专利和金融资本也更直接地进入工业组织。德国、美国等形成新的工业中心，全球原料和市场关系随之调整。',
            '城市工作与消费获得新条件，劳动者也面对事故、污染、长工时和失业风险。技术增长与社会分配并非同一条曲线，工会、劳动立法和政治运动又继续改变工业社会。',
          ],
        },
      ],
    },
    sources: sourcesById['world-second-industrial'],
  },
  'world-germany': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1871年，普法战争期间，德意志帝国在凡尔赛宣告成立，普鲁士国王成为德意志皇帝。此前普鲁士通过战争与外交改变德意志各邦关系，南方诸邦也被纳入新的联邦国家。',
            '帝国保留成员邦与君主，同时设有全国议会和中央机构，普鲁士在军队、行政和政治上取得明显主导。统一没有包含奥地利等全部德语地区，也没有把最高权力完全交给议会。',
            '民族统一实现了部分长期诉求，民主参与、宗教与地区差别、工业社会矛盾仍继续存在。新国家的实力又改变欧洲均势，使此后外交需要重新围绕德国安排。',
          ],
        },
      ],
    },
    sources: sourcesById['world-germany'],
  },
  'world-paris-commune': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1871年3月，普法战争失败与巴黎围城之后，国民自卫军和居民反对凡尔赛政府收缴武器，公社政权随后经选举建立。巴黎与全国政府之间的冲突，由战争遗留问题转为谁有权决定城市与国家的争夺。',
            '公社内部包含不同政治主张，尝试自治、世俗教育和若干劳动社会措施，实际推行程度各异。战争与资源不足又限制了这段短暂统治。',
            '5月，凡尔赛军进入巴黎，街垒战和大规模处决结束了公社。其后监禁、流放与纪念使事件长期进入社会主义、共和及工人运动的争论，参与者的不同经验也不断被重新解释。',
          ],
        },
      ],
    },
    sources: sourcesById['world-paris-commune'],
  },
  'world-kumasi-1874': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1874年，英国军队在英阿散蒂战争中进入库马西，阿散蒂王宫和城内建筑遭到破坏，大量物品被带走。商业竞争、沿海关系与英国殖民扩张，使战争深入阿散蒂政治中心。',
            '城破改变了当时的力量对比，却没有在1874年立即结束阿散蒂王国全部政治生活，后来的征服与兼并仍有新的战争和安排。',
            '宫廷与军事物品后来进入欧洲收藏，其艺术价值与取得经过无法分开。今天讨论展示和返还，所面对的不只是藏品归属，也有战争如何把一个社会的权威象征移出原有环境。',
          ],
        },
      ],
    },
    sources: sourcesById['world-kumasi-1874'],
  },
  'depth-impressionist-exhibition': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1874年，莫奈、德加、莫里索等艺术家在巴黎独立举办群体展览，为官方沙龙之外的作品争取展示、评论与销售机会。自行组织展览，也是在尝试改变谁有权决定作品能否进入公众视野。',
            '参展作品关注现代生活、光色、人物和景物，画法却不完全一致。莫奈《印象·日出》引发的评论帮助“印象派”名称流传，原本的批评称呼后来成为艺术史分类。',
            '展览并没有使这些艺术家立即获得共同成功，市场与公众接受仍经历多年。它的重要性还在组织方式：艺术家开始用合作展览，开辟不同于既有评审制度的道路。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-impressionist-exhibition'],
  },
  'depth-telephone-patent': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1876年，贝尔取得电话相关专利，并通过实验和公开演示展示语音电传输。声音能够被转为电路变化、再在另一端还原，使电信开始超出电报码传递的方式。',
            '电话成为日常网络，还需要交换设备、线路、操作人员和经营组织。专利也引起优先权与技术归属争论，贝尔、格雷及其他研究者的工作不能简单压成一位发明家孤立完成的瞬间。',
            '1876年是专利和演示的重要节点，后来城市电话系统及长途通信的扩展，才进一步改变商业、家庭与公共事务的联系。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-telephone-patent'],
  },
  'depth-tokyo-university': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1877年，东京大学由既有近代学校合并成立，设置法、理、文、医四个学部。明治政府需要培养掌握新式法律、行政、医学与科学知识的人才，大学由此成为国家建设的重要机构。',
            '新学校继承早先翻译、医学和教育机构积累的师资与课程，并继续吸收海外知识。研究与教学的组织，使专业训练能够从个别师生关系转向较持续的学部体系。',
            '1886年改称帝国大学及后来的扩充属于下一阶段。1877年建立的是一个新的整合框架，大学与国家、学术自主及社会机会的关系仍在此后不断变化。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-tokyo-university'],
  },
  'world-berlin-congress': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1878年，欧洲列强在柏林召开会议，修订俄土战争后签订的圣斯特法诺初步和约。俄罗斯取得的影响让其他大国担忧，巴尔干安排因此再次成为大国之间的交换。',
            '条约确认罗马尼亚、塞尔维亚、黑山的独立，并调整保加利亚及其他奥斯曼属地的地位。不同民族的居住、政治主张与列强希望维持的均衡未能完全重合，新的边界继续留下争议。',
            '会议暂时协调了列强利益，没有终止巴尔干冲突。1878年这次会议与1884至1885年讨论非洲殖民规则的柏林会议，是两个不同事件。',
          ],
        },
      ],
    },
    sources: sourcesById['world-berlin-congress'],
  },
  'modern-peirce-clear-ideas': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1878年，皮尔士发表《如何使我们的观念清楚》，提出通过概念可能带来的可经验后果澄清意义。若两个说法在任何可考察结果上都没有差别，就需要重新检查它们究竟区别在哪里。',
            '这种办法把信念与探究、习惯和行动相连接，要求思想给出能够被共同检验的含义。它并不是把眼前有用或个人获利直接当成真理，而是让概念承担说明后果的责任。',
            '后来实用主义在詹姆斯、杜威等人那里获得不同发展，皮尔士也继续修订自己的表述。1878年的文章因此是一个重要起点，而非所有实用主义立场的统一宣言。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-peirce-clear-ideas'],
  },
  'phil-frege-concept-script': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1879年，弗雷格出版《概念文字》，设计一种用于清楚表达推理结构的符号语言。他希望避免日常语言的含混，使数学证明中的每一步根据都能被看见。',
            '通过量化以及函数、论元的分析，体系能够处理超出传统主谓结构的复杂关系，例如一个陈述究竟针对所有对象，还是只断言某个对象存在。现代逻辑的重要工具由此获得系统表达。',
            '作品起初没有普遍受到理解，后来才在逻辑与语言哲学中取得关键地位。弗雷格后续基础方案遭遇悖论，并不使这里的全部分析和形式方法一并失效。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-frege-concept-script'],
  },
  'category-bank-japan': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1882年10月10日，日本银行开业。明治时期多种货币和银行券并行，政府需要更集中地组织发行、结算与金融信用，使国家财政和市场交易获得较一致的基础。',
            '设立中央机构为货币制度重整提供了组织条件，但并不表示当天已有后来全部业务。日本银行券到1885年才开始发行，发行准备、兑换和与其他银行的关系仍须逐步建立。',
            '银行的作用此后随战争、金融危机和制度改革继续改变。1882年标示机构开端，不能把后来货币政策权限直接倒置到创设之初。',
          ],
        },
      ],
    },
    sources: sourcesById['category-bank-japan'],
  },
  'depth-koch-tuberculosis': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1882年，科赫向学术界报告结核病病原研究，把结核病与一种特定细菌联系起来。染色、培养与实验共同构成论证，使肉眼看不见的微生物能够成为可重复检查的证据。',
            '病原的识别改变了研究和预防疾病的方向，却没有立即带来有效治愈办法。贫困、拥挤居住、营养与劳动条件，仍影响结核病如何传播和危害人群。',
            '后来的结核菌素、药物和公共卫生措施各有自己的发展过程。1882年的突破首先在于建立病因证据，不应被写成发现细菌便已消灭疾病。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-koch-tuberculosis'],
  },
  'phil-nietzsche-zarathustra': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1883至1885年，尼采分部写作并刊行《查拉图斯特拉如是说》，以诗、寓言与演说讨论价值创造、自我超越和对生命的肯定。人物查拉图斯特拉的行旅，使思想以遭遇和反复返回的主题展开。',
            '作品中的超人、永恒轮回等表达，并非一套可以直接照办的政治方案。读者需要分辨修辞、人物声音与哲学问题，理解为何旧价值失去说服力后，创造新的评价又如此困难。',
            '各部的传播范围并不相同，第四部起初私人印行。1883年是这一工程的开端，完整作品的形成与后来的广泛接受，都经历了不同阶段。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-nietzsche-zarathustra'],
  },
  'category-brooklyn': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1883年5月24日，布鲁克林大桥通车，横跨东河，连接当时分别治理的纽约与布鲁克林。固定通道使渡河不再完全依赖渡船，通勤、商业和城市扩张获得新的条件。',
            '高塔、钢缆与基础施工结合多种工程技术，水下基础作业又让工人承担严重健康风险。桥梁完成不仅是设计者的成就，也依赖长期劳动、资金和组织。',
            '开放后的人潮与踩踏事故提醒管理者，结构建成不等于公共使用已经安全有序。大桥后来成为城市象征，工程、劳动与日常交通的历史也始终并存。',
          ],
        },
      ],
    },
    sources: sourcesById['category-brooklyn'],
  },
  'world-berlin-africa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1884至1885年，欧洲列强等在柏林讨论非洲贸易、河流航行与殖民占领规则。会议试图协调彼此竞争，使扩张可以用共同承认的外交与法律语言加以安排。',
            '非洲国家和社会没有作为平等参与者决定这些规则。会议也没有当场画定所有非洲边界，实际占领仍通过此后的战争、胁迫、条约和行政进入推进，各地抵抗与合作又改变了进程。',
            '殖民分界切割了许多已有政治共同体、贸易道路和生活空间。柏林会议应被理解为瓜分中的重要协调环节，而不是把非洲历史全部变为欧洲谈判桌上一张地图。',
          ],
        },
      ],
    },
    sources: sourcesById['world-berlin-africa'],
  },
  'world-indian-national-congress': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1885年12月，印度国民大会党在孟买召开首次大会，来自不同地区的代表开始以共同平台讨论殖民统治下的政治诉求。早期参与者主要是知识界、法律和其他专业人士。',
            '他们希望扩大印度人在行政和政治中的参与，利用请愿、讨论与公共舆论推动改革。跨地区组织把原先分散的议题连接起来，却仍受到语言、社会身份和参与范围限制。',
            '后来大会党逐渐走向更广泛的群众动员与独立要求，是此后数十年的变化。1885年的会议建立了持续组织的起点，不能直接等同于后来整个印度民族运动。',
          ],
        },
      ],
    },
    sources: sourcesById['world-indian-national-congress'],
  },
  'category-pasteur': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1885年7月，遭犬咬伤的约瑟夫·迈斯特来到巴斯德实验室，研究团队与医生为他实施一系列狂犬病暴露后接种，尝试在发病前阻止疾病进展。此前的动物研究，为这一高风险的人体应用提供了实验基础。',
            '实施依赖不同研究人员的制备、观察与医生的临床判断，并非巴斯德独自完成一次注射。病例结果受到关注，随后更多接种与机构建设推动了方法传播。',
            '这一节点属于医学研究进入应用的历史，后来的安全标准、制剂和临床规范又不断改变。它说明实验、专业协作与公共信任怎样共同影响新技术的采用。',
          ],
        },
      ],
    },
    sources: sourcesById['category-pasteur'],
  },
  'world-brazil-abolition': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1888年，巴西通过《黄金法》，废除奴隶制度的合法存在。长期逃亡、反抗、废奴组织与政治压力，使种植园秩序越来越难以维持，立法确认了这一重大身份变化。',
            '获得自由的人能够摆脱法律上被占有的地位，却没有同时得到充分土地、教育或经济保障。谋生、居住和家庭团聚仍受原有财产与权力结构限制。',
            '废奴因而既是国家制度的断裂，也是自由人继续争取实际生活条件的新阶段。奴隶主与王室的关系也随之变化，帝制危机很快在下一年进一步扩大。',
          ],
        },
      ],
    },
    sources: sourcesById['world-brazil-abolition'],
  },
  'category-eiffel': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1889年3月31日，为巴黎世界博览会营建的埃菲尔铁塔完成主体结构并举行纪念仪式。高耸的金属构架把工业加工、计算和现场施工变成可供公众观看的城市景观。',
            '构件先在工厂精确制作，再运往现场铆接，工程需要控制尺寸误差、风荷载与工人操作。主体落成时，内部和电梯等设施尚未全部完成，公众使用又是后续安排。',
            '铁塔初建时引起强烈审美争论，后来才逐渐成为巴黎象征。它的城市地位由博览会、通信用途与长期观看习惯共同塑造，而非落成当天已经毫无争议。',
          ],
        },
      ],
    },
    sources: sourcesById['category-eiffel'],
  },
  'depth-van-gogh-starry-night': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1889年，梵高在圣雷米时期绘制《星夜》，将夜空、柏树、村落与山势组织为强烈的色彩和旋动线条。画面来自观察，也经过记忆、组合与想象的改造。',
            '近处深色柏树与明亮天空形成对照，星月周围的笔触让静止画布产生运动感。村庄并不是窗外景观的简单复制，自然经验在创作中转为新的空间与情绪关系。',
            '作品后来因复制、展示和梵高传记而广泛传播。解释画面可以联系生活处境，却不宜把每一道笔触直接当作某种心理诊断，也无须用天象推算补出未经证实的作画日。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-van-gogh-starry-night'],
  },
  'world-nz-suffrage': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1893年，新西兰修改选举法，妇女取得议会选举投票权，其中包括毛利妇女。改革来自多年组织、宣传和大规模请愿，支持者把分散的要求转为议员无法忽视的公共压力。',
            '投票权使妇女能够直接参与选择国会代表，却没有同时开放全部参选资格和政治职位。不同群体在土地、收入与社会地位上的不平等，也仍影响实际参与。',
            '这项改变成为国际妇女参政运动的重要例证。它显示权利既需要法律承认，也需要持续组织和制度调整，才能在日常政治中真正使用。',
          ],
        },
      ],
    },
    sources: sourcesById['world-nz-suffrage'],
  },
  'world-hawaiian-overthrow': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1893年，种植园主、商人及其政治盟友推翻夏威夷莉莉乌欧卡拉尼女王，建立临时政府。冲突涉及王权、宪法和土地经济，也与美国在群岛的商业及战略利益相连。',
            '美国驻当地力量对政变的支持改变了双方处境。女王在压力下退让，并不等于夏威夷人民通过自由共同决定放弃国家，原住民和王国支持者此后继续表达反对。',
            '美国吞并到1898年才发生，王国被推翻与后来并吞是两个相接而不同的节点。把它们区分开，才能看到主权被破坏的过程，而非将其写成一次自愿加入。',
          ],
        },
      ],
    },
    sources: sourcesById['world-hawaiian-overthrow'],
  },
  'depth-rontgen-xray': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1895年，伦琴在阴极射线实验中发现一种新的穿透性辐射，并暂称为X射线。它能穿过部分材料，在屏幕或感光材料上留下与内部结构有关的影像。',
            '实验和照片迅速引起关注，人们看到了不切开物体便检查内部的可能，医学与其他检测应用逐步出现。但早期研究者和使用者对辐射伤害认识不足，安全办法还需在实践中建立。',
            '1895年是发现和报告的节点，伦琴1901年获诺贝尔奖属于后来认可。技术可用、风险被理解与使用规范完善，分别经历了不同过程。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-rontgen-xray'],
  },
  'world-adwa': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1896年，孟尼利克二世统率的埃塞俄比亚军队在阿杜瓦击败意大利入侵力量。围绕条约解释与宗主权要求的冲突，使意大利殖民扩张直接威胁埃塞俄比亚独立。',
            '埃塞俄比亚通过大规模动员、军备采购与不同地区力量协作集结军队，利用地形和意军分兵的弱点发动攻击。胜利并非偶然出现，而有持续组织和战略选择作为基础。',
            '战果迫使意大利承认埃塞俄比亚独立，也在被殖民世界产生重要象征意义。对外维护主权与国内不同地区的权力关系仍是两类问题，胜利没有抹去国家内部的复杂性。',
          ],
        },
      ],
    },
    sources: sourcesById['world-adwa'],
  },
  'world-philippine-independence-declaration': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1898年6月12日，菲律宾革命力量在卡维特镇宣告独立，公开展示国旗和新的政治主张。此前反西班牙革命已经展开，美西战争又使殖民统治面对新的军事压力。',
            '宣告为独立诉求赋予可公开辨认的国家象征，但不意味着已控制全部岛屿、结束战争或得到国际承认。西班牙与美国随后在巴黎安排菲律宾归属，并没有让菲律宾人平等决定自身未来。',
            '美国接管主张很快与革命政府发生冲突，新的战争随之出现。6月宣告因此既是民族政治的重要节点，也显示独立表达与实际主权之间仍有艰难距离。',
          ],
        },
      ],
    },
    sources: sourcesById['world-philippine-independence-declaration'],
  },
  'world-spanish-american-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1898年，美国与西班牙开战，战争围绕古巴问题扩大，又在菲律宾等地展开。美国海军胜利和登陆作战使西班牙难以继续维持其残余海外帝国。',
            '巴黎和约中，西班牙放弃对古巴的主权要求，并把波多黎各、关岛和菲律宾转让美国。各地因此进入不同政治处境，有的受到美国占领和干预，有的转入新的殖民统治。',
            '战争削弱旧帝国，也扩大美国的海外权力，殖民地居民的独立诉求却未被一并实现。把它称作所有相关地区同时解放，会掩盖古巴和菲律宾等地继续争取自主的经历。',
          ],
        },
      ],
    },
    sources: sourcesById['world-spanish-american-war'],
  },
  'category-curie': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1898年，玛丽·居里与皮埃尔·居里研究沥青铀矿的放射性，先后报告钋和镭存在的证据。矿物的活性高于其中已知铀成分能够解释的程度，促使他们寻找新的放射性物质。',
            '测量与化学分离相互配合，使看不见的新成分可以通过可重复的差异被追踪。7月提出钋、12月报告镭，只是发现过程中的阶段，获得足够样品并准确测定性质仍需后续大量工作。',
            '研究推动了对原子和放射性的新认识，也依赖实验团队、物料与长期劳动。后来科学和医学应用带来的希望与风险，不能全部倒写为1898年已经确定的用途。',
          ],
        },
      ],
    },
    sources: sourcesById['category-curie'],
  },
  'world-south-african-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1899年，英国与德兰士瓦、奥兰治自由邦两个布尔共和国开战。矿产、帝国扩张与共和国自主地位的冲突，使南非地方争端发展为长期战争。',
          ],
        },
        {
          title: '从正规战争到控制乡村',
          paragraphs: [
            '英国夺取主要城镇后，布尔部队转入游击战。英军为切断支持，使用焦土、据点封锁和集中营，把大量平民从家园迁出；营中疾病、饥饿与恶劣条件造成严重死亡。',
            '非洲黑人同样参与运输、劳动、侦察及作战，并受到拘禁与土地破坏，不能只把战争讲成两个白人政治集团的遭遇。',
          ],
        },
        {
          paragraphs: [
            '1902年和约使两共和国归入英国统治。战后白人之间逐步协调新的国家安排，黑人权利却没有因此获得平等保障，战争结局又进入此后的种族政治。',
          ],
        },
      ],
    },
    sources: sourcesById['world-south-african-war'],
  },
  'phil-husserl-logical-investigations': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '一次判断在头脑中怎样发生，与这个判断是否有效，是两个不同的问题。胡塞尔在1900—1901年分卷出版的《逻辑研究》中，反对用心理活动的事实来解释逻辑规律的有效性。一个人怎样思考，不能直接决定什么才算正确推理。',
            '作品随后细察意义、表达以及意识指向对象的方式。同一对象可以被感知、回忆或想象，不同活动如何仍指向它，成为重要问题。这种面向经验结构的描述，为现象学打开研究道路。',
            '它吸引了一批新的研究者，也使哲学与心理学的界线重新受到讨论。胡塞尔后来发展出的先验现象学经历了继续转变，不能把其后整套理论都读回这部早期作品。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-husserl-logical-investigations'],
  },
  'world-federation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1901年1月1日，澳大利亚六个英国殖民地组成联邦。此前的制宪讨论、公投和协商，把关税、共同防务与跨殖民地交通等问题，逐渐转化为建立共同政府的方案。',
            '原殖民地成为各州，在联邦宪法下保有自己的权力；全国政府则承担共同事务。新的国家框架仍处于大英帝国之内，澳大利亚与英国的法律、外交关系此后才逐步变化。',
            '联邦成立时，政治共同体的边界有明显排斥。原住民的权利遭到压制，移民政策也强化种族限制。联邦史既包括制度如何联合，也包括那些被排除的人如何争取承认与参与。',
          ],
        },
      ],
    },
    sources: sourcesById['world-federation'],
  },
  'world-flight': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1903年12月17日，莱特兄弟在北卡罗来纳州基蒂霍克附近完成四次载人动力飞机试飞。飞行最初只有十余秒，却把持续动力、可控姿态和载人飞行结合在同一架机器上。',
            '这项突破来自多年滑翔试验、风洞研究，以及机翼、螺旋桨和发动机的改进。如何让飞机在空中保持平衡并按意图转向，和怎样提供足够动力同样关键。早期航空还有许多其他探索者。',
            '1903年的飞机仍远离日常运输工具，可靠性、航程和实用操作需要继续解决。此后的工程进展才逐渐把一次短暂试验扩展为跨越海陆的交通，也让天空成为新的战场。',
          ],
        },
      ],
    },
    sources: sourcesById['world-flight'],
  },
  'modern-russell-principles': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '数与数学证明究竟建立在什么基础上？1903年出版的《数学的原则》，集中呈现罗素把数学概念与逻辑联系起来的计划。在他看来，厘清数、关系和命题的结构，有望使数学的基础得到统一说明。',
            '但集合概念也暴露出严重困难：允许任意描述构成集合，会导出悖论。罗素不能只展示逻辑工具的力量，还必须解释这些工具为何不会破坏自己的基础。相关困难推动了他后来的类型理论研究。',
            '本书是逻辑主义与分析哲学发展的重要阶段，不能视作数学已完全化约为逻辑的最终证明。它也区别于罗素与怀特海从1910年起合作出版的《数学原理》。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-russell-principles'],
  },
  'world-russo-japanese': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1904年，日本与俄国围绕朝鲜半岛及中国东北的利益开战。旅顺的军港、东北的铁路和两国扩张计划，使清朝领土上的城市与乡村成为帝国竞争的战场。当地居民承担征发、流离与战火，却缺少决定战争走向的权力。',
            '日军围攻旅顺，在奉天等地与俄军展开大规模陆战；1905年对马海战又重创俄国舰队。日本取得军事优势，但两国都承受沉重消耗。美国斡旋下的《朴次茅斯条约》结束主要战争。',
            '和约调整两国在东北亚的势力范围，日本进一步扩大对朝鲜的控制，并取得俄国在中国东北的部分权益。胜负震动国际舆论，也加深俄国内部危机；对朝鲜与中国当地社会而言，列强力量消长并未带来平等主权。',
          ],
        },
      ],
    },
    sources: sourcesById['world-russo-japanese'],
  },
  'world-russian-revolution-1905': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1905年，圣彼得堡请愿者遭军队开火镇压，工人罢工、农村反抗和军队哗变接连扩大。长期专制、劳工处境与土地问题已经积累不满，日俄战争的失败进一步削弱政府威信。',
            '抗议者的目标并不相同：有人要求宪法与议会，有人追求土地重新分配，还有人希望推翻现存制度。工人在运动中建立代表组织，后来称为苏维埃，为集体行动提供新的形式。',
            '沙皇在《十月宣言》中承诺公民自由和立法机构，杜马于1906年开会。然而君主保留重大权力，政府又以镇压和限制选举削弱反对派。革命未推翻帝制，却使议会、政党和工人组织成为此后俄国政治无法回避的力量。',
          ],
        },
      ],
    },
    sources: sourcesById['world-russian-revolution-1905'],
  },
  'world-maji-maji': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1905年起，德属东非南部多个地区反抗殖民统治。殖民税收、强制劳动和棉花生产要求侵入地方生活，不同共同体由此卷入一场跨地区的战争。',
            '一种被称为“马及”的圣水信仰在动员中发挥作用，但参与者的经历、目标与组织并不完全一致。德国殖民军以武力镇压，并焚毁村落、破坏粮食和生产条件，战争伤亡之外又引发严重饥荒。',
            '1907年前后主要军事抵抗被压下，人口流离与社会破坏却远未结束。殖民档案留下许多行动记录，其“平叛”措辞也暴露统治者的观察位置。理解这场战争，需要看到当地社会为何反抗，以及军事行动怎样变成持续的生存灾难。',
          ],
        },
      ],
    },
    sources: sourcesById['world-maji-maji'],
  },
  'world-persian-constitution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1906年，波斯立宪运动迫使沙阿同意设立议会。财政困境、外国影响与专断政治，使商人、宗教人士和改革知识分子汇集起来，要求国家权力受到法律约束。',
            '当年的基本法与1907年的补充法，确立议会、君主和其他机构之间的新关系，也把权利与国家治理写进宪制框架。宗教权威应处在什么位置、议会如何代表社会，始终存在分歧。',
            '颁布宪法并未结束斗争。政变、地方抵抗与外国干预继续影响立宪事业，整个革命延续到更晚时期。1906—1907年的特别意义，在于代表政治和限制君权从改革主张成为可以据以争辩的制度文本。',
          ],
        },
      ],
    },
    sources: sourcesById['world-persian-constitution'],
  },
  'phil-james-pragmatism': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '如果两种看似相反的理论，对经验和行动完全没有可辨别的差别，我们究竟在争论什么？威廉·詹姆斯在1907年出版的《实用主义》中，用这样的追问重新安排哲学争论。',
            '他要求考察观念在具体经验中如何运作，以及它与已有知识、后续检验和生活实践怎样联系。真理因而不能只被理解为一枚脱离探究过程的标签，信念与行动的关系成为核心问题。',
            '这种立场不等于只要方便或有利就算真实。经验中的约束、相互检验与长期后果仍然重要。作品扩大美国实用主义的传播，也引出关于真理是否会被化约为有用性的持续批评。',
          ],
        },
      ],
    },
    sources: sourcesById['phil-james-pragmatism'],
  },
  'modern-bergson-creative-evolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1907年的《创造进化论》把柏格森关于时间的思考带入生命问题。他认为，真实的绵延包含无法预先穷尽的新变化；把生命拆成静止状态再逐一拼接，容易遗漏变化自身的创造性。',
            '柏格森既不满足于把进化看作机械零件的组合，也质疑把全部过程解释成执行预定目的。他以“生命冲力”等概念表达生命发展的开放性，尝试说明理智习惯怎样影响我们观察生命。',
            '作品使他在国际思想界获得广泛影响，文学和哲学读者尤其关注其时间观。但“生命冲力”属于有争议的哲学解释，不能当作现代生物学已经确证的机制。其历史意义包含对科学解释范围的追问。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-bergson-creative-evolution'],
  },
  'world-congo': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1908年，比利时国家接管利奥波德二世控制的刚果自由邦，改为比利时刚果。此前，橡胶和象牙收益建立在强迫劳动与暴力之上，地方居民的证言和跨国揭露使这一统治遭到越来越强烈的批评。',
            '所谓“自由邦”并不意味着当地居民享有政治自由。军事强制、商业特许与资源征取相互结合，把生产压力转化为对身体和社区的直接伤害。非洲受害者、传教士、记者及社会运动共同使暴行进入国际视野。',
            '国家接管结束了国王的个人统治形式，却保留殖民关系。此后制度有变化，资源与劳动仍受外来权力支配。1908年因此是统治形式的转折，也是观察国际舆论能够改变什么、又留下什么的重要节点。',
          ],
        },
      ],
    },
    sources: sourcesById['world-congo'],
  },
  'world-young-turk-revolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1908年，奥斯曼帝国的青年土耳其运动迫使苏丹恢复1876年宪法。反对专制的军官、知识分子与政治组织，希望以议会和宪政回应帝国的衰弱及领土危机。',
            '宪法恢复后，选举、公共讨论和社团活动获得新的空间。人们开始重新争论：不同宗教与族群能否共享一种奥斯曼公民身份，国家统一和个人权利应该怎样协调。学校里的公民教育也参与塑造这些观念。',
            '共同反对专制不等于对未来已有共识。权力竞争、族群诉求和军事危机继续发展，宪政恢复之后仍有反扑与政治集中化。它打开帝国末期的新阶段，却没有立即兑现平等参与的全部承诺。',
          ],
        },
      ],
    },
    sources: sourcesById['world-young-turk-revolution'],
  },
  'world-korea-annexation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1910年，日本以吞并条约将朝鲜纳入殖民统治。此前，日本已在军事压力下逐步控制朝鲜外交及内政，吞并是多年剥夺主权的结果。',
            '日俄战争后的势力格局，使日本进一步排除其他列强的竞争。朝鲜方面的反对、义兵抵抗与外交努力未能阻止吞并；条约的形成不能理解为平等双方的自由联合。',
            '总督府制度随后重组半岛的行政、警察、土地和教育。经济与基础设施变化发生在殖民权力支配之下，其利益与代价分配极不平等。恢复国家主权、保存文化与反抗殖民统治，成为此后朝鲜社会持续面对的问题。',
          ],
        },
      ],
    },
    sources: sourcesById['world-korea-annexation'],
  },
  'world-mexican-revolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1910年，马德罗号召反对迪亚斯长期统治，墨西哥各地的反抗逐渐汇流。选举受到操纵引发政治危机，土地集中、农村失地与劳工处境，则让变革诉求远超更换总统。',
            '1911年，起义军夺取华雷斯城，迪亚斯随后辞职。马德罗上台，却很快面对不同革命力量的要求：恢复政治竞争能否满足农民对土地的期待，旧军队和地方权力又该怎样处理？',
            '早期革命打破了长期个人统治，也暴露反对派联盟内部的差异。1910年是漫长革命的开端，随后的政变、内战与制度重建还将继续改变墨西哥；本条着重呈现起义兴起至1912年的阶段。',
          ],
        },
      ],
    },
    sources: sourcesById['world-mexican-revolution'],
  },
  'modern-principia-mathematica': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1910年起，怀特海与罗素陆续出版三卷本《数学原理》，尝试在明确的逻辑体系中重建数学。数量、集合和关系等概念，需要通过定义与推导获得位置，而不只依赖熟悉的直觉。',
            '此前发现的集合悖论，使“什么都可以组成集合”的想法无法原样保留。类型理论限制表达和对象之间的关系，试图阻止系统在自我涉及中陷入矛盾；严密性也带来庞大而复杂的形式工作。',
            '这部著作对数理逻辑和数学基础产生深刻影响，其逻辑主义计划仍有争论和限制。它与罗素1903年的《数学的原则》是不同著作，后来的不完备性研究又进一步改变了人们对形式系统能力的理解。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-principia-mathematica'],
  },
  'depth-tagore-gitanjali': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1910年，泰戈尔出版孟加拉文诗集《吉檀迦利》。诗中的祈祷并不只指向远离人世的神圣，也从劳动、自然、失落与日常相遇中寻找人与世界的联系。',
            '这些诗来自孟加拉文学与宗教文化的丰富背景。泰戈尔既继承本土表达，又在殖民时代的教育、思想与社会变化中重新组织它们，诗歌、歌曲和人生思考因而彼此相通。',
            '1912年的英文《吉檀迦利》选译了这部原集及其他诗作，和1910年原集并非逐篇对应。英译扩大国际阅读，1913年获奖进一步推动传播；理解诗集时仍需分清原作、选译与获奖这三个节点。',
          ],
        },
      ],
    },
    sources: sourcesById['depth-tagore-gitanjali'],
  },
  'east-nishida-inquiry-good': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1911年，西田几多郎出版《善的研究》，以“纯粹经验”为起点，讨论意识、实在、善与宗教。他试图从经验尚未被分成主体与客体的层面，重新追问我们如何认识和生活。',
            '近代日本的翻译与大学教育，使欧美哲学进入新的讨论环境。西田把威廉·詹姆斯等人的问题与自身的思想、修行经验相联系，追求的并非简单拼合“东方”和“西方”，而是一套能够回答具体哲学难题的论述。',
            '纯粹经验不意味着放弃概念和反省。作品引出的困难又推动西田后来继续修改自己的立场，发展场所等理论。《善的研究》因此既是日本近代哲学的重要著作，也是一个持续变化的研究起点。',
          ],
        },
      ],
    },
    sources: sourcesById['east-nishida-inquiry-good'],
  },
  'modern-husserl-ideas': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1913年，胡塞尔出版《纯粹现象学通论》第一卷，将现象学推进到新的方向。研究焦点不只在对象是什么，也在对象如何在意识中被给予、获得意义并显得有效。',
            '他提出“悬置”和现象学还原：暂缓日常生活中未经检查的存在设定，转而描述经验与对象显现的关系。悬置并非宣布外部世界不存在，而是改变哲学研究所采取的立场。',
            '这种先验转向引起现象学圈内的分歧。有人认为它说明了经验成立的条件，也有人担心它疏离具体世界。第一卷是1913年的出版节点，其他卷的编辑出版与后续理论发展另有时间，不能合并处理。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-husserl-ideas'],
  },
  'modern-tagore-sadhana': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1913年，泰戈尔的英文讲演集《人生的实现》在伦敦出版。跨国讲演使他面对新的听众，也促使他用不同于诗歌的方式，说明自我、自然与精神生活之间的关系。',
            '书中借助印度思想传统，讨论人怎样超越孤立的个人感受，在行动、爱与创造中建立更广阔的联系。它回应现代生活中的疏离，同时把日常经验与宗教性的理解放在同一讨论中。',
            '这部作品扩展了泰戈尔作为思想家的国际影响，也使跨文化解释本身成为问题：面向欧美听众的语言，既能够搭桥，也可能简化印度思想的多样性。它属于哲学论说，与《吉檀迦利》的诗歌结集和文学奖应分别理解。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-tagore-sadhana'],
  },
  'modern-tagore-nobel': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1913年，泰戈尔获得诺贝尔文学奖，孟加拉诗歌由此进入更广泛的国际阅读。英文《吉檀迦利》及其出版、评论网络，是这次传播的重要媒介。',
            '泰戈尔的写作根植于孟加拉语言、歌曲、宗教和社会经验，国际读者最初接触的却往往是英文选译。翻译帮助作品跨越语言，也会改变语气、节奏以及读者理解作者的方式。',
            '获奖突破了诺贝尔文学奖早期主要面向欧洲文学的格局，使泰戈尔获得更大的公共影响。与此同时，把他概括为某种单一“东方智慧”的代表，又可能遮蔽作品中的历史与社会问题。奖项是传播的转折，不能代替对母语作品的阅读。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-tagore-nobel'],
  },
  'modern-panama-canal': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1914年8月15日，安孔号通过巴拿马运河，完成正式通航航次。船只借助船闸与人工湖跨越地峡，大西洋和太平洋之间多了一条无需绕行南美洲南端的航路。',
            '法国先期工程失败后，美国于1904年接续建设。开挖、筑坝与船闸设计之外，疾病防治和来自多地的劳工同样决定工程能否完成。劳动条件与种族等级，也构成这座工程的历史。',
            '运河重组世界航运，同时深嵌美国的战略利益。巴拿马的独立进程、运河区控制与国家主权长期相连，1914年通航并未结束这些争议，管理权的最终移交要到20世纪末。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-panama-canal'],
  },
  'modern-first-world-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1914年夏，萨拉热窝刺杀引发的危机在最后通牒、军事动员与外交决策中扩大。奥匈、塞尔维亚及其他强国相继卷入战争，民族主义、帝国竞争和多年军备建设，使局部危机拥有了跨国扩散的条件。战争仍是一连串选择的结果，并非刺杀后自动启动的机器。',
          ],
        },
        {
          title: '从欧洲战线到全球动员',
          paragraphs: [
            '西线堑壕与工业化火力留下强烈记忆，但战争也发生在东欧、中东、海洋及殖民地。殖民地士兵与劳工、海上封锁、粮食和工厂生产，把许多远离战线的人纳入冲突。',
            '长期消耗使军队与后方社会承受巨大压力。俄国在革命后退出战争，美国参战又改变力量对比。1918年，各战线的军事失败与帝国内部危机交织，停战相继到来。',
          ],
        },
        {
          paragraphs: [
            '战争造成巨大伤亡，俄国、奥斯曼、奥匈与德意志帝国的政治秩序发生剧变。1918年停战没有同时解决边界、债务、民族权利和殖民统治，战后和平仍要在条约、革命与地方战争中艰难形成。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-first-world-war'],
  },
  'modern-general-relativity': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1915年11月，爱因斯坦提出成熟的广义相对论引力场方程。引力在这套理论中与时空的几何结构相联系，物质和能量影响时空，物体的运动又在这一结构中得到描述。',
            '从狭义相对论走向引力理论，需要重新处理加速运动、等效原理与数学表达之间的困难。突破来自多年的反复计算与修正，也依靠此前已经发展的几何学工具。',
            '1915年的方程报告、1916年的综述与1919年的日食观测，是不同阶段。理论提出以后仍需要检验，其解释力和适用范围也继续受到研究。它为引力、宇宙与致密天体提供了新的基本框架。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-general-relativity'],
  },
  'modern-dewey-democracy-education': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1916年，杜威在《民主主义与教育》中把学校问题放回共同生活。教育不仅传递已有知识，也应使人能够理解经验、与他人合作，并参与不断变化的社会。',
            '他批评把书本和实践、个人成长和社会需要截然分开的做法。活动要产生教育意义，必须包含问题、知识、尝试与反思；“从做中学”并非取消教师和课程，或认为任何活动都会自然带来成长。',
            '民主在书中也超出投票制度，涉及经验能否交流、不同群体能否共同解决问题。这使教育哲学与社会组织紧密相连。作品在多国传播，但学校资源、政治条件与文化语境不同，实践也出现了多种解释。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-dewey-democracy-education'],
  },
  'modern-russian-revolutions': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1917年，战争消耗、粮食困难与政治不满在俄国汇聚。彼得格勒的抗议与士兵倒戈使沙皇退位，帝制崩溃；沿用俄国旧历，这次革命称为“二月革命”，公历则在3月。',
            '临时政府建立后，工兵代表苏维埃同时拥有重要影响。继续战争、土地分配和国家权力应归谁掌握，都无法迅速解决。布尔什维克在这一危机中扩大支持，并于旧历10月、公历11月夺取中央政权。',
            '二月和十月的目标、参与力量与政治结果不同，不能压缩为一次无间断的政权交接。随后内战、经济重组与国家制度建设又有新的冲突；1922年苏联成立，则属于之后的阶段。革命深刻改变了俄国，也重塑全球政治分野。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-russian-revolutions'],
  },
  'modern-versailles': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1919年，战胜国在巴黎讨论战后安排，6月28日与德国签署《凡尔赛条约》。安全保障、赔偿与重建、民族自决和殖民利益交织在一起，各方并没有共同的和平蓝图。',
            '对德条约调整领土、限制军备并安排赔偿责任，也包含国际联盟的制度构想。美国总统威尔逊参与推动和约，美国最终却未批准条约。巴黎和会还有针对其他战败国的安排，并非只有这一份文本。',
            '许多被统治者希望借战后重建争取主权，实际谈判权却很不平等。中国山东问题、委任统治及新边界留下深刻争议。和约塑造战后秩序，也留下不稳定因素；后来战争的发生仍须结合经济危机、政治运动与各国决策解释。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-versailles'],
  },
  'modern-bauhaus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1919年，格罗皮乌斯在魏玛创办包豪斯，把艺术、工艺和建筑放入共同教育实验。一战后的重建需求，使设计不再只是作品外观的问题，也涉及材料、生产以及现代生活该怎样组织。',
            '工作坊让学生通过制作理解材料与形式，基础课程则训练色彩、结构和感知。学校后来迁往德绍、柏林，课程与理念也不断调整：工艺理想、工业生产和社会用途之间，始终存在讨论与张力。',
            '1933年，包豪斯在纳粹压力下关闭。流亡教师和学生把教学经验带往其他地区，影响现代建筑与设计教育。后世常把包豪斯化约为简洁几何风格，但学校十四年间的实践远比一种外观更丰富。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-bauhaus'],
  },
  'modern-wittgenstein-tractatus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1921年，维特根斯坦《逻辑哲学论》的德文文本首先刊于期刊；1922年才出现德英对照书版。这部篇幅不长、以编号组织的著作，追问命题为何能够描绘世界，以及语言表达的界限在哪里。',
            '书中的图像论把命题与可能事态的结构联系起来，逻辑形式使表达成为可能。与此同时，伦理、价值和人生意义无法像普通事实一样被陈述，这使作品的关怀超出技术性的逻辑分析。',
            '它影响逻辑经验主义与语言哲学，也不断引发关于“不可说”以及全书应怎样阅读的争论。维特根斯坦后来批评自己的部分早期想法，但不能据此抹去这部作品自身的问题和历史影响。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-wittgenstein-tractatus'],
  },
  'modern-ulysses': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1922年，巴黎莎士比亚书店出版乔伊斯《尤利西斯》的单行本。小说主要写都柏林的一天，却让日常行走、身体感受、记忆与语言联想，展开为复杂的城市经验。',
            '不同篇章不断变换叙述方式，意识活动与公共语言相互渗透，古典史诗的参照也进入普通人的生活。作品要求读者留意声音、形式和细节，传统情节因而不再是组织小说的唯一中心。',
            '单行本之前的连载已经遭遇审查，巴黎出版又依靠跨国文学网络。1922年标记的是出版事件，不能与故事发生的都柏林时间混同。作品此后的禁令、版本与阅读争论，也成为现代主义文学史的一部分。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-ulysses'],
  },

  'modern-dewey-experience-nature': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1925年，杜威把此前讲座发展为《经验与自然》，试图打通知识与生活之间常被设立的鸿沟。人在自然中行动，也被环境改变；经验因而包括尝试、遭遇、交流与反思，远比脑内一串感觉更广。',
            '从这个角度看，心灵、语言和价值不是突然降临自然的异物，而是在生命与社会活动中形成的能力。哲学的任务包含追问这些能力怎样发生，又如何帮助人应对不确定的处境。',
            '作品将实用主义与自然主义结合，引发有关经验概念、科学方法和价值判断的讨论。1929年的修订继续调整表达，也说明这套哲学不是一份在初版时就已封闭的答案。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-dewey-experience-nature'],
  },
  'modern-quantum-mechanics': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1925年，海森堡尝试重新表述原子物理，把可观测的跃迁及其关系放在中心，减少对经典电子轨道图像的依赖。玻恩、约尔当等人随后发展其数学结构，形成矩阵力学。',
            '新的计算规则不同于经典力学，其中物理量的运算次序可能影响结果。这不是简单给旧图像添加修补，而是改变了描述微观系统所用的基本语言。',
            '1925年仍只是关键转折：薛定谔的波动力学、玻恩的概率解释及海森堡的不确定关系等，在随后几年继续形成。量子力学的建立依靠多人的工作，关于测量和理论解释的争论也没有随计算成功而结束。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-quantum-mechanics'],
  },
  'modern-nishida-place': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1926年，西田几多郎发表《场所》，把问题从经验是什么，推进到经验与判断在何种条件下成立。主体与客体既然能够彼此区分，就需要进一步追问承载这种关系的更深层结构。',
            '这里的“场所”不是地图上的地理位置，也不是放置物品的容器。它是一种哲学概念，试图说明存在、认识与否定如何相互关联，以及对象被判断时所依赖的背景。',
            '这一探索推动西田的场所逻辑发展，也使其思想逐渐离开《善的研究》早期表达。1926年的文章尚未完成他后来关于历史世界与行动的全部论述，相关困难仍在后续著作中继续展开。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-nishida-place'],
  },
  'modern-heidegger-being-time': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1927年，海德格尔出版《存在与时间》，重新追问“存在”意味着什么。他从能够提出这个问题的人入手，将这种存在者称为“此在”，研究其日常生活已经展开的世界关系。',
            '人并非先成为孤立心灵，再推测外部世界。使用工具、与他人相处、承担事情和理解可能性，本来就在生活之中。焦虑、向死存在与时间性的分析，则进一步揭示有限生命怎样理解自己的选择。',
            '这部未按原计划全部完成的著作深刻影响现象学与存在主义。书中概念具有特定论证位置，不能直接化约为个人成长建议；海德格尔后来的思想转变及政治选择，也需要另作历史考察。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-heidegger-being-time'],
  },
  'modern-suzuki-zen-essays': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1927年，铃木大拙英文《禅论集》第一集出版。他面向国际读者介绍禅的历史、经典与经验，尝试解释一种并不容易直接转换为欧美哲学术语的传统。',
            '作品着重呈现觉悟、修行与日常经验之间的关系，既运用经典材料，也带有现代跨文化解释的选择。读者由此获得新的入口，却不能把作者的重点等同于全部禅宗历史。',
            '第二、三集分别于1933年和1934年出版，进一步扩大影响。铃木的书写参与塑造现代世界对禅的理解，其对宗教经验的强调、对制度与社会背景的处理，也持续受到历史研究的检视。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-suzuki-zen-essays'],
  },
  'modern-penicillin': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1928年，弗莱明观察到培养皿中的霉菌周围，细菌生长受到抑制。这一现象使他注意到霉菌产生的抗菌物质，青霉素研究由此获得重要线索。',
            '从观察到药物之间仍有很长距离。提纯、保持活性、证明治疗效果，以及实现稳定的大规模生产，都需要新的实验和工程工作。弗洛里、钱恩、希特利等人及工业团队的贡献不可缺少。',
            '后来青霉素改变了多种细菌感染的治疗，1928年因此被视作医学史的重要节点。但一次培养皿中的发现并不等于当年已有可普遍使用的药品，其实际影响来自多年协作把线索转成治疗能力。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-penicillin'],
  },
  'modern-krishnamurti-dissolution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1929年，克里希那穆提公开解散东方明星社，拒绝被赋予的“世界导师”角色。此前围绕他的期待，试图把个人塑造成精神指引中心；他却在演讲中质疑这种追随关系本身。',
            '他认为，对真理的探索不能由组织身份、信条或某个权威代替。依赖预定道路和领袖，可能使人停止观察自己的恐惧、欲望与思想活动。解散组织因此也是一次对精神权威的公开反思。',
            '这一行动不等于否认所有合作或教育实践。他此后仍讲演并参与办学，矛盾也继续受到讨论：一种反对追随的教导，如何避免再次被奉为新的权威？1929年的事件使这个问题变得格外具体。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-krishnamurti-dissolution'],
  },
  'modern-great-depression': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1929年，经济活动收缩与美国股市崩盘揭开大萧条的危机阶段。股价暴跌是醒目的节点，实际冲击还通过银行、信贷、生产、国际债务与贸易网络不断扩大。',
            '1930—1933年的银行恐慌进一步削弱支付和借贷能力，工厂停产、失业与收入下降又压低需求。金本位下的政策约束和各国贸易措施，使本已相互依赖的经济承受更强压力。农民、工人和不同殖民地区的经历并不相同。',
            '政府在救济、公共工程、货币与金融管理上探索新办法，国家承担的经济责任由此发生变化。各国进入衰退和走向复苏的时间不一，大萧条也不能只用一个股市日期或单一原因解释。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-great-depression'],
  },
  'modern-popper-discovery': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '波普尔《研究的逻辑》初版题年为1935年，实际发行常记为1934年末。书中提出，一个理论若被称为经验科学，就应当允许经验显示它可能出错，而不只是不断寻找相符的事例。',
            '可证伪性因此成为他讨论科学划界的重要标准。科学知识的发展依靠大胆提出猜想，并设计严厉检验；尚未被推翻也不等于已经得到绝对证明。',
            '现实检验涉及仪器、观察条件和辅助假设，某次异常不能自动决定整套理论的命运。作品后来引发科学哲学的广泛争论，1959年英语版又扩大其影响；这一后来的译本不能当作原作首次问世。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-popper-discovery'],
  },
  'modern-hoover-dam': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1935年，科罗拉多河上的胡佛坝开始蓄水，并举行落成典礼。高坝与米德湖把防洪、供水和水力发电结合起来，成为美国西南部区域开发的重要基础设施。',
            '工程需要在峡谷与高温环境中组织大规模施工，围堰、导流和混凝土浇筑连接为复杂的工作体系。工人的劳动和事故风险，与壮观的坝体同属这项建设的历史。',
            '1935年的典礼不表示所有工程与发电机组同时完成。水坝为城市、农业和工业提供条件，也改变河流生态与下游水文。谁能获得水与电、谁承担环境变化，始终与这座工程的收益相连。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-hoover-dam'],
  },
  'modern-ambedkar-annihilation-caste': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1936年，安贝德卡原拟向改革团体发表一篇批评种姓的演说。主办方无法接受其对宗教权威的挑战，演讲没有在原会议上进行；他随后自行出版，成为《种姓的消灭》。',
            '他把种姓视为组织婚姻、劳动和社会交往的制度，指出人的尊严与平等不能只靠善意改善。若不触动维持等级的观念和权威基础，社会改革就可能保留最根本的排斥。',
            '作品与甘地等人的争论，使反种姓运动内部的不同道路更加清楚：政治独立与社会平等之间，究竟应怎样安排关系？后来的版本增补了回应材料，阅读时应分清最初演讲与后续论战。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-ambedkar-annihilation-caste'],
  },
  'modern-horkheimer-critical-theory': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1937年，霍克海默发表《传统理论与批判理论》，追问研究者怎样理解自己与社会的关系。如果把知识仅视作收集事实和建立规则，就可能忽略研究本身所依赖的劳动、制度与权力。',
            '批判理论要求分析这些条件，也反思现存社会为何呈现为似乎不可改变的秩序。认识社会与改变社会的可能性因而相连，研究者不能假装自己完全站在历史之外。',
            '这种立场不意味着用政治宣言替代材料和论证。它要求理论说明证据的社会位置，也检查自己的解放目标。文章成为法兰克福学派的重要方法文本，其形成还带着流亡时代与欧洲政治灾难的压力。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-horkheimer-critical-theory'],
  },
  'modern-guernica': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1937年，西班牙内战中的格尔尼卡遭空袭。毕加索在巴黎创作同名巨幅画作，以黑白灰、破碎空间及痛苦的人物和动物，回应战争对平民生活的撕裂。',
            '画面没有按新闻摄影的方式复原空袭。尖叫、断裂的身体和难以安定的视线，令痛苦成为观者必须面对的经验；具体象征的含义却始终存在多种解释。',
            '作品在国际展览和此后的流亡过程中获得反战象征意义。它的创作地点在巴黎，题材指向西班牙的灾难；后来的展示与回归西班牙，又使政治记忆不断进入作品的公共生命。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-guernica'],
  },
  'modern-sartre-nausea': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1938年，萨特出版小说《恶心》。主人公在熟悉的街道、物品和日常动作中，突然感到世界失去理所当然的秩序，存在本身显出难以安放的陌生感。',
            '这种体验把“偶然性”转化为文学经验：事物存在着，却没有一个预先保证其必要性的理由。人的身份与生活意义也不能完全由既定标签提供，叙事因此不断触及创造意义的困难。',
            '小说以人物、感官和语言展开哲学探索，为萨特后来的思想打开阅读入口。主人公的经历不是作者的医学记录，偶然性也不直接推出任何行动都无意义；人与自身计划的关系，仍是作品留下的问题。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-sartre-nausea'],
  },
  'modern-second-world-war': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1939年9月，德国侵略波兰，英法对德宣战，欧洲战争爆发。亚洲的日本侵略战争此前已经展开，因此常用的1939—1945年分期只是观察全球战争的一种框架，不能把亚洲经验推迟到欧洲开战之后。',
          ],
        },
        {
          title: '战争怎样成为全球灾难',
          paragraphs: [
            '德国扩张、苏德战争以及日本在东南亚与太平洋的进攻，使战线连接多个大陆和海域。工业生产、海运、情报与殖民地资源同样决定军队能否持续作战。',
            '占领统治、种族灭绝、强制劳动与大规模轰炸，使平民遭受系统性暴力。纳粹对犹太人的大屠杀及其他迫害，不能被一般战斗伤亡的叙述掩盖。',
          ],
        },
        {
          paragraphs: [
            '1945年，德国在5月投降；日本在8月宣布接受投降安排，9月签署投降书。战争摧毁旧有力量格局，推动联合国成立、殖民帝国解体与美苏对立，同时留下流离失所、城市废墟和漫长的追责与记忆问题。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-second-world-war'],
  },
  'modern-pearl-harbor': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1941年12月7日夏威夷当地时间，日本海空军袭击珍珠港，重创港内美国舰艇与设施，并造成大量人员伤亡。亚洲同一时段已是12月8日，日期差别来自时区。',
            '袭击意在削弱美国太平洋舰队，为日本向南扩张争取行动空间。与此同时，日本还向东南亚和太平洋多处发动进攻，战事不能只用夏威夷的一处港湾概括。',
            '美国随后对日宣战，太平洋战争全面扩大，美国也更深地卷入全球战争。珍珠港行动取得突然袭击效果，却未消除美国长期动员的能力；此后的海军、工业与联盟竞争将改变战争走向。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-pearl-harbor'],
  },
  'modern-camus-sisyphus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1942年，加缪出版《西西弗神话》，从人对意义和清晰的要求出发，追问世界为何并不提供相应保证。“荒诞”产生在人与世界的关系之中，既不是一个物体的属性，也不只是某种低落情绪。',
            '加缪拒绝用虚构的终极答案消除张力，也尝试说明，在没有这种保证时，人仍可以清醒地生活和行动。西西弗不断推石的神话形象，使重复、有限性与反抗获得文学表达。',
            '作品与战争年代的经验相接，却不能简化为鼓励绝望的宣言。它提出的难题，是人在看清限制之后怎样继续肯定生活；加缪后来关于反抗和共同责任的讨论，又将沿此向外展开。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-camus-sisyphus'],
  },
  'modern-stalingrad': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1942年，德军及盟军向苏联南部推进，斯大林格勒成为围绕伏尔加河交通与战略目标的惨烈战场。城市遭轰炸，军队在废墟中逐街争夺，平民生活也被摧毁。',
            '11月，苏军反攻打击德军两翼，形成包围圈。被围部队的空中补给不足，突围与外部解围未能改变困境，饥饿、严寒与持续战斗使处境恶化。1943年初，包围圈内德军陆续投降。',
            '战役重创轴心国军队，使东线力量变化更加明显，也成为战争中的重要心理转折。胜负不是单靠严寒或一座城市的象征决定，兵力部署、补给、指挥及苏军反攻缺一不可，代价则由士兵与居民共同承受。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-stalingrad'],
  },
  'modern-sartre-being-nothingness': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1943年，萨特出版《存在与虚无》，以现象学方法分析意识与存在。他区分“自在”与“自为”，考察意识如何超出已经给定的状态，以尚未实现的可能性理解自己。',
            '自由、自欺与他人的目光由此相连。人可能把自己说成完全由职位、性格或环境决定，也可能假装没有任何条件，以逃避选择的责任；自欺正涉及这种对自身处境的扭曲。',
            '萨特的自由不表示愿望必然实现。行动总面对身体、历史和他人，选择却不能完全推给这些条件。作品成为存在主义的重要理论基础，其复杂论证也不能由后来的公众讲演完全替代。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-sartre-being-nothingness'],
  },
  'modern-beauvoir-pyrrhus': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1944年，波伏瓦出版《皮洛士与西内阿斯》，借古代对话中的追问展开伦理思考：一个人不断追求目标，究竟凭什么说这些目标值得实现？',
            '行动并没有一个能替所有人预先封好的终点。人的计划会进入他人的世界，也依靠他人的回应而继续获得意义，因此个人自由不能只被理解为独自作决定。',
            '波伏瓦由此讨论依存、责任与承认的关系。帮助别人也可能变成替别人规定人生，单靠善意不能消除这种危险。这部早期伦理著作为她后来更系统的自由与处境分析奠定了问题基础。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-beauvoir-pyrrhus'],
  },

  'modern-normandy-landings': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1944年6月6日，盟军在法国诺曼底实施海空协同登陆。运输舰队把部队送上海滩，空降兵在内陆夺取要点，行动意在建立能够持续增援的立足点，从西欧向德国推进。',
            '长期准备包含船只、装备、空中优势、情报与欺骗行动，天气和潮汐也影响决策。不同海滩和空降区域的战况差异很大，一些部队推进较快，另一些遭到猛烈火力与严重损失。',
            '登陆日并未立即打通通往德国的道路。巩固滩头、夺取港口与突破法国乡间防线，仍需数周艰苦作战，平民也付出沉重代价。诺曼底使德国更直接承受东西两面的战略压力，是盟军反攻的重要阶段。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-normandy-landings'],
  },
  'modern-bretton-woods': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1944年，多国代表在美国布雷顿森林讨论战后货币与重建。大萧条、竞争性贬值与贸易障碍的经验，使他们希望建立一种能够缓解国际支付危机、支持合作的制度。',
            '会议形成国际货币基金组织与国际复兴开发银行的安排，并规划以美元为中心的汇率体系。各国货币、美元与黄金之间的关系，成为战后国际经济秩序的重要支架。',
            '1944年会议不等于机构当年已全面运作，批准、正式成立和开展业务还有后续阶段。制度也体现各国资源与谈判权的不平等；后来汇率体系发生重大转变，相关机构则继续调整自己的业务与角色。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-bretton-woods'],
  },
  'modern-merleau-perception': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年，梅洛-庞蒂出版《知觉现象学》，把身体放在认识世界的中心。身体不只是被观察的物体，也是行动、感受和理解周围环境的主体。',
            '熟练行走、使用工具或辨认方向，并不总要先计算每一个动作。身体图式、习惯与运动能力显示，人在明确反思之前，已经处在一个具有意义的世界之中；知觉也不能只靠零散感觉的相加来解释。',
            '作品在现象学与心理学材料之间展开对话，改变了心灵与身体、主体与环境的讨论方式。身体既有生理条件，也在社会活动中形成，其意义因此超出单纯的生物机制。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-merleau-perception'],
  },
  'modern-popper-open-society': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年，波普尔出版《开放社会及其敌人》。战争与极权政治的背景，使他特别警惕一种思想：声称已经掌握历史的必然方向，再以此要求社会服从某种整体计划。',
            '他主张把政治制度设计成可以批评、纠错并和平更换掌权者的安排。相比许诺一劳永逸的完美秩序，逐步解决具体问题更能保留检验后果和修正错误的空间。',
            '作品对柏拉图、黑格尔和马克思的解释引发大量争议，其历史论证不能视作无争议结论。它留下的核心问题，是社会如何容许异议，并防止任何人以“历史真理”取消他人的判断和权利。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-popper-open-society'],
  },
  'modern-auschwitz-liberation': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年1月27日，苏军进入奥斯维辛集中营，发现仍在营中的幸存者以及纳粹大规模杀戮的证据。此前，纳粹已经迫使大量囚犯撤离，许多人死于死亡行军与后续关押。',
            '奥斯维辛营地体系兼有集中、强制劳动与灭绝功能，是纳粹对犹太人实施大屠杀的核心地点之一，其他群体也在此遭到监禁和杀害。解放揭示的不是孤立暴行，而是一套组织化迫害与杀戮体系。',
            '军队到达并未立刻结束幸存者的苦难。疾病、营养不良、失去家人和无家可归继续影响他们。1月27日属于这处营地的解放日期，不能当作大屠杀的起点，也不是所有营地同时获释的日子。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-auschwitz-liberation'],
  },
  'modern-atomic-bombings': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年8月6日和9日，美国分别在广岛、长崎投下原子弹。爆炸、冲击波与高热摧毁大片城区，造成大规模死亡，幸存者还持续面对烧伤、辐射相关疾病及失去亲人的后果。',
            '核武器来自战争时期的大型科研与工业动员，其使用把城市居民置于前所未有的毁灭力量之下。即时伤亡、此后死亡及长期健康影响属于不同统计范围，不能任意混为一个精确数字。',
            '轰炸与苏联对日参战、日本决策危机共同处在战争结束前的关键时段。投弹是否必要、决策者有哪些选择，长期存在历史争论。两座城市的灾难也使核武器控制、战争伦理与幸存者记忆成为战后世界无法回避的问题。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-atomic-bombings'],
  },
  'modern-united-nations': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年6月26日，各国代表在旧金山签署《联合国宪章》；10月24日，宪章生效，联合国正式成立。世界大战的破坏，使维持和平与组织国际合作成为迫切目标。',
            '宪章确立大会、安理会等机构，结合国家主权、集体安全和国际合作的原则。安理会常任理事国的特殊地位，同时体现战后力量格局，也使大国合作成为制度能否行动的重要条件。',
            '联合国提供持续谈判、制定共同规则与开展合作的场所，但没有消除国家之间的利益冲突。殖民统治、冷战与不平等继续影响其实际能力。签署和生效是建制节点，和平与权利仍取决于此后的政治行动。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-united-nations'],
  },
  'modern-unesco-constitution': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年11月16日，各国代表在伦敦通过联合国教科文组织《组织法》，把教育、科学与文化合作纳入战后和平建设。和平不仅需要停战和外交协议，也需要改善不同社会之间的理解。',
            '这一构想把知识传播、教育机会与文化交流视为国际合作的领域。战争中的宣传、种族主义以及学校和文化机构遭到破坏，使相关问题具有格外紧迫的现实背景。',
            '《组织法》到1946年11月4日才生效，具体项目则在此后陆续发展，不能把后来所有文物、教育和科学计划都归到成立当年。组织的形成提供了合作框架，如何处理国家利益、文化差异与共同标准仍须长期协商。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-unesco-constitution'],
  },
  'modern-indonesia-independence': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1945年8月17日，日本战败前后，苏加诺与哈达在雅加达宣告印度尼西亚独立。荷兰殖民统治和日本占领的经历，使民族主义、政治组织与群众动员进入新的关口。',
            '宣言建立共和国的政治主张，却没有使外部控制和内部分歧自动消失。各地青年、地方力量与新政府对行动节奏和未来国家都有不同期待，荷兰也试图恢复统治。',
            '随后数年，武装冲突与外交谈判交错进行，直到1949年发生主权移交。1945年的意义在于公开确立独立建国的出发点；从宣言到国际承认、国家整合和日常治理，仍是一段充满斗争的过程。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-indonesia-independence'],
  },
  'modern-sartre-existentialism-humanism': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1946年，萨特将前一年公开演讲的文本出版为《存在主义是一种人道主义》。他面向广泛公众，回应存在主义是否意味着绝望、虚无或任意行动的批评。',
            '人的生活没有一份预先写好的本质可供照办，必须通过行动形成自己。选择因此包含责任，也显示一个人认为怎样的生活值得被实践；自由并不是只考虑自己的方便。',
            '简明讲演使存在主义成为战后公共话题，也容易让复杂理论被压缩成口号。文本与《存在与虚无》的论证层次不同，更不能代表萨特后来全部政治和哲学立场。1945年是演讲，1946年是本条记录的出版节点。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-sartre-existentialism-humanism'],
  },
  'modern-eniac': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1946年，ENIAC向公众展示，大规模电子计算成为可运行的工程实践。战争中的弹道计算等需求推动建设，电子线路把原先耗时的运算以新的速度完成。',
            '庞大的机器需要大量元件、维护与程序设置。早期使用者通过接线和开关等方式安排运算，程序设计人员的劳动同样决定设备能否解决问题，它与后来普及的存储程序结构并不完全相同。',
            'ENIAC是电子计算史的重要节点，不能作为所有计算思想和机器的唯一开端。此前及同时期还有不同技术路线的探索，1946年特别标记其公开展示，也标记公众对电子计算能力认识的扩大。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-eniac'],
  },
  'modern-beauvoir-ambiguity': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1947年，波伏瓦出版《模糊性的道德》，从人的处境中寻找伦理基础。人既受到身体、历史和他人限制，又能提出计划、改变关系；这种同时受限与开放的状态，无法由单一公式消除。',
            '所谓模糊性，并不是认为所有行为都同样正当。恰恰因为没有绝对答案替人担保，行动者更需要面对后果，并承认他人的自由不能只充当自己目标的工具。',
            '作品讨论压迫、政治行动和责任之间的紧张关系，拒绝以一个崇高终点取消现实中的人。它使存在主义伦理更具体地进入共同生活，也延续了波伏瓦关于个人自由为何依赖他人自由的思考。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-beauvoir-ambiguity'],
  },
  'modern-dialectic-enlightenment': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1947年，霍克海默与阿多诺的《启蒙辩证法》在阿姆斯特丹正式出版，部分文本此前已于1944年内部流通。法西斯主义和大规模毁灭迫使他们追问：以摆脱恐惧和支配为目标的启蒙，为何可能走向相反结果？',
            '书中考察工具理性、神话、反犹主义与文化工业。当理性只剩计算和控制，人与自然、人与人都可能被压缩为可利用的对象；大众文化的生产也可能使表面丰富的选择趋于同质。',
            '这是一种对现代社会的激烈诊断，许多概括受到后来的批评。它并非简单要求放弃理性，而是要求理性反省自身与统治的关系。正式版与早期流通文本的时间，应分别记载。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-dialectic-enlightenment'],
  },
  'modern-india-partition': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1947年8月，英国结束对南亚的殖民统治，印度与巴基斯坦成为独立国家。长期反殖民斗争迎来国家建立，关于政治代表、宗教共同体与权力安排的分歧，却以分治方式得到艰难而剧烈的处理。',
            '边界划分使许多居民突然处在新的国家归属之下。大规模迁徙伴随屠杀、性暴力和家庭离散，旁遮普与孟加拉等地受到深刻冲击。宗教身份不能概括每个人的愿望，也不使暴力成为必然。',
            '国家成立之后，难民安置、土邦归属、边界与公民权仍待解决。巴基斯坦当时包括彼此分隔的东西两部分，东部后来成为孟加拉国。独立与分治因而既是国家史的起点，也是持续影响南亚社会的个人与集体创伤。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-india-partition'],
  },
  'modern-gatt': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1947年，多国签署《关税与贸易总协定》，将关税减让与共同贸易规则结合起来。战后重建者希望避免大萧条时期壁垒上升、贸易萎缩的循环，使跨国交易获得更稳定的条件。',
            '协定围绕非歧视、关税承诺与限制措施建立规则，同时保留具体例外和协商空间。不同国家的产业、发展阶段与谈判能力并不相同，扩大贸易的收益与调整压力也不会平均分配。',
            '1947年是签署节点，1948年开始临时适用。原先更宏大的国际贸易组织计划没有按设想实现，GATT却在多轮谈判中长期运作。后来WTO体系中的GATT 1994与旧协定有承继关系，但不能当作完全同一法律文件。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-gatt'],
  },
  'modern-human-rights-declaration': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1948年12月10日，联合国大会通过《世界人权宣言》，以共同标准陈述人的尊严、自由和平等。大战、种族灭绝与殖民处境，使个人如何免受国家和社会暴力成为国际讨论的核心问题。',
            '宣言同时涉及公民政治权利及经济、社会、文化权利，把免受任意拘禁、表达与信仰自由，同劳动、教育和基本生活条件放入共同文本。其形成经过不同法律与文化背景代表的协商。',
            '宣言本身不是一份与后来公约相同的条约，也没有使各国立即落实承诺。它提供了可以被援引、争取和继续具体化的语言，成为后续公约、社会运动与权利讨论的重要依据。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-human-rights-declaration'],
  },
  'modern-world-council-churches': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1948年，不同地区与宗派的教会在阿姆斯特丹成立普世教会协会。此前长期的合一运动与跨教会合作，在战争破坏后的环境中获得新的组织形式。',
            '参与者希望在保持各自传统的同时，开展神学对话、救济和共同社会行动。战争责任、和平与种族关系等问题，使教会间的合作超出仪式与教义讨论。',
            '协会没有取代成员教会，也并非一个涵盖所有基督教传统的统一宗派。如何在真实差异中合作，仍是它持续面对的问题；其历史意义在于把分散的对话和实践建立为较稳定的国际平台。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-world-council-churches'],
  },
  'modern-beauvoir-second-sex': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年，波伏瓦分两卷出版《第二性》，追问女性为何长期被置于相对于男性的“他者”位置。生理差异如何被解释为社会命运，是全书反复检视的问题。',
            '她把历史、神话、制度与日常经验并置，分析教育、劳动、亲密关系及母职怎样塑造女性处境。所谓成为女人，强调社会角色的形成过程，不能把既有秩序简单归结为自然安排。',
            '作品推动战后女性主义，将性别不平等与自由、经济条件和主体性联系起来。其经验范围与部分判断，也受到后来不同地区、阶级和思想立场的女性主义者批评。影响深远并不意味着它已经代表所有女性的生活。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-beauvoir-second-sex'],
  },
  'modern-ryle-concept-mind': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年，赖尔出版《心的概念》，批评把心灵想成身体内部另一个隐秘实体的图景。他认为，这种说法可能把本属不同说明层次的概念，错误地当作同类东西。',
            '通过“范畴错误”的分析，他考察知道、理解、相信和能够行动等词怎样使用。一个人懂得做某事，不总意味着他先在心里背出一套规则；能力、习惯与具体实践同样属于理解的内容。',
            '赖尔没有因此宣称心理生活不存在，也不能直接等同于实验心理学中的行为主义。作品改变了心灵哲学的提问方式：在解释某种神秘内部对象之前，先检查我们是否已经误解了心理概念。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-ryle-concept-mind'],
  },
  'modern-nato': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1949年4月，美国、加拿大和西欧等国签署《北大西洋公约》。战后欧洲的安全焦虑、德国问题与美苏对立，使跨大西洋防务合作逐步制度化。',
            '公约把对成员的武装攻击视为共同安全问题，建立集体防御承诺。但成员如何采取行动，仍涉及各自认为必要的措施与宪制程序，不能理解为所有情况都自动触发同一种军事反应。',
            '北约使美国对欧洲安全的参与获得长期框架，也成为冷战阵营结构的重要组成部分。盟国之间仍存在战略与政治分歧，组织的运作需要持续协商，不能由条约签署推断所有外交立场从此一致。',
          ],
        },
      ],
    },
    sources: sourcesById['modern-nato'],
  },
}

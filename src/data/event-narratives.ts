import type { HistoryEvent, Source } from '../types'
import { bookUrl } from './sources'
import { chineseEventNarratives } from './event-narratives-china'
import { worldEventNarratives } from './event-narratives-world'
import { warringStatesNarratives } from './event-narratives-warring-states'
import { qinEventNarratives } from './event-narratives-qin'
import { lateWarringNarratives } from './event-narratives-late-warring'
import { earlyHanNarratives } from './event-narratives-early-han'
import { hanWudiNarratives } from './event-narratives-han-wudi'
import { hanTransitionNarratives } from './event-narratives-han-transition'
import { easternHanNarratives } from './event-narratives-eastern-han'
import { hanEndNarratives } from './event-narratives-han-end'
import { weiJinNarratives } from './event-narratives-wei-jin'
import { suiTangNarratives } from './event-narratives-sui-tang'
import { ancientWorldNarratives } from './event-narratives-ancient-world'
import { songYuanNarratives } from './event-narratives-song-yuan'
import { northSouthNarratives } from './event-narratives-north-south'
import { earlyChinaNarratives } from './event-narratives-early-china'
import { mingNarratives } from './event-narratives-ming'
import { earlyQingNarratives } from './event-narratives-qing-early'
import { laterWorldNarratives } from './event-narratives-world-later'
import { postwarNarratives } from './event-narratives-postwar'
import { postwarThoughtNarratives } from './event-narratives-postwar-thought'
import { modernWorldNarratives } from './event-narratives-world-modern'
import { modernChinaNarratives } from './event-narratives-china-modern'

/** Original articles with structures chosen for each event, rather than its category. */
export const eventNarratives: Record<
  string,
  { narrative: NonNullable<HistoryEvent['narrative']>; sources: Source[] }
> = {
  ...chineseEventNarratives,
  ...worldEventNarratives,
  ...warringStatesNarratives,
  ...qinEventNarratives,
  ...lateWarringNarratives,
  ...earlyHanNarratives,
  ...hanWudiNarratives,
  ...hanTransitionNarratives,
  ...easternHanNarratives,
  ...hanEndNarratives,
  ...weiJinNarratives,
  ...suiTangNarratives,
  ...ancientWorldNarratives,
  ...songYuanNarratives,
  ...northSouthNarratives,
  ...earlyChinaNarratives,
  ...mingNarratives,
  ...earlyQingNarratives,
  ...laterWorldNarratives,
  ...postwarNarratives,
  ...postwarThoughtNarratives,
  ...modernWorldNarratives,
  ...modernChinaNarratives,
  chibi: {
    narrative: {
      sections: [
        {
          paragraphs: [
            '建安十三年，曹操率军南下。荆州牧刘表去世后，继任的刘琮投降，曹操取得荆州的重要据点和水军，继续向长江推进。刘备在败退中寻找新的立足之地；据有江东的孙权，也必须决定如何应对这个逼近的强敌。',
          ],
        },
        {
          title: '从各自应战到联合抗曹',
          paragraphs: [
            '长江原本是孙权抵御北方军队的重要屏障，但曹操接收荆州水军后，也有了沿江进攻的条件。孙权部下因此出现分歧：有人主张归附，有人坚持抵抗。周瑜认为，曹军远道而来，北方士兵不习水战，又面临疾病和后方局势未稳等困难，兵力优势未必能转化为胜势。',
            '与此同时，鲁肃与刘备接触，诸葛亮又出使孙权。双方有了共同抗曹的基础。孙权最终派周瑜、程普等率军，与刘备协同作战。联盟把江东的水军力量和刘备一方的兵力结合起来，使抵抗有了实际支撑。',
          ],
        },
        {
          title: '火攻怎样成为转折',
          paragraphs: [
            '双方在赤壁一带交战时，曹军已经出现疾病。据《三国志·周瑜传》记载，曹军初战失利，退驻长江北岸，与南岸的周瑜等军相对。黄盖观察到曹军战船首尾相接，提出火攻，并以诈降为掩护，让装载柴草和油料的船只接近对方。',
            '火船借风冲入曹军船阵，火势又延及岸上的营地，造成混乱和伤亡。孙刘军随后追击，曹操撤退，留下曹仁等守江陵，自己北返。火攻是战局的重要转折，而此前的疾病、行军消耗与水战条件，也共同影响了曹军的作战能力。',
            '这场胜利保住了孙权在江东的统治，也给刘备重新发展势力留下空间。此后，各方继续争夺荆州，刘备又向益州发展，三国格局才逐步形成。赤壁之战改变了曹操此次南征的结果，天下的归属仍要经过多年战争才能确定。',
          ],
        },
      ],
      note: '不同记载对火攻和疾病的侧重有所不同，具体兵力也难以精确核定。本文采用《周瑜传》的主要战斗叙述，不将小说中的情节混入经过。',
    },
    sources: [{ title: '《三国志》卷54 · 周瑜、鲁肃、吕蒙传', url: bookUrl('三國志', '54') }],
  },
  shangyang: {
    narrative: {
      sections: [
        {
          paragraphs: [
            '秦孝公即位时，秦国面对魏国等诸侯的竞争，希望收复失地、增强国力。他发布求贤令，商鞅由魏入秦，提出通过改变法令和治理方式来富国强兵。在孝公支持下，改革逐步展开，通常以前356年作为第一阶段的纪年。',
            '秦国要解决的，是怎样把更多粮食、人口和兵力组织起来，持续投入诸侯之间的竞争。',
          ],
        },
        {
          title: '让耕作和作战直接关系到个人处境',
          paragraphs: [
            '商鞅把奖励集中到农业生产和军事功劳上。努力耕织、生产粮食布帛，可以获得相应优待；在战争中立功，则可按功授爵，获得与爵位相应的待遇。宗室成员也受到军功要求的约束，出身所带来的特权受到限制。',
            '对普通人而言，军功提供了改变身份的途径，也让个人前途更紧密地系于国家战争。与奖励并行的是严厉的控制：居民被编入什伍，相互监督，隐瞒违法行为可能受到连坐；成年兄弟不分家的家庭，则承受更重的赋税。这些措施深入到家庭和邻里，使国家能够更直接地管理居民。',
          ],
        },
        {
          title: '改革怎样落到地方',
          paragraphs: [
            '随着改革推进，秦国又迁都咸阳，将一些乡邑整合为县，设置县令、县丞，并调整田地疆界，统一度量衡。农业、征税和地方行政由此进一步联系起来。理解这些措施，可以把握一个共同方向：秦廷试图用更统一的制度，掌握地方的人口、土地和资源。',
            '新法也触动了原有利益。《史记》记载，太子犯法后，商鞅处罚了太子的师傅。这类做法强化了执行新法的威势，也加深了他与宗室贵戚之间的矛盾。改革能够推行，既依靠法令和官吏，也依靠秦孝公持续提供政治支持。',
          ],
        },
        {
          title: '商鞅的结局与改革的后续',
          paragraphs: [
            '前338年，秦孝公去世，商鞅失去最重要的支持者，随后遭到追捕，在反抗中被杀，尸身又被车裂示众。他个人的政治生涯就此结束，秦国在变法中强化的军功奖赏和地方治理方式，却继续影响后来的发展。',
            '从这些措施看，变法增强了秦国征集资源、组织军队和执行政令的能力，为后续扩张创造了条件。与此同时，连坐与严刑也使居民承受更强的约束。它所改变的，既有秦国与其他诸侯竞争的实力，也有国家权力进入日常生活的深度。',
          ],
        },
      ],
      note: '这里以前356年作为叙述起点，后文概述的是多年改革；迁都、县制调整等措施属于后续阶段。',
    },
    sources: [
      { title: '《史记》卷5 · 秦本纪', url: bookUrl('史記', '5') },
      { title: '《史记》卷68 · 商君列传', url: bookUrl('史記', '68') },
      { title: '《史记》卷87 · 李斯列传（所载谏逐客书回顾商鞅之法）', url: bookUrl('史記', '87') },
    ],
  },
  lanting: {
    narrative: {
      sections: [
        {
          paragraphs: [
            '永和九年暮春，王羲之与友人在会稽山阴的兰亭相聚，举行修禊活动。这是一种临水祓除不祥、祈求平安的习俗，也成为文人饮酒赋诗的契机。按照《兰亭集序》的描写，众人坐在曲水旁，让酒杯顺流而下，在山林与清流之间饮酒、咏诗。王羲之为这次聚会的诗作写下序文。',
            '文章从眼前的欢聚写起，渐渐转向时间与生命：此刻令人欣喜的事情，很快也会成为往事；人的经历各不相同，却都要面对衰老与死亡。王羲之又想到，后人阅读他们的文字，或许也会像他们阅读古人一样，产生相通的感受。一次春日聚会，因此留下了可以跨越时代阅读的心情。',
            '《兰亭集序》后来又以书法闻名，历代临摹、收藏和刻帖，使它不断传播。王羲之的原迹如今已不可见，人们主要通过传世摹本与拓本认识它的面貌。故宫所藏、传统上归于冯承素的“神龙本”，便是其中著名的一件：今天观看这卷书迹，看到的也包含后人保存与传递这次雅集的努力。',
          ],
        },
      ],
    },
    sources: [
      { title: '王羲之 ·《兰亭集序》', url: 'https://zh.wikisource.org/wiki/蘭亭集序' },
      {
        title: '故宫博物院 · 冯承素行书摹兰亭序卷（传统归属及摹本流传）',
        url: 'https://www.dpm.org.cn/collection/handwriting/228279.html',
      },
    ],
  },
}

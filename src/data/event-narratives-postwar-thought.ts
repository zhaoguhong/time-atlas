import type { HistoryEvent, Source } from '../types'

export const postwarThoughtNarratives: Record<
  string,
  { narrative: NonNullable<HistoryEvent['narrative']>; sources: Source[] }
> = {
  'modern-camus-rebel': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1951年，加缪出版《反抗者》，从人拒绝屈辱和不义的行动出发，追问反抗怎样可能转为新的压迫。书把文学、革命与政治暴力放在同一问题中讨论。',
            '反抗者说“不”，同时也承认某种所有人都应被尊重的界限。若为了未来的绝对正义允许无限杀戮，原先保护人的理由便可能被自己的手段摧毁。',
            '作品在战后法国引发激烈争论，也影响加缪与萨特等人的关系。它提出的不是停止改变世界，而是要求改变者持续回答：以谁的生命为代价，什么界限仍必须守住。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Albert Camus',
        url: 'https://plato.stanford.edu/entries/camus/',
        note: 'SEP Camus关于The Rebel的分析与书目，法文L’Homme révolté出版于1951年。',
      },
    ],
  },
  'modern-arendt-totalitarianism': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1951年，汉娜·阿伦特出版《极权主义的起源》，把反犹主义、帝国主义与极权统治的发展联系起来研究。她试图理解，现代社会为何能够出现以意识形态和恐怖全面支配人的政治。',
            '书中的统治不只是旧式暴君扩大权力。群众孤立、组织机制、不断运动的意识形态和集中营，使个人难以保留独立判断及稳定关系，人的自发行动本身成为被摧毁的对象。',
            '作品的历史解释、比较范围和具体判断长期存在争论，后来的版本也有修改。它留下的关键问题是：当法律、事实和人与人的联系被破坏，政治共同体如何滑向全面支配。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Hannah Arendt',
        url: 'https://plato.stanford.edu/entries/arendt/',
        note: 'SEP Arendt导言与The Origins of Totalitarianism讨论，明确1951年。',
      },
    ],
  },
  'modern-quine-two-dogmas': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1951年，奎因发表《经验论的两个教条》，质疑分析真理与综合真理之间的严格界线，也批评把每个有意义命题单独还原为经验材料的设想。',
            '在他的解释中，面对经验检验的是彼此关联的信念网络，修正可以发生在不同位置。语言、理论与观察之间的关系，因此比“一句话对应一项经验”的图景复杂。',
            '文章并不是宣布逻辑、科学或证据无效，而是重新追问它们怎样共同工作。围绕意义、必然性和认识论的后续争论，很大程度上继续回应这些挑战。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Willard Van Orman Quine',
        url: 'https://plato.stanford.edu/entries/quine/',
        note: 'SEP Quine关于分析—综合区分的讨论与Primary Sources：1951，Philosophical Review 60:20—43。',
      },
    ],
  },
  'modern-wittgenstein-investigations': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1953年，维特根斯坦去世后，《哲学研究》出版。与把语言看成统一逻辑结构的设想不同，书中通过提问、例子和对话，考察语言在多种生活活动中怎样使用。',
            '“语言游戏”、家族相似和遵守规则等讨论，让意义回到训练、习惯与共同实践。理解一个词不一定是抓住隐藏的对象，也可能是掌握它在具体场合如何发挥作用。',
            '书没有给所有哲学问题套上新的单一理论，而是反复检查问题如何被某种语言图景误导。身后编辑、不同笔记与文本安排也有自己的历史，不能把出版物当作作者某年一次完成的系统。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Ludwig Wittgenstein',
        url: 'https://plato.stanford.edu/entries/wittgenstein/',
        note: 'SEP Wittgenstein晚期哲学分析及Primary Sources书目，Philosophical Investigations为1953年。',
      },
    ],
  },
  'modern-weil-oppression-liberty': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1955年，西蒙娜·薇依的《压迫与自由》文集在她去世后出版，汇集此前关于劳动、组织与政治支配的思考。它不是1955年新写成的一部统一论著。',
            '薇依追问，生产技术和集体组织为何可能使人变成服从机器、官僚或领袖的工具。仅改变财产名称或统治集团，未必足以解除人在劳动与日常关系中受到的支配。',
            '她把自由与理解、判断和能够参与行动条件联系起来，也警惕把个人完全交给某个自称代表历史的集体。不同文章的写作背景，应与后来的编辑和接受分开理解。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Simone Weil',
        url: 'https://plato.stanford.edu/entries/simone-weil/',
        note: 'SEP Simone Weil原始书目：[OL] Oppression et liberté，Paris: Gallimard，1955。',
      },
    ],
  },
  'modern-arendt-human-condition': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1958年，阿伦特出版《人的境况》，从劳动、工作与行动三种活动讨论现代生活。维持生命的循环、制造相对持久的世界，以及人与人之间开启新事物，被放在不同层次理解。',
            '行动依赖人的多样性和公共相见：人通过言说与共同事务显现自己，却无法完全控制行动的后果。政治自由因此不只是独处时不受干涉，也涉及能否进入共同世界。',
            '书对现代社会、技术和公共领域的判断引发广泛争论。它所提出的问题并非赞美某种古代生活，而是追问，当生产和管理占据中心时，人与人共同开始的空间还剩多少。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Hannah Arendt',
        url: 'https://plato.stanford.edu/entries/arendt/',
        note: 'SEP Arendt导言与行动理论部分，The Human Condition出版于1958年。',
      },
    ],
  },
  'modern-sartre-dialectical-reason': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1960年，萨特出版《辩证理性批判》第一卷，试图把对个人自由的思考与历史、物质条件和集体行动结合。人并非在空白处选择，而是在他人行动留下的制度与资源关系中生活。',
            '匮乏、竞争和被动串联，能够使许多人即使没有共同计划，也形成相互限制的社会结果。某些情境下，人又会结成共同行动的群体，但组织固定下来后也可能重新产生约束。',
            '作品以复杂分析讨论实践如何成为历史，不把结构和自由简单二选一。后续计划未由作者完整出版，1960年文本应按第一卷及其开放问题理解。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Jean-Paul Sartre',
        url: 'https://plato.stanford.edu/entries/sartre/',
        note: 'SEP Sartre §6 Existentialist Marxism: Critique of Dialectical Reason，明确第一卷1960年、第二卷1985年。',
      },
    ],
  },
  'modern-gadamer-truth-method': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1960年，伽达默尔出版《真理与方法》，从艺术、历史与语言经验出发讨论理解。解释者并非站在所有传统之外，而是已经带着语言、期待和历史处境进入问题。',
            '理解需要让自己的预先判断面对文本和他人的要求，在问答中发生调整。“视域融合”不是把差异抹平，而是描述人怎样在相遇中扩大可理解的范围。',
            '书名也不表示所有真理都能由固定方法保证。作品反而追问，某些理解经验如何超出技术程序，并让解释者本人受到改变。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Hans-Georg Gadamer',
        url: 'https://plato.stanford.edu/entries/gadamer/',
        note: 'SEP Gadamer生平及诠释学讨论，明确Truth and Method于1960年出版。',
      },
    ],
  },
  'modern-foucault-madness': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1961年，福柯以《疯癫与非理性》研究欧洲怎样划分理性与疯癫，后来广为人知的《疯癫史》源于这项工作。医院、收容和知识分类被放回各自制度环境。',
            '他关注的不是简单写一部医学不断进步的历史，而是追问谁有资格说话、哪些行为被排除，以及照护和控制为何常在同一机构中出现。被归为疯癫者的经历，由此成为理解现代社会边界的问题。',
            '其史料选择和宏观解释受到持续批评，文本又有删节、修订和翻译差异。它的影响在于打开制度与知识共同塑造对象的研究方向，而非提供精神疾病的临床判断。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Michel Foucault',
        url: 'https://plato.stanford.edu/entries/foucault/',
        note: 'SEP Foucault §3.1 Histories of Madness and Medicine及原始书目，Folie et déraison为1961年。',
      },
    ],
  },
  'modern-levinas-totality-infinity': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1961年，列维纳斯出版《总体与无限》，把与他人的伦理关系放在哲学思考中心。他质疑一种倾向：把所有差异都纳入自己的概念和掌握之中，使他人只是我理解世界的材料。',
            '“面容”指向他人对我的要求，而不只是可以观察的外貌。面对他人的脆弱，我已经被要求回应，伦理责任因而不能完全从个人利益或先行契约推出。',
            '这种写法重新安排知识、自由与责任的关系，也引出责任如何进入公共制度的难题。书中并未给出一套可以直接套用所有冲突的政策，而是要求保留他人不被化约的地位。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Emmanuel Levinas',
        url: 'https://plato.stanford.edu/entries/levinas/',
        note: 'SEP Levinas §2.3 The “Treatise on Hospitality”: Totality and Infinity (1961)。',
      },
    ],
  },
  'modern-nishitani-religion': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1961年，西谷启治出版《宗教是什么》，从虚无主义、死亡与自我问题讨论宗教经验。现代人失去既有意义之后，如何面对自身存在，成为论述的出发点。',
            '他借佛教的空与其他思想传统对话，区分把世界视为毫无意义的虚无，与不再执著于孤立自我的理解。这里的“空”不是简单宣布一切不存在，而是改变人与事物相互关系的视角。',
            '作品后来以《宗教与虚无》等译名进入英语世界，读者对其京都学派背景和跨传统解释持续争论。日文初版、英文翻译和后来的接受，应当分别定位。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · The Kyoto School',
        url: 'https://plato.stanford.edu/entries/kyoto-school/',
        note: 'SEP Kyoto School相关思想讨论；日文初版日期以日本国立国会图书馆1961年书目核对，英译为1982年。',
      },
      {
        title: '日本国立国会图书馆 · 宗教論集 第1（宗教とは何か）',
        url: 'https://ndlsearch.ndl.go.jp/books/R100000039-I2975553',
        note: '西谷啓治著、创文社、1961年书目记录。',
      },
      {
        title: 'University of California Press · Religion and Nothingness',
        url: 'https://www.ucpress.edu/books/religion-and-nothingness/paper',
        note: '英译出版及作品问题说明，不把英译年份当作日文初版。',
      },
    ],
  },
  'modern-kuhn-revolutions': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1962年，托马斯·库恩出版《科学革命的结构》，用科学史检验知识是否总是逐项平稳积累。他把共同体通常接受的范例、问题和标准，与日常研究的运作联系起来。',
            '“常规科学”在既定框架内解题，异常不断出现时却未必立刻推翻框架；危机和新的研究方式可能导致革命。不同范式之间的概念与评价标准也可能发生改变，使争论不能只当作同一把尺上的比较。',
            '这并不等于科学任意或证据无用。库恩要求理解共同体怎样训练、选择问题和转换标准，后来又不断澄清“范式”等术语，回应广泛争议。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Thomas Kuhn',
        url: 'https://plato.stanford.edu/entries/thomas-kuhn/',
        note: 'SEP Thomas Kuhn导言及§2—4，明确1962年The Structure of Scientific Revolutions。',
      },
    ],
  },
  'modern-habermas-public-sphere': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1962年，哈贝马斯出版《公共领域的结构转型》，研究私人如何在阅读、社交与讨论中形成针对公共权力的意见。报刊、咖啡馆、沙龙和社团被放入社会经济变化的历史。',
            '这一公共领域以理性讨论为理想，却建立在阶级、性别和财产门槛之上，许多人并不能平等参与。后来国家、市场和大众传播的发展，又改变意见怎样被组织和展示。',
            '作品提出的不是一个从未有排斥的黄金时代。它为后来的研究提供问题，也在批评中不断修正：有哪些公众被遗漏，讨论需要什么条件，媒体如何同时扩大参与与制造操纵。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Jürgen Habermas',
        url: 'https://plato.stanford.edu/entries/habermas/',
        note: 'SEP Habermas早期公共领域专节与书目，The Structural Transformation of the Public Sphere为1962年。',
      },
    ],
  },
  'modern-austin-words': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1962年，奥斯汀的讲演经整理以《如何以言行事》出版。许多话语不仅陈述事实，也在合适情境中完成承诺、命名、道歉或宣告等行动。',
            '这些行动能否成立，需要身份、程序、场合和听者理解等条件。语言分析因而不能只问一句话真假，还要问说话者正在做什么、如何被接受、产生什么后果。',
            '作品由身后整理的讲稿形成，论述也保留不断修改分类的过程。它推动言语行为研究，却没有把语言活动缩成一张永远固定的动作表。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · John Langshaw Austin',
        url: 'https://plato.stanford.edu/entries/austin-jl/',
        note: 'SEP Austin §1与书目1962b，明确1955 William James Lectures及身后出版版本。',
      },
    ],
  },
  'modern-foucault-order-things': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1966年，福柯出版《词与物》，比较不同时期知识如何安排相似、表象、生命、劳动与语言。问题不是某个学科何时单独发现真理，而是什么条件让某些对象和说法能够成为知识。',
            '他以不同知识配置的变化解释人文科学的出现，所谓“人”的历史性也因此成为争论焦点。这里并不是说现实中的人不存在，而是检验一种现代知识对象怎样被建立。',
            '书中宏观分期和例证长期受到讨论。它的影响在于让研究者追问分类背后的历史条件，而不是把当下的学科边界视为自然且永恒。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Michel Foucault',
        url: 'https://plato.stanford.edu/entries/foucault/',
        note: 'SEP Foucault §3.2 The Order of Things与Primary Sources，Les mots et les choses初版1966年。',
      },
    ],
  },
  'modern-derrida-grammatology': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1967年，德里达出版《论文字学》，检验西方思想中常把言说视为意义直接在场、把书写视为次要复制的安排。语言中的差异与可重复性，使这种优先关系难以稳定。',
            '文本通过细读卢梭等作者，追踪论证依赖却又压低的条件。解构因此不是任意给作品加上解释，而是注意其概念如何在自身运作中产生张力。',
            '作品后来进入文学、哲学和社会理论的广泛讨论，也常被简化为“没有事实”或“怎样说都行”。这些口号不能代替书中关于意义、痕迹和文本结构的具体分析。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Jacques Derrida',
        url: 'https://plato.stanford.edu/entries/derrida/',
        note: 'SEP Derrida生平及Of Grammatology讨论，明确1967年三部主要著作同时问世；本条只记录其中一部。',
      },
    ],
  },
  'modern-wittgenstein-certainty': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1969年，维特根斯坦晚年笔记以《论确定性》刊行。面对摩尔关于自己知道有手、外部世界存在等说法，他追问知识、怀疑和日常确信各自在什么条件下有意义。',
            '某些确信并非每次都由证明推出，而像实践中不被同时转动的铰链，使检验和怀疑能够进行。若把所有背景都一起怀疑，怀疑活动本身可能失去操作条件。',
            '这些笔记不是作者亲自完成的系统专著，排列与标题属于身后编辑。其影响来自尚在探索的语言和例子，而不只是一条宣告某些信念永远不可修正的原则。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Ludwig Wittgenstein',
        url: 'https://plato.stanford.edu/entries/wittgenstein/',
        note: 'SEP Wittgenstein Primary Sources：On Certainty, 1969，Anscombe与von Wright编。',
      },
    ],
  },
  'modern-rawls-justice': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1971年，约翰·罗尔斯出版《正义论》，追问自由平等的人应怎样选择社会基本制度。他设想“原初状态”，让选择者在不知道自己阶级、天赋和人生位置的条件下讨论原则。',
            '平等基本自由、机会公平以及对最不利者的考虑，被组织成制度评价框架。重点不是替每次个人交易作道德判决，而是审查法律、经济和社会制度如何共同分配人生机会。',
            '作品引发自由、平等、社群与全球正义的长期争论，罗尔斯后来也调整说明。无知之幕是一种检验公平的思想装置，不是声称现实中曾真正举行过这样的契约会议。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · John Rawls',
        url: 'https://plato.stanford.edu/entries/rawls/',
        note: 'SEP Rawls生平、作为公平的正义各节及原始书目，A Theory of Justice为1971年初版。',
      },
    ],
  },
  'modern-kripke-naming': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1972年，克里普克《命名与必然性》的讲演文字发表，重新讨论名称怎样指向对象，以及必然真理是否一定能不靠经验知道。最初讲演于1970年在普林斯顿进行。',
            '他用“刚性指示”等概念说明名称在不同可能情境中仍可指向同一对象，并区分认识方式与事实的模态地位。关于水、热和个人同一性的例子，使语言分析与形而上学重新连接。',
            '后来1980年单行本扩大传播，不能与1972年的论文版混作一次出版。论证也引发大量回应，名称的社会传承与说话者知识之间的关系至今仍是讨论对象。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Princeton University · Saul Kripke: Naming and Necessity',
        url: 'https://collaborate.princeton.edu/en/publications/saul-kripke-naming-and-necessity/',
        note: 'Princeton University收录John P. Burgess研究章节摘要，明确1970、1972、1980三个阶段。',
      },
    ],
  },
  'modern-nozick-utopia': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1974年，罗伯特·诺齐克出版《无政府、国家与乌托邦》，为一种严格限制国家职责的立场辩护。个人权利被理解为他人和国家行动不得轻易跨越的约束。',
            '关于分配，他强调财产如何取得、转让以及不义如何纠正，而不是只看某一时刻是否符合预定图样。这也成为对罗尔斯等分配正义理论的重要挑战。',
            '作品并非认为任何现存财富都自然正当，历史取得和矫正要求会使问题复杂。它引出的争论集中在权利、自由交换、公共职责与历史不正义应怎样共同处理。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Robert Nozick’s Political Philosophy',
        url: 'https://plato.stanford.edu/entries/nozick-political/',
        note: 'SEP Robert Nozick’s Political Philosophy导言与§2—3，明确1974年Anarchy, State, and Utopia。',
      },
    ],
  },
  'modern-foucault-discipline': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1975年，福柯出版《规训与惩罚》，从公开酷刑转向监狱、学校、军营等机构，考察现代权力怎样塑造身体与行为。惩罚的变化不只是刑罚变得温和，也涉及控制技术重新组织。',
            '时间表、训练、检查和记录，使个人被观察、比较和分类。全景敞视的模型则说明，持续可见的可能性如何促使人自行调整行动，权力不必每次都直接施加暴力。',
            '作品的历史解释与推广范围受到争议。它的重要问题是：看似日常、中性的制度安排，怎样同时生产能力、知识和服从，而不只是压制已经完整存在的个人。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Michel Foucault',
        url: 'https://plato.stanford.edu/entries/foucault/',
        note: 'SEP Foucault §3.4 History of the Prison及书目，Surveiller et punir出版于1975年。',
      },
    ],
  },
  'modern-habermas-communicative-action': {
    narrative: {
      sections: [
        {
          paragraphs: [
            '1981年，哈贝马斯出版两卷《交往行为理论》，把语言、社会行动与现代社会诊断结合。人们行动时不只计算成功，也可能通过提出理由、回应异议来寻求理解。',
            '交往理性依赖可被质疑和辩护的有效性要求，生活世界则提供共同背景。经济与行政系统有自己的协调办法，但当金钱和权力过度侵入本应通过理解维持的关系，便可能出现“生活世界殖民化”。',
            '理论并不要求消除市场或行政，而是追问不同协调方式的边界。后来民主、法律和公共讨论研究继续从这里展开，也不断检验其对平等参与条件的假定。',
          ],
        },
      ],
    },
    sources: [
      {
        title: 'Stanford Encyclopedia of Philosophy · Jürgen Habermas',
        url: 'https://plato.stanford.edu/entries/habermas/',
        note: 'SEP Habermas §2有关The Theory of Communicative Action的系统分析，原作1981年两卷。',
      },
    ],
  },
}

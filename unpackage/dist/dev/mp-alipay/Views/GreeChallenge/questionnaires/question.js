"use strict";
let singleData = [
  {
    title: ":您在日常生活中，通常如何选择出行方式以减少碳排放？",
    qid: 1,
    //问题编号
    options: [
      { text: "A. 总是选择步行或骑自行车", value: "1" },
      { text: "B. 尽量使用公共交通工具", value: "2" },
      { text: "C. 开车出行，但会尽量拼车或选择低碳排放的车辆", value: "3" },
      { text: "D. 出行方式不考虑碳排放因素", value: "4" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您在家中使用电器时，是否会注意节能减排？",
    qid: 2,
    options: [
      { text: "A. 总是非常注意，比如使用节能灯泡、合理调节空调温度等", value: "1" },
      { text: "B. 有时会注意，但不够频繁", value: "2" },
      { text: "C. 很少注意", value: "3" },
      { text: "D. 完全不在意", value: "4" }
    ],
    answer: ""
  },
  {
    title: ":您在购物时，是否会优先考虑环保包装或可循环利用的产品？",
    qid: 3,
    //问题编号
    options: [
      { text: "A. 总是优先考虑", value: "1" },
      { text: "B. 偶尔会考虑", value: "2" },
      { text: "C. 很少考虑", value: "3" },
      { text: "D. 从不考虑", value: "4" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您对参与社区或政府组织的低碳环保活动持什么态度？",
    qid: 4,
    //问题编号
    options: [
      { text: "A. 非常支持并积极参与", value: "1" },
      { text: "B. 感兴趣，但参与不多", value: "2" },
      { text: "C. 不太感兴趣", value: "3" },
      { text: "D. 完全不感兴趣", value: "4" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您认为个人行为对减少碳排放、保护环境的作用大吗？",
    qid: 5,
    //问题编号
    options: [
      { text: "A. 作用非常大，每个人的努力都很重要", value: "1" },
      { text: "B. 有一定作用，但作用有限", value: "2" },
      { text: "C. 作用不大，主要靠政府和企业", value: "3" },
      { text: "D. 没有作用", value: "4" }
    ],
    answer: ""
    // 用户选择的答案
  }
];
const checkBoxData = [
  {
    title: ":您在日常生活中采取了哪些低碳行为？（可多选）",
    qid: 6,
    //问题编号
    options: [
      { text: "A. 减少使用一次性塑料制品", value: "1" },
      { text: "B. 分类投放垃圾，促进资源回收", value: "2" },
      { text: "C. 节约用水用电，减少能源消耗", value: "3" },
      { text: "D. 尽量选择本地或季节性食品，减少食物运输碳足迹", value: "4" },
      { text: "E. 使用公共交通工具或骑行、步行代替私家车出行", value: "5" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您认为哪些因素会影响您更多地采取低碳行为？（可多选）",
    qid: 7,
    //问题编号
    options: [
      { text: "A. 环保意识的提高", value: "1" },
      { text: "B. 政府政策的引导和支持", value: "2" },
      { text: "C. 社区和朋友的示范作用", value: "3" },
      { text: "D. 低碳产品和服务的可获得性", value: "4" },
      { text: "E. 经济利益的驱动（如节能产品的价格优惠）", value: "5" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您认为哪些领域最需要推广低碳理念和技术？（可多选）",
    qid: 8,
    //问题编号
    options: [
      { text: "A. 能源生产和消费", value: "1" },
      { text: "B. 交通运输", value: "2" },
      { text: "C. 工业生产", value: "3" },
      { text: "D. 农业和林业", value: "4" },
      { text: "E. 居民生活和消费", value: "5" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您通过哪些渠道了解低碳环保知识和信息？（可多选）",
    qid: 9,
    //问题编号
    options: [
      { text: "A. 社交媒体和网络平台", value: "1" },
      { text: "B. 电视、广播和报纸等传统媒体", value: "2" },
      { text: "C. 学校和社区教育", value: "3" },
      { text: "D. 家人和朋友的交流", value: "4" },
      { text: "E. 政府或环保组织的宣传活动", value: "5" }
    ],
    answer: ""
    // 用户选择的答案
  },
  {
    title: ":您认为在推动低碳生活方面，还需要做哪些改进或努力？（可多选）",
    qid: 10,
    //问题编号
    options: [
      { text: "A. 加强环保教育，提高公众意识", value: "1" },
      { text: "B. 完善相关法律法规，强化政策引导", value: "2" },
      { text: "C. 推广低碳技术和产品，降低使用成本", value: "3" },
      { text: "D. 增加公共低碳设施和服务，方便居民生活", value: "4" },
      { text: "E. 加强国际合作，共同应对气候变化", value: "5" }
    ],
    answer: ""
    // 用户选择的答案
  }
];
exports.checkBoxData = checkBoxData;
exports.singleData = singleData;

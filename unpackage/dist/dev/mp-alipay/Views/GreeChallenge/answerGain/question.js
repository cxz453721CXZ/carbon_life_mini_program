"use strict";
const questions = [
  {
    title: "问题1:低碳出行主要是指什么？",
    qid: 1,
    //问题编号
    options: [
      { text: "A. 乘坐私人飞机进行长途旅行", value: "1", bgc: "", isSelected: false },
      { text: "B. 骑自行车或步行代替汽车短途出行", value: "2", bgc: "", isSelected: false },
      { text: "C. 频繁使用出租车作为日常交通工具", value: "3", bgc: "", isSelected: false },
      { text: "D. 选购大排量汽车以追求驾驶乐趣", value: "4", bgc: "", isSelected: false }
    ],
    correctResponse: "B",
    //正确答案
    zq: 1,
    //正确答案索引0, 1, 2, 3分别对应A, B, C, D
    anwerDescription: "解释说明：低碳出行强调的是减少碳排放和能源消耗，通过选择低能耗、低排放的交通方式来实现。骑自行车或步行代替汽车短途出行是典型的低碳出行方式，能够显著减少碳排放。"
    //答案描述
  },
  {
    title: "问题2:以下哪种交通工具的碳排放量相对较低？",
    qid: 2,
    options: [
      { text: "A. 私家车", value: "1", bgc: "", isSelected: false },
      { text: "B. 公共汽车", value: "2", bgc: "", isSelected: false },
      { text: "C. 私人飞机", value: "3", bgc: "", isSelected: false },
      { text: "D. 摩托车", value: "4", bgc: "", isSelected: false }
    ],
    correctResponse: "B",
    zq: 1,
    //正确答案索引0, 1, 2, 3分别对应A, B, C, D
    anwerDescription: "解释说明：公共汽车作为一种公共交通工具，能够承载多人同时出行，从而分摊到每个人的碳排放量相对较低。相比之下，私家车、私人飞机和摩托车的碳排放量都较高。"
  },
  {
    title: "问题3:在规划日常出行时，如何体现低碳理念？",
    qid: 3,
    options: [
      { text: "A. 尽可能选择距离最短的路线，无论是否拥堵", value: "1", bgc: "", isSelected: false },
      { text: "B. 优先考虑步行或骑行，再根据需要选择公共交通", value: "2", bgc: "", isSelected: false },
      { text: "C. 总是选择最快速的路线，哪怕需要频繁换道或加速", value: "3", bgc: "", isSelected: false },
      { text: "D. 忽略出行方式，只关注目的地和时间", value: "4", bgc: "", isSelected: false }
    ],
    correctResponse: "B",
    zq: 1,
    //正确答案索引0, 1, 2, 3分别对应A, B, C, D
    anwerDescription: "解释说明：在规划日常出行时，优先考虑步行或骑行，再根据需要选择公共交通，是体现低碳理念的重要方式。这样既能减少碳排放，又能锻炼身体，同时也有助于缓解城市交通拥堵问题。"
  },
  {
    title: "问题4:共享单车作为一种低碳出行方式，其主要优势是什么？",
    qid: 4,
    options: [
      { text: "A. 价格昂贵，适合高收入人群", value: "1", bgc: "", isSelected: false },
      { text: "B. 方便快捷，有助于减少私家车使用", value: "2", bgc: "", isSelected: false },
      { text: "C. 骑行体验差，不适合长途出行", value: "3", bgc: "", isSelected: false },
      { text: "D. 占地面积大，不利于城市空间利用", value: "4", bgc: "", isSelected: false }
    ],
    correctResponse: "B",
    zq: 1,
    //正确答案索引0, 1, 2, 3分别对应A, B, C, D
    anwerDescription: "解释说明：共享单车作为一种低碳出行方式，其主要优势在于方便快捷，能够随时取用和归还，从而减少了私家车的使用和碳排放。虽然其价格相对便宜，但并非主要优势；骑行体验因人而异，且共享单车并非专为长途出行设计；至于占地面积，共享单车通常采用集中停放的方式，对城市空间利用的影响有限。"
  },
  {
    title: "问题5:政府推动低碳出行的主要措施不包括以下哪一项？",
    qid: 5,
    options: [
      { text: "A. 建设和完善公共交通系统", value: "1", bgc: "", isSelected: false },
      { text: "B. 提供自行车道和步行道等慢行设施", value: "2", bgc: "", isSelected: false },
      { text: "C. 对私家车实行严格的限购和限行政策", value: "3", bgc: "", isSelected: false },
      { text: "D. 鼓励和支持新能源汽车的研发和推广", value: "4", bgc: "", isSelected: false }
    ],
    correctResponse: "C",
    zq: 2,
    //正确答案索引0, 1, 2, 3分别对应A, B, C, D
    anwerDescription: "解释说明：政府推动低碳出行的主要措施包括建设和完善公共交通系统、提供自行车道和步行道等慢行设施、鼓励和支持新能源汽车的研发和推广等。这些措施旨在通过提供多样化的低碳出行选择，减少私家车的使用和碳排放。而对私家车实行严格的限购和限行政策虽然可以在一定程度上减少私家车数量，但并非推动低碳出行的核心措施，且可能引发社会争议和不满。"
  }
];
exports.questions = questions;

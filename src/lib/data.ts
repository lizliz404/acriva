import type {
  ChangelogItem,
  CustomerStory,
  ScaleItem,
  TabContent,
} from "./types";

/** Final brand — see docs/DESIGN.md + docs/branding.md */
export const product = {
  name: "Acriva",
  zhName: "融销通",
  category: "农产品融销经营台",
  tagline: "钱、货、技术，一张台子办成",
  taglineAlt: "借得到 · 卖得出 · 问得着",
  description:
    "融销通（Acriva）是给土老板和合作社的一张经营台：农贷能申请、货盘能上架、专家能问到——钱、货、技术同台办成。",
  descriptionEn:
    "One desk to fund, sell, and get counsel — credit, produce market, and agronomist booking for growers.",
  domain: "acriva.lizliz.xyz",
};

export const tabs: TabContent[] = [
  {
    id: "finance",
    label: "借得到",
    title: "季节前钱卡着？备耕贷、农资贷在线申请，银行席过审留痕。",
    subtitle: "申请 · 联合匹配 · 审批",
    description:
      "银行上架产品，合作社按用途与金额提交。相似经营主体可联保匹配。过审、驳回、放款状态一条线看清。",
  },
  {
    id: "market",
    label: "卖得出",
    title: "货压手里？上架批次、对接买家需求，有量有价能联系。",
    subtitle: "货盘 · 浏览下单 · 需求对接",
    description:
      "库存与报价挂在货盘上。订单扣减库存。买家需求有回音，不再只在微信群空转。",
  },
  {
    id: "expert",
    label: "问得着",
    title: "病虫害没人答？知识库、问答、预约专家同一队列。",
    subtitle: "知识 · 问答 · 预约",
    description:
      "好回答可沉淀成知识稿。预约带备忘，专家席清队列——出事有人答，不只丢群里。",
  },
  {
    id: "price-signal",
    label: "行情参照",
    title: "贷前、卖前先看走势。季节序列加诚实均线，不当玄学预测。",
    subtitle: "参照，不是戏法",
    description:
      "信号标清楚是启发式边界。定向用；核贷与定价仍看真实单据与货况。",
  },
  {
    id: "roles",
    label: "四席同台",
    title: "农户席、银行席、买家席、专家席——同一数据，不同写路径。",
    subtitle: "一张台，角色分流",
    description:
      "不是假多租户。各模块状态机清楚。演示角色可在台内切换，正式鉴权后接真身份。",
  },
];

/** 四席信任条 — 谁在一台子上 */
export const trustSeats: { seat: string; line: string }[] = [
  { seat: "农户席", line: "申请、上架、问诊一手办" },
  { seat: "银行席", line: "产品、过审、留痕可控" },
  { seat: "买家席", line: "货真、有量、能联系" },
  { seat: "专家席", line: "知识、问答、预约清队列" },
];

export const logos: string[] = [
  "农户席",
  "银行席",
  "买家席",
  "专家席",
];

export const customerStories: CustomerStory[] = [
  {
    name: "东棚合作社",
    category: "种植主体",
    headline:
      "一季计划里备耕贷和货盘同台——贷款与买家不再分两个微信群扯皮。",
    metric: "三摊事 → 一张台",
  },
  {
    name: "绿收农商行",
    category: "农贷审批",
    headline:
      "匹配队列先按作物、产区、信用带筛一遍，再开卷——首轮过得更快。",
    metric: "首轮更快",
  },
  {
    name: "城鲜采购",
    category: "产地采购",
    headline:
      "需求发出去有货有回音，不是空 RFQ 在群里漂。",
    metric: "需求 → 联系",
  },
];

export const scaleItems: ScaleItem[] = [
  {
    title: "融资台",
    description: "产品、申请、联保匹配、银行过审路径。",
  },
  {
    title: "货销台",
    description: "货盘、订单、买家需求、联系留痕。",
  },
  {
    title: "专家台",
    description: "知识、问答、预约——双向已通。",
  },
  {
    title: "行情钩",
    description: "均线参照今日可用；深度序列后再接模型。",
  },
];

export const changelogItems: ChangelogItem[] = [
  {
    date: "2026-07-21",
    title: "Seal A + 经营台皮肤",
    desc: "深土/米纸/玉石绿/金印心；中文结果句替换冷灰 Linear 皮。",
    tag: "Brand",
  },
  {
    date: "2026-07-20",
    title: "融资 + 货盘上 D1",
    desc: "申请、联保匹配、货盘、订单、买家需求。",
    tag: "0.2",
  },
  {
    date: "2026-07-19",
    title: "专家服务 MVP",
    desc: "知识 / 问答 / 预约双端流，回答可升知识稿。",
    tag: "0.1",
  },
  {
    date: "2026-07-18",
    title: "落地页骨架",
    desc: "按融 / 销 / 通三结果重排版块节奏。",
    tag: "Design",
  },
];

export const footerColumns = [
  {
    title: "产品",
    links: ["借得到", "卖得出", "问得着", "行情参照"],
  },
  {
    title: "席位",
    links: ["农户", "银行", "买家", "专家"],
  },
  {
    title: "资源",
    links: ["架构", "领域模型", "更新日志", "部署说明"],
  },
  {
    title: "关于",
    links: ["关于融销通", "联系", "隐私", "条款"],
  },
];

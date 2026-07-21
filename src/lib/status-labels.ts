/** UI labels for domain status enums — keep enum keys in English for D1. */

const LABELS: Record<string, string> = {
  // finance applications
  draft: "草稿",
  submitted: "已提交",
  under_review: "审核中",
  approved: "已批准",
  rejected: "已驳回",
  disbursed: "已放款",
  // products / commerce
  listed: "在售",
  unlisted: "下架",
  sold_out: "售罄",
  archived: "已归档",
  open: "开放",
  matched: "已匹配",
  closed: "已关闭",
  placed: "已下单",
  paid: "已付",
  shipped: "已发货",
  cancelled: "已取消",
  completed: "已完成",
  pending: "待处理",
  contacted: "已联系",
  // knowledge / QA / book
  published: "已发布",
  review: "待审",
  assigned: "已指派",
  answered: "已回答",
  requested: "待确认",
  confirmed: "已确认",
  // confidence
  low: "低",
  medium: "中",
  high: "高",
  verified: "已核验",
  // priority
  normal: "普通",
};

export function statusLabel(status: string | null | undefined): string {
  if (!status) return "—";
  return LABELS[status] ?? status;
}

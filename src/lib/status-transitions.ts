import type { BookStatus, QaStatus } from "./types";

export type FinApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed"
  | "withdrawn";

/** Finance application status machine (D1 `fin_applications.status`). */
export const FIN_TRANSITIONS: Record<
  FinApplicationStatus,
  FinApplicationStatus[]
> = {
  draft: ["submitted", "withdrawn"],
  submitted: ["under_review", "withdrawn", "rejected"],
  under_review: ["approved", "rejected", "withdrawn"],
  approved: ["disbursed", "withdrawn"],
  rejected: [],
  disbursed: [],
  withdrawn: [],
};

/** Booking status machine (D1 `book_info.status`). */
export const BOOK_TRANSITIONS: Record<BookStatus, BookStatus[]> = {
  requested: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled", "requested"],
  completed: [],
  cancelled: ["requested"],
};

/** QA statuses that block assign. */
export const QA_TERMINAL: QaStatus[] = ["answered", "closed"];

export function canFinTransition(
  from: FinApplicationStatus,
  to: FinApplicationStatus,
): boolean {
  return FIN_TRANSITIONS[from].includes(to);
}

export function canBookTransition(from: BookStatus, to: BookStatus): boolean {
  return BOOK_TRANSITIONS[from].includes(to);
}

export function assertFinTransition(
  from: FinApplicationStatus,
  to: FinApplicationStatus,
): void {
  if (!canFinTransition(from, to)) {
    throw new Error(`非法状态转移：${from} → ${to}`);
  }
}

export function assertBookTransition(from: BookStatus, to: BookStatus): void {
  if (!canBookTransition(from, to)) {
    throw new Error(`非法状态转移：${from} → ${to}`);
  }
}

export function canAssignQa(status: QaStatus): boolean {
  return !QA_TERMINAL.includes(status);
}

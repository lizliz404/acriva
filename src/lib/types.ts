export type Role = "user" | "expert";

export type KnowledgeStatus = "published" | "draft" | "review";
export type KnowledgeConfidence = "low" | "medium" | "high" | "verified";
export type QaStatus = "open" | "assigned" | "answered" | "closed";
export type QaPriority = "low" | "normal" | "high";
export type BookStatus = "requested" | "confirmed" | "completed" | "cancelled";

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  regions: string[];
  crops: string[];
  active: boolean;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  crop: string;
  region: string;
  tags: string[];
  summary: string;
  body: string;
  author: string;
  expertId?: string;
  status: KnowledgeStatus;
  confidence: KnowledgeConfidence;
  version: number;
  updatedAt: string;
  createdAt?: string;
}

export interface QAMessage {
  id: string;
  threadId: string;
  question: string;
  crop?: string;
  region?: string;
  status: QaStatus;
  asker: string;
  expert?: string;
  expertId?: string;
  answer?: string;
  priority: QaPriority;
  createdAt: string;
  updatedAt: string;
}

export interface BookInfo {
  id: string;
  topic: string;
  crop?: string;
  preferredAt: string;
  durationMin: number;
  status: BookStatus;
  requester: string;
  expert?: string;
  expertId?: string;
  notes?: string;
  prepNotes?: string;
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
}

export interface TabContent {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CustomerStory {
  name: string;
  category: string;
  headline: string;
  metric: string;
}

export interface ChangelogItem {
  date: string;
  title: string;
  desc: string;
  tag: string;
}

export interface ScaleItem {
  title: string;
  description: string;
}

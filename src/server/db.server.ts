import { env } from "cloudflare:workers";
import type {
  BookInfo,
  Expert,
  KnowledgeItem,
  QAMessage,
} from "#/lib/types";

type D1 = {
  prepare: (query: string) => {
    bind: (...args: unknown[]) => {
      all: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
      first: <T = Record<string, unknown>>() => Promise<T | null>;
      run: () => Promise<unknown>;
    };
    all: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
    first: <T = Record<string, unknown>>() => Promise<T | null>;
    run: () => Promise<unknown>;
  };
  batch: (statements: unknown[]) => Promise<unknown>;
};

export function getDb(): D1 {
  const db = (env as { DB?: D1 }).DB;
  if (!db) {
    throw new Error(
      "D1 binding env.DB is missing. Check wrangler.jsonc d1_databases and restart dev.",
    );
  }
  return db;
}

export function newId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

type KnowledgeRow = {
  id: string;
  title: string;
  crop: string;
  region: string;
  tags_json: string;
  summary: string;
  body: string;
  author: string;
  expert_id: string | null;
  status: KnowledgeItem["status"];
  confidence: KnowledgeItem["confidence"];
  version: number;
  updated_at: string;
  created_at: string;
};

type QaRow = {
  id: string;
  thread_id: string;
  question: string;
  crop: string | null;
  region: string | null;
  status: QAMessage["status"];
  asker: string;
  expert: string | null;
  expert_id: string | null;
  answer: string | null;
  priority: QAMessage["priority"];
  created_at: string;
  updated_at: string;
};

type BookRow = {
  id: string;
  topic: string;
  crop: string | null;
  preferred_at: string;
  duration_min: number;
  status: BookInfo["status"];
  requester: string;
  expert: string | null;
  expert_id: string | null;
  notes: string | null;
  prep_notes: string | null;
  created_at: string;
  confirmed_at: string | null;
  completed_at: string | null;
};

type ExpertRow = {
  id: string;
  name: string;
  specialty: string;
  regions_json: string;
  crops_json: string;
  active: number;
};

export function mapKnowledge(row: KnowledgeRow): KnowledgeItem {
  return {
    id: row.id,
    title: row.title,
    crop: row.crop,
    region: row.region,
    tags: parseTags(row.tags_json),
    summary: row.summary,
    body: row.body,
    author: row.author,
    expertId: row.expert_id || undefined,
    status: row.status,
    confidence: row.confidence,
    version: row.version,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  };
}

export function mapQa(row: QaRow): QAMessage {
  return {
    id: row.id,
    threadId: row.thread_id,
    question: row.question,
    crop: row.crop || undefined,
    region: row.region || undefined,
    status: row.status,
    asker: row.asker,
    expert: row.expert || undefined,
    expertId: row.expert_id || undefined,
    answer: row.answer || undefined,
    priority: row.priority,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapBook(row: BookRow): BookInfo {
  return {
    id: row.id,
    topic: row.topic,
    crop: row.crop || undefined,
    preferredAt: row.preferred_at,
    durationMin: row.duration_min,
    status: row.status,
    requester: row.requester,
    expert: row.expert || undefined,
    expertId: row.expert_id || undefined,
    notes: row.notes || undefined,
    prepNotes: row.prep_notes || undefined,
    createdAt: row.created_at,
    confirmedAt: row.confirmed_at || undefined,
    completedAt: row.completed_at || undefined,
  };
}

export function mapExpert(row: ExpertRow): Expert {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty,
    regions: parseTags(row.regions_json),
    crops: parseTags(row.crops_json),
    active: Boolean(row.active),
  };
}

export async function listKnowledge(filter?: {
  crop?: string;
  status?: KnowledgeItem["status"];
  q?: string;
}): Promise<KnowledgeItem[]> {
  const db = getDb();
  const clauses: string[] = [];
  const binds: unknown[] = [];
  if (filter?.crop) {
    clauses.push("crop = ?");
    binds.push(filter.crop);
  }
  if (filter?.status) {
    clauses.push("status = ?");
    binds.push(filter.status);
  }
  if (filter?.q) {
    clauses.push("(title LIKE ? OR summary LIKE ? OR body LIKE ?)");
    const like = `%${filter.q}%`;
    binds.push(like, like, like);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const stmt = db.prepare(
    `SELECT * FROM knowledge ${where} ORDER BY updated_at DESC, id DESC`,
  );
  const { results } = binds.length
    ? await stmt.bind(...binds).all<KnowledgeRow>()
    : await stmt.all<KnowledgeRow>();
  return results.map(mapKnowledge);
}

export async function getKnowledge(id: string): Promise<KnowledgeItem | null> {
  const row = await getDb()
    .prepare("SELECT * FROM knowledge WHERE id = ?")
    .bind(id)
    .first<KnowledgeRow>();
  return row ? mapKnowledge(row) : null;
}

export async function insertKnowledge(
  item: Omit<KnowledgeItem, "updatedAt" | "createdAt" | "version"> & {
    version?: number;
  },
): Promise<KnowledgeItem> {
  const db = getDb();
  const createdAt = nowIso();
  const updatedAt = createdAt.slice(0, 10);
  const version = item.version ?? 1;
  await db
    .prepare(
      `INSERT INTO knowledge (
        id, title, crop, region, tags_json, summary, body, author, expert_id,
        status, confidence, version, updated_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      item.id,
      item.title,
      item.crop,
      item.region,
      JSON.stringify(item.tags ?? []),
      item.summary,
      item.body,
      item.author,
      item.expertId ?? null,
      item.status,
      item.confidence ?? "medium",
      version,
      updatedAt,
      createdAt,
    )
    .run();
  const saved = await getKnowledge(item.id);
  if (!saved) throw new Error("知识写入后读取失败");
  return saved;
}

export async function updateKnowledge(
  id: string,
  patch: Partial<
    Pick<
      KnowledgeItem,
      | "title"
      | "crop"
      | "region"
      | "tags"
      | "summary"
      | "body"
      | "author"
      | "expertId"
      | "status"
      | "confidence"
    >
  >,
): Promise<KnowledgeItem> {
  const current = await getKnowledge(id);
  if (!current) throw new Error("未找到知识条目");
  const next: KnowledgeItem = {
    ...current,
    ...patch,
    tags: patch.tags ?? current.tags,
    version: current.version + (patch.status === "published" && current.status !== "published" ? 1 : 0),
    updatedAt: nowIso().slice(0, 10),
  };
  await getDb()
    .prepare(
      `UPDATE knowledge SET
        title = ?, crop = ?, region = ?, tags_json = ?, summary = ?, body = ?,
        author = ?, expert_id = ?, status = ?, confidence = ?, version = ?, updated_at = ?
      WHERE id = ?`,
    )
    .bind(
      next.title,
      next.crop,
      next.region,
      JSON.stringify(next.tags),
      next.summary,
      next.body,
      next.author,
      next.expertId ?? null,
      next.status,
      next.confidence,
      next.version,
      next.updatedAt,
      id,
    )
    .run();
  const saved = await getKnowledge(id);
  if (!saved) throw new Error("知识更新后读取失败");
  return saved;
}

export async function listQa(filter?: {
  status?: QAMessage["status"] | QAMessage["status"][];
}): Promise<QAMessage[]> {
  const db = getDb();
  if (!filter?.status) {
    const { results } = await db
      .prepare("SELECT * FROM qa_msg ORDER BY created_at DESC")
      .all<QaRow>();
    return results.map(mapQa);
  }
  const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
  const placeholders = statuses.map(() => "?").join(",");
  const { results } = await db
    .prepare(
      `SELECT * FROM qa_msg WHERE status IN (${placeholders}) ORDER BY created_at DESC`,
    )
    .bind(...statuses)
    .all<QaRow>();
  return results.map(mapQa);
}

export async function getQa(id: string): Promise<QAMessage | null> {
  const row = await getDb()
    .prepare("SELECT * FROM qa_msg WHERE id = ?")
    .bind(id)
    .first<QaRow>();
  return row ? mapQa(row) : null;
}

export async function insertQa(
  item: Omit<QAMessage, "createdAt" | "updatedAt"> & {
    createdAt?: string;
    updatedAt?: string;
  },
): Promise<QAMessage> {
  const createdAt = item.createdAt ?? nowIso();
  const updatedAt = item.updatedAt ?? createdAt;
  await getDb()
    .prepare(
      `INSERT INTO qa_msg (
        id, thread_id, question, crop, region, status, asker, expert, expert_id,
        answer, priority, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      item.id,
      item.threadId,
      item.question,
      item.crop ?? null,
      item.region ?? null,
      item.status,
      item.asker,
      item.expert ?? null,
      item.expertId ?? null,
      item.answer ?? null,
      item.priority ?? "normal",
      createdAt,
      updatedAt,
    )
    .run();
  const saved = await getQa(item.id);
  if (!saved) throw new Error("问答写入后读取失败");
  return saved;
}

export async function updateQa(
  id: string,
  patch: Partial<
    Pick<QAMessage, "status" | "expert" | "expertId" | "answer" | "priority">
  >,
): Promise<QAMessage> {
  const current = await getQa(id);
  if (!current) throw new Error("未找到问答");
  const next: QAMessage = {
    ...current,
    ...patch,
    updatedAt: nowIso(),
  };
  await getDb()
    .prepare(
      `UPDATE qa_msg SET
        status = ?, expert = ?, expert_id = ?, answer = ?, priority = ?, updated_at = ?
      WHERE id = ?`,
    )
    .bind(
      next.status,
      next.expert ?? null,
      next.expertId ?? null,
      next.answer ?? null,
      next.priority,
      next.updatedAt,
      id,
    )
    .run();
  const saved = await getQa(id);
  if (!saved) throw new Error("问答更新后读取失败");
  return saved;
}

export async function listBooks(filter?: {
  status?: BookInfo["status"] | BookInfo["status"][];
}): Promise<BookInfo[]> {
  const db = getDb();
  if (!filter?.status) {
    const { results } = await db
      .prepare("SELECT * FROM book_info ORDER BY preferred_at ASC")
      .all<BookRow>();
    return results.map(mapBook);
  }
  const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
  const placeholders = statuses.map(() => "?").join(",");
  const { results } = await db
    .prepare(
      `SELECT * FROM book_info WHERE status IN (${placeholders}) ORDER BY preferred_at ASC`,
    )
    .bind(...statuses)
    .all<BookRow>();
  return results.map(mapBook);
}

export async function getBook(id: string): Promise<BookInfo | null> {
  const row = await getDb()
    .prepare("SELECT * FROM book_info WHERE id = ?")
    .bind(id)
    .first<BookRow>();
  return row ? mapBook(row) : null;
}

export async function insertBook(
  item: Omit<BookInfo, "createdAt"> & { createdAt?: string },
): Promise<BookInfo> {
  const createdAt = item.createdAt ?? nowIso();
  await getDb()
    .prepare(
      `INSERT INTO book_info (
        id, topic, crop, preferred_at, duration_min, status, requester, expert,
        expert_id, notes, prep_notes, created_at, confirmed_at, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      item.id,
      item.topic,
      item.crop ?? null,
      item.preferredAt,
      item.durationMin,
      item.status,
      item.requester,
      item.expert ?? null,
      item.expertId ?? null,
      item.notes ?? null,
      item.prepNotes ?? null,
      createdAt,
      item.confirmedAt ?? null,
      item.completedAt ?? null,
    )
    .run();
  const saved = await getBook(item.id);
  if (!saved) throw new Error("预约写入后读取失败");
  return saved;
}

export async function updateBook(
  id: string,
  patch: Partial<
    Pick<
      BookInfo,
      | "status"
      | "expert"
      | "expertId"
      | "notes"
      | "prepNotes"
      | "preferredAt"
      | "durationMin"
      | "confirmedAt"
      | "completedAt"
    >
  >,
): Promise<BookInfo> {
  const current = await getBook(id);
  if (!current) throw new Error("未找到预约");
  const next: BookInfo = { ...current, ...patch };
  if (patch.status === "confirmed" && !next.confirmedAt) {
    next.confirmedAt = nowIso();
  }
  if (patch.status === "completed" && !next.completedAt) {
    next.completedAt = nowIso();
  }
  await getDb()
    .prepare(
      `UPDATE book_info SET
        status = ?, expert = ?, expert_id = ?, notes = ?, prep_notes = ?,
        preferred_at = ?, duration_min = ?, confirmed_at = ?, completed_at = ?
      WHERE id = ?`,
    )
    .bind(
      next.status,
      next.expert ?? null,
      next.expertId ?? null,
      next.notes ?? null,
      next.prepNotes ?? null,
      next.preferredAt,
      next.durationMin,
      next.confirmedAt ?? null,
      next.completedAt ?? null,
      id,
    )
    .run();
  const saved = await getBook(id);
  if (!saved) throw new Error("预约更新后读取失败");
  return saved;
}

export async function listExperts(): Promise<Expert[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM experts WHERE active = 1 ORDER BY name ASC")
    .all<ExpertRow>();
  return results.map(mapExpert);
}

export async function deskStats() {
  const db = getDb();
  const knowledge = await db
    .prepare("SELECT COUNT(*) AS c FROM knowledge")
    .first<{ c: number }>();
  const openQa = await db
    .prepare(
      "SELECT COUNT(*) AS c FROM qa_msg WHERE status IN ('open', 'assigned')",
    )
    .first<{ c: number }>();
  const pendingBooks = await db
    .prepare("SELECT COUNT(*) AS c FROM book_info WHERE status = 'requested'")
    .first<{ c: number }>();
  return {
    knowledge: knowledge?.c ?? 0,
    openQa: openQa?.c ?? 0,
    pendingBooks: pendingBooks?.c ?? 0,
  };
}

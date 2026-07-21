import { createServerFn } from "@tanstack/react-start";
import {
  assertBookTransition,
  canAssignQa,
} from "#/lib/status-transitions";
import type {
  BookStatus,
  KnowledgeConfidence,
  KnowledgeStatus,
  QaPriority,
} from "#/lib/types";

/** Snapshot for desk overview + list pages */
export const getDeskSnapshot = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await import("./db.server");
    const [knowledge, qa, books, experts, stats] = await Promise.all([
      db.listKnowledge(),
      db.listQa(),
      db.listBooks(),
      db.listExperts(),
      db.deskStats(),
    ]);
    return { knowledge, qa, books, experts, stats };
  },
);

export const listPublishedKnowledge = createServerFn({ method: "GET" })
  .validator((data?: { crop?: string; q?: string }) => data ?? {})
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    return db.listKnowledge({
      status: "published",
      crop: data.crop || undefined,
      q: data.q || undefined,
    });
  });

export const getKnowledgeById = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const item = await db.getKnowledge(data.id);
    if (!item) throw new Error("未找到知识条目");
    return item;
  });

/** User: AskExpert → QAMsg */
export const createQuestion = createServerFn({ method: "POST" })
  .validator(
    (data: {
      question: string;
      crop?: string;
      region?: string;
      asker?: string;
      priority?: QaPriority;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const question = data.question.trim();
    if (!question) throw new Error("请填写问题");
    return db.insertQa({
      id: db.newId("q"),
      threadId: db.newId("t"),
      question,
      crop: data.crop?.trim() || undefined,
      region: data.region?.trim() || undefined,
      status: "open",
      asker: data.asker?.trim() || "演示农户",
      priority: data.priority || "normal",
    });
  });

/** Expert: QAProcess — assign */
export const assignQuestion = createServerFn({ method: "POST" })
  .validator((data: { id: string; expert: string; expertId?: string }) => data)
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const current = await db.getQa(data.id);
    if (!current) throw new Error("未找到问答");
    if (!canAssignQa(current.status)) {
      throw new Error("已回答或已关闭的问题不能再指派");
    }
    return db.updateQa(data.id, {
      status: "assigned",
      expert: data.expert.trim(),
      expertId: data.expertId,
    });
  });

/** Expert: QAProcess — answer */
export const answerQuestion = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      answer: string;
      expert?: string;
      expertId?: string;
      promoteToKnowledge?: boolean;
      knowledgeTitle?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const answer = data.answer.trim();
    if (!answer) throw new Error("请填写回答");
    const current = await db.getQa(data.id);
    if (!current) throw new Error("未找到问答");

    const qa = await db.updateQa(data.id, {
      answer,
      status: "answered",
      expert: data.expert?.trim() || current.expert || "演示专家",
      expertId: data.expertId || current.expertId,
    });

    let promotedKnowledgeId: string | undefined;
    if (data.promoteToKnowledge) {
      const title =
        data.knowledgeTitle?.trim() ||
        `来自问答：${current.question.slice(0, 72)}`;
      const k = await db.insertKnowledge({
        id: db.newId("k"),
        title,
        crop: current.crop || "通用",
        region: current.region || "未指定",
        tags: ["from-qa"],
        summary: answer.slice(0, 220),
        body: `原问题：\n${current.question}\n\n专家回答：\n${answer}`,
        author: qa.expert || "演示专家",
        expertId: qa.expertId,
        status: "draft",
        confidence: "medium",
      });
      promotedKnowledgeId = k.id;
    }

    return { qa, promotedKnowledgeId };
  });

/** User: BookExpert → BookInfo */
export const createBooking = createServerFn({ method: "POST" })
  .validator(
    (data: {
      topic: string;
      crop?: string;
      preferredAt: string;
      durationMin?: number;
      notes?: string;
      prepNotes?: string;
      requester?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const topic = data.topic.trim();
    if (!topic) throw new Error("请填写预约主题");
    if (!data.preferredAt) throw new Error("请选择预约时间");
    return db.insertBook({
      id: db.newId("b"),
      topic,
      crop: data.crop?.trim() || undefined,
      preferredAt: data.preferredAt,
      durationMin: data.durationMin || 60,
      status: "requested",
      requester: data.requester?.trim() || "演示农户",
      notes: data.notes?.trim() || undefined,
      prepNotes: data.prepNotes?.trim() || undefined,
    });
  });

/** Expert: BookProcess */
export const processBooking = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      status: BookStatus;
      expert?: string;
      expertId?: string;
      prepNotes?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const current = await db.getBook(data.id);
    if (!current) throw new Error("未找到预约");

    assertBookTransition(current.status, data.status);

    return db.updateBook(data.id, {
      status: data.status,
      expert:
        data.expert?.trim() ||
        current.expert ||
        (data.status === "confirmed" ? "演示专家" : current.expert),
      expertId: data.expertId || current.expertId,
      prepNotes: data.prepNotes?.trim() || current.prepNotes,
    });
  });

/** Expert: ManageKnowledge create / update */
export const upsertKnowledge = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      title: string;
      crop: string;
      region: string;
      summary: string;
      body?: string;
      tags?: string[];
      status?: KnowledgeStatus;
      confidence?: KnowledgeConfidence;
      author?: string;
      expertId?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const title = data.title.trim();
    const crop = data.crop.trim();
    const region = data.region.trim();
    const summary = data.summary.trim();
    if (!title || !crop || !region || !summary) {
      throw new Error("标题、作物、产区、摘要均为必填");
    }

    if (data.id) {
      return db.updateKnowledge(data.id, {
        title,
        crop,
        region,
        summary,
        body: data.body?.trim() || undefined,
        tags: data.tags,
        status: data.status,
        confidence: data.confidence,
        author: data.author?.trim(),
        expertId: data.expertId,
      });
    }

    return db.insertKnowledge({
      id: db.newId("k"),
      title,
      crop,
      region,
      tags: data.tags ?? [],
      summary,
      body: data.body?.trim() || summary,
      author: data.author?.trim() || "演示专家",
      expertId: data.expertId,
      status: data.status || "draft",
      confidence: data.confidence || "medium",
    });
  });

/** Expert: publish draft/review → published */
export const publishKnowledge = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const db = await import("./db.server");
    const current = await db.getKnowledge(data.id);
    if (!current) throw new Error("未找到知识条目");
    if (current.status === "published") return current;
    return db.updateKnowledge(data.id, {
      status: "published",
      confidence:
        current.confidence === "low" ? "medium" : current.confidence,
    });
  });

export type DeskSnapshot = Awaited<ReturnType<typeof getDeskSnapshot>>;

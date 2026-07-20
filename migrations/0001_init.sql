-- 0001_init.sql
-- Domain stores: Knowledge | QAMsg | BookInfo (+ experts for assignment)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS experts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  regions_json TEXT NOT NULL DEFAULT '[]',
  crops_json TEXT NOT NULL DEFAULT '[]',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  crop TEXT NOT NULL,
  region TEXT NOT NULL,
  tags_json TEXT NOT NULL DEFAULT '[]',
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  author TEXT NOT NULL,
  expert_id TEXT REFERENCES experts(id),
  status TEXT NOT NULL CHECK (status IN ('published', 'draft', 'review')),
  confidence TEXT NOT NULL DEFAULT 'medium' CHECK (confidence IN ('low', 'medium', 'high', 'verified')),
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS qa_msg (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  question TEXT NOT NULL,
  crop TEXT,
  region TEXT,
  status TEXT NOT NULL CHECK (status IN ('open', 'assigned', 'answered', 'closed')),
  asker TEXT NOT NULL,
  expert TEXT,
  expert_id TEXT REFERENCES experts(id),
  answer TEXT,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS book_info (
  id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  crop TEXT,
  preferred_at TEXT NOT NULL,
  duration_min INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled')),
  requester TEXT NOT NULL,
  expert TEXT,
  expert_id TEXT REFERENCES experts(id),
  notes TEXT,
  prep_notes TEXT,
  created_at TEXT NOT NULL,
  confirmed_at TEXT,
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_knowledge_crop ON knowledge(crop);
CREATE INDEX IF NOT EXISTS idx_knowledge_status ON knowledge(status);
CREATE INDEX IF NOT EXISTS idx_qa_status ON qa_msg(status);
CREATE INDEX IF NOT EXISTS idx_qa_thread ON qa_msg(thread_id);
CREATE INDEX IF NOT EXISTS idx_book_status ON book_info(status);
CREATE INDEX IF NOT EXISTS idx_book_preferred ON book_info(preferred_at);

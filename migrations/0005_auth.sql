-- 0005_auth.sql
-- Minimal identity + session + audit for four seats.
-- Does not remove open-demo behavior; enforcement is app-level (AUTH_ENFORCE).

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  -- sha256 hex of `${pin}|acriva-v1` for demo accounts; replace with stronger KDF later
  pin_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'bank', 'buyer', 'expert', 'admin')),
  farmer_id TEXT REFERENCES farmer_profiles(id),
  expert_id TEXT REFERENCES experts(id),
  bank_name TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  from_status TEXT,
  to_status TEXT,
  meta_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);

-- pin "demo" → sha256 hex of UTF-8 "demo|acriva-v1"
-- 0aa6cc78824fb0d8ced45f26edbf5fec3582b23ae0ad72ed8e3c2b778a9b065e

INSERT OR IGNORE INTO users (
  id, email, display_name, pin_hash, role, farmer_id, expert_id, bank_name, active, created_at
) VALUES
  (
    'u_farmer',
    'farmer@demo',
    'Jia Grower',
    '0aa6cc78824fb0d8ced45f26edbf5fec3582b23ae0ad72ed8e3c2b778a9b065e',
    'farmer',
    'f1',
    NULL,
    NULL,
    1,
    '2026-07-21T00:00:00.000Z'
  ),
  (
    'u_bank',
    'bank@demo',
    'GreenHarvest Desk',
    '0aa6cc78824fb0d8ced45f26edbf5fec3582b23ae0ad72ed8e3c2b778a9b065e',
    'bank',
    NULL,
    NULL,
    'GreenHarvest Bank',
    1,
    '2026-07-21T00:00:00.000Z'
  ),
  (
    'u_buyer',
    'buyer@demo',
    'City Produce Buyer',
    '0aa6cc78824fb0d8ced45f26edbf5fec3582b23ae0ad72ed8e3c2b778a9b065e',
    'buyer',
    NULL,
    NULL,
    NULL,
    1,
    '2026-07-21T00:00:00.000Z'
  ),
  (
    'u_expert',
    'expert@demo',
    'Demo Expert',
    '0aa6cc78824fb0d8ced45f26edbf5fec3582b23ae0ad72ed8e3c2b778a9b065e',
    'expert',
    NULL,
    'e1',
    NULL,
    1,
    '2026-07-21T00:00:00.000Z'
  );

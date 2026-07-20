-- 0003_finance_commerce.sql
-- 融销通 Finance + Ecommerce modules

CREATE TABLE IF NOT EXISTS farmer_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  crops_json TEXT NOT NULL DEFAULT '[]',
  scale_mu REAL NOT NULL DEFAULT 0,
  annual_revenue_wan REAL NOT NULL DEFAULT 0,
  credit_band TEXT NOT NULL DEFAULT 'B' CHECK (credit_band IN ('A', 'B', 'C')),
  tags_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fin_products (
  id TEXT PRIMARY KEY,
  bank_name TEXT NOT NULL,
  title TEXT NOT NULL,
  min_amount_wan REAL NOT NULL,
  max_amount_wan REAL NOT NULL,
  rate_apr REAL NOT NULL,
  term_months INTEGER NOT NULL,
  regions_json TEXT NOT NULL DEFAULT '[]',
  crops_json TEXT NOT NULL DEFAULT '[]',
  description TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fin_applications (
  id TEXT PRIMARY KEY,
  farmer_id TEXT NOT NULL REFERENCES farmer_profiles(id),
  product_id TEXT NOT NULL REFERENCES fin_products(id),
  amount_wan REAL NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN (
      'draft',
      'submitted',
      'under_review',
      'approved',
      'rejected',
      'disbursed',
      'withdrawn'
    )
  ),
  joint_mode INTEGER NOT NULL DEFAULT 0,
  bank_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS joint_loan_links (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES fin_applications(id),
  peer_farmer_id TEXT NOT NULL REFERENCES farmer_profiles(id),
  score REAL NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL REFERENCES farmer_profiles(id),
  title TEXT NOT NULL,
  crop TEXT NOT NULL,
  region TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  price_yuan REAL NOT NULL,
  stock REAL NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'listed', 'sold_out', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id),
  buyer_name TEXT NOT NULL,
  qty REAL NOT NULL,
  unit_price_yuan REAL NOT NULL,
  total_yuan REAL NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('placed', 'paid', 'shipped', 'completed', 'cancelled')
  ),
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS buyer_demands (
  id TEXT PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  crop TEXT NOT NULL,
  region TEXT NOT NULL,
  qty REAL NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  budget_yuan REAL,
  detail TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'matched', 'closed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS demand_contacts (
  id TEXT PRIMARY KEY,
  demand_id TEXT NOT NULL REFERENCES buyer_demands(id),
  farmer_id TEXT NOT NULL REFERENCES farmer_profiles(id),
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'replied', 'closed')),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS price_series (
  id TEXT PRIMARY KEY,
  crop TEXT NOT NULL,
  region TEXT NOT NULL,
  as_of TEXT NOT NULL,
  price_yuan REAL NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fin_app_status ON fin_applications(status);
CREATE INDEX IF NOT EXISTS idx_fin_app_farmer ON fin_applications(farmer_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_crop ON products(crop);
CREATE INDEX IF NOT EXISTS idx_demands_status ON buyer_demands(status);
CREATE INDEX IF NOT EXISTS idx_price_crop ON price_series(crop, region, as_of);

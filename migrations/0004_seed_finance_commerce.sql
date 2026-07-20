-- 0004_seed_finance_commerce.sql

INSERT OR IGNORE INTO farmer_profiles (
  id, name, region, crops_json, scale_mu, annual_revenue_wan, credit_band, tags_json, created_at
) VALUES
  ('f1', 'Jia Grower', 'East China', '["Tomato","Cucumber"]', 48, 86, 'A', '["high-tunnel","co-op"]', '2026-03-01T00:00:00.000Z'),
  ('f2', 'Northridge Ops', 'North China', '["Cucumber"]', 120, 140, 'B', '["greenhouse","recirc"]', '2026-03-01T00:00:00.000Z'),
  ('f3', 'BlueAcre Field', 'Yangtze basin', '["Rice"]', 300, 210, 'A', '["scale","hybrid"]', '2026-03-01T00:00:00.000Z'),
  ('f4', 'Loess Orchard', 'Northwest', '["Apple"]', 80, 95, 'B', '["orchard"]', '2026-03-01T00:00:00.000Z');

INSERT OR IGNORE INTO fin_products (
  id, bank_name, title, min_amount_wan, max_amount_wan, rate_apr, term_months, regions_json, crops_json, description, active, created_at
) VALUES
  (
    'fp1',
    'GreenHarvest Bank',
    'Seasonal input micro-loan',
    5, 40, 4.8, 12,
    '["East China","North China","Yangtze basin"]',
    '["Tomato","Cucumber","Rice"]',
    'Working capital for seed, fertilizer, and protectants. Fast review under 30万.',
    1,
    '2026-04-01T00:00:00.000Z'
  ),
  (
    'fp2',
    'AgriLink Finance',
    'Facility upgrade loan',
    20, 120, 5.6, 24,
    '["North China","East China"]',
    '["Cucumber","Tomato"]',
    'Greenhouse/high-tunnel retrofit and fertigation gear.',
    1,
    '2026-04-01T00:00:00.000Z'
  ),
  (
    'fp3',
    'Orchard Credit Union',
    'Orchard cash-flow bridge',
    10, 80, 5.2, 18,
    '["Northwest","Loess"]',
    '["Apple"]',
    'Bridge financing between harvest and bulk settlement.',
    1,
    '2026-04-01T00:00:00.000Z'
  );

INSERT OR IGNORE INTO fin_applications (
  id, farmer_id, product_id, amount_wan, purpose, status, joint_mode, bank_note, created_at, updated_at
) VALUES
  (
    'fa1', 'f1', 'fp1', 18, 'Protectant + seedling for summer tunnel',
    'under_review', 0, NULL,
    '2026-07-16T08:00:00.000Z', '2026-07-17T09:00:00.000Z'
  ),
  (
    'fa2', 'f2', 'fp2', 55, 'Recirc fertigation upgrade on two bays',
    'submitted', 1, NULL,
    '2026-07-18T10:00:00.000Z', '2026-07-18T10:00:00.000Z'
  ),
  (
    'fa3', 'f3', 'fp1', 28, 'Hybrid seed + nitrogen program',
    'approved', 0, 'Strong repayment history on rice blocks.',
    '2026-07-10T07:00:00.000Z', '2026-07-14T11:00:00.000Z'
  );

INSERT OR IGNORE INTO joint_loan_links (
  id, application_id, peer_farmer_id, score, reason, created_at
) VALUES
  (
    'jl1', 'fa2', 'f1', 0.82,
    'Shared crops Tomato/Cucumber + East/North greenhouse tags',
    '2026-07-18T10:05:00.000Z'
  );

INSERT OR IGNORE INTO products (
  id, seller_id, title, crop, region, unit, price_yuan, stock, description, status, created_at, updated_at
) VALUES
  (
    'p1', 'f1', 'High-tunnel cherry tomato — grade A',
    'Tomato', 'East China', 'kg', 12.5, 800,
    'Picked same-day, cool-chain ready. Min order 50kg.',
    'listed', '2026-07-12T00:00:00.000Z', '2026-07-19T00:00:00.000Z'
  ),
  (
    'p2', 'f2', 'Greenhouse cucumber — export cut',
    'Cucumber', 'North China', 'kg', 6.8, 2000,
    'Straight fruit, length 28–32cm. Weekly harvest slots.',
    'listed', '2026-07-11T00:00:00.000Z', '2026-07-19T00:00:00.000Z'
  ),
  (
    'p3', 'f3', 'Hybrid paddy — bulk lot',
    'Rice', 'Yangtze basin', 'ton', 3200, 40,
    'Moisture checked, warehouse receipt available.',
    'listed', '2026-07-08T00:00:00.000Z', '2026-07-15T00:00:00.000Z'
  ),
  (
    'p4', 'f4', 'Fuji apple — premium bin',
    'Apple', 'Northwest', 'kg', 9.2, 0,
    'Sold out for current week.',
    'sold_out', '2026-07-01T00:00:00.000Z', '2026-07-18T00:00:00.000Z'
  );

INSERT OR IGNORE INTO orders (
  id, product_id, buyer_name, qty, unit_price_yuan, total_yuan, status, note, created_at, updated_at
) VALUES
  (
    'o1', 'p1', 'CityFresh Buyer', 120, 12.5, 1500,
    'paid', 'Deliver to east hub dock B',
    '2026-07-17T03:00:00.000Z', '2026-07-17T06:00:00.000Z'
  ),
  (
    'o2', 'p2', 'North Catering Co', 500, 6.8, 3400,
    'placed', NULL,
    '2026-07-19T01:20:00.000Z', '2026-07-19T01:20:00.000Z'
  );

INSERT OR IGNORE INTO buyer_demands (
  id, buyer_name, crop, region, qty, unit, budget_yuan, detail, status, created_at, updated_at
) VALUES
  (
    'd1', 'CityFresh Buyer', 'Tomato', 'East China', 2000, 'kg', 11.5,
    'Need steady weekly supply Jul–Sep. Prefer high-tunnel grade A.',
    'open', '2026-07-15T00:00:00.000Z', '2026-07-15T00:00:00.000Z'
  ),
  (
    'd2', 'RiceMill South', 'Rice', 'Yangtze basin', 100, 'ton', 3100,
    'Bulk paddy before mid-August. Moisture <14.5%.',
    'open', '2026-07-14T00:00:00.000Z', '2026-07-14T00:00:00.000Z'
  ),
  (
    'd3', 'Orchard Export Desk', 'Apple', 'Northwest', 15000, 'kg', 8.8,
    'Fuji 80mm+. Can arrange packing line.',
    'matched', '2026-07-05T00:00:00.000Z', '2026-07-12T00:00:00.000Z'
  );

INSERT OR IGNORE INTO demand_contacts (
  id, demand_id, farmer_id, message, status, created_at
) VALUES
  (
    'dc1', 'd1', 'f1',
    'Can supply 600–800kg/week from bay 3–5. Photos on request.',
    'sent', '2026-07-16T04:00:00.000Z'
  );

-- Simple price history for tomato East China (for forecast demo)
INSERT OR IGNORE INTO price_series (id, crop, region, as_of, price_yuan) VALUES
  ('ps1', 'Tomato', 'East China', '2026-05-01', 10.2),
  ('ps2', 'Tomato', 'East China', '2026-05-15', 10.8),
  ('ps3', 'Tomato', 'East China', '2026-06-01', 11.4),
  ('ps4', 'Tomato', 'East China', '2026-06-15', 12.1),
  ('ps5', 'Tomato', 'East China', '2026-07-01', 12.6),
  ('ps6', 'Tomato', 'East China', '2026-07-15', 12.4),
  ('ps7', 'Cucumber', 'North China', '2026-05-01', 5.1),
  ('ps8', 'Cucumber', 'North China', '2026-05-15', 5.4),
  ('ps9', 'Cucumber', 'North China', '2026-06-01', 5.9),
  ('ps10', 'Cucumber', 'North China', '2026-06-15', 6.3),
  ('ps11', 'Cucumber', 'North China', '2026-07-01', 6.7),
  ('ps12', 'Cucumber', 'North China', '2026-07-15', 6.5);

-- 0002_seed.sql
-- Demo seed for dual-role flows (idempotent inserts)

INSERT OR IGNORE INTO experts (id, name, specialty, regions_json, crops_json, active, created_at) VALUES
  ('e1', 'Dr. Lin Wei', 'Plant pathology', '["East China","Yangtze"]', '["Tomato","Rice"]', 1, '2026-03-01T00:00:00.000Z'),
  ('e2', 'Mei Chen', 'Protected cultivation', '["North China"]', '["Cucumber","Tomato"]', 1, '2026-03-01T00:00:00.000Z'),
  ('e3', 'Gao Rui', 'Orchard systems', '["Northwest","Loess"]', '["Apple"]', 1, '2026-03-01T00:00:00.000Z');

INSERT OR IGNORE INTO knowledge (
  id, title, crop, region, tags_json, summary, body, author, expert_id, status, confidence, version, updated_at, created_at
) VALUES
  (
    'k1',
    'Tomato early blight scouting checklist',
    'Tomato',
    'East China',
    '["disease","scouting","high-tunnel"]',
    'Field signs, weather windows, and first-response spray ladder for early blight after wet nights.',
    'Scout lower canopy after multi-day wet periods. Mark V-shaped lesions progressing from soil line. Improve morning airflow before chemistry. Protectant first; escalate only on confirmed spread.',
    'Dr. Lin Wei',
    'e1',
    'published',
    'verified',
    3,
    '2026-07-12',
    '2026-04-01T00:00:00.000Z'
  ),
  (
    'k2',
    'Cucumber fertigation EC drift playbook',
    'Cucumber',
    'North China',
    '["nutrition","greenhouse","EC"]',
    'How to diagnose tip burn vs salt stress when EC drifts above target in recirculating systems.',
    'Compare target EC vs drain EC. Tip burn with high drain % often tracks salt load. Step down 0.2–0.3 mS/cm and verify root-zone moisture before adding calcium sprays.',
    'Mei Chen',
    'e2',
    'published',
    'high',
    2,
    '2026-07-08',
    '2026-04-10T00:00:00.000Z'
  ),
  (
    'k3',
    'Rice sheath blight risk window',
    'Rice',
    'Yangtze basin',
    '["disease","timing"]',
    'Humidity + canopy density thresholds that justify a protectant pass before panicle initiation.',
    'Dense canopies after prolonged humidity favor sheath blight. Scout leaf sheath lesions at mid-tillering. Prefer canopy management first; chemistry as insurance when forecast stays wet.',
    'Dr. Lin Wei',
    'e1',
    'published',
    'high',
    1,
    '2026-06-30',
    '2026-05-01T00:00:00.000Z'
  ),
  (
    'k4',
    'Apple thinning decision tree (draft)',
    'Apple',
    'Northwest orchards',
    '["orchard","thinning","draft"]',
    'Draft protocol linking bloom density, fruitlet size, and chemical thinning windows.',
    'WIP: calibrate by variety. Do not publish until orchard pilot notes are attached.',
    'Gao Rui',
    'e3',
    'review',
    'medium',
    1,
    '2026-07-15',
    '2026-07-01T00:00:00.000Z'
  );

INSERT OR IGNORE INTO qa_msg (
  id, thread_id, question, crop, region, status, asker, expert, expert_id, answer, priority, created_at, updated_at
) VALUES
  (
    'q1',
    't1',
    'Yellow V-shaped lesions on lower tomato leaves after three rainy nights. Early blight or nutrient issue?',
    'Tomato',
    'East China',
    'answered',
    'Farm East #12',
    'Dr. Lin Wei',
    'e1',
    'Matches early blight progression. Improve morning airflow, remove heavily infected lower leaves, and follow the protectant ladder in k1.',
    'high',
    '2026-07-18T08:12:00.000Z',
    '2026-07-18T09:40:00.000Z'
  ),
  (
    'q2',
    't2',
    'Cucumber tip burn after EC held at 2.9 for a week. Hold the recipe or back off?',
    'Cucumber',
    'North China',
    'open',
    'Greenhouse North Co-op',
    NULL,
    NULL,
    NULL,
    'normal',
    '2026-07-19T11:05:00.000Z',
    '2026-07-19T11:05:00.000Z'
  ),
  (
    'q3',
    't3',
    'Sheath lesions appearing mid-canopy in hybrid rice. Spray now or wait for dry stretch?',
    'Rice',
    'Yangtze basin',
    'assigned',
    'Riverbend Growers',
    'Dr. Lin Wei',
    'e1',
    NULL,
    'high',
    '2026-07-19T14:22:00.000Z',
    '2026-07-19T15:01:00.000Z'
  );

INSERT OR IGNORE INTO book_info (
  id, topic, crop, preferred_at, duration_min, status, requester, expert, expert_id, notes, prep_notes, created_at, confirmed_at, completed_at
) VALUES
  (
    'b1',
    'High-tunnel disease walkthrough',
    'Tomato',
    '2026-07-22T09:00:00.000Z',
    60,
    'confirmed',
    'Farm East #12',
    'Dr. Lin Wei',
    'e1',
    'Need help validating airflow changes after early blight flare.',
    'Bring last 14 days of scouting photos and spray log.',
    '2026-07-17T10:00:00.000Z',
    '2026-07-17T12:30:00.000Z',
    NULL
  ),
  (
    'b2',
    'Recirc fertigation review',
    'Cucumber',
    '2026-07-24T15:30:00.000Z',
    45,
    'requested',
    'Greenhouse North Co-op',
    NULL,
    NULL,
    'EC drift and tip burn on two bays.',
    NULL,
    '2026-07-19T16:10:00.000Z',
    NULL,
    NULL
  );

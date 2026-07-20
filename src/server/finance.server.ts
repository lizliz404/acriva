import { getDb, newId, nowIso } from "./db.server";
import { parseJsonArray, rankByContent, smaForecast } from "./ai.server";

export type FarmerProfile = {
  id: string;
  name: string;
  region: string;
  crops: string[];
  scaleMu: number;
  annualRevenueWan: number;
  creditBand: "A" | "B" | "C";
  tags: string[];
};

export type FinProduct = {
  id: string;
  bankName: string;
  title: string;
  minAmountWan: number;
  maxAmountWan: number;
  rateApr: number;
  termMonths: number;
  regions: string[];
  crops: string[];
  description: string;
  active: boolean;
};

export type FinApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed"
  | "withdrawn";

export type FinApplication = {
  id: string;
  farmerId: string;
  farmerName?: string;
  productId: string;
  productTitle?: string;
  bankName?: string;
  amountWan: number;
  purpose: string;
  status: FinApplicationStatus;
  jointMode: boolean;
  bankNote?: string;
  createdAt: string;
  updatedAt: string;
  jointPeers?: Array<{ id: string; name: string; score: number; reason: string }>;
};

type FarmerRow = {
  id: string;
  name: string;
  region: string;
  crops_json: string;
  scale_mu: number;
  annual_revenue_wan: number;
  credit_band: "A" | "B" | "C";
  tags_json: string;
};

type ProductRow = {
  id: string;
  bank_name: string;
  title: string;
  min_amount_wan: number;
  max_amount_wan: number;
  rate_apr: number;
  term_months: number;
  regions_json: string;
  crops_json: string;
  description: string;
  active: number;
};

type AppRow = {
  id: string;
  farmer_id: string;
  product_id: string;
  amount_wan: number;
  purpose: string;
  status: FinApplicationStatus;
  joint_mode: number;
  bank_note: string | null;
  created_at: string;
  updated_at: string;
  farmer_name?: string;
  product_title?: string;
  bank_name?: string;
};

function mapFarmer(r: FarmerRow): FarmerProfile {
  return {
    id: r.id,
    name: r.name,
    region: r.region,
    crops: parseJsonArray(r.crops_json),
    scaleMu: r.scale_mu,
    annualRevenueWan: r.annual_revenue_wan,
    creditBand: r.credit_band,
    tags: parseJsonArray(r.tags_json),
  };
}

function mapProduct(r: ProductRow): FinProduct {
  return {
    id: r.id,
    bankName: r.bank_name,
    title: r.title,
    minAmountWan: r.min_amount_wan,
    maxAmountWan: r.max_amount_wan,
    rateApr: r.rate_apr,
    termMonths: r.term_months,
    regions: parseJsonArray(r.regions_json),
    crops: parseJsonArray(r.crops_json),
    description: r.description,
    active: Boolean(r.active),
  };
}

function mapApp(r: AppRow): FinApplication {
  return {
    id: r.id,
    farmerId: r.farmer_id,
    farmerName: r.farmer_name,
    productId: r.product_id,
    productTitle: r.product_title,
    bankName: r.bank_name,
    amountWan: r.amount_wan,
    purpose: r.purpose,
    status: r.status,
    jointMode: Boolean(r.joint_mode),
    bankNote: r.bank_note || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function listFarmers(): Promise<FarmerProfile[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM farmer_profiles ORDER BY name ASC")
    .all<FarmerRow>();
  return results.map(mapFarmer);
}

export async function getFarmer(id: string): Promise<FarmerProfile | null> {
  const row = await getDb()
    .prepare("SELECT * FROM farmer_profiles WHERE id = ?")
    .bind(id)
    .first<FarmerRow>();
  return row ? mapFarmer(row) : null;
}

export async function listFinProducts(): Promise<FinProduct[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM fin_products WHERE active = 1 ORDER BY min_amount_wan ASC")
    .all<ProductRow>();
  return results.map(mapProduct);
}

export async function listApplications(filter?: {
  status?: FinApplicationStatus | FinApplicationStatus[];
  farmerId?: string;
}): Promise<FinApplication[]> {
  const clauses: string[] = [];
  const binds: unknown[] = [];
  if (filter?.farmerId) {
    clauses.push("a.farmer_id = ?");
    binds.push(filter.farmerId);
  }
  if (filter?.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    clauses.push(`a.status IN (${statuses.map(() => "?").join(",")})`);
    binds.push(...statuses);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const sql = `
    SELECT a.*, f.name AS farmer_name, p.title AS product_title, p.bank_name AS bank_name
    FROM fin_applications a
    JOIN farmer_profiles f ON f.id = a.farmer_id
    JOIN fin_products p ON p.id = a.product_id
    ${where}
    ORDER BY a.updated_at DESC
  `;
  const stmt = getDb().prepare(sql);
  const { results } = binds.length
    ? await stmt.bind(...binds).all<AppRow>()
    : await stmt.all<AppRow>();
  const apps = results.map(mapApp);
  for (const app of apps) {
    if (app.jointMode) {
      app.jointPeers = await listJointPeers(app.id);
    }
  }
  return apps;
}

export async function listJointPeers(applicationId: string) {
  const { results } = await getDb()
    .prepare(
      `SELECT j.peer_farmer_id AS id, f.name AS name, j.score AS score, j.reason AS reason
       FROM joint_loan_links j
       JOIN farmer_profiles f ON f.id = j.peer_farmer_id
       WHERE j.application_id = ?
       ORDER BY j.score DESC`,
    )
    .bind(applicationId)
    .all<{ id: string; name: string; score: number; reason: string }>();
  return results;
}

export async function createApplication(input: {
  farmerId: string;
  productId: string;
  amountWan: number;
  purpose: string;
  jointMode?: boolean;
}): Promise<FinApplication> {
  const farmer = await getFarmer(input.farmerId);
  if (!farmer) throw new Error("Farmer not found");
  const product = await getDb()
    .prepare("SELECT * FROM fin_products WHERE id = ? AND active = 1")
    .bind(input.productId)
    .first<ProductRow>();
  if (!product) throw new Error("Product not found");
  if (
    input.amountWan < product.min_amount_wan ||
    input.amountWan > product.max_amount_wan
  ) {
    throw new Error(
      `Amount must be between ${product.min_amount_wan}–${product.max_amount_wan} 万`,
    );
  }

  const id = newId("fa");
  const ts = nowIso();
  await getDb()
    .prepare(
      `INSERT INTO fin_applications (
        id, farmer_id, product_id, amount_wan, purpose, status, joint_mode, bank_note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, 'submitted', ?, NULL, ?, ?)`,
    )
    .bind(
      id,
      input.farmerId,
      input.productId,
      input.amountWan,
      input.purpose.trim(),
      input.jointMode ? 1 : 0,
      ts,
      ts,
    )
    .run();

  if (input.jointMode) {
    await attachJointMatches(id, farmer);
  }

  const apps = await listApplications();
  const found = apps.find((a) => a.id === id);
  if (!found) throw new Error("Failed to load application");
  return found;
}

async function attachJointMatches(applicationId: string, farmer: FarmerProfile) {
  const peers = await listFarmers();
  const ranked = rankByContent({
    selfId: farmer.id,
    selfCrops: farmer.crops,
    selfRegion: farmer.region,
    selfTags: farmer.tags,
    peers: peers.map((p) => ({
      id: p.id,
      name: p.name,
      region: p.region,
      crops: p.crops,
      tags: p.tags,
    })),
    limit: 3,
  });
  const db = getDb();
  const ts = nowIso();
  for (const r of ranked) {
    await db
      .prepare(
        `INSERT INTO joint_loan_links (id, application_id, peer_farmer_id, score, reason, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(newId("jl"), applicationId, r.id, r.score, r.reason, ts)
      .run();
  }
}

export async function matchJointFarmers(farmerId: string) {
  const farmer = await getFarmer(farmerId);
  if (!farmer) throw new Error("Farmer not found");
  const peers = await listFarmers();
  return rankByContent({
    selfId: farmer.id,
    selfCrops: farmer.crops,
    selfRegion: farmer.region,
    selfTags: farmer.tags,
    peers: peers.map((p) => ({
      id: p.id,
      name: p.name,
      region: p.region,
      crops: p.crops,
      tags: p.tags,
    })),
    limit: 5,
  });
}

/** Bank: match farmers to a product */
export async function matchFarmersForProduct(productId: string) {
  const product = await getDb()
    .prepare("SELECT * FROM fin_products WHERE id = ?")
    .bind(productId)
    .first<ProductRow>();
  if (!product) throw new Error("Product not found");
  const p = mapProduct(product);
  const farmers = await listFarmers();
  return farmers
    .map((f) => {
      const cropScore = jaccardLocal(f.crops, p.crops);
      const regionScore = p.regions.includes(f.region)
        ? 1
        : p.regions.some((r) => f.region.includes(r) || r.includes(f.region))
          ? 0.5
          : 0;
      const creditBoost = f.creditBand === "A" ? 0.15 : f.creditBand === "B" ? 0.08 : 0;
      const scaleFit =
        f.annualRevenueWan >= p.minAmountWan * 1.5
          ? 0.2
          : f.annualRevenueWan >= p.minAmountWan
            ? 0.1
            : 0;
      const score = Number(
        Math.min(1, cropScore * 0.4 + regionScore * 0.25 + creditBoost + scaleFit).toFixed(3),
      );
      return {
        id: f.id,
        name: f.name,
        score,
        reason: `${f.region} · ${f.crops.join("/")} · credit ${f.creditBand}`,
        creditBand: f.creditBand,
        scaleMu: f.scaleMu,
      };
    })
    .filter((x) => x.score > 0.15)
    .sort((a, b) => b.score - a.score);
}

function jaccardLocal(a: string[], b: string[]) {
  const A = new Set(a.map((x) => x.toLowerCase()));
  const B = new Set(b.map((x) => x.toLowerCase()));
  if (!A.size && !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

const FIN_TRANSITIONS: Record<FinApplicationStatus, FinApplicationStatus[]> = {
  draft: ["submitted", "withdrawn"],
  submitted: ["under_review", "withdrawn", "rejected"],
  under_review: ["approved", "rejected", "withdrawn"],
  approved: ["disbursed", "withdrawn"],
  rejected: [],
  disbursed: [],
  withdrawn: [],
};

export async function processApplication(input: {
  id: string;
  status: FinApplicationStatus;
  bankNote?: string;
}): Promise<FinApplication> {
  const row = await getDb()
    .prepare("SELECT * FROM fin_applications WHERE id = ?")
    .bind(input.id)
    .first<AppRow>();
  if (!row) throw new Error("Application not found");
  const current = row.status;
  if (!FIN_TRANSITIONS[current].includes(input.status)) {
    throw new Error(`Invalid transition ${current} → ${input.status}`);
  }
  const ts = nowIso();
  await getDb()
    .prepare(
      `UPDATE fin_applications SET status = ?, bank_note = ?, updated_at = ? WHERE id = ?`,
    )
    .bind(input.status, input.bankNote?.trim() || row.bank_note, ts, input.id)
    .run();
  const apps = await listApplications();
  const found = apps.find((a) => a.id === input.id);
  if (!found) throw new Error("Failed to reload application");
  return found;
}

export async function forecastCropPrice(crop: string, region: string) {
  const { results } = await getDb()
    .prepare(
      `SELECT as_of, price_yuan FROM price_series
       WHERE crop = ? AND region = ?
       ORDER BY as_of ASC`,
    )
    .bind(crop, region)
    .all<{ as_of: string; price_yuan: number }>();
  const history = results.map((r) => ({
    asOf: r.as_of,
    priceYuan: r.price_yuan,
  }));
  const values = history.map((h) => h.priceYuan);
  const forecast = smaForecast(values, 4, 3).map((priceYuan, i) => ({
    step: i + 1,
    priceYuan,
  }));
  return {
    crop,
    region,
    method: "SMA+momentum (heuristic; ARIMA-ready boundary)",
    history,
    forecast,
  };
}

export async function financeStats() {
  const db = getDb();
  const pending = await db
    .prepare(
      `SELECT COUNT(*) AS c FROM fin_applications
       WHERE status IN ('submitted', 'under_review')`,
    )
    .first<{ c: number }>();
  const products = await db
    .prepare(`SELECT COUNT(*) AS c FROM fin_products WHERE active = 1`)
    .first<{ c: number }>();
  return {
    pendingApplications: pending?.c ?? 0,
    activeProducts: products?.c ?? 0,
  };
}

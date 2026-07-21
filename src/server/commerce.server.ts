import { getDb, newId, nowIso } from "./db.server";

export type MarketProductStatus = "draft" | "listed" | "sold_out" | "archived";
export type OrderStatus = "placed" | "paid" | "shipped" | "completed" | "cancelled";
export type DemandStatus = "open" | "matched" | "closed";

export type MarketProduct = {
  id: string;
  sellerId: string;
  sellerName?: string;
  title: string;
  crop: string;
  region: string;
  unit: string;
  priceYuan: number;
  stock: number;
  description: string;
  status: MarketProductStatus;
  createdAt: string;
  updatedAt: string;
};

export type MarketOrder = {
  id: string;
  productId: string;
  productTitle?: string;
  buyerName: string;
  qty: number;
  unitPriceYuan: number;
  totalYuan: number;
  status: OrderStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export type BuyerDemand = {
  id: string;
  buyerName: string;
  crop: string;
  region: string;
  qty: number;
  unit: string;
  budgetYuan?: number;
  detail: string;
  status: DemandStatus;
  createdAt: string;
  updatedAt: string;
};

export type DemandContact = {
  id: string;
  demandId: string;
  farmerId: string;
  farmerName?: string;
  message: string;
  status: "sent" | "replied" | "closed";
  createdAt: string;
};

type ProductRow = {
  id: string;
  seller_id: string;
  title: string;
  crop: string;
  region: string;
  unit: string;
  price_yuan: number;
  stock: number;
  description: string;
  status: MarketProductStatus;
  created_at: string;
  updated_at: string;
  seller_name?: string;
};

type OrderRow = {
  id: string;
  product_id: string;
  buyer_name: string;
  qty: number;
  unit_price_yuan: number;
  total_yuan: number;
  status: OrderStatus;
  note: string | null;
  created_at: string;
  updated_at: string;
  product_title?: string;
};

type DemandRow = {
  id: string;
  buyer_name: string;
  crop: string;
  region: string;
  qty: number;
  unit: string;
  budget_yuan: number | null;
  detail: string;
  status: DemandStatus;
  created_at: string;
  updated_at: string;
};

function mapProduct(r: ProductRow): MarketProduct {
  return {
    id: r.id,
    sellerId: r.seller_id,
    sellerName: r.seller_name,
    title: r.title,
    crop: r.crop,
    region: r.region,
    unit: r.unit,
    priceYuan: r.price_yuan,
    stock: r.stock,
    description: r.description,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function mapOrder(r: OrderRow): MarketOrder {
  return {
    id: r.id,
    productId: r.product_id,
    productTitle: r.product_title,
    buyerName: r.buyer_name,
    qty: r.qty,
    unitPriceYuan: r.unit_price_yuan,
    totalYuan: r.total_yuan,
    status: r.status,
    note: r.note || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function mapDemand(r: DemandRow): BuyerDemand {
  return {
    id: r.id,
    buyerName: r.buyer_name,
    crop: r.crop,
    region: r.region,
    qty: r.qty,
    unit: r.unit,
    budgetYuan: r.budget_yuan ?? undefined,
    detail: r.detail,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function listMarketProducts(filter?: {
  status?: MarketProductStatus | MarketProductStatus[];
  crop?: string;
  q?: string;
}): Promise<MarketProduct[]> {
  const clauses: string[] = [];
  const binds: unknown[] = [];
  if (filter?.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    clauses.push(`p.status IN (${statuses.map(() => "?").join(",")})`);
    binds.push(...statuses);
  }
  if (filter?.crop) {
    clauses.push("p.crop = ?");
    binds.push(filter.crop);
  }
  if (filter?.q) {
    clauses.push("(p.title LIKE ? OR p.description LIKE ?)");
    const like = `%${filter.q}%`;
    binds.push(like, like);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const sql = `
    SELECT p.*, f.name AS seller_name
    FROM products p
    JOIN farmer_profiles f ON f.id = p.seller_id
    ${where}
    ORDER BY p.updated_at DESC
  `;
  const stmt = getDb().prepare(sql);
  const { results } = binds.length
    ? await stmt.bind(...binds).all<ProductRow>()
    : await stmt.all<ProductRow>();
  return results.map(mapProduct);
}

export async function upsertMarketProduct(input: {
  id?: string;
  sellerId: string;
  title: string;
  crop: string;
  region: string;
  unit?: string;
  priceYuan: number;
  stock: number;
  description: string;
  status?: MarketProductStatus;
}): Promise<MarketProduct> {
  const ts = nowIso();
  if (input.id) {
    await getDb()
      .prepare(
        `UPDATE products SET
          title = ?, crop = ?, region = ?, unit = ?, price_yuan = ?, stock = ?,
          description = ?, status = ?, updated_at = ?
         WHERE id = ? AND seller_id = ?`,
      )
      .bind(
        input.title.trim(),
        input.crop.trim(),
        input.region.trim(),
        input.unit || "kg",
        input.priceYuan,
        input.stock,
        input.description.trim(),
        input.status || "listed",
        ts,
        input.id,
        input.sellerId,
      )
      .run();
    const list = await listMarketProducts();
    const found = list.find((p) => p.id === input.id);
    if (!found) throw new Error("商品更新后读取失败");
    return found;
  }

  const id = newId("p");
  await getDb()
    .prepare(
      `INSERT INTO products (
        id, seller_id, title, crop, region, unit, price_yuan, stock, description, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      input.sellerId,
      input.title.trim(),
      input.crop.trim(),
      input.region.trim(),
      input.unit || "kg",
      input.priceYuan,
      input.stock,
      input.description.trim(),
      input.status || "listed",
      ts,
      ts,
    )
    .run();
  const list = await listMarketProducts();
  const found = list.find((p) => p.id === id);
  if (!found) throw new Error("商品写入后读取失败");
  return found;
}

export async function placeOrder(input: {
  productId: string;
  buyerName: string;
  qty: number;
  note?: string;
}): Promise<MarketOrder> {
  if (input.qty <= 0) throw new Error("数量须大于 0");
  const product = await getDb()
    .prepare("SELECT * FROM products WHERE id = ?")
    .bind(input.productId)
    .first<ProductRow>();
  if (!product) throw new Error("未找到商品");
  if (product.status !== "listed") throw new Error("商品不可购买");
  if (product.stock < input.qty) throw new Error("库存不足");

  const ts = nowIso();
  const id = newId("o");
  const total = Number((product.price_yuan * input.qty).toFixed(2));
  const newStock = product.stock - input.qty;
  const newStatus = newStock <= 0 ? "sold_out" : product.status;

  await getDb()
    .prepare(
      `INSERT INTO orders (
        id, product_id, buyer_name, qty, unit_price_yuan, total_yuan, status, note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'placed', ?, ?, ?)`,
    )
    .bind(
      id,
      input.productId,
      input.buyerName.trim(),
      input.qty,
      product.price_yuan,
      total,
      input.note?.trim() || null,
      ts,
      ts,
    )
    .run();

  await getDb()
    .prepare(`UPDATE products SET stock = ?, status = ?, updated_at = ? WHERE id = ?`)
    .bind(newStock, newStatus, ts, input.productId)
    .run();

  const orders = await listOrders();
  const found = orders.find((o) => o.id === id);
  if (!found) throw new Error("订单写入后读取失败");
  return found;
}

export async function listOrders(): Promise<MarketOrder[]> {
  const { results } = await getDb()
    .prepare(
      `SELECT o.*, p.title AS product_title
       FROM orders o
       JOIN products p ON p.id = o.product_id
       ORDER BY o.created_at DESC`,
    )
    .all<OrderRow>();
  return results.map(mapOrder);
}

export async function listDemands(filter?: {
  status?: DemandStatus | DemandStatus[];
}): Promise<BuyerDemand[]> {
  if (!filter?.status) {
    const { results } = await getDb()
      .prepare("SELECT * FROM buyer_demands ORDER BY created_at DESC")
      .all<DemandRow>();
    return results.map(mapDemand);
  }
  const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
  const { results } = await getDb()
    .prepare(
      `SELECT * FROM buyer_demands WHERE status IN (${statuses.map(() => "?").join(",")})
       ORDER BY created_at DESC`,
    )
    .bind(...statuses)
    .all<DemandRow>();
  return results.map(mapDemand);
}

export async function createDemand(input: {
  buyerName: string;
  crop: string;
  region: string;
  qty: number;
  unit?: string;
  budgetYuan?: number;
  detail: string;
}): Promise<BuyerDemand> {
  const id = newId("d");
  const ts = nowIso();
  await getDb()
    .prepare(
      `INSERT INTO buyer_demands (
        id, buyer_name, crop, region, qty, unit, budget_yuan, detail, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)`,
    )
    .bind(
      id,
      input.buyerName.trim(),
      input.crop.trim(),
      input.region.trim(),
      input.qty,
      input.unit || "kg",
      input.budgetYuan ?? null,
      input.detail.trim(),
      ts,
      ts,
    )
    .run();
  const list = await listDemands();
  const found = list.find((d) => d.id === id);
  if (!found) throw new Error("未找到采购需求");
  return found;
}

export async function contactDemand(input: {
  demandId: string;
  farmerId: string;
  message: string;
}): Promise<DemandContact> {
  const demand = await getDb()
    .prepare("SELECT * FROM buyer_demands WHERE id = ?")
    .bind(input.demandId)
    .first<DemandRow>();
  if (!demand) throw new Error("未找到采购需求");
  if (demand.status === "closed") throw new Error("该需求已关闭");

  const id = newId("dc");
  const ts = nowIso();
  await getDb()
    .prepare(
      `INSERT INTO demand_contacts (id, demand_id, farmer_id, message, status, created_at)
       VALUES (?, ?, ?, ?, 'sent', ?)`,
    )
    .bind(id, input.demandId, input.farmerId, input.message.trim(), ts)
    .run();

  if (demand.status === "open") {
    await getDb()
      .prepare(`UPDATE buyer_demands SET status = 'matched', updated_at = ? WHERE id = ?`)
      .bind(ts, input.demandId)
      .run();
  }

  const farmer = await getDb()
    .prepare("SELECT name FROM farmer_profiles WHERE id = ?")
    .bind(input.farmerId)
    .first<{ name: string }>();

  return {
    id,
    demandId: input.demandId,
    farmerId: input.farmerId,
    farmerName: farmer?.name,
    message: input.message.trim(),
    status: "sent",
    createdAt: ts,
  };
}

export async function listDemandContacts(demandId?: string): Promise<DemandContact[]> {
  if (demandId) {
    const { results } = await getDb()
      .prepare(
        `SELECT c.*, f.name AS farmer_name
         FROM demand_contacts c
         JOIN farmer_profiles f ON f.id = c.farmer_id
         WHERE c.demand_id = ?
         ORDER BY c.created_at DESC`,
      )
      .bind(demandId)
      .all<
        DemandContact & { farmer_name: string; demand_id: string; farmer_id: string; created_at: string }
      >();
    return results.map((r) => ({
      id: r.id,
      demandId: r.demand_id,
      farmerId: r.farmer_id,
      farmerName: r.farmer_name,
      message: r.message,
      status: r.status,
      createdAt: r.created_at,
    }));
  }
  const { results } = await getDb()
    .prepare(
      `SELECT c.*, f.name AS farmer_name
       FROM demand_contacts c
       JOIN farmer_profiles f ON f.id = c.farmer_id
       ORDER BY c.created_at DESC`,
    )
    .all<
      DemandContact & { farmer_name: string; demand_id: string; farmer_id: string; created_at: string }
    >();
  return results.map((r) => ({
    id: r.id,
    demandId: r.demand_id,
    farmerId: r.farmer_id,
    farmerName: r.farmer_name,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  }));
}

export async function commerceStats() {
  const db = getDb();
  const listed = await db
    .prepare(`SELECT COUNT(*) AS c FROM products WHERE status = 'listed'`)
    .first<{ c: number }>();
  const openDemands = await db
    .prepare(`SELECT COUNT(*) AS c FROM buyer_demands WHERE status = 'open'`)
    .first<{ c: number }>();
  const openOrders = await db
    .prepare(
      `SELECT COUNT(*) AS c FROM orders WHERE status IN ('placed', 'paid', 'shipped')`,
    )
    .first<{ c: number }>();
  return {
    listedProducts: listed?.c ?? 0,
    openDemands: openDemands?.c ?? 0,
    openOrders: openOrders?.c ?? 0,
  };
}



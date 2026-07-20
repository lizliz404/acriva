import { createServerFn } from "@tanstack/react-start";

export type MarketProductStatus = "draft" | "listed" | "sold_out" | "archived";

export const getCommerceSnapshot = createServerFn({ method: "GET" }).handler(
  async () => {
    const c = await import("./commerce.server");
    const fin = await import("./finance.server");
    const [products, orders, demands, contacts, farmers, stats] =
      await Promise.all([
        c.listMarketProducts(),
        c.listOrders(),
        c.listDemands(),
        c.listDemandContacts(),
        fin.listFarmers(),
        c.commerceStats(),
      ]);
    return { products, orders, demands, contacts, farmers, stats };
  },
);

export const upsertProduct = createServerFn({ method: "POST" })
  .validator(
    (data: {
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
    }) => data,
  )
  .handler(async ({ data }) => {
    const c = await import("./commerce.server");
    return c.upsertMarketProduct(data);
  });

export const buyProduct = createServerFn({ method: "POST" })
  .validator(
    (data: {
      productId: string;
      buyerName: string;
      qty: number;
      note?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const c = await import("./commerce.server");
    return c.placeOrder(data);
  });

export const createBuyerDemand = createServerFn({ method: "POST" })
  .validator(
    (data: {
      buyerName: string;
      crop: string;
      region: string;
      qty: number;
      unit?: string;
      budgetYuan?: number;
      detail: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const c = await import("./commerce.server");
    return c.createDemand(data);
  });

export const contactBuyerDemand = createServerFn({ method: "POST" })
  .validator(
    (data: { demandId: string; farmerId: string; message: string }) => data,
  )
  .handler(async ({ data }) => {
    const c = await import("./commerce.server");
    return c.contactDemand(data);
  });

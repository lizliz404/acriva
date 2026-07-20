import { createServerFn } from "@tanstack/react-start";

export type FinApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed"
  | "withdrawn";

export const getFinanceSnapshot = createServerFn({ method: "GET" }).handler(
  async () => {
    const fin = await import("./finance.server");
    const [farmers, products, applications, stats] = await Promise.all([
      fin.listFarmers(),
      fin.listFinProducts(),
      fin.listApplications(),
      fin.financeStats(),
    ]);
    return { farmers, products, applications, stats };
  },
);

export const createFinApplication = createServerFn({ method: "POST" })
  .validator(
    (data: {
      farmerId: string;
      productId: string;
      amountWan: number;
      purpose: string;
      jointMode?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const fin = await import("./finance.server");
    return fin.createApplication(data);
  });

export const processFinApplication = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      status: FinApplicationStatus;
      bankNote?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const fin = await import("./finance.server");
    return fin.processApplication(data);
  });

export const matchJointLoanPeers = createServerFn({ method: "GET" })
  .validator((data: { farmerId: string }) => data)
  .handler(async ({ data }) => {
    const fin = await import("./finance.server");
    return fin.matchJointFarmers(data.farmerId);
  });

export const matchFarmersToProduct = createServerFn({ method: "GET" })
  .validator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    const fin = await import("./finance.server");
    return fin.matchFarmersForProduct(data.productId);
  });

export const getPriceForecast = createServerFn({ method: "GET" })
  .validator((data: { crop: string; region: string }) => data)
  .handler(async ({ data }) => {
    const fin = await import("./finance.server");
    return fin.forecastCropPrice(data.crop, data.region);
  });

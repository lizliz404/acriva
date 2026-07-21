import { createServerFn } from "@tanstack/react-start";
import type { FinApplicationStatus } from "#/lib/status-transitions";

export type { FinApplicationStatus };

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
    // Guard sample: bank seat writes. Open demo until AUTH_ENFORCE=1.
    const auth = await import("./auth.server");
    const actor = await auth.requireRole(["bank", "admin"]);
    const fin = await import("./finance.server");
    const result = await fin.processApplication(data);
    await auth.writeAudit({
      actorUserId: actor?.id,
      action: "finance.process",
      entityType: "fin_application",
      entityId: data.id,
      toStatus: data.status,
      meta: { bankNote: data.bankNote ?? null },
    });
    return result;
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

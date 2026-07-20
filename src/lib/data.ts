import type {
  ChangelogItem,
  CustomerStory,
  ScaleItem,
  TabContent,
} from "./types";

/** Final brand — see docs/branding.md (Recommended name = Acriva) */
export const product = {
  name: "Acriva",
  zhName: "融销通",
  category: "grower operating system",
  tagline: "Capital, commerce, and counsel — one desk for every grower.",
  description:
    "Acriva (融销通) is the agricultural finance, market, and expert-services desk — credit and joint loans, produce demand and orders, plus knowledge, Q&A, and booked agronomists — built around the grower.",
  domain: "acriva.lizliz.xyz",
};

export const tabs: TabContent[] = [
  {
    id: "finance",
    label: "Finance",
    title:
      "Working capital that matches the season. Apply for input loans, get bank review, and optionally pair with joint-loan peers who look like you.",
    subtitle: "ApplyFin · MatchJoint · Approve",
    description:
      "Banks publish products. Growers apply with purpose and amount. Content-similarity matching surfaces joint lenders. Approvals leave a clean trail.",
  },
  {
    id: "market",
    label: "Market",
    title:
      "List harvest, find demand, close the loop. Sellers manage lots; buyers browse and order; open demands bring farmers to the right desk.",
    subtitle: "ProdMgmt · Browse · Demand",
    description:
      "Stock and price stay on the listing. Orders decrement inventory. Demand contacts mark interest without another WeChat group.",
  },
  {
    id: "expert",
    label: "Expert service",
    title:
      "Knowledge, Q&A, and booked consults. Growers browse SOPs and ask agronomists; experts publish, answer, and clear the booking queue.",
    subtitle: "Knowledge · QA · Book",
    description:
      "Answered threads can promote into knowledge drafts. Bookings keep prep notes. The field desk stays one place.",
  },
  {
    id: "price-signal",
    label: "Price signal",
    title:
      "Simple trend lines before you lock a loan or a lot. Seasonal series with an honest SMA heuristic — swap in ARIMA when you have the series depth.",
    subtitle: "Signal, not theater.",
    description:
      "Forecast is labeled as a heuristic boundary. Use it for orientation; underwrite on real receipts.",
  },
  {
    id: "roles",
    label: "Four roles",
    title:
      "Farmer hub, bank desk, buyer market, expert uplink. Same data stores — different write paths and queues.",
    subtitle: "One platform, role-shaped UI.",
    description:
      "No fake multi-tenant SaaS. Clear status machines per module. Demo actors switch in-app until real auth lands.",
  },
];

export const logos: string[] = [
  "GreenValley Co-op",
  "Northridge Seeds",
  "Delta Irrigation",
  "HarvestLink",
  "SoilLab Asia",
  "CropPulse",
  "Apex Orchards",
  "Riverbend Dairy",
  "Sunline Produce",
  "TerraForm Ag",
  "BlueAcre Rice",
  "PeakBerry",
];

export const customerStories: CustomerStory[] = [
  {
    name: "East tunnel co-op",
    category: "Grower network",
    headline:
      "One season plan funds inputs and lists the crop — loans and buyers no longer live in separate chats.",
    metric: "3 desks → 1",
  },
  {
    name: "GreenHarvest Bank",
    category: "Agri credit",
    headline:
      "Match queues show who fits the product by crop, region, and credit band before the file opens.",
    metric: "Faster first pass",
  },
  {
    name: "CityFresh Buyer",
    category: "Procurement",
    headline:
      "Demands get real replies from growers with stock, not empty RFQs floating in a group chat.",
    metric: "Demand → contact",
  },
];

export const scaleItems: ScaleItem[] = [
  {
    title: "Finance desk",
    description: "Products, applications, joint-loan links, bank approve path.",
  },
  {
    title: "Trade desk",
    description: "Listings, orders, buyer demands, farmer contact trail.",
  },
  {
    title: "Expert desk",
    description: "Knowledge, Q&A, bookings — dual uplink already live.",
  },
  {
    title: "Price hook",
    description: "SMA heuristic today; ARIMA-ready boundary for later.",
  },
];

export const changelogItems: ChangelogItem[] = [
  {
    date: "2026-07-20",
    title: "Finance + Market on D1",
    desc: "Applications, joint match, listings, orders, buyer demands.",
    tag: "0.2",
  },
  {
    date: "2026-07-19",
    title: "Expert service MVP",
    desc: "Knowledge / QA / Book dual flows with answer→draft promote.",
    tag: "0.1",
  },
  {
    date: "2026-07-18",
    title: "Landing shell",
    desc: "Agent CRM section rhythm remapped to 融销通 three pillars.",
    tag: "Design",
  },
  {
    date: "2026-07-17",
    title: "Domain docs",
    desc: "Full architecture mermaid + status machines captured.",
    tag: "Docs",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: ["Finance", "Market", "Expert", "Price signal"],
  },
  {
    title: "Roles",
    links: ["Farmer", "Bank", "Buyer", "Expert"],
  },
  {
    title: "Resources",
    links: ["Architecture", "Domain model", "Changelog", "Deploy notes"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy", "Terms"],
  },
];

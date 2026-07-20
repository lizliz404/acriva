# 融销通 — 领域模型（三模块）

枢纽角色：**农户 Farmer**。三模块共享用户身份表，分库分表按边界拆分。

## Module map

| Module | Stores | Key flows |
|---|---|---|
| **Finance** | `fin_products`, `fin_applications`, `joint_loan_links`, `farmer_profiles` | ApplyFin, FinApprove, MatchFarmer, MatchJointLoan |
| **Ecommerce** | `products`, `orders`, `buyer_demands`, `demand_contacts` | ProdMgmt, Browse/Buy, ManageDemand, ContactBuyer |
| **TechSupport** | `knowledge`, `qa_msg`, `book_info`, `experts` | 已实现 |

## Finance status

`fin_applications.status`:
`draft → submitted → under_review → approved | rejected → disbursed | withdrawn`

Joint loan: application may link peer farmers via `joint_loan_links` with `score` from content matcher.

## Ecommerce status

`products.status`: `draft → listed → sold_out → archived`  
`orders.status`: `placed → paid → shipped → completed | cancelled`  
`buyer_demands.status`: `open → matched → closed`

## AI hooks (replaceable)

| Hook | Interface | MVP implementation |
|---|---|---|
| Joint lender match | `matchJointFarmers(profile) → ranked[]` | Content similarity on crop/region/scale tags |
| Bank→farmer match | `matchFarmersForProduct(productId)` | Filter by amount/region/crop + simple score |
| Price trend | `forecastPrice(series) → points[]` | SMA + optional ARIMA-lite later |

Do **not** ship fake “deep learning” claims. Label heuristics honestly; keep function boundary so real models can drop in.

## Server layout

```
src/server/
  db.server.ts          # shared D1 + tech helpers (existing)
  finance.server.ts     # finance repo
  commerce.server.ts    # ecommerce repo
  ai.server.ts          # matchers + price forecast
  desk.ts               # tech server fns
  finance.ts            # finance server fns
  commerce.ts           # commerce server fns
```

## App routes (target)

| Path | Role lens |
|---|---|
| `/app` | Hub overview (all modules counts) |
| `/app/finance` | Farmer apply + joint match |
| `/app/finance/bank` | Bank review queue |
| `/app/market` | Browse products + demands |
| `/app/market/sell` | Farmer product mgmt |
| `/app/market/buy` | Buyer cart/orders (simple place order) |
| `/app/knowledge` … | Tech (existing) |
| `/app/expert` | Expert uplink (existing) |

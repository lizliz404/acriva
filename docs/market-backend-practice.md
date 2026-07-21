# Market-facing backend practice (Acriva / 融销通)

**Status:** research digest · 2026-07-21  
**Full note (Liz Notes):** `/home/ubuntu/projects/liz-notes/research/2026-07-21-acriva-market-backend-best-practice.md`  
**Stack ADR:** [`backend-stack.md`](./backend-stack.md)

> 先按「直接面向市场」谈。不按 demo 自我降级。

## Core judgment

1. Best practice for this product class is **layered multi-sided platform + clear money/compliance boundary** — not “Spring vs Workers”.
2. **Cloudflare Workers has type ceilings** (memory, package size, D1 size, heavy CPU, ledger-grade finance) — not a simple QPS cliff.
3. **Do not whole-stack migrate early.** Split at the boundary. UI/BFF can stay on CF.
4. **Recommended shape:** CF Worker (TanStack UI + BFF) + D1 workflow + R2/Queues later + **external** pay/lend/risk jobs (+ Java microservice only if a bank SDK forces it).
5. **Acriva now:** real D1 state machines on the right host path; not market-grade finance core. Deepen auth/audit/validation — don’t rewrite to Spring.

## Product sides

| Side | Market essence | Hard requirements |
|---|---|---|
| Finance | Value-chain / rural credit **matching** | KYC/KYB, credit workflow, audit, bank integration; licensing boundary |
| Market | Marketplace | listings, match, order, inventory, disputes; often **escrow** |
| Expert | Knowledge / booking SaaS | roles, content, schedule |
| Signals (opt.) | Decision aid | explainable; no fake-ML theater |

Money should follow **real trade flow**; risk reads the **chain**, not a single farmer form.

## Market checklist (non-negotiables)

1. Real identity + RBAC  
2. Full audit trail on status transitions  
3. Funds never “edited” in business tables — payment/escrow/disburse via licensed rails  
4. Order/inventory consistency under concurrency  
5. Async: notify, match, reconcile, PDFs  
6. Files on object storage  
7. Tenant/org isolation (banks don’t see each other)  
8. Observability + backup + residency  
9. Pluggable risk scoring service  
10. Bank integration as a **service boundary**, not a CRUD screen  

## Workers ceiling (summary)

| OK on Workers | Not sole home on Workers |
|---|---|
| UI, BFF, workflow FSM | Licensed ledger / payment core |
| Listings, Q&A, booking | Heavy batch ML / long CPU |
| Auth, audit ingress | Giant analytics warehouse |
| Webhooks → queue | Mandatory long-lived Java bank SDK |

Paid-plan ballpark (see Cloudflare docs; numbers change): ~128MB isolate memory; CPU default ~30s (up to 5 min); D1 ~10GB/db; tight concurrent outbound sockets per request.

## When to leave CF (partial)

| Signal | Move |
|---|---|
| Real pay/escrow | External adapter; keep UI on CF |
| Bank mandates Java SDK | **Only** that adapter in JVM |
| Heavy reports crush D1 | Read replica / Postgres / shard D1 |
| Private-line / forced on-prem | Re-open host ADR |

## Target shape

```text
CF Worker (TanStack UI + BFF)
  ├─ D1: workflow / listings / Q&A / sessions / audit
  ├─ optional Hono /api/v1 (same Worker)
  ├─ R2 + Queues (later)
  └─ outbound: pay/lend webhooks; batch risk jobs; optional bank Java svc
```

## Acriva gap (honest)

| Practice | Now | Next |
|---|---|---|
| Stack host | Workers + D1 ✅ | keep |
| Auth/RBAC | schema + helpers; demo open | seat UI + enforce writes |
| Audit | table + sample | all money-ish transitions |
| Pay core | none | external when real |
| Spring Boot | **not** the path | only if forced at boundary |

## Kill / revisit criteria

Reopen this note if: full-stack Java is contractual; CF unreachable for delivery; self-run ledger is the product; or measured CF limits block after sharding/outboarding failed.

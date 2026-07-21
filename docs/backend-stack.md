# Backend stack decision (Acriva / 融销通)

**Status:** accepted · 2026-07-21  
**Owner:** Liz  
**Deploy host:** Cloudflare Worker `acriva` + D1 `acriva` · domain `acriva.lizliz.xyz`

## Decision

**Do not migrate to Spring Boot.**  
**Stay on TanStack Start (React SSR) + Cloudflare Workers + D1.**  
Upgrade the *domain* layer (auth, RBAC, audit, validation) — not the framework brand.

## Why not Spring Boot

| Spring Boot wins when… | Acriva reality |
|---|---|
| Long-running JVM / K8s / bank Java SDK | Already on Workers Builds + D1 |
| Heavy multi-step XA / core ledger | MVP workbenches + status machines |
| Java-only delivery org | Portfolio + CF「只 push」ops |

Moving to Spring means **leaving** the working git→Workers path and operating a second host. Cost ≫ benefit until a real bank/payment integration forces an out-of-Worker service.

## Target architecture (best practice *for this product*)

```text
Browser
  └─ TanStack Start (UI + createServerFn BFF)  ──Worker──┐
                                                         ├─ D1 domain tables
Optional later: Hono /api/v1 (same Worker)  ─────────────┤
Heavy out-of-band only if needed:                        │
  payment / bank webhook / batch ARIMA  → external svc ─┘
```

| Layer | Choice | Notes |
|---|---|---|
| App + BFF | TanStack Start server functions | Already shipped |
| Optional public API | Hono on same Worker | Only when third parties need REST |
| DB | D1 (SQLite) | Schema in `migrations/` |
| Validation | Zod (next) | All write server fn inputs |
| Auth / RBAC | D1 `users` + httpOnly session cookie | See `0005_auth.sql` + `src/server/auth*` |
| Audit | D1 `audit_log` | Who / action / entity / status delta |
| Files | R2 later | Not MVP |
| AI hooks | `ai.server.ts` replaceable | Honest heuristics now |

## Must we stay on Workers?

**Default: yes.** Same domain, D1 binding, Builds pipeline, zero extra ops.

**Split later only for:** bank SDK, payment core, long CPU jobs. UI/BFF can remain on the Worker.

## Explicit non-goals (still)

- Full Spring Security / OAuth enterprise suite on day one  
- Fake “deep learning” claims  
- Local `wrangler deploy` as release path  

## Implementation ladder

1. **Done (this change):** stack ADR locked; auth schema + session helpers; demo accounts; `AUTH_ENFORCE` flag (default off = open demo desk)  
2. **Next:** Zod on writes; `requireRole` on bank/expert mutations when `AUTH_ENFORCE=1`  
3. **Then:** seat switcher UI; audit on status transitions  
4. **Later:** Hono `/api/v1` if needed; R2; external payment service  

## Demo credentials (seed)

Password for all seed users: `demo` (hashed at rest).  
`farmer@demo` · `bank@demo` · `buyer@demo` · `expert@demo`

Open demo mode (`AUTH_ENFORCE` unset/false): writes still open to visitors (portfolio behavior).  
Set Worker var `AUTH_ENFORCE=1` to require session + role on guarded handlers.

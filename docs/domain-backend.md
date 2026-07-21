# Domain model & backend

> Scope note: this doc’s detailed status machines cover **Tech / Expert** (knowledge · QA · booking). Finance and Commerce live in sibling modules (`finance.server.ts`, `commerce.server.ts`) with their own tables in `migrations/0003_finance_commerce.sql`.

## Why this is the heavy part

Landing copy is a skin. The product is three stores + two roles:

| Store | User downlink | Expert uplink |
|---|---|---|
| **Knowledge** | BrowseKnowledge | ManageKnowledge |
| **QAMsg** | AskExpert | QAProcess |
| **BookInfo** | BookExpert | BookProcess |

TanStack Start gives routes + `createServerFn` RPC. Persistence and domain rules live in:

- `migrations/` — D1 SQL schema + seed
- `src/server/db.server.ts` — D1 handle + shared helpers (`getDb`, `newId`, `nowIso`)
- `src/server/auth.server.ts` + `auth.ts` — session cookie, roles, audit helper
- `src/server/desk.ts` — Tech server functions + transitions
- `src/server/finance.ts` + `finance.server.ts` — Finance RPC + repository
- `src/server/commerce.ts` + `commerce.server.ts` — Market RPC + repository
- `src/server/ai.server.ts` — shared SMA / Jaccard helpers (no fake DL)

## Status machines (MVP)

**QAMsg:** `open → assigned → answered → closed`  
(also `open → answered` if expert answers without explicit assign)

**BookInfo:** `requested → confirmed → completed`  
`requested|confirmed → cancelled`; `cancelled → requested` (reopen)

**Knowledge:** `draft → review → published` (publish can jump from draft)

Invalid booking transitions throw from `processBooking`.

Finance applications and commerce orders have their own status columns in `0003_finance_commerce.sql` (see `docs/domain-rongxiaotong.md`).

## Stack decision

**Not Spring Boot.** Host = Cloudflare Workers + D1. Full ADR: [`backend-stack.md`](./backend-stack.md).

## Best-practice choices (kept lean)

1. **Shared stores, role-shaped UI** — one DB, different write paths.
2. **Structured context** — crop / region / priority / confidence are columns, not only free text.
3. **Answer → knowledge promotion** — expert can check “promote” when answering; creates a knowledge **draft**.
4. **Booking prep notes** — grower notes + expert prep stay on BookInfo.
5. **Auth foundation** — `users` / `sessions` / `audit_log` (`0005_auth.sql`); `src/server/auth*.ts`. Default **open demo** until Worker var `AUTH_ENFORCE=1`.
6. **Version on publish** — knowledge version increments when moving to published from non-published.
7. **Experts + farmer_profiles** — domain links from `users.expert_id` / `users.farmer_id`.

## Local D1

Database binding / CLI name: **`acriva`** (see `wrangler.jsonc`). Do not rename an existing `database_id`.

```bash
npx wrangler d1 migrations apply acriva --local
npm run dev
```

Remote:

```bash
npx wrangler d1 create acriva   # paste database_id into wrangler.jsonc (do not rename existing id)
npx wrangler d1 migrations apply acriva --remote
# App release: git push origin master → Cloudflare Workers Builds (no local wrangler deploy)
```

## Not in MVP (on purpose)

- Full OAuth / enterprise IdP
- File/photo uploads (R2)
- Calendar sync
- Notifications
- Full-text search service
- Multi-tenant org model
- Email lead capture / subscribe list
- Spring Boot / separate JVM host

Auth tables + session helpers **exist**; enforcement is opt-in via `AUTH_ENFORCE`. Seat UI switcher and Zod on all writes are next (see backend-stack.md).

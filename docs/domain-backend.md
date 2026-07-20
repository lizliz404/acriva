# Domain model & backend

## Why this is the heavy part

Landing copy is a skin. The product is three stores + two roles:

| Store | User downlink | Expert uplink |
|---|---|---|
| **Knowledge** | BrowseKnowledge | ManageKnowledge |
| **QAMsg** | AskExpert | QAProcess |
| **BookInfo** | BookExpert | BookProcess |

TanStack Start gives routes + `createServerFn` RPC. Persistence and domain rules live in:

- `migrations/` — D1 SQL schema + seed
- `src/server/db.ts` — repository (SQL + mappers)
- `src/server/desk.ts` — server functions + transitions

## Status machines (MVP)

**QAMsg:** `open → assigned → answered → closed`  
(also `open → answered` if expert answers without explicit assign)

**BookInfo:** `requested → confirmed → completed`  
`requested|confirmed → cancelled`; `cancelled → requested` (reopen)

**Knowledge:** `draft → review → published` (publish can jump from draft)

Invalid booking transitions throw from `processBooking`.

## Best-practice choices (kept lean)

1. **Shared stores, role-shaped UI** — one DB, different write paths.
2. **Structured context** — crop / region / priority / confidence are columns, not only free text.
3. **Answer → knowledge promotion** — expert can check “promote” when answering; creates a knowledge **draft**.
4. **Booking prep notes** — grower notes + expert prep stay on BookInfo.
5. **Experts table** — assignment targets; thin for now (no auth).
6. **Version on publish** — knowledge version increments when moving to published from non-published.

## Local D1

```bash
npx wrangler d1 migrations apply fieldwise --local
npm run dev
```

Remote:

```bash
npx wrangler d1 create fieldwise   # paste database_id into wrangler.jsonc
npx wrangler d1 migrations apply fieldwise --remote
npm run deploy
```

## Not in MVP (on purpose)

- Real auth / RBAC
- File/photo uploads (R2)
- Calendar sync
- Notifications
- Full-text search service
- Multi-tenant org model

Add those only after a real pilot signal.

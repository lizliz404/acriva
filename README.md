# Acriva (融销通)

Agricultural finance + produce market + expert services desk.

**Brand:** Acriva · 中文市场名：融销通  
**Live:** https://acriva.lizliz.xyz  
**Docs:** `docs/branding.md`, `docs/prd-rongxiaotong.md`, `docs/architecture-rongxiaotong.mmd`

## Modules

| Module | Routes |
|---|---|
| Finance | `/app/finance`, `/app/finance/bank` |
| Market | `/app/market`, `/app/market/sell` |
| Expert | `/app/knowledge`, `/app/ask`, `/app/book`, `/app/expert` |

## Stack

- TanStack Start + React 19 + Tailwind v4
- Cloudflare Workers + D1
- Server functions in `src/server/*`

## Local

```bash
npm install
npm run db:migrate
npm run dev
```

## Deploy

```bash
npm run db:migrate:prod
npm run deploy
```

Worker name: `acriva` · custom domain: `acriva.lizliz.xyz`

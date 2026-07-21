# AGENTS.md

Project-specific guardrails for Acriva (融销通). Follow global AGENTS.md too.

## Deploy: GitHub → Cloudflare ONLY — DIRECT UPLOAD BANNED

**硬禁令：禁止本机 `wrangler deploy` / `wrangler versions upload` / `wrangler pages deploy` / CF Dashboard Direct Upload / `npm run deploy`。**

日常路径只有：

```bash
git add . && git commit -m "..." && git push origin master
# → Cloudflare auto build + deploy Worker + D1 binding
```

### 为什么不是 Pages？

Acriva 是 **TanStack Start SSR + server functions + D1**。  
Pages Git 适合静态/适配器导出；**生产宿主是 Worker `acriva`**。  
Pages 项目里即使「连了 Git」，也**不能**当成 Worker 部署真相源。

### 首选：Workers Builds（CF 侧 Git connected）

和「Pages 连 Git」同一心智模型，构建跑在 Cloudflare，不经过 GitHub Actions IP：

1. Dashboard → Workers & Pages → Worker **`acriva`** → Settings → Builds  
2. Connect GitHub `lizliz404/acriva`，branch `master`  
3. Build command: `npm ci && npm run build`  
4. Deploy command: `npx wrangler deploy`  
5. 确认 D1 binding `DB`（见 `wrangler.jsonc`）

API 配方：见全局 skill `web-app-deployment-operations` → `references/cf-workers-builds-git-integration.md`  
（需要 user-scoped token 带 `Workers Builds Configuration: Edit`；GitHub App 授权是一次性 Dashboard OAuth。）

### 备选：GitHub Actions

Workflow：`.github/workflows/deploy.yml`  
Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID=afc4504f0abd4f4ac721eb73a6f04650`

**CF token 给 GHA 用时必须 Any IP。**  
GHA runner IP 池巨大且飘；白名单 → `Authentication error` / `code: 9109 Cannot use the access token from location`。  
**不要**试图把每个 runner IP 加进白名单。要么 Any IP 的 CI 专用 token，要么改用 Workers Builds（推荐）。

### 失败时

- 先看是 **Workers Builds** 失败还是 **GHA** 失败（两条路径别混查）
- GHA：secrets、token 权限（Workers Scripts:Edit）、IP 限制
- 本地只允许：`npm run build`、`npm run db:migrate(:prod)` 诊断
- **禁止**用本机 wrangler 上传「先顶上线」

## Stack

- TanStack Start (React SSR) on Cloudflare Workers
- D1 (`DB` → database `acriva`)
- Tailwind CSS v4, Framer Motion, Lucide React

## Build / DB

```bash
npm ci && npm run build
npm run dev
npx wrangler d1 migrations apply acriva --local
npx wrangler d1 migrations apply acriva --remote   # schema only; not a substitute for app deploy
```

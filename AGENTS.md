# AGENTS.md

Project-specific guardrails for Acriva (融销通). Follow global AGENTS.md too.

## Deploy: GitHub Actions ONLY — DIRECT UPLOAD IS BANNED

**硬禁令：禁止 wrangler deploy / wrangler versions upload / wrangler pages deploy / CF Dashboard Direct Upload。**

部署路径只有一个：commit + push to `master` → GitHub Actions 自动 build + deploy。

```bash
# ✓ 唯一合法部署方式
git add . && git commit -m "..." && git push origin master

# ✗ 绝对禁止以下任何一条
npx wrangler deploy
npx wrangler versions upload
npm run deploy
```

### 需要手动配置（一次性）

在 repo Settings → Secrets and variables → Actions 添加：
- `CLOUDFLARE_API_TOKEN` — CF API token
- `CLOUDFLARE_ACCOUNT_ID` = `afc4504f0abd4f4ac721eb73a6f04650`

Workflow 文件：`.github/workflows/deploy.yml`（已提交）。

### 如果 GitHub Actions 失败

- 检查 secrets 是否设置
- 检查 CF token 是否过期或有 Workers Scripts Edit 权限
- 本地调试用 `npm run build`（只 build，不部署）
- **不要试图用 `wrangler deploy` 绕过 CI**

## Stack

- TanStack Start (React SSR) on Cloudflare Workers
- D1 database (binding: `DB`, database: `acriva`)
- Tailwind CSS v4, Framer Motion, Lucide React

## Build

```bash
npm ci && npm run build   # GitHub Actions 里跑的也是这个
npm run dev               # 本地开发 (port 3000)
```

## Database

```bash
npx wrangler d1 migrations apply acriva --remote   # 生产迁移
npx wrangler d1 migrations apply acriva --local     # 本地迁移
```

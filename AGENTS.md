# AGENTS.md

Project-specific guardrails for Acriva (融销通). Follow global AGENTS.md too.

## Deploy: platform builds — DIRECT UPLOAD BANNED

**硬禁令：禁止本机 `wrangler deploy` / Direct Upload / `npm run deploy`。**

日常 = lizliz.xyz 同款心智：

```bash
git add . && git commit -m "..." && git push origin master
# → Cloudflare Workers Builds → Worker acriva + D1
```

### 为什么不是 Pages？

TanStack Start SSR + server functions + D1 → 宿主是 **Worker `acriva`**。  
Pages 列表里的 Git 壳（`dist/client`）是安慰剂，不是生产。

### 顺滑路径：Workers Builds Git（必选）

和 Pages 连 Git 同构；**平台替你 build/deploy**，不经 GHA、不碰 token IP。

**一次性 Dashboard（~90s）：**

1. Workers & Pages → Worker **`acriva`** → Settings → Builds → Connect  
2. Repo `lizliz404/acriva` · branch `master`  
3. Build: `npm ci && npm run build`  
4. Deploy: `npx wrangler deploy`  

中途切换管道：**不影响**自定义域 `acriva.lizliz.xyz`（已挂 Worker）。

API 连 Builds 需要 user-scoped token + `Workers Builds Configuration: Edit`。  
**已接通（2026-07-21）**：Workers Builds trigger `Deploy production` → repo `lizliz404/acriva` @ `master`。  
日常只 `git push`；验收=生产 `https://acriva.lizliz.xyz` 内容更新。

### GitHub Actions = CI only

`.github/workflows/ci.yml`：install + build 门禁，**不上线**（对齐 lizliz/pep-words）。

### 失败时

- 先看 Workers Builds 部署记录，不是 GHA  
- 本地只允许 `npm run build` / `db:migrate(:prod)` 诊断  
- **禁止** wrangler 上传顶上线

## Stack

- TanStack Start (React SSR) on Cloudflare Workers  
- D1 (`DB` → `acriva`) · Tailwind v4 · Framer Motion · Lucide  

## Build / DB

```bash
npm ci && npm run build
npm run dev
npx wrangler d1 migrations apply acriva --local
npx wrangler d1 migrations apply acriva --remote   # schema only ≠ app release
```

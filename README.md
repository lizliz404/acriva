# Acriva · 融销通

农产品**融销经营台**：把农贷、货盘、专家问诊放在同一张台子上。

| | |
|---|---|
| **Live** | https://acriva.lizliz.xyz |
| **App** | https://acriva.lizliz.xyz/app |
| **GitHub** | https://github.com/lizliz404/acriva |
| **定位** | 土老板 / 合作社 · 借得到 · 卖得出 · 问得着 |

不是三个孤儿小程序，是 **Finance · Market · Expert** 同台分流：农户申请与上架，银行过审留痕，买家看货下单，专家清问答/预约队列。

## 模块

| 席位 | 路径 | 做什么 |
|---|---|---|
| 经营台总览 | `/app` | 三模块状态一眼看 |
| 融资 | `/app/finance` | 申请、联保匹配、行情参照 |
| 银行席 | `/app/finance/bank` | 审批队列、放款状态 |
| 货盘 | `/app/market` | 浏览、下单 |
| 上架 | `/app/market/sell` | 货品、买家需求对接 |
| 知识 / 问答 / 预约 | `/app/knowledge` `/app/ask` `/app/book` | 农户下行 |
| 专家席 | `/app/expert` | 答疑、确认预约、升知识稿 |

演示站 **无鉴权**：写入接口对访客开放，顶部有「开放演示台」提示。不要录真实农户/银行数据。

## 技术栈

- **TanStack Start**（React 19 SSR）+ Tailwind v4 + Framer Motion
- **Cloudflare Workers + D1**（不是静态 Pages 站）
- Server functions：`src/server/*` · schema：`migrations/`

## 本地

```bash
npm ci
npm run db:migrate    # D1 local
npm run dev           # http://localhost:3000
```

## 部署（唯一路径）

**硬规则：禁止本机 `wrangler deploy` / Direct Upload。**

目标体验 = 其它 `*.lizliz.xyz` 项目一样：

```text
改代码 → commit → git push origin master → Cloudflare 自动 build + 部署 Worker
```

### 首选：Workers Builds（Git connected）

Dashboard → **Workers & Pages** → Worker **`acriva`** → **Settings → Builds** → Connect `lizliz404/acriva`  
- Build: `npm ci && npm run build`  
- Deploy: `npx wrangler deploy`  
- Branch: `master`  
- D1 binding `DB` 已在 `wrangler.jsonc`

这是动态 Worker 版的「Pages 连 Git」：构建跑在 **Cloudflare 侧**，不经过 GitHub Actions runner，也**不吃**本机 CF token 的 IP 白名单。

### 备选：GitHub Actions（本仓库已有 workflow）

`.github/workflows/deploy.yml`：push `master` → `npm ci` → `npm run build` → `wrangler deploy`。

需要 repo secrets：

- `CLOUDFLARE_API_TOKEN` — 需 **Workers Scripts:Edit**，且 **IP 限制 = Any IP**（GHA runner IP 不固定；白名单会 `code: 9109`）
- `CLOUDFLARE_ACCOUNT_ID` = `afc4504f0abd4f4ac721eb73a6f04650`

> 若 token 有 IP 白名单，GHA 会永远挂在 deploy 步。要么改 Any IP，要么改用上面的 **Workers Builds**，不要逐个加 runner IP。

### 一次性 / 运维

```bash
npm run db:migrate:prod   # 远程 D1 migration（本机 wrangler，改 schema 时用）
```

自定义域：`acriva.lizliz.xyz`（Workers Domains）。Worker 名 / D1 名：`acriva`。

## 文档

| 文件 | 内容 |
|---|---|
| `docs/DESIGN.md` | 色板、字体、成交叙事 |
| `docs/branding.md` | 品牌与 mark |
| `docs/prd-rongxiaotong.md` | PRD |
| `docs/domain-rongxiaotong.md` | 领域模型 |
| `docs/domain-backend.md` | D1 / server |
| `docs/audit.md` | 审计与 remediation |
| `AGENTS.md` | Agent 部署禁令 |

## License

Private portfolio / practice project.

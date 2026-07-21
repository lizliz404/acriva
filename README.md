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

## 部署（和 lizliz.xyz 一样顺）

**硬规则：禁止本机 `wrangler deploy` / Direct Upload。**

```text
改代码 → commit → git push origin master → Cloudflare Workers Builds 自动 build + 部署
```

产物是 **动态 Worker + D1**（不是静态 Pages），但日常动作与静态站相同：**只 push**。  
平台替你 build/deploy，不经过 GHA runner，不碰 CF token IP。

### 一次性接通（约 90 秒，Dashboard）

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → Worker **`acriva`**（不是 Pages 列表里的壳）
2. **Settings → Builds → Connect** → `lizliz404/acriva`
3. Branch: `master`
4. Build command: `npm ci && npm run build`
5. Deploy command: `npx wrangler deploy`
6. 保存 → **Retry deployment** / 再 push 一次

D1 binding `DB` 已在 `wrangler.jsonc`；自定义域 `acriva.lizliz.xyz` 已挂在 Worker 上，**中途改部署管道不影响域名**。

### GitHub Actions

`.github/workflows/ci.yml` = **build 门禁 only**（对齐 lizliz/pep-words），**不上线**。

### 运维

```bash
npm run db:migrate:prod   # 远程 D1 migration（改 schema 时；≠ app 发布）
```

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

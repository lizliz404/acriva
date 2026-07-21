# Acriva / 融销通 — PASS 1 Audit

> 审计日期：2026-07-21  
> 仓库：`/home/ubuntu/projects/acriva`（`package.json` name=`acriva`；GitHub `lizliz404/acriva`）  
> Live：`https://acriva.lizliz.xyz`  
> 范围：只读审计。未改产品源码。每条结论附 path / path:line / live HTML 证据。

---

## 1. 执行摘要

- **产品骨架已通：** Finance / Market / Expert 三条业务 + D1 状态机可跑；landing 已换成「土老板四步」中文结果句，不再是冷灰 Linear 壳。
- **SEO/社交分享是公开面最大破洞：** `og:image` 相对路径 SVG、中文乱码/null byte、无 `og:url`/canonical/JSON-LD/sitemap、`robots` 无 Sitemap、head 未链 `manifest`。
- **命名已统一（PASS 2）：** 工程目录 / docs / `package-lock` / `.cta.json` 均为 `acriva`；worker/D1 binding 名 `acriva`；**未改** D1 `database_id`。
- **鉴权为零：** 所有 `createServerFn` POST（放款审批、改库存、答疑）对公网开放；nav「登录」只是跳 `/app`。
- **成交路径 landing 强、app 弱：** Hero/CTA 对齐 DESIGN；进台后总览仍大量英文标签，footer 链接全是死 `<span>`，邮箱订阅是前端假成功。

---

## 2. 架构与模块现实

### 2.1 Docs 宣称 vs 代码现实

| 模块 | Docs | 代码现实 | 证据 |
|---|---|---|---|
| Tech / Expert | `docs/prd-rongxiaotong.md` P0「已完成」；`docs/domain-backend.md` | `migrations/0001_init.sql` + `src/server/db.server.ts` + `desk.ts`；路由 `knowledge/ask/book/expert` | 文件存在；`AppShell` 链到四席 |
| Finance | PRD P1；`domain-rongxiaotong.md` status 机 | `0003_finance_commerce.sql` + `finance.server.ts` / `finance.ts`；`/app/finance` + `/app/finance/bank` | schema `fin_applications.status` draft→disbursed |
| Ecommerce / Market | PRD P1；目标含 `/app/market/buy` | `products/orders/buyer_demands` + `commerce.*`；**无** `market.buy` 路由 | `domain-rongxiaotong.md:58` 有目标；`src/routes/app/` 无对应文件 |
| AI hooks | SMA / Jaccard，禁止伪深度学习 | `ai.server.ts` `smaForecast` + `jaccard` | `ai.server.ts:23-44` 注释诚实 |
| Auth / 支付 / IM | PRD P3「真鉴权…」 | **未实现** | 无 users/sessions 表；migrations 仅业务表 |

### 2.2 运行时栈（与 README 一致）

- TanStack Start + React 19 + Tailwind v4（`package.json`）
- Cloudflare Workers + D1：`wrangler.jsonc` `name: "acriva"`，`database_name: "acriva"`，`database_id: "0261f11d-71e9-4821-8b62-cee4198784f7"`
- Server layout 与 `domain-rongxiaotong.md` 基本一致；**docs 过时点：** `domain-backend.md:16` 写 `src/server/db.ts`，实际是 `db.server.ts`（D1 命令名已在 PASS 2 改为 `acriva`）

### 2.3 D1 边界

- Tech：`experts`, `knowledge`, `qa_msg`, `book_info`（`0001_init.sql`）
- Finance + Commerce：`farmer_profiles`, `fin_*`, `joint_loan_links`, `products`, `orders`, `buyer_demands`, `demand_contacts`, `price_series`（`0003_finance_commerce.sql`）
- **无**统一 `users` / RBAC；角色靠 UI 分流 + demo 字符串（如 `Demo Grower`，`desk.ts:66`）

---

## 3. 产品与成交（土老板四步 vs landing/app）

DESIGN 四步（`docs/DESIGN.md` §1.2）：戳痛 → 给结果 → 给证据 → 低摩擦动作。

| 步骤 | Landing | App |
|---|---|---|
| 戳痛 | Hero sub：「季节前钱不卡…」（`Hero.tsx` ~227） | 弱；总览英文模块名（`app/index.tsx:24-28`） |
| 结果 | H1「钱、货、技术，一张台子办成」+「借得到·卖得出·问得着」 | 导航中文席位 OK；卡片标题 Finance/Market/Expert |
| 证据 | 三窗 mock（融资申请中 / 货盘 / 预约）+ 状态 badge | D1 真数据列表；状态英文 enum 直出（如 `submitted`） |
| 动作 | 主 CTA「进经营台」→ `/app`；次「先看怎么贷」→ `#platform` | 各模块可写；但无身份门，像开放演示台 |

**对齐度：** Landing ≈ 对齐 DESIGN 叙事顺序（`index.tsx`：Nav→Hero→LogoCloud→PlatformTabs→DarkFeature→FeatureCards→Stories→Changelog→FinalCTA→Footer）。  
**缺口：**

- DESIGN 次 CTA 允许「有货上架」——Hero/Final 只有「先看怎么贷」，无上架次入口（`Hero.tsx:235-240`，`FinalCTA.tsx:50-58`）。
- FeatureCards 三结果卡**无**各自深链入口（`FeatureCards.tsx:32-50`），结束在形容词块。
- FinalCTA 邮箱「订阅」仅 `setDone(true)`，不落库（`FinalCTA.tsx:11-15`）——假成交。
- Navbar「登录」=`/app`，无鉴权（`Navbar.tsx` 登录链 + 无 auth 代码）。

---

## 4. 设计系统落地（DESIGN.md vs styles / components / mark）

| Token / 规则 | DESIGN | 实现 | 判定 |
|---|---|---|---|
| soil/rice/jade/gold… | §3.1 | `styles.css` `@theme` L10–23 | **落地** |
| IBM Plex + Noto SC | §4.1 | `styles.css` L1 Google Fonts import | **落地** |
| `text-hero` / btn-primary jade | §4.2 / §7.1 | `styles.css` L78–145 | **落地** |
| `prefers-reduced-motion` | §6.3 | `styles.css:406-414` 停 CSS 动画；Hero interval **未**读 reduced motion（`Hero.tsx:52-55`） | **部分** |
| Seal A mark | §8 + branding | `public/icon.svg` soil+#F7F0E4+gold apex | **落地** |
| theme-color | DESIGN §11 写 `#F7F0E4`；job 倾向 soil/ink | `__root.tsx:23` = `#F7F0E4`；`manifest.json:29` = `#0F4D35` | **不一致** |
| 冷青 `#0F766E` / Inter 主声 | 禁止 | src 内未检出品牌主色回归 | **OK** |

整体：视觉系统已从冷灰 teal 迁到米纸+深土+玉石绿；app chrome（`AppShell`、`app-card`）与 landing 同色板。主要剩余是 token 文档与 meta/manifest 不同步，以及 mock 循环对 a11y 不完整。

---

## 5. Frontend / UX

**强项**

- Landing 单页叙事清楚；nav island + framer-motion（`Navbar.tsx`）支持 `useReducedMotion`。
- Hero 拼贴 idle/hover 反馈存在（`interactive-window`、typing dots）。
- App 顶栏九链覆盖三模块（`AppShell.tsx:4-14`）。

**弱项**

- `/app` 总览中英混杂偏 EN（`app/index.tsx:24-58`），对土老板主用户不友好。
- Footer 四列链接无 `href`（`SiteFooter.tsx:21-24`）——合规/关于/架构全死。
- 「登录」文案暗示账户系统，实际直进演示台 → 信任减分。
- FeatureCards / scaleItems 无行动按钮；Changelog「资源」锚点存在（`id="resources"`）但 footer「架构/领域模型」不链到 `docs`（且 docs 不在 public）。
- 无 `/app/market/buy` 买家专席；买家能力塞在 `market.tsx` 浏览下单，与领域文档目标不一致。

---

## 6. Data / backend / auth gaps

| 能力 | 状态 | 证据 |
|---|---|---|
| D1 CRUD Tech | 有 | `desk.ts` createQuestion / answer / book / knowledge |
| D1 Finance | 有 | `finance.ts` create/process/match/forecast |
| D1 Commerce | 有 | `commerce.ts` upsert/buy/demand/contact |
| 状态机校验 | 部分 | booking/QA 有非法转移 throw（`domain-backend.md` + desk handlers） |
| Auth / session | **无** | 无 middleware；任何访客可 POST 审批/改货 |
| Rate limit / CSRF | **未见** | server fn 直暴露 |
| 文件上传 R2 | 无 | docs 标明 Not in MVP |
| 真支付/物流/IM | 无 | PRD P3 |
| 邮箱 lead 捕获 | 假 | FinalCTA 本地 state |
| Users 表 | 无 | migrations 无 |

**安全含义（演示站可忍，上真农户/银行不可）：** 公网可改 `fin_applications`、扣库存、写问答。属 P0 若域名已对外且 D1 remote 有真数据；若纯 demo seed，标 P1「上线前必封」。

---

## 7. Tests / quality / naming drift

**Tests**

- `package.json` 有 `"test": "vitest run"`，仓库内 **0** 个 `*.test.*` / `*.spec.*`。
- 无 CI 证据在本审计范围内检查（未读 GitHub Actions）。

**Naming（PASS 2 已清）**

| 位置 | 状态 |
|---|---|
| 本地目录名 | `/home/ubuntu/projects/acriva` |
| `docs/README.md` / `prd-rongxiaotong.md` | 路径写 acriva |
| `docs/domain-backend.md` | `d1 … acriva` |
| `package-lock.json` / `.cta.json` | name=`acriva` |
| `package.json` / `wrangler.jsonc` / README / UI copy | **acriva / Acriva / 融销通**（D1 `database_id` 未改） |

产品表面与工程元数据已对齐 Acriva；中文市场名保持 **融销通**。

---

## 8. Docs vs reality

| Doc | 可信度 | 问题 |
|---|---|---|
| `DESIGN.md` / `branding.md` | 高 | 与 styles/mark 大体一致；theme-color 表述与 manifest 冲突 |
| `prd-rongxiaotong.md` | 中高 | 优先级叙述仍可用；目录名已 acriva |
| `domain-rongxiaotong.md` | 中 | `/app/market/buy` 未建；server 布局准 |
| `domain-backend.md` | 中低 | 只覆盖 Tech；路径 `db.ts` 仍错（D1 名已改 `acriva`） |
| `prd-source.md` / `architecture.mmd` | 历史 | README 已标明截断材料 |
| `architecture-rongxiaotong.mmd` | 业务图准 | 色板仍是教纲蓝橙，非 DESIGN 土/jade |
| `docs/README.md` | 索引可用 | 目录已为 acriva |

---

## 9. Security / ops

| 项 | 观察 |
|---|---|
| 传输 | Live HTTPS（Cloudflare），`curl -sI` HTTP/2 200 |
| Worker | `wrangler.jsonc` observability on；`workers_dev: true` |
| Source maps | `upload_source_maps: true` — 便于调试，略增暴露面 |
| 写接口 | 无鉴权 server fn（见 §6） |
| Secrets | 本审计未见 `.env` 业务密钥；D1 id 在 wrangler 明文（正常） |
| robots | Live 被 CF Managed Content 包裹 + 项目 `Allow: /`；**无** `Sitemap:` 行（`public/robots.txt` 仅 4 行 Disallow 空） |
| `/app` indexability | 无 `noindex`；演示薄内容可能进索引 |

---

## 10. SEO — technical + on-page + social

### 10.1 Technical — **3 / 10**

| 检查 | 结果 | 证据 |
|---|---|---|
| `sitemap.xml` | **404** live | `curl -sI https://acriva.lizliz.xyz/sitemap.xml` → 404；`public/` 无该文件 |
| `robots.txt` Sitemap | **缺** | `public/robots.txt` 无 Sitemap；live CF 段亦无 |
| canonical | **缺** | live head 无；`__root.tsx` links 无 |
| `og:url` / `og:site_name` / `og:locale` | **缺** | `__root.tsx:15-22`；live meta 列表确认 |
| JSON-LD | **缺** | live 无 `application/ld+json` |
| `link rel=manifest` | **缺** | `__root.tsx:25-30` 无；live `rel=manifest` false（hydration 里有 router `manifest` 字样，非 PWA link） |
| `manifest.json` 文件 | 有且可拉 | live 200；`theme_color` `#0F4D35` ≠ meta `#F7F0E4` |
| `lang` | OK | `<html lang="zh-CN">` |
| `/app` noindex | 无 | 建议演示路由 noindex |

### 10.2 On-page — **7 / 10**

| 检查 | 结果 | 证据 |
|---|---|---|
| Title | 有；含融销通+结果句；约 28 字 | live：`融销通 · Acriva — 钱、货、技术，一张台子办成`；`__root.tsx:5` + `data.ts:13` |
| Description | 强，土老板结果导向 | `data.ts:15-16`；live meta 一致 |
| H1 | 中文海报级 | live / `Hero.tsx` |
| 内链 | 锚点 `#platform/#customers/#pricing/#resources` 存在 | 各 section `id=` |
| CTR 优化空间 | Title 略长偏品牌+口号；可更「借得到」结果前置 | 非错，可打磨 |
| 死链/假链 | Footer 无链接；登录假 | `SiteFooter.tsx` |

### 10.3 Social — **2 / 10**

| 检查 | 结果 | 证据 |
|---|---|---|
| `og:image` 相对 `/og-image.svg` | **坏** | `__root.tsx:18`；live `content="/og-image.svg"` — 多数爬虫要绝对 URL，且常拒 SVG |
| `og-image.svg` 中文 | **mojibake + null bytes** | 文件内 2× `\0`；`aria-label`/`text` 本应为「融销通」处为 `\x8d\x00\x1a`；tagline 字节损坏为 `�0 � V�� � �@` |
| `og-image.png` | **不存在** | `public/` 无 PNG |
| twitter:image | 同相对 SVG | `__root.tsx:22` |
| `og:type` | 有 `website` | OK |
| 分享预览预期 | 破图或无中文 | 验证失败模式与 job「Known bugs」一致 |

**综合 SEO 印象：** 文案层已够卖；机器可读与社交卡片层接近不及格。PASS 3 清单与本审计 P0 对齐。

---

## 11. Creative: Three.js background — **NO**

**决定：NO（默认跳过；不进 PASS 4）。**

理由：

1. DESIGN 要「厚实纸木经营台」，明确禁止霓虹/玻璃/冷灰 3D SaaS 气质（`DESIGN.md` §2.2 / §6.2）。
2. Hero 已有三窗产品拼贴 + motion；再加 WebGL 背景是复杂度换存在感，不换成交证据。
3. 无 Three 依赖（`package.json`）；引入违背「最小依赖」与 job「除非 YES 且 effort S」。
4. 土老板信任靠状态/金额/席位，不靠粒子场。

若未来要「氛围」，优先 CSS 米纸纹理/极轻噪点（effort S），不要 Three.js。

---

## 12. V0 gap table

| 能力（PRD / domain） | V0 期望 | 现状 | Gap |
|---|---|---|---|
| 农户融资申请 | ApplyFin + 状态 | `/app/finance` + D1 | 小：UI 状态中文化 |
| 银行审批 | FinApprove | `/app/finance/bank` | 无真银行身份 |
| 联合贷匹配 | MatchJointLoan | `matchJointLoanPeers` Jaccard | 启发式已标；非模型 |
| 商品上架 | ProdMgmt | `/app/market/sell` | OK |
| 浏览购买 | BuyProduct | `market.tsx` + `buyProduct` | 缺独立 `/app/market/buy` |
| 买家需求 | ManageDemand / Contact | 有 | OK |
| 知识/问答/预约 | Tech MVP | 双端流 | OK |
| 价格预测 | ARIMA-lite | SMA | 文档已允许；勿夸大 |
| 鉴权 RBAC | P3 | 无 | **大** |
| 支付/物流/IM | P3 | 无 | 大（可继续不做） |
| Lead 捕获 | 增长 | 假订阅 | 中 |
| SEO/OG 资产 | 上线标配 | 破损 | **大** |
| 品牌目录名 | acriva | `/home/ubuntu/projects/acriva` | 已清（PASS 2） |

---

## 13. P0–P3 backlog

| ID | Sev | 位置 | Action | Effort |
|---|---|---|---|---|
| P0-01 | P0 | `__root.tsx:18-22` | `og:image`/`twitter:image` 改绝对 `https://acriva.lizliz.xyz/og-image.png`；补 `og:url`/`og:site_name`/`og:locale`/canonical | S |
| P0-02 | P0 | `public/og-image.svg` | 重写 UTF-8 中文（融销通 + 结果句）；消除 null bytes；生成 `og-image.png` 1200×630 | M |
| P0-03 | P0 | `public/` + `robots.txt` | 新增 `sitemap.xml`（landing）；robots 加 `Sitemap: https://acriva.lizliz.xyz/sitemap.xml` | S |
| P0-04 | P0 | `__root.tsx` | JSON-LD SoftwareApplication + Organization + WebSite；`link rel=manifest` | S |
| P0-05 | P0 | `__root.tsx:23` vs `manifest.json:29` | 统一 theme-color（建议：browser chrome 用 soil `#1C1712` 或 DESIGN 已写 rice；manifest 与 meta 同值） | S |
| P0-06 | P0 | 全站 server fn | 演示写接口：至少加简单 gate / 或文档+UI 大标「开放演示」+ 考虑 `/app` `noindex` | M |
| P1-01 | P1 | `SiteFooter.tsx` + `data.ts` footerColumns | 链接改真锚点或外链；删死链或标「即将」 | S |
| P1-02 | P1 | `app/index.tsx` | 总览中文化（模块名/指标），对齐 landing 话术 | S |
| P1-03 | P1 | `Navbar` 「登录」 | 改「进演示台」或真做 auth 前置 | S |
| P1-04 | P1 | `FinalCTA.tsx` | 订阅对接存储或去掉假成功 | S |
| P1-05 | P1 | FeatureCards / Hero | 三结果卡加入口；可选次 CTA「有货上架」→ `/app/market/sell` | S |
| P1-06 | P1 | naming | PASS 2 已做：docs/lock/cta/目录 → `acriva`；**未**改 D1 `database_id` | done |
| P1-07 | P1 | `domain-backend.md` | 修正 `db.server.ts`、D1 名 `acriva`、补 Finance/Commerce 或标只含 Tech | S |
| P1-08 | P1 | `/app/*` head | 演示路由 `noindex,nofollow` | S |
| P2-01 | P2 | `domain` `/app/market/buy` | 买家席路由或改文档降级 | M |
| P2-02 | P2 | 状态枚举 UI | 中文映射 submitted→已提交 等 | S |
| P2-03 | P2 | Hero mock intervals | 尊重 `prefers-reduced-motion` | S |
| P2-04 | P2 | tests | 状态机纯函数 + 关键 server 校验 vitest | M |
| P2-05 | P2 | title CTR | 试验更短结果前置 title（保留融销通） | S |
| P3-01 | P3 | Auth/RBAC | 真身份后再开银行/专家写路径 | L |
| P3-02 | P3 | 支付/物流/IM | 按 PRD 扩展 | L |
| P3-03 | P3 | Three.js | **不做**（见 §11） | — |
| P3-04 | P3 | ARIMA 真模型 | 接口已留；有数据再换 | L |

---

## 14. Dimension scores (/10)

| 维度 | 分 | 一句话 |
|---|---|---|
| 品牌/视觉系统落地 | **8** | DESIGN token + Seal A + 中文英雄句已齐；meta/manifest 色未统一 |
| Landing 成交叙事 | **8** | 四步大体走通；footer/订阅/次 CTA 有洞 |
| App 产品完成度 | **7** | 三模块可演示写读；缺买家专席与中文总览 |
| 后端/数据模型 | **7** | D1 边界清晰、启发式 AI 诚实；无用户模型 |
| 安全/鉴权 | **2** | 公开写接口，演示级 |
| 工程质量/测试 | **3** | 无测试；命名漂移；docs 局部腐烂 |
| SEO technical | **3** | 见 §10.1 |
| SEO on-page | **7** | 见 §10.2 |
| SEO social | **2** | 见 §10.3 |
| Docs 可信度 | **5** | DESIGN/PRD 主线可用；backend/目录名过时 |
| Ops/发布面 | **7** | CF 自定义域已活；观测开启 |
| 创意增强（Three.js 等） | **n/a → 决策 NO** | 不加分不加码 |

**加权直觉（对外可感知）：** 品牌与 landing ~7.5；可分享可发现 ~2.5；可信任上真业务 ~3。下一刀应先砍 P0 SEO/OG，再清命名与成交毛刺，鉴权按是否持有真数据升级。

---

## 审计方法备注

- 已读：`docs/*`（含 DESIGN/PRD/domain）、`src/routes/__root.tsx`、`src/lib/data.ts`、landing/app 关键组件、`src/server/*`、`migrations/*`、`wrangler.jsonc`、`package.json`、`public/*`。
- Live：`curl` HTML head、`/robots.txt`、`/manifest.json`、`/sitemap.xml`（404）、`/og-image.svg`（200）。
- 二进制：`xxd`/`python` 确认 `og-image.svg` null byte 与中文损坏。
- **未做：** 浏览器实机点完所有表单、未写/未改产品代码、未 commit。

---

*PASS 1 complete. Next: PASS 2 命名统一 → PASS 3 SEO/OG → PASS 4 审计 P0/P1。*

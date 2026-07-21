---
version: 2.0
name: Acriva / 融销通
updated: 2026-07-22
status: source of truth for visual + conversion design + favicon/OG briefs
audience_primary: 中国农业经营主体 / 土老板 / 合作社负责人
audience_secondary: 农商行信贷岗 · 产地买家 · 农技专家
anti_audience_skin: Silicon Valley Linear/Stripe clone for SF operators
anti_audience_skin_2: 国潮文创礼盒 / 普洱茶叶包装 / 中式养生馈赠
live: https://acriva.lizliz.xyz
related: docs/branding.md (naming · Seal A geometry · SVG export)
---

# Acriva Design System

> **一句话：** 融销通要长得像「能办事的厚实经营台」，不像「又一个冷静的 B2B SaaS」，也不像「送礼用的国潮茶叶盒」。
>
> 本文件先于图标、landing 文案、token 改色。实现必须以本文为准。

---

> **前置诊断（来自 V2 audit）：** Acriva 的破绽在**材料层**——"印"这个隐喻名字很响，但整套配色里**没有一丝红**（真实中国印章=印泥红=作数），品牌名在喊"盖章"，视觉却完全回避了盖章这个动作最核心的感官记忆。同时暖土+米+金+玉配色和**普洱茶/中式养生礼盒**这一整个类目高度撞色。V2 不改静态 mark，改动效（§6.4 盖章反馈）和排版纪律（§2.4 反类目校准），把红色锁死在交互瞬间。

---

## 0. V1 → V2 修订说明

V1 已经把「人 / 成交 / 色 / 字」想透了，这是罕见的及格线以上的起点。V2 不推翻它，只补三个 V1 没处理的破绽：

| 破绽 | V1 现状 | V2 处理 |
|---|---|---|
| **「印」有名无实** | 品牌叫「Seal A / 田印」，但静态色板里 soil/rice/gold 三色，**完全没有印泥红**——真实盖章的感官记忆（红、按压、留痕）被摘掉了 | 不改静态 mark（favicon/OG 仍三色，见 §9.4），改**动效**：新增 §6.4「盖章反馈」——关键确认动作（提交申请/确认预约/上架）触发一次「印章按下」微动效，短暂露出一丝印泥红下衬，0.3–0.4 秒消失。红色只活在这一瞬间的交互里，永不进入静态品牌资产 |
| **配色撞类目** | 暖土+米纸+金+玉，和普洱茶/中式养生礼盒品类几乎同源，文档从未点名这条界线 | 新增 §2.4「反类目校准」，明确用「瑞士几何 + 台账密度」把自己摁在「经营台」而不是「馈赠礼盒」这一侧 |
| **微信重度用户 ≠ 1200×630 消费者** | §1.1 明说主用户「微信重度」，但 OG 只规定 Facebook/Twitter 式横版卡，微信自身的公众号/小程序分享卡是方形/竖版缩略图逻辑，完全没规格 | 新增 §10.11「微信分享卡」 |
| **信任语法只在文案层** | §1.3 讲了「留痕」是加分项，但视觉系统里没有对应组件 | 新增 §7.5「留痕条」——把「批次号/时间戳/操作人」做成一个可复用的 mono 小标签，贴在每个产品截图角落，把「留痕」从一句话变成一个看得见的视觉习惯 |
| **9.9 / 10.10 占位** | 留白 | 本版直接填满，见下 |

---

## 0.5 项目快照

| 项 | 值 |
|---|---|
| **英文主品牌** | Acriva（uh-CREE-vuh） |
| **中文市场名** | 融销通（融=资 · 销=货 · 通=专家与信息跑通） |
| **品类** | 农产品融销经营台 / grower operating desk |
| **主 tagline（ZH）** | 钱、货、技术，一张台子办成 |
| **结果句（ZH short）** | 借得到 · 卖得出 · 问得着 |
| **EN short** | One desk to fund, sell, and get counsel. |
| **Live** | https://acriva.lizliz.xyz · App `/app` |
| **四席** | 农户 · 银行 · 买家 · 专家 |
| **三结果模块** | Finance 借得到 · Market 卖得出 · Expert 问得着 |
| **Mark 名** | Seal A（田印 A）— 深土圆角方印 + 米色实心 A + 金印心；**盖章动效**时短暂露红衬（仅交互态） |

**产品一句话（对外）：** 给土老板和合作社的一张经营台——农贷能申请、货盘能上架、专家能问到。

**资产 AI 不许做的事：** 重新发明品类视觉（麦穗/农场插画）、换主色回冷青/冷灰、把静态 mark 做成描边空心、**把普洱茶/国潮包装的构图习惯（书法体、印泥拓印大面积、卷轴感）搬进来**、在 favicon 里塞中文或塞红色。

---

## 1. 人与成交

### 1.1 主用户

**土老板**：地里/棚里/合作社里真扛季节现金流；微信重度，怕被骗，认熟人和结果；会用互联网但不为设计品味付费，为「借得到、卖得出、出事有人答」付费。

次用户：银行/农商行（要可控可审可留痕）、买家（要货真有量能联系）、专家（队列清楚预约不扯皮）。

### 1.2 成交机制（landing/hero/CTA 必须顺着走）

1. **戳痛（3 秒）**：钱卡在季节前 · 货压在手里 · 病虫害没人及时答
2. **给结果**：借得到 · 卖得出 · 问得着（融/销/通）
3. **给证据**：状态机可见、金额/批次/时间、角色分席、**留痕条**（新，见 §7.5）
4. **给低摩擦动作**：主 CTA「进经营台」；次 CTA「先看怎么贷」/「有货上架」

### 1.3 信任语法

| 加分 | 减分 |
|---|---|
| 具体作物、产区、金额量级、状态词、留痕条 | 抽象英雄文案、假 SF logo 墙 |
| 银行席、合作社、批次号 | 细线幽灵按钮当主 CTA |
| 中文优先 | 六个同级 feature 卡抢注意力 |

---

## 2. 品牌气质

### 2.1 四个词

**厚实 · 利落 · 有钱色 · 能办事**

### 2.2 明确不是

| 禁止气质 | 为什么 |
|---|---|
| Linear/Stripe 冷灰极简 | 工程师/VC 货架，不是土老板的台子 |
| 绿色麦穗/拖拉机插画 | 土且廉价 |
| 暗色紫渐变 AI SaaS | 品类错位 |
| 政府红头/大泥金暴发户 | 失去银行对手方信任 |
| 细线空心 monogram | 16px 死、无记忆 |
| **国潮礼盒/普洱茶包装**（新） | 见 §2.4 |

### 2.3「性张力」的工程定义

不是擦边，是视觉抓取力（内部黑话，**不得出现在任何对外文案或图像 AI prompt 里**）：块面>线；冷暖对撞（深土×暖金×玉绿）；字号敢大；一屏一个高光；余白有呼吸但不发虚。

### 2.4 反类目校准（新——这是 V2 最关键的一条纠偏）

暖土 + 米纸 + 金 + 深绿这套色板，如果排版习惯稍微一漂，就会滑进「普洱茶/中式养生馈赠礼盒」的视觉语言（书法题字、大面积印泥拓印、卷轴留白、竖排文字）。Acriva 必须靠**排版纪律**而不是靠换色来撇清关系：

| 维度 | Acriva（经营台） | 反例（茶叶/礼盒） |
|---|---|---|
| 字体 | 无衬线几何体（Plex/Noto Sans），横排 | 书法体/宋体题字，竖排 |
| 印/章的使用 | 抽象几何 A，块面实心 | 写实印章拓印、大面积朱红 |
| 密度 | 台账级信息密度（状态、金额、时间） | 大留白+一句禅意文案 |
| 金的用法 | 单点高光（apex/金额） | 大面积描金、边框描金 |
| 结果导向 | 每屏落在动作/状态 | 每屏落在情绪/意境 |

**验收一句话：** 如果把页面截图拿给人看，对方第一反应是「这是能借钱卖货的台子」还是「这是送礼的茶叶罐」——出现后者，立刻回查本节。

---

## 3. Color system

### 3.1 主 token

| Token | Hex | 角色 |
|---|---|---|
| `--color-soil` | `#1C1712` | 主墨、主按钮、深色带、mark 底 |
| `--color-soil-soft` | `#2A241C` | hover/次级深面 |
| `--color-rice` | `#F7F0E4` | 页面默认底 |
| `--color-cream` | `#FFFBF4` | 卡片/弹层 |
| `--color-husk` | `#E8DFD0` | 边框/分割 |
| `--color-husk-strong` | `#D4C7B0` | 强分割 |
| `--color-clay` | `#6F6558` | 次级正文 |
| `--color-clay-deep` | `#4A433A` | 次强调正文 |
| `--color-jade` | `#0F4D35` | 主行动绿 |
| `--color-jade-soft` | `#E3F0E8` | 成功底 |
| `--color-gold` | `#C9892E` | 欲望/收获点睛 |
| `--color-gold-soft` | `#F5E6C8` | 金色浅底 |
| `--color-seal` | `#B33A2B` | 危险/驳回；**同时是「盖章反馈」动效唯一取色来源，见 §6.4** |
| `--color-info` | `#2F5D7C` | 信息/链接 |

### 3.2 使用法则

```
底：rice 大面积
字：soil 主文 / clay 辅文
主按钮：jade 底 + cream 字（默认）；soil 底 + rice 字（次强/反色带）
点睛：gold 只出现在 mark 顶点、金额、关键状态
禁止：gold 铺大背景；亮草绿 #22C55E 当主色；冷青回归；
     seal 红出现在任何静态品牌资产（favicon/OG/logo）——它只存在于交互动效的一瞬间
```

### 3.3 深色带（landing 中段）

底 `soil`/`soil-soft`；字 `rice`；强调 `gold` 细线点缀；成功态用更亮 jade tint `#7BC4A0`（仅 dark section）。

---

## 4. Typography

| 角色 | 栈 |
|---|---|
| Display/英雄 | `"IBM Plex Sans", "Noto Sans SC", "PingFang SC", system-ui, sans-serif` |
| Body/UI | 同上 |
| 数据/单号/金额 | `"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace` |
| 禁止主声 | Inter Tight、脚本体、书法体 |

| Class | Size | Weight | 用途 |
|---|---|---|---|
| `text-hero` | `clamp(2.75rem, 7vw, 4.75rem)` | 700 | 英雄句 |
| `text-section` | `clamp(1.85rem, 3.8vw, 2.75rem)` | 650–700 | 区块标题 |
| `text-subsection` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | 卡题 |
| `text-body` | `1.0625rem` | 400 | 说明 |
| `text-eyebrow` | `0.75rem` | 600 | 上眉 |
| `text-num` | tabular mono | 500 | 金额/批次/时间 |

中文默认 `lang`；hero 结构：eyebrow「融销通 · Acriva」→ H1「钱、货、技术，一张台子办成」→ sub「借得到·卖得出·问得着」。

---

## 5. Layout & rhythm

内容最大宽 1120–1200px；左右 padding 20–32px；区块纵向 88–128px；卡片网格 2 列（融/销对照）或 3 列（三结果），不要六列 feature 墙。

**Landing 顺序：** Nav → Hero（含产品拼贴）→ 信任条（四席+机制，非 logo 墙）→ 三结果 → 一张台怎么转（深色带季节故事）→ 对手方故事 → Final CTA → Footer。

App shell：浅 rice 底，侧栏/顶栏 cream，活跃项 jade 指示；表格密度中等偏高；状态色 通过/上架=jade，待审=gold，驳回=seal，信息=info。

---

## 6. Shape, depth, motion

### 6.1 圆角

`--radius-btn: 12px` · `--radius-card: 16px` · `--radius-window: 18px` · `--radius-mark: 22%`（32 网格 rx=7）。主 CTA 不用 999px pill。

### 6.2 阴影

软纸影 `0 1px 2px rgba(28,23,18,.04), 0 10px 28px rgba(28,23,18,.06)`；窗口 `0 0 0 1px rgba(28,23,18,.06), 0 18px 50px rgba(28,23,18,.12)`；禁止重霓虹/彩色 glow。

### 6.3 Motion

时长 150–220ms UI；hero mock 循环 2–2.4s；`prefers-reduced-motion` 时停循环保留静态终态。

### 6.4 盖章反馈（新——把「印」这个名字兑现成一次可感知的动作）

这是 V2 唯一一处允许 seal 红出现的地方，而且**只在这里**：

- **触发时机**：确认预约、通过审批、货品上架成功、提交贷款申请——任何「这一下办成了」的动作
- **动效脚本**：按钮/状态芯片在 180ms 内轻微下沉 2–3px（模拟印章压下），随即在其正下方 1–2px 处极短暂（120–150ms）浮现一小片 `--color-seal` 色的模糊印痕（opacity 0→0.35→0），随即完全消失，界面回到 jade-soft 成功态
- **为什么值得做**：这是把「盖章=作数」这一土老板最熟悉的信任仪式，从一句隐喻变成一次真实可感的交互反馈，而且**不污染任何静态品牌资产**——favicon、logo、OG 依旧保持三色纪律
- **工程边界**：仅限确认类主动作，不用于 hover、不用于列表滚动，一屏最多触发一次，避免廉价感

---

## 7. Components

### 7.1 Buttons

| 变体 | 视觉 | 何时 |
|---|---|---|
| Primary | `bg-jade text-cream` | 进经营台、提交、确认、上架 |
| Strong | `bg-soil text-rice` | 深色带主按钮 |
| Secondary | `bg-cream border-husk text-soil` | 次动作 |
| Ghost | 透明+clay 字 | 三级 |
| Gold rare | `bg-gold text-soil` | 极少：关键金额确认 |

### 7.2 Cards & windows

cream 底+husk 边+软纸影；深窗用 soil（问专家/夜间队列）；密度 12–14px；badge 实心浅底。

### 7.3 Badges

成功=jade-soft；进行=gold-soft；危险=浅 seal 底；中性=husk 底。

### 7.4 Forms

标签 soil；输入框 cream 底/husk 边/focus jade ring 2px；错误 seal 边；金额右对齐 mono。

### 7.5 留痕条（新——把「可审」从文案变成组件）

每一处产品截图/mock 窗口右下角，固定一条极小的 mono 标签：

```
批次 #A-2607 · 已留痕 14:32 · 操作人：合作社-陈
```

- 字号 11–12px，`text-num` mono，颜色 clay，底色透明或极淡 husk
- 出现在：Finance 申请状态窗、Market 货盘窗、Expert 预约窗
- **给银行/合作社看的潜台词**：这不是一个营销站截图，是一个真在记账的系统
- 禁止：把它做成显眼徽章抢主视觉——它必须安静，安静本身就是可信的证据

---

## 8. Mark & logo

### 8.1 必须具备的张力

远看是块印章；近看能读出 A；16px 仍是实心剪影；一点金；禁止麦穗/叶子/握手/地球/神经网络/渐变字。

### 8.2 色彩

浅底：tile=soil，图形=rice，apex=gold。深底：tile=rice/透明，图形=soil，apex=gold。App icon/favicon 主推 soil tile + 实心负形 + gold 点。**静态 mark 任何情况下不出现 seal 红**——红色只属于 §6.4 的交互瞬间。

### 8.3 Wordmark

「Acriva」Plex Sans 600–700，略负 tracking；中文锁「融销通」clay/较小；不塞进 favicon。

### 8.4 生产优先级

手写 SVG = 生产真源；AI 位图 = 探索/汇报，不得直接当 favicon 上线。

---

## 9. Favicon brief

### 9.1–9.8

（与 V1 一致：16/32/ico/apple-touch/pwa 全尺寸要求；唯一主体 Seal A；rx≈22%；A 实心不描边；金印心 10–12% tile；soil/rice/gold 三色锁定；negatives 见下；验收 16px 仍是块+A+一点金）

### 9.6 硬性 Negative

麦穗、谷粒、叶子、幼苗、拖拉机、谷仓、握手、地球、神经网络、硬币堆、描边空心 A、细线 triad、冷青/青柠/霓虹、玻璃拟态、3D bevel、软模糊、吉祥物、写实农田、多图标拼盘、wordmark、任何中文字、渐变字、双色渐变 tile、**印泥红/朱红出现在静态图标本身**。

### 9.9 Generation prompt（V2 已填）

```text
Flat vector seal-shaped app icon / favicon, single subject only, no wordmark.

A softly rounded square "seal" tile — corner radius approx. 22% of the tile
edge (chunky, institutional, not a sharp square, not a full pill) — filled
solid deep warm near-black brown #1C1712, full-bleed with no outer padding
ring, no drop shadow, no outer stroke.

Centered inside: one bold, fully SOLID geometric letterform "A" in warm
bone-cream #F7F0E4. Thick stable legs, a heavy horizontal crossbar, a closed
or near-closed triangular counter (the negative space inside the A), the
whole glyph optically nudged ~2% above center, both legs equal weight. No
serif, no calligraphy, no gradient, no outline-only / hairline construction
— it must read as a solid carved shape, like a seal cut into wood or stone,
not a printed letter.

At the top apex of the A, place one small solid square (or short rectangular
chip) in warm gold-bronze #C9892E, sized about 10–12% of the tile edge, with
generous clearance (≥10% margin) from all tile edges. This gold chip is the
ONLY accent color in the entire image.

Absolutely flat vector shading — no 3D bevel, no glass, no glow, no gradient
anywhere, no grain/noise texture, no second color. Style keywords: Swiss
geometric icon design crossed with Chinese official seal / stamp (印章)
gravitas — institutional, thick, trustworthy, carved rather than drawn.
Must remain a legible dark tile + light letterform + one gold dot even
scaled down to 16×16 pixels.

Do not include: wheat, grain, leaves, sprouts, tractors, barns, handshakes,
globes, neural-network motifs, coin stacks, outlined/hollow letterforms,
thin hairline strokes, teal/lime/neon colors, glassmorphism, 3D bevels,
mascots, photorealistic farmland, multiple icons combined in one tile, any
wordmark or Latin/Chinese text, red or crimson ink of any kind, gradient
fills, two-tone gradient tiles.

Deliver as a single clean vector-style square icon, 1:1 composition, exactly
three colors: #1C1712 (tile), #F7F0E4 (letterform), #C9892E (accent chip).
```

### 补充：盖章动效的独立生成说明（给做交互原型的工程师，非静态图标）

若需要一张「按下瞬间」的参考帧（仅用于动效设计稿，不用于导出任何 favicon/icon 文件）：同一枚 Seal A 图标，整体下沉 2px，正下方浮现一层极淡、边缘晕开的 `#B33A2B` 印痕色块，透明度约 35%，形状略不规则（模拟印泥晕染），不需要精确几何。仅作动效参考帧，禁止导出为静态资产。

---

## 10. OG image brief

### 10.1 画布与技术

1200×630px；安全区四周 ≥48px；终态 PNG；文件名 `public/og-image.png`；体重 <1MB；中文结果句为主。

### 10.2 构图骨架

```
┌──────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ 1px husk hairline ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│   [ Seal A 大印 ]     Acriva                             │
│    ≥160px             融销通（clay，较小）                  │
│   借得到 · 卖得出 · 问得着          ← 结果句，大、自信      │
│   钱、货、技术，一张台子办成        ← 可选副句              │
└──────────────────────────────────────────────────────────┘
底：#F7F0E4 rice 满铺
```

### 10.3 文案锁定

P0：借得到 · 卖得出 · 问得着 / Acriva / 融销通。P1：钱、货、技术，一张台子办成。禁止：Capital. Commerce. Counsel.；revolutionize；赋能数字化转型。

### 10.4 色彩锁定

```
Background:  #F7F0E4   Hairline: #E8DFD0
Primary type:#1C1712   Secondary:#6F6558
Mark tile:   #1C1712   Mark A:  #F7F0E4
Mark apex:   #C9892E   ← 全图唯一金
```

### 10.5–10.9

（与 V1 一致：字体 Noto Sans SC/IBM Plex，中文单行优先，大量留白，无重阴影；Dark band / EN-lean 变体保留；negatives 保留；meta 契约 `og:locale = zh_CN`、`twitter:card = summary_large_image`）

### 10.10 Generation prompt（V2 已填）

```text
Design a 1200×630 pixel horizontal social-share (Open Graph) card, flat
vector / clean digital illustration style — NOT a photograph, NOT a 3D
render.

Background: full-bleed warm off-white rice-paper color #F7F0E4, completely
flat, at most an extremely subtle paper-grain texture, no gradient, no
photographic farmland. A thin 1px horizontal hairline in warm beige #E8DFD0
runs the FULL WIDTH near the very top of the canvas — a quiet ledger/document
cue. Keep a safe margin of at least 48px on all four sides.

Left-anchored composition: place one large solid seal-style icon — a
rounded-square tile (corner radius ~22%) filled deep warm brown-black
#1C1712, edge length at least 160px — containing one bold SOLID warm-cream
#F7F0E4 letterform "A" (thick legs, heavy crossbar, carved-not-printed
quality), plus one small solid warm gold-bronze #C9892E square chip riding
the top apex of the A. This gold chip is the ONLY gold in the entire image.

To the right of / below this mark: set the wordmark "Acriva" in a heavy
geometric sans-serif (IBM Plex Sans / grotesque, weight ~700, slightly
negative letter-spacing), color deep brown-black #1C1712, large and
confident (~90–100px cap height). Directly beneath it, in clearly smaller
size, set the Chinese characters "融销通" in muted warm taupe-brown #6F6558
(Noto Sans SC, weight ~500).

Below that pairing, as the dominant message of the card, set one short bold
line of Chinese text reading "借得到 · 卖得出 · 问得着" in deep brown-black
#1C1712 — large, confident, roughly on par with the wordmark. Below that,
in smaller muted taupe-brown (#6F6558 or #4A433A), one optional supporting
line: "钱、货、技术，一张台子办成".

Leave generous open space. Do NOT add: product screenshots, wheat/crop
illustrations, dashboard mockups, photographic people, tractors, green
gradient fields, QR codes, extra icons, drop shadows, glass panels, teal or
neon colors. Only an extremely soft 1–2px shadow under the seal tile is
allowed. The single mandatory accent color across the whole 1200×630 canvas
is the gold chip on the seal's apex — nothing else may be gold, teal, or any
bright saturated hue.

Overall mood: warm, thick, institutional — a paper ledger you can trust, not
a cold tech dashboard, not a cute cartoon farm.
```

### 10.11 微信分享卡规格（新——补上 §1.1 就点名但从未落地的渠道）

微信公众号文章 / 小程序分享卡不吃 1200×630 横版逻辑，实际消费场景是聊天列表里的**小方缩略图**（约 120×120 可视区）或小程序卡片的**近方形/略竖构图**。V1 完全没规格，等于对着「微信重度」用户交了一张对方看不清楚的名片。

| 项 | 值 |
|---|---|
| 尺寸 | **500×400**（微信公众号分享图标准比例）或 **1:1 备用** |
| 构图 | 不用 OG 的左锚+长文案版式（会被压缩到不可读）——改为**居中构图**：Seal A 单独居中占主视觉 60%，其下仅留「Acriva · 融销通」一行 + 结果句一行，字号相对图幅要比 OG 版本大得多 |
| 文案 | 只保留 P0 一句「借得到·卖得出·问得着」，**不放副句**——缩略图里副句必然读不清，放了等于噪音 |
| 色彩/mark | 与 favicon/OG 同一家族，soil/rice/gold 三色 |
| 文件建议 | `public/wechat-share.png`，工程侧另挂 meta（微信生态无标准 og:image，需按公众号/小程序各自的分享图接口配置） |

**Generation prompt（微信方卡）：**

```text
Design a 500×500 pixel square social-share thumbnail, flat vector style,
same visual family as the Acriva seal mark and OG card.

Background: flat warm rice-paper #F7F0E4, no texture beyond the faintest
paper grain. Center-composition (this will be viewed as a small chat
thumbnail, so nothing can rely on fine detail):

Center-top: one large solid Seal A icon — rounded-square tile #1C1712,
solid cream #F7F0E4 letterform A, one small gold #C9892E apex chip —
occupying roughly 55–60% of the canvas width, centered horizontally, upper
two-thirds of the frame.

Below the mark, centered: "Acriva · 融销通" in one line, deep brown-black
#1C1712, medium-heavy weight, moderate size.

Below that, centered, as the single dominant text element: "借得到 ·
卖得出 · 问得着" in deep brown-black #1C1712, LARGE relative to the canvas
— it must still read clearly when the whole image is shown at roughly
100×100px in a chat bubble.

No subtitle, no tagline, no extra copy, no product screenshots, no icons
other than the seal mark, no teal/neon/gradient. Only accent color: the gold
apex chip. Mood: warm, thick, trustworthy, reads instantly even tiny.
```

---

## 11. Copy tone

| Do | Don't |
|---|---|
| 钱、货、季节、过审、上架、回款、问诊 | revolutionize / unlock / supercharge |
| 借得到、卖得出、问得着 | Capital. Commerce. Counsel. 当唯一英雄 |
| 一笔、一批、一席、留下痕 | 赋能农户数字化转型 |

---

## 12. Do / Don't 总表

**Do**：先色板与成交路径再画图标；米纸底+深土字+玉石绿 CTA+一点金；中文英雄句大字；主 CTA 永远指向经营动作；关键确认动作触发盖章反馈；产品截图角落带留痕条。

**Don't**：回到冷灰 Inter+teal；细线空心 A 当终局 mark；麦穗 greenery slop；六张 feature 卡；把红色用进任何静态品牌资产；让排版滑向国潮礼盒调性。

---

## 13. 实现清单

1. 落地本文件为 `docs/DESIGN.md`
2. 对齐 `branding.md`
3. `src/styles.css`：token/字体/radius/shadow/组件类
4. `public/icon.svg` + `logo.svg`：手写优先
5. **Favicon/OG/微信卡生产**：用 §9.9/§10.10/§10.11 prompt → 探索稿 → 对照验收 → 栅格化
6. `src/lib/data.ts`：中文结果导向
7. Landing 组件：换 token/文案层级，新增留痕条组件
8. 盖章反馈动效：接入确认类按钮的成功态回调
9. `__root.tsx`：lang/theme-color/og 绝对 URL
10. App shell 同步 token

### 验收（Liz 标准，V2 新增两条）

- [ ] 不再像 Linear 换皮农业
- [ ] 主色第一眼是暖纸+深土+深绿，不是冷灰+青
- [ ] Mark 16px 可辨，块面+金点
- [ ] Hero 中文痛/结果句+强 CTA
- [ ] 银行/土老板双方都不会觉得「这是玩具站」
- [ ] **（新）截图拿给人看，第一反应是「能办事的台子」而不是「送礼的茶叶罐」**
- [ ] **（新）关键确认动作能看到盖章反馈，且红色只出现在这一瞬间**

---

## 14. 参考锚点（气质类别，不是特定产品截图）

| 可借 | 借什么 | 不借 |
|---|---|---|
| 县域农商行/供应链金融放款类界面 | 信任、流程、状态词 | 公文排版、国徽风 |
| 严肃产业垂直站的信息密度 | 密度与专业 | 医疗绿 |
| Attio 式多窗 mock 密度 | 分镜、tab 切换 | 冷黑促销条、SF 文案 |

**最终裁判：** 土老板会不会觉得「这帮人懂我的季节和账」——懂，就继续；只觉得「又一个好看模板」或「这是送礼包装」，就砍回本节重来。

---

## 15. 文件职责速查

| 文件 | 说了算 |
|---|---|
| 本文 `DESIGN.md` | 人、成交、色、字、版式、组件、favicon/OG/微信卡完整规格 |
| `branding.md` | 命名、Seal A 几何、SVG path 笔记 |
| `src/styles.css` | token 实现 |
| `src/lib/data.ts` | 产品名/tagline |
| `src/routes/__root.tsx` | title/theme-color/og:image |

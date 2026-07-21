---
version: 3.0
name: Acriva / 融销通
updated: 2026-07-22
status: source of truth for visual + conversion design + favicon/OG briefs
audience_primary: 中国农业经营主体 / 土老板 / 合作社负责人
audience_secondary: 农商行信贷岗 · 产地买家 · 农技专家
anti_audience_skin: Silicon Valley Linear/Stripe clone for SF operators
anti_audience_skin_2: 国潮文创礼盒 / 普洱茶叶包装 / 中式养生馈赠
live: https://acriva.lizliz.xyz
related: docs/branding.md (命名 · 田字格印几何 · SVG export)
---

# Acriva Design System

> **一句话：** 融销通要长得像「能办事的厚实经营台」，配一枚「真的敢盖下去的印」——不是「又一个冷静的 B2B SaaS」，也不是「送礼用的国潮茶叶盒」，更不是「一个印字被规则阉割到只剩形状的纪念章」。
>
> 本文件先于图标、landing 文案、token 改色。实现必须以本文为准。

---

> **前置诊断（来自 V3 audit）：** V2 诊断对了材料层缺红、配色撞普洱礼盒，但药方停在「避免难堪」——把印泥红关进 150ms 动效、mark 仍是字母 A。V3 撤销「红不能进静态资产」，用已有 `--color-seal #B33A2B` 作 mark 印色；主推**田字格印**（农田 + 台账格双关）；允许一处手刻不均。区分维度从「有没有红」改为「红长得像章还是像烫金」。

---

## 0. V2 → V3 修订说明

| # | V2 判断 | V2 药方 | 药方错在哪 | V3 修正 |
|---|---|---|---|---|
| 1 | 品牌叫「印」，静态色板却完全没有印泥红 | 红关进 150ms 按钮动效，静态资产不见红 | favicon 是最常被看到的触点，却排除了最有效的识别符号 | 撤销「红不能进静态资产」，用 `--color-seal #B33A2B` 作 mark 印色 |
| 2 | 暖色板撞普洱茶/国潮礼盒 | 靠排版纪律撇清，同时继续禁红 | 「没有红」反而更像素雅养生礼盒 | 区分维度改为「红长得像章还是像烫金」（§2.4） |
| 3 | Mark 主体是「A」 | 保留 A，只调比例 | 「字母+顶角色块」是最常见通用模板 | 主推**田字格印**；「A」降为备选（§8.5） |
| 4 | 静态资产绝对扁平 | 全盘执行 | 印章「刻出来」的线索被剥光 | 允许一处材质偏差：网格边缘轻微手刻不均 + 极浅凹刻阴影 |
| 5 | 微信分享卡 / 留痕条 | V2 已补 | — | 保留 |

其余（留痕条 §7.5、微信分享卡）V2 想得对，本版保留。

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
| **Mark 主概念** | **田字格印**——深土圆角方印 + 朱红实心田字网格 + 金印心 |
| **Mark 备选** | 若 `public/icon.svg` 已有真实分发成本，可保留 A 字形，仅把填色改为 seal 红（§8.5） |

**产品一句话（对外）：** 给土老板和合作社的一张经营台——农贷能申请、货盘能上架、专家能问到。

**资产 AI 不许做的事：** 重新发明品类视觉（麦穗/农场插画）、换主色回冷青/冷灰、描边空心、书法体/卷轴/描金边的礼盒排版习惯、favicon 里塞中文字。

---

## 1. 人与成交

### 1.1 主用户

**土老板**：地里/棚里/合作社里真扛季节现金流；微信重度，怕被骗，认熟人和结果；会用互联网但不为设计品味付费，为「借得到、卖得出、出事有人答」付费。

次用户：银行/农商行（要可控可审可留痕）、买家（要货真有量能联系）、专家（队列清楚预约不扯皮）。

### 1.2 成交机制（landing/hero/CTA 必须顺着走）

1. **戳痛（3 秒）**：钱卡在季节前 · 货压在手里 · 病虫害没人及时答
2. **给结果**：借得到 · 卖得出 · 问得着（融/销/通）
3. **给证据**：状态机可见、金额/批次/时间、角色分席、**留痕条**（见 §7.5）
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
| **国潮礼盒/普洱茶包装** | 见 §2.4 |

### 2.3「性张力」的工程定义

不是擦边，是视觉抓取力（内部黑话，**不得出现在任何对外文案或图像 AI prompt 里**）：块面>线；冷暖对撞（深土×暖金×玉绿）；字号敢大；一屏一个高光；余白有呼吸但不发虚。

### 2.4 反类目校准（V3 修正——本版最关键的一条纠偏）

暖土 + 米纸 + 金这套色板如果排版一漂，会滑进「普洱茶/国潮礼盒」。**但撇清关系靠的不是删掉红色，是选对红的性格**：

| 维度 | Acriva（合同章/发票章逻辑） | 反例（国潮礼盒逻辑） |
|---|---|---|
| 红的来源 | 印泥、公章、发票章——单色朴素、略按压不均 | 描金红、灯笼红——装饰性、饱和均匀、常配金边框 |
| 字体 | 无衬线几何体，横排 | 书法体/宋体题字，竖排或卷轴 |
| 红的用法 | 只出现在 mark 图形本身，从不铺大面积 | 常作大面积底色或边框 |
| 密度 | 台账级信息密度 | 大留白+一句禅意文案 |

**验收一句话：** 截图拿给人看，第一反应是「能借钱卖货的台子」还是「送礼的茶叶罐」——出现后者，回查本节。**这条验收从今天起不再等价于「有没有红」，而是「红长得像章还是像礼盒」。**

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
| `--color-gold` | `#C9892E` | 欲望/收获点睛，mark 唯一高光 |
| `--color-gold-soft` | `#F5E6C8` | 金色浅底 |
| `--color-seal` | `#B33A2B` | 危险/驳回 × **mark 本身的印色**（共用同一 token：章本来就可以盖下去表示「驳回」） |
| `--color-info` | `#2F5D7C` | 信息/链接 |

### 3.2 使用法则

```
底：rice 大面积
字：soil 主文 / clay 辅文
主按钮：jade 底 + cream 字（默认）；soil 底 + rice 字（次强/反色带）
点睛：gold 只出现在 mark 顶点、金额、关键状态
mark 本身：soil 底 + seal 红图形 + gold 印心——三色纪律不变，
          只是把图形色从 cream 换成 seal 红
禁止：gold 铺大背景；亮草绿 #22C55E 当主色；冷青回归；
     seal 红铺成大面积背景色或按钮色——红只属于 mark 图形本身，
     这条克制保留，只是从「红完全不许出现」收窄为「红只能出现在该出现的地方」
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

软纸影 `0 1px 2px rgba(28,23,18,.04), 0 10px 28px rgba(28,23,18,.06)`；窗口 `0 0 0 1px rgba(28,23,18,.06), 0 18px 50px rgba(28,23,18,.12)`；禁止重霓虹/彩色 glow。Mark 唯一例外：网格凹刻极浅阴影（§8.2）。

### 6.3 Motion

时长 150–220ms UI；hero mock 循环 2–2.4s；`prefers-reduced-motion` 时停循环保留静态终态。

### 6.4 盖章反馈（降级——从「红色唯一容身之处」变成锦上添花）

红色已合法出现在静态 mark 里，这个交互细节不再承担「藏红色」的任务，纯粹作为动效加分保留：

- **触发时机**：确认预约、通过审批、货品上架成功、提交贷款申请——任何「这一下办成了」的动作
- **动效脚本**：按钮/状态芯片在 180ms 内轻微下沉 2–3px，随即在其正下方 1–2px 处极短暂（120–150ms）浮现一小片 `--color-seal` 色的模糊印痕（opacity 0→0.35→0），随即完全消失，界面回到 jade-soft 成功态
- **工程边界**：仅限确认类主动作，不用于 hover、不用于列表滚动，一屏最多触发一次

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

### 7.5 留痕条

每一处产品截图/mock 窗口右下角，固定一条极小的 mono 标签：

```
批次 #A-2607 · 已留痕 14:32 · 操作人：合作社-陈
```

- 字号 11–12px，`text-num` mono，颜色 clay，底色透明或极淡 husk
- 出现在：Finance 申请状态窗、Market 货盘窗、Expert 预约窗
- 禁止：把它做成显眼徽章抢主视觉

---

## 8. Mark & logo

### 8.1 主概念：田字格印

远看是块印章；近看是一个粗体田字网格（2×2，读作「田」也读作「台账格」）；16px 仍是实心剪影；印心一点金。田字格比单个拉丁字母更具体、更双关——农田 + 记账格两层意思同时成立。

### 8.2 色彩在 mark 上

- Tile：`soil #1C1712`
- 网格图形：`seal #B33A2B`（实心，允许边缘极轻微手刻不均——唯一允许的「非绝对扁平」细节）
- 印心：`gold #C9892E`，落在网格顶部交叉点，唯一高光
- 深底场景：tile 可换 `rice`，网格仍用 `seal` 红，印心仍 `gold`

### 8.3 Wordmark

「Acriva」Plex Sans 600–700，略负 tracking；中文锁「融销通」clay/较小；不塞进 favicon。

### 8.4 生产优先级

手写 SVG = 生产真源；AI 位图 = 探索/mood，不得直接当 favicon 上线。

### 8.5 备选：保留现有「A」资产

若不想承担换概念的迁移成本：保留 A 字形，只把填色改为 soil 底 + **seal 红**字 + gold 点。辨识度不如田字格方案。

---

## 9. Favicon brief

### 9.1–9.8

16/32/ico/apple-touch/pwa 全尺寸要求；唯一主体田字格印；rx≈22%；金印心 10–12% tile；soil/seal/gold 三色锁定。

### 9.6 硬性 Negative

麦穗、谷粒、叶子、幼苗、拖拉机、谷仓、握手、地球、神经网络、硬币堆、Latin 字母/初始字母、任何中文字、渐变字、玻璃拟态、3D 重浮雕、软模糊、吉祥物、写实农田、多图标拼盘、wordmark、**书法体/毛笔字风格、描金装饰边框、卷轴/丝带/礼盒包装语境**。

### 9.7 验收标准

- 缩到 16px：仍是「深块 + 红色田字网格 + 一点金」
- 红色读作「合同章/发票章」而不是「礼盒烫金」——若第一反应是「送礼」，退回 §2.4
- 金点是唯一亮色

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

若需要一张「按下瞬间」的参考帧（仅用于动效设计稿，不用于导出任何 favicon/icon 文件）：同一枚 mark 图标，整体下沉 2px，正下方浮现一层极淡、边缘晕开的 `#B33A2B` 印痕色块，透明度约 35%，形状略不规则（模拟印泥晕染），不需要精确几何。仅作动效参考帧。

---

## 10. OG image brief

### 10.1 画布与技术

1200×630px；安全区四周 ≥48px；终态 PNG；文件名 `public/og-image.png`；体重 <1MB；中文结果句为主。

### 10.2 构图骨架

```
┌──────────────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ 1px husk hairline ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│   [ 田字格印 大印 ]   Acriva                             │
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
Mark tile:   #1C1712   Mark grid: #B33A2B
Mark apex:   #C9892E   ← 全图唯一金
```

### 10.5–10.9

字体 Noto Sans SC/IBM Plex，中文单行优先，大量留白，无重阴影；Dark band / EN-lean 变体保留；negatives 保留；meta 契约 `og:locale = zh_CN`、`twitter:card = summary_large_image`。

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

### 10.11 微信分享卡规格

| 项 | 值 |
|---|---|
| 尺寸 | **500×400** 或 **1:1 备用** |
| 构图 | **居中**：田字格印占主视觉 55–60%，其下仅「Acriva · 融销通」一行 + 结果句一行 |
| 文案 | 只保留 P0「借得到·卖得出·问得着」 |
| 色彩/mark | soil / seal 红 / gold |
| 文件建议 | `public/wechat-share.png` |

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

**Do**：先色板与成交路径再画图标；米纸底+深土字+玉石绿 CTA+一点金；中文英雄句大字；主 CTA 永远指向经营动作；mark 的红要读作合同章不是烫金礼盒；关键确认动作可触发盖章反馈；产品截图角落带留痕条。

**Don't**：回到冷灰 Inter+teal；细线空心 A 当终局 mark；麦穗 greenery slop；六张 feature 卡；seal 红铺成大面积背景或按钮；让田字格画得机器尺规到没有一点手刻感；让排版滑向国潮礼盒调性。

---

## 13. 实现清单

1. 落地本文件为 `docs/DESIGN.md`
2. 对齐 `branding.md`
3. `src/styles.css`：token/字体/radius/shadow/组件类
4. `public/icon.svg` + `logo.svg`：手写田字格印优先
5. Favicon/OG/微信卡生产：探索稿 → 对照验收 → 栅格化
6. `src/lib/data.ts`：中文结果导向
7. Landing 组件：换 token/文案层级，新增留痕条组件
8. 盖章反馈动效：接入确认类按钮的成功态回调
9. `__root.tsx`：lang/theme-color/og 绝对 URL
10. App shell 同步 token

### 验收（Liz 标准）

- [ ] 不再像 Linear 换皮农业
- [ ] 主色第一眼是暖纸+深土+深绿，不是冷灰+青
- [ ] Mark 16px 可辨：深块 + 红田字格 + 金点
- [ ] Hero 中文痛/结果句+强 CTA
- [ ] 银行/土老板双方都不会觉得「这是玩具站」
- [ ] 截图第一反应是「能办事的台子」而不是「送礼的茶叶罐」——红读作印章不是礼品盒
- [ ] favicon/OG 的红，拿给没看过设计稿的人看，第一反应是印章还是礼品盒

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
| `branding.md` | 命名、田字格印几何、SVG path 笔记 |
| `src/styles.css` | token 实现 |
| `src/lib/data.ts` | 产品名/tagline |
| `src/routes/__root.tsx` | title/theme-color/og:image |

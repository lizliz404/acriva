# 为什么会丑成这样

先把话挑明：不是运气问题，是**方法论问题**，而且是同一个方法论问题在两份文档里各表现出一次。

**第一层,工具用错了。** 两份文档都写着「手写 SVG 才是生产真源，AI 位图只能当探索稿」——这句话本身是对的。但两份文档同时又花了几百字去写"生产级"的图像生成 prompt,精确到旋转角度、透明度百分比、corner radius 具体像素。这是自相矛盾的:你一边承认扩散模型画不准精密几何,一边又指望它靠一句 prompt 画准精密几何。结果自然是模型放弃你那些精确指令,退回到它训练分布里对"几何 monogram / 字母+色块 icon"这个类目见过最多次的默认解——也就是你看到的"一个正方体转 45 度""一个 A 上面顶一坨黄色"。这两个丑东西不是随机噪声,是**统计意义上最诚实的输出**,模型只是老实交代了"扁平几何 SaaS/letter logo"这个类目在训练集里长什么样。

**第二层,"反 AI Slop 清单"亲手制造了 AI Slop。** 两份文档都严格禁止渐变、发光、斜切、纹理、材质感——本意是防止俗气的 3D 水晶感 logo。但一枚印章的全部说服力来自"这是刻出来、压出来的";一枚精密五金件的说服力来自"这是有一点点收边阴影、有一点点指示灯光晕的"。把这些材质线索全部剥离之后,模型手里剩下的只有"扁平色块 + 一个色块"——这恰好是整个 logo 类目里**最没有欲望、最没有记忆点**的那一种解。克制和寡淡被混为一谈了。

**第三层,概念本身在"意外感"上是零。** 旋转菱形套小菱形、字母套顶角色块——都是中心对称、单图形套单图形的构图,这是这个类目里出现频率最高、辨识度最低的构图方式。V2(design-audit.txt)在这一层上加了很多聪明的系统性思考(agent 归属色、留痕条、反类目校准、微信卡),但都没碰这个真正的病灶,只是给同一个通用概念裹了更多形容词——篇幅变长了,但没有变漂亮,这正是你担心的"又臭又长又无聊"本身。

**第四层,Acriva 最讽刺的一个细节:** 系统里其实**早就存在**一个命名和颜色都近乎完美的 token——`--color-seal #B33A2B`,一枚印泥红——但被一条规则判了死刑:"静态资产任何情况下不许出现红"。红被关进一个人类几乎不会看到的 150ms 按钮动效里。可"印"这个隐喻 95% 的识别力就来自那一抹红,favicon 恰恰是品牌被反复看到次数最多的触点。为了不显得"土气",把最有效的那味药连夜倒掉了。

下面是 V3。两枚 mark 概念都换了(不是调角度,是换构图逻辑),两份 OG prompt 都加了一条此前完全缺失的工程提醒:**不要指望扩散模型能精准渲染最终文案,尤其是中文**——生成结果当背景+构图参照,文字二次合成。

```markdown
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
related: docs/branding.md (命名 · Seal 几何 · SVG export)
---

# Acriva Design System (V3)

> 一句话：融销通要长得像「能办事的厚实经营台」，配一枚「真的敢盖下去的印」——不是「又一个冷静的 B2B SaaS」，也不是「送礼用的国潮茶叶盒」，更不是「一个印字被规则阉割到只剩形状的纪念章」。

---

## 0. V2 → V3：改的是什么，为什么

V2 诊断对了两件大事（材料层缺红、配色撞普洱礼盒类目），但开出的药方都在"避免难堪"，不在"制造好看"。

| # | V2 判断 | V2 药方 | 药方错在哪 | V3 修正 |
|---|---|---|---|---|
| 1 | 品牌叫"印"，静态色板却完全没有印泥红 | 把红色关进 150ms 才出现一次的按钮动效里，静态资产永远三色不见红 | favicon 是品牌被反复看到次数最多的触点，恰恰把最有效的识别符号排除在这里 | 撤销"红不能进静态资产"这条自我阉割规则，直接用系统里已存在的 `--color-seal #B33A2B` 作为 mark 本身的印色——不用发明新色 |
| 2 | 暖色板撞普洱茶/国潮礼盒类目 | 靠排版纪律撇清关系，同时继续禁红 | 真正的合同章/发票章是朴素工业红，"没有红"反而更像素雅养生礼盒（大留白+一抹金） | 保留排版纪律，但把区分维度从"有没有红"改成"红长得像章还是像烫金"（见 §2.4） |
| 3 | Mark 主体是"A" | 保留 A，只调比例 | "字母+顶角色块"是 Fiverr/99designs 最常见的通用模板，图像模型一提示就收敛到这个方向 | 主推**田字格印**（2×2 粗体网格，读作"田"也读作"台账格"）；"A" 降级为保留现有资产的备选 |
| 4 | 静态资产要求绝对扁平，无纹理无斜切 | 全盘执行 | 剥离材质感之后，"印章"唯一能让人相信它是刻出来的线索也被剥光了 | 明确允许一处、且只有一处的材质偏差：网格边缘轻微手刻不均 + 极浅凹刻阴影 |
| 5 | §9.9/§10.10 已填，但沿用错误规则 | — | 篇幅变长，没有一处解决"为什么丑" | 4 份 prompt 全部按上述重写，且自带"探索稿非终稿"提醒 |

其余判断（留痕条 §7.5、微信分享卡）V2 想得对，本版保留压缩，不重复造轮子。

---

## 0.5 项目快照

| 项 | 值 |
|---|---|
| 英文主品牌 | Acriva（uh-CREE-vuh） |
| 中文市场名 | 融销通 |
| 结果句 | 借得到 · 卖得出 · 问得着 |
| **Mark 主概念（新）** | **田字格印**——深土圆角方印 + 朱红实心田字网格 + 金印心 |
| **Mark 备选** | 若 `public/icon.svg` 已有真实分发成本，可保留 A 字形，仅替换填色（cream → seal 红），见 §8.5 |
| 资产 AI 不许做的事 | 麦穗/农场插画、冷青冷灰回归、描边空心、书法体/卷轴/描金边的礼盒排版习惯、favicon 里塞中文字 |

---

## 1. 人与成交

不变，完整版见 V2 §1。核心机制：戳痛（钱卡季节前/货压手里/病虫害没人答）→ 给结果（借得到·卖得出·问得着）→ 给证据（状态机、留痕条）→ 给动作（进经营台）。

---

## 2. 品牌气质

四个词不变：厚实 · 利落 · 有钱色 · 能办事。

### 2.4 反类目校准（修正——本版最关键的一条纠偏）

暖土+米纸+金这套色板如果排版一漂，会滑进"普洱茶/国潮礼盒"。**但撇清关系靠的不是删掉红色，是选对红的性格**：

| 维度 | Acriva（合同章/发票章逻辑） | 反例（国潮礼盒逻辑） |
|---|---|---|
| 红的来源 | 印泥、公章、发票章——单色朴素、略按压不均 | 描金红、灯笼红——装饰性、饱和均匀、常配金边框 |
| 字体 | 无衬线几何体，横排 | 书法体/宋体题字，竖排或卷轴 |
| 红的用法 | 只出现在 mark 图形本身，从不铺大面积 | 常作大面积底色或边框 |
| 密度 | 台账级信息密度 | 大留白+一句禅意文案 |

**验收一句话：** 截图拿给人看，第一反应是"能借钱卖货的台子"还是"送礼的茶叶罐"——出现后者，回查本节。**这条验收从今天起不再等价于"有没有红"，而是"红长得像章还是像礼盒"。**

---

## 3. Color system

| Token | Hex | 角色 |
|---|---|---|
| `--color-soil` | `#1C1712` | 主墨、主按钮、mark 底 |
| `--color-rice` | `#F7F0E4` | 页面默认底 |
| `--color-cream` | `#FFFBF4` | 卡片/弹层 |
| `--color-husk` / `-strong` | `#E8DFD0` / `#D4C7B0` | 边框 |
| `--color-clay` / `-deep` | `#6F6558` / `#4A433A` | 正文 |
| `--color-jade` / `-soft` | `#0F4D35` / `#E3F0E8` | 主行动绿 |
| `--color-gold` / `-soft` | `#C9892E` / `#F5E6C8` | 欲望/收获点睛，mark 唯一高光 |
| **`--color-seal`** | **`#B33A2B`** | **危险/驳回语义 ×（新增）mark 本身的印色——共用同一 token 并不冲突：章本来就可以盖下去表示"驳回"** |
| `--color-info` | `#2F5D7C` | 信息/链接 |

```text
底：rice 大面积
字：soil 主文 / clay 辅文
主按钮：jade 底 + cream 字（默认）
点睛：gold 只出现在 mark 顶点、金额、关键状态
mark 本身：soil 底 + seal 红图形 + gold 印心——三色纪律不变，
          只是把图形色从 cream 换成 seal 红
禁止：gold 铺大背景；亮草绿回归；冷青回归；
     seal 红铺成大面积背景色或按钮色——红只属于 mark 图形本身，
     这条克制保留，只是从"红完全不许出现"收窄为"红只能出现在该出现的地方"
```

---

## 4–7. Typography / Layout / Shape / Components

不变，见 V2 §4–§7（IBM Plex Sans + Noto Sans SC；1120–1200px 栅格；留痕条组件 §7.5）。唯一联动更新：

### 6.4 盖章反馈（降级——从"红色唯一容身之处"变成锦上添花）

红色已合法出现在静态 mark 里，这个交互细节不再承担"藏红色"的任务，纯粹作为动效加分保留：确认类动作触发 180ms 下沉 + 一层 `--color-seal` 印痕闪现 120–150ms——用的是同一个 token，逻辑更简单。

---

## 8. Mark & logo（重写）

### 8.1 主概念：田字格印

远看是块印章；近看是一个粗体田字网格（2×2，读作"田"也读作"台账格"）；16px 仍是实心剪影；印心一点金。田字格比单个拉丁字母更具体、更双关——农田 + 记账格两层意思同时成立，也更不容易被图像模型收敛回"字母+顶角色块"的通用模板。

### 8.2 色彩在 mark 上

- Tile：`soil #1C1712`
- 网格图形：`seal #B33A2B`（实心，允许边缘极轻微手刻不均——唯一允许的"非绝对扁平"细节）
- 印心：`gold #C9892E`，落在网格顶部交叉点，唯一高光
- 深底场景：tile 可换 `rice`，网格仍用 `seal` 红，印心仍 `gold`——红在浅底深底下都保持自己的身份，这是它比"A"更稳的地方（A 需要靠明暗反转维持对比，网格本身自带认知锚点）

### 8.4 生产优先级

手写 SVG = 生产真源；AI 位图 = 探索/mood，不得直接当 favicon 上线——**这条纪律 V1/V2 已经写过，但同时又把 AI prompt 当"准生产交付物"来写，本身自相矛盾。V3 把纪律落到实处：§9.9 的 prompt 明确标注自己是探索稿。**

### 8.5 备选：保留现有 "A" 资产

若 `public/icon.svg` 已有真实分发成本（书签、已安装 PWA 图标缓存），不想承担换概念的迁移成本：保留 A 字形，只把填色从"soil 底 + cream 字 + gold 点"改为"soil 底 + **seal 红**字（允许边缘轻微手刻）+ gold 点"。单独这一步色彩修正就能显著改善"没有印感、像随手截图"的问题，只是辨识度不如田字格方案。

---

## 9. Favicon brief

### 9.6 硬性 Negative（更新——删除"红不许出现"，新增礼盒类排除项）

麦穗、谷粒、叶子、拖拉机、握手、地球、神经网络、硬币堆、Latin 字母/初始字母、任何中文字、渐变字、玻璃拟态、3D 重浮雕、软模糊、吉祥物、写实农田、wordmark、**书法体/毛笔字风格、描金装饰边框、卷轴/丝带/礼盒包装语境**。

### 9.7 验收标准（新增一条）

- 缩到 16px：仍是「深块 + 红色田字网格 + 一点金」
- 红色读作"合同章/发票章"而不是"礼盒烫金"——若第一反应是"送礼"，退回 §2.4
- 金点是唯一亮色

### 9.9 Generation prompt（V3 已重写）

```text
Flat-vector-leaning app icon / favicon concept for a Chinese agricultural
business platform. Single subject only, no wordmark, no Chinese or Latin
text anywhere in the icon.

Base tile: a chunky, softly rounded square "seal" shape — corner radius
approximately 22% of the tile edge (institutional and stamp-like, not a
sharp square, not a full pill) — filled solid deep warm near-black brown
#1C1712, full-bleed, no outer padding ring, no drop shadow, no outer stroke.

Centered inside: a bold 田-character grid motif — a thick 2×2 grid of
intersecting bars (like a field-and-ledger grid), each bar wide and
confident, rendered as one continuous carved shape — filled solid in
genuine ink-stamp vermillion red #B33A2B. This red must read as real
pressed stamp ink: allow the outer edges of the grid strokes a small
amount of organic irregularity — slightly uneven line-weight, a touch of
soft ink bleed at one or two edges, as if physically pressed from a
hand-carved wood or stone seal onto the tile. Do not make the grid a
perfectly ruled, machine-precise, sterile grid.

At the top intersection point of the grid, place one small solid square
accent in warm gold-bronze #C9892E, sized about 10% of the tile edge, with
generous clearance (≥10% margin) from all tile edges. This gold chip is
the single brightest accent in the entire image.

Materiality: mostly flat and matte, but allow this one calibrated
exception — a very slight, soft recessed shadow along the grid's carved
lines, as if truly cut into the tile's surface, just enough to suggest a
hand-carved physical seal rather than a printed sticker. No 3D bevel, no
glass, no glow anywhere except the faint recess described, no gradient
fills, no background paper-grain texture.

Style keywords: genuine Chinese official seal / chop (印章) gravitas — the
weight and slight imperfection of a real ink stamp on a contract or
invoice — crossed with confident Swiss geometric grid structure.
Institutional, thick, trustworthy, carved and pressed rather than drawn
and printed. Must remain legible as dark tile + red grid + one gold point
even scaled down to 16×16 pixels.

Do not include: wheat, grain, leaves, sprouts, tractors, barns, handshakes,
globes, neural-network motifs, coin stacks, a Latin letterform of any kind
(no "A", no initials), any Chinese characters rendered as legible text,
teal/lime/neon colors, glassmorphism, heavy 3D bevels, mascots,
photorealistic farmland, multiple icons combined in one tile, any
wordmark, calligraphy or brush-script styling, gold-foil ornamental
borders, festive ribbon or gift-box framing, a symmetric decorative
medallion.

This is a concept exploration to guide a hand-vectorized production SVG —
keep the grid's irregularity subtle and simplifiable, not chaotic. Deliver
as a single clean square icon, 1:1 composition, exactly three colors:
#1C1712 (tile), #B33A2B (grid/ink), #C9892E (accent).
```

---

## 10. OG image brief

### 10.2 构图骨架（唯一变化：左锚从 A 换成田字格，图形色从 cream 换成 seal 红）

其余画布/文案锁定/字体/negatives/meta 契约不变，见 V2 §10.3–§10.9。

### 10.10 Generation prompt（V3 已重写）

```text
Design a 1200×630 pixel horizontal social-share (Open Graph) card
composition, flat / clean vector-adjacent illustration style — NOT a
photograph, NOT a 3D render, NOT photographic farmland.

Background: full-bleed warm off-white rice-paper color #F7F0E4, completely
flat, at most an extremely subtle paper-grain texture, no gradient. A thin
1px horizontal hairline in warm beige #E8DFD0 runs the full width near the
very top of the canvas, evoking a ledger/document header. Keep a safe
margin of at least 48px on all sides.

Left-anchored: one large seal-style mark — a rounded-square tile (corner
radius ~22%) filled deep warm brown-black #1C1712, edge length at least
160px, containing a bold 田-grid motif (thick carved bars forming a 2×2
grid, with slight organic ink-bleed irregularity at one or two edges — not
a machine-ruled grid) filled in genuine ink-stamp vermillion red #B33A2B,
plus one small solid gold-bronze #C9892E accent chip at the grid's top
intersection. This gold chip is the only gold in the entire image.

To the right of the mark, leave clear, generously-spaced room for text
that will be added afterward in real vector type — do not attempt to
precisely render final Chinese marketing copy yourself, since Chinese
character rendering by image generators is unreliable. Instead place
simple horizontal placeholder bars: one bold bar in deep brown-black
#1C1712 sized like a brand-name line, a shorter bar in muted taupe #6F6558
beneath it sized like a smaller market-name line, and one large bold
placeholder bar in #1C1712 below that, proportioned like a short
confident headline (not a paragraph) — all as pure layout/scale guides,
not as actual legible glyphs.

Leave generous open air throughout. Do not fill space with icons,
screenshots, dashboard mockups, wheat illustrations, or decorative
borders. The single mandatory accent color across the whole canvas is the
gold chip on the seal's top intersection — nothing else may be gold, teal,
or any bright saturated hue besides the vermillion red confined to the
mark itself.

Overall mood: warm, thick, institutional — a paper ledger carrying real
stamped authority, not a cold tech dashboard, and not a festive gift-box
or tea-packaging aesthetic (no calligraphy flourishes, no ornamental gold
borders, no ribbon or box framing).
```

**微信分享卡（500×500 或 500×400）：** 把上面构图压成居中版——田字格印占画面 55–60%，其下仅一行"Acriva·融销通"+一行结果句，去掉右侧长文案区，字号相对画幅要大得多，因为要在约 100×100px 的聊天气泡里读清楚。

---

## 11–15

Copy tone、实现清单、参考锚点、文件职责速查——结构不变，见 V2 §11–§15。Do 表新增一条「mark 的红要读作合同章不是烫金礼盒」；Don't 表删除「把红色用进任何静态品牌资产」（现已允许），新增「让田字格画得机器尺规到没有一点手刻感」。验收清单新增：「favicon/OG 的红，拿给没看过设计稿的人看，第一反应是印章还是礼品盒」。
```

```markdown
# Agent CRM — Design Brief (V3)

> Single source of truth for brand/visual identity. Not a roadmap.

---

## 0. V2 → V3 changelog

V2 correctly diagnosed that the Attio/Linear/Stripe skin is the 2026 default AI-SaaS uniform, and proposed a real antidote (`--color-agent`, a "Never Sleeps" component). But it left the actual **mark** almost untouched — a diamond with a few degrees of rotational offset — and asked an image generator to render a nuance no diffusion model can reliably execute, which is exactly why the shipped favicon came back as a plain rotated square: the "offset" instruction disappeared into the model's strongest prior, the single most oversaturated composition in the genre.

| # | V2 diagnosis | V2 fix | Where it fails | V3 correction |
|---|---|---|---|---|
| 1 | No symbol says "an agent did this" | Added `--color-agent` cyan, kept out of the favicon entirely | The one genuinely new brand idea never reached the smallest, most-repeated touchpoint | Extend `--color-agent` into the mark itself — one small bright accent, same role it plays everywhere else |
| 2 | Diamond mark reads generic/gem-like | "Offset the inner diamond a few degrees" | Imperceptible at 16–32px, unreliable for any model to execute with intent; the fallback is the model's strongest prior — a plain symmetric rotated square | Replace the concept, not the angle. New mark is asymmetric **by construction**, not by a subtle nudge |
| 3 | No symbol encodes the actual product thesis | None | An abstract diamond says nothing about CRM, revenue, or agents | New mark ("Dock Mark") is a literal small picture of the claim: a smaller module docking into a larger record |
| 4 | Static assets banned all color/texture/dimensionality | Fully executed | Removed the only cues separating a considered mark from a generic one | Keep flat/matte discipline, but allow **one calibrated exception**: a soft inset shadow at the docking seam + a faint glow on the cyan chip only |
| 5 | §9.9/§10.10 filled, verbosely | — | Length up, distinctiveness flat — the exact "长而无聊" trap | Prompts shorter where restraint-adjectives were redundant, more concrete where it matters (real hardware references, not adjective soup) |

Everything else V2 added — `--color-agent` rules (§4.1), the Never Sleeps strip (§5.7), the WeChat variant, the generic-AI-SaaS sniff test — was good and is kept, compressed, unchanged in substance.

---

## 1–3. Product Identity / Brand Personality / Visual Style

Unchanged — see V2 §1–§3. Agent CRM, an agentic CRM for Chinese-speaking 出海/foreign-trade SaaS GTM teams; personality = professional, sharp, trustworthy, agent-legible; visual style = Attio's product theater + Linear's restraint + Stripe's confidence.

---

## 4. Design Tokens (updated)

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0a0a0a` | Primary text/CTA/dark bg |
| `--color-paper` | `#fafafa` | Page background |
| `--color-success` / `-warn` / `-danger` | `#16a34a` / `#d97706` / `#dc2626` | Semantics |
| `--color-info` | `#2563eb` | Info/metric accent |
| `--color-agent` | `#0891b2` | Agent-authorship chip/ring, UI text-safe weight |
| **`--color-agent-bright`** | **`#22d3ee`** | **New — reserved for small, high-impact single points only: the favicon/mark accent, the OG live-dot. Same hue family, brighter tint calibrated for tiny areas where the muted UI tone would read as gray rather than signal.** |

Fonts, tracking, radius, shadows: unchanged, see V2 §4.

### Logo mark — replaced

Retired: the diamond-in-diamond monogram and its "radar-ping offset" refinement. Both collapse, under real rendering, into the single most generic composition in the geometric-SaaS-monogram genre — which is exactly what came back.

**New concept: the Dock Mark.**

- Outer tile: rounded square, `#0a0a0a`, rx ≈ 22% of edge, full-bleed
- Inner shape: a smaller rounded square, `#fafafa`, ~60% of tile width, offset slightly upper-left of center — deliberately not centered
- At the inner shape's bottom-right corner: a small notch, with a solid square chip in `--color-agent-bright` (#22d3ee) seated into it, protruding slightly outside the white shape's silhouette onto the dark tile — a smaller module docking/keying into a larger one mid-connection
- One calibrated exception to flatness: a soft inset shadow where the chip meets the notch, and a faint glow around the chip only, like a lit indicator LED

Why this wins over the diamond: (1) it's a literal picture of the product's thesis — a smaller agent-shape docking into a larger human-record shape, not an abstract gem; (2) asymmetric compositions are structurally rarer in this genre, so an imperfect render is less likely to collapse into the generic default; (3) it extends `--color-agent` — the one genuinely new idea in the system — down to the smallest, most-repeated brand touchpoint.

---

## 5–8. Component Language / Landing Structure / Audience & Tone / Reference Aesthetics

Unchanged — see V2 §5–§8. Retains floating frosted nav, WindowChrome theater, dark feature band, `--color-agent` authorship rules, the Never Sleeps strip. One addition to §8's keyword list: `docking connector` / `indicator LED` / `relay switch` — concrete hardware references anchoring the new mark, alongside `geometric mark` / `ink on paper`.

---

## 9. Favicon Design Brief (rewritten)

### Goal

An asymmetric docking mark that pictures "agent connects to human record," not a generic gem. Legible at 16×16. Carries exactly one colored accent — the same cyan used everywhere else to mean "an agent touched this."

### What to avoid (updated)

Robots/antennae/chat bubbles; CRM clichés that mud at 16px; more than one accent color; thin vanishing strokes; wordmark in favicon; purple AI tropes; **a perfectly centered, perfectly symmetric composition — symmetry is now the thing to avoid, not the safety net.**

### Generation prompt (V3 — rewritten)

```text
Flat vector app icon / browser favicon concept, single subject, no
wordmark, no letters, no text anywhere.

Outer tile: a rounded square, corner radius approximately 22% of the
tile's edge length, filled solid near-black ink #0A0A0A, completely
full-bleed — no outer ring, no padding, no drop shadow, no outer stroke.

Inside, offset slightly toward the upper-left of center (deliberately not
centered): one smaller rounded-square shape, solid near-white #FAFAFA,
roughly 60% of the tile's width, with the same proportional corner
rounding as the outer tile.

At the bottom-right corner of this white shape, cut a small square notch
out of it (negative space revealing the dark tile underneath) — and into
that exact notch, place a small solid square chip in bright cyan-teal
#22D3EE, sized so it fills the notch but also protrudes slightly outward
onto the dark tile, so part of the chip sits inside the white shape's
footprint and part sits outside on the black ground. It should read like a
smaller module docking, keying, or plugging into a larger one mid-
connection — like a connector snapping into a socket, or a smaller ID tag
latching onto a larger record card.

Allow one calibrated amount of dimensionality: a very soft, tight inner
shadow along the notch edge where the cyan chip meets the white shape (as
if the chip sits slightly recessed/seated into the notch), and a faint
soft outward glow around the cyan chip only, like a small illuminated
indicator LED on matte equipment. Everything else — the tile, the white
shape — stays completely flat and matte: zero gradient, zero glow, zero
texture anywhere else.

Style keywords: precision engineering hardware detail (a docking
connector, a relay switch, an indicator LED on a control panel),
Attio/Linear-adjacent restraint, asymmetric and confident rather than
centered and generic, distinct from typical rotated-diamond or gemstone
SaaS monograms.

Do not include: any wordmark or lettering, robots, antennae, chat bubbles,
funnel or bar-chart iconography, purple or violet tones, neon glow,
glass/frosted panels, thin hairline strokes that vanish at small size, a
perfectly centered symmetric composition, a diamond or gemstone shape of
any kind, more than one accent color.

This is a concept exploration to guide a hand-vectorized production SVG —
keep edges clean and simplifiable. Deliver as a single square icon,
legible from 512×512 down to 16×16, exactly three tones: #0A0A0A, #FAFAFA,
#22D3EE.
```

---

## 10. OG Image Design Brief (rewritten)

### Layout: Dark band authority + Dock Mark + Never Sleeps signal

Full `#0a0a0a` field, white/gray type, the Dock Mark inverted, paired with a live-feeling cyan status line tying directly to the Never Sleeps idea rather than a generic "always on" claim.

### Generation prompt (V3 — rewritten)

```text
Design a 1200×630 pixel horizontal Open Graph / social-share card
background and brand-mark composition for a B2B SaaS product — flat
modern digital design, NOT a photograph, NOT a 3D render,
Attio/Linear/Stripe-adjacent visual language: precise, high-contrast,
quietly confident.

Background: full-bleed near-black #0A0A0A, completely flat, with an
extremely subtle fine dot-grid texture (small light dots at very low
opacity, ~16px spacing), barely visible. Safe margin of at least 60px on
all sides.

Left-of-center: the brand mark at large scale (roughly 140–180px tall) —
a rounded-square tile filled near-white #FAFAFA (inverted for the dark
background), containing a smaller rounded-square shape in near-black, with
one small bright cyan-teal #22D3EE chip docking into a notch at its
bottom-right corner, slightly overlapping the shape's edge, with a faint
soft glow around the cyan chip only — same construction as the favicon,
inverted in tone for a dark background.

To the right of the mark, leave clear, generously spaced room for two
lines of type that will be added afterward in real vector type — do not
attempt to render final, precise marketing copy yourself. Instead, place
two simple rectangular placeholder bars in near-white #FAFAFA at roughly
70% and 40% opacity, sized and positioned like a large headline and a
smaller subheadline beneath it, purely as a compositional/layout guide,
not as actual legible text.

Include exactly one small live-status detail near the lower placeholder
bar: a tiny solid cyan-teal #22D3EE dot with the faint suggestion of one
soft outward pulse ring (a single frozen animation frame), implying real,
live, round-the-clock agent activity. This dot and the mark's cyan chip
are the only colored elements in the entire canvas — everything else
stays strictly black, white, and gray.

Do not include: any actual legible words or wordmark rendered by you,
purple/violet gradients, neural-network or brain graphics, stock photos of
people, illegible tiny UI screenshots, multiple competing focal points, QR
codes, app-store badges, busy footers, watermarks, glass/neumorphic
panels, warm-earth or gold tones (belongs to an unrelated sibling brand —
keep this strictly cool neutral plus the single cyan accent).

Overall mood: dark, precise, capable, quietly always-on.
```

**WeChat square variant (500×500):** center the Dock Mark alone at ~55% of canvas width, "Agent CRM" as one placeholder bar beneath it, drop the dot-grid texture and live-dot detail — same rule V2 already had.

---

## Appendix A–D

Unchanged — copy bank, file map. Appendix C: mark is now "Dock Mark, asymmetric, cyan authorship accent extended to the favicon." Appendix D checklist adds: "mark is asymmetric, not a rotated diamond/gem" and "`--color-agent-bright` appears exactly once, at the docking chip."

## Appendix E — Generic-AI-SaaS sniff test (unchanged, still the right question)

Cover the logo/wordmark — can this still be told apart from any other 2026 AI SaaS landing page screenshot? If not, check whether the render kept the asymmetric dock/notch and the cyan chip, or collapsed back into a plain symmetric shape. This outranks "does it look nice."
```

两处遗留问题,不藏着:1)`icon.svg` 现有分发成本我没法替你判断,§8.5 给了低成本备选,你比我更知道值不值得换概念。2)这轮我按你的要求只交付 MD——但真要解决"图丑",比再迭代一轮 prompt 更靠谱的路径,是我现在直接手写这两枚 mark 的生产级 SVG(精确路径,不靠运气)。如果想要,说一声就做。

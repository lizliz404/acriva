# Acriva Branding

**产品中文名：** 融销通  
**英文主品牌：** Acriva  
**市场双名：** Acriva（融销通）  
**Live：** https://acriva.lizliz.xyz  
**设计源：** `docs/DESIGN.md`（气质 / 色 / 字 / 成交）← **先读它**  
**本文职责：** 命名资产、标志几何、导出规格、生产 SVG 描述、（可选）生图 prompt  
**非职责：** 再发明一套冷灰 Linear 徽章美学

---

## 0. 和 DESIGN.md 的关系

| 文件 | 说了算的事 |
|---|---|
| `DESIGN.md` | 用户是谁、怎么成交、色板、字体、版式、组件、landing 叙事 |
| `branding.md`（本文） | 名字为什么叫 Acriva、mark 画什么几何、文件导出、禁止元素 |

**冲突时：** DESIGN.md 的色与气质优先。本文旧 V1/V2 冷青灰方案 **作废**。

---

## 1. 命名（保留结论，压缩过程）

| 角色 | 名 | 读音 / 配对 |
|---|---|---|
| **主品牌** | **Acriva** | uh-CREE-vuh · 阿克里瓦 |
| **市场名** | **融销通** | 融=资 · 销=货 · 通=专家与信息跑通 |
| Backup A | Tiltha | 仅域名/商标绝境 |
| Backup B | Hectara | 仅绝境 |

### 词源（对内）

- *acre*：地亩经营单位，不说 “farm app”  
- *viva*：活着、转得动——季节里信贷、出货、问诊不断档  

### 对外怎么说（不要背词源作文）

| 场景 | 说法 |
|---|---|
| 3 秒电梯 | 农户一张经营台：借得到、卖得出、问得着 |
| 对银行 | 农贷申请、联合匹配、审批留痕与经营数据同台 |
| 对买家 | 产地货盘与需求对接，状态清楚 |
| 对专家 | 知识、问答、预约一条队列 |

**禁止对外主句：** “Capital, commerce, and counsel” 当唯一英雄文案（可作英文小类别标签）。

### Taglines

| Lang | Primary | Alt |
|---|---|---|
| **ZH** | 钱、货、技术，一张台子办成 | 借得到 · 卖得出 · 问得着 |
| **ZH short** | 农产品融销一体经营台 | 融销通 |
| **EN** | One desk to fund, sell, and get counsel. | The grower’s operating desk. |
| **EN short** | Fund. Sell. Ask. | Acre to outcome. |

Category：`grower operating desk` / 农产品融销经营台  

---

## 2. 颜色（品牌应用层 — 与 DESIGN 对齐）

| Token | Hex | Brand use |
|---|---|---|
| Soil | `#1C1712` | Mark tile、主墨、深色带 |
| Rice | `#F7F0E4` | 浅底、OG 底 |
| Cream | `#FFFBF4` | 卡片 |
| Husk | `#E8DFD0` | 线 |
| Jade | `#0F4D35` | 主 CTA、正向状态 |
| Gold | `#C9892E` | **唯一高光** — mark 印心、金额、稀有强调 |
| Seal | `#B33A2B` | 错误/驳回 × **mark 田字网格印色**（只在 mark 图形本身，不铺背景/按钮） |

**已废弃品牌主色：** `#0A0A0A` 冷黑、`#0F766E` 冷青、`#FAFAFA` 冷灰纸、亮草绿 `#22C55E`。

---

## 3. Logo system — 「田字格印」（终局方向）

### 3.1 为什么杀掉 Triad 细线 A / Seal A 字母（V1–V2）

| 问题 | 说明 |
|---|---|
| 「字母+顶角色块」太通用 | Fiverr/99designs 最常见模板，模型一提示就收敛到这 |
| 无印泥红 | 「印」的识别力 95% 来自那一抹红；cream A 没有章感 |
| 故事靠说明文 | 田字格自带农田 + 台账格双关，字母 A 没有 |

### 3.2 概念（给设计师 / 手写 SVG 的人）

**名字：** 田字格印（field-grid seal）  
**一句话：** 深土色圆角方印上，一块朱红实心田字网格（2×2），顶点一颗金印心——经营台敢盖下去的章。

几何锁定：

1. **外框：** 圆角方印，rx ≈ 22% 边长，fill `Soil`。这是印章，不是细线 app glyph。  
2. **田字网格 — 实心块面，不是 stroke：**  
   - 粗体 2×2 网格（外框四边 + 十字），fill `Seal #B33A2B`。  
   - 允许边缘极轻微手刻不均（线宽略不均、一两处软墨晕）——唯一允许的非绝对扁平细节。  
   - 极浅凹刻阴影沿网格线，暗示刻入印面。  
3. **金印心：** 落在网格**顶部交叉点**，实心方点 `Gold #C9892E`，边长约为 tile 的 10%。**这是抓眼的唯一高光。**  
4. **光学：** 网格大致居中；金点不要做成叶子/菱形闪光。

**16×16 规则：** 必须保留 **方印剪影 + 红色田字格 + 金点**。

**Forbidden in mark：** 麦穗、叶子、谷粒、拖拉机、握手、地球、电路、渐变、3D、双色渐变字、中文、书法体、描金礼盒边框、卷轴/丝带。Seal 红**不得**铺成大面积背景或按钮色。

### 3.3 备选（仅迁移成本过高时）

保留现有 A 字形，仅把填色改为 soil 底 + **seal 红**字 + gold 点。辨识度不如田字格。

### 3.4 Lockups

| 类型 | 结构 |
|---|---|
| **App / favicon** | 田字格印 only |
| **横式** | Mark + 字距 0.5×cap · Wordmark `Acriva` |
| **双名横式** | Mark + Acriva + 小号 `融销通`（clay） |
| **竖式 CN 市场** | Mark / Acriva / 融销通 三行，用于海报导视 |

Wordmark：IBM Plex Sans 600–700，`Soil`，EN tracking `-0.02em`～`-0.03em`。不要脚本字、不要渐变字。

---

## 4. 生产 SVG 规格（工程师直接画，优先于 AI 位图）

### 4.1 `public/icon.svg` — 32 viewBox

```
viewBox="0 0 32 32"
- rect 0,0 32×32 rx=7 fill #1C1712
- 田 grid fill #B33A2B: outer frame bars + center cross
  - bar thickness ~3.2–3.6; slight organic edge irregularity OK
  - optional soft recess shadow under grid (opacity ~0.28)
- Apex gold square: ~3.2×3.2 at top intersection, fill #C9892E, rx≈0.45
```

### 4.2 `public/logo.svg`

- 左：32×32 mark（内嵌与 icon 相同）  
- 右：`Acriva` 文本或 outlined path，x≈40，y baseline 光学居中  
- 可选：`融销通` 在 Acriva 下 10px，font-size ~9，fill `#6F6558`

### 4.3 导出清单

| Asset | Size | 笔记 |
|---|---|---|
| `icon.svg` | 32 master | favicon + PWA 源 |
| `favicon.ico` | 16/32 multi | 从 SVG 栅格；勿留 Next/默认 ico |
| Apple touch | 180 | 系统会蒙圆角 |
| PWA | 192, 512 | 同 mark |
| `og-image` | 1200×630 | 见下构图 |
| `logo.svg` | lockup | Nav / 页脚 |

### 4.4 OG 1200×630 构图

- 底：`#F7F0E4`  
- 顶一条 1px `#E8DFD0`  
- 左：大田字格印（≥160px）  
- 中：Acriva 大字 + 下「融销通」  
- 右或下：一行结果句 **借得到 · 卖得出 · 问得着**  
- 不要塞产品截图四拼盘除非 hi-fi 已稳  

---

## 5. 生图 prompt（仅探索；生产以 SVG 为准）

> AI 位图 **不得** 直接当 favicon 上线。用于 mood / 汇报可以；终态手写 SVG。

### 5.1 Mark only（主推）

```text
Single subject: premium app icon mark for Chinese agribusiness brand "Acriva / 融销通" (grower desk: credit + sell crop + expert help).

Make it CAPTIVATING — solid stamp energy, not a thin SaaS line-monogram.

Geometry:
- Rounded-square seal tile, corner radius ~22%, fill deep soil #1C1712
- Inside: a HEAVY solid capital A in bone #F7F0E4 (filled shapes, NOT strokes, NOT outlined wire A)
- Wide stable legs, strong crossbar, clean triangular counterhole
- Apex: small solid square "seal heart" in harvest gold #C9892E (the only bright accent)
- Optical center true, orthographic front, huge padding on #F7F0E4 studio field
- Must read at 16px as a dark seal with light A and gold tip

Mood: thick, prosperous, trustworthy operator stamp a co-op boss and a rural bank officer both respect. Not cute farm. Not cold fintech teal. Not VC-deck minimal hairline.

Style: Swiss geometry + Chinese chop/seal gravity. Flat vector, razor edges.

Negative: wheat, grain, leaf, seedling, tractor, barn, handshake, coin stack, globe, neural net, stroke-only monogram, thin lines, teal, cyan, neon, glassmorphism, gradient type, 3D bevel, soft blur, mascot, photoreal farm, multiple icons, wordmark text, Chinese characters inside the tile
```

### 5.2 Wordmark only

```text
Wordmark only: "Acriva". No icon.
IBM Plex Sans / similar grotesque, weight 650, slight negative tracking, fill #1C1712 on #F7F0E4.
Quiet institutional confidence — bank + co-op shelf, not crypto, not rustic script.
Centered, huge margins, vector crisp.
Negative: icons, wheat, slogans, Chinese in this render, gradients, shadows, mockups
```

### 5.3 OG card

```text
Open Graph 1200x630 brand card, warm rice paper #F7F0E4.
Left: soil #1C1712 rounded seal with solid bone A and gold #C9892E apex square.
Beside: "Acriva" heavy grotesque #1C1712; under it "融销通" muted clay.
Right: one Chinese outcome line only — 借得到 · 卖得出 · 问得着 — large, confident, not tiny footer.
Hairline top rule #E8DFD0. Lots of air. No screenshots, no wheat, no teal.
```

---

## 6. Voice（品牌话术短表）

完整成交话术见 `DESIGN.md` §1 / §9。

- **Do：** 季节、金额、批次、过审、上架、回款、预约、留痕  
- **Don't：** 赋能、数字化转型、revolutionize、绿色童话  
- 主用户称谓：老板 / 合作社 / 种植户（看场景），少用文艺腔 “grower” 硬译堆砌  
- 英文界面可保留 grower desk 类别词  

---

## 7. 工程落点

| 文件 | 内容 |
|---|---|
| `docs/DESIGN.md` | 源：色字版式成交 |
| `docs/branding.md` | 本文 |
| `public/icon.svg` | 田字格印 |
| `public/logo.svg` | lockup |
| `public/favicon.ico` | 栅格 |
| `src/styles.css` | token |
| `src/lib/data.ts` | name / tagline / 模块文案 |
| `src/routes/__root.tsx` | title / theme-color / icons |

---

## 8. 历史与作废声明

| 版本 | 状态 |
|---|---|
| 命名 shortlist / 域名粗查（2026-07-20） | 保留作档案，见 git 历史 |
| V1 Triad stroke-A + teal apex | **作废** |
| V2 精密 prompt 仍 stroke-A / Seal A cream | **作废** |
| V3 田字格印 + soil/seal/gold + DESIGN.md | **当前** |

---

## 9. 验收

- [ ] Tab favicon：深色方印 + 朱红田字格 + 金点，一眼有印感  
- [ ] 红读作合同章/发票章，不是礼盒烫金  
- [ ] 任何页面不出现品牌级冷青 `#0F766E`  
- [ ] 双名锁在 nav：Acriva + 融销通  
- [ ] 对外主句是结果句，不是英文三词排比唯一英雄  
- [ ] 设计师/agent 改视觉前先读 `DESIGN.md`  

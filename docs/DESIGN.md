---
version: 1.0
name: Acriva / 融销通
updated: 2026-07-21
status: source of truth for visual + conversion design
audience_primary: 中国农业经营主体 / 土老板 / 合作社负责人
audience_secondary: 农商行信贷岗 · 产地买家 · 农技专家
anti_audience_skin: Silicon Valley Linear/Stripe clone for SF operators
---

# Acriva Design System

> **一句话：** 融销通要长得像「能办事的厚实经营台」，不像「又一个冷静的 B2B SaaS」。
>
> 本文件先于图标、landing 文案、token 改色。实现必须以本文为准；`branding.md` 管命名/标志几何/资产清单；本文管气质、色、字、版式、组件语法、成交路径。

---

## 0. 为什么上一版死了

| 症状 | 根因 |
|---|---|
| Favicon / mark 没张力、不抓眼 | 在画「精密细线 monogram」，不是在画「印章级记忆点」 |
| 主色不对 | `#0A0A0A + #0F766E` = 冷门 fintech / Linear 货架色，土老板读成「洋气软件」不是「能赚钱的台子」 |
| 页面像功能说明书 | 资料只写了模块能力，没有 **痛 → 结果 → 怎么信 → 怎么点** |
| 调性 SF | Attio/Linear 结构可借，**皮肤与话术不可原样贴**；买家不是 AI-native CRM 用户 |
| Branding V2 仍垃圾 | Prompt 再精密，如果世界观是「抽象徽章」，模型只会吐出干净但没欲的 badge |

**杀法：** 先定人、定成交、定气质与色板；再定 mark；再改 CSS / landing / app chrome。

---

## 1. 人与成交（Design 的第一约束）

### 1.1 主用户不是「farmer persona 幻灯片」

主用户是 **土老板**：

- 地里 / 棚里 / 合作社里真的在扛季节现金流
- 微信重度，嫌流程多，怕被骗，认「熟人和结果」
- 会用互联网 / SaaS，但 **不为设计品味付费**，为「借得到、卖得出、出事有人答」付费
- 对「绿色麦穗 + 卡通大地」反感（土且业余）；对「全英文冷灰 SaaS」也反感（洋且不贴心）

次用户：

- **银行/农商行：** 要可控、可审、可留痕 → 界面要像工作台不是营销站
- **买家：** 要货真、有量、能联系 → 列表密度与状态清楚
- **专家：** 要队列清楚、预约不扯皮

### 1.2 成交机制（不是 feature list）

土老板成交靠四步，landing / hero / CTA 必须顺着走：

1. **戳痛（3 秒）**  
   钱卡在季节前 · 货压在手里 · 病虫害没人及时答  
2. **给结果（不是模块名）**  
   **借得到 · 卖得出 · 问得着**（融 / 销 / 通）  
3. **给证据**  
   状态机可见（申请中/通过/上架/已联系/已预约）、金额/批次/时间、角色分席  
4. **给低摩擦动作**  
   主 CTA：**进经营台**；次 CTA：**先看怎么贷** / **有货上架**  
   禁止空洞 “Learn more” / “Start free trial” 当唯一主按钮

### 1.3 信任语法

| 加分 | 减分 |
|---|---|
| 具体作物、产区、金额量级、状态词 | 抽象 “operating system / capital commerce counsel” 当唯一英雄文案 |
| 银行席、合作社、批次号、留痕 | 假 SF 公司名堆砌当唯一社会证明 |
| 中文优先的市场表面 | 中文只当 footer 装饰 |
| 重、稳、一钉一铆的按钮 | 细线幽灵按钮当主 CTA |
| 一个主行动 | 六个同级 feature 卡片抢注意力 |

---

## 2. 品牌气质（Visual personality）

### 2.1 四个词

**厚实 · 利落 · 有钱色 · 能办事**

- **厚实：** 色有温度，字有重量，圆角偏稳，阴影像纸和木，不像玻璃
- **利落：** 不堆麦穗、不堆插画农场、不堆 dashboard 假大数
- **有钱色：** 允许「金/铜」作为欲望与收获的点睛（克制使用），不是土味描金大字报
- **能办事：** 每个主要区块结束在动作或状态，不在形容词

### 2.2 明确不是

| 禁止气质 | 为什么 |
|---|---|
| Linear / Stripe Atlas 冷灰极简原教旨 | 给工程师与 VC 的货架，不是土老板的台子 |
| 绿色麦穗 / 拖拉机 / 丰收插画 slop | 土且廉价，像地方站或补贴项目页 |
| 暗色紫渐变 AI SaaS | 品类错位 |
| 政府红头 / 大泥金暴发户 | 过土或过俗，失去 B2B 对手方（银行）信任 |
| 细线空心 monogram 无块面 | 16px 死、远看无记忆、无性张力 |

### 2.3 「性张力」在本品牌里的工程定义

不是擦边。指视觉上的 **抓取力**：

1. **块面 > 线：** mark 与关键 UI 用实心几何，不用 hairline 撑门面  
2. **冷暖对撞：** 深土色底 × 暖金点睛 × 玉石绿行动色  
3. **字号敢大：** 中文英雄句要有海报级重量，不是 14px 说明书  
4. **一个高光：** 每屏最多一个金色/强调焦点（CTA、关键金额、apex）  
5. **余白有呼吸但不发虚：** 疏是为了衬托重，不是为了抄 Linear 空白病

---

## 3. Color system

### 3.1 主 token（必须进 `styles.css` `@theme`）

| Token | Hex | 角色 |
|---|---|---|
| `--color-soil` | `#1C1712` | 主墨、主按钮、深色带、mark 底。深土，不是冷黑 `#0A0A0A` |
| `--color-soil-soft` | `#2A241C` | hover / 次级深面 |
| `--color-rice` | `#F7F0E4` | 页面默认底（米纸/骨色） |
| `--color-cream` | `#FFFBF4` | 卡片、弹层、window 浅面 |
| `--color-husk` | `#E8DFD0` | 边框、分割、输入框线 |
| `--color-husk-strong` | `#D4C7B0` | 强分割、hover border |
| `--color-clay` | `#6F6558` | 次级正文、说明 |
| `--color-clay-deep` | `#4A433A` | 次强调正文 |
| `--color-jade` | `#0F4D35` | **主行动绿**（钱/地/过审的「成色」）— 深玉，不是亮草绿 |
| `--color-jade-soft` | `#E3F0E8` | 成功底、tag 底 |
| `--color-gold` | `#C9892E` | **欲望/收获点睛** — mark apex、关键金额、稀有强调 |
| `--color-gold-soft` | `#F5E6C8` | 金色浅底 |
| `--color-seal` | `#B33A2B` | 危险/驳回/紧急 — 印泥红，克制 |
| `--color-info` | `#2F5D7C` | 信息/链接蓝，偏墨青，少用 |

### 3.2 使用法则

```
底：rice 大面积
字：soil 主文 / clay 辅文
结构线：husk
主按钮：jade 底 + cream 字  或  soil 底 + rice 字（二选一体系，全站统一）
【默认主 CTA = jade】—— 更「能成事 / 有钱色」；soil 作次强/反色带按钮
点睛：gold 只出现在 mark 顶点、金额、关键状态、极少数标题装饰线
禁止：把 gold 铺成大背景；禁止亮草绿 #22C55E 当品牌主色；禁止冷青 #0F766E 回归
```

### 3.3 与旧 token 映射（迁移）

| 旧 | 新 |
|---|---|
| `ink #0A0A0A` | `soil #1C1712` |
| `paper #FAFAFA` | `rice #F7F0E4` |
| `paper-2 #F4F4F5` | `cream #FFFBF4` / 浅面 |
| `line #E5E5E5` | `husk #E8DFD0` |
| `mute #737373` | `clay #6F6558` |
| accent teal `#0F766E` | **删除品牌地位** → `jade #0F4D35` + `gold #C9892E` |
| `field #1A7A4C` | 收敛进 `jade` 系 |

### 3.4 深色带（landing 中段）

- 底：`soil` / `soil-soft`
- 字：`rice`
- 强调：`gold` 细线或小数点缀
- 成功态：`jade-soft` 文字用更亮的 jade tint `#7BC4A0`（仅 dark section）

---

## 4. Typography

### 4.1 字体栈（对齐 `_templates/design/typography.md`）

| 角色 | 栈 |
|---|---|
| **Display / 英雄中文+英文** | `"IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif` |
| **Body / UI** | 同上（单一 sans 体系，降低土老板阅读摩擦） |
| **数据 / 单号 / 金额** | `"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace` |
| **禁止主声** | Inter Tight 作为品牌主声（可留 fallback）；禁止脚本体、书法体装饰 logo |

**为何 IBM Plex 不是 Inter：** Inter/Inter Tight 把站重新拖回模板 SaaS 泥地。Plex 更「机构/台账/可信任」，和融销场景同构。

加载：Google Fonts `IBM+Plex+Sans:wght@400;500;600;700` + `IBM+Plex+Mono:wght@400;500` + `Noto+Sans+SC:wght@400;500;700`（或 subset 策略）。

### 4.2 尺度（偏海报，不发虚）

| Class | Size | Weight | Tracking | 用途 |
|---|---|---|---|---|
| `text-hero` | `clamp(2.75rem, 7vw, 4.75rem)` | 700 | `-0.03em` EN / `0` 近中文 | 英雄句，中文优先可两行内 |
| `text-section` | `clamp(1.85rem, 3.8vw, 2.75rem)` | 650–700 | `-0.02em` | 区块标题 |
| `text-subsection` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | `-0.01em` | 卡题 |
| `text-body` | `1.0625rem` | 400 | 0 | 说明，行高 1.65 |
| `text-eyebrow` | `0.75rem` | 600 | `0.08em` | 上眉，可中文不全大写 |
| `text-num` | tabular mono | 500 | 0 | 金额、批次、时间 |

中文英雄句示例权重：宁可少字号大，不要长句挤小。

### 4.3 中英层级（市场表面）

- **默认 `lang`：** 市场 landing 以中文为主叙事，英文品牌名 Acriva 作主名/角标  
- Hero 推荐结构：  
  - eyebrow：`融销通 · Acriva`  
  - H1：**钱、货、技术，一张台子办成**（或等价痛点句）  
  - sub：一句结果句，不解释架构  
  - EN category 可作小字，不可抢 H1  

App 内 UI 可中英并存；**专有名词**保持模块稳定：Finance / Market / Expert。

---

## 5. Layout & rhythm

### 5.1 栅格

- 内容最大宽：`1120–1200px`
- 左右 padding：`20–32px`
- 区块纵向：`88–128px`（比旧 Linear 克隆略紧一点，土老板怕「空」）
- 卡片网格：2 列优先讲「融/销」对照；三列用于三结果，不要六列 feature 墙

### 5.2 Landing 叙事顺序（强制）

1. **Nav** — 左 mark+双名；右：功能锚点 + 主 CTA「进经营台」  
2. **Hero** — 痛/结果句 + 双 CTA + **活的产品拼贴**（融资条 / 货盘 / 专家预约，三窗或等价）  
3. **信任条** — 不是空洞 logo 墙优先；改「谁在一台子上」：农户席 · 银行席 · 买家席 · 专家席 + 一句机制  
4. **三结果** — 借得到 / 卖得出 / 问得着（每块：场景一句 + 状态 UI + 入口）  
5. **一张台怎么转** — 深色带：季节故事（备耕贷 → 上架 → 问诊 → 回款），时间情景化，不讲架构图  
6. **对手方故事** — 合作社 / 农商行 / 采购，各一条可验证的结果句  
7. **Final CTA** — 重复英雄承诺 + 进经营台  
8. **Footer** — 双名、模块、合规轻量

保留可交互 mock（idle + hover + click）。去掉装饰性顶部 promo 黑条。

### 5.3 App shell

- 浅 `rice` 底，侧栏/顶栏 `cream`，活跃项 `jade` 指示条或 `gold` 极细点  
- 表格密度中等偏高（经营台），不要营销站大留白  
- 状态色：通过/上架=`jade`；待审/待付=`gold`；驳回/逾期=`seal`；信息=`info`

---

## 6. Shape, depth, motion

### 6.1 圆角

| Token | Value | 用途 |
|---|---|---|
| `--radius-btn` | `12px` | 按钮（稳，不全 pill 幼稚） |
| `--radius-card` | `16px` | 卡片 |
| `--radius-window` | `18px` | 产品窗 |
| `--radius-mark` | `22%` of size | App icon 外轮廓 |

主 CTA **不要**默认 999px pill（Lead Radar 那套偏编辑部）；融销要「章/台」感 → 12–14px 更稳。次要 chip 可用 pill。

### 6.2 阴影

- 软纸影：`0 1px 2px rgba(28,23,18,.04), 0 10px 28px rgba(28,23,18,.06)`
- 窗口：`0 0 0 1px rgba(28,23,18,.06), 0 18px 50px rgba(28,23,18,.12)`
- 禁止：重霓虹、大 blur 玻璃、彩色 glow

### 6.3 Motion

- 时长：`150–220ms` UI；hero mock 循环 `2–2.4s`
- Mock 必须：idle 数据流动 + hover 抬起 + click 反馈  
- `prefers-reduced-motion: reduce` 时停循环，保留静态终态

---

## 7. Components（语法）

### 7.1 Buttons

| 变体 | 视觉 | 何时 |
|---|---|---|
| **Primary** | `bg-jade text-cream`，hover `jade` 加亮 4–6% | 进经营台、提交申请、确认预约、上架 |
| **Strong** | `bg-soil text-rice` | 深色带上的主按钮；或需要「压得住」的场合 |
| **Secondary** | `bg-cream border-husk text-soil` | 次动作 |
| **Ghost** | 透明 + clay 字 | 三级 |
| **Gold rare** | `bg-gold text-soil` | 极少：关键金额确认、收获向节日运营（默认不用） |

主按钮文案动词优先：**进经营台 / 去申请 / 上架这批货 / 确认预约 / 通过**。

### 7.2 Cards & windows

- 卡片：`cream` 底 + `husk` 边 + 软纸影  
- WindowChrome：浅窗默认；深窗用 `soil`，用于「问专家 / 夜间队列」等对比  
- 内部密度：12–14px 字号体系，状态 badge 用实心浅底

### 7.3 Badges

- 成功：`jade-soft` + 深 jade 字  
- 进行：`gold-soft` + 深土字  
- 危险：浅 seal 底 + seal 字  
- 中性：husk 底 + clay 字  

### 7.4 Forms

- 高对比标签（soil）  
- 输入框 `cream` 底、`husk` 边、focus `jade` ring 2px  
- 错误：seal 边 + 文案  
- 金额右对齐 mono  

---

## 8. Mark & logo（设计约束；几何细节见 branding.md）

### 8.1 必须具备的张力

1. **远看是块印章**，不是细线三角架  
2. **近看能读出 A 或「田/台」结构**  
3. **16px 仍是实心剪影**（允许丢细节，不允许变蛛网）  
4. **一点金**（apex / 印心）= viva / 成色 / 活的经营  
5. 禁止：麦穗、叶子、握手、地球、神经网络、渐变字  

### 8.2 色彩在 mark 上

- 浅底场景：tile = `soil`，图形 = `rice`，apex = `gold`  
- 深底场景：tile = `rice` 或透明，图形 = `soil`，apex = `gold`  
- App icon 主推：soil tile + 实心负形/实心笔画 + gold 点  

### 8.3 Wordmark

- 「Acriva」Plex Sans 600–700，略负 tracking  
- 中文市场锁：右或下「融销通」`clay` / 较小级  
- 不要把中文塞进 favicon  

---

## 9. Copy tone（设计相关的话术）

| Do | Don't |
|---|---|
| 钱、货、季节、过审、上架、回款、问诊 | revolutionize / unlock / supercharge |
| 借得到、卖得出、问得着 | Capital. Commerce. Counsel. 当唯一英雄 |
| 一笔、一批、一席、留下痕 | 赋能农户数字化转型 |
| 短句、动词开头 | 长定语从句堆模块名 |

完整 voice 扩展可写在 branding；**hero 级句子必须先过本节**。

---

## 10. Do / Don't 总表

**Do**

- 先色板与成交路径，再画图标  
- 米纸底 + 深土字 + 玉石绿 CTA + 一点金  
- 中文英雄句大字  
- 产品窗讲「申请/货盘/预约」真状态  
- 主 CTA 永远指向经营动作  

**Don't**

- 回到冷灰 Inter + teal  
- 细线空心 A 当终局 mark  
- 麦穗 greenery slop  
- 六张同构 feature 卡 + 英文jargon hero  
- 只有功能介绍没有「为什么现在要点」  

---

## 11. 实现清单（给工程 / agent）

按序执行，勿跳步：

1. 落地本文件为 `docs/DESIGN.md`（已完成则跳过）  
2. 重写 `docs/branding.md`：命名可保留 Acriva；**标志改为块面印章逻辑**；删除冷灰 teal 主色；重写生图 prompt  
3. `src/styles.css`：替换 `@theme` 色、字体、radius、shadow、btn/card 组件类  
4. `public/icon.svg` + `logo.svg`：按 branding 新几何重画（SVG 手写，不依赖 AI 糊图当生产资产）  
5. `src/lib/data.ts`：tagline/description/tabs 中文结果导向  
6. Landing 组件：Hero / Navbar / LogoCloud / Platform* / DarkFeature / FeatureCards / FinalCTA / Footer — 换 token、换文案层级、保持 mock 可交互  
7. `__root.tsx`：`lang` 策略、theme-color=`#F7F0E4`、og 色与标题  
8. App shell（`src/components/app/*`、`ui.tsx`）：同步 token，避免 landing 一套 app 一套  
9. 提交前目测：hero 3 秒能否读出「这台子帮我搞钱/货/人」；favicon 在 tab 上是否一块金点印章  

### 验收（Liz 标准）

- [ ] 不再像 Linear 换皮农业  
- [ ] 主色第一眼是暖纸 + 深土 + 深绿，不是冷灰 + 青  
- [ ] Mark 有块面与金点，16px 可辨  
- [ ] Hero 中文痛/结果句 + 强 CTA  
- [ ] Mock 仍 idle/hover/click  
- [ ] 银行/土老板双方都不会觉得「这是玩具站」  

---

## 12. 参考锚点（气质，不是像素）

| 可借 | 借什么 | 不借 |
|---|---|---|
| 优质农商行 / 正规供应链金融落地页 | 信任、流程、状态词 | 公文排版、国徽风 |
| 丁香园 / 部分严肃产业站 | 信息密度与专业 | 医疗绿 |
| Attio 产品 demo 密度 | 多窗 mock、tab 分镜 | 冷黑促销条、SF 文案 |
| Lead Radar DESIGN | 文档结构、token 写法 | 编辑部大圆角 pill 主按钮、冷橙主强调 |

**最终裁判：** 土老板会不会觉得「这帮人懂我的季节和账」——懂，就继续；只觉得「又一个好看模板」，就砍回本节重来。

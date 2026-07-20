# Acriva / 融销通 docs

> 工程目录仍叫 `fieldwise`；英文主品牌 **Acriva**，中文市场名 **融销通**。详见 `branding.md`。

## Contents

| File | What |
|---|---|
| `prd-rongxiaotong.md` | **完整教纲简介 + 三模块 + 角色**（以本文为准） |
| `architecture-rongxiaotong.mmd` | **完整业务架构 mermaid**（Finance / Ecommerce / Tech） |
| `domain-rongxiaotong.md` | 三模块领域模型与路由目标 |
| `domain-backend.md` | Tech 模块 D1/状态机细节 |
| `prd-source.md` | 早期截断材料（仅 Tech 片段） |
| `architecture.mmd` | 早期 Tech-only 图 |
| `branding.md` | **命名短名单 + logo 策略 + image prompts（定稿 Acriva）** |
| `README.md` | 本索引 |

## Modules

1. **Finance** — `/app/finance`, `/app/finance/bank`
2. **Market** — `/app/market`, `/app/market/sell`
3. **Expert** — `/app/knowledge`, `/app/ask`, `/app/book`, `/app/expert`

## Local

```bash
npm run db:migrate
npm run dev
```

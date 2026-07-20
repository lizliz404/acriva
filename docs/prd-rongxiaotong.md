# 融销通 — 源材料（完整版）

> 项目全称：基于数字经济的农产品融销一体平台（简称 **融销通**）  
> 工程目录暂用：`/home/ubuntu/projects/fieldwise`（可后续 rename）  
> 栈决策（本仓库）：TanStack Start + Cloudflare Workers + D1（原教纲 SpringBoot+Vue 改为 CF 练手路径）

## 项目简介（原文整理）

尽管我国农产品交易逐步向数字化方向转型，但传统单边市场模式仍占较大比重，导致市场效率不足、产销对接不畅。近年来，受经济形势、极端天气等不确定因素影响，农产品滞销、价格波动等问题更加突出。同时，农户普遍面临融资难、贷款流程繁琐、抗风险能力弱等挑战，制约了农业产业的可持续发展。

在此背景下，“基于数字经济的农产品融销一体平台”（简称“融销通”）应运而生：深度融合数字技术与农业经济，整合供应链金融、电商销售、智慧农业等服务，构建 **「融资 + 销售 + 服务」** 一体化生态，助力农户应对市场风险，提升经营效益。

平台采用 B/S 架构。教纲技术为 SpringBoot + Vue 前后端分离；本仓库实践路径为 **TanStack Start + CF Workers + D1**。针对农业金融市场小额融资难、产品销售同质化等问题，以融资为基础搭建平台，接入合作方信息透明共享，在提供便捷融资的同时提供增值服务：

- 用户间交互、专家技术指导、个性化农业发展
- AI：农产品价格趋势（教纲：ARIMA）
- 农户：内容/特征推荐联合贷款人，提高贷款成功率
- 投资方/银行：多元化放贷渠道
- 目标：农户 · 银行/投资方 · 买家 三方共赢

## 项目特色（教纲）

- 行业背景真实：农产品融资 + 销售
- AI：ARIMA 价格预测；基于内容的联合融资人推荐
- 全流程：环境 → 模型 → 算法 → 部署（本仓库 AI 先做可运行启发式/可替换接口，避免伪深度）
- 业务分析训练：融销一体
- 原教纲 DevOps/CodeArts；本仓库用 git + wrangler + CF
- 可扩展：支付、物流、在线聊天等

## 角色

| 角色 | 英文 | 主路径 |
|---|---|---|
| 农户 | Farmer | 融资申请、联合贷匹配、商品上架、看需求、联系买家、知识/问答/预约 |
| 银行 | Bank | 智能匹配农户、融资审批、融资信息 |
| 买家 | Buyer | 浏览/购买商品、管理需求 |
| 技术专家 | Expert | 管理知识、问答处理、预约处理 |

## 三大模块（架构图节点）

### 1. 金融与融资 Finance

- Bank → MatchFarmer → Farmer
- Bank → FinApprove → FinInfo → ApplyFin
- Farmer → MatchJointLoan → ApplyFin

### 2. 农产品供需与交易 Ecommerce

- Farmer → ProdMgmt → Product → BuyProduct
- Buyer → BrowseProduct → BuyProduct
- Buyer → ManageDemand → BuyerDemand → ViewDemand
- Farmer → ViewDemand → ContactBuyer → Buyer

### 3. 农业技术与专家服务 TechSupport（已实现 MVP）

- Farmer → BrowseKnowledge / AskExpert / BookExpert
- Expert → ManageKnowledge / QAProcess / BookProcess
- Stores: Knowledge, QAMsg, BookInfo

## 完整 mermaid

见 `architecture-rongxiaotong.mmd`（样式尽量还原原图分类色）。

## 实现优先级（本仓库）

1. **P0 Tech** — 已完成 D1 + desk 双向流  
2. **P1 Finance** — 申请 / 审批状态机 + 联合贷匹配（内容相似启发式）  
3. **P1 Ecommerce** — 商品 CRUD / 浏览购买 / 买家需求 / 联系  
4. **P2 AI** — 价格序列 mock + ARIMA-lite 或移动平均接口；可替换真模型  
5. **P3** — 真鉴权、支付、物流、IM  

## 早期截断材料

此前只收到 TechSupport 片段，见 `prd-source.md` 旧文；以本文 + 完整图为准。

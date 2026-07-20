# Source brief (as provided)

> Stored as received from chat. The opening of the mermaid block was truncated in transit; reconstructed full diagram is in `architecture.mmd` / `README.md`.

## Product shape (inferred from node names + edges)

Vertical agricultural knowledge + expert operations platform:

**User downlink**
- BrowseKnowledge → Knowledge
- AskExpert → QAMsg
- BookExpert → BookInfo

**Expert uplink**
- ManageKnowledge → Knowledge
- QAProcess → QAMsg
- BookProcess → BookInfo

## Raw mermaid fragment (as pasted)

```mermaid
BrowseKnowledge -.-> Knowledge
        AskExpert -.-> QAMsg
        BookExpert -.-> BookInfo
        
        %% 专家上行链路
        Expert -.-> ManageKnowledge
        Expert -.-> QAProcess
        Expert -.-> BookProcess
        
        ManageKnowledge -.-> Knowledge
        QAProcess -.-> QAMsg
        BookProcess -.-> BookInfo
    end
```

## Intent notes from Liz (same message)

- Older-style vertical product; treat as practice / demo, not a big agri-SaaS bet
- Landing: replicate Agent CRM (`attio-replica`) structure/language, remap content from ecommerce/外贸 CRM → this domain
- Real app logic: industry best practices; backend on Cloudflare is fine
- Frontend stack preference: TanStack (Start) instead of Next.js when choosing
- Diagram text + image both matter; put under docs (README ok if no subfolder preference)

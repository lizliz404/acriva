import { useEffect, useState } from "react";
import { AuditTrailStrip, WindowChrome, Avatar } from "../ui";

/*
 * DESIGN.md §2.4 — anti–tea-gift-box (platform mocks):
 * Status/amount/time density, geometric UI. No calligraphy, ink-rubbing,
 * gilt frames, or zen-empty gift-box composition.
 */

export function PlatformMock({ tabId }: { tabId: string }) {
  if (tabId === "finance") {
    return (
      <WindowChrome title="融资申请" className="interactive-window">
        <div className="space-y-3 p-4 pb-8">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-medium text-[#1C1712]">备耕贷 · 东棚合作社</div>
            <span className="badge badge-warn">申请中</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="rounded-lg bg-[#F7F0E4] px-3 py-2 text-[#4A433A]">
              金额 <span className="text-num font-medium text-[#C9892E]">¥48万</span>
            </div>
            <div className="rounded-lg bg-[#F7F0E4] px-3 py-2 text-[#4A433A]">
              作物 · 番茄棚
            </div>
          </div>
          <div className="space-y-2">
            {[
              ["银行产品", "绿收农商 · 备耕贷", "可申"],
              ["联保匹配", "2 家相似主体", "待确认"],
              ["审批留痕", "材料齐全", "排队"],
            ].map(([t, m, s]) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-lg border border-[#E8DFD0] px-3 py-2.5 hover:border-[#D4C7B0]"
              >
                <div>
                  <div className="text-[13px] font-medium text-[#1C1712]">{t}</div>
                  <div className="text-[11px] text-[#6F6558]">{m}</div>
                </div>
                <span className="badge badge-neutral">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <AuditTrailStrip batch="#A-2607" time="14:32" operator="合作社-陈" />
      </WindowChrome>
    );
  }

  if (tabId === "market") {
    return (
      <WindowChrome title="货盘" className="interactive-window">
        <div className="grid gap-0 pb-6 sm:grid-cols-[140px_1fr]">
          <aside className="border-b border-[#E8DFD0] p-3 text-[12px] sm:border-b-0 sm:border-r">
            {["全部", "黄瓜", "番茄", "苹果", "水稻"].map((c, i) => (
              <div
                key={c}
                className={`rounded-md px-2 py-1.5 ${i === 1 ? "bg-[#0F4D35] text-[#FFFBF4]" : "text-[#4A433A] hover:bg-[#F7F0E4]"}`}
              >
                {c}
              </div>
            ))}
          </aside>
          <div className="space-y-2 p-3">
            {[
              ["黄瓜批次 C-0721", "2.4吨 · ¥3.2/斤 · 已联系"],
              ["番茄批次 T-0718", "1.1吨 · 待上架"],
              ["买家需求 · 苹果", "城鲜 · 要量 5 吨"],
            ].map(([t, m]) => (
              <div
                key={t}
                className="rounded-lg border border-[#E8DFD0] px-3 py-2.5 hover:border-[#D4C7B0] hover:shadow-sm"
              >
                <div className="text-[13px] font-medium text-[#1C1712]">{t}</div>
                <div className="text-[11px] text-[#6F6558]">{m}</div>
              </div>
            ))}
          </div>
        </div>
        <AuditTrailStrip batch="#C-0721" time="15:08" operator="农户-王" />
      </WindowChrome>
    );
  }

  if (tabId === "expert") {
    return <AskMock />;
  }

  if (tabId === "price-signal") {
    return (
      <WindowChrome title="行情参照" className="interactive-window">
        <div className="p-4">
          <div className="mb-3 text-[12px] font-medium text-[#1C1712]">
            番茄产地价 · 近 30 日（启发式均线）
          </div>
          <div className="space-y-2">
            {[
              ["本周均价", "¥2.8/斤", 72],
              ["上月均价", "¥2.4/斤", 55],
              ["贷前参照带", "¥2.2–3.1", 40],
            ].map(([label, val, width]) => (
              <div key={String(label)}>
                <div className="mb-1 flex justify-between text-[11px] text-[#4A433A]">
                  <span>{label}</span>
                  <span className="text-num font-medium text-[#C9892E]">{val}</span>
                </div>
                <div className="h-2 rounded-full bg-[#F7F0E4]">
                  <div
                    className="h-2 rounded-full bg-[#0F4D35]/80"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-[#D4C7B0] px-3 py-2 text-[11px] text-[#6F6558]">
            定向用；核贷与定价仍看真实单据
          </div>
        </div>
      </WindowChrome>
    );
  }

  if (tabId === "roles") {
    return (
      <WindowChrome title="四席同台" dark className="interactive-window">
        <div className="space-y-2 p-3 text-[12px]">
          {[
            ["农户席", "申请 / 上架 / 问诊", "进台"],
            ["银行席", "产品 · 过审 · 留痕", "审"],
            ["买家席", "货盘 · 需求 · 联系", "看货"],
            ["专家席", "知识 · 问答 · 预约", "清队列"],
          ].map(([t, m, a]) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div>
                <div className="font-medium text-[#F7F0E4]/90">{t}</div>
                <div className="text-[11px] text-[#F7F0E4]/50">{m}</div>
              </div>
              <button
                type="button"
                className="rounded-md bg-[#C9892E] px-2.5 py-1 text-[11px] font-medium text-[#1C1712] hover:bg-[#d49a3f]"
              >
                {a}
              </button>
            </div>
          ))}
        </div>
      </WindowChrome>
    );
  }

  return (
    <WindowChrome title="经营台" className="interactive-window">
      <div className="p-4 text-[13px] text-[#6F6558]">选择左侧结果查看分镜</div>
    </WindowChrome>
  );
}

function AskMock() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1800);
    return () => window.clearInterval(id);
  }, []);
  const status = ["采集现场", "已匹配专家", "回答就绪"][tick % 3];
  return (
    <WindowChrome title="问专家" className="interactive-window">
      <div className="space-y-3 p-4 pb-8 text-[12.5px]">
        <div className="rounded-lg border border-[#E8DFD0] bg-[#F7F0E4] px-3 py-2 text-[#4A433A]">
          黄瓜 EC 2.9 后尖端焦枯——先扛还是降浓度？
        </div>
        <div className="flex gap-2">
          <span className="badge badge-neutral">黄瓜</span>
          <span className="badge badge-neutral">华北</span>
          <span className="badge badge-warn">{status}</span>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-[#E8DFD0] px-3 py-2">
          <Avatar initials="陈" tone="blue" size="sm" />
          <div>
            <div className="font-medium text-[#1C1712]">陈梅</div>
            <div className="mt-1 text-[#4A433A]">
              {tick % 3 === 2
                ? "先降到 2.5–2.6，看排液%。尖端焦枯多跟盐分负荷走，不只是目标 EC。"
                : "正在看肥水记录和叶片照片…"}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#F7F0E4] px-3 py-2">
          <div className="flex items-center gap-2">
            <Avatar initials="林" tone="emerald" size="sm" />
            <span className="text-[12px] font-medium text-[#1C1712]">预约棚室巡诊</span>
          </div>
          <span className="badge badge-success">可约</span>
        </div>
      </div>
      <AuditTrailStrip batch="#B-0719" time="09:12" operator="专家-林" />
    </WindowChrome>
  );
}

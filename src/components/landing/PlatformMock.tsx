import { useEffect, useState } from "react";
import { WindowChrome, Avatar } from "../ui";

export function PlatformMock({ tabId }: { tabId: string }) {
  if (tabId === "browse-knowledge") {
    return (
      <WindowChrome title="Browse knowledge" className="interactive-window">
        <div className="grid gap-0 sm:grid-cols-[160px_1fr]">
          <aside className="border-b border-[#ececec] p-3 text-[12px] sm:border-b-0 sm:border-r">
            {["All crops", "Tomato", "Rice", "Cucumber", "Apple"].map((c, i) => (
              <div
                key={c}
                className={`rounded-md px-2 py-1.5 ${i === 1 ? "bg-[#0a0a0a] text-white" : "text-[#525252] hover:bg-[#f4f4f5]"}`}
              >
                {c}
              </div>
            ))}
          </aside>
          <div className="space-y-2 p-3">
            {[
              ["Early blight scouting checklist", "Verified · East China"],
              ["Protectant ladder after wet week", "Reviewed · tunnel"],
              ["Canopy airflow before spray", "Draft · ops"],
            ].map(([t, m]) => (
              <div
                key={t}
                className="rounded-lg border border-[#ececec] px-3 py-2.5 hover:border-[#d4d4d4] hover:shadow-sm"
              >
                <div className="text-[13px] font-medium">{t}</div>
                <div className="text-[11px] text-[#737373]">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </WindowChrome>
    );
  }

  if (tabId === "ask-expert") {
    return <AskMock />;
  }

  if (tabId === "book-consult") {
    return (
      <WindowChrome title="Book consult" className="interactive-window">
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            {["Mon", "Tue", "Wed"].map((d, i) => (
              <div
                key={d}
                className={`rounded-lg border px-2 py-3 ${i === 1 ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-[#ececec] text-[#525252]"}`}
              >
                <div className="font-medium">{d}</div>
                <div className="mt-1 opacity-80">09:00</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-[#f4f4f5] px-3 py-2 text-[12px] text-[#525252]">
            Topic: high-tunnel disease walkthrough · Tomato
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar initials="LW" tone="emerald" size="sm" />
              <span className="text-[12px] font-medium">Dr. Lin Wei</span>
            </div>
            <span className="badge badge-success">slot held</span>
          </div>
        </div>
      </WindowChrome>
    );
  }

  if (tabId === "expert-ops") {
    return (
      <WindowChrome title="Expert console" dark className="interactive-window">
        <div className="space-y-2 p-3 text-[12px]">
          {[
            ["Q queue", "3 open · 1 assigned", "Process"],
            ["Bookings", "2 requested", "Confirm"],
            ["Knowledge drafts", "1 in review", "Publish"],
          ].map(([t, m, a]) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div>
                <div className="font-medium text-white/90">{t}</div>
                <div className="text-[11px] text-white/50">{m}</div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-[#0a0a0a] hover:bg-white/90"
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
    <WindowChrome title="Field signals" className="interactive-window">
      <div className="p-4">
        <div className="mb-3 text-[12px] font-medium text-[#0a0a0a]">
          Recurring issues · last 30 days
        </div>
        <div className="space-y-2">
          {[
            ["Tomato · early blight", 18, 72],
            ["Cucumber · EC drift", 11, 48],
            ["Rice · sheath blight", 9, 40],
          ].map(([label, count, width]) => (
            <div key={String(label)}>
              <div className="mb-1 flex justify-between text-[11px] text-[#525252]">
                <span>{label}</span>
                <span>{count} threads</span>
              </div>
              <div className="h-2 rounded-full bg-[#f4f4f5]">
                <div
                  className="h-2 rounded-full bg-emerald-500/80"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-[#d4d4d4] px-3 py-2 text-[11px] text-[#737373]">
          Promote top answers into knowledge candidates
        </div>
      </div>
    </WindowChrome>
  );
}

function AskMock() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1800);
    return () => window.clearInterval(id);
  }, []);
  const status = ["Capturing context", "Matched expert", "Answer ready"][tick % 3];
  return (
    <WindowChrome title="Ask expert" className="interactive-window">
      <div className="space-y-3 p-4 text-[12.5px]">
        <div className="rounded-lg border border-[#ececec] bg-[#fafafa] px-3 py-2 text-[#525252]">
          Cucumber tip burn after EC 2.9 — hold or back off?
        </div>
        <div className="flex gap-2">
          <span className="badge badge-neutral">Cucumber</span>
          <span className="badge badge-neutral">North China</span>
          <span className="badge badge-warn">{status}</span>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-[#ececec] px-3 py-2">
          <Avatar initials="MC" tone="blue" size="sm" />
          <div>
            <div className="font-medium text-[#0a0a0a]">Mei Chen</div>
            <div className="mt-1 text-[#525252]">
              {tick % 3 === 2
                ? "Back off to 2.5–2.6 and check drain %. Tip burn often tracks salt load, not just target EC."
                : "Reviewing fertigation log and leaf photos…"}
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

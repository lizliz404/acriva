/**
 * DESIGN.md §6.4 — seal-press micro-feedback for confirm-class actions only.
 * Uses --color-seal (#B33A2B), same token as the static mark ink.
 * Motion flourish only — not the sole place seal red may appear (mark owns it too).
 */

const COOLDOWN_MS = 800;
let lastPlayedAt = 0;

export function playStampFeedback(el: HTMLElement | null | undefined): void {
  if (!el || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const now = Date.now();
  if (now - lastPlayedAt < COOLDOWN_MS) return;
  lastPlayedAt = now;

  const computed = getComputedStyle(el);
  const restoredPosition = computed.position === "static";
  if (restoredPosition) el.style.position = "relative";

  el.classList.add("stamp-pressing");

  const smear = document.createElement("span");
  smear.className = "stamp-smear";
  smear.setAttribute("aria-hidden", "true");
  el.appendChild(smear);

  window.setTimeout(() => {
    el.classList.remove("stamp-pressing");
    smear.remove();
    if (restoredPosition) el.style.position = "";
  }, 330);
}

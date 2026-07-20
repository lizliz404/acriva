import { footerColumns, product } from "#/lib/data";
import { LogoMark } from "../ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ececec] bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#737373]">
              {product.description}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[#0a0a0a]">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-[13px] text-[#737373]">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#ececec] pt-6 text-[12px] text-[#a3a3a3]">
          <span>© {new Date().getFullYear()} {product.name}</span>
          <span>融销通 · finance + market + expert</span>
        </div>
      </div>
    </footer>
  );
}

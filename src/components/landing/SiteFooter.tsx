import { footerColumns, product } from "#/lib/data";
import { LogoMark } from "../ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E8DFD0] bg-[#FFFBF4]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#6F6558]">
              {product.description}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] font-semibold tracking-wide text-[#1C1712]">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-[13px] text-[#6F6558]">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8DFD0] pt-6 text-[12px] text-[#6F6558]">
          <span>
            © {new Date().getFullYear()} {product.name} · {product.zhName}
          </span>
          <span>借得到 · 卖得出 · 问得着</span>
        </div>
      </div>
    </footer>
  );
}

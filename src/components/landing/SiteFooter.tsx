import { Link } from "@tanstack/react-router";
import { footerColumns, product } from "#/lib/data";
import { LogoMark } from "../ui";

function FooterLink({
  label,
  href,
  soon,
}: {
  label: string;
  href: string | null;
  soon?: boolean;
}) {
  if (soon || !href) {
    return (
      <span className="text-[13px] text-[#6F6558]/70">
        {label}
        <span className="ml-1 text-[11px] text-[#6F6558]/55">即将</span>
      </span>
    );
  }

  const className =
    "text-[13px] text-[#6F6558] transition hover:text-[#1C1712]";
  const external = href.startsWith("http");
  const hashOrRoot = href.startsWith("#") || href === "/";

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  if (hashOrRoot) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {label}
    </Link>
  );
}

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
                  <li key={link.label}>
                    <FooterLink
                      label={link.label}
                      href={link.href}
                      soon={link.soon}
                    />
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

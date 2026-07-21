import { Link } from "@tanstack/react-router";
import { product } from "#/lib/data";
import { LogoMark } from "../ui";
import { useI18n } from "#/i18n";

function FooterLink({
  label,
  href,
  soon,
  soonLabel,
}: {
  label: string;
  href: string | null;
  soon?: boolean;
  soonLabel: string;
}) {
  if (soon || !href) {
    return (
      <span className="text-[13px] text-[#6F6558]/70">
        {label}
        <span className="ml-1 text-[11px] text-[#6F6558]/55">{soonLabel}</span>
      </span>
    );
  }

  const className = "text-[13px] text-[#6F6558] transition hover:text-[#1C1712]";
  const external = href.startsWith("http");
  const hashOrRoot = href.startsWith("#") || href === "/";

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
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
  const { t } = useI18n();
  return (
    <footer className="border-t border-[#E8DFD0] bg-[#FFFBF4]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#6F6558]">
              {t.product.description}
            </p>
          </div>
          {t.footerColumns.map((col) => (
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
                      soon={"soon" in link ? link.soon : undefined}
                      soonLabel={t.footer.soon}
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
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

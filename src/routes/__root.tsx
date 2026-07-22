import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { product } from "#/lib/data";
import { I18nProvider, useI18n } from "#/i18n";

const SITE_URL = `https://${product.domain}`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
/*
 * DESIGN.md §10.11 — WeChat share card (separate from OG):
 * Spec 500×400 (or 1:1 fallback) → public/wechat-share.png.
 * WeChat chat thumbnails / 公众号 cards do not consume 1200×630 og:image;
 * wire via公众号/小程序 share-image APIs when shipping that channel.
 * Image prompts are locked in DESIGN.md — do not regenerate here.
 */

/** CTR-tight: 融销通 + result line; spaced middots for share readability; Acriva via site_name */
const title = `${product.zhName} — ${product.taglineAlt}`;
const description = product.description;

const keywords = [
  "融销通",
  "Acriva",
  "农产品融销",
  "农贷",
  "农业合作社",
  "货盘",
  "农产品销售",
  "农业金融",
  "农资贷",
  "agtech",
  "farm credit",
].join(", ");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: `${product.name} ${product.zhName}`,
      alternateName: [product.zhName, product.name],
      url: SITE_URL,
      logo: `${SITE_URL}/logo512.png`,
      description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: `${product.zhName}｜${product.name}`,
      url: SITE_URL,
      description,
      inLanguage: ["zh-CN", "en"],
      availableLanguage: ["zh-CN", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: `${product.zhName}（${product.name}）`,
      alternateName: product.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description,
      inLanguage: ["zh-CN", "en"],
      availableLanguage: ["zh-CN", "en"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CNY",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { property: "og:site_name", content: product.name },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      // Browser chrome: soil ink (DESIGN primary), unified with manifest
      { name: "theme-color", content: "#1C1712" },
      { "script:ld+json": jsonLd },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <RootHtml>{children}</RootHtml>
    </I18nProvider>
  );
}

function RootHtml({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

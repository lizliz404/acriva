import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { product } from "#/lib/data";

const SITE_URL = `https://${product.domain}`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** CTR-tight: 融销通 + result line, ≤60 display chars */
const title = `${product.zhName} — ${product.taglineAlt.replace(/ · /g, "·")}｜${product.name}`;
const description = product.description;

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
      inLanguage: "zh-CN",
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
      inLanguage: "zh-CN",
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
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: product.name },
      { property: "og:locale", content: "zh_CN" },
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
    <html lang="zh-CN">
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

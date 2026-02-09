import type { ReactNode } from "react";
import Script from "next/script";
import "@/styles/style.css";
import "@/styles/animate.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-cmn-Hans">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4988552421895566"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E4CG1XRFV6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E4CG1XRFV6');`}
        </Script>
      </body>
    </html>
  );
}

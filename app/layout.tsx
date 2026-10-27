import "./globals.css";
import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";

import { createMetadata } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";
import { MotionProvider, NOSCRIPT_FALLBACK } from "@/engine/motion";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/brand/pipeco-logo.png" />
        <meta name="theme-color" content="#051F20" />
        <noscript>
          <style>{NOSCRIPT_FALLBACK}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </head>
      <body className="bg-white text-ink antialiased">
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}

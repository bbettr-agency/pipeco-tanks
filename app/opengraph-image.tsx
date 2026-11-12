import { ImageResponse } from "next/og";

/**
 * Social share card (1200×630) — PIPECO branding on the deep-forest ground with
 * a restrained brass accent. Used as the default Open Graph / Twitter image.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Pipeco Tanks South Africa — GRP, pressed steel and stainless steel sectional water tanks, supplied and installed.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#051F20",
          color: "white",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              background: "#3A8841",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="12" stroke="white" strokeWidth="7" />
              <path d="M28 28 L72 72" stroke="white" strokeWidth="9" strokeLinecap="round" />
              <path d="M72 28 L28 72" stroke="white" strokeWidth="9" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>PIPECO TANKS</span>
            <span style={{ fontSize: 19, letterSpacing: 7, color: "#8EB69B" }}>SOUTH AFRICA</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
            <div style={{ display: "flex", width: 54, height: 3, background: "#B68A4E" }} />
            <span style={{ fontSize: 22, letterSpacing: 3, color: "#B68A4E" }}>
              SECTIONAL WATER STORAGE
            </span>
          </div>
          <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 900 }}>
            Sectional water tanks, engineered for South Africa.
          </span>
        </div>

        {/* Ranges */}
        <span style={{ fontSize: 27, color: "rgba(255,255,255,0.72)" }}>
          GRP · Pressed Steel · Stainless — supplied &amp; installed, turnkey.
        </span>
      </div>
    ),
    { ...size }
  );
}

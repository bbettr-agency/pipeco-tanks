import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) — the PIPECO badge mark on brand green, with a
 * little breathing room, so it looks right as a home-screen icon.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#3A8841",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="116"
          height="116"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="6" width="88" height="88" rx="14" stroke="white" strokeWidth="6" />
          <path d="M28 28 L72 72" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <path d="M72 28 L28 72" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

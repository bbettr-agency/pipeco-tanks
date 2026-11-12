import { ImageResponse } from "next/og";

/**
 * Favicon — the PIPECO badge mark (white pipe-cross "X" in a rounded square) on
 * the approved brand green. Generated so it stays crisp at any size.
 */
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
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
          width="62"
          height="62"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="6" width="88" height="88" rx="12" stroke="white" strokeWidth="7" />
          <path d="M28 28 L72 72" stroke="white" strokeWidth="9" strokeLinecap="round" />
          <path d="M72 28 L28 72" stroke="white" strokeWidth="9" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

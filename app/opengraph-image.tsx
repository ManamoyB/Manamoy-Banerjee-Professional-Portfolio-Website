import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/constants/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} personal brand platform`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#101318",
        color: "white",
        padding: "72px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          background: "#3FD5B7",
          color: "#101318",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: 800,
        }}
      >
        M
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: "-1px" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 34, color: "#B7C4C0" }}>{siteConfig.role}</div>
      </div>
    </div>,
    size,
  );
}

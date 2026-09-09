import { OG_COLORS } from "@/lib/og";

interface OgCardProps {
  eyebrow: string;
  headline: string;
  lede: string;
  footerLeft: string;
  footerRight: string;
}

// Rendered only inside `ImageResponse`, never into the DOM, so this is Satori
// rather than the browser: inline styles instead of Tailwind, and an explicit
// `display: flex` on every element with more than one child.
export default function OgCard({
  eyebrow,
  headline,
  lede,
  footerLeft,
  footerRight,
}: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: OG_COLORS.background,
        padding: "80px",
      }}
    >
      {/* Grows into the space above the footer and centres in it, so the
          leftover height is split evenly instead of pooling in the middle. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, color: OG_COLORS.accent }}>
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1.1,
            marginTop: 24,
            color: OG_COLORS.text,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.4,
            marginTop: 28,
            color: OG_COLORS.muted,
          }}
        >
          {lede}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${OG_COLORS.border}`,
          paddingTop: 32,
          fontSize: 24,
          color: OG_COLORS.faint,
        }}
      >
        <div>{footerLeft}</div>
        <div>{footerRight}</div>
      </div>
    </div>
  );
}

import { ImageResponse } from "next/og";
import OgCard from "@/app/components/og/OgCard";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { SITE_NAME, SITE_ROLE, SITE_TITLE } from "@/lib/site";

export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={SITE_ROLE.toUpperCase()}
        headline={SITE_NAME}
        lede="Frontend systems for fintech products people trust with their money."
        footerLeft="next.js · typescript · react · redux"
        footerRight="5 years in fintech"
      />
    ),
    size,
  );
}

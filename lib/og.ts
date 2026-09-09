// Satori, which renders `ImageResponse`, cannot read the CSS custom properties
// in `app/globals.css`, so the dark palette is repeated here as literals. These
// are the `--dark-*` tokens; changing one there means changing it here too.
export const OG_COLORS = {
  background: "#0a0a0a",
  border: "#262626",
  text: "#ededed",
  muted: "#a3a3a3",
  faint: "#8a8a8a",
  accent: "#f59e0b",
};

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_CONTENT_TYPE = "image/png";

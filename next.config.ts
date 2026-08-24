import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// `pageExtensions` is deliberately left alone: MDX lives in `content/` and is
// imported by the route, never file-routed.
const withMDX = createMDX({});

export default withMDX(nextConfig);

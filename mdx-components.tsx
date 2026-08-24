import Image from "next/image";
import type { MDXComponents } from "mdx/types";

// The type scale, 1.7 body leading, and surface/border blocks come from
// prototypes/case-study-detail.html. The prose column width is set by the
// route, not here.
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-16 mb-4 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-base font-semibold tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-4 leading-[1.7]">{children}</p>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-accent underline underline-offset-2 hover:no-underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 leading-[1.7]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 leading-[1.7]">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded border border-border bg-surface px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
  // The nested `code` inherits the block's own styling, so the inline chip
  // above is stripped back off inside a fenced block.
  pre: ({ children }) => (
    <pre className="mt-4 mb-10 overflow-x-auto rounded border border-border bg-surface p-4 font-mono text-[0.82rem] leading-[1.6] [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-10 border-l-2 border-border pl-4 text-sm text-muted [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  // Dimensions are an aspect-ratio hint only - `h-auto` lets the real file win.
  // Feature 7 should pass true dimensions when actual screenshots land.
  img: ({ src, alt }) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      width={1200}
      height={675}
      className="my-6 h-auto w-full rounded border border-border"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

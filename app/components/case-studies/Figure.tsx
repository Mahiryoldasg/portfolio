import type { ReactNode } from "react";

export default function Figure({
  caption,
  children,
}: {
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="mt-4 mb-10">
      <div className="rounded border border-border bg-surface p-4 sm:p-5">
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

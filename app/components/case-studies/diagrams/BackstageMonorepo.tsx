import Figure from "@/app/components/case-studies/Figure";

const NAMED_SLICES = [
  "campaign",
  "role",
  "allocation",
  "kyc-settings",
  "approval",
  "optimus-lien",
];

const SLICE_LAYERS = ["api/", "queries + mutations", "i18n bundle", "pages"];

const SHARED_PACKAGES = [
  {
    name: "packages/auth",
    contents: "Session handling, token refresh, permission checks",
  },
  {
    name: "packages/blocks",
    contents: "createAnatomy, shared component and hook primitives",
  },
];

export default function BackstageMonorepo() {
  return (
    <Figure caption="Three workspace packages, 29 vertical slices. A slice owns its own data layer and translations, and may not import from a sibling.">
      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        pnpm workspaces
      </p>

      <div className="mt-3 rounded border border-border bg-background p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="font-mono text-xs text-accent">apps/backstage</p>
          <p className="text-xs text-muted">29 feature slices</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {NAMED_SLICES.map((slice) => (
            <span
              key={slice}
              className="rounded bg-accent-subtle px-1.5 py-0.5 font-mono text-[0.7rem] text-accent"
            >
              {slice}
            </span>
          ))}
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
            +23 more
          </span>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {SHARED_PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className="rounded border border-border bg-background p-3"
          >
            <p className="font-mono text-xs text-accent">{pkg.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {pkg.contents}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        inside any one slice
      </p>

      <div className="mt-3 rounded border border-border bg-background p-3">
        <p className="font-mono text-xs text-accent">campaign/</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SLICE_LAYERS.map((layer) => (
            <div
              key={layer}
              className="rounded border border-border px-2 py-1.5 text-center font-mono text-[0.7rem] leading-snug"
            >
              {layer}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          No cross-feature imports. A slice reaches sideways through the shared
          packages or not at all.
        </p>
      </div>
    </Figure>
  );
}

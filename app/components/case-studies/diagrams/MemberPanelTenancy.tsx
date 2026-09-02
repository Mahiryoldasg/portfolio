import Figure from "@/app/components/case-studies/Figure";

const TENANTS = ["Kredim", "Hopi", "Partner"];

const SAGA_DOMAINS = [
  "auth",
  "loans",
  "cards",
  "KYC",
  "payments",
  "WebSocket",
];

const STATE_LAYERS = [
  {
    name: "Redux Toolkit",
    role: "Synchronous UI state",
    detail: "20 domain slices, returned to initial state by one logout action.",
  },
  {
    name: "Redux-Saga",
    role: "Async orchestration",
    detail: "15+ domain flows, where sequencing and cancellation matter.",
  },
  {
    name: "RTK Query",
    role: "Read-heavy surfaces",
    detail: "Shared base instance, automatic caching and invalidation.",
  },
];

export default function MemberPanelTenancy() {
  return (
    <Figure caption="One codebase serving three tenants. State is split by the job it does, not by the feature it belongs to.">
      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        three tenants
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {TENANTS.map((tenant) => (
          <div
            key={tenant}
            className="rounded border border-border bg-background p-3 text-center font-mono text-xs text-accent"
          >
            {tenant}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Own branding, tenancy rules, and authentication context. One HTTP client
        carries both a standard bearer token and a partner token with{" "}
        <span className="font-mono">partnerId</span> injected.
      </p>

      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        one codebase, state split by job
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {STATE_LAYERS.map((layer) => (
          <div
            key={layer.name}
            className="rounded border border-border bg-background p-3"
          >
            <p className="font-mono text-xs text-accent">{layer.name}</p>
            <p className="mt-1 text-xs font-medium">{layer.role}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {layer.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded border border-border bg-background p-3">
        <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
          saga domains
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SAGA_DOMAINS.map((domain) => (
            <span
              key={domain}
              className="rounded bg-accent-subtle px-1.5 py-0.5 font-mono text-[0.7rem] text-accent"
            >
              {domain}
            </span>
          ))}
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
            and more
          </span>
        </div>
      </div>
    </Figure>
  );
}

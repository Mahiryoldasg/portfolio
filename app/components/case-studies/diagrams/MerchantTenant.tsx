import Figure from "@/app/components/case-studies/Figure";

const BRANCHES = ["Branch", "Branch", "Branch"];

const PLATFORM_SPLIT = [
  {
    label: "reused from the member panel",
    items: [
      "React 18, Redux Toolkit, Redux-Saga",
      "Credit and campaign logic",
      "HTTP client and auth contexts",
    ],
  },
  {
    label: "built for merchant",
    items: [
      "Merchant tenancy and branch scope",
      "The counter transaction flow",
      "Reversal tied to the sale it reverses",
    ],
  },
];

export default function MerchantTenant() {
  return (
    <Figure caption="Visibility follows the organisation chart, one level deeper than the Member Panel's tenant boundary. The platform underneath is shared; the surface on top is not.">
      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        who sees what
      </p>

      <div className="mt-3 rounded border border-border bg-background p-3">
        <p className="font-mono text-xs text-accent">Merchant organisation</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {BRANCHES.map((branch, index) => (
            <div
              key={index}
              className="rounded border border-border p-2 text-center"
            >
              <p className="font-mono text-[0.7rem] text-muted">{branch}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-accent">
                store staff
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          A head office sees across its branches. A store sees its own trade and
          no one else's.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLATFORM_SPLIT.map((column) => (
          <div
            key={column.label}
            className="rounded border border-border bg-background p-3"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
              {column.label}
            </p>
            <ul className="mt-2 space-y-1.5">
              {column.items.map((item) => (
                <li key={item} className="text-xs leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Figure>
  );
}

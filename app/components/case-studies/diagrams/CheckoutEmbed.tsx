import Figure from "@/app/components/case-studies/Figure";

const START_STEPS = [
  "Partner backend creates the transaction with Kredim",
  "Kredim returns a short-lived session token",
  "The webview opens the flow with that token",
];

const RECOVERY_STEPS = [
  "Customer drops out mid-transaction",
  "SMS carries a deep link holding the order reference",
  "The flow rebuilds itself from that reference",
];

function StepRow({ label, steps }: { label: string; steps: string[] }) {
  return (
    <>
      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        {label}
      </p>
      <ol className="mt-3 grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="rounded border border-border bg-background p-3"
          >
            <span className="font-mono text-[0.7rem] text-accent">
              {index + 1}
            </span>
            <p className="mt-1 text-xs leading-relaxed text-muted">{step}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function CheckoutEmbed() {
  return (
    <Figure caption="The flow renders inside a webview it does not own, against a transaction that lives on the server. Both the opening and the recovery path go through that server-side record.">
      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
        where the flow runs
      </p>

      <div className="mt-3 rounded border border-border bg-background p-3">
        <p className="font-mono text-xs text-muted">
          partner native app (iOS / Android)
        </p>
        <div className="mt-3 rounded border border-border p-3">
          <p className="font-mono text-xs text-muted">webview</p>
          <div className="mt-3 rounded border border-border bg-accent-subtle p-3 text-center">
            <p className="font-mono text-xs text-accent">Kredim Checkout</p>
            <p className="mt-1 text-xs text-muted">
              React 18, Redux Toolkit, Redux-Saga
            </p>
          </div>
        </div>
      </div>

      <StepRow label="starting a transaction" steps={START_STEPS} />
      <StepRow label="recovering an interrupted one" steps={RECOVERY_STEPS} />
    </Figure>
  );
}

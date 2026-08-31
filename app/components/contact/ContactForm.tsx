"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { HONEYPOT_FIELD } from "@/lib/contact";
import type { ContactFieldName, ContactFormState } from "@/types/contact";

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

const LABEL_CLASSES = "font-mono text-xs uppercase tracking-wide text-muted";
const FIELD_CLASSES =
  "mt-1.5 w-full rounded border bg-surface px-3 py-2 text-sm";

function errorId(field: ContactFieldName) {
  return `contact-${field}-error`;
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    INITIAL_STATE,
  );

  const errors = state.fieldErrors;

  function fieldProps(field: ContactFieldName) {
    const invalid = Boolean(errors?.[field]);
    return {
      id: `contact-${field}`,
      name: field,
      defaultValue: state.values?.[field] ?? "",
      "aria-invalid": invalid,
      "aria-describedby": invalid ? errorId(field) : undefined,
      className: `${FIELD_CLASSES} ${invalid ? "border-danger" : "border-border"}`,
    };
  }

  const messageProps = fieldProps("message");
  const messageClasses = `${messageProps.className} resize-y`;

  return (
    <div className="mt-6">
      {/* Present before the first submit, so the status change is announced
          rather than arriving with a freshly inserted region. */}
      <div aria-live="polite">
        {state.status !== "idle" && (
          <p
            className={`mb-4 rounded border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-accent bg-accent-subtle"
                : "border-danger text-danger"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>

      {/* noValidate: the browser's own bubble would fire on the email field but
          not on rules it doesn't know (the message minimum), so validation would
          arrive in two different styles. The server is the single authority;
          type="email" stays for the mobile keyboard. */}
      <form action={formAction} noValidate className="space-y-4">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASSES}>
            Name
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" />
          <FieldError field="name" message={errors?.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className={LABEL_CLASSES}>
            Email
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" />
          <FieldError field="email" message={errors?.email} />
        </div>

        <div>
          <label htmlFor="contact-message" className={LABEL_CLASSES}>
            Message
          </label>
          <textarea {...messageProps} rows={6} className={messageClasses} />
          <FieldError field="message" message={errors?.message} />
        </div>

        {/* Bot trap. Off-screen rather than display:none, which bots skip, and
            hidden from assistive tech so nobody real is asked to fill it. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-accent px-5 py-3 text-sm font-medium text-accent-ink disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}

function FieldError({
  field,
  message,
}: {
  field: ContactFieldName;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={errorId(field)} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

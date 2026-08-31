"use server";

import { Resend } from "resend";
import { HONEYPOT_FIELD, validateContactSubmission } from "@/lib/contact";
import type { ContactFormState, ContactSubmission } from "@/types/contact";

const SUCCESS_MESSAGE = "Thanks, your message is on its way. I'll reply soon.";
const FAILURE_MESSAGE =
  "Sorry, that did not send. Please try again, or use the email link below.";

// The only sender Resend accepts without a verified domain, which is Post-MVP
// (build-plan item 11). With it, Resend delivers only to the address that owns
// the account, so CONTACT_EMAIL_TO cannot be pointed elsewhere until a domain
// is verified.
const FROM_ADDRESS = "Portfolio <onboarding@resend.dev>";

function echo(value: FormDataEntryValue | null): string | undefined {
  return typeof value === "string" ? value : undefined;
}

async function deliver(submission: ContactSubmission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    console.error(
      "Contact form: missing env var(s):",
      [!apiKey && "RESEND_API_KEY", !to && "CONTACT_EMAIL_TO"]
        .filter(Boolean)
        .join(", "),
    );
    return false;
  }

  // Built per call, never at module scope: at module scope this runs during
  // `next build` and fails the build on any machine without the key.
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    replyTo: submission.email,
    subject: `Portfolio contact from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      "",
      submission.message,
    ].join("\n"),
  });

  if (error) {
    // name and message only: never the client, the payload, or the key.
    console.error("Contact form: Resend rejected the send:", error.name, error.message);
    return false;
  }

  return true;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Anything that filled the hidden field is a bot. Report success so it learns
  // nothing, and send nothing.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validation = validateContactSubmission(raw);

  if (!validation.success) {
    return {
      status: "error",
      message: "Please fix the fields below and try again.",
      fieldErrors: validation.fieldErrors,
      // React resets the form on every completion, so without these the
      // visitor's text would vanish along with the error.
      values: {
        name: echo(raw.name),
        email: echo(raw.email),
        message: echo(raw.message),
      },
    };
  }

  if (!(await deliver(validation.data))) {
    // Same reason as above: a failed send must not cost them the message.
    return {
      status: "error",
      message: FAILURE_MESSAGE,
      values: validation.data,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}

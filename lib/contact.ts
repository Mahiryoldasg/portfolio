import { z } from "zod";
import type { ContactFieldName, ContactSubmission } from "@/types/contact";

// Lives here, not in the action: a "use server" module may only export async
// functions, and both the action and the form need this name.
export const HONEYPOT_FIELD = "company";

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 4000;

// Every field carries an explicit `error` so a non-string (a File, or null when
// the field is absent entirely) reads the same as a blank one. A Server Action
// is reachable by direct POST, so those are real inputs, not just form states.
const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string({ error: "Please enter a valid email address." })
    .trim()
    .max(254, "Please enter a valid email address.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string({ error: `Please write at least ${MESSAGE_MIN_LENGTH} characters.` })
    .trim()
    .min(
      MESSAGE_MIN_LENGTH,
      `Please write at least ${MESSAGE_MIN_LENGTH} characters.`,
    )
    .max(
      MESSAGE_MAX_LENGTH,
      `Please keep it under ${MESSAGE_MAX_LENGTH} characters.`,
    ),
});

export type ContactValidation =
  | { success: true; data: ContactSubmission }
  | { success: false; fieldErrors: Partial<Record<ContactFieldName, string>> };

export function validateContactSubmission(input: unknown): ContactValidation {
  const result = contactSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }

  // First issue per field only: the form has one error slot under each input.
  const fieldErrors: Partial<Record<ContactFieldName, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactFieldName | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }

  return { success: false, fieldErrors };
}

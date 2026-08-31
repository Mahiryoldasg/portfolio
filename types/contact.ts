// Never persisted. This shape exists only between parsing the FormData and
// composing the email, per the data model in project-overview.md.
export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export type ContactFieldName = keyof ContactSubmission;

// The Server Action's return value, so it crosses to the client and has to stay
// serializable: strings and plain objects only, never a ZodError or an Error.
export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
  // Echoed back on failure only. React resets the form after every action
  // completion, so these feed `defaultValue` and survive the reset; omitting
  // them on success is what lets the same reset clear the form.
  values?: Partial<ContactSubmission>;
}

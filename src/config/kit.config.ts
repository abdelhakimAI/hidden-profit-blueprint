/**
 * KIT (ConvertKit) INTEGRATION CONFIG
 * =====================================
 * This is the ONLY file you need to edit to connect the real Kit form.
 * There is no custom backend, no database, and no API key here — Kit's
 * public form-submission endpoint is designed to be called straight from
 * the browser, the same way Kit's own embed script does it.
 *
 * HOW TO GET YOUR REAL VALUES
 * ----------------------------
 * 1. In Kit, create (or open) the Landing Page / Form you want to use for
 *    this lead magnet — the one with your PDF delivery + welcome sequence
 *    automation attached to it.
 * 2. Go to that form's "Embed" tab and choose the plain "Form" embed code.
 * 3. In the embed snippet, find the <form action="..."> URL. It looks like:
 *      https://app.kit.com/forms/1234567/subscriptions
 *    (older accounts may show app.convertkit.com — either works.)
 * 4. Paste that exact URL as FORM_ACTION_URL below.
 * 5. If the embed snippet includes any <input type="hidden" name="..." value="...">
 *    fields (e.g. a tag id), copy them into HIDDEN_FIELDS below.
 *
 * The form in src/integrations/kit/KitForm.tsx submits the visitor's email
 * to this endpoint via fetch(). Kit tags the new subscriber and its own
 * automation (configured inside Kit, not here) handles PDF delivery and the
 * nurture sequence — exactly as scoped: Frontend → Kit form → Kit
 * subscriber → Kit automation. Nothing here talks to a database, and no
 * email address is ever written to localStorage, cookies, or the console.
 */

export const kitConfig = {
  /** TODO: replace with your real Kit form action URL (see steps above). */
  FORM_ACTION_URL: "https://app.kit.com/forms/REPLACE_WITH_FORM_ID/subscriptions",

  /**
   * TODO: add any hidden fields your Kit embed snippet includes (tags,
   * source, etc). Example: { tags: "faceless-youtube-blueprint" }
   * Leave empty if your embed snippet has none.
   */
  HIDDEN_FIELDS: {} as Record<string, string>,

  /** Field name Kit expects for the email input. Kit's default is "email_address". */
  EMAIL_FIELD_NAME: "email_address",
} as const;

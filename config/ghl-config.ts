/**
 * GoHighLevel (PIPECO SA) integration IDs.
 *
 * These are NOT secrets — they are the sub-account's pipeline, stage and custom
 * field identifiers (visible in the GHL UI) and are useless without the API
 * token. The token itself is read at runtime from the `PIPECO_GHL_TOKEN`
 * environment variable (Vercel env in production; injected from macOS Keychain
 * for local testing) and is never stored in the repo.
 *
 * Created via the API on the verified sub-account "PIPECO SA".
 */

export const GHL = {
  apiBase: "https://services.leadconnectorhq.com",
  apiVersion: "2021-07-28",

  /** Sub-account (location) this integration writes to. */
  locationId: "TZCMRS21RVgbLGMKOOvx",

  /** Pipeline: "PIPECO — Quotation Enquiries". */
  pipelineId: "ggFzp0AjxHlmtUfie1fQ",

  /** Pipeline stage IDs. New enquiries land in `newEnquiry`. */
  stages: {
    newEnquiry: "25abb9d6-138e-4aad-9d0a-c65fcf56fdc0",
    contactAttempted: "2957ac9c-411f-4cc8-84e1-d43134538696",
    requirementsConfirmed: "7d44f91c-8640-4b4a-9650-cad05cdd91ba",
    quotationInPreparation: "c3199c0e-a68f-424e-94ab-49db42b00053",
    quotationSent: "8f63f11c-d6cd-4da1-bc03-801a54d6b84e",
    followUp: "e77ea3ba-046e-4303-99ce-7e38d457aff9",
    won: "2c12de00-ae68-4ec6-a4ab-54aa0f88ee0b",
    lost: "c050ce49-56fa-40e4-ae8a-554ad4a54e3f",
  },

  /** Contact custom field IDs (model: contact). */
  fields: {
    tankTypeSolution: "DTQK9GfxIQnsCm6o4tQb", // contact.tank_type__solution
    approximateCapacity: "xozF9SDn1QvSq2Dmgc0P", // contact.approximate_capacity
    installationLocation: "MkkhAdUcw1KdWyhtp9sS", // contact.installation_location
    projectRequirements: "w4JIlbnUlDdcwTF6m5He", // contact.project_requirements
    enquirySource: "eJivUxxwh3fPwHu2Cs1r", // contact.enquiry_source
    productSolutionPage: "Sxa7mzJCBo6TTkrro3Q6", // contact.product__solution_page
    submissionDate: "4ClGA1V5l55HUWaufnyT", // contact.submission_date
  },

  /** Env var holding the Private Integration Token (server-side only). */
  tokenEnvVar: "PIPECO_GHL_TOKEN",
} as const;

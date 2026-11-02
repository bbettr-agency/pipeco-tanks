"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import {
  tankTypes,
  tankTypeValues,
  FIELD_LIMITS,
  HONEYPOT_FIELD,
} from "@/config/quote-config";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/utils/cn";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  tankType: string;
  location: string;
  requirements: string;
  capacity: string;
  application: string;
  consent: boolean;
};

const EMPTY: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  tankType: "",
  location: "",
  requirements: "",
  capacity: "",
  application: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.company.trim()) e.company = "Please enter your company.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  if (!tankTypeValues.includes(v.tankType)) e.tankType = "Please choose a tank type.";
  if (!v.location.trim()) e.location = "Please enter the installation location.";
  if (!v.requirements.trim())
    e.requirements = "Please tell us about your project.";
  if (!v.consent) e.consent = "Please acknowledge the privacy note.";
  return e;
}

const inputBase =
  "w-full rounded-[2px] border bg-white px-3.5 py-2.5 font-body text-[15px] text-ink placeholder:text-graphite/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:border-brass";

const labelBase = "block font-body text-sm font-medium text-forest-base";

const waHref = `https://wa.me/${siteConfig.whatsapp}`;

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  // Preselect the tank type from a product CTA (e.g. /?tank=grp#contact).
  useEffect(() => {
    const t = searchParams.get("tank");
    if (t && tankTypeValues.includes(t)) {
      setValues((v) => (v.tankType ? v : { ...v, tankType: t }));
    }
  }, [searchParams]);

  function set<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "submitting") return; // guard against duplicate submits

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first field with an error.
      const first = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]'
      );
      first?.focus();
      return;
    }

    setServerError(null);
    setStatus("submitting");

    const honeypot =
      (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement)
        ?.value ?? "";

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: honeypot }),
      });
      const payload = await res.json().catch(() => ({}));

      if (res.ok && payload?.ok) {
        setStatus("success");
        return;
      }

      if (Array.isArray(payload?.fields)) {
        const fieldErrors: Errors = {};
        for (const f of payload.fields as string[]) {
          fieldErrors[f as keyof Values] = "Please check this field.";
        }
        setErrors(fieldErrors);
      }
      setServerError(
        typeof payload?.error === "string"
          ? payload.error
          : "Something went wrong. Please try again, or email / WhatsApp us."
      );
      setStatus("error");
    } catch {
      setServerError(
        "We couldn’t reach the server. Please check your connection and try again, or WhatsApp us."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[3px] border border-forest-base/15 bg-white p-8 md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-base text-white">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-forest-base">
          Thank you – we’ve got your enquiry.
        </h3>
        <p className="mt-3 font-body leading-7 text-ink/70">
          Our team will review your requirements and come back to you with a
          specification and quotation. Need us sooner? Message us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-forest-base underline-offset-4 hover:text-brass-dark hover:underline"
          >
            WhatsApp {siteConfig.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-graphite underline-offset-4 hover:text-forest-base hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    );
  }

  const describe = (key: keyof Values) =>
    errors[key] ? `${key}-error` : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-[3px] border border-forest-base/15 bg-white p-6 sm:p-8"
      aria-describedby={serverError ? "form-error" : undefined}
    >
      {/* Honeypot — visually hidden, off the tab order. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={cn(inputBase, errors.name ? "border-red-500" : "border-ink/15")}
          />
        </Field>

        <Field id="company" label="Company name" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.company}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={describe("company")}
            className={cn(inputBase, errors.company ? "border-red-500" : "border-ink/15")}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={cn(inputBase, errors.email ? "border-red-500" : "border-ink/15")}
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className={cn(inputBase, errors.phone ? "border-red-500" : "border-ink/15")}
          />
        </Field>

        <Field id="tankType" label="Tank type" error={errors.tankType}>
          <select
            id="tankType"
            name="tankType"
            value={values.tankType}
            onChange={(e) => set("tankType", e.target.value)}
            aria-invalid={!!errors.tankType}
            aria-describedby={describe("tankType")}
            className={cn(
              inputBase,
              "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
              values.tankType ? "text-ink" : "text-graphite/60",
              errors.tankType ? "border-red-500" : "border-ink/15"
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23235347' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select tank type…
            </option>
            {tankTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="location"
          label="Installation location"
          error={errors.location}
        >
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="Town / city / province"
            maxLength={FIELD_LIMITS.location}
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={!!errors.location}
            aria-describedby={describe("location")}
            className={cn(inputBase, errors.location ? "border-red-500" : "border-ink/15")}
          />
        </Field>

        <Field id="capacity" label="Required capacity (litres)" optional>
          <input
            id="capacity"
            name="capacity"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 50 000"
            maxLength={FIELD_LIMITS.capacity}
            value={values.capacity}
            onChange={(e) => set("capacity", e.target.value)}
            className={cn(inputBase, "border-ink/15")}
          />
        </Field>

        <Field id="application" label="Application / intended use" optional>
          <input
            id="application"
            name="application"
            type="text"
            placeholder="e.g. fire reserve, potable"
            maxLength={FIELD_LIMITS.application}
            value={values.application}
            onChange={(e) => set("application", e.target.value)}
            className={cn(inputBase, "border-ink/15")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="requirements" label="Project requirements" error={errors.requirements}>
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            maxLength={FIELD_LIMITS.requirements}
            placeholder="Tell us about the site, timing and anything else that will help us quote."
            value={values.requirements}
            onChange={(e) => set("requirements", e.target.value)}
            aria-invalid={!!errors.requirements}
            aria-describedby={describe("requirements")}
            className={cn(
              inputBase,
              "resize-y",
              errors.requirements ? "border-red-500" : "border-ink/15"
            )}
          />
        </Field>
      </div>

      {/* Privacy acknowledgement */}
      <div className="mt-5">
        <label htmlFor="consent" className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describe("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-forest-base focus-visible:ring-2 focus-visible:ring-brass"
          />
          <span className="font-body text-sm leading-6 text-ink/70">
            I agree to Pipeco contacting me about this enquiry and processing the
            details I’ve provided.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 font-body text-sm text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {serverError && (
        <p
          id="form-error"
          role="alert"
          className="mt-5 rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-brass px-7 py-3.5 font-display text-base font-semibold text-ink shadow-card transition-colors duration-200 ease-house hover:bg-brass-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="mt-3 font-body text-xs text-graphite">
        Required fields: name, company, email, phone, tank type, location and
        project requirements.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-graphite/70">(optional)</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-body text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

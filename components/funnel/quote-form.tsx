"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2, Pencil } from "lucide-react";

import {
  tankTypes,
  tankTypeValues,
  tankTypeLabel,
  solutionTypeValues,
  solutionLabel,
  FIELD_LIMITS,
  HONEYPOT_FIELD,
} from "@/config/quote-config";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/utils/cn";

type Values = {
  name: string;
  email: string;
  phone: string;
  tankType: string;
  capacity: string;
  location: string;
  requirements: string;
  solution: string;
  consent: boolean;
};

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  tankType: "",
  capacity: "",
  location: "",
  requirements: "",
  solution: "",
  consent: false,
};

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "tankType"
  | "location"
  | "requirements"
  | "consent";

type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Lenient phone check: at least 7 digits, allowing +, spaces, (), -, and dots.
const PHONE_RE = /^\+?[\d\s().-]{7,}$/;

const STEPS = [
  { title: "Your details", fields: ["name", "email", "phone"] as FieldKey[] },
  { title: "Tank requirements", fields: ["tankType"] as FieldKey[] },
  {
    title: "Project details",
    fields: ["location", "requirements", "consent"] as FieldKey[],
  },
] as const;

const LAST = STEPS.length - 1;

function fieldError(key: FieldKey, v: Values): string | undefined {
  switch (key) {
    case "name":
      return v.name.trim() ? undefined : "Please enter your name.";
    case "email":
      return EMAIL_RE.test(v.email.trim())
        ? undefined
        : "Please enter a valid email address.";
    case "phone":
      return PHONE_RE.test(v.phone.trim())
        ? undefined
        : "Please enter a valid phone number.";
    case "tankType":
      return tankTypeValues.includes(v.tankType)
        ? undefined
        : "Please choose a tank type.";
    case "location":
      return v.location.trim()
        ? undefined
        : "Please enter the installation location.";
    case "requirements":
      return v.requirements.trim()
        ? undefined
        : "Please tell us about your project.";
    case "consent":
      return v.consent ? undefined : "Please acknowledge the privacy note.";
  }
}

function collectErrors(keys: readonly FieldKey[], v: Values): Errors {
  const e: Errors = {};
  for (const key of keys) {
    const msg = fieldError(key, v);
    if (msg) e[key] = msg;
  }
  return e;
}

function stepOfField(key: FieldKey): number {
  return STEPS.findIndex((s) => s.fields.includes(key));
}

const waHref = `https://wa.me/${siteConfig.whatsapp}`;

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // Preselect context from a CTA: tank type (?tank=) and/or solution (?solution=).
  useEffect(() => {
    const tank = searchParams.get("tank");
    const solution = searchParams.get("solution");
    setValues((v) => {
      let next = v;
      if (tank && tankTypeValues.includes(tank) && !v.tankType) {
        next = { ...next, tankType: tank };
      }
      if (solution && solutionTypeValues.includes(solution) && !v.solution) {
        next = { ...next, solution };
      }
      return next;
    });
  }, [searchParams]);

  // On step change (not initial mount), move focus to the first field so the
  // step is announced and keyboard users land in the right place.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const first = panelRef.current?.querySelector<HTMLElement>(
      "input:not([type='hidden']), select, textarea"
    );
    first?.focus();
  }, [step]);

  function set<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "error") setServerError(null);
  }

  function focusFirstError() {
    const el = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    );
    el?.focus();
  }

  function goBack() {
    setErrors({});
    setServerError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  function goTo(target: number) {
    setErrors({});
    setServerError(null);
    setStep(Math.max(0, Math.min(LAST, target)));
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "submitting") return; // guard against duplicate submits

    // Intermediate steps: validate this step, then advance.
    if (step < LAST) {
      const e = collectErrors(STEPS[step].fields, values);
      setErrors(e);
      if (Object.keys(e).length > 0) {
        requestAnimationFrame(focusFirstError);
        return;
      }
      setErrors({});
      setStep((s) => s + 1);
      return;
    }

    // Final step: validate everything before submitting.
    const all = collectErrors(
      STEPS.flatMap((s) => s.fields),
      values
    );
    setErrors(all);
    if (Object.keys(all).length > 0) {
      const firstKey = (Object.keys(all) as FieldKey[])[0];
      setStep(stepOfField(firstKey));
      requestAnimationFrame(focusFirstError);
      return;
    }

    setServerError(null);
    setStatus("submitting");

    const honeypot =
      (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement)
        ?.value ?? "";

    const { consent, ...fields } = values;

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, consent, [HONEYPOT_FIELD]: honeypot }),
      });
      const payload = await res.json().catch(() => ({}));

      // Only celebrate when the server confirms the enquiry was delivered.
      if (res.ok && payload?.ok) {
        setStatus("success");
        return;
      }

      if (Array.isArray(payload?.fields)) {
        const known = new Set<FieldKey>(STEPS.flatMap((s) => s.fields));
        const fieldErrors: Errors = {};
        let earliest = LAST;
        for (const f of payload.fields as string[]) {
          if (known.has(f as FieldKey)) {
            fieldErrors[f as FieldKey] = "Please check this field.";
            earliest = Math.min(earliest, stepOfField(f as FieldKey));
          }
        }
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
          setStep(earliest);
        }
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
      <div className="rounded-[4px] border border-forest-base/12 bg-white p-8 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-base text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-forest-base">
          Thank you — we’ve got your enquiry.
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

  const describe = (key: FieldKey) => (errors[key] ? fid(`${key}-error`) : undefined);
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-[4px] border border-forest-base/12 bg-white p-6 sm:p-8 md:p-9 shadow-[0_1px_2px_rgba(5,31,32,0.04)]"
      aria-describedby={serverError ? fid("form-error") : undefined}
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

      {/* Progress */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-brass-dark">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="truncate font-body text-sm font-medium text-forest-base">
            {STEPS[step].title}
          </p>
        </div>
        <div
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-forest-base/12"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-brass transition-[width] duration-500 ease-house"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of {STEPS.length}: {STEPS[step].title}
        </p>
      </div>

      {/* Step panels */}
      <div
        ref={panelRef}
        key={step}
        className="mt-8 animate-stepIn motion-reduce:animate-none"
      >
        {step === 0 && (
          <div className="space-y-5">
            <Field id={fid("name")} label="Full name" error={errors.name}>
              <input
                id={fid("name")}
                name="name"
                type="text"
                autoComplete="name"
                maxLength={FIELD_LIMITS.name}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={describe("name")}
                className={inputCls(!!errors.name)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={fid("email")} label="Email address" error={errors.email}>
                <input
                  id={fid("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={FIELD_LIMITS.email}
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={describe("email")}
                  className={inputCls(!!errors.email)}
                />
              </Field>
              <Field id={fid("phone")} label="Phone number" error={errors.phone}>
                <input
                  id={fid("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={FIELD_LIMITS.phone}
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describe("phone")}
                  className={inputCls(!!errors.phone)}
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            {values.solution && (
              <div className="flex items-start gap-3 rounded-[3px] border border-brass/30 bg-brass/[0.06] px-4 py-3">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                <p className="font-body text-sm leading-6 text-ink/75">
                  Enquiry about{" "}
                  <span className="font-semibold text-forest-base">
                    {solutionLabel(values.solution)}
                  </span>
                  . Choose the tank type you have in mind, or select “Not sure” and
                  we’ll advise.
                </p>
              </div>
            )}
            <Field id={fid("tankType")} label="Tank type" error={errors.tankType}>
              <select
                id={fid("tankType")}
                name="tankType"
                value={values.tankType}
                onChange={(e) => set("tankType", e.target.value)}
                aria-invalid={!!errors.tankType}
                aria-describedby={describe("tankType")}
                className={cn(
                  inputCls(!!errors.tankType),
                  "appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-11",
                  values.tankType ? "text-ink" : "text-graphite/60"
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
              id={fid("capacity")}
              label="Approximate capacity"
              optional
              hint="Litres, if known — we can help you size it."
            >
              <input
                id={fid("capacity")}
                name="capacity"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 50 000"
                maxLength={FIELD_LIMITS.capacity}
                value={values.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                className={inputCls(false)}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field
              id={fid("location")}
              label="Installation location"
              error={errors.location}
            >
              <input
                id={fid("location")}
                name="location"
                type="text"
                autoComplete="address-level2"
                placeholder="Town / city / province"
                maxLength={FIELD_LIMITS.location}
                value={values.location}
                onChange={(e) => set("location", e.target.value)}
                aria-invalid={!!errors.location}
                aria-describedby={describe("location")}
                className={inputCls(!!errors.location)}
              />
            </Field>
            <Field
              id={fid("requirements")}
              label="Project requirements"
              error={errors.requirements}
            >
              <textarea
                id={fid("requirements")}
                name="requirements"
                rows={4}
                maxLength={FIELD_LIMITS.requirements}
                placeholder="Tell us about the site, timing and anything else that will help us quote."
                value={values.requirements}
                onChange={(e) => set("requirements", e.target.value)}
                aria-invalid={!!errors.requirements}
                aria-describedby={describe("requirements")}
                className={cn(inputCls(!!errors.requirements), "resize-y")}
              />
            </Field>

            {/* Review summary */}
            <div className="rounded-[3px] border border-forest-base/12 bg-paper/60">
              <div className="flex items-center justify-between border-b border-forest-base/10 px-4 py-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-forest-muted">
                  Review your enquiry
                </h3>
              </div>
              <dl className="divide-y divide-forest-base/8">
                <ReviewRow
                  label="Your details"
                  onEdit={() => goTo(0)}
                  lines={[
                    values.name,
                    values.email,
                    values.phone,
                  ].filter(Boolean)}
                />
                <ReviewRow
                  label="Tank"
                  onEdit={() => goTo(1)}
                  lines={[
                    tankTypeLabel(values.tankType) || "—",
                    values.capacity ? `${values.capacity} L (approx.)` : null,
                    values.solution ? `Re: ${solutionLabel(values.solution)}` : null,
                  ].filter(Boolean) as string[]}
                />
                <ReviewRow
                  label="Project"
                  lines={[
                    values.location,
                    values.requirements,
                  ].filter(Boolean)}
                />
              </dl>
            </div>

            {/* Privacy acknowledgement */}
            <div>
              <label htmlFor={fid("consent")} className="flex items-start gap-3">
                <input
                  id={fid("consent")}
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describe("consent")}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-forest-base focus-visible:ring-2 focus-visible:ring-brass"
                />
                <span className="font-body text-sm leading-6 text-ink/70">
                  I agree to Pipeco contacting me about this enquiry and processing
                  the details I’ve provided.
                </span>
              </label>
              {errors.consent && (
                <p
                  id={fid("consent-error")}
                  className="mt-1.5 font-body text-sm text-red-600"
                >
                  {errors.consent}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {serverError && (
        <p
          id={fid("form-error")}
          role="alert"
          className="mt-6 rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
        >
          {serverError}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            disabled={status === "submitting"}
            className="group inline-flex items-center gap-2 rounded-[2px] border border-forest-base/20 px-5 py-3 font-display text-base font-semibold text-forest-base transition-colors duration-200 ease-house hover:border-forest-base hover:bg-forest-base hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-house group-hover:-translate-x-0.5" />
            Back
          </button>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group ml-auto inline-flex items-center justify-center gap-2.5 rounded-[2px] bg-brass px-7 py-3.5 font-display text-base font-semibold text-ink shadow-card transition-colors duration-200 ease-house hover:bg-brass-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : step < LAST ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
            </>
          ) : (
            <>
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputBase =
  "w-full rounded-[3px] border bg-white px-4 py-3 font-body text-[15px] text-ink placeholder:text-graphite/45 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:border-brass";

function inputCls(hasError: boolean) {
  return cn(inputBase, hasError ? "border-red-500" : "border-forest-base/15");
}

function Field({
  id,
  label,
  error,
  optional,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-body text-[15px] font-semibold text-forest-base"
      >
        {label}
        {optional && (
          <span className="ml-1.5 text-[13px] font-normal text-graphite/70">
            (optional)
          </span>
        )}
      </label>
      {hint && (
        <p className="mt-0.5 font-body text-[13px] leading-5 text-graphite">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-body text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewRow({
  label,
  lines,
  onEdit,
}: {
  label: string;
  lines: string[];
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-start gap-4 px-4 py-3">
      <dt className="w-20 shrink-0 font-body text-xs uppercase tracking-[0.1em] text-graphite">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 font-body text-sm text-ink/80">
        {lines.length > 0 ? (
          lines.map((line, i) => (
            <p key={i} className={cn("truncate", i > 0 && "mt-0.5 text-ink/60")}>
              {line}
            </p>
          ))
        ) : (
          <span className="text-graphite/60">—</span>
        )}
      </dd>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center gap-1 font-body text-xs font-semibold text-forest-muted underline-offset-4 transition-colors hover:text-brass-dark hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      )}
    </div>
  );
}

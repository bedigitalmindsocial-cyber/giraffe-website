'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from 'react';
import { Modal } from '@/components/Modal';
import type { Role } from '@/lib/types';
import { APPLY_EVENT, type ApplyEventDetail } from '@/lib/applyEvent';

type ApplyFormProps = {
  roles: Role[];
};

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXT = ['pdf', 'doc', 'docx'] as const;

type FormState = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cv: File | null;
  note: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  cv: null,
  note: '',
};

export function ApplyForm({ roles }: ApplyFormProps) {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Listen for "apply to this role" events
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ApplyEventDetail>).detail;
      if (!detail) return;
      setValues((v) => ({ ...v, role: detail.roleSlug }));
      setErrors((e) => ({ ...e, role: undefined }));
    };
    window.addEventListener(APPLY_EVENT, handler);
    return () => window.removeEventListener(APPLY_EVENT, handler);
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (state: FormState): Errors => {
    const next: Errors = {};
    if (!state.role) next.role = 'Please pick a role.';
    if (!state.firstName.trim()) next.firstName = 'Please tell us your first name.';
    if (!state.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      next.email = 'That email does not look right.';
    }
    if (!state.cv) {
      next.cv = 'Please attach your CV.';
    } else {
      const ext = state.cv.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_EXT.includes(ext as (typeof ALLOWED_EXT)[number])) {
        next.cv = 'Only PDF, DOC, or DOCX files.';
      } else if (state.cv.size > MAX_FILE_BYTES) {
        next.cv = 'File is over 10MB.';
      }
    }
    if (state.note.length > 1000) {
      next.note = 'Note is over 1000 characters.';
    }
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wp-lwg.giraffe.partners';
      const fullName =
        values.firstName.trim() +
        (values.lastName.trim() ? ' ' + values.lastName.trim() : '');
      
      const formData = new FormData();
      formData.set('name', fullName);
      formData.set('email', values.email);
      formData.set('phone', values.phone);
      formData.set('role', values.role);
      formData.set('note', values.note);
      if (values.cv) formData.set('cv', values.cv);

      console.log('[ApplyForm] Submitting...');

      const res = await fetch(`${apiBase}/wp-json/lwg/v1/applications`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json().catch(() => ({}));

      console.log('[ApplyForm] Response:', res.status, json);

      if (!res.ok) {
        if (res.status === 422 && json.errors) {
          const mapped: Errors = { ...json.errors };
          if ('name' in json.errors) {
            mapped.firstName = json.errors.name;
            delete (mapped as Record<string, unknown>).name;
          }
          setErrors(mapped);
          return;
        }

        let message = json.error || json.message || `Failed (${res.status}). Please try again.`;
        setErrors({ firstName: message });
        return;
      }

      console.log('[ApplyForm] ✅ Success!');
      setSubmitted(true);
    } catch (err) {
      console.error('[ApplyForm] Error:', err);
      setErrors({
        firstName: 'Could not reach the server. Check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFiles = (file: File | null) => {
    if (!file) {
      update('cv', null);
      return;
    }
    update('cv', file);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    handleFiles(file);
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFiles(file);
  };

  const handleSuccessClose = () => {
    setSubmitted(false);
    setValues(empty);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Role */}
      <Field label="Which role" htmlFor="apply-role" error={errors.role}>
        <select
          id="apply-role"
          required
          value={values.role}
          onChange={(e) => update('role', e.target.value)}
          className="apply-input"
        >
          <option value="">Pick a role</option>
          {roles.map((role) => (
            <option key={role.slug} value={role.slug}>
              {role.title}
            </option>
          ))}
          <option value="general">Send a general note (not for a specific role)</option>
        </select>
      </Field>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Field
          label="First name"
          htmlFor="apply-first-name"
          error={errors.firstName}
        >
          <input
            id="apply-first-name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            value={values.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="apply-input"
          />
        </Field>
        <Field
          label="Last name (optional)"
          htmlFor="apply-last-name"
          error={errors.lastName}
        >
          <input
            id="apply-last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            value={values.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="apply-input"
          />
        </Field>
      </div>

      {/* Email */}
      <Field label="Email" htmlFor="apply-email" error={errors.email}>
        <input
          id="apply-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Where we should reply"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          className="apply-input"
        />
      </Field>

      {/* Phone */}
      <Field
        label="Phone (optional)"
        htmlFor="apply-phone"
        error={errors.phone}
      >
        <input
          id="apply-phone"
          type="tel"
          autoComplete="tel"
          placeholder="For a follow-up call if needed"
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="apply-input"
        />
      </Field>

      {/* CV upload */}
      <Field label="Your CV" htmlFor="apply-cv" error={errors.cv}>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Upload your CV"
          className={`bg-paper border border-dashed rounded-sm h-20 flex items-center justify-center px-4 cursor-pointer transition-colors ${
            dragOver
              ? 'border-paper bg-mid-purple-4'
              : 'border-mid-purple-2 hover:border-paper'
          }`}
        >
          {values.cv ? (
            <div className="w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 inline-flex items-center justify-center bg-accent-purple text-paper font-mono text-[11px]">
                  FILE
                </span>
                <span className="font-sans font-medium text-[14px] text-ink truncate">
                  {values.cv.name}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFiles(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                aria-label="Remove file"
                className="text-mid-purple-1 hover:text-ink font-sans text-[16px]"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-sans text-[14px] text-ink">
                Drop your CV here or click to upload
              </p>
              <p className="font-sans text-[12px] text-mid-purple-1 mt-1">
                PDF, DOC, or DOCX. Up to 10MB.
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          id="apply-cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFileInputChange}
          className="sr-only"
        />
      </Field>

      {/* Note */}
      <Field
        label="Why this role fits you (optional)"
        htmlFor="apply-note"
        error={errors.note}
      >
        <textarea
          id="apply-note"
          rows={4}
          maxLength={1000}
          placeholder="One paragraph is plenty. Tell us about a piece of work you are proud of, or why this role caught your eye."
          value={values.note}
          onChange={(e) => update('note', e.target.value)}
          className="apply-input apply-textarea"
        />
      </Field>

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="group w-full md:w-auto md:min-w-[240px] inline-flex items-center justify-center gap-3 h-14 px-8 bg-paper text-ink font-sans font-medium text-[13px] uppercase tracking-[0.04em] rounded-full hover:bg-deep-purple hover:text-paper transition-all disabled:opacity-60"
        >
          <span>{submitting ? 'Sending…' : 'Send application'}</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="mt-4 font-sans text-[13px] text-mid-purple-2 text-center md:text-left">
          A senior partner reads every application within a week.
        </p>
        <p className="mt-1 font-sans italic text-[12px] text-mid-purple-1 text-center md:text-left">
          Your details are used only for hiring. We do not share them, and we
          do not add you to any list.
        </p>
      </div>
    </form>

    <Modal
      open={submitted}
      onClose={handleSuccessClose}
      labelledBy="apply-success-title"
      variant="overlay"
      innerClassName="max-w-lg"
    >
      <div className="relative bg-paper p-10 md:p-14 text-center">
        <button
          type="button"
          onClick={handleSuccessClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center text-mid-purple-1 hover:text-ink hover:bg-mid-purple-5 rounded-full font-sans text-2xl leading-none"
        >
          ×
        </button>
        <p className="eyebrow text-mid-purple-1">Application sent</p>
        <h3
          id="apply-success-title"
          className="font-editorial text-[28px] md:text-[34px] text-ink mt-5 leading-tight"
        >
          Thank you.
        </h3>
        <p className="font-sans text-[16px] text-ink/75 mt-4 max-w-sm mx-auto leading-relaxed">
          A senior partner will read your application within a week. We will
          reply whether or not there is a fit.
        </p>
        <button
          type="button"
          onClick={handleSuccessClose}
          className="mt-8 font-mono text-[11px] tracking-[0.18em] uppercase text-accent-purple hover:text-deep-purple transition-colors"
        >
          ← Back to the form
        </button>
      </div>
    </Modal>
    </>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-mid-purple-2 mb-2"
      >
        {label}
      </label>
      <div aria-describedby={errorId}>{children}</div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 inline-flex items-center gap-2 font-sans font-medium text-[12px] text-paper bg-red-600 px-3 py-1.5 rounded-sm shadow-sm"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

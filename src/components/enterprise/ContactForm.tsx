"use client";
import { useState } from "react";

type FormFieldType = "text" | "email" | "tel" | "select" | "multiselect" | "radio" | "textarea";

interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

interface ContactFormProps {
  segment: "llm" | "pharma" | "legal-finance" | "institutions" | "publisher";
  recipientEmail: string;
  subjectPrefix: string;
  fields: FormField[];
  submitLabel: string;
}

export function ContactForm({ segment, fields, submitLabel }: ContactFormProps) {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rgpd, setRgpd] = useState(false);
  const [rgpdError, setRgpdError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function setValue(name: string, value: string | string[]) {
    setValues(v => ({ ...v, [name]: value }));
    setErrors(e => ({ ...e, [name]: "" }));
  }

  function toggleMulti(name: string, option: string) {
    const current = (values[name] as string[]) || [];
    setValue(name, current.includes(option) ? current.filter(x => x !== option) : [...current, option]);
  }

  function validate() {
    const errs: Record<string, string> = {};
    fields.forEach(f => {
      if (!f.required) return;
      const v = values[f.name];
      if (!v || (Array.isArray(v) && v.length === 0) || v === "") errs[f.name] = "Champ requis";
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v as string)) errs[f.name] = "Email invalide";
    });
    setErrors(errs);
    if (!rgpd) setRgpdError("Vous devez accepter le traitement de vos données.");
    else setRgpdError("");
    return Object.keys(errs).length === 0 && rgpd;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment, payload: values, rgpd_consent: true }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Erreur lors de l'envoi");
      }
      setSuccess(true);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors";

  if (success) {
    return (
      <div className="border border-trust-high/30 bg-trust-high/5 rounded-lg p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-trust-high/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-trust-high text-xl">✓</span>
        </div>
        <p className="text-sm font-display text-text-primary mb-2">Demande reçue.</p>
        <p className="text-xs text-text-muted">Notre équipe revient vers vous sous 48h.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {fields.map(f => (
        <div key={f.name}>
          <label className="block text-xs font-mono text-text-secondary uppercase tracking-widest mb-1.5">
            {f.label}{f.required && <span className="text-trust-low ml-1">*</span>}
          </label>
          {(f.type === "text" || f.type === "email" || f.type === "tel") && (
            <input type={f.type} value={(values[f.name] as string) || ""} onChange={e => setValue(f.name, e.target.value)} placeholder={f.placeholder} className={inputCls} />
          )}
          {f.type === "textarea" && (
            <textarea rows={4} value={(values[f.name] as string) || ""} onChange={e => setValue(f.name, e.target.value)} placeholder={f.placeholder} className={`${inputCls} resize-none`} />
          )}
          {f.type === "select" && (
            <select value={(values[f.name] as string) || ""} onChange={e => setValue(f.name, e.target.value)} className={inputCls}>
              <option value="">Sélectionner...</option>
              {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
          {f.type === "radio" && (
            <div className="flex flex-wrap gap-2">
              {f.options?.map(o => (
                <button key={o} onClick={() => setValue(f.name, o)} className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors cursor-pointer ${values[f.name] === o ? "bg-accent text-white border-accent" : "border-border text-text-secondary hover:border-accent hover:text-accent"}`}>{o}</button>
              ))}
            </div>
          )}
          {f.type === "multiselect" && (
            <div className="flex flex-wrap gap-2">
              {f.options?.map(o => {
                const selected = ((values[f.name] as string[]) || []).includes(o);
                return (
                  <button key={o} onClick={() => toggleMulti(f.name, o)} className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors cursor-pointer ${selected ? "bg-accent text-white border-accent" : "border-border text-text-secondary hover:border-accent hover:text-accent"}`}>{o}</button>
                );
              })}
            </div>
          )}
          {errors[f.name] && <p className="text-2xs text-trust-low mt-1">{errors[f.name]}</p>}
        </div>
      ))}

      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={rgpd} onChange={e => { setRgpd(e.target.checked); setRgpdError(""); }} className="mt-0.5 flex-shrink-0 accent-blue-600" />
          <span className="text-xs text-text-muted leading-relaxed">
            J&apos;accepte que KAKAPO traite mes données personnelles pour répondre à ma demande, conformément au RGPD. Ces données ne seront pas transmises à des tiers.
          </span>
        </label>
        {rgpdError && <p className="text-2xs text-trust-low mt-1">{rgpdError}</p>}
      </div>

      <button onClick={handleSubmit} disabled={loading} className="w-full bg-accent hover:bg-accent-hover text-white text-sm font-mono py-3 rounded transition-colors disabled:opacity-50 cursor-pointer">
        {loading ? "Envoi en cours..." : submitLabel}
      </button>

      {submitError && (
        <div className="border border-trust-low/30 bg-trust-low/5 rounded p-4">
          <p className="text-xs text-trust-low mb-2">{submitError}</p>
          <p className="text-2xs text-text-muted">
            Écrivez-nous directement à{" "}
            <a href="mailto:partnerships@kakapo.io" className="text-accent font-mono">partnerships@kakapo.io</a>
          </p>
        </div>
      )}
    </div>
  );
}

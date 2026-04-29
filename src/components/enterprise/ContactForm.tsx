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

export function ContactForm({ segment, recipientEmail, subjectPrefix, fields, submitLabel }: ContactFormProps) {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function setValue(name: string, value: string | string[]) {
    setValues(v => ({ ...v, [name]: value }));
    setErrors(e => ({ ...e, [name]: "" }));
  }

  function toggleMulti(name: string, option: string) {
    const current = (values[name] as string[]) || [];
    if (current.includes(option)) {
      setValue(name, current.filter(x => x !== option));
    } else {
      setValue(name, [...current, option]);
    }
  }

  function validate() {
    const errs: Record<string, string> = {};
    fields.forEach(f => {
      if (!f.required) return;
      const v = values[f.name];
      if (!v || (Array.isArray(v) && v.length === 0) || v === "") {
        errs[f.name] = "Champ requis";
      }
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v as string)) {
        errs[f.name] = "Email invalide";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const societe = (values["societe"] || values["structure"] || "Inconnu") as string;
    const subject = encodeURIComponent(`${subjectPrefix} Demande de contact – ${societe}`);
    const bodyLines = fields.map(f => {
      const v = values[f.name];
      if (!v || (Array.isArray(v) && v.length === 0)) return null;
      const val = Array.isArray(v) ? v.join(", ") : v;
      return `${f.label}: ${val}`;
    }).filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputCls = "w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors";

  return (
    <div className="space-y-5">
      {fields.map(f => (
        <div key={f.name}>
          <label className="block text-xs font-mono text-text-secondary uppercase tracking-widest mb-1.5">
            {f.label}{f.required && <span className="text-trust-low ml-1">*</span>}
          </label>
          {f.type === "text" || f.type === "email" || f.type === "tel" ? (
            <input
              type={f.type}
              value={(values[f.name] as string) || ""}
              onChange={e => setValue(f.name, e.target.value)}
              placeholder={f.placeholder}
              className={inputCls}
            />
          ) : f.type === "textarea" ? (
            <textarea
              rows={4}
              value={(values[f.name] as string) || ""}
              onChange={e => setValue(f.name, e.target.value)}
              placeholder={f.placeholder}
              className={`${inputCls} resize-none`}
            />
          ) : f.type === "select" ? (
            <select
              value={(values[f.name] as string) || ""}
              onChange={e => setValue(f.name, e.target.value)}
              className={inputCls}
            >
              <option value="">Sélectionner...</option>
              {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === "radio" ? (
            <div className="flex flex-wrap gap-2">
              {f.options?.map(o => (
                <button
                  key={o}
                  onClick={() => setValue(f.name, o)}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                    values[f.name] === o
                      ? "bg-accent text-white border-accent"
                      : "border-border text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : f.type === "multiselect" ? (
            <div className="flex flex-wrap gap-2">
              {f.options?.map(o => {
                const selected = ((values[f.name] as string[]) || []).includes(o);
                return (
                  <button
                    key={o}
                    onClick={() => toggleMulti(f.name, o)}
                    className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                      selected
                        ? "bg-accent text-white border-accent"
                        : "border-border text-text-secondary hover:border-accent hover:text-accent"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          ) : null}
          {errors[f.name] && <p className="text-2xs text-trust-low mt-1">{errors[f.name]}</p>}
        </div>
      ))}

      <div className="pt-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-accent hover:bg-accent-hover text-white text-sm font-mono py-3 rounded transition-colors cursor-pointer"
        >
          {submitLabel}
        </button>
        {sent && (
          <p className="text-xs text-trust-high mt-3 text-center">
            Votre client mail devrait s'ouvrir. Si ce n'est pas le cas :
          </p>
        )}
        <p className="text-2xs text-text-muted mt-3 text-center">
          Si votre client mail ne s'ouvre pas, écrivez-nous directement à{" "}
          <a href={`mailto:${recipientEmail}`} className="text-accent font-mono">{recipientEmail}</a>
        </p>
      </div>
    </div>
  );
}

export default function FormField({ id, label, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-brand-cream">
        {label}{required && <span className="text-brand-yellow"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-white/50">{hint}</p>}
      {error && <p id={`${id}-err`} className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export const inputClass =
  'w-full bg-[#10171A] border border-white/15 rounded-lg px-4 py-3 text-brand-cream placeholder:text-white/30 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition [color-scheme:dark]';

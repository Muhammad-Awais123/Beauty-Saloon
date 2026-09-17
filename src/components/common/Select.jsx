import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  required = false,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <select
          id={selectId}
          required={required}
          className={`block w-full appearance-none rounded-lg border bg-white py-2.5 pl-3.5 pr-10 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600 focus:border-clinic-600 transition-colors ${
            error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' 
              : 'border-charcoal-200'
          } ${className}`}
          {...props}
        >
          {options.map((opt, i) => {
            if (typeof opt === 'string') {
              return <option key={i} value={opt}>{opt}</option>;
            }
            return <option key={opt.value || i} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-charcoal-500">{helperText}</p>}
    </div>
  );
}

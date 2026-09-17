import React from 'react';

export default function Table({
  headers = [],
  children,
  className = '',
  responsive = true
}) {
  const content = (
    <table className={`w-full text-left text-sm border-collapse ${className}`}>
      <thead>
        <tr className="border-b border-charcoal-200 bg-surface-muted text-charcoal-700 text-xs font-semibold uppercase tracking-wider">
          {headers.map((h, i) => (
            <th key={i} className={`py-3.5 px-4 font-semibold ${h.align === 'right' ? 'text-right' : h.align === 'center' ? 'text-center' : 'text-left'} ${h.className || ''}`}>
              {typeof h === 'string' ? h : h.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-charcoal-100 bg-white">
        {children}
      </tbody>
    </table>
  );

  if (responsive) {
    return (
      <div className="w-full overflow-x-auto rounded-xl border border-charcoal-200 bg-white shadow-subtle">
        {content}
      </div>
    );
  }

  return content;
}

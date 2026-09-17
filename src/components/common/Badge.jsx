import React from 'react';

export default function Badge({
  children,
  variant = 'default', // default | success | warning | danger | info | sage | sand
  size = 'md', // sm | md
  className = ''
}) {
  const variantClasses = {
    default: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    sage: 'bg-clinic-100 text-clinic-800 border-clinic-200',
    sand: 'bg-sand-100 text-sand-800 border-sand-200'
  }[variant] || 'bg-charcoal-100 text-charcoal-700 border-charcoal-200';

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 rounded font-medium',
    md: 'text-xs px-2.5 py-1 rounded-md font-medium'
  }[size] || '';

  return (
    <span className={`inline-flex items-center gap-1 border ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}

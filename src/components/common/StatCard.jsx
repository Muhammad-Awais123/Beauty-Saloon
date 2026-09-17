import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive,
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-white border border-charcoal-200 shadow-card card-hover-effect text-left ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">{title}</p>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-clinic-50 text-clinic-700 border border-clinic-100">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-charcoal-900">{value}</h3>
      </div>

      {(subtitle || change) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          {change && (
            <span className={`inline-flex items-center font-semibold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
          )}
          {subtitle && <span className="text-charcoal-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

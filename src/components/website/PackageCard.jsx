import React from 'react';
import { Check, Calendar, Sparkles, Clock } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function PackageCard({ pkg, onBook }) {
  return (
    <div className={`relative flex flex-col rounded-2xl bg-white border card-hover-effect shadow-card text-left p-6 sm:p-7 ${
      pkg.popular ? 'border-clinic-600 ring-2 ring-clinic-600' : 'border-charcoal-200'
    }`}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-clinic-700 text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Most Popular Experience
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="sand" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            {pkg.duration}
          </Badge>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Save ${pkg.savings}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-2">
          {pkg.name}
        </h3>
        <p className="text-xs text-charcoal-600 leading-relaxed">
          {pkg.tagline}
        </p>
      </div>

      {/* Pricing */}
      <div className="py-4 border-y border-charcoal-100 mb-5 flex items-baseline gap-2">
        <span className="text-3xl font-serif font-bold text-clinic-900">
          ${pkg.price}
        </span>
        <span className="text-sm text-charcoal-400 line-through">
          ${pkg.originalPrice}
        </span>
        <span className="text-xs text-charcoal-500 font-medium ml-auto">
          All-inclusive
        </span>
      </div>

      {/* Treatments list */}
      <div className="flex-1 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-3">
          Treatments Included:
        </p>
        <ul className="space-y-2.5">
          {pkg.treatmentsIncluded.map((treatment, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-charcoal-700">
              <div className="p-0.5 rounded-full bg-clinic-100 text-clinic-800 shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="leading-snug">{treatment}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended For */}
      {pkg.recommendedFor && (
        <div className="mb-6 p-3 rounded-lg bg-surface-soft border border-charcoal-100 text-[11px] text-charcoal-600 leading-relaxed">
          <strong className="text-charcoal-800">Ideal for: </strong>
          {pkg.recommendedFor}
        </div>
      )}

      {/* Book CTA */}
      <Button
        to={`/appointments?package=${pkg.id}&price=${pkg.price}`}
        variant={pkg.popular ? 'primary' : 'outline'}
        size="md"
        icon={Calendar}
        className="w-full"
      >
        Book This Package
      </Button>
    </div>
  );
}

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import Badge from '../common/Badge';

export default function TestimonialCard({ review }) {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-charcoal-200 shadow-card card-hover-effect text-left">
      <div>
        {/* Rating and verified badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-charcoal-200'
                }`}
              />
            ))}
          </div>

          {review.verified && (
            <Badge variant="sage" size="sm" className="gap-1">
              <CheckCircle className="w-3 h-3 text-clinic-700" />
              Verified Patient
            </Badge>
          )}
        </div>

        {/* Treatment tag */}
        {review.treatment && (
          <p className="text-xs font-semibold text-clinic-700 mb-2 uppercase tracking-wide">
            Treatment: {review.treatment}
          </p>
        )}

        {/* Quote */}
        <p className="text-sm text-charcoal-700 leading-relaxed italic mb-6">
          "{review.comment}"
        </p>
      </div>

      {/* Patient info */}
      <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar || '/images/team/team-doctor-03.jpg'}
            alt={review.name}
            className="w-9 h-9 rounded-full object-cover border border-charcoal-200"
          />
          <div>
            <h4 className="text-xs font-bold text-charcoal-900">{review.name}</h4>
            <p className="text-[11px] text-charcoal-500">{review.role || 'Patient'}</p>
          </div>
        </div>
        <span className="text-[10px] text-charcoal-400">{review.date}</span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Star, Check, X, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AdminReviews() {
  const { reviews, updateReviewStatus, toggleFeatureReview } = useApp();
  const [ratingFilter, setRatingFilter] = useState('all');

  const filteredReviews = reviews.filter(r => {
    if (ratingFilter === 'all') return true;
    return r.rating === Number(ratingFilter);
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Patient Reviews & Moderation
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Review patient feedback, approve verified clinic testimonials, and highlight featured quotes.
          </p>
        </div>

        <div className="w-48">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          >
            <option value="all">All Star Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars Only</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <Table
        headers={[
          'Patient & Date',
          'Treatment',
          'Rating',
          'Review Content',
          'Featured',
          { label: 'Moderation Actions', align: 'right' }
        ]}
      >
        {filteredReviews.map((rev) => (
          <tr key={rev.id} className="hover:bg-surface-soft transition-colors">
            
            {/* Patient & Date */}
            <td className="py-3.5 px-4">
              <strong className="text-xs text-charcoal-900 block font-bold">{rev.name}</strong>
              <span className="text-[11px] text-charcoal-400">{rev.date}</span>
            </td>

            {/* Treatment */}
            <td className="py-3.5 px-4 text-xs font-semibold text-clinic-800">
              {rev.treatment || 'Clinical Consultation'}
            </td>

            {/* Rating */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-0.5 text-amber-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{rev.rating}.0</span>
              </div>
            </td>

            {/* Comment */}
            <td className="py-3.5 px-4 text-xs text-charcoal-600 max-w-sm">
              <p className="line-clamp-2 italic">"{rev.comment}"</p>
            </td>

            {/* Featured */}
            <td className="py-3.5 px-4">
              <button
                onClick={() => toggleFeatureReview(rev.id)}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  rev.featured
                    ? 'bg-clinic-100 text-clinic-900 border-clinic-300'
                    : 'bg-surface-soft text-charcoal-400 border-charcoal-200 hover:text-charcoal-700'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${rev.featured ? 'text-clinic-700' : ''}`} />
                <span>{rev.featured ? 'Hero Featured' : 'Feature'}</span>
              </button>
            </td>

            {/* Moderation */}
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                {rev.status !== 'approved' && (
                  <button
                    onClick={() => updateReviewStatus(rev.id, 'approved')}
                    title="Approve Review"
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {rev.status !== 'rejected' && (
                  <button
                    onClick={() => updateReviewStatus(rev.id, 'rejected')}
                    title="Reject Review"
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </Table>

    </div>
  );
}

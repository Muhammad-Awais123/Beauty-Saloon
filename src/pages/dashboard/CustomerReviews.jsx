import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Star, CheckCircle, Send, MessageSquare } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

export default function CustomerReviews() {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { reviews, submitReview, services } = useApp();

  const prefillService = searchParams.get('service') || services[0]?.name || 'HydraFacial Elite Rejuvenation';

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [treatment, setTreatment] = useState(prefillService);
  const [comment, setComment] = useState('');

  const userReviews = reviews.filter(r => r.name.toLowerCase() === (currentUser?.name || 'Emily Watson').toLowerCase() || r.name.includes('Emily'));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment) {
      toast.error('Please write a brief feedback comment.');
      return;
    }

    submitReview({
      name: currentUser?.name || 'Emily Watson',
      role: 'Verified Patient',
      treatment: treatment,
      rating: rating,
      comment: comment
    });

    setComment('');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card">
        <h1 className="text-2xl font-serif font-bold text-charcoal-900">
          Treatment Reviews & Clinical Feedback
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Share your experience to help other patients and support our clinical quality standards.
        </p>
      </div>

      {/* Submit New Review Card */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card">
        <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-clinic-700" />
          Leave a Review for Your Recent Treatment
        </h3>
        <p className="text-xs text-charcoal-500 mb-6">
          Your feedback will be published with a "Verified Patient" badge.
        </p>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          
          {/* Star Selector */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-charcoal-300 transition-colors focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-charcoal-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-charcoal-700 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <Select
            label="Treatment Received"
            options={services.map(s => s.name)}
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Your Review / Experience
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your session, comfort during treatment, doctor attentiveness, and results..."
              className="w-full rounded-lg border border-charcoal-200 p-3.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>

          <Button type="submit" variant="primary" size="md" icon={Send}>
            Submit Patient Review
          </Button>
        </form>
      </div>

      {/* Previously Submitted Reviews */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card">
        <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-4">
          Your Verified Reviews ({userReviews.length})
        </h3>

        {userReviews.length > 0 ? (
          <div className="space-y-4">
            {userReviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl bg-surface-soft border border-charcoal-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-charcoal-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-charcoal-400">{rev.date}</span>
                </div>
                <p className="text-xs font-bold text-clinic-800 mb-1">{rev.treatment}</p>
                <p className="text-xs text-charcoal-700 leading-relaxed italic">"{rev.comment}"</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="sage" size="sm">
                    <CheckCircle className="w-3 h-3 text-clinic-700" />
                    Published & Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-charcoal-500 py-4 text-center">
            You haven't submitted any reviews yet.
          </p>
        )}
      </div>

    </div>
  );
}

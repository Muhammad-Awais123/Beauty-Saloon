import React from 'react';
import { Sparkles, Home, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-surface-soft text-center">
      <div className="max-w-md bg-white rounded-2xl border border-charcoal-200 p-10 shadow-card space-y-5">
        <span className="text-6xl sm:text-7xl font-serif font-bold text-clinic-900 block">
          404
        </span>
        <div className="w-12 h-0.5 bg-clinic-700 mx-auto" />
        <h1 className="text-2xl font-serif font-bold text-charcoal-900">
          Page Not Located
        </h1>
        <p className="text-xs text-charcoal-600 leading-relaxed">
          The aesthetic clinic page you are looking for may have been relocated or updated in our directory.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md" icon={Home}>
            Back Home
          </Button>
          <Button to="/services" variant="outline" size="md" icon={ArrowRight} iconPosition="right">
            Explore Services
          </Button>
        </div>
      </div>
    </div>
  );
}

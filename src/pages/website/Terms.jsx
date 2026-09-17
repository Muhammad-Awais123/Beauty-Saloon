import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';

export default function Terms() {
  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 sm:p-12 shadow-card space-y-6 text-charcoal-700 text-xs sm:text-sm leading-relaxed">
          <SectionHeading
            badge="Terms of Service"
            title="Clinic Terms & Appointment Policies"
            subtitle="Last updated: January 2026"
            align="left"
            className="mb-8"
          />

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">1. Appointment Cancellations & Rescheduling</h3>
          <p>
            To respect the dedicated preparation of our physician suites, we require at least 24 hours advance notice to cancel or reschedule appointments without penalty. Rescheduling can be executed seamlessly online through your Customer Portal.
          </p>

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">2. Medical Suitability & Pre-Screening</h3>
          <p>
            All treatments are contingent upon a clinical evaluation by our practicing physicians. If a medical condition, contraindication, or pregnancy renders a procedure unsuitable, our doctors will recommend safe alternative therapies or issue a full refund.
          </p>

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">3. Package Expirations & Transfers</h3>
          <p>
            Curated treatment packages remain valid for 12 months from the date of purchase. Sessions can be scheduled flexibly according to recommended clinical healing intervals.
          </p>
        </div>
      </div>
    </div>
  );
}

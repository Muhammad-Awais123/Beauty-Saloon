import React from 'react';
import BookingWizard from '../../components/booking/BookingSteps';
import SectionHeading from '../../components/common/SectionHeading';
import { ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export default function AppointmentBooking() {
  return (
    <div className="bg-surface-soft min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <SectionHeading
            badge="Online Reservation Engine"
            title="Reserve Your Clinical Treatment"
            subtitle="Select your preferred procedure, medical specialist, date, and convenient time slot."
          />
        </div>

        {/* 7-Step Interactive Booking Engine */}
        <BookingWizard />

        {/* Reassurance Features */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-charcoal-600">
          <div className="p-4 rounded-xl bg-white border border-charcoal-200">
            <ShieldCheck className="w-5 h-5 text-clinic-700 mx-auto mb-2" />
            <strong className="text-charcoal-900 block font-semibold mb-0.5">Zero Cancellation Fee</strong>
            <span>Cancel or reschedule up to 24 hours prior to appointment.</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-charcoal-200">
            <Award className="w-5 h-5 text-clinic-700 mx-auto mb-2" />
            <strong className="text-charcoal-900 block font-semibold mb-0.5">Physician-Led Procedures</strong>
            <span>Board-certified dermatologists & licensed medical aestheticians.</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-charcoal-200">
            <Clock className="w-5 h-5 text-clinic-700 mx-auto mb-2" />
            <strong className="text-charcoal-900 block font-semibold mb-0.5">Instant Confirmation</strong>
            <span>Automated calendar sync and digital preparation guide.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

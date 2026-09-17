import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';

export default function Privacy() {
  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 sm:p-12 shadow-card space-y-6 text-charcoal-700 text-xs sm:text-sm leading-relaxed">
          <SectionHeading
            badge="Legal & Discretion"
            title="Privacy Policy & Medical Data Protection"
            subtitle="Last updated: January 2026"
            align="left"
            className="mb-8"
          />

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">1. HIPAA & Patient Confidentiality</h3>
          <p>
            Élan Aesthetic Clinic adheres to the highest medical confidentiality and patient privacy standards under HIPAA regulations. All health histories, 3D skin analysis photographs, and procedure notes are encrypted and stored in secure, access-restricted medical record systems.
          </p>

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">2. Information We Collect</h3>
          <p>
            When booking an appointment or contacting our concierge, we collect your contact information (name, email, telephone), medical screening responses, and simulated payment confirmation data strictly for appointment fulfillment and pre-treatment safety protocols.
          </p>

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">3. Photography & Consent</h3>
          <p>
            Before-and-after photographs are captured solely for clinical diagnostic comparison. No photographs are published or utilized in our gallery without explicit, written, signed patient consent.
          </p>

          <h3 className="text-base font-serif font-bold text-charcoal-900 pt-2">4. Third-Party Sharing</h3>
          <p>
            We never sell, rent, or distribute patient contact details or medical information to third-party advertisers or commercial entities.
          </p>
        </div>
      </div>
    </div>
  );
}

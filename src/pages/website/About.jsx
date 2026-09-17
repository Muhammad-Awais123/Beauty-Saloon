import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, CheckCircle2, Calendar, Sparkles, Stethoscope, Microscope } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';

export default function About() {
  return (
    <div className="bg-surface-soft text-left">
      
      {/* Header */}
      <section className="bg-white py-16 sm:py-20 border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="About Élan Clinic"
            title="The Intersection of Medical Dermatology & Bespoke Artistry"
            subtitle="Founded in 2012, Élan was established to deliver evidence-based aesthetic rejuvenation with hospital-grade rigor and uncompromising natural beauty standards."
          />
        </div>
      </section>

      {/* Story & Heritage Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5 text-charcoal-600 text-sm leading-relaxed">
              <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block">Our Clinical Heritage</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900 leading-snug">
                Pioneering Regenerative Aesthetic Care in New York
              </h2>
              <p>
                At Élan, we believe that true aesthetic medicine should never look artificial or overworked. Our clinical philosophy is anchored in the science of cellular regenerative dermatology: restoring the underlying extracellular matrix, stimulating natural elastin and collagen synthesis, and refining skin texture at the microscopic level.
              </p>
              <p>
                Led by Medical Director Dr. Elena Vance and a team of board-certified aesthetic physicians, our Lexington Avenue clinic features eight private procedure suites equipped with leading FDA-cleared picosecond lasers, fractional CO2 systems, ultrasound diagnostics, and medical-grade hydradermabrasion platforms.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-soft border border-charcoal-200">
                  <span className="text-2xl font-serif font-bold text-clinic-900 block">100%</span>
                  <span className="text-xs text-charcoal-600">Physician-Supervised Medical Injections</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-soft border border-charcoal-200">
                  <span className="text-2xl font-serif font-bold text-clinic-900 block">15k+</span>
                  <span className="text-xs text-charcoal-600">Documented Clinical Transformations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-charcoal-200 shadow-elevated bg-charcoal-900 aspect-[4/3]">
                <img
                  src="/images/hero/hero-treatment.jpg"
                  alt="Élan Aesthetic Clinic State of the Art Suite"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-surface-soft border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Medical Pillars"
            title="The Four Standards We Never Compromise"
            subtitle="How we maintain 99.4% patient satisfaction and international clinical acclaim."
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <div className="p-3 rounded-lg bg-clinic-100 text-clinic-800 inline-block mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">Doctor-Led Care</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Every consultation and injection is administered directly by board-certified dermatologists and licensed aesthetic physicians.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <div className="p-3 rounded-lg bg-clinic-100 text-clinic-800 inline-block mb-4">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">Scientific Rigor</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                We utilize standardized cross-polarized photographic diagnostics and peer-reviewed protocols for measurable dermal improvement.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <div className="p-3 rounded-lg bg-clinic-100 text-clinic-800 inline-block mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">Hospital Sterility</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                HEPA-filtered cleanroom airflow, autoclave sterilization, and single-use micro-cannulas ensure the utmost in patient safety.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <div className="p-3 rounded-lg bg-clinic-100 text-clinic-800 inline-block mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal-900 mb-2">Discreet Sanctuary</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Complete privacy, personalized appointment pacing, and dedicated VIP aftercare suites protect patient confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-clinic-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Meet Our Physicians?</h2>
          <p className="text-sm text-clinic-200 mb-8 max-w-xl mx-auto">
            Book an in-depth clinical consultation with 3D photographic analysis.
          </p>
          <Button to="/appointments" variant="sand" size="lg" icon={Calendar} className="bg-white hover:bg-sand-100 text-clinic-900 border-none font-bold">
            Schedule a Consultation
          </Button>
        </div>
      </section>

    </div>
  );
}

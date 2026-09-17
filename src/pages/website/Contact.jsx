import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useApp } from '../../context/AppContext';

export default function Contact() {
  const { settings } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'General Consultation',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you, ' + formData.name + '! Your message has been sent to our concierge desk.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceInterest: 'General Consultation',
        message: ''
      });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <SectionHeading
            badge="Concierge & Location"
            title="Connect With Élan Aesthetic Clinic"
            subtitle="Our clinical care coordinators are on hand to assist with appointment scheduling, bespoke treatment planning, and private suite arrangements."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-charcoal-200 p-8 sm:p-10 shadow-card">
              <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">
                Send a Clinical Inquiry
              </h3>
              <p className="text-xs text-charcoal-500 mb-8">
                Fill out the form below. A senior medical coordinator will reach out within 2 business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Victoria Sterling"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. victoria@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                  <Select
                    label="Area of Interest"
                    options={[
                      'General Consultation & 3D Skin Analysis',
                      'HydraFacial Elite Rejuvenation',
                      'Pico Laser Brightening & Toning',
                      'Precision Botulinum Toxin',
                      'Profhilo® Bio-Remodeling',
                      'CO2 Fractional Resurfacing',
                      'Exosome Scalp & Hair Therapy',
                      'HIFEM Body Contouring',
                      'IV Micronutrient Radiance Drips'
                    ]}
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Your Message / Goals <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please tell us about your skin concerns, desired timeline, or any specific questions..."
                    className="w-full rounded-lg border border-charcoal-200 p-3.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Send}
                  disabled={submitting}
                  className="w-full sm:w-auto"
                >
                  {submitting ? 'Sending...' : 'Send Inquiry to Concierge'}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Clinic Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-8 shadow-card space-y-6">
              <h4 className="font-serif font-bold text-lg text-charcoal-900 border-b border-charcoal-100 pb-3">
                Clinic Location & Direct Lines
              </h4>

              <div className="space-y-4 text-xs text-charcoal-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-clinic-50 text-clinic-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-semibold mb-0.5">Physical Address</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-clinic-50 text-clinic-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-semibold mb-0.5">Telephone Concierge</strong>
                    <span>{settings.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-clinic-50 text-clinic-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-semibold mb-0.5">Email Concierge</strong>
                    <span>{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-sand-100 text-sand-800 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-semibold mb-0.5">Clinical Hours</strong>
                    <p>{settings.openingHours.weekdays}</p>
                    <p>{settings.openingHours.saturday}</p>
                    <p className="text-charcoal-500">{settings.openingHours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-4 border-t border-charcoal-100">
                <a
                  href={`https://wa.me/18005553526`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp (+1 800-555-ELAN)</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card">
              <div className="p-4 bg-surface-muted border-b border-charcoal-100 flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal-800 font-serif">Lexington Ave Medical District</span>
                <span className="text-[10px] text-clinic-700 font-semibold">Valet Parking Available</span>
              </div>
              <div className="relative aspect-[16/9] bg-charcoal-100 flex items-center justify-center text-center p-6">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-clinic-700 mx-auto" />
                  <p className="text-xs font-bold text-charcoal-800">Élan Aesthetic Medical Center</p>
                  <p className="text-[11px] text-charcoal-500">450 Lexington Ave, Suite 1800, New York, NY</p>
                  <span className="inline-block text-[10px] text-clinic-800 font-semibold bg-clinic-100 px-2.5 py-1 rounded-full">
                    Accessible via 4, 5, 6, 7 & S Trains at Grand Central
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

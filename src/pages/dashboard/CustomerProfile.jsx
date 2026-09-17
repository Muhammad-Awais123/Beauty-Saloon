import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Calendar, ShieldCheck, Heart, Save } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

export default function CustomerProfile() {
  const { currentUser } = useAuth();
  const { customers, updateCustomer } = useApp();

  const customerRecord = customers.find(c => c.email.toLowerCase() === (currentUser?.email || 'customer@demo.com').toLowerCase()) || customers[0];

  const [formData, setFormData] = useState({
    name: customerRecord?.name || 'Emily Watson',
    email: customerRecord?.email || 'customer@demo.com',
    phone: customerRecord?.phone || '+1 (555) 234-5678',
    dob: customerRecord?.dob || '1992-06-15',
    gender: customerRecord?.gender || 'Female',
    medicalAlerts: customerRecord?.medicalAlerts || 'Mild rosacea tendency, no known drug allergies.',
    notes: customerRecord?.notes || 'Skin sensitive to glycolic acid. Prefers Dr. Elena Vance.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (customerRecord?.id) {
      updateCustomer(customerRecord.id, formData);
    } else {
      toast.success('Patient profile updated successfully.');
    }
  };

  return (
    <div className="space-y-6 text-left max-w-3xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Patient Profile & Medical History
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Keep your contact information and skin sensitivity profile up-to-date.
          </p>
        </div>

        <Badge variant="sage" size="md">
          {customerRecord?.membershipTier || 'Platinum Elite'}
        </Badge>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-4 pb-6 border-b border-charcoal-100">
          <img
            src={customerRecord?.avatar || '/images/team/team-doctor-03.jpg'}
            alt={formData.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-clinic-600"
          />
          <div>
            <h3 className="font-serif font-bold text-lg text-charcoal-900">{formData.name}</h3>
            <p className="text-xs text-charcoal-500">{formData.email}</p>
            <p className="text-[11px] text-clinic-700 font-semibold mt-0.5">
              {customerRecord?.totalVisits || 6} Completed Visits • {customerRecord?.loyaltyPoints || 340} Reward Points
            </p>
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Legal Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          <Select
            label="Gender"
            options={['Female', 'Male', 'Non-Binary', 'Prefer not to say']}
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
        </div>

        {/* Clinical Notes & Allergies */}
        <div className="space-y-4 pt-4 border-t border-charcoal-100">
          <h4 className="font-serif font-bold text-sm text-charcoal-900">
            Dermatological Health & Sensitivities
          </h4>

          <Input
            label="Known Allergies / Skin Sensitivities"
            value={formData.medicalAlerts}
            onChange={(e) => setFormData({ ...formData, medicalAlerts: e.target.value })}
            placeholder="e.g. Sensitive to glycolic acid, Latex allergy..."
          />

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Personal Aesthetic Goals & Preferences
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-3 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-charcoal-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Profile Changes
          </Button>
        </div>
      </form>

    </div>
  );
}

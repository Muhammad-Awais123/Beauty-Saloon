import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { 
  Settings, 
  Building2, 
  Clock, 
  CalendarCheck, 
  Bell, 
  CreditCard, 
  ShieldCheck, 
  Save, 
  RotateCcw 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AdminSettings() {
  const { settings, updateSettings, resetDemoData } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState({
    clinicName: settings.clinicName,
    tagline: settings.tagline,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    whatsapp: settings.whatsapp,
    weekdaysHours: settings.openingHours.weekdays,
    saturdayHours: settings.openingHours.saturday,
    sundayHours: settings.openingHours.sunday,
    minCancellationHours: settings.bookingSettings.minCancellationHours,
    advanceBookingDays: settings.bookingSettings.advanceBookingDays,
    slotDurationMinutes: settings.bookingSettings.slotDurationMinutes
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      clinicName: formData.clinicName,
      tagline: formData.tagline,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      whatsapp: formData.whatsapp,
      openingHours: {
        weekdays: formData.weekdaysHours,
        saturday: formData.saturdayHours,
        sunday: formData.sundayHours
      },
      bookingSettings: {
        ...settings.bookingSettings,
        minCancellationHours: Number(formData.minCancellationHours),
        advanceBookingDays: Number(formData.advanceBookingDays),
        slotDurationMinutes: Number(formData.slotDurationMinutes)
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'Clinic Information', icon: Building2 },
    { id: 'hours', label: 'Opening Hours', icon: Clock },
    { id: 'booking', label: 'Booking Rules', icon: CalendarCheck },
    { id: 'security', label: 'Demo Data & Security', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinic Platform Configuration
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Global clinic operating parameters, booking lead times, contact channels, and system state.
          </p>
        </div>

        <Button type="button" onClick={handleSave} variant="primary" size="sm" icon={Save}>
          Save All Settings
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-charcoal-200 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-clinic-700 text-white shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card space-y-6 text-xs">
        
        {/* TAB 1: GENERAL CLINIC INFO */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-charcoal-900 mb-2">General Clinic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Clinic Brand Name"
                value={formData.clinicName}
                onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
              />
              <Input
                label="Clinic Tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
              <Input
                label="Telephone Concierge"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Concierge Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <Input
              label="Physical Clinic Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              label="WhatsApp Direct Line"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>
        )}

        {/* TAB 2: OPENING HOURS */}
        {activeTab === 'hours' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-charcoal-900 mb-2">Operating & Suite Hours</h3>
            <Input
              label="Weekdays (Mon - Fri)"
              value={formData.weekdaysHours}
              onChange={(e) => setFormData({ ...formData, weekdaysHours: e.target.value })}
            />
            <Input
              label="Saturday"
              value={formData.saturdayHours}
              onChange={(e) => setFormData({ ...formData, saturdayHours: e.target.value })}
            />
            <Input
              label="Sunday"
              value={formData.sundayHours}
              onChange={(e) => setFormData({ ...formData, sundayHours: e.target.value })}
            />
          </div>
        )}

        {/* TAB 3: BOOKING RULES */}
        {activeTab === 'booking' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-charcoal-900 mb-2">Online Reservation Engine Rules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Default Slot Duration (mins)"
                type="number"
                value={formData.slotDurationMinutes}
                onChange={(e) => setFormData({ ...formData, slotDurationMinutes: e.target.value })}
              />
              <Input
                label="Advance Booking Horizon (Days)"
                type="number"
                value={formData.advanceBookingDays}
                onChange={(e) => setFormData({ ...formData, advanceBookingDays: e.target.value })}
              />
              <Input
                label="Free Cancellation Notice (Hours)"
                type="number"
                value={formData.minCancellationHours}
                onChange={(e) => setFormData({ ...formData, minCancellationHours: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* TAB 4: DEMO DATA & SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900 mb-1">Demo State Management</h3>
              <p className="text-charcoal-500">Restore or reset initial mock data for portfolio presentations.</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-soft border border-charcoal-200 flex items-center justify-between">
              <div>
                <strong className="text-charcoal-900 block font-semibold">Factory Demo Reset</strong>
                <span className="text-charcoal-500 text-[11px]">Re-seeds services, team, initial appointments, and patient CRM records.</span>
              </div>
              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={RotateCcw}
                onClick={resetDemoData}
              >
                Reset Demo Data
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-charcoal-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Configuration
          </Button>
        </div>

      </form>

    </div>
  );
}

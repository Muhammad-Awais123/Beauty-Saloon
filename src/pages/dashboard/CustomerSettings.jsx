import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Settings, Lock, Bell, ShieldCheck, Smartphone, Mail, Save } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function CustomerSettings() {
  const [pref, setPref] = useState({
    emailReminders: true,
    smsReminders: true,
    promoEmails: false,
    treatmentRecap: true
  });

  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSavePref = (e) => {
    e.preventDefault();
    toast.success('Communication preferences saved.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordState.currentPassword || !passwordState.newPassword) {
      toast.error('Please enter current and new password.');
      return;
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    toast.success('Password updated successfully (Demo simulation).');
    setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 text-left max-w-3xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card">
        <h1 className="text-2xl font-serif font-bold text-charcoal-900">
          Account & Privacy Settings
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Manage clinical notifications, security credentials, and communication channels.
        </p>
      </div>

      {/* Communication Preferences */}
      <form onSubmit={handleSavePref} className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card space-y-6">
        <h3 className="text-lg font-serif font-bold text-charcoal-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-clinic-700" />
          Appointment Reminders & Channels
        </h3>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-soft border border-charcoal-200 cursor-pointer">
            <div>
              <strong className="text-charcoal-900 block font-semibold">SMS Text Reminders</strong>
              <span className="text-charcoal-500">Receive 24-hour and 2-hour appointment reminder texts.</span>
            </div>
            <input
              type="checkbox"
              checked={pref.smsReminders}
              onChange={(e) => setPref({ ...pref, smsReminders: e.target.checked })}
              className="w-4 h-4 text-clinic-700 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-soft border border-charcoal-200 cursor-pointer">
            <div>
              <strong className="text-charcoal-900 block font-semibold">Email Preparation Guides</strong>
              <span className="text-charcoal-500">Receive calendar invites and pre-treatment skincare instructions.</span>
            </div>
            <input
              type="checkbox"
              checked={pref.emailReminders}
              onChange={(e) => setPref({ ...pref, emailReminders: e.target.checked })}
              className="w-4 h-4 text-clinic-700 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface-soft border border-charcoal-200 cursor-pointer">
            <div>
              <strong className="text-charcoal-900 block font-semibold">Post-Care Protocol Recaps</strong>
              <span className="text-charcoal-500">Digital copies of your doctor's aftercare guidance.</span>
            </div>
            <input
              type="checkbox"
              checked={pref.treatmentRecap}
              onChange={(e) => setPref({ ...pref, treatmentRecap: e.target.checked })}
              className="w-4 h-4 text-clinic-700 rounded"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" size="sm" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>

      {/* Security & Password Form */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card space-y-4">
        <h3 className="text-lg font-serif font-bold text-charcoal-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-clinic-700" />
          Security Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordState.currentPassword}
            onChange={(e) => setPasswordState({ ...passwordState, currentPassword: e.target.value })}
            placeholder="••••••••"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordState.newPassword}
            onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
            placeholder="••••••••"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={passwordState.confirmPassword}
            onChange={(e) => setPasswordState({ ...passwordState, confirmPassword: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="outline" size="sm">
            Update Password
          </Button>
        </div>
      </form>

    </div>
  );
}

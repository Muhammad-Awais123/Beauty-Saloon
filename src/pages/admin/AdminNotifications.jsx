import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Bell, Plus, CheckCheck, Calendar, DollarSign, Star, UserPlus } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import EmptyState from '../../components/common/EmptyState';

export default function AdminNotifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead, addNotification } = useApp();
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });

  const adminNotifs = notifications.filter(n => n.target === 'admin' || n.target === 'all');

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!announcement.title || !announcement.message) {
      toast.error('Please enter title and message.');
      return;
    }
    addNotification({
      type: 'broadcast',
      target: 'all',
      title: announcement.title,
      message: announcement.message
    });
    setShowBroadcastModal(false);
    setAnnouncement({ title: '', message: '' });
    toast.success('Clinical broadcast notification sent.');
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Admin Notification & Alert Center
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Real-time feed for incoming bookings, settled payments, new patient signups, and reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => markAllNotificationsRead('admin')}
            variant="outline"
            size="sm"
            icon={CheckCheck}
          >
            Mark All Read
          </Button>
          <Button
            onClick={() => setShowBroadcastModal(true)}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Send Broadcast
          </Button>
        </div>
      </div>

      {/* List */}
      {adminNotifs.length > 0 ? (
        <div className="space-y-3">
          {adminNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                n.read
                  ? 'bg-white border-charcoal-200'
                  : 'bg-clinic-50/60 border-clinic-600 ring-1 ring-clinic-500'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  n.type === 'payment' ? 'bg-emerald-100 text-emerald-800' :
                  n.type === 'review' ? 'bg-amber-100 text-amber-800' :
                  'bg-clinic-100 text-clinic-800'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">{n.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-charcoal-400 mt-1.5 block">{n.time}</span>
                </div>
              </div>

              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-clinic-700 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No Alerts"
          description="All clinical notifications have been reviewed."
        />
      )}

      {/* Broadcast Modal */}
      <Modal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title="Broadcast System Announcement"
      >
        <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
          <Input
            label="Announcement Title"
            required
            value={announcement.title}
            onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
            placeholder="e.g. Clinic Holiday Hours Notice"
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Message Content
            </label>
            <textarea
              rows={4}
              required
              value={announcement.message}
              onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-3 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
              placeholder="Type message to broadcast to portal users and staff..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowBroadcastModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Send Alert
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

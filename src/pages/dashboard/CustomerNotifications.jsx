import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Calendar, Tag, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';

export default function CustomerNotifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const customerNotifs = notifications.filter(n => n.target === 'customer' || n.target === 'all');

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Notifications & Care Alerts
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Appointment reminders, preparation guides, and clinic updates.
          </p>
        </div>

        {customerNotifs.some(n => !n.read) && (
          <Button
            variant="outline"
            size="sm"
            icon={CheckCheck}
            onClick={() => markAllNotificationsRead('customer')}
          >
            Mark All Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {customerNotifs.length > 0 ? (
        <div className="space-y-3">
          {customerNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-charcoal-200'
                  : 'bg-clinic-50/60 border-clinic-600 ring-1 ring-clinic-500'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                  notif.read ? 'bg-charcoal-100 text-charcoal-500' : 'bg-clinic-100 text-clinic-800'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">{notif.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-charcoal-400 mt-1.5 block">{notif.time}</span>
                </div>
              </div>

              {notif.link && (
                <Link
                  to={notif.link}
                  className="text-xs font-semibold text-clinic-700 hover:underline shrink-0 pt-1"
                >
                  View Details →
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No Notifications"
          description="You are fully up to date! New clinical reminders will appear here."
        />
      )}

    </div>
  );
}

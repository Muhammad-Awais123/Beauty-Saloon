import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  Percent,
  Plus
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  const { appointments, customers, services, payments, reviews } = useApp();

  // Metrics
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed');
  const completedAppointments = appointments.filter(a => a.status === 'completed');
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled');

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const cancellationRate = totalAppointments > 0 ? ((cancelledAppointments.length / totalAppointments) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-clinic-700 block mb-0.5">
            Executive Summary
          </span>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinic Operations Dashboard
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Real-time appointment volume, revenue settlement, and specialist occupancy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button to="/admin/appointments" variant="primary" size="sm" icon={Plus}>
            New Appointment
          </Button>
          <Button to="/admin/reports" variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Gross Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+18.4%"
          isPositive={true}
          subtitle="vs previous 30 days"
          icon={DollarSign}
        />
        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          change="+12.5%"
          isPositive={true}
          subtitle="Scheduled to date"
          icon={Calendar}
        />
        <StatCard
          title="Registered Patients"
          value={customers.length}
          change="+8 New"
          isPositive={true}
          subtitle="In CRM database"
          icon={Users}
        />
        <StatCard
          title="Cancellation Rate"
          value={`${cancellationRate}%`}
          change="-2.1%"
          isPositive={true}
          subtitle="Industry benchmark < 6%"
          icon={Percent}
        />
      </div>

      {/* Operational Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Today's / Upcoming Appointments (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
          <div className="flex items-center justify-between mb-4 border-b border-charcoal-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900">Scheduled Appointments</h3>
              <p className="text-xs text-charcoal-500">Upcoming clinical sessions requiring attention.</p>
            </div>
            <Link to="/admin/appointments" className="text-xs font-semibold text-clinic-700 hover:underline">
              View All ({appointments.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 5).map(apt => (
              <div key={apt.id} className="p-3.5 rounded-xl bg-surface-soft border border-charcoal-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-charcoal-900">{apt.customerName}</span>
                    <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'confirmed' ? 'sage' : apt.status === 'cancelled' ? 'danger' : 'warning'} size="sm">
                      {apt.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-600 font-medium">{apt.serviceName}</p>
                  <p className="text-[11px] text-charcoal-400 mt-0.5">
                    {apt.date} at {apt.time} • {apt.specialistName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold font-serif text-clinic-900 block">${apt.total}</span>
                  <Link to="/admin/appointments" className="text-[11px] text-clinic-700 hover:underline mt-1 inline-block">
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Performance Mini Charts (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Revenue Trend Chart (Solid SVG) */}
          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-base text-charcoal-900">Weekly Revenue Flow</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +14.2%
              </span>
            </div>

            {/* Solid Bar Chart (Strictly NO Gradients) */}
            <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: 'Mon', val: 65, amount: '$1.8k' },
                { day: 'Tue', val: 85, amount: '$2.4k' },
                { day: 'Wed', val: 45, amount: '$1.2k' },
                { day: 'Thu', val: 95, amount: '$3.1k' },
                { day: 'Fri', val: 75, amount: '$2.2k' },
                { day: 'Sat', val: 90, amount: '$2.8k' },
                { day: 'Sun', val: 20, amount: '$450' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-muted rounded-t relative h-28 flex items-end">
                    <div
                      className="w-full bg-clinic-700 group-hover:bg-clinic-800 rounded-t transition-all"
                      style={{ height: `${bar.val}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-charcoal-500 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Services Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card">
            <h3 className="font-serif font-bold text-base text-charcoal-900 mb-4">Top Treatments by Volume</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'HydraFacial Elite Rejuvenation', count: 128, pct: 85 },
                { name: 'Pico Laser Brightening & Toning', count: 94, pct: 68 },
                { name: 'Precision Botulinum Toxin', count: 165, pct: 92 },
                { name: 'Profhilo® Bio-Remodeling', count: 78, pct: 54 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-charcoal-700">
                    <span className="font-medium truncate max-w-[200px]">{item.name}</span>
                    <span className="font-bold">{item.count} sessions</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
                    <div className="h-full bg-clinic-600 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

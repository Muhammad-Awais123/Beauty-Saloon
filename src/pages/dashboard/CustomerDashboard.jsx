import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Award, 
  Heart, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ServiceCard from '../../components/website/ServiceCard';

export default function CustomerDashboard() {
  const { currentUser } = useAuth();
  const { appointments, services, favorites } = useApp();

  const userEmail = currentUser?.email || 'customer@demo.com';
  const userAppointments = appointments.filter(a => a.customerEmail.toLowerCase() === userEmail.toLowerCase());

  const upcomingAppointment = userAppointments.find(a => a.status === 'confirmed' || a.status === 'pending');
  const pastAppointments = userAppointments.filter(a => a.status === 'completed');

  const totalSpent = userAppointments.reduce((acc, curr) => curr.status !== 'cancelled' ? acc + curr.total : acc, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);

  const recommendedServices = services.slice(0, 3);

  return (
    <div className="space-y-8 text-left">
      
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-clinic-700 block mb-1">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
            Welcome, {currentUser?.name || 'Emily Watson'}
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Your personalized aesthetic care plan, upcoming sessions, and treatment history.
          </p>
        </div>

        <Button to="/appointments" variant="primary" size="md" icon={Calendar}>
          Book New Treatment
        </Button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visits"
          value={pastAppointments.length + (upcomingAppointment ? 1 : 0)}
          subtitle="Clinical sessions"
          icon={Calendar}
        />
        <StatCard
          title="Loyalty Points"
          value={loyaltyPoints + 150}
          subtitle={`$${Math.floor((loyaltyPoints + 150) / 10)} credit value`}
          icon={Award}
        />
        <StatCard
          title="Saved Treatments"
          value={favorites.length}
          subtitle="In your wishlist"
          icon={Heart}
        />
        <StatCard
          title="Care Status"
          value="VIP Active"
          subtitle="Platinum Member"
          icon={UserCheck}
        />
      </div>

      {/* Upcoming Appointment Hero Banner */}
      {upcomingAppointment ? (
        <div className="bg-white rounded-2xl border border-clinic-600 p-6 sm:p-7 shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between gap-2 border-b border-charcoal-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-clinic-800">
                Next Upcoming Clinical Session
              </span>
            </div>
            <Badge variant="sage" size="sm">
              Booking Ref: {upcomingAppointment.bookingId}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                {upcomingAppointment.serviceName}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-clinic-700" />
                  {upcomingAppointment.date}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-clinic-700" />
                  {upcomingAppointment.time} ({upcomingAppointment.duration})
                </span>
                <span className="text-charcoal-400">|</span>
                <span>Specialist: <strong>{upcomingAppointment.specialistName}</strong></span>
              </div>
              <p className="text-xs text-charcoal-500 pt-1">
                Location: 450 Lexington Ave, Suite 1800. Please arrive 10 minutes prior for pre-cleansing.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <Button
                to="/dashboard/appointments"
                variant="primary"
                size="sm"
                className="w-full"
              >
                Manage & Details
              </Button>
              <Button
                to="/dashboard/appointments"
                variant="outline"
                size="sm"
                className="w-full text-xs"
              >
                Reschedule Session
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 text-center shadow-card">
          <Calendar className="w-10 h-10 text-clinic-700 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-1">No Upcoming Appointments</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto mb-6">
            Maintain your skin health routine with a personalized hydradermabrasion or laser session.
          </p>
          <Button to="/appointments" variant="primary" size="md">
            Schedule Next Appointment
          </Button>
        </div>
      )}

      {/* Previous Appointments & Treatment History */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-charcoal-900">Recent Treatment History</h3>
            <p className="text-xs text-charcoal-500">Completed medical aesthetic sessions on record.</p>
          </div>
          <Link to="/dashboard/appointments" className="text-xs font-semibold text-clinic-700 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {userAppointments.length > 0 ? (
          <div className="divide-y divide-charcoal-100">
            {userAppointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-charcoal-900">{apt.serviceName}</h4>
                    <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'cancelled' ? 'danger' : 'sage'} size="sm">
                      {apt.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-500">
                    {apt.date} at {apt.time} • with {apt.specialistName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-serif text-clinic-900">${apt.total}</span>
                  <Button to="/dashboard/appointments" variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-charcoal-500 py-4 text-center">No past appointment history.</p>
        )}
      </div>

      {/* Recommended for You */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-charcoal-900">Recommended for Your Skin Goals</h3>
          <p className="text-xs text-charcoal-500">Dermatologist curated maintenance treatments based on your history.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

    </div>
  );
}

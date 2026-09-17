import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Printer, 
  Download,
  Search,
  Eye,
  CalendarPlus
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import EmptyState from '../../components/common/EmptyState';

export default function CustomerAppointments() {
  const { currentUser } = useAuth();
  const { appointments, rescheduleAppointment, cancelAppointment } = useApp();

  const userEmail = currentUser?.email || 'customer@demo.com';
  const userAppointments = appointments.filter(a => a.customerEmail.toLowerCase() === userEmail.toLowerCase());

  const [activeTab, setActiveTab] = useState('all'); // all | upcoming | completed | cancelled
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedApt, setSelectedApt] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Reschedule Form State
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:30 AM');
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const filteredAppointments = userAppointments.filter(apt => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'upcoming' ? (apt.status === 'confirmed' || apt.status === 'pending') :
      activeTab === 'completed' ? apt.status === 'completed' :
      activeTab === 'cancelled' ? apt.status === 'cancelled' : true;

    const matchesSearch = apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.specialistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenReschedule = (apt) => {
    setSelectedApt(apt);
    setNewDate(apt.date);
    setNewTime(apt.time);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = () => {
    if (!newDate || !newTime) {
      toast.error('Please pick a valid new date and time.');
      return;
    }
    rescheduleAppointment(selectedApt.id, newDate, newTime);
    setShowRescheduleModal(false);
  };

  const handleOpenCancel = (apt) => {
    setSelectedApt(apt);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    cancelAppointment(selectedApt.id, cancelReason);
    setShowCancelModal(false);
  };

  const handleOpenDetails = (apt) => {
    setSelectedApt(apt);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            My Appointments
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Track, reschedule, or review all your past and upcoming clinical visits.
          </p>
        </div>

        <Button to="/appointments" variant="primary" size="sm" icon={Calendar}>
          Book New Treatment
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-charcoal-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Appointments' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-clinic-700 text-white'
                  : 'bg-surface-muted text-charcoal-700 hover:bg-charcoal-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by treatment or doctor..."
            className="w-full rounded-lg border border-charcoal-200 pl-9 pr-3 py-1.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          />
        </div>
      </div>

      {/* Appointment Cards List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map(apt => {
            const isUpcoming = apt.status === 'confirmed' || apt.status === 'pending';
            const isCompleted = apt.status === 'completed';
            const isCancelled = apt.status === 'cancelled';

            return (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-charcoal-500">#{apt.bookingId}</span>
                    <Badge
                      variant={isCompleted ? 'success' : isCancelled ? 'danger' : isUpcoming ? 'sage' : 'default'}
                      size="sm"
                    >
                      {apt.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-charcoal-400">• Paid via {apt.paymentMethod}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-charcoal-900">
                    {apt.serviceName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-clinic-700" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-clinic-700" />
                      {apt.time} ({apt.duration})
                    </span>
                    <span className="text-charcoal-400">|</span>
                    <span className="flex items-center gap-1 text-charcoal-700">
                      <User className="w-3.5 h-3.5 text-charcoal-400" />
                      {apt.specialistName}
                    </span>
                  </div>
                </div>

                {/* Right Actions & Amount */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-charcoal-100 shrink-0">
                  <div>
                    <span className="text-[10px] text-charcoal-400 uppercase font-semibold block text-left lg:text-right">Total Fee</span>
                    <span className="text-xl font-bold font-serif text-clinic-900">${apt.total}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleOpenDetails(apt)}
                      className="text-xs"
                    >
                      Details
                    </Button>

                    {isUpcoming && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenReschedule(apt)}
                          className="text-xs"
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenCancel(apt)}
                          className="text-xs text-rose-600 hover:bg-rose-50"
                        >
                          Cancel
                        </Button>
                      </>
                    )}

                    {isCompleted && (
                      <Button
                        to={`/dashboard/reviews?apt=${apt.id}&service=${encodeURIComponent(apt.serviceName)}`}
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                      >
                        Leave Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Appointments Found"
          description="There are no appointments matching your current tab or search query."
          actionLabel="Book a New Treatment"
          actionTo="/appointments"
        />
      )}

      {/* 1. RESCHEDULE MODAL */}
      <Modal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title="Reschedule Appointment"
        subtitle={`Modify session date for ${selectedApt?.serviceName}`}
      >
        <div className="space-y-4">
          <Input
            label="Select New Date"
            type="date"
            required
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />

          <Select
            label="Select Time Slot"
            options={['09:00 AM', '10:30 AM', '11:45 AM', '01:30 PM', '03:00 PM', '04:30 PM', '05:30 PM']}
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />

          <div className="p-3 rounded-lg bg-surface-soft border border-charcoal-200 text-xs text-charcoal-600">
            Rescheduling is complimentary with 24+ hours advance notice. A confirmation email will be sent automatically.
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowRescheduleModal(false)}>
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmReschedule}>
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </Modal>

      {/* 2. CANCEL CONFIRM DIALOG */}
      <ConfirmDialog
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Appointment?"
        message={`Are you sure you wish to cancel your ${selectedApt?.serviceName} on ${selectedApt?.date}? Your simulated refund of $${selectedApt?.total} will be processed to ${selectedApt?.paymentMethod}.`}
        confirmText="Confirm Cancellation"
        type="danger"
      />

      {/* 3. APPOINTMENT DETAILS & RECEIPT MODAL */}
      {selectedApt && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Appointment Receipt & Preparation"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-soft border border-charcoal-200">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Booking Reference</span>
                <span className="font-mono font-bold text-sm text-charcoal-900">{selectedApt.bookingId}</span>
              </div>
              <Badge variant={selectedApt.status === 'completed' ? 'success' : selectedApt.status === 'cancelled' ? 'danger' : 'sage'} size="sm">
                {selectedApt.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div>
                <span className="text-charcoal-400 block">Treatment:</span>
                <strong className="text-charcoal-900">{selectedApt.serviceName}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Treating Doctor:</span>
                <strong className="text-charcoal-900">{selectedApt.specialistName}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Date & Time:</span>
                <span className="text-charcoal-900 font-medium">{selectedApt.date} at {selectedApt.time}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Duration:</span>
                <span className="text-charcoal-900">{selectedApt.duration}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Payment Method:</span>
                <span className="text-charcoal-900">{selectedApt.paymentMethod}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Total Investment:</span>
                <span className="font-serif font-bold text-clinic-900 text-sm">${selectedApt.total}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-clinic-50 border border-clinic-200 text-clinic-900">
              <strong className="block font-bold mb-0.5">Pre-Treatment Preparation:</strong>
              <p>Please refrain from using chemical exfoliants (retinoids, AHA/BHA) for 48 hours prior to your visit. Drink plenty of water and arrive with clean skin.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-charcoal-100">
              <Button
                variant="outline"
                size="sm"
                icon={Printer}
                onClick={() => {
                  window.print();
                }}
              >
                Print Receipt
              </Button>
              <Button variant="primary" size="sm" onClick={() => setShowDetailModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

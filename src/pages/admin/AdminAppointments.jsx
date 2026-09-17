import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  X, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  User, 
  SlidersHorizontal,
  Printer
} from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import EmptyState from '../../components/common/EmptyState';

export default function AdminAppointments() {
  const { appointments, services, team, customers, bookAppointment, updateAppointmentStatus, rescheduleAppointment, cancelAppointment } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Modals state
  const [selectedApt, setSelectedApt] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // New Reschedule state
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('10:00 AM');

  // New Manual Appointment state
  const [newAptData, setNewAptData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '+1 (555) 000-0000',
    serviceId: services[0]?.id || '',
    specialistId: team[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    paymentMethod: 'Pay at Clinic',
    notes: 'Walk-in booking recorded by reception.'
  });

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesStaff = staffFilter === 'all' || apt.specialistId === staffFilter;
    const matchesDate = !dateFilter || apt.date === dateFilter;
    const matchesSearch = apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesStaff && matchesDate && matchesSearch;
  });

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newAptData.customerName || !newAptData.customerEmail) {
      toast.error('Please enter customer name and email.');
      return;
    }

    const srv = services.find(s => s.id === newAptData.serviceId) || services[0];
    const doc = team.find(t => t.id === newAptData.specialistId) || team[0];

    bookAppointment({
      customerName: newAptData.customerName,
      customerEmail: newAptData.customerEmail,
      customerPhone: newAptData.customerPhone,
      serviceId: srv.id,
      serviceName: srv.name,
      specialistId: doc.id,
      specialistName: doc.name,
      date: newAptData.date,
      time: newAptData.time,
      duration: srv.duration,
      price: srv.price,
      total: srv.price,
      paymentMethod: newAptData.paymentMethod,
      notes: newAptData.notes
    });

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Appointments Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Review patient bookings, allocate specialist slots, and modify appointment statuses.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="sm"
          icon={Plus}
        >
          Book In-Clinic Appointment
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, service, or ref..."
            className="w-full rounded-lg border border-charcoal-200 pl-9 pr-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          />
        </div>

        {/* Status Filter */}
        <Select
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'pending', label: 'Pending' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
            { value: 'no-show', label: 'No-Show' }
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        {/* Staff Filter */}
        <Select
          options={[
            { value: 'all', label: 'All Doctors & Staff' },
            ...team.map(t => ({ value: t.id, label: t.name }))
          ]}
          value={staffFilter}
          onChange={(e) => setStaffFilter(e.target.value)}
        />

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-lg border border-charcoal-200 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
        />

      </div>

      {/* Appointments Table */}
      {filteredAppointments.length > 0 ? (
        <Table
          headers={[
            'Ref / Date',
            'Patient',
            'Treatment',
            'Doctor / Specialist',
            'Status',
            'Total',
            { label: 'Actions', align: 'right' }
          ]}
        >
          {filteredAppointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-surface-soft transition-colors">
              
              {/* Ref & Date */}
              <td className="py-3.5 px-4">
                <span className="font-mono text-xs font-bold text-charcoal-900 block">{apt.bookingId}</span>
                <span className="text-[11px] text-charcoal-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-clinic-700" />
                  {apt.date} • {apt.time}
                </span>
              </td>

              {/* Patient */}
              <td className="py-3.5 px-4">
                <strong className="text-xs text-charcoal-900 block">{apt.customerName}</strong>
                <span className="text-[11px] text-charcoal-500">{apt.customerPhone}</span>
              </td>

              {/* Treatment */}
              <td className="py-3.5 px-4">
                <span className="text-xs font-semibold text-charcoal-800 block">{apt.serviceName}</span>
                <span className="text-[11px] text-charcoal-400">{apt.duration}</span>
              </td>

              {/* Doctor */}
              <td className="py-3.5 px-4 text-xs text-charcoal-700">
                {apt.specialistName}
              </td>

              {/* Status */}
              <td className="py-3.5 px-4">
                <Badge
                  variant={
                    apt.status === 'completed' ? 'success' :
                    apt.status === 'confirmed' ? 'sage' :
                    apt.status === 'cancelled' ? 'danger' : 'warning'
                  }
                  size="sm"
                >
                  {apt.status.toUpperCase()}
                </Badge>
              </td>

              {/* Total */}
              <td className="py-3.5 px-4 font-serif font-bold text-clinic-900 text-sm">
                ${apt.total}
              </td>

              {/* Action Buttons */}
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  
                  {/* Details */}
                  <button
                    onClick={() => {
                      setSelectedApt(apt);
                      setShowDetailModal(true);
                    }}
                    title="View Full Booking"
                    className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-900 hover:bg-charcoal-100"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Confirm (if pending) */}
                  {apt.status === 'pending' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                      title="Confirm Booking"
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  {/* Complete (if confirmed) */}
                  {apt.status === 'confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      title="Mark as Completed"
                      className="p-1.5 rounded-lg text-clinic-700 hover:bg-clinic-50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Reschedule */}
                  {apt.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        setSelectedApt(apt);
                        setRescheduleDate(apt.date);
                        setRescheduleTime(apt.time);
                        setShowRescheduleModal(true);
                      }}
                      title="Reschedule Date/Time"
                      className="p-1.5 rounded-lg text-charcoal-500 hover:text-clinic-800 hover:bg-charcoal-100"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  {/* Cancel */}
                  {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                    <button
                      onClick={() => {
                        setSelectedApt(apt);
                        setShowCancelModal(true);
                      }}
                      title="Cancel Appointment"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState
          title="No Appointments Matched"
          description="Try clearing search filters or add a new appointment."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setStaffFilter('all');
            setDateFilter('');
          }}
        />
      )}

      {/* 1. ADD IN-CLINIC APPOINTMENT MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Schedule In-Clinic Appointment"
        subtitle="Direct reception appointment creation"
      >
        <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Patient Full Name"
              required
              value={newAptData.customerName}
              onChange={(e) => setNewAptData({ ...newAptData, customerName: e.target.value })}
              placeholder="e.g. Katherine Pierce"
            />
            <Input
              label="Patient Email"
              type="email"
              required
              value={newAptData.customerEmail}
              onChange={(e) => setNewAptData({ ...newAptData, customerEmail: e.target.value })}
              placeholder="e.g. katherine@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Treatment"
              options={services.map(s => ({ value: s.id, label: `${s.name} ($${s.price})` }))}
              value={newAptData.serviceId}
              onChange={(e) => setNewAptData({ ...newAptData, serviceId: e.target.value })}
            />
            <Select
              label="Assigned Doctor"
              options={team.map(t => ({ value: t.id, label: t.name }))}
              value={newAptData.specialistId}
              onChange={(e) => setNewAptData({ ...newAptData, specialistId: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              required
              value={newAptData.date}
              onChange={(e) => setNewAptData({ ...newAptData, date: e.target.value })}
            />
            <Select
              label="Time Slot"
              options={['09:00 AM', '10:00 AM', '11:15 AM', '01:30 PM', '02:45 PM', '04:00 PM', '05:15 PM']}
              value={newAptData.time}
              onChange={(e) => setNewAptData({ ...newAptData, time: e.target.value })}
            />
          </div>

          <Select
            label="Payment Status"
            options={['Paid via Credit Card', 'Pay at Clinic', 'Insurance/Voucher']}
            value={newAptData.paymentMethod}
            onChange={(e) => setNewAptData({ ...newAptData, paymentMethod: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Appointment
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. RESCHEDULE MODAL */}
      <Modal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title="Admin Reschedule Appointment"
      >
        <div className="space-y-4 text-xs">
          <Input
            label="New Date"
            type="date"
            value={rescheduleDate}
            onChange={(e) => setRescheduleDate(e.target.value)}
          />
          <Select
            label="New Time Slot"
            options={['09:00 AM', '10:00 AM', '11:15 AM', '01:30 PM', '02:45 PM', '04:00 PM', '05:15 PM']}
            value={rescheduleTime}
            onChange={(e) => setRescheduleTime(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowRescheduleModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                rescheduleAppointment(selectedApt.id, rescheduleDate, rescheduleTime);
                setShowRescheduleModal(false);
              }}
            >
              Update Schedule
            </Button>
          </div>
        </div>
      </Modal>

      {/* 3. CANCEL DIALOG */}
      <ConfirmDialog
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => cancelAppointment(selectedApt.id, 'Admin cancellation')}
        title="Cancel Appointment"
        message={`Confirm cancellation of booking ${selectedApt?.bookingId} for ${selectedApt?.customerName}?`}
      />

      {/* 4. DETAIL MODAL */}
      {selectedApt && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Clinical Appointment Record"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-surface-soft border border-charcoal-200">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Booking Ref</span>
                <strong className="font-mono text-charcoal-900">{selectedApt.bookingId}</strong>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Status</span>
                <Badge variant="sage" size="sm">{selectedApt.status.toUpperCase()}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-charcoal-400 block">Patient Name:</span>
                <strong className="text-charcoal-900">{selectedApt.customerName}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Patient Email:</span>
                <span className="text-charcoal-900">{selectedApt.customerEmail}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Treatment:</span>
                <strong className="text-charcoal-900">{selectedApt.serviceName}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Specialist:</span>
                <span className="text-charcoal-900">{selectedApt.specialistName}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Scheduled Time:</span>
                <span className="text-charcoal-900">{selectedApt.date} at {selectedApt.time}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Total Investment:</span>
                <strong className="text-clinic-900 font-serif">${selectedApt.total}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-charcoal-100 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setShowDetailModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

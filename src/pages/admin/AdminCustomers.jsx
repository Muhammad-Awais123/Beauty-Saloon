import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Award, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  UserCheck, 
  Edit3,
  FileText
} from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import EmptyState from '../../components/common/EmptyState';

export default function AdminCustomers() {
  const { customers, appointments, addCustomer, updateCustomer } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  // Modals state
  const [selectedCust, setSelectedCust] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditNotesModal, setShowEditNotesModal] = useState(false);

  // New Customer Form State
  const [newCustData, setNewCustData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Female',
    membershipTier: 'Silver',
    notes: 'New patient registered via CRM.',
    medicalAlerts: 'None reported.'
  });

  // Edit Notes State
  const [editNotes, setEditNotes] = useState('');

  const filteredCustomers = customers.filter(c => {
    const matchesTier = tierFilter === 'all' || c.membershipTier.toLowerCase().includes(tierFilter.toLowerCase());
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCustData.name || !newCustData.email) {
      toast.error('Please enter name and email.');
      return;
    }
    addCustomer(newCustData);
    setShowAddModal(false);
    setNewCustData({
      name: '',
      email: '',
      phone: '',
      gender: 'Female',
      membershipTier: 'Silver',
      notes: '',
      medicalAlerts: ''
    });
  };

  const handleSaveNotes = () => {
    if (selectedCust) {
      updateCustomer(selectedCust.id, { notes: editNotes });
      setSelectedCust({ ...selectedCust, notes: editNotes });
      setShowEditNotesModal(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Patient CRM & Directory
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Comprehensive patient profiles, treatment history, lifetime spending, and clinical notes.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Add New Patient
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name, email, or phone..."
            className="w-full rounded-lg border border-charcoal-200 pl-9 pr-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            options={[
              { value: 'all', label: 'All Membership Tiers' },
              { value: 'platinum', label: 'Platinum' },
              { value: 'gold', label: 'Gold' },
              { value: 'silver', label: 'Silver' },
              { value: 'diamond', label: 'Diamond VIP' }
            ]}
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Patients Table */}
      {filteredCustomers.length > 0 ? (
        <Table
          headers={[
            'Patient Profile',
            'Contact',
            'Visits',
            'Lifetime Spend',
            'Membership Tier',
            'Loyalty Points',
            { label: 'Actions', align: 'right' }
          ]}
        >
          {filteredCustomers.map((cust) => (
            <tr key={cust.id} className="hover:bg-surface-soft transition-colors">
              
              {/* Profile */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={cust.avatar || '/images/team/team-doctor-03.jpg'}
                    alt={cust.name}
                    className="w-8 h-8 rounded-full object-cover border border-charcoal-200"
                  />
                  <div>
                    <strong className="text-xs text-charcoal-900 block">{cust.name}</strong>
                    <span className="text-[10px] text-charcoal-400">{cust.gender || 'Patient'}</span>
                  </div>
                </div>
              </td>

              {/* Contact */}
              <td className="py-3.5 px-4 text-xs">
                <span className="text-charcoal-800 block">{cust.email}</span>
                <span className="text-charcoal-500 text-[11px]">{cust.phone}</span>
              </td>

              {/* Visits */}
              <td className="py-3.5 px-4 text-xs font-semibold text-charcoal-800">
                {cust.totalVisits} sessions
              </td>

              {/* Spend */}
              <td className="py-3.5 px-4 font-serif font-bold text-clinic-900 text-sm">
                ${cust.totalSpent.toLocaleString()}
              </td>

              {/* Tier */}
              <td className="py-3.5 px-4">
                <Badge variant="sage" size="sm">
                  {cust.membershipTier}
                </Badge>
              </td>

              {/* Loyalty */}
              <td className="py-3.5 px-4 text-xs font-bold text-amber-800">
                ★ {cust.loyaltyPoints} pts
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  onClick={() => {
                    setSelectedCust(cust);
                    setShowDetailModal(true);
                  }}
                  className="text-xs"
                >
                  360 View
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState
          icon={Users}
          title="No Patients Found"
          description="Try modifying search keywords or add a new patient profile."
        />
      )}

      {/* 1. CUSTOMER 360 MODAL */}
      {selectedCust && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Patient 360: ${selectedCust.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs text-left">
            
            {/* Top Overview Strip */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-soft border border-charcoal-200">
              <img
                src={selectedCust.avatar || '/images/team/team-doctor-03.jpg'}
                alt={selectedCust.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-clinic-600"
              />
              <div className="flex-1">
                <h3 className="text-base font-bold font-serif text-charcoal-900">{selectedCust.name}</h3>
                <p className="text-charcoal-500">{selectedCust.email} • {selectedCust.phone}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="sage" size="sm">{selectedCust.membershipTier}</Badge>
                  <span className="text-amber-800 font-bold">★ {selectedCust.loyaltyPoints} Loyalty Points</span>
                </div>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white border border-charcoal-200 text-center">
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Total Spend</span>
                <span className="text-lg font-serif font-bold text-clinic-900">${selectedCust.totalSpent}</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-charcoal-200 text-center">
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Completed Sessions</span>
                <span className="text-lg font-serif font-bold text-charcoal-900">{selectedCust.totalVisits}</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-charcoal-200 text-center">
                <span className="text-[10px] text-charcoal-400 uppercase font-semibold block">Last Visit</span>
                <span className="text-xs font-bold text-charcoal-900 mt-1 block">{selectedCust.lastAppointment || 'None'}</span>
              </div>
            </div>

            {/* Medical Alerts & Notes */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <strong className="block font-bold">Medical Alerts / Sensitivities:</strong>
              <p>{selectedCust.medicalAlerts || 'None recorded.'}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-charcoal-200 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="font-bold text-charcoal-900">Clinical & Doctor Notes:</strong>
                <button
                  onClick={() => {
                    setEditNotes(selectedCust.notes || '');
                    setShowEditNotesModal(true);
                  }}
                  className="text-clinic-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Notes</span>
                </button>
              </div>
              <p className="text-charcoal-600 leading-relaxed">{selectedCust.notes || 'No notes added yet.'}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setShowDetailModal(false)}>
                Done
              </Button>
            </div>

          </div>
        </Modal>
      )}

      {/* 2. EDIT NOTES MODAL */}
      <Modal
        isOpen={showEditNotesModal}
        onClose={() => setShowEditNotesModal(false)}
        title="Update Clinical Patient Notes"
      >
        <div className="space-y-4 text-xs">
          <textarea
            rows={4}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            className="w-full rounded-lg border border-charcoal-200 p-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowEditNotesModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </div>
        </div>
      </Modal>

      {/* 3. ADD PATIENT MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Register New Patient in CRM"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <Input
            label="Full Name"
            required
            value={newCustData.name}
            onChange={(e) => setNewCustData({ ...newCustData, name: e.target.value })}
            placeholder="e.g. Penelope Cruz"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email"
              type="email"
              required
              value={newCustData.email}
              onChange={(e) => setNewCustData({ ...newCustData, email: e.target.value })}
            />
            <Input
              label="Phone"
              type="tel"
              value={newCustData.phone}
              onChange={(e) => setNewCustData({ ...newCustData, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Gender"
              options={['Female', 'Male', 'Non-Binary', 'Other']}
              value={newCustData.gender}
              onChange={(e) => setNewCustData({ ...newCustData, gender: e.target.value })}
            />
            <Select
              label="Tier"
              options={['Silver', 'Gold', 'Platinum Elite', 'Diamond VIP']}
              value={newCustData.membershipTier}
              onChange={(e) => setNewCustData({ ...newCustData, membershipTier: e.target.value })}
            />
          </div>
          <Input
            label="Known Medical Alerts"
            value={newCustData.medicalAlerts}
            onChange={(e) => setNewCustData({ ...newCustData, medicalAlerts: e.target.value })}
            placeholder="e.g. Sensitive skin, Aspirin allergy"
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Patient Record
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

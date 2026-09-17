import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { UserCog, Plus, Edit2, Trash2, Calendar, Clock, Star, Award, Check } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AdminStaff() {
  const { team, services, addStaff, updateStaff, deleteStaff } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Senior Aesthetic Physician',
    specialization: 'Laser Resurfacing & Skin Toning',
    experience: '8+ Years Experience',
    bio: 'Dedicated medical aesthetic practitioner with extensive training in energy-based devices.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });

  const handleOpenEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      specialization: member.specialization,
      experience: member.experience,
      bio: member.bio,
      availableDays: member.availableDays || ['Monday', 'Wednesday', 'Friday']
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedMember) {
      updateStaff(selectedMember.id, formData);
      setShowEditModal(false);
    }
  };

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please enter physician / staff name.');
      return;
    }
    addStaff(formData);
    setShowAddModal(false);
    setFormData({
      name: '',
      role: 'Senior Aesthetic Physician',
      specialization: 'Laser Resurfacing & Skin Toning',
      experience: '8+ Years Experience',
      bio: '',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Medical Faculty & Staff Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Manage practicing physicians, working schedules, and authorized aesthetic procedures.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Add Specialist
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-clinic-600 shrink-0"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-charcoal-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-clinic-700">{member.role}</p>
                  <p className="text-[11px] text-charcoal-400 mt-0.5">{member.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-clinic-800 hover:bg-clinic-50 transition-colors"
                  title="Edit Profile & Schedule"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedMember(member);
                    setShowDeleteModal(true);
                  }}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove Specialist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>

            {/* Working Days & Rating */}
            <div className="pt-3 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1 text-charcoal-600">
                <Clock className="w-3.5 h-3.5 text-clinic-700" />
                <span>Days: {member.availableDays?.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{member.rating}</span>
                <span className="text-charcoal-400 font-normal">({member.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1. ADD SPECIALIST MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Specialist / Doctor"
      >
        <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
          <Input
            label="Physician Full Name & Title"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Dr. Julian Vance, MD"
          />
          <Input
            label="Position / Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. Senior Aesthetic Dermatologist"
          />
          <Input
            label="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            placeholder="e.g. Advanced Laser & Dermal Remodeling"
          />
          <Input
            label="Experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            placeholder="e.g. 10+ Years Experience"
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Doctor Biography
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Specialist
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. EDIT MODAL */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit: ${selectedMember?.name}`}
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <Input
            label="Physician Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Input
            label="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Biography
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* 3. DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => selectedMember && deleteStaff(selectedMember.id)}
        title="Remove Specialist?"
        message={`Are you sure you want to remove ${selectedMember?.name} from active clinic duty?`}
      />

    </div>
  );
}

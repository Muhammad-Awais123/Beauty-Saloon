import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Sparkles, Plus, Edit2, Trash2, Clock, DollarSign, Star, Image as ImageIcon } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { SERVICE_CATEGORIES } from '../../data/servicesData';

export default function AdminServices() {
  const { services, addService, updateService, deleteService } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSrv, setSelectedSrv] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Facial Treatments',
    duration: '45 mins',
    price: 250,
    shortDesc: '',
    image: '/images/services/service-hydrafacial.jpg'
  });

  const handleOpenEdit = (srv) => {
    setSelectedSrv(srv);
    setFormData({
      name: srv.name,
      category: srv.category,
      duration: srv.duration,
      price: srv.price,
      shortDesc: srv.shortDesc,
      image: srv.image
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedSrv) {
      updateService(selectedSrv.id, formData);
      setShowEditModal(false);
    }
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please enter treatment name.');
      return;
    }
    addService(formData);
    setShowAddModal(false);
    setFormData({
      name: '',
      category: 'Facial Treatments',
      duration: '45 mins',
      price: 250,
      shortDesc: '',
      image: '/images/services/service-hydrafacial.jpg'
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Treatment Catalogue & Pricing
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Create, edit, or retire clinical aesthetic procedures and set duration fees.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Add New Treatment
        </Button>
      </div>

      {/* Services Table */}
      <Table
        headers={[
          'Treatment & Media',
          'Category',
          'Duration',
          'Price',
          'Rating',
          { label: 'Actions', align: 'right' }
        ]}
      >
        {services.map((srv) => (
          <tr key={srv.id} className="hover:bg-surface-soft transition-colors">
            
            {/* Treatment & Media */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-10 h-10 rounded-lg object-cover border border-charcoal-200 shrink-0"
                />
                <div>
                  <strong className="text-xs text-charcoal-900 block font-bold">{srv.name}</strong>
                  <p className="text-[11px] text-charcoal-500 line-clamp-1 max-w-xs">{srv.shortDesc}</p>
                </div>
              </div>
            </td>

            {/* Category */}
            <td className="py-3.5 px-4">
              <Badge variant="sage" size="sm">{srv.category}</Badge>
            </td>

            {/* Duration */}
            <td className="py-3.5 px-4 text-xs text-charcoal-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-clinic-700" />
                {srv.duration}
              </span>
            </td>

            {/* Price */}
            <td className="py-3.5 px-4 font-serif font-bold text-clinic-900 text-sm">
              ${srv.price}
            </td>

            {/* Rating */}
            <td className="py-3.5 px-4 text-xs font-bold text-amber-800">
              ★ {srv.rating} ({srv.reviewsCount})
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-clinic-800 hover:bg-clinic-50 transition-colors"
                  title="Edit Treatment"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedSrv(srv);
                    setShowDeleteModal(true);
                  }}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Treatment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* 1. ADD SERVICE MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Clinical Treatment"
      >
        <form onSubmit={handleCreateService} className="space-y-4 text-xs">
          <Input
            label="Treatment Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Dermal Bio-Microneedling"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              options={SERVICE_CATEGORIES.filter(c => c !== 'All Treatments')}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 45 mins"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price ($ USD)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Select
              label="Select Local Image"
              options={[
                { value: '/images/services/service-hydrafacial.jpg', label: 'HydraFacial Image' },
                { value: '/images/services/service-laser.jpg', label: 'Laser Image' },
                { value: '/images/services/service-anti-aging.jpg', label: 'Anti-Aging Image' },
                { value: '/images/services/service-profhilo.jpg', label: 'Profhilo Image' },
                { value: '/images/services/service-co2.jpg', label: 'CO2 Image' },
                { value: '/images/services/service-hair.jpg', label: 'Hair Exosome Image' },
                { value: '/images/services/service-body.jpg', label: 'Body HIFEM Image' },
                { value: '/images/services/service-wellness.jpg', label: 'Wellness Drip Image' }
              ]}
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Summary Description
            </label>
            <textarea
              rows={3}
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
              placeholder="Clinical overview and mechanism of action..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Treatment
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. EDIT SERVICE MODAL */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit: ${selectedSrv?.name}`}
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <Input
            label="Treatment Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              options={SERVICE_CATEGORIES.filter(c => c !== 'All Treatments')}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <Input
            label="Price ($ USD)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Summary
            </label>
            <textarea
              rows={3}
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 p-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update Treatment
            </Button>
          </div>
        </form>
      </Modal>

      {/* 3. DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => selectedSrv && deleteService(selectedSrv.id)}
        title="Retire Treatment?"
        message={`Are you sure you want to remove "${selectedSrv?.name}" from the active clinical catalogue?`}
      />

    </div>
  );
}

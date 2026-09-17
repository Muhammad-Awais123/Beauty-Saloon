import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AdminGallery() {
  const { gallery } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinic Media & Facility Gallery
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Organize interior clinic photography, laser suite media, and treatment room assets.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Add Media Asset
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card">
            <div className="aspect-[4/3] bg-charcoal-900 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <Badge variant="sage" size="sm">{item.category}</Badge>
              </div>
            </div>
            <div className="p-3.5 text-xs">
              <h4 className="font-bold text-charcoal-900 truncate">{item.title}</h4>
              <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Gallery Photo"
      >
        <div className="space-y-4 text-xs">
          <Input label="Media Title" placeholder="e.g. VIP Recovery Lounge" />
          <Select label="Category" options={['Clinic', 'Treatments', 'Team', 'Results']} />
          <Input label="Description" placeholder="Short description..." />
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => {
              toast.success('Gallery media item created.');
              setShowAddModal(false);
            }}>
              Upload Item
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

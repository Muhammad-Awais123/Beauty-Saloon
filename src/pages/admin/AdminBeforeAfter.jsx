import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Layers, Plus, Trash2, Eye } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ImageCompareSlider from '../../components/common/ImageCompareSlider';

export default function AdminBeforeAfter() {
  const { beforeAfter } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Before & After Clinical Case Manager
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Manage standardized clinical outcome photography and patient case documentation.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Add New Case Study
        </Button>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beforeAfter.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-charcoal-200 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="sage" size="sm">{item.category}</Badge>
              <span className="text-[11px] text-charcoal-400">{item.sessionsCount}</span>
            </div>

            <ImageCompareSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              aspectRatio="aspect-[4/3]"
            />

            <div>
              <h3 className="font-serif font-bold text-sm text-charcoal-900">{item.title}</h3>
              <p className="text-xs font-semibold text-clinic-700">{item.serviceName}</p>
              <p className="text-[11px] text-charcoal-500 mt-1">Doctor: {item.doctor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Case Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Clinical Case Study"
      >
        <div className="space-y-4 text-xs">
          <Input label="Case Title" placeholder="e.g. Melasma Reduction Series" />
          <Input label="Treatment Name" placeholder="e.g. Pico Laser Toning" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Treating Doctor" placeholder="Dr. Elena Vance, MD" />
            <Input label="Protocol Sessions" placeholder="3 Sessions" />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => {
              toast.success('Clinical case study added to database.');
              setShowAddModal(false);
            }}>
              Save Case Study
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

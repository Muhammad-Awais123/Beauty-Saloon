import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Package, Plus, Edit2, Trash2, Clock, DollarSign, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

export default function AdminPackages() {
  const { packages } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Treatment Packages & Protocols
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Curate multi-modal bundled treatment plans with promotional package savings.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Create New Package
        </Button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="sage" size="sm">{pkg.duration}</Badge>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ${pkg.savings}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-charcoal-900 mb-1">{pkg.name}</h3>
              <p className="text-xs text-charcoal-500 mb-4">{pkg.tagline}</p>

              <div className="py-3 border-y border-charcoal-100 flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-serif font-bold text-clinic-900">${pkg.price}</span>
                <span className="text-xs text-charcoal-400 line-through">${pkg.originalPrice}</span>
              </div>

              <div className="space-y-1.5 text-xs text-charcoal-600 mb-4">
                <span className="font-bold text-[10px] text-charcoal-400 uppercase tracking-wider block mb-1">Treatments:</span>
                {pkg.treatmentsIncluded.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-clinic-700 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info('Package editor enabled')}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Curated Package"
      >
        <div className="space-y-4 text-xs">
          <Input label="Package Name" placeholder="e.g. VIP Total Glow Protocol" />
          <Input label="Tagline" placeholder="Brief clinical description..." />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Package Price ($)" type="number" placeholder="499" />
            <Input label="Original Value ($)" type="number" placeholder="650" />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => {
              toast.success('New package registered.');
              setShowAddModal(false);
            }}>
              Save Package
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Tag, Plus, Trash2, Calendar, Percent, Check, Clock } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AdminCoupons() {
  const { coupons, addCoupon, deleteCoupon } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 150,
    expiryDate: '2026-12-31',
    usageLimit: 300
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!formData.code) {
      toast.error('Please enter a promotion coupon code.');
      return;
    }
    addCoupon(formData);
    setShowAddModal(false);
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: 20,
      minSpend: 150,
      expiryDate: '2026-12-31',
      usageLimit: 300
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Promotions & Coupon Engine
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Create promotional discount codes for seasonal campaigns and tracking conversion redemption.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary" size="sm" icon={Plus}>
          Create New Promotion
        </Button>
      </div>

      {/* Coupons Grid / Table */}
      <Table
        headers={[
          'Promotion Code',
          'Offer Description',
          'Discount Type & Value',
          'Min Spend',
          'Expiry Date',
          'Usage Redemptions',
          'Status',
          { label: 'Actions', align: 'right' }
        ]}
      >
        {coupons.map((c) => (
          <tr key={c.id} className="hover:bg-surface-soft transition-colors">
            
            {/* Code */}
            <td className="py-3.5 px-4">
              <span className="font-mono text-xs font-bold text-clinic-900 bg-clinic-100 px-2.5 py-1 rounded border border-clinic-200">
                {c.code}
              </span>
            </td>

            {/* Description */}
            <td className="py-3.5 px-4 text-xs text-charcoal-700 max-w-xs">
              {c.description}
            </td>

            {/* Value */}
            <td className="py-3.5 px-4 text-xs font-bold text-charcoal-900">
              {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`}
            </td>

            {/* Min Spend */}
            <td className="py-3.5 px-4 text-xs text-charcoal-600">
              ${c.minSpend}
            </td>

            {/* Expiry */}
            <td className="py-3.5 px-4 text-xs text-charcoal-500">
              {c.expiryDate}
            </td>

            {/* Usage */}
            <td className="py-3.5 px-4 text-xs font-medium text-charcoal-800">
              {c.timesUsed} / {c.usageLimit} uses
            </td>

            {/* Status */}
            <td className="py-3.5 px-4">
              <Badge variant={c.status === 'active' ? 'success' : 'default'} size="sm">
                {c.status.toUpperCase()}
              </Badge>
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <button
                onClick={() => deleteCoupon(c.id)}
                className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete Coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Promotional Discount Code"
      >
        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
          <Input
            label="Promo Code (Upper Case)"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g. SUMMERGLOW"
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. 20% off all laser toning procedures"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Discount Type"
              options={[
                { value: 'percentage', label: 'Percentage (%)' },
                { value: 'fixed', label: 'Fixed Dollar ($)' }
              ]}
              value={formData.discountType}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
            />
            <Input
              label="Discount Value"
              type="number"
              value={formData.discountValue}
              onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Spend ($)"
              type="number"
              value={formData.minSpend}
              onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
            />
            <Input
              label="Usage Limit"
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
            />
          </div>
          <Input
            label="Expiration Date"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Activate Code
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

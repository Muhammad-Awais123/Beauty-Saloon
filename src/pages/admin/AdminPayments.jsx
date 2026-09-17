import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { CreditCard, DollarSign, RotateCcw, Search, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function AdminPayments() {
  const { payments } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const totalGross = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalRefunded = payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(p => {
    return p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Simulated Payments & Transactions Ledger
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Reconcile clinical fees, invoice settlements, digital receipts, and refund requests.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="p-3 rounded-xl bg-clinic-50 border border-clinic-200">
            <span className="text-[10px] text-clinic-700 uppercase font-bold block">Settled Volume</span>
            <strong className="text-base font-serif font-bold text-clinic-900">${totalGross.toLocaleString()}</strong>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] text-rose-700 uppercase font-bold block">Total Refunds</span>
            <strong className="text-base font-serif font-bold text-rose-900">${totalRefunded.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-charcoal-200 shadow-card flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Txn ID, Invoice, or Patient..."
            className="w-full rounded-lg border border-charcoal-200 pl-9 pr-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          />
        </div>
      </div>

      {/* Payments Table */}
      <Table
        headers={[
          'Transaction ID / Invoice',
          'Patient',
          'Treatment',
          'Payment Method',
          'Amount',
          'Status',
          'Date',
          { label: 'Actions', align: 'right' }
        ]}
      >
        {filteredPayments.map((p) => (
          <tr key={p.id} className="hover:bg-surface-soft transition-colors">
            
            {/* Txn / Invoice */}
            <td className="py-3.5 px-4">
              <span className="font-mono text-xs font-bold text-charcoal-900 block">{p.transactionId}</span>
              <span className="text-[10px] text-charcoal-400">{p.invoiceNumber}</span>
            </td>

            {/* Patient */}
            <td className="py-3.5 px-4">
              <strong className="text-xs text-charcoal-900 block">{p.customerName}</strong>
              <span className="text-[10px] text-charcoal-500">{p.customerEmail}</span>
            </td>

            {/* Treatment */}
            <td className="py-3.5 px-4 text-xs text-charcoal-700 font-medium">
              {p.serviceName}
            </td>

            {/* Method */}
            <td className="py-3.5 px-4 text-xs text-charcoal-600">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-clinic-700" />
                {p.method}
              </span>
            </td>

            {/* Amount */}
            <td className="py-3.5 px-4 font-serif font-bold text-clinic-900 text-sm">
              ${p.amount}
            </td>

            {/* Status */}
            <td className="py-3.5 px-4">
              <Badge
                variant={p.status === 'paid' ? 'success' : p.status === 'refunded' ? 'danger' : 'warning'}
                size="sm"
              >
                {p.status.toUpperCase()}
              </Badge>
            </td>

            {/* Date */}
            <td className="py-3.5 px-4 text-[11px] text-charcoal-500">
              {p.date}
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTxn(p);
                  setShowDetailModal(true);
                }}
                className="text-xs"
              >
                Invoice
              </Button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Invoice Modal */}
      {selectedTxn && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Electronic Clinic Invoice"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs text-left">
            <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
              <div>
                <p className="font-serif font-bold text-base text-charcoal-900">Élan Aesthetic Clinic</p>
                <p className="text-[11px] text-charcoal-500">450 Lexington Ave, Suite 1800, New York</p>
              </div>
              <Badge variant={selectedTxn.status === 'paid' ? 'success' : 'danger'} size="sm">
                {selectedTxn.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div>
                <span className="text-charcoal-400 block">Invoice Number:</span>
                <strong className="font-mono text-charcoal-900">{selectedTxn.invoiceNumber}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Transaction Reference:</span>
                <strong className="font-mono text-charcoal-900">{selectedTxn.transactionId}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 block">Billed Patient:</span>
                <span className="text-charcoal-900">{selectedTxn.customerName}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Settled Amount:</span>
                <span className="font-bold font-serif text-clinic-900 text-sm">${selectedTxn.amount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
              <Button variant="outline" size="sm" icon={Printer} onClick={() => window.print()}>
                Print Invoice
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

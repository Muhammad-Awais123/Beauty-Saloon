import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { FileSpreadsheet, Download, Calendar, DollarSign, Users, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';

export default function AdminReports() {
  const { appointments, customers, services, payments } = useApp();
  const [reportType, setReportType] = useState('revenue'); // revenue | appointments | customers | services
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Frontend CSV Export Generator
  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    let filename = `elan_${reportType}_report_${endDate}.csv`;

    if (reportType === 'revenue') {
      headers = ['Transaction ID', 'Booking ID', 'Customer', 'Service', 'Amount', 'Payment Method', 'Status', 'Date'];
      rows = payments.map(p => [
        p.transactionId, p.bookingId, p.customerName, p.serviceName, p.amount, p.method, p.status, p.date
      ]);
    } else if (reportType === 'appointments') {
      headers = ['Booking ID', 'Patient', 'Email', 'Phone', 'Service', 'Doctor', 'Date', 'Time', 'Total', 'Status'];
      rows = appointments.map(a => [
        a.bookingId, a.customerName, a.customerEmail, a.customerPhone, a.serviceName, a.specialistName, a.date, a.time, a.total, a.status
      ]);
    } else if (reportType === 'customers') {
      headers = ['Patient ID', 'Name', 'Email', 'Phone', 'Membership Tier', 'Total Visits', 'Total Spend', 'Loyalty Points'];
      rows = customers.map(c => [
        c.id, c.name, c.email, c.phone, c.membershipTier, c.totalVisits, c.totalSpent, c.loyaltyPoints
      ]);
    } else {
      headers = ['Service ID', 'Name', 'Category', 'Duration', 'Price', 'Rating', 'Reviews Count'];
      rows = services.map(s => [
        s.id, s.name, s.category, s.duration, s.price, s.rating, s.reviewsCount
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filename} successfully!`);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinical & Financial Reports
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Generate and download audited CSV reports for accounting and operational audits.
          </p>
        </div>

        <Button onClick={handleExportCSV} variant="primary" size="md" icon={Download}>
          Download CSV Report
        </Button>
      </div>

      {/* Configuration Card */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Report Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
            Select Report Dataset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'revenue', label: 'Financial Revenue Ledger', icon: DollarSign },
              { id: 'appointments', label: 'Appointments Registry', icon: Calendar },
              { id: 'customers', label: 'Patient CRM Directory', icon: Users },
              { id: 'services', label: 'Treatment Catalogue Stats', icon: Sparkles },
            ].map(r => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => setReportType(r.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    reportType === r.id
                      ? 'border-clinic-700 bg-clinic-50/70 ring-1 ring-clinic-700'
                      : 'border-charcoal-200 hover:border-charcoal-300 bg-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-3 ${reportType === r.id ? 'text-clinic-800' : 'text-charcoal-400'}`} />
                  <span className="text-xs font-bold text-charcoal-900">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-charcoal-100">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              From Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-charcoal-200 px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              To Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-charcoal-200 px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
            />
          </div>
        </div>

        {/* Report Preview */}
        <div className="p-4 rounded-xl bg-surface-soft border border-charcoal-200 text-xs text-charcoal-600 space-y-1.5">
          <span className="font-bold text-charcoal-900 block uppercase text-[10px]">Report Preview:</span>
          <p>Dataset: <strong>{reportType.toUpperCase()}</strong> • Total Records to export: <strong>{
            reportType === 'revenue' ? payments.length :
            reportType === 'appointments' ? appointments.length :
            reportType === 'customers' ? customers.length : services.length
          } rows</strong></p>
          <p className="text-charcoal-500 text-[11px]">Formatted as UTF-8 standard CSV compatible with Microsoft Excel, Apple Numbers, and Google Sheets.</p>
        </div>

      </div>

    </div>
  );
}

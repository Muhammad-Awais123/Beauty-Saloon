import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User, Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AdminCalendar() {
  const { appointments, team } = useApp();
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('all');

  // Generate week dates
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + (currentWeekOffset * 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + i; // Start on Monday
    const target = new Date(d.setDate(diff));
    return {
      dateStr: target.toISOString().split('T')[0],
      dayName: target.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: target.getDate(),
      monthName: target.toLocaleDateString('en-US', { month: 'short' }),
      isToday: target.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
    };
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinic Schedule & Calendar
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Visual room allocation and physician appointment matrix.
          </p>
        </div>

        {/* Doctor Filter & Week Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedDoctorFilter}
            onChange={(e) => setSelectedDoctorFilter(e.target.value)}
            className="rounded-lg border border-charcoal-200 px-3 py-1.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
          >
            <option value="all">All Specialists</option>
            {team.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 bg-surface-soft p-1 rounded-lg border border-charcoal-200">
            <button
              onClick={() => setCurrentWeekOffset(prev => prev - 1)}
              className="p-1 rounded text-charcoal-600 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentWeekOffset(0)}
              className="px-2.5 py-0.5 text-xs font-semibold text-charcoal-800 hover:bg-white rounded"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentWeekOffset(prev => prev + 1)}
              className="p-1 rounded text-charcoal-600 hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid View */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-card overflow-hidden">
        
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-charcoal-200 bg-surface-muted text-center text-xs font-semibold text-charcoal-700">
          {weekDays.map((day, idx) => (
            <div key={idx} className={`py-3 px-2 border-r last:border-r-0 border-charcoal-200 ${day.isToday ? 'bg-clinic-50 text-clinic-900 font-bold' : ''}`}>
              <span className="block text-[10px] uppercase text-charcoal-400">{day.dayName}</span>
              <span className="text-sm font-serif font-bold">{day.monthName} {day.dayNum}</span>
            </div>
          ))}
        </div>

        {/* Day Columns */}
        <div className="grid grid-cols-7 min-h-[480px] divide-x divide-charcoal-200">
          {weekDays.map((day, idx) => {
            const dayAppointments = appointments.filter(a => {
              const matchesDate = a.date === day.dateStr || (idx === 1 && a.status === 'confirmed') || (idx === 3 && a.status === 'pending');
              const matchesDoctor = selectedDoctorFilter === 'all' || a.specialistId === selectedDoctorFilter;
              return matchesDate && matchesDoctor;
            });

            return (
              <div key={idx} className={`p-2 space-y-2 text-left ${day.isToday ? 'bg-clinic-50/20' : ''}`}>
                {dayAppointments.slice(0, 3).map((apt, aptIdx) => (
                  <div
                    key={aptIdx}
                    className="p-2.5 rounded-lg bg-surface-soft border border-charcoal-200 hover:border-clinic-600 transition-all text-xs space-y-1 cursor-pointer shadow-subtle"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] text-clinic-900 truncate">{apt.time}</span>
                      <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'confirmed' ? 'sage' : 'warning'} size="sm">
                        {apt.status.slice(0, 4)}
                      </Badge>
                    </div>
                    <p className="font-semibold text-charcoal-900 truncate">{apt.serviceName}</p>
                    <p className="text-[10px] text-charcoal-500 truncate">{apt.customerName}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

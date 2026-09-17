import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Percent, 
  Sparkles, 
  Award, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';

export default function AdminAnalytics() {
  const { appointments, services, team, customers, payments } = useApp();
  const [timeRange, setTimeRange] = useState('30d');

  const totalRev = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Clinic Business Intelligence & Analytics
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Analyze procedure profitability, physician utilization, customer lifetime value, and retention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                timeRange === range
                  ? 'bg-clinic-700 text-white'
                  : 'bg-surface-soft text-charcoal-600 hover:bg-charcoal-100 border border-charcoal-200'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg. Spend / Patient"
          value={`$${Math.round(totalRev / Math.max(1, customers.length))}`}
          change="+14.2%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Booking Conversion"
          value="84.6%"
          change="+3.8%"
          isPositive={true}
          icon={Percent}
        />
        <StatCard
          title="Patient Retention Rate"
          value="78.2%"
          change="+5.1%"
          isPositive={true}
          icon={Users}
        />
        <StatCard
          title="Avg Session Occupancy"
          value="91.4%"
          change="+2.0%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Revenue Comparison (Solid SVG) */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-charcoal-900">Monthly Revenue Comparison</h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              YTD +24.8%
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { m: 'Oct', v: 48, num: '$14.2k' },
              { m: 'Nov', v: 62, num: '$18.9k' },
              { m: 'Dec', v: 88, num: '$26.4k' },
              { m: 'Jan', v: 70, num: '$21.0k' },
              { m: 'Feb', v: 82, num: '$24.6k' },
              { m: 'Mar', v: 95, num: '$28.8k' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[10px] font-mono text-charcoal-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {col.num}
                </span>
                <div className="w-full bg-surface-muted rounded-t h-32 flex items-end">
                  <div
                    className="w-full bg-clinic-700 group-hover:bg-clinic-800 rounded-t transition-all"
                    style={{ height: `${col.v}%` }}
                  />
                </div>
                <span className="text-xs text-charcoal-600 font-medium">{col.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Utilization & Performance */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-card space-y-4">
          <h3 className="font-serif font-bold text-base text-charcoal-900">Specialist Performance & Volume</h3>
          
          <div className="space-y-4 text-xs">
            {team.map((t) => (
              <div key={t.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-charcoal-800">
                  <div className="flex items-center gap-2">
                    <img src={t.image} alt={t.name} className="w-6 h-6 rounded-full object-cover border border-charcoal-200" />
                    <span className="font-bold">{t.name}</span>
                  </div>
                  <span className="font-semibold text-clinic-900 font-serif">★ {t.rating} ({t.reviewsCount} reviews)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-muted overflow-hidden">
                  <div
                    className="h-full bg-clinic-700 rounded-full"
                    style={{ width: `${Math.min(100, t.reviewsCount / 2.2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

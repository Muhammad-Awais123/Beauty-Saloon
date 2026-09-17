import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield, User, Globe, RotateCcw } from 'lucide-react';

export default function PortfolioAgencyBar() {
  const { currentUser, quickSwitch } = useAuth();
  const { resetDemoData } = useApp();
  const location = useLocation();

  const isPublic = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/dashboard');
  const isCustomer = location.pathname.startsWith('/dashboard');
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="bg-charcoal-900 text-white text-xs py-1.5 px-4 border-b border-charcoal-800 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Agency branding */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-sand-300 tracking-wide">Fakiha Core Technologies</span>
          <span className="text-charcoal-400 hidden sm:inline">|</span>
          <span className="text-charcoal-300 hidden md:inline">Élan Aesthetic Platform Demo</span>
        </div>

        {/* Right: Quick Role Switcher for Portfolio Reviewers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-charcoal-400 hidden lg:inline mr-1">Switch View:</span>
          
          <Link
            to="/"
            onClick={() => quickSwitch('guest')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isPublic 
                ? 'bg-clinic-700 text-white' 
                : 'bg-charcoal-800 text-charcoal-300 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Public Site</span>
          </Link>

          <Link
            to="/dashboard"
            onClick={() => quickSwitch('customer')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isCustomer 
                ? 'bg-clinic-700 text-white' 
                : 'bg-charcoal-800 text-charcoal-300 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Customer Portal</span>
          </Link>

          <Link
            to="/admin"
            onClick={() => quickSwitch('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              isAdmin 
                ? 'bg-clinic-700 text-white' 
                : 'bg-charcoal-800 text-charcoal-300 hover:text-white hover:bg-charcoal-700'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Admin Suite</span>
          </Link>

          <button
            onClick={resetDemoData}
            title="Reset Mock Data to Initial State"
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-charcoal-800 text-charcoal-400 hover:text-rose-300 hover:bg-charcoal-700 transition-colors ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

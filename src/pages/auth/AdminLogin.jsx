import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, Lock, Mail, ArrowRight, Sparkles, 
  KeyRound, ShieldAlert, CheckCircle, Eye, EyeOff, Building2, ChevronRight 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(email, password, 'admin');
    if (res.success) {
      navigate('/admin');
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@demo.com');
    setPassword('admin123');
    toast.info('Admin credentials autofilled.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 bg-charcoal-900 text-charcoal-100 animate-fade-in">
      <div className="w-full max-w-4xl bg-white text-charcoal-800 rounded-3xl border border-charcoal-700 shadow-elevated overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-left">
        
        {/* LEFT PANEL: Security & Clinical Operations (5 cols) */}
        <div className="lg:col-span-5 bg-charcoal-800 text-white p-8 sm:p-10 flex flex-col justify-between relative">
          
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md group-hover:bg-clinic-600 transition-colors">
                É
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wider text-white leading-none">ÉLAN</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-sand-300 mt-1">Management Portal</span>
              </div>
            </Link>

            <div className="pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Clinical Operations & Administration
              </h2>
              <p className="text-xs text-charcoal-300 mt-2 leading-relaxed">
                Centralized command console for appointments, patient CRM records, revenue ledger, practitioner shifts, and marketing CMS.
              </p>
            </div>
          </div>

          {/* Module Badges */}
          <div className="my-8 space-y-2.5">
            <div className="p-3 rounded-xl bg-charcoal-700/80 border border-charcoal-600 flex items-center gap-3">
              <Building2 className="w-4 h-4 text-clinic-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">17 Practice Modules Active</p>
                <p className="text-[11px] text-charcoal-400">Full EHR, POS, Analytics & Telehealth</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-700/80 border border-charcoal-600 flex items-center gap-3">
              <KeyRound className="w-4 h-4 text-clinic-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Role-Based Access Control</p>
                <p className="text-[11px] text-charcoal-400">Medical Director & Operational Staff</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-700 flex items-center justify-between text-[11px] text-charcoal-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Encrypted Audit Logs
            </span>
            <span>Version 2.4.0</span>
          </div>

        </div>

        {/* RIGHT PANEL: Login Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between border-b border-charcoal-200 pb-3 mb-6">
              <h1 className="text-xl font-serif font-bold text-charcoal-900">
                Staff Authentication
              </h1>
              <span className="text-xs font-semibold text-clinic-700 bg-clinic-50 px-2.5 py-1 rounded-full border border-clinic-200">
                Authorized Personnel
              </span>
            </div>

            {/* Demo Credentials Pill */}
            <div className="mb-6 p-3.5 rounded-2xl bg-surface-soft border border-charcoal-200 flex items-center justify-between gap-3 text-xs text-charcoal-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-clinic-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-charcoal-900">Admin Demo Access:</span>
                  <span className="text-charcoal-600 ml-1.5 font-mono text-[11px]">admin@demo.com</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleFillAdmin}
                className="px-3 py-1 rounded-lg bg-charcoal-800 text-white font-semibold text-xs hover:bg-charcoal-900 transition-colors shadow-sm button-press-effect flex-shrink-0"
              >
                Autofill
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Staff Email Address"
                type="email"
                required
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
              />

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Security Passphrase
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[11px] text-charcoal-400 hover:text-charcoal-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                className="w-full py-3 text-sm font-semibold rounded-xl shadow-sm card-hover-effect button-press-effect" 
                icon={ArrowRight} 
                iconPosition="right"
              >
                Authenticate & Launch Admin Suite
              </Button>
            </form>
          </div>

          {/* Footnote */}
          <div className="pt-4 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-500">
            <Link to="/" className="hover:text-clinic-800 font-medium inline-flex items-center gap-1">
              ← Return to Main Website
            </Link>
            <Link to="/login" className="text-clinic-700 hover:underline font-semibold inline-flex items-center gap-1">
              Patient Portal Login <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

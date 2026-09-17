import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, 
  Eye, EyeOff, Heart, Calendar, Award, Phone, Mail, ChevronRight 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('customer@demo.com');
  const [password, setPassword] = useState('customer123');
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(email, password, 'customer');
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      toast.error('Please complete all required fields.');
      return;
    }
    // Simulate instant patient onboarding
    const res = login(regEmail, regPassword, 'customer');
    toast.success(`Welcome to Élan Aesthetic Clinic, ${regName}!`);
    navigate('/dashboard');
  };

  const handleFillCustomer = () => {
    setActiveTab('login');
    setEmail('customer@demo.com');
    setPassword('customer123');
    toast.info('Demo patient credentials loaded.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 bg-surface-soft animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-charcoal-200/90 shadow-elevated overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-left">
        
        {/* LEFT PANEL: Brand Showcase & VIP Benefits (5 cols) */}
        <div className="lg:col-span-5 bg-clinic-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Brand Logo */}
          <div className="space-y-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md group-hover:bg-clinic-600 transition-colors">
                É
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wider text-white leading-none">ÉLAN</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-sand-300 mt-1">Aesthetic Clinic</span>
              </div>
            </Link>

            <div className="pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Your Personal Aesthetic Journey
              </h2>
              <p className="text-xs text-clinic-200 mt-2 leading-relaxed">
                Access your medical consultation records, manage scheduled appointments, and unlock member privileges.
              </p>
            </div>
          </div>

          {/* Center Features List */}
          <div className="my-8 space-y-3 relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-clinic-800/80 border border-clinic-700/60">
              <div className="w-8 h-8 rounded-lg bg-clinic-700 flex items-center justify-center text-sand-300 flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Instant Rescheduling</p>
                <p className="text-[11px] text-clinic-300">Change appointment slots 24/7 without call waiting</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-clinic-800/80 border border-clinic-700/60">
              <div className="w-8 h-8 rounded-lg bg-clinic-700 flex items-center justify-center text-sand-300 flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Platinum VIP Rewards</p>
                <p className="text-[11px] text-clinic-300">Earn 5% back in clinic credit on all treatments</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-clinic-800/80 border border-clinic-700/60">
              <div className="w-8 h-8 rounded-lg bg-clinic-700 flex items-center justify-center text-sand-300 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Confidential Medical Vault</p>
                <p className="text-[11px] text-clinic-300">Skin progress photos and treatment history</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="pt-4 border-t border-clinic-800/80 flex items-center justify-between text-[11px] text-clinic-300 relative z-10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              256-Bit Encrypted Data
            </span>
            <span>Board Certified</span>
          </div>

        </div>

        {/* RIGHT PANEL: Tabbed Authentication Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Header / Tabs */}
            <div className="flex items-center justify-between border-b border-charcoal-200 pb-3 mb-6">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`relative py-1 text-sm font-semibold transition-colors ${
                    activeTab === 'login'
                      ? 'text-clinic-900 font-bold after:content-[""] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2.5px] after:bg-clinic-700'
                      : 'text-charcoal-400 hover:text-charcoal-700'
                  }`}
                >
                  Patient Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`relative py-1 text-sm font-semibold transition-colors ${
                    activeTab === 'register'
                      ? 'text-clinic-900 font-bold after:content-[""] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2.5px] after:bg-clinic-700'
                      : 'text-charcoal-400 hover:text-charcoal-700'
                  }`}
                >
                  New Patient Register
                </button>
              </div>

              <span className="text-[11px] text-charcoal-400 hidden sm:inline">
                Élan Aesthetic Portal
              </span>
            </div>

            {/* Quick Demo Helper Banner */}
            <div className="mb-6 p-3.5 rounded-2xl bg-clinic-50 border border-clinic-200 flex items-center justify-between gap-3 text-xs text-clinic-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-clinic-700 flex-shrink-0" />
                <div>
                  <span className="font-bold">Portfolio Reviewer Demo:</span>
                  <span className="text-clinic-700 ml-1.5 font-mono text-[11px]">customer@demo.com</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleFillCustomer}
                className="px-3 py-1 rounded-lg bg-clinic-700 text-white font-semibold text-xs hover:bg-clinic-800 transition-colors shadow-sm button-press-effect flex-shrink-0"
              >
                1-Click Autofill
              </button>
            </div>

            {/* SIGN IN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
                <Input
                  label="Email Address"
                  type="email"
                  required
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => toast.info('Demo password is: customer123')}
                      className="text-xs text-clinic-700 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
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
                  Sign In to Patient Portal
                </Button>
              </form>
            )}

            {/* NEW PATIENT REGISTRATION FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5 animate-fade-in">
                <Input
                  label="Full Name"
                  type="text"
                  required
                  icon={User}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    icon={Mail}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    icon={Phone}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <Input
                  label="Create Password"
                  type="password"
                  required
                  icon={Lock}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                />

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md" 
                  className="w-full py-3 text-sm font-semibold rounded-xl shadow-sm card-hover-effect button-press-effect" 
                  icon={CheckCircle2}
                >
                  Create Patient Account
                </Button>
              </form>
            )}

          </div>

          {/* FOOTNOTE */}
          <div className="pt-4 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-500">
            <Link to="/" className="hover:text-clinic-800 font-medium inline-flex items-center gap-1">
              ← Return to Clinic Home
            </Link>
            <Link to="/admin/login" className="text-clinic-700 hover:underline font-semibold inline-flex items-center gap-1">
              Admin Operations Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

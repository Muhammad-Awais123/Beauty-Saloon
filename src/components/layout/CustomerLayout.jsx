import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Heart, 
  Star, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import Button from '../common/Button';

export default function CustomerLayout() {
  const { currentUser, logout } = useAuth();
  const { notifications } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const customerUnreadNotifs = notifications.filter(n => n.target === 'customer' && !n.read).length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/appointments', label: 'My Appointments', icon: Calendar },
    { to: '/dashboard/profile', label: 'Patient Profile', icon: User },
    { to: '/dashboard/favorites', label: 'Saved Treatments', icon: Heart },
    { to: '/dashboard/reviews', label: 'My Reviews', icon: Star },
    { to: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: customerUnreadNotifs },
    { to: '/dashboard/settings', label: 'Account Settings', icon: Settings },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-clinic-700 text-white shadow-sm'
        : 'text-charcoal-700 hover:bg-clinic-50 hover:text-clinic-800'
    }`;

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col">
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-charcoal-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-charcoal-700 hover:bg-charcoal-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-sm">
            É
          </div>
          <span className="font-serif font-bold text-base text-charcoal-900">Élan Portal</span>
        </Link>

        <Link to="/appointments" className="text-xs font-semibold text-clinic-700">
          + Book
        </Link>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white rounded-2xl border border-charcoal-200 p-5 shadow-card self-start sticky top-24">
          
          {/* Patient Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-soft border border-charcoal-100 mb-6 text-left">
            <img
              src={currentUser?.avatar || '/images/team/team-doctor-03.jpg'}
              alt={currentUser?.name}
              className="w-11 h-11 rounded-full object-cover border border-clinic-600 shrink-0"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-charcoal-900 truncate">{currentUser?.name || 'Emily Watson'}</h3>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-clinic-100 text-clinic-800 mt-0.5">
                {currentUser?.membershipTier || 'Platinum Elite'}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 flex-1 text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={linkClass}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge) && (
                    <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 mt-6 border-t border-charcoal-100 space-y-2 text-left">
            <Button
              to="/appointments"
              variant="primary"
              size="sm"
              icon={Calendar}
              className="w-full justify-start"
            >
              Book New Treatment
            </Button>
            <Button
              to="/"
              variant="ghost"
              size="sm"
              icon={Globe}
              className="w-full justify-start text-xs text-charcoal-600"
            >
              Back to Public Site
            </Button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-charcoal-900/50" onClick={() => setMobileOpen(false)} />
            <div className="relative w-64 bg-white p-5 flex flex-col justify-between h-full z-10">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-sm">
                      É
                    </div>
                    <span className="font-serif font-bold text-base text-charcoal-900">Élan Portal</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)}>
                    <X className="w-5 h-5 text-charcoal-500" />
                  </button>
                </div>

                <nav className="space-y-1 text-left">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileOpen(false)}
                        className={linkClass}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-charcoal-100 space-y-2">
                <Button to="/appointments" variant="primary" size="sm" className="w-full" onClick={() => setMobileOpen(false)}>
                  Book Treatment
                </Button>
                <Button to="/" variant="ghost" size="sm" className="w-full text-xs" onClick={() => setMobileOpen(false)}>
                  Back to Website
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main key={window.location.pathname} className="flex-1 min-w-0 animate-fade-in">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarDays,
  Users, 
  UserCog, 
  Sparkles, 
  Package, 
  Image as ImageIcon, 
  Layers, 
  FileText, 
  Star, 
  CreditCard, 
  Tag, 
  Bell, 
  TrendingUp, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import Button from '../common/Button';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const { notifications, resetDemoData } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const adminUnreadNotifs = notifications.filter(n => n.target === 'admin' && !n.read).length;

  const navSections = [
    {
      group: 'Operations',
      items: [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
        { to: '/admin/calendar', label: 'Clinic Calendar', icon: CalendarDays },
        { to: '/admin/customers', label: 'Customers CRM', icon: Users },
        { to: '/admin/staff', label: 'Staff Management', icon: UserCog },
      ]
    },
    {
      group: 'Services & Content',
      items: [
        { to: '/admin/services', label: 'Services', icon: Sparkles },
        { to: '/admin/packages', label: 'Packages', icon: Package },
        { to: '/admin/before-after', label: 'Before & After', icon: Layers },
        { to: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
        { to: '/admin/blog', label: 'Blog CMS', icon: FileText },
        { to: '/admin/reviews', label: 'Reviews', icon: Star },
      ]
    },
    {
      group: 'Finance & Marketing',
      items: [
        { to: '/admin/payments', label: 'Payments', icon: CreditCard },
        { to: '/admin/coupons', label: 'Coupons & Promos', icon: Tag },
        { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: adminUnreadNotifs },
      ]
    },
    {
      group: 'Intelligence & Config',
      items: [
        { to: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
        { to: '/admin/reports', label: 'Reports & Export', icon: FileSpreadsheet },
        { to: '/admin/settings', label: 'Clinic Settings', icon: Settings },
      ]
    }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-clinic-800 text-white font-semibold shadow-sm'
        : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-[#F4F5F0] flex flex-col antialiased">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-charcoal-900 text-white border-b border-charcoal-800 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg text-charcoal-400 hover:text-white hover:bg-charcoal-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-sm">
              É
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-base tracking-wide text-white">ÉLAN</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sand-300 hidden sm:inline">Admin Operations Suite</span>
            </div>
          </Link>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3">
          
          {/* Link back to public site */}
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-800 text-charcoal-300 hover:text-white text-xs transition-colors border border-charcoal-700"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-lg text-charcoal-300 hover:text-white hover:bg-charcoal-800 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {adminUnreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white text-charcoal-800 shadow-elevated border border-charcoal-200 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-charcoal-100">
                  <span className="text-xs font-bold text-charcoal-900">Admin Notifications</span>
                  <Link
                    to="/admin/notifications"
                    className="text-[11px] text-clinic-700 hover:underline"
                    onClick={() => setNotifDropdownOpen(false)}
                  >
                    View All
                  </Link>
                </div>
                <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                  {notifications.filter(n => n.target === 'admin').slice(0, 3).map(n => (
                    <div key={n.id} className="p-2 rounded-lg bg-surface-soft border border-charcoal-100 text-xs">
                      <p className="font-semibold text-charcoal-900">{n.title}</p>
                      <p className="text-[11px] text-charcoal-500 line-clamp-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-charcoal-800">
            <img
              src="/images/team/team-doctor-01.jpg"
              alt="Admin"
              className="w-7 h-7 rounded-full object-cover border border-clinic-600"
            />
            <div className="hidden md:block text-left leading-tight">
              <span className="text-xs font-bold block text-white">Dr. Elena Vance</span>
              <span className="text-[10px] text-sand-300">Medical Director (Admin)</span>
            </div>
          </div>

          {/* Sign out */}
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            title="Sign Out"
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (17 Sections) */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-charcoal-900 text-charcoal-300 border-r border-charcoal-800 py-4 px-3 overflow-y-auto">
          <nav className="space-y-6 flex-1 text-left">
            {navSections.map((sec, idx) => (
              <div key={idx}>
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1.5">
                  {sec.group}
                </span>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
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
                          <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Slide-Over Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-charcoal-900/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-64 bg-charcoal-900 text-charcoal-300 p-4 flex flex-col justify-between h-full z-10 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-800">
                  <span className="font-serif font-bold text-white text-base">Admin Operations</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-charcoal-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-6 text-left">
                  {navSections.map((sec, idx) => (
                    <div key={idx}>
                      <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                        {sec.group}
                      </span>
                      <div className="space-y-0.5">
                        {sec.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              end={item.end}
                              onClick={() => setSidebarOpen(false)}
                              className={linkClass}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </div>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main key={window.location.pathname} className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

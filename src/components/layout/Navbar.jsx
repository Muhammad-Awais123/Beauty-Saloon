
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  Calendar,
  User,
  Shield,
  ChevronDown,
  LogIn,
  ArrowUpRight,
} from 'lucide-react';
import Button from '../common/Button';

const DESKTOP_NAV = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Specialists', to: '/team' },
  { label: 'Packages', to: '/pricing' },
  { label: 'Before & After', to: '/before-after' },
  { label: 'Journal', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const MOBILE_NAV = [
  { label: 'Home', to: '/', end: true },
  { label: 'About the Clinic', to: '/about' },
  { label: 'Treatments & Services', to: '/services' },
  { label: 'Our Specialists', to: '/team' },
  { label: 'Treatment Packages', to: '/pricing' },
  { label: 'Before & After Gallery', to: '/before-after' },
  { label: 'Clinic Gallery', to: '/gallery' },
  { label: 'Medical Journal', to: '/blog' },
  { label: 'Patient FAQ', to: '/faq' },
  { label: 'Contact & Location', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef(null);

  const { currentUser, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  /* ------------------------------------------------------------
     Scroll state
  ------------------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ------------------------------------------------------------
     Close menus on route change
  ------------------------------------------------------------ */
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  /* ------------------------------------------------------------
     Close account dropdown when clicking outside
  ------------------------------------------------------------ */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  /* ------------------------------------------------------------
     Prevent body scroll when mobile menu is open
  ------------------------------------------------------------ */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ------------------------------------------------------------
     Navigation styles
  ------------------------------------------------------------ */
  const navLinkClass = ({ isActive }) =>
    [
      'relative flex items-center',
      'py-2 text-[13px] xl:text-sm',
      'font-medium tracking-[0.01em]',
      'transition-colors duration-200',
      'after:absolute after:left-0 after:-bottom-1',
      'after:h-[2px] after:rounded-full',
      'after:bg-clinic-700',
      'after:transition-all after:duration-300',
      isActive
        ? 'text-clinic-900 after:w-full'
        : 'text-charcoal-700 hover:text-clinic-900 after:w-0 hover:after:w-full',
    ].join(' ');

  const mobileNavLinkClass = ({ isActive }) =>
    [
      'group flex items-center justify-between',
      'w-full px-4 py-3.5 rounded-xl',
      'text-sm font-medium',
      'transition-all duration-200',
      isActive
        ? 'bg-clinic-50 text-clinic-900 shadow-sm'
        : 'text-charcoal-700 hover:bg-surface-muted hover:text-clinic-900',
    ].join(' ');

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile navigation */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-charcoal-900/20 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <header
        className={[
          'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl',
          'transition-all duration-300',
          isScrolled
            ? 'border-b border-charcoal-200 shadow-sm'
            : 'border-b border-charcoal-100',
        ].join(' ')}
      >
        <div
          className={[
            'mx-auto max-w-[1440px]',
            'px-4 sm:px-6 lg:px-8 xl:px-10',
            'transition-all duration-300',
            isScrolled
              ? 'py-2.5 sm:py-3'
              : 'py-3.5 sm:py-4',
          ].join(' ')}
        >
          <div className="flex min-h-[48px] items-center justify-between gap-3">
            {/* --------------------------------------------------
                LEFT: Mobile menu + Logo
            -------------------------------------------------- */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={[
                  'lg:hidden flex h-10 w-10 shrink-0 items-center justify-center',
                  'rounded-xl border border-charcoal-200',
                  'text-charcoal-700',
                  'transition-all duration-200',
                  'hover:border-clinic-300 hover:bg-clinic-50 hover:text-clinic-800',
                  'active:scale-95',
                ].join(' ')}
                aria-label={
                  mobileMenuOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
                }
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <Link
                to="/"
                className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
                aria-label="ÉLAN Aesthetic Clinic home"
              >
                {/* Logo mark */}
                <div
                  className={[
                    'relative flex shrink-0 items-center justify-center',
                    'h-10 w-10 sm:h-11 sm:w-11',
                    'rounded-xl bg-clinic-700 text-white',
                    'shadow-sm',
                    'transition-all duration-300',
                    'group-hover:rounded-[14px] group-hover:bg-clinic-800',
                  ].join(' ')}
                >
                  <span className="font-serif text-lg font-bold sm:text-xl">
                    É
                  </span>
                </div>

                {/* Wordmark */}
                <div className="min-w-0 text-left">
                  <span
                    className={[
                      'block truncate',
                      'font-serif text-lg font-bold leading-none',
                      'tracking-[0.16em] text-charcoal-900',
                      'sm:text-xl',
                    ].join(' ')}
                  >
                    ÉLAN
                  </span>

                  <span
                    className={[
                      'mt-1 block truncate',
                      'text-[8px] font-semibold uppercase leading-none',
                      'tracking-[0.19em] text-clinic-700',
                      'sm:text-[9px]',
                    ].join(' ')}
                  >
                    Aesthetic Clinic
                  </span>
                </div>
              </Link>
            </div>

            {/* --------------------------------------------------
                CENTER: Desktop Navigation
            -------------------------------------------------- */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 2xl:gap-8"
            >
              {DESKTOP_NAV.map(({ label, to, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={navLinkClass}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* --------------------------------------------------
                RIGHT: Account + Booking
            -------------------------------------------------- */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* Account */}
              <div ref={accountRef} className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setAccountOpen((prev) => !prev)}
                      className={[
                        'flex items-center gap-2',
                        'rounded-full border border-charcoal-200',
                        'bg-white px-1.5 py-1.5 pr-2.5',
                        'transition-all duration-200',
                        'hover:border-clinic-400 hover:shadow-sm',
                      ].join(' ')}
                      aria-expanded={accountOpen}
                      aria-haspopup="menu"
                    >
                      <img
                        src={
                          currentUser?.avatar ||
                          '/images/team/team-doctor-03.jpg'
                        }
                        alt={currentUser?.name || 'User'}
                        className="h-7 w-7 rounded-full border border-clinic-300 object-cover"
                      />

                      <span className="hidden max-w-[80px] truncate text-xs font-semibold text-charcoal-800 sm:block">
                        {currentUser?.name?.split(' ')[0]}
                      </span>

                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 text-charcoal-500',
                          'transition-transform duration-200',
                          accountOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>

                    {accountOpen && (
                      <div
                        role="menu"
                        className={[
                          'absolute right-0 top-full mt-2',
                          'w-60 overflow-hidden rounded-2xl',
                          'border border-charcoal-200 bg-white',
                          'shadow-xl shadow-charcoal-900/10',
                          'animate-in fade-in slide-in-from-top-2 duration-200',
                        ].join(' ')}
                      >
                        <div className="border-b border-charcoal-100 bg-surface-soft px-4 py-3">
                          <p className="truncate text-sm font-bold text-charcoal-900">
                            {currentUser?.name}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-charcoal-500">
                            {currentUser?.email}
                          </p>
                        </div>

                        <Link
                          to={isAdmin ? '/admin' : '/dashboard'}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-medium text-charcoal-700 transition-colors hover:bg-clinic-50 hover:text-clinic-900"
                          role="menuitem"
                        >
                          {isAdmin ? (
                            <Shield className="h-4 w-4 text-clinic-700" />
                          ) : (
                            <User className="h-4 w-4 text-clinic-700" />
                          )}

                          <span>
                            {isAdmin ? 'Admin Suite' : 'My Dashboard'}
                          </span>

                          <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-charcoal-400" />
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                          role="menuitem"
                        >
                          <LogIn className="h-4 w-4 rotate-180" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={[
                      'hidden sm:inline-flex items-center gap-2',
                      'rounded-xl px-3 py-2',
                      'text-xs font-semibold text-charcoal-700',
                      'transition-all duration-200',
                      'hover:bg-surface-soft hover:text-clinic-900',
                    ].join(' ')}
                  >
                    <LogIn className="h-4 w-4 text-charcoal-500" />
                    Portal Login
                  </Link>
                )}
              </div>

              {/* Booking CTA */}
              <Button
                to="/appointments"
                variant="primary"
                size="sm"
                icon={Calendar}
                className={[
                  'rounded-full px-3.5 sm:px-5',
                  'py-2.5 text-xs sm:text-sm',
                  'font-semibold',
                  'shadow-sm hover:shadow-md',
                  'transition-all duration-200',
                  'active:scale-[0.98]',
                ].join(' ')}
              >
                <span className="hidden sm:inline">
                  Book Appointment
                </span>
                <span className="sm:hidden">Book</span>
              </Button>
            </div>
          </div>

          {/* ----------------------------------------------------
              MOBILE NAVIGATION
          ---------------------------------------------------- */}
          <div
            className={[
              'lg:hidden overflow-hidden',
              'transition-all duration-300 ease-out',
              mobileMenuOpen
                ? 'max-h-[calc(100vh-80px)] opacity-100'
                : 'max-h-0 opacity-0',
            ].join(' ')}
          >
            <div className="mt-3 border-t border-charcoal-100 pt-3 pb-4">
              <nav
                aria-label="Mobile navigation"
                className="max-h-[60vh] space-y-1 overflow-y-auto pr-1"
              >
                {MOBILE_NAV.map(({ label, to, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={mobileNavLinkClass}
                    onClick={closeMobileMenu}
                  >
                    <span>{label}</span>

                    <ArrowUpRight
                      className={[
                        'h-4 w-4',
                        'text-charcoal-300',
                        'transition-all duration-200',
                        'group-hover:translate-x-0.5',
                        'group-hover:text-clinic-700',
                      ].join(' ')}
                    />
                  </NavLink>
                ))}
              </nav>

              {/* Mobile account section */}
              <div className="mt-4 border-t border-charcoal-100 pt-4">
                {isAuthenticated ? (
                  <div className="rounded-2xl border border-charcoal-200 bg-surface-soft p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          currentUser?.avatar ||
                          '/images/team/team-doctor-03.jpg'
                        }
                        alt={currentUser?.name || 'User'}
                        className="h-10 w-10 rounded-full border border-clinic-300 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-charcoal-900">
                          {currentUser?.name}
                        </p>

                        <Link
                          to={isAdmin ? '/admin' : '/dashboard'}
                          onClick={closeMobileMenu}
                          className="text-xs font-semibold text-clinic-700 hover:underline"
                        >
                          Open {isAdmin ? 'Admin Suite' : 'Dashboard'}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      to="/login"
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl"
                      onClick={closeMobileMenu}
                    >
                      Client Login
                    </Button>

                    <Button
                      to="/admin/login"
                      variant="sand"
                      size="sm"
                      className="w-full rounded-xl"
                      onClick={closeMobileMenu}
                    >
                      Admin Portal
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile booking CTA */}
              <Button
                to="/appointments"
                variant="primary"
                size="sm"
                icon={Calendar}
                className="mt-3 w-full rounded-xl py-3 font-semibold"
                onClick={closeMobileMenu}
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

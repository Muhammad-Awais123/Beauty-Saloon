import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to Élan Aesthetic Insights!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-charcoal-900 text-charcoal-300 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <Link to="/" className="flex items-center gap-3 mb-4 select-none">
              <div className="w-10 h-10 rounded-lg bg-clinic-700 text-white flex items-center justify-center font-serif font-bold text-2xl">
                É
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-wider text-white leading-none">
                  ÉLAN
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sand-400 leading-tight mt-0.5">
                  Aesthetic Clinic
                </span>
              </div>
            </Link>
            <p className="text-sm text-charcoal-400 leading-relaxed mb-6 max-w-sm">
              Advanced medical aesthetics and regenerative skincare led by board-certified dermatologists. Combining state-of-the-art energy devices with refined artistic precision.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
              <label className="block text-xs font-semibold uppercase tracking-wider text-sand-300 mb-2">
                Join the VIP Aesthetic Journal
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-charcoal-800 border border-charcoal-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-charcoal-500 focus:outline-none focus:border-clinic-500 w-full"
                  required
                />
                <Button type="submit" variant="primary" size="sm" icon={Send}>
                  Join
                </Button>
              </div>
              <p className="text-[11px] text-charcoal-500 mt-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-clinic-400" />
                Discreet aesthetic tips. No spam, ever.
              </p>
            </form>
          </div>

          {/* Column 2: Treatments */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-400">
              <li><Link to="/services/hydrafacial-elite" className="hover:text-sand-300 transition-colors">HydraFacial Elite</Link></li>
              <li><Link to="/services/pico-laser-toning" className="hover:text-sand-300 transition-colors">Pico Laser Toning</Link></li>
              <li><Link to="/services/botox-anti-wrinkle" className="hover:text-sand-300 transition-colors">Precision Botulinum Toxin</Link></li>
              <li><Link to="/services/profhilo-bio-remodeling" className="hover:text-sand-300 transition-colors">Profhilo® Bio-Remodeling</Link></li>
              <li><Link to="/services/co2-fractional-laser" className="hover:text-sand-300 transition-colors">CO2 Fractional Laser</Link></li>
              <li><Link to="/services/exosome-regenerative-therapy" className="hover:text-sand-300 transition-colors">Exosome Scalp & Skin</Link></li>
              <li><Link to="/pricing" className="text-sand-400 font-semibold hover:underline">View All Packages →</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-400">
              <li><Link to="/about" className="hover:text-sand-300 transition-colors">About Our Clinic</Link></li>
              <li><Link to="/team" className="hover:text-sand-300 transition-colors">Medical Specialists</Link></li>
              <li><Link to="/before-after" className="hover:text-sand-300 transition-colors">Before & After Results</Link></li>
              <li><Link to="/gallery" className="hover:text-sand-300 transition-colors">Clinic Tour & Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-sand-300 transition-colors">Scientific Medical Blog</Link></li>
              <li><Link to="/faq" className="hover:text-sand-300 transition-colors">Patient FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-sand-300 transition-colors">Appointment & Location</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Concierge
            </h4>
            <div className="space-y-3 text-xs text-charcoal-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-clinic-400 shrink-0 mt-0.5" />
                <span>450 Lexington Ave, Suite 1800, New York, NY 10017</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-clinic-400 shrink-0" />
                <span>+1 (800) 555-ELAN</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-clinic-400 shrink-0" />
                <span>concierge@elanclinic.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-charcoal-800">
                <Clock className="w-4 h-4 text-sand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Opening Hours</p>
                  <p>Mon - Fri: 8:30 AM – 7:00 PM</p>
                  <p>Saturday: 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-charcoal-400 border-t border-charcoal-800">
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} Élan Aesthetic Clinic. All rights reserved.</span>
            <span className="text-charcoal-500 block sm:inline sm:ml-1.5 mt-0.5 sm:mt-0">
              Crafted for Fakiha Core Technologies portfolio demo.
            </span>
          </div>

          {/* Quick Legal / Portal Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <Link to="/privacy" className="hover:text-sand-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-sand-300 transition-colors">Terms of Service</Link>
            <Link to="/login" className="text-sand-400 font-medium hover:text-white transition-colors">Client Portal</Link>
            <Link to="/admin/login" className="text-clinic-400 font-medium hover:text-white transition-colors">Admin Suite</Link>
          </div>

          {/* Theme-aligned Social Media Icons */}
          <div className="flex items-center gap-2.5">
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 rounded-full bg-clinic-800/90 border border-clinic-700/80 text-sand-300 hover:bg-clinic-700 hover:text-white hover:border-sand-300 transition-all duration-200 shadow-sm flex items-center justify-center button-press-effect" 
              aria-label="Follow Élan on Instagram"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 rounded-full bg-clinic-800/90 border border-clinic-700/80 text-sand-300 hover:bg-clinic-700 hover:text-white hover:border-sand-300 transition-all duration-200 shadow-sm flex items-center justify-center button-press-effect" 
              aria-label="Follow Élan on Facebook"
              title="Facebook"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.615V8z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 rounded-full bg-clinic-800/90 border border-clinic-700/80 text-sand-300 hover:bg-clinic-700 hover:text-white hover:border-sand-300 transition-all duration-200 shadow-sm flex items-center justify-center button-press-effect" 
              aria-label="Connect with Élan on LinkedIn"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 rounded-full bg-clinic-800/90 border border-clinic-700/80 text-sand-300 hover:bg-clinic-700 hover:text-white hover:border-sand-300 transition-all duration-200 shadow-sm flex items-center justify-center button-press-effect" 
              aria-label="Watch Clinical Procedures on YouTube"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}


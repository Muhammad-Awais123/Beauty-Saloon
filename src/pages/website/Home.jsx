import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  Check, 
  Activity,
  HeartHandshake
} from 'lucide-react';
import Button from '../../components/common/Button';
import SectionHeading from '../../components/common/SectionHeading';
import ServiceCard from '../../components/website/ServiceCard';
import TeamCard from '../../components/website/TeamCard';
import PackageCard from '../../components/website/PackageCard';
import BlogCard from '../../components/website/BlogCard';
import TestimonialCard from '../../components/website/TestimonialCard';
import FaqAccordion from '../../components/website/FaqAccordion';
import ImageCompareSlider from '../../components/common/ImageCompareSlider';

export default function Home() {
  const { services, team, packages, blogs, reviews, beforeAfter, faqs } = useApp();

  const featuredServices = services.filter(s => s.isFeatured).slice(0, 4);
  const featuredTeam = team.slice(0, 4);
  const featuredPackages = packages.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 3);
  const featuredReviews = reviews.filter(r => r.featured).slice(0, 3);
  const heroBaCase = beforeAfter[0];

  return (
    <div className="bg-surface-soft">
      
      {/* 1. HERO SECTION (Clean, Minimalist & Professional 3-Column Arched Aesthetic) */}
      <section className="relative pt-8 pb-14 lg:pt-12 lg:pb-16 border-b border-charcoal-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            
            {/* LEFT COLUMN: Clean Editorial Headline & Action (4 Cols) */}
            <div className="lg:col-span-4 text-left flex flex-col justify-between h-full pb-2">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-charcoal-900 tracking-tight leading-[1.16] mb-4">
                  Reveal Your<br />
                  Radiance with Our<br />
                  Expert Care
                </h1>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-xs mb-8">
                  Experience world-class treatments designed to enhance your unique beauty.
                </p>

                <Button
                  to="/appointments"
                  variant="dark"
                  size="md"
                  className="rounded-full px-8 py-3 text-xs sm:text-sm font-semibold shadow-sm hover:bg-clinic-800 transition-all mb-10 lg:mb-14"
                >
                  Get Started
                </Button>
              </div>

              {/* Partner Brand Marks */}
              <div className="flex items-center gap-6 pt-4 text-charcoal-700">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-charcoal-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-charcoal-800" />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-tight text-charcoal-900 block leading-none">FDA-Cleared</span>
                    <span className="text-[9px] text-charcoal-400 block font-serif italic mt-0.5">Clinical Standard</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-charcoal-800" />
                  <span className="text-xs font-bold tracking-tight text-charcoal-900">Allergan® Partner</span>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Clean Arched Model Container (4 Cols) */}
            <div className="lg:col-span-4 flex justify-center items-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] bg-[#22332D] rounded-t-[160px] sm:rounded-t-[190px] overflow-hidden flex items-end justify-center shadow-elevated border-t-4 border-x-4 border-[#22332D]">
                <img
                  src="/images/hero/hero-radiance-beauty.jpg"
                  alt="Reveal Your Radiance with Expert Care"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Social Proof, Rating & 1,200+ Metric (4 Cols) */}
            <div className="lg:col-span-4 text-left flex flex-col justify-between h-full space-y-6 lg:space-y-8 pb-2 pl-0 lg:pl-4">
              
              {/* Top: Avatar Stack & Happy Clients */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/images/team/team-doctor-01.jpg" alt="Client 1" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                  <img src="/images/team/team-doctor-02.jpg" alt="Client 2" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                  <img src="/images/team/team-doctor-03.jpg" alt="Client 3" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                  <img src="/images/team/team-doctor-04.jpg" alt="Client 4" className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" />
                </div>
                <div>
                  <span className="text-sm font-bold text-charcoal-900 block leading-tight font-serif">+73.K</span>
                  <span className="text-[10px] text-charcoal-500 font-medium">Happy Clients</span>
                </div>
              </div>

              {/* Middle: Short Description & Badges */}
              <div className="space-y-4">
                <p className="text-xs text-charcoal-600 leading-relaxed max-w-xs">
                  Our team of experts is dedicated to providing you with personalized solutions for radiant, healthy skin.
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="inline-flex items-center gap-1 border border-charcoal-800 rounded-full px-3 py-1 text-xs font-bold text-charcoal-900 bg-white">
                    <span>4.8</span>
                    <Star className="w-3 h-3 fill-charcoal-900 text-charcoal-900" />
                  </div>
                  <Link
                    to="/about"
                    className="inline-flex items-center border border-charcoal-800 rounded-full px-3.5 py-1 text-xs font-medium text-charcoal-900 hover:bg-charcoal-100 transition-colors"
                  >
                    Guest Testimonials
                  </Link>
                </div>
              </div>

              {/* Bottom: 1,200+ Metric with Divider */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded bg-surface-muted border border-charcoal-200 text-charcoal-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 h-px bg-charcoal-300" />
                </div>
                <div className="pt-1">
                  <span className="text-2xl font-serif font-bold text-charcoal-900 block leading-tight">1,200+</span>
                  <p className="text-[11px] text-charcoal-500 leading-snug max-w-xs mt-0.5">
                    Unlock the secret to lasting beauty with advanced treatments tailored to your needs.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST / CREDENTIAL STRIP */}
      <section className="bg-surface-muted py-6 border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-2.5">
              <Award className="w-5 h-5 text-clinic-700 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">FDA-Approved Systems</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-clinic-700 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Board-Certified Doctors</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <HeartHandshake className="w-5 h-5 text-clinic-700 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Natural Aesthetic Ethics</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Sparkles className="w-5 h-5 text-clinic-700 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">0% Downtime Protocols</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TREATMENTS */}
      <section className="py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              badge="Clinical Excellence"
              title="Signature Dermatological Treatments"
              subtitle="Every procedure is designed with precision parameters to rejuvenate skin texture, collagen elasticity, and facial balance."
            />
            <Button to="/services" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All 8 Treatments
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 bg-surface-soft border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Élan Difference"
            title="A Higher Standard in Aesthetic Medicine"
            subtitle="We blend advanced hospital-grade diagnostics with gentle artistic precision, ensuring you receive safe, natural, and transformative results."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-2xl bg-white border border-charcoal-200 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-clinic-100 text-clinic-800 flex items-center justify-center font-bold mb-6">
                01
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-2">
                Evidence-Based Science
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                We only invest in clinically validated technologies with extensive peer-reviewed safety and efficacy profiles, including picosecond photoacoustic lasers and bio-remodeling peptides.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-charcoal-200 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-clinic-100 text-clinic-800 flex items-center justify-center font-bold mb-6">
                02
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-2">
                "Natural You" Micro-Dosing
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                We reject the frozen or overfilled look. Our physicians specialize in subtle micro-injection algorithms that respect your natural facial anatomy and preserve your genuine emotional expressions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-charcoal-200 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-clinic-100 text-clinic-800 flex items-center justify-center font-bold mb-6">
                03
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-2">
                Private Luxury Sanctuary
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Enjoy soundproof private suites, organic post-care herbal infusions, and individual recovery lounges designed for absolute discretion, peace, and restorative well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLINIC STATISTICS */}
      <section className="py-16 bg-clinic-900 text-white border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sand-300">14+</p>
              <p className="text-xs uppercase tracking-widest text-clinic-200 font-semibold mt-2">Years of Excellence</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sand-300">8,500+</p>
              <p className="text-xs uppercase tracking-widest text-clinic-200 font-semibold mt-2">Active Patients</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sand-300">99.4%</p>
              <p className="text-xs uppercase tracking-widest text-clinic-200 font-semibold mt-2">Patient Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sand-300">18+</p>
              <p className="text-xs uppercase tracking-widest text-clinic-200 font-semibold mt-2">Laser & Dermal Technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEFORE & AFTER SHOWCASE */}
      {heroBaCase && (
        <section className="py-20 bg-white border-b border-charcoal-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 text-left">
                <SectionHeading
                  align="left"
                  badge="Proven Clinical Outcomes"
                  title="Authentic Transformations, Measurable Clarity"
                  subtitle="We photograph all cases under standardized clinical cross-polarized lighting to accurately document true dermal remodeling."
                />

                <div className="mt-8 space-y-3 text-xs text-charcoal-700">
                  <div className="p-3.5 rounded-xl bg-surface-soft border border-charcoal-200">
                    <p className="font-bold text-charcoal-900 text-sm mb-1">{heroBaCase.title}</p>
                    <p className="text-charcoal-600 mb-2">{heroBaCase.description}</p>
                    <div className="flex items-center gap-4 text-[11px] text-charcoal-500">
                      <span><strong>Doctor:</strong> {heroBaCase.doctor}</span>
                      <span><strong>Sessions:</strong> {heroBaCase.sessionsCount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <Button to="/before-after" variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    Explore Before & After Gallery
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-3 bg-surface-muted rounded-2xl border border-charcoal-200 shadow-card">
                  <ImageCompareSlider
                    beforeImage={heroBaCase.beforeImage}
                    afterImage={heroBaCase.afterImage}
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-[11px] text-charcoal-400 text-center mt-2.5">
                    Drag the slider horizontally to compare baseline vs post-treatment results.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 7. TREATMENT JOURNEY */}
      <section className="py-20 bg-surface-soft border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Your Treatment Path"
            title="The 4-Step Clinical Journey"
            subtitle="From your initial 3D skin analysis to your long-term skin health maintenance plan."
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <span className="text-2xl font-serif font-bold text-clinic-700 block mb-2">01</span>
              <h4 className="text-base font-serif font-bold text-charcoal-900 mb-1.5">3D Skin Analysis</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Cross-polarized photographic imaging maps UV sun damage, sebum congestion, and dermal collagen elasticity.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <span className="text-2xl font-serif font-bold text-clinic-700 block mb-2">02</span>
              <h4 className="text-base font-serif font-bold text-charcoal-900 mb-1.5">Physician Strategy</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Your doctor formulates an individualized, multi-session treatment algorithm respecting your timeline and lifestyle.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <span className="text-2xl font-serif font-bold text-clinic-700 block mb-2">03</span>
              <h4 className="text-base font-serif font-bold text-charcoal-900 mb-1.5">Precision Procedure</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Expert delivery using FDA-cleared devices, gentle micro-needling, or patented vortex infusion technology.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-charcoal-200 shadow-card">
              <span className="text-2xl font-serif font-bold text-clinic-700 block mb-2">04</span>
              <h4 className="text-base font-serif font-bold text-charcoal-900 mb-1.5">Recovery Sanctuary</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Relax in our post-care lounge with medical-grade barrier repair serotherapy, soothing LED, and bespoke homecare kits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FEATURED SPECIALISTS */}
      <section className="py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              badge="World-Class Faculty"
              title="Meet Our Board-Certified Specialists"
              subtitle="Trained at Harvard, King’s College London, and top European aesthetic academies."
            />
            <Button to="/team" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Doctors
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeam.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-20 bg-surface-soft border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Patient Experiences"
            title="Trusted by Discerning Patients"
            subtitle="Read verified reviews from clients who have experienced the Élan standard."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map(rev => (
              <TestimonialCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. CURATED PACKAGES */}
      <section className="py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Curated Value"
            title="Signature Treatment Packages"
            subtitle="Comprehensive multi-modal protocols offering enhanced results and bundled savings."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. LATEST BLOGS */}
      <section className="py-20 bg-surface-soft border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              badge="Scientific Insights"
              title="The Aesthetic Medical Journal"
              subtitle="Evidence-based articles written by our practicing physicians on skin science and longevity."
            />
            <Button to="/blog" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Articles
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Clear Answers"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our consultations, treatments, safety protocols, and booking policies."
            className="mb-12"
          />

          <FaqAccordion faqs={faqs.slice(0, 5)} />

          <div className="mt-8 text-center">
            <Button to="/faq" variant="ghost" size="sm">
              View Full FAQ Knowledgebase →
            </Button>
          </div>
        </div>
      </section>

      {/* 13. FINAL BOOKING CTA BANNER */}
      <section className="py-20 lg:py-24 bg-clinic-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-clinic-800 border border-clinic-700 text-sand-300 text-xs font-bold uppercase tracking-widest mb-5 shadow-sm">
            Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 max-w-2xl mx-auto leading-tight text-white">
            Experience the Precision of Élan Aesthetic Medicine
          </h2>
          <p className="text-sm sm:text-base text-clinic-200 max-w-xl mx-auto mb-10 leading-relaxed">
            Schedule a comprehensive 3D skin analysis and consultation with our board-certified dermatologists. Same-week appointments available.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              to="/appointments"
              variant="sand"
              size="lg"
              icon={Calendar}
              className="bg-white hover:bg-sand-100 text-clinic-900 font-bold border-none shadow-md rounded-full px-8 py-3.5"
            >
              Book Your Appointment
            </Button>
            <Button
              to="/contact"
              variant="outline-white"
              size="lg"
              className="rounded-full px-8 py-3.5 font-semibold"
            >
              Contact Concierge
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

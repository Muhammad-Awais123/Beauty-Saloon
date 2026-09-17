import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Star, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ArrowLeft,
  ChevronRight,
  Heart,
  Activity,
  Layers
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ServiceCard from '../../components/website/ServiceCard';
import TestimonialCard from '../../components/website/TestimonialCard';
import FaqAccordion from '../../components/website/FaqAccordion';
import BeforeAfterCard from '../../components/website/BeforeAfterCard';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, team, beforeAfter, reviews, toggleFavorite, isFavorite } = useApp();

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">Treatment Not Found</h2>
        <p className="text-xs text-charcoal-500 mb-6">The aesthetic treatment you requested does not exist or has been updated.</p>
        <Button to="/services" variant="primary">Browse All Treatments</Button>
      </div>
    );
  }

  const assignedDoctors = team.filter(doc => service.specialistIds?.includes(doc.id));
  const relatedCases = beforeAfter.filter(ba => ba.serviceId === service.id || ba.category === service.category);
  const relatedServices = services.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);
  const favorited = isFavorite(service.id);

  return (
    <div className="bg-surface-soft text-left pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-charcoal-100 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-500">
          <Link to="/" className="hover:text-clinic-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link to="/services" className="hover:text-clinic-800">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <span className="text-charcoal-900 font-semibold truncate">{service.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="sage" size="md">
                  {service.category}
                </Badge>
                <div className="flex items-center gap-1 text-amber-800 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{service.rating}</span>
                  <span className="text-charcoal-400 font-normal">({service.reviewsCount} clinical reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 tracking-tight mb-4">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed mb-6">
                {service.fullDesc || service.shortDesc}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-soft border border-charcoal-200 mb-8 text-xs">
                <div>
                  <span className="text-charcoal-400 block uppercase font-semibold text-[10px]">Session Duration</span>
                  <span className="font-bold text-charcoal-900 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-clinic-700" />
                    {service.duration}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal-400 block uppercase font-semibold text-[10px]">Starting Investment</span>
                  <span className="font-serif font-bold text-clinic-900 text-base mt-0.5">
                    ${service.price}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal-400 block uppercase font-semibold text-[10px]">Social Downtime</span>
                  <span className="font-bold text-charcoal-900 mt-0.5 block truncate">
                    {service.recoveryInfo?.includes('Zero') ? 'Zero Downtime' : 'Minimal (1-3 days)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  to={`/appointments?service=${service.id}`}
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  className="shadow-sm"
                >
                  Book This Treatment
                </Button>
                <button
                  onClick={() => toggleFavorite(service.id)}
                  className={`p-3.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all ${
                    favorited
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-white text-charcoal-700 hover:text-rose-600 border-charcoal-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
                  <span>{favorited ? 'Saved to Favorites' : 'Save Treatment'}</span>
                </button>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-charcoal-200 shadow-elevated aspect-[4/3] bg-charcoal-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits & Suitable For Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Key Clinical Benefits */}
          <div className="p-8 rounded-2xl bg-white border border-charcoal-200 shadow-card">
            <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-clinic-700" />
              Key Clinical Benefits
            </h3>
            <ul className="space-y-3.5">
              {service.benefits?.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-700">
                  <div className="p-1 rounded-full bg-clinic-100 text-clinic-800 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable Candidates */}
          <div className="p-8 rounded-2xl bg-white border border-charcoal-200 shadow-card">
            <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-clinic-700" />
              Ideal Candidates & Skin Conditions
            </h3>
            <ul className="space-y-3.5">
              {service.suitableFor?.map((candidate, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-700">
                  <div className="p-1 rounded-full bg-sand-100 text-sand-800 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{candidate}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Procedure Steps Protocol */}
      {service.procedureSteps && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-charcoal-200 shadow-card">
            <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">
              The Treatment Protocol
            </h3>
            <p className="text-xs text-charcoal-500 mb-8">What to expect during your clinical in-office session.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.procedureSteps.map((step) => (
                <div key={step.step} className="p-5 rounded-xl bg-surface-soft border border-charcoal-200">
                  <span className="w-8 h-8 rounded-full bg-clinic-700 text-white flex items-center justify-center text-xs font-bold font-serif mb-3">
                    {step.step}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recovery & Expected Results */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-clinic-50 border border-clinic-200">
            <h4 className="text-sm font-bold text-clinic-900 uppercase tracking-wider mb-2">Recovery & Aftercare</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">{service.recoveryInfo}</p>
          </div>
          <div className="p-6 rounded-xl bg-sand-50 border border-sand-200">
            <h4 className="text-sm font-bold text-sand-800 uppercase tracking-wider mb-2">Expected Results & Longevity</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">{service.expectedResults}</p>
          </div>
        </div>
      </section>

      {/* Treating Specialists */}
      {assignedDoctors.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
            Physicians Performing This Procedure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedDoctors.map(doc => (
              <div key={doc.id} className="p-5 rounded-xl bg-white border border-charcoal-200 shadow-card flex items-center gap-4">
                <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-full object-cover border border-charcoal-200 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900 font-serif">{doc.name}</h4>
                  <p className="text-xs text-clinic-700 font-medium">{doc.role}</p>
                  <Link to={`/team/${doc.id}`} className="text-xs text-charcoal-500 hover:underline mt-1 block">
                    View Doctor Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Before & After Cases */}
      {relatedCases.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
            Clinical Before & After Outcomes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCases.slice(0, 2).map(c => (
              <BeforeAfterCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
            Treatment FAQs
          </h3>
          <FaqAccordion faqs={service.faqs.map((f, i) => ({ id: i, question: f.q, answer: f.a }))} />
        </section>
      )}

      {/* Related Treatments */}
      {relatedServices.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
            Complementary Treatments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map(rel => (
              <ServiceCard key={rel.id} service={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

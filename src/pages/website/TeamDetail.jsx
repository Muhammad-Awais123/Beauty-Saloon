import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  Award, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Stethoscope,
  Sparkles
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ServiceCard from '../../components/website/ServiceCard';
import TestimonialCard from '../../components/website/TestimonialCard';

export default function TeamDetail() {
  const { id } = useParams();
  const { team, services, reviews } = useApp();

  const doctor = team.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">Specialist Not Found</h2>
        <p className="text-xs text-charcoal-500 mb-6">The requested doctor profile could not be located.</p>
        <Button to="/team" variant="primary">View All Specialists</Button>
      </div>
    );
  }

  const doctorServices = services.filter(s => doctor.servicesOffered?.includes(s.id));
  const doctorReviews = reviews.filter(r => r.comment.toLowerCase().includes(doctor.name.toLowerCase().split(' ')[1] || ''));

  return (
    <div className="bg-surface-soft text-left pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-charcoal-100 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-500">
          <Link to="/" className="hover:text-clinic-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link to="/team" className="hover:text-clinic-800">Specialists</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <span className="text-charcoal-900 font-semibold">{doctor.name}</span>
        </div>
      </div>

      {/* Hero Doctor Profile */}
      <section className="bg-white py-12 border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Photo Column */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-charcoal-200 shadow-elevated aspect-[4/5] bg-charcoal-900 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Booking Widget */}
              <div className="p-5 rounded-xl bg-surface-soft border border-charcoal-200 text-xs text-charcoal-700">
                <p className="font-bold text-charcoal-900 uppercase text-[10px] tracking-wider mb-2">Available Consultation Days</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.availableDays?.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white border border-charcoal-200 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
                <Button
                  to={`/appointments?specialist=${doctor.id}`}
                  variant="primary"
                  size="md"
                  icon={Calendar}
                  className="w-full shadow-sm"
                >
                  Book with {doctor.name.split(',')[0]}
                </Button>
              </div>
            </div>

            {/* Biography & Credentials Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="sage" size="md">
                    {doctor.experience}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-800 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-charcoal-400 font-normal">({doctor.reviewsCount} patient reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-sm font-semibold text-clinic-700 mt-1">
                  {doctor.role}
                </p>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Specialization: {doctor.specialization}
                </p>
              </div>

              {/* Bio */}
              <div className="p-6 rounded-xl bg-surface-soft border border-charcoal-200">
                <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider mb-2">Clinical Biography</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {doctor.bio}
                </p>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-charcoal-200">
                  <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-clinic-700" />
                    Education & Fellowships
                  </h4>
                  <ul className="space-y-2 text-xs text-charcoal-600">
                    {doctor.education?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-clinic-600 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white border border-charcoal-200">
                  <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-clinic-700" />
                    Board Certifications
                  </h4>
                  <ul className="space-y-2 text-xs text-charcoal-600">
                    {doctor.certifications?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sand-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Services Administered by Doctor */}
      {doctorServices.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">
            Treatments Administered by {doctor.name.split(',')[0]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorServices.map(srv => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

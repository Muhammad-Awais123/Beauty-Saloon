import React from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/common/SectionHeading';
import TeamCard from '../../components/website/TeamCard';
import { ShieldCheck, Award, GraduationCap, Stethoscope } from 'lucide-react';

export default function Team() {
  const { team } = useApp();

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <SectionHeading
            badge="Medical Faculty"
            title="Board-Certified Aesthetic Specialists"
            subtitle="Our clinical team comprises internationally trained dermatologists and licensed aesthetic practitioners dedicated to natural, evidence-based patient transformations."
          />
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Credentials & Quality Banner */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-clinic-100 text-clinic-800 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal-900 mb-1">Global Medical Training</h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Physicians holding advanced degrees and fellowships from Harvard Medical School, King’s College London, and Complutense University.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-clinic-100 text-clinic-800 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal-900 mb-1">Master Injector Certified</h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Certified master injectors in cannula facial contouring, bio-stimulators, and precise micro-droplet neuromodulator delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-clinic-100 text-clinic-800 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal-900 mb-1">Laser Safety Certified</h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Accredited laser safety officers operating only FDA and CE-marked medical energy platforms with strict skin-type protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

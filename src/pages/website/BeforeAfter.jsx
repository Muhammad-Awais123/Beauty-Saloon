import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/common/SectionHeading';
import BeforeAfterCard from '../../components/website/BeforeAfterCard';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function BeforeAfter() {
  const { beforeAfter } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Laser Treatments', 'Anti-Aging', 'Skin Treatments', 'Facial Treatments', 'Hair Treatments'];

  const filteredCases = selectedCategory === 'All' 
    ? beforeAfter 
    : beforeAfter.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Clinical Evidence"
            title="Before & After Transformation Gallery"
            subtitle="Documented clinical outcomes under standardized cross-polarized photographic lighting. Individual results may vary according to skin baseline and adherence to aftercare."
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-clinic-700 text-white shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-surface-soft border border-charcoal-200 text-xs text-charcoal-600 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-clinic-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Disclaimer:</strong> All photographs depict actual patients treated at Élan Aesthetic Clinic. No digital retouching, skin smoothing filters, or altered lighting are used. Results depend on individual skin type, metabolic factors, and completion of recommended protocols.
          </p>
        </div>

        {/* Grid of Before/After Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}

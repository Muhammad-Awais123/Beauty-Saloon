import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/common/SectionHeading';
import FaqAccordion from '../../components/website/FaqAccordion';
import { FAQ_CATEGORIES } from '../../data/faqsData';
import { MessageSquare, Phone, Calendar } from 'lucide-react';
import Button from '../../components/common/Button';

export default function Faq() {
  const { faqs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Patient Knowledgebase"
            title="Frequently Asked Clinical & Booking Questions"
            subtitle="Find comprehensive answers to questions regarding our physician consultations, post-care recommendations, cancellation rules, and payment options."
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto mb-10 pb-2">
          {FAQ_CATEGORIES.map((cat) => (
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

        {/* Accordion List */}
        <div className="mb-16">
          <FaqAccordion faqs={filteredFaqs} />
        </div>

        {/* Have more questions card */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 text-center shadow-card">
          <h3 className="text-xl font-serif font-bold text-charcoal-900 mb-2">Still have questions?</h3>
          <p className="text-xs text-charcoal-500 max-w-md mx-auto mb-6">
            Our medical concierge team is available Monday through Saturday to answer specific pre-treatment inquiries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" variant="outline" size="sm" icon={MessageSquare}>
              Send Concierge Inquiry
            </Button>
            <Button to="/appointments" variant="primary" size="sm" icon={Calendar}>
              Book Free Consultation
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

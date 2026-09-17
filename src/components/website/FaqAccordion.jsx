import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto text-left">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.id || idx}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-clinic-600 shadow-card'
                : 'bg-white border-charcoal-200 hover:border-charcoal-300'
            }`}
          >
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 pr-4 font-serif font-bold text-sm sm:text-base text-charcoal-900">
                <span className={`p-1.5 rounded-md text-xs font-sans font-semibold shrink-0 ${
                  isOpen ? 'bg-clinic-700 text-white' : 'bg-charcoal-100 text-charcoal-600'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {faq.question}
              </span>
              <div className={`p-1 rounded-full shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-clinic-700 bg-clinic-50' : 'text-charcoal-400'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100/60 animate-in fade-in duration-200">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/common/SectionHeading';
import Badge from '../../components/common/Badge';
import { GALLERY_CATEGORIES } from '../../data/galleryData';

export default function Gallery() {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Visual Tour"
            title="Clinic Environment & Treatment Suites"
            subtitle="Take a look inside our Lexington Avenue medical sanctuary, sterile procedure rooms, and recovery spaces."
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto mb-10 pb-2">
          {GALLERY_CATEGORIES.map((cat) => (
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-xl border border-charcoal-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="sage" size="sm">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <div className="p-4 flex-1">
                <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-1">{item.title}</h4>
                <p className="text-xs text-charcoal-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

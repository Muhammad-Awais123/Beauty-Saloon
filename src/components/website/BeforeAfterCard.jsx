import React, { useState } from 'react';
import { Calendar, User, Clock, Layers } from 'lucide-react';
import ImageCompareSlider from '../common/ImageCompareSlider';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function BeforeAfterCard({ item }) {
  const [showSlider, setShowSlider] = useState(true);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-charcoal-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all text-left">
      {/* Slider / Visual Showcase */}
      <div className="p-3 bg-surface-muted border-b border-charcoal-100">
        <div className="flex items-center justify-between mb-2 px-1">
          <Badge variant="sage" size="sm">
            {item.category}
          </Badge>
          <button
            onClick={() => setShowSlider(!showSlider)}
            className="text-[11px] font-semibold text-clinic-800 hover:underline flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            <span>{showSlider ? 'View Side-by-Side' : 'Interactive Slider'}</span>
          </button>
        </div>

        {showSlider ? (
          <ImageCompareSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            aspectRatio="aspect-[4/3]"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-200">
              <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-2 left-2 bg-charcoal-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Before
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-200">
              <img src={item.afterImage} alt="After" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-2 left-2 bg-clinic-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                After
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-serif font-bold text-charcoal-900 mb-1">
            {item.title}
          </h3>
          <p className="text-xs font-semibold text-clinic-700 mb-3">
            {item.serviceName}
          </p>

          <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-surface-soft border border-charcoal-100 text-[11px] text-charcoal-600 mb-4">
            <div>
              <span className="text-charcoal-400 block">Protocol:</span>
              <span className="font-semibold text-charcoal-800">{item.sessionsCount}</span>
            </div>
            <div>
              <span className="text-charcoal-400 block">Timeframe:</span>
              <span className="font-semibold text-charcoal-800">{item.timeframe}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-charcoal-100">
              <span className="text-charcoal-400 block">Treating Physician:</span>
              <span className="font-semibold text-charcoal-800">{item.doctor}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            to={`/appointments?service=${item.serviceId}`}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Consult for this Treatment
          </Button>
        </div>
      </div>
    </div>
  );
}

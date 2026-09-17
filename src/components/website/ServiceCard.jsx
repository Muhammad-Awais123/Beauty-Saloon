import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Heart, ArrowRight, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ServiceCard({ service, onBook }) {
  const { toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(service.id);

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card card-hover-effect text-left">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <Badge variant="sage" size="sm" className="font-semibold shadow-sm">
            {service.category}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(service.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-none transition-all shadow-sm ${
            favorited 
              ? 'bg-rose-50 text-rose-600 border border-rose-200' 
              : 'bg-white/90 text-charcoal-600 hover:text-rose-600 hover:bg-white border border-charcoal-200'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
        </button>

        {service.isPopular && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-sand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Popular Choice
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Duration */}
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <div className="flex items-center gap-1 text-amber-800 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{service.rating}</span>
              <span className="text-charcoal-400 font-normal">({service.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-charcoal-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{service.duration}</span>
            </div>
          </div>

          <h3 className="text-base font-serif font-bold text-charcoal-900 group-hover:text-clinic-800 transition-colors line-clamp-1 mb-2">
            <Link to={`/services/${service.id}`}>
              {service.name}
            </Link>
          </h3>

          <p className="text-xs text-charcoal-600 line-clamp-2 mb-4 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-semibold text-charcoal-400 block leading-none">Starting At</span>
            <span className="text-lg font-bold font-serif text-clinic-900">${service.price}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              to={`/services/${service.id}`}
              variant="ghost"
              size="sm"
              className="text-xs px-2.5"
            >
              Details
            </Button>
            <Button
              to={`/appointments?service=${service.id}`}
              variant="primary"
              size="sm"
              icon={Calendar}
              className="text-xs"
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

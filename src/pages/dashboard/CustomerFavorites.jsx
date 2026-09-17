import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Calendar, ArrowRight } from 'lucide-react';
import ServiceCard from '../../components/website/ServiceCard';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';

export default function CustomerFavorites() {
  const { services, favorites } = useApp();

  const favoriteServices = services.filter(s => favorites.includes(s.id));

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-900">
            Saved Treatments & Wishlist
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Treatments you have bookmarked for future appointments or seasonal refreshers.
          </p>
        </div>

        <Button to="/services" variant="outline" size="sm">
          Browse All Services
        </Button>
      </div>

      {favoriteServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Browse our aesthetic treatment menu and click the heart icon to save treatments for later."
          actionLabel="Explore Treatments"
          actionTo="/services"
        />
      )}

    </div>
  );
}

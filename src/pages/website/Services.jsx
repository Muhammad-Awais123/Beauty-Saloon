import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import ServiceCard from '../../components/website/ServiceCard';
import EmptyState from '../../components/common/EmptyState';
import { SERVICE_CATEGORIES } from '../../data/servicesData';

export default function Services() {
  const { services } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Treatments');
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(600);

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchesCat = selectedCategory === 'All Treatments' || srv.category === selectedCategory;
      const matchesSearch = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            srv.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = srv.price <= maxPrice;
      return matchesCat && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [services, selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Dermatological Menu"
            title="Evidence-Based Aesthetic Treatments"
            subtitle="Explore our comprehensive range of physician-led skin, laser, anti-aging, and regenerative therapies."
          />
        </div>

        {/* Controls / Filter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-charcoal-200 shadow-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by treatment name, concern, or laser type..."
                className="w-full rounded-lg border border-charcoal-200 pl-9 pr-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
              />
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-charcoal-200 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-clinic-600"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-low">Sort: Price (Low to High)</option>
                <option value="price-high">Sort: Price (High to Low)</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="md:col-span-4 flex items-center gap-3">
              <span className="text-xs text-charcoal-500 whitespace-nowrap">Max Price: <strong className="text-charcoal-900 font-serif">${maxPrice}</strong></span>
              <input
                type="range"
                min="100"
                max="600"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-clinic-700 cursor-pointer"
              />
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-charcoal-100 pb-1 scrollbar-none">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-clinic-700 text-white shadow-sm'
                    : 'bg-surface-muted text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs text-charcoal-500">
            Showing <strong className="text-charcoal-800">{filteredServices.length}</strong> available clinical treatments
          </p>
          {(searchQuery || selectedCategory !== 'All Treatments' || maxPrice < 600) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Treatments');
                setMaxPrice(600);
              }}
              className="text-xs text-clinic-700 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Treatments Match Your Criteria"
            description="Try adjusting your search query, increasing the maximum price, or selecting another category."
            actionLabel="View All Treatments"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All Treatments');
              setMaxPrice(600);
            }}
          />
        )}

      </div>
    </div>
  );
}

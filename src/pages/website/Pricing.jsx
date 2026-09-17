import React from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/common/SectionHeading';
import PackageCard from '../../components/website/PackageCard';
import { ShieldCheck, HelpCircle, Calendar, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';

export default function Pricing() {
  const { packages, services } = useApp();

  return (
    <div className="bg-surface-soft min-h-screen py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <SectionHeading
            badge="Curated Packages & Value"
            title="Comprehensive Treatment Programs"
            subtitle="Explore our bundled multi-session packages combining complementary laser, infusion, and bio-remodeling protocols for enhanced results and transparent pricing."
          />
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Transparent A La Carte Table */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-8 shadow-card mb-16">
          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-charcoal-900">À La Carte Single Session Menu</h3>
            <p className="text-xs text-charcoal-500">Transparent in-clinic investment for standalone appointments.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-charcoal-200 text-charcoal-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Treatment</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Investment</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-surface-soft transition-colors">
                    <td className="py-3.5 px-4 font-bold text-charcoal-900 font-serif text-sm">
                      {srv.name}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-600">
                      <span className="bg-clinic-50 text-clinic-800 px-2 py-0.5 rounded font-medium">
                        {srv.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500">
                      {srv.duration}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-clinic-900 font-serif text-sm">
                      ${srv.price}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        to={`/appointments?service=${srv.id}`}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-clinic-700 hover:text-clinic-900"
                      >
                        Book →
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Consultation Assurance */}
        <div className="p-8 rounded-2xl bg-clinic-900 text-white text-center">
          <h3 className="text-2xl font-serif font-bold mb-2">Unsure which package suits your skin?</h3>
          <p className="text-xs sm:text-sm text-clinic-200 max-w-lg mx-auto mb-6">
            Book a 3D skin analysis consultation. Our medical director will craft a customized schedule tailored to your goals.
          </p>
          <Button to="/appointments" variant="sand" size="md" icon={Calendar} className="bg-white hover:bg-sand-100 text-clinic-900 border-none font-bold">
            Book In-Depth Consultation
          </Button>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Calendar, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function TeamCard({ member }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-card card-hover-effect text-left">
      {/* Photo with experience badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3">
          <Badge variant="sage" size="sm" className="font-semibold shadow-sm">
            {member.experience}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2 py-1 rounded text-xs font-bold text-amber-800 border border-charcoal-200 shadow-sm">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          <span>{member.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-serif font-bold text-charcoal-900 group-hover:text-clinic-800 transition-colors mb-1">
            <Link to={`/team/${member.id}`}>
              {member.name}
            </Link>
          </h3>
          <p className="text-xs font-medium text-clinic-700 mb-2">
            {member.role}
          </p>
          <p className="text-xs text-charcoal-500 line-clamp-2 mb-4 leading-relaxed">
            {member.specialization}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between gap-2">
          <Button
            to={`/team/${member.id}`}
            variant="ghost"
            size="sm"
            className="text-xs px-2.5"
          >
            Profile
          </Button>
          <Button
            to={`/appointments?specialist=${member.id}`}
            variant="primary"
            size="sm"
            icon={Calendar}
            className="text-xs"
          >
            Book With Doctor
          </Button>
        </div>
      </div>
    </div>
  );
}

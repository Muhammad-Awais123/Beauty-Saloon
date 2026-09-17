import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center', // center | left
  className = '',
  titleClassName = '',
  light = false
}) {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 ${
          light 
            ? 'bg-clinic-800 text-clinic-200 border border-clinic-700' 
            : 'bg-clinic-100 text-clinic-800 border border-clinic-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-clinic-600"></span>
          {badge}
        </div>
      )}
      {title && (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4 ${
          light ? 'text-white' : 'text-charcoal-900'
        } ${titleClassName}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
          light ? 'text-clinic-200' : 'text-charcoal-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

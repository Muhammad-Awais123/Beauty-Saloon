import React from 'react';
import Button from './Button';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Sparkles,
  title = 'No items found',
  description = 'There are currently no records to display.',
  actionLabel,
  onAction,
  actionTo,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-charcoal-200 ${className}`}>
      <div className="p-4 rounded-full bg-clinic-50 text-clinic-700 mb-4 border border-clinic-100">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-serif font-bold text-charcoal-900 mb-1">{title}</h3>
      <p className="text-sm text-charcoal-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      
      {actionLabel && (
        actionTo ? (
          <Button to={actionTo} size="sm">{actionLabel}</Button>
        ) : (
          <Button onClick={onAction} size="sm">{actionLabel}</Button>
        )
      )}
    </div>
  );
}

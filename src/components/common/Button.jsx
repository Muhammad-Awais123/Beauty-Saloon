import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary', // primary | secondary | outline | ghost | danger | dark
  size = 'md', // sm | md | lg
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center select-none button-press-effect';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5 tracking-wide',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 tracking-wide font-semibold',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold tracking-wide'
  }[size] || '';

  const variantClasses = {
    primary: 'bg-clinic-700 hover:bg-clinic-800 text-white focus:ring-clinic-600 shadow-sm hover:shadow-md',
    secondary: 'bg-clinic-100 hover:bg-clinic-200 text-clinic-900 focus:ring-clinic-400',
    outline: 'border border-charcoal-200 hover:border-clinic-700 bg-white text-charcoal-800 hover:text-clinic-800 focus:ring-clinic-600 hover:bg-surface-soft',
    'outline-white': 'border border-sand-300/60 bg-clinic-800/40 hover:bg-white text-white hover:text-clinic-950 focus:ring-white transition-all shadow-sm',
    'outline-light': 'border border-white/70 bg-transparent hover:bg-white text-white hover:text-clinic-900 focus:ring-white transition-all shadow-sm',
    ghost: 'text-charcoal-600 hover:text-clinic-800 hover:bg-clinic-50 focus:ring-clinic-400',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white focus:ring-rose-500 shadow-sm',
    dark: 'bg-charcoal-900 hover:bg-black text-white focus:ring-charcoal-700 shadow-sm',
    sand: 'bg-sand-100 hover:bg-sand-200 text-sand-700 border border-sand-200'
  }[variant] || '';

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}

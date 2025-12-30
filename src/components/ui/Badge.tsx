import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  count?: number;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  primary: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  success: 'bg-green-500/20 text-green-400 border-green-500/50',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  danger: 'bg-red-500/20 text-red-400 border-red-500/50',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  count,
  className = '',
}: BadgeProps) {
  if (dot) {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={`w-2 h-2 rounded-full ${variantStyles[variant].split(' ')[0]}`}></span>
        {children}
      </span>
    );
  }

  if (count !== undefined) {
    return (
      <span className="relative inline-flex">
        {children}
        <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-xs font-bold text-white bg-red-500 rounded-full border-2 border-black ${className}`}>
          {count > 99 ? '99+' : count}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-medium border rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}

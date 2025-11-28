import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface BalanceWidgetProps extends VariantProps<typeof balanceVariants> {
  balance: number;
  currency?: string;
  label?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  trendPeriod?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

const balanceVariants = cva(
  'relative flex flex-col rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#1E40AF] focus-within:ring-offset-2 focus-within:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-white border-slate-200 shadow-sm hover:shadow-md',
        outline: 'bg-transparent border-slate-300 hover:border-[#1E40AF] hover:bg-slate-50',
        ghost: 'bg-slate-50 border-transparent hover:bg-slate-100',
      },
      size: {
        sm: 'p-4 gap-2',
        md: 'p-6 gap-3',
        lg: 'p-8 gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const balanceSizeStyles = {
  sm: {
    label: 'text-xs font-medium text-slate-600',
    balance: 'text-lg font-bold text-slate-900',
    currency: 'text-sm font-semibold text-slate-700',
    trend: 'text-xs',
    trendIcon: 'w-3 h-3',
  },
  md: {
    label: 'text-sm font-medium text-slate-600',
    balance: 'text-2xl font-bold text-slate-900',
    currency: 'text-base font-semibold text-slate-700',
    trend: 'text-sm',
    trendIcon: 'w-4 h-4',
  },
  lg: {
    label: 'text-base font-medium text-slate-600',
    balance: 'text-3xl font-bold text-slate-900',
    currency: 'text-lg font-semibold text-slate-700',
    trend: 'text-base',
    trendIcon: 'w-5 h-5',
  },
};

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'neutral'; size: keyof typeof balanceSizeStyles }> = ({ trend, size }) => {
  const iconClass = cn(balanceSizeStyles[size].trendIcon, 'inline-block');
  
  if (trend === 'up') {
    return (
      <svg className={cn(iconClass, 'text-green-600')} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (trend === 'down') {
    return (
      <svg className={cn(iconClass, 'text-red-600')} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return (
    <svg className={cn(iconClass, 'text-slate-500')} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );
};

const LoadingSkeleton: React.FC<{ size: keyof typeof balanceSizeStyles }> = ({ size }) => {
  const styles = balanceSizeStyles[size];
  return (
    <>
      <div className={cn(styles.label, 'animate-pulse bg-slate-200 rounded h-4 w-16')} />
      <div className={cn(styles.balance, 'animate-pulse bg-slate-200 rounded h-8 w-32')} />
      <div className="animate-pulse bg-slate-200 rounded h-4 w-20" />
    </>
  );
};

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatTrendValue = (value: number, currency?: string): string => {
  const absValue = Math.abs(value);
  if (currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absValue);
  }
  return `${absValue.toFixed(2)}%`;
};

export const BalanceWidget: React.FC<BalanceWidgetProps> = ({
  balance,
  currency = 'USD',
  label = 'Current Balance',
  trend,
  trendValue,
  trendPeriod = 'vs last month',
  isLoading = false,
  variant = 'default',
  size = 'md',
  className,
  onClick,
  'aria-label': ariaLabel,
  ...props
}) => {
  const styles = balanceSizeStyles[size];
  const isClickable = !!onClick;

  const trendColorClass = trend === 'up' 
    ? 'text-green-600' 
    : trend === 'down' 
    ? 'text-red-600' 
    : 'text-slate-600';

  const componentProps = {
    className: cn(
      balanceVariants({ variant, size }),
      isClickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      className
    ),
    onClick: isClickable ? onClick : undefined,
    onKeyDown: isClickable ? (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
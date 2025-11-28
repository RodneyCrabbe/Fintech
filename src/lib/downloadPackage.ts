import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// Component source files content
const componentFiles = {
  'components/BalanceWidget.tsx': `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

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
  return \`\${absValue.toFixed(2)}%\`;
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
      isClickable ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : '',
      className
    ),
    onClick: isClickable ? onClick : undefined,
    onKeyDown: isClickable ? (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    } : undefined,
    'aria-label': ariaLabel,
    ...props
  };

  if (isLoading) {
    return (
      <div {...componentProps}>
        <LoadingSkeleton size={size} />
      </div>
    );
  }

  return (
    <div {...componentProps}>
      <label className={styles.label}>{label}</label>
      <div className="flex items-baseline gap-2">
        <span className={styles.balance}>
          {formatCurrency(balance, currency)}
        </span>
        <span className={styles.currency}>{currency}</span>
      </div>
      {trend && trendValue !== undefined ? (
        <div className={cn("flex items-center gap-1", styles.trend, trendColorClass)}>
          <TrendIcon trend={trend} size={size} />
          <span>
            {trend === 'up' ? '+' : '-'}{formatTrendValue(trendValue, currency)} {trendPeriod}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BalanceWidget;`,

  'components/TransactionCard.tsx': `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface TransactionData {
  id: string;
  type: 'debit' | 'credit' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  category?: string;
  merchant?: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  balance?: number;
}

const transactionCardVariants = cva(
  "relative rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 shadow-sm hover:shadow-md",
        outline: "bg-transparent border-gray-300 hover:border-[#1E40AF] hover:bg-gray-50",
        ghost: "bg-transparent border-transparent hover:bg-gray-50"
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const amountVariants = cva(
  "font-semibold tabular-nums",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      },
      type: {
        debit: "text-red-600",
        credit: "text-green-600",
        transfer: "text-[#1E40AF]"
      }
    }
  }
);

const statusVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        completed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800"
      }
    }
  }
);

export interface TransactionCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof transactionCardVariants> {
  transaction: TransactionData;
  showBalance?: boolean;
  onTransactionClick?: (transaction: TransactionData) => void;
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(Math.abs(amount));
};

const formatDate = (date: Date, size: 'sm' | 'md' | 'lg'): string => {
  if (size === 'sm') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });
};

const getTransactionIcon = (type: TransactionData['type'], size: 'sm' | 'md' | 'lg') => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconClass = \`\${sizeClasses[size]} flex-shrink-0\`;

  switch (type) {
    case 'debit':
      return (
        <div className={\`\${iconClass} rounded-full bg-red-100 flex items-center justify-center\`}>
          <svg className="w-2/3 h-2/3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      );
    case 'credit':
      return (
        <div className={\`\${iconClass} rounded-full bg-green-100 flex items-center justify-center\`}>
          <svg className="w-2/3 h-2/3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      );
    case 'transfer':
      return (
        <div className={\`\${iconClass} rounded-full bg-blue-100 flex items-center justify-center\`}>
          <svg className="w-2/3 h-2/3 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      );
  }
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  variant,
  size = 'md',
  showBalance = false,
  onTransactionClick,
  className,
  ...props
}) => {
  const isClickable = !!onTransactionClick;
  
  const handleClick = () => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onTransactionClick!(transaction);
    }
  };

  const amountPrefix = transaction.type === 'debit' ? '-' : '+';
  const amountDisplay = transaction.type === 'transfer' 
    ? formatCurrency(transaction.amount, transaction.currency)
    : \`\${amountPrefix}\${formatCurrency(transaction.amount, transaction.currency)}\`;

  return (
    <div
      className={cn(
        transactionCardVariants({ variant, size }),
        isClickable ? "cursor-pointer" : "",
        className
      )}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      aria-label={isClickable ? \`View transaction: \${transaction.description}\` : undefined}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {getTransactionIcon(transaction.type, size!)}
          
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className={cn(
                  "font-medium text-gray-900 truncate",
                  size === 'sm' ? "text-sm" : "",
                  size === 'md' ? "text-base" : "",
                  size === 'lg' ? "text-lg" : ""
                )}>
                  {transaction.description}
                </h3>
                {transaction.merchant ? (
                  <p className={cn(
                    "text-gray-600 truncate",
                    size === 'sm' ? "text-xs" : "",
                    size === 'md' ? "text-sm" : "",
                    size === 'lg' ? "text-base" : ""
                  )}>
                    {transaction.merchant}
                  </p>
                ) : null}
              </div>
              <div className={cn(amountVariants({ size, type: transaction.type }))}>
                {amountDisplay}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-gray-500",
                size === 'sm' ? "text-xs" : "",
                size === 'md' ? "text-sm" : "",
                size === 'lg' ? "text-base" : ""
              )}>
                {formatDate(transaction.date, size!)}
              </span>
              <span className={cn(statusVariants({ status: transaction.status }))}>
                {transaction.status}
              </span>
            </div>
            {showBalance && transaction.balance !== undefined ? (
              <p className={cn(
                "text-gray-600 mt-2",
                size === 'sm' ? "text-xs" : "",
                size === 'md' ? "text-sm" : "",
                size === 'lg' ? "text-base" : ""
              )}>
                Balance: {formatCurrency(transaction.balance, transaction.currency)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;`,

  'components/PaymentButton.tsx': `import React, { forwardRef, useState } from 'react';

interface PaymentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSecure?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const PaymentButton = forwardRef<HTMLButtonElement, PaymentButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      isLoading = false,
      isSecure = true,
      children,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden rounded-lg';

    const variantClasses = {
      default: 'bg-[#1E40AF] text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl border border-transparent',
      outline: 'bg-transparent text-[#1E40AF] border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white active:bg-blue-800',
      ghost: 'bg-transparent text-[#1E40AF] hover:bg-blue-50 active:bg-blue-100 border border-transparent'
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm min-h-[36px] gap-2',
      md: 'px-6 py-3 text-base min-h-[44px] gap-3',
      lg: 'px-8 py-4 text-lg min-h-[52px] gap-4'
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading || isProcessing) return;
      
      setIsProcessing(true);
      
      try {
        if (onClick) {
          await onClick(e);
        }
      } finally {
        setIsProcessing(false);
      }
    };

    const isButtonDisabled = disabled || isLoading || isProcessing;
    const showLoadingState = isLoading || isProcessing;

    const LoadingSpinner = () => (
      <svg
        className={\`animate-spin \${iconSizes[size]}\`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const SecurityBadge = () => (
      isSecure ? (
        <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
          <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Secure payment</span>
          </div>
        </div>
      ) : null
    );

    return (
      <button
        ref={ref}
        className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
        disabled={isButtonDisabled}
        onClick={handleClick}
        aria-busy={showLoadingState}
        aria-describedby={isSecure ? 'payment-security-info' : undefined}
        role="button"
        type="button"
        {...props}
      >
        <SecurityBadge />
        
        {showLoadingState ? (
          <>
            <LoadingSpinner />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon ? (
              <span className={\`flex-shrink-0 \${iconSizes[size]}\`} aria-hidden="true">
                {leftIcon}
              </span>
            ) : null}
            
            <span className="flex-1">{children}</span>
            
            {rightIcon ? (
              <span className={\`flex-shrink-0 \${iconSizes[size]}\`} aria-hidden="true">
                {rightIcon}
              </span>
            ) : null}
          </>
        )}
        
        {isSecure ? (
          <div id="payment-security-info" className="sr-only">
            This payment is secured with industry-standard encryption
          </div>
        ) : null}
      </button>
    );
  }
);

PaymentButton.displayName = 'PaymentButton';

export default PaymentButton;
export type { PaymentButtonProps };`,

  'components/ChartComponent.tsx': `import React, { useMemo, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps extends VariantProps<typeof chartVariants> {
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area' | 'pie';
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaDescription?: string;
}

const chartVariants = cva(
  'relative w-full rounded-lg border bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-gray-200 shadow-sm',
        outline: 'border-2 border-blue-200 shadow-none',
        ghost: 'border-transparent shadow-none bg-gray-50/50',
      },
      size: {
        sm: 'h-64 p-4',
        md: 'h-80 p-6',
        lg: 'h-96 p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  title,
  subtitle,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  animated = true,
  variant,
  size,
  className,
  ariaLabel,
  ariaDescription,
  ...props
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const primaryColor = '#1E40AF';
  const colorPalette = [
    primaryColor,
    '#3B82F6',
    '#60A5FA',
    '#93C5FD',
    '#DBEAFE',
    '#EF4444',
    '#F59E0B',
    '#10B981',
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width - 32,
          height: rect.height - (title || subtitle ? 80 : 40),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [title, subtitle]);

  const processedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: item.color || colorPalette[index % colorPalette.length],
    }));
  }, [data]);

  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.value)), [data]);

  const renderLineChart = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;

    const padding = 40;
    const chartWidth = dimensions.width - padding * 2;
    const chartHeight = dimensions.height - padding * 2;
    const stepX = chartWidth / Math.max(processedData.length - 1, 1);

    const points = processedData.map((item, index) => {
      const x = padding + index * stepX;
      const y = padding + chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
      return { x, y, ...item };
    });

    const pathData = points.map((point, index) => 
      \`\${index === 0 ? 'M' : 'L'} \${point.x} \${point.y}\`
    ).join(' ');

    return (
      <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
        {showGrid ? (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return (
                <line
                  key={\`grid-\${i}\`}
                  x1={padding}
                  y1={y}
                  x2={dimensions.width - padding}
                  y2={y}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ) : null}
        
        <path
          d={pathData}
          fill="none"
          stroke={primaryColor}
          strokeWidth="3"
          className={animated ? 'animate-pulse' : ''}
        />
        
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={hoveredIndex === index ? 6 : 4}
            fill={primaryColor}
            className="cursor-pointer transition-all duration-200 hover:r-6"
            onMouseEnter={() => showTooltip ? setHoveredIndex(index) : null}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={\`Data point: \${point.label}, value: \${point.value}\`}
          />
        ))}
      </svg>
    );
  };

  const renderBarChart = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;

    const padding = 40;
    const chartWidth = dimensions.width - padding * 2;
    const chartHeight = dimensions.height - padding * 2;
    const barWidth = chartWidth / processedData.length * 0.8;
    const barSpacing = chartWidth / processedData.length * 0.2;

    return (
      <svg width={dimensions.width} height={dimensions.height}>
        {showGrid ? (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return (
                <line
                  key={\`grid-\${i}\`}
                  x1={padding}
                  y1={y}
                  x2={dimensions.width - padding}
                  y2={y}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ) : null}
        
        {processedData.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = padding + index * (barWidth + barSpacing);
          const y = dimensions.height - padding - barHeight;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={item.color}
              className={\`cursor-pointer transition-all duration-200 \${
                hoveredIndex === index ? 'opacity-80' : 'opacity-100'
              } \${animated ? 'animate-pulse' : ''}\`}
              onMouseEnter={() => showTooltip ? setHoveredIndex(index) : null}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    if (type === 'line') return renderLineChart();
    if (type === 'bar') return renderBarChart();
    return renderLineChart();
  };

  return (
    <div
      ref={chartRef}
      className={cn(chartVariants({ variant, size }), className)}
      role="img"
      aria-label={ariaLabel || title || 'Chart'}
      aria-description={ariaDescription || subtitle}
      {...props}
    >
      {title || subtitle ? (
        <div className="mb-4">
          {title ? <h3 className="text-lg font-semibold text-gray-900">{title}</h3> : null}
          {subtitle ? <p className="text-sm text-gray-600 mt-1">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="w-full h-full flex items-center justify-center">
        {renderChart()}
      </div>
      {showLegend && processedData.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {processedData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Chart;`,

  'components/CryptoPriceTicker.tsx': `import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  icon?: string;
}

const cryptoTickerVariants = cva(
  "inline-flex items-center justify-between rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border-slate-200 shadow-sm hover:shadow-md",
        outline: "border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50 hover:border-[#1E40AF]",
        ghost: "border-transparent bg-transparent text-slate-900 hover:bg-slate-100"
      },
      size: {
        sm: "px-3 py-2 text-xs gap-2 min-w-[200px]",
        md: "px-4 py-3 text-sm gap-3 min-w-[280px]",
        lg: "px-6 py-4 text-base gap-4 min-w-[320px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const iconSizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8"
};

const priceSizeMap = {
  sm: "text-sm font-semibold",
  md: "text-lg font-bold",
  lg: "text-xl font-bold"
};

interface CryptoPriceTickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cryptoTickerVariants> {
  symbol: string;
  name?: string;
  refreshInterval?: number;
  showIcon?: boolean;
  showName?: boolean;
  onPriceUpdate?: (data: CryptoData) => void;
  initialPrice?: number;
  mockData?: boolean;
}

const generateMockData = (symbol: string, name?: string, currentPrice?: number): CryptoData => {
  const basePrice = currentPrice || Math.random() * 50000 + 1000;
  const changePercent = (Math.random() - 0.5) * 10;
  const change24h = basePrice * (changePercent / 100);
  
  return {
    symbol: symbol.toUpperCase(),
    name: name || \`\${symbol} Coin\`,
    price: basePrice + (Math.random() - 0.5) * 100,
    change24h,
    changePercent24h: changePercent
  };
};

const CryptoPriceTicker: React.FC<CryptoPriceTickerProps> = ({
  className,
  variant,
  size = "md",
  symbol,
  name,
  refreshInterval = 30000,
  showIcon = true,
  showName = false,
  onPriceUpdate,
  initialPrice,
  mockData = true,
  ...props
}) => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchCryptoData = async () => {
    try {
      setError(null);
      
      if (mockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = generateMockData(symbol, name, cryptoData?.price || initialPrice);
        setCryptoData(data);
        if (onPriceUpdate) {
          onPriceUpdate(data);
        }
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        throw new Error('Real API not implemented');
      }
    } catch (err) {
      setError('Failed to fetch price data');
      console.error('Error fetching crypto data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, refreshInterval);
    return () => clearInterval(interval);
  }, [symbol, refreshInterval]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatPercentage = (percent: number): string => {
    return \`\${percent >= 0 ? '+' : ''}\${percent.toFixed(2)}%\`;
  };

  if (isLoading && !cryptoData) {
    return (
      <div 
        className={cn(cryptoTickerVariants({ variant, size, className }))}
        role="status"
        aria-label="Loading cryptocurrency price data"
      >
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full bg-slate-300 animate-pulse", iconSizeMap[size!])} />
          <div className="space-y-1">
            <div className="h-3 bg-slate-300 rounded animate-pulse w-16" />
            <div className="h-2 bg-slate-300 rounded animate-pulse w-12" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="h-4 bg-slate-300 rounded animate-pulse w-20" />
          <div className="h-3 bg-slate-300 rounded animate-pulse w-16" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={cn(cryptoTickerVariants({ variant, size, className }), "border-red-200 bg-red-50")}
        role="alert"
        aria-label="Error loading cryptocurrency data"
      >
        <div className="flex items-center gap-2 text-red-600">
          <svg className={cn("fill-current", iconSizeMap[size!])} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Error loading data</span>
        </div>
      </div>
    );
  }

  if (!cryptoData) return null;

  return (
    <div
      className={cn(
        cryptoTickerVariants({ variant, size }),
        isAnimating ? 'scale-105 transition-transform duration-300' : '',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {showIcon ? (
          <div className={cn("rounded-full bg-slate-200 flex items-center justify-center", iconSizeMap[size!])}>
            <span className="text-xs font-bold">{cryptoData.symbol.charAt(0)}</span>
          </div>
        ) : null}
        <div className="flex flex-col">
          <span className={cn("font-semibold", priceSizeMap[size!])}>
            {cryptoData.symbol}
          </span>
          {showName ? (
            <span className="text-xs text-slate-600">{cryptoData.name}</span>
          ) : null}
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-bold", priceSizeMap[size!])}>
          {formatPrice(cryptoData.price)}
        </div>
        <div className={cn(
          "text-xs",
          cryptoData.changePercent24h >= 0 ? "text-green-600" : "text-red-600"
        )}>
          {formatPercentage(cryptoData.changePercent24h)}
        </div>
      </div>
    </div>
  );
};

export default CryptoPriceTicker;`,

  'components/SecurityModal.tsx': `import React, { useEffect, useRef } from 'react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const SecurityModal: React.FC<SecurityModalProps> = ({
  isOpen,
  onClose,
  variant = 'default',
  size = 'md',
  title = 'Security Notice',
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-2xl',
    outline: 'bg-white border-2 border-[#1E40AF] shadow-lg',
    ghost: 'bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl',
  };

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!closeOnEscape || !isOpen) return;

      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      <div
        ref={modalRef}
        className={\`
          relative w-full \${sizeClasses[size]} \${variantClasses[variant]}
          rounded-xl transform transition-all duration-200 ease-out
          \${className}
        \`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E40AF]/10">
              <svg
                className="w-5 h-5 text-[#1E40AF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900 tracking-tight"
            >
              {title}
            </h2>
          </div>

          {showCloseButton ? (
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-1"
              onClick={onClose}
              aria-label="Close security modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <div
          id="modal-description"
          className="p-6 text-gray-700 leading-relaxed"
        >
          {children}
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-center space-x-2 text-xs text-[#1E40AF] bg-[#1E40AF]/5 rounded-lg py-2 px-3 border border-[#1E40AF]/10">
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-1.042.133-2.052.382-3.016z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secured by industry-standard encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;`,

  'components/index.ts': `export { BalanceWidget } from './BalanceWidget';
export { TransactionCard } from './TransactionCard';
export { default as PaymentButton } from './PaymentButton';
export { default as ChartComponent } from './ChartComponent';
export { default as CryptoPriceTicker } from './CryptoPriceTicker';
export { default as SecurityModal } from './SecurityModal';

export type { PaymentButtonProps } from './PaymentButton';
export type { TransactionCardProps } from './TransactionCard';`,

  'lib/utils.ts': `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
}

// Documentation content
const documentationFiles = {
  'README.md': `# Fintech Pro UI Kit v1.0

A comprehensive, production-ready UI component library designed specifically for fintech applications. Built with React, TypeScript, and Tailwind CSS.

## 📦 Package Contents

\`\`\`
fintech-pro-ui-kit/
├── components/
│   ├── BalanceWidget.tsx      # Display account balances with trends
│   ├── TransactionCard.tsx    # Transaction history cards
│   ├── PaymentButton.tsx      # Secure payment buttons
│   ├── ChartComponent.tsx     # Financial data visualization
│   ├── CryptoPriceTicker.tsx  # Real-time crypto prices
│   ├── SecurityModal.tsx      # Secure modal dialogs
│   └── index.ts               # Component exports
├── lib/
│   └── utils.ts               # Utility functions
├── styles/
│   ├── index.css              # Main stylesheet
│   └── variables.css          # CSS custom properties
├── docs/
│   └── USAGE.md               # Detailed usage guide
├── LICENSE.md                 # License information
└── README.md                  # This file
\`\`\`

## ✨ Features

- **6 Production-Ready Components** - Carefully crafted for fintech applications
- **TypeScript Support** - Full type definitions included
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Dark Mode Ready** - All components support light and dark themes
- **Accessible** - WCAG 2.1 AA compliant
- **Responsive** - Mobile-first design approach
- **GDPR Compliant** - Design patterns for European financial regulations

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install react react-dom class-variance-authority clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom
\`\`\`

### 2. Copy Components

Copy the \`components/\` and \`lib/\` folders to your project's \`src/\` directory.

### 3. Configure Tailwind

Update your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#64748B',
        accent: '#10B981',
      },
    },
  },
  plugins: [],
}
\`\`\`

### 4. Import and Use

\`\`\`tsx
import { BalanceWidget, PaymentButton, TransactionCard } from './components';

function App() {
  return (
    <div>
      <BalanceWidget
        balance={12345.67}
        currency="USD"
        label="Total Balance"
        trend="up"
        trendValue={245.50}
      />
      
      <PaymentButton onClick={() => handlePayment()}>
        Pay Now
      </PaymentButton>
    </div>
  );
}
\`\`\`

## 📖 Components Overview

### BalanceWidget
Display account balances with trend indicators.

\`\`\`tsx
<BalanceWidget
  balance={12345.67}
  currency="USD"
  label="Total Balance"
  trend="up"
  trendValue={245.50}
  variant="default" // 'default' | 'outline' | 'ghost'
  size="md" // 'sm' | 'md' | 'lg'
/>
\`\`\`

### TransactionCard
Display transaction history with status badges.

\`\`\`tsx
<TransactionCard
  transaction={{
    id: '1',
    type: 'credit',
    amount: 2500,
    currency: 'USD',
    description: 'Salary Deposit',
    merchant: 'TechCorp Inc.',
    date: new Date(),
    status: 'completed',
  }}
  variant="default"
  size="md"
  showBalance
  onTransactionClick={(tx) => console.log(tx)}
/>
\`\`\`

### PaymentButton
Secure payment buttons with loading states.

\`\`\`tsx
<PaymentButton
  variant="default" // 'default' | 'outline' | 'ghost'
  size="md" // 'sm' | 'md' | 'lg'
  isLoading={false}
  isSecure={true}
  leftIcon={<CardIcon />}
  onClick={handlePayment}
>
  Pay $99.00
</PaymentButton>
\`\`\`

### ChartComponent
Financial data visualization (line & bar charts).

\`\`\`tsx
<ChartComponent
  data={[
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 5100 },
    { label: 'Mar', value: 4800 },
  ]}
  type="line" // 'line' | 'bar'
  title="Portfolio Growth"
  subtitle="Last 6 months"
  showGrid
  showLegend
  animated
/>
\`\`\`

### CryptoPriceTicker
Real-time cryptocurrency price display.

\`\`\`tsx
<CryptoPriceTicker
  symbol="BTC"
  name="Bitcoin"
  initialPrice={67500}
  refreshInterval={30000}
  variant="default"
  size="md"
  showIcon
  onPriceUpdate={(data) => console.log(data)}
/>
\`\`\`

### SecurityModal
Secure modal dialogs for sensitive operations.

\`\`\`tsx
<SecurityModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Payment"
  variant="default"
  size="md"
>
  <p>Are you sure you want to proceed with this payment?</p>
</SecurityModal>
\`\`\`

## 🎨 Customization

### Design Tokens

All components use CSS custom properties for easy theming:

\`\`\`css
:root {
  --color-primary: #1E40AF;
  --color-secondary: #64748B;
  --color-accent: #10B981;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
\`\`\`

### Variants

Each component supports multiple variants:
- **default** - Solid background with shadow
- **outline** - Border only, transparent background
- **ghost** - Minimal styling, subtle hover effects

### Sizes

Most components support three sizes:
- **sm** - Compact size for dense layouts
- **md** - Default size for standard use
- **lg** - Large size for emphasis

## 📄 License

This UI Kit is licensed for commercial and personal use. See LICENSE.md for details.

## 🆘 Support

For questions or issues, please contact support@fintechpro.dev

---

Built with ❤️ by Fintech Pro UI Kit Team
Version 1.0.0 | November 2024
`,

  'docs/USAGE.md': `# Detailed Usage Guide

This guide provides comprehensive examples for each component in the Fintech Pro UI Kit.

## Table of Contents

1. [Installation](#installation)
2. [BalanceWidget](#balancewidget)
3. [TransactionCard](#transactioncard)
4. [PaymentButton](#paymentbutton)
5. [ChartComponent](#chartcomponent)
6. [CryptoPriceTicker](#cryptopriceticker)
7. [SecurityModal](#securitymodal)
8. [Theming](#theming)

---

## Installation

### Prerequisites

- Node.js 16+
- React 18+
- TypeScript 5+

### Required Dependencies

\`\`\`bash
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom typescript
\`\`\`

### Project Setup

1. Initialize Tailwind CSS:
\`\`\`bash
npx tailwindcss init -p
\`\`\`

2. Configure \`tailwind.config.js\`:
\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
      },
    },
  },
  plugins: [],
}
\`\`\`

3. Add Tailwind directives to your CSS:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

---

## BalanceWidget

The BalanceWidget displays account balances with optional trend indicators.

### Basic Usage

\`\`\`tsx
import { BalanceWidget } from './components';

function MyComponent() {
  return (
    <BalanceWidget
      balance={12345.67}
      currency="USD"
      label="Total Balance"
    />
  );
}
\`\`\`

### With Trend Indicators

\`\`\`tsx
<BalanceWidget
  balance={12345.67}
  currency="USD"
  label="Total Balance"
  trend="up"
  trendValue={245.50}
  trendPeriod="vs last month"
/>
\`\`\`

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| balance | number | required | The balance amount |
| currency | string | 'USD' | Currency code |
| label | string | 'Current Balance' | Label text |
| trend | 'up' \\| 'down' \\| 'neutral' | - | Trend direction |
| trendValue | number | - | Trend amount |
| trendPeriod | string | 'vs last month' | Trend period text |
| variant | 'default' \\| 'outline' \\| 'ghost' | 'default' | Visual variant |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Component size |
| isLoading | boolean | false | Show loading skeleton |
| onClick | () => void | - | Click handler |

---

## TransactionCard

Display individual transaction records with rich formatting.

### Basic Usage

\`\`\`tsx
import { TransactionCard } from './components';

const transaction = {
  id: '1',
  type: 'credit',
  amount: 2500.00,
  currency: 'USD',
  description: 'Salary Deposit',
  merchant: 'TechCorp Inc.',
  date: new Date(),
  status: 'completed',
  balance: 15234.56
};

function MyComponent() {
  return (
    <TransactionCard
      transaction={transaction}
      showBalance
      onTransactionClick={(tx) => console.log('Clicked:', tx.id)}
    />
  );
}
\`\`\`

### Transaction Types

- **credit** - Incoming money (shown in green)
- **debit** - Outgoing money (shown in red)
- **transfer** - Money transfers (shown in blue)

### Status Types

- **completed** - Transaction finished
- **pending** - Transaction processing
- **failed** - Transaction failed

---

## PaymentButton

Secure payment buttons with loading states and security indicators.

### Basic Usage

\`\`\`tsx
import PaymentButton from './components/PaymentButton';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    // Process payment
    await processPayment();
    setIsLoading(false);
  };

  return (
    <PaymentButton
      onClick={handlePayment}
      isLoading={isLoading}
    >
      Pay $99.00
    </PaymentButton>
  );
}
\`\`\`

### With Icons

\`\`\`tsx
<PaymentButton
  leftIcon={<CreditCardIcon />}
  rightIcon={<ArrowRightIcon />}
>
  Pay with Card
</PaymentButton>
\`\`\`

---

## ChartComponent

Financial data visualization with line and bar chart support.

### Line Chart

\`\`\`tsx
import ChartComponent from './components/ChartComponent';

const data = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 5100 },
  { label: 'Mar', value: 4800 },
  { label: 'Apr', value: 6200 },
  { label: 'May', value: 5800 },
  { label: 'Jun', value: 7100 },
];

function MyComponent() {
  return (
    <ChartComponent
      data={data}
      type="line"
      title="Portfolio Growth"
      subtitle="Last 6 months performance"
      showGrid
      showLegend
      animated
    />
  );
}
\`\`\`

### Bar Chart

\`\`\`tsx
<ChartComponent
  data={data}
  type="bar"
  title="Monthly Expenses"
  subtitle="Spending breakdown"
/>
\`\`\`

---

## CryptoPriceTicker

Real-time cryptocurrency price display with auto-refresh.

### Basic Usage

\`\`\`tsx
import CryptoPriceTicker from './components/CryptoPriceTicker';

function MyComponent() {
  return (
    <CryptoPriceTicker
      symbol="BTC"
      name="Bitcoin"
      initialPrice={67500}
      refreshInterval={30000}
    />
  );
}
\`\`\`

### Multiple Tickers

\`\`\`tsx
<div className="space-y-3">
  <CryptoPriceTicker symbol="BTC" name="Bitcoin" initialPrice={67500} />
  <CryptoPriceTicker symbol="ETH" name="Ethereum" initialPrice={3200} />
  <CryptoPriceTicker symbol="SOL" name="Solana" initialPrice={180} />
</div>
\`\`\`

---

## SecurityModal

Accessible modal dialogs for sensitive operations.

### Basic Usage

\`\`\`tsx
import { useState } from 'react';
import SecurityModal from './components/SecurityModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <SecurityModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Payment"
      >
        <p>Are you sure you want to proceed?</p>
        <div className="mt-4 flex gap-3">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </SecurityModal>
    </>
  );
}
\`\`\`

---

## Theming

### CSS Variables

Override the default theme by defining CSS custom properties:

\`\`\`css
:root {
  --color-primary: #1E40AF;
  --color-secondary: #64748B;
  --color-accent: #10B981;
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-text: #ffffff;
}
\`\`\`

### Tailwind Configuration

Extend the Tailwind config for custom colors:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
    },
  },
}
\`\`\`

---

For more examples, visit our documentation site or contact support.
`,

  'LICENSE.md': `# Fintech Pro UI Kit License

**Version 1.0.0**
**Effective Date: November 2024**

## License Grant

This license grants you, the purchaser, the right to use the Fintech Pro UI Kit ("Software") under the following terms:

### Permitted Uses

✅ **Commercial Projects** - Use in commercial applications and products
✅ **Personal Projects** - Use in personal, non-commercial projects
✅ **Client Work** - Use in projects developed for clients
✅ **SaaS Applications** - Include in software-as-a-service products
✅ **Mobile Applications** - Use in React Native or similar frameworks
✅ **Modification** - Modify and customize the components

### Restrictions

❌ **Redistribution** - Do not redistribute, resell, or share the source code
❌ **Open Source** - Do not include in open source projects
❌ **Component Libraries** - Do not create derivative UI kits for sale
❌ **Sub-licensing** - Do not sub-license to third parties

### Attribution

Attribution is appreciated but not required.

### Warranty Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

### Limitation of Liability

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Support

For questions about licensing, contact: license@fintechpro.dev

---

© 2024 Fintech Pro UI Kit. All rights reserved.
`,

  'styles/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #1E40AF;
  --color-secondary: #64748B;
  --color-accent: #10B981;
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-text: #ffffff;
  --color-text-muted: #a1a1aa;
  
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
}

body {
  margin: 0;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`,

  'styles/variables.css': `/* Fintech Pro UI Kit - CSS Variables */

:root {
  /* Primary Colors */
  --color-primary: #1E40AF;
  --color-primary-light: #3B82F6;
  --color-primary-dark: #1E3A8A;
  
  /* Secondary Colors */
  --color-secondary: #64748B;
  --color-secondary-light: #94A3B8;
  --color-secondary-dark: #475569;
  
  /* Accent Colors */
  --color-accent: #10B981;
  --color-accent-light: #34D399;
  --color-accent-dark: #059669;
  
  /* Semantic Colors */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Background Colors */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-surface: #ffffff;
  
  /* Text Colors */
  --color-text: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  
  /* Border Colors */
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Dark Theme */
[data-theme="dark"],
.dark {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-surface: #1e293b;
  
  --color-text: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #64748b;
  
  --color-border: #334155;
  --color-border-light: #1e293b;
}
`,
}

// Configuration files
const configFiles = {
  'package.json': `{
  "name": "fintech-pro-ui-kit",
  "version": "1.0.0",
  "description": "Production-ready UI components for fintech applications",
  "main": "components/index.ts",
  "type": "module",
  "keywords": [
    "react",
    "typescript",
    "ui-kit",
    "fintech",
    "components",
    "tailwindcss"
  ],
  "author": "Fintech Pro UI Kit Team",
  "license": "SEE LICENSE IN LICENSE.md",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`,

  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["components", "lib"]
}`,
}

export interface DownloadProgress {
  status: 'preparing' | 'generating' | 'downloading' | 'complete' | 'error'
  progress: number
  message: string
}

export async function generateAndDownloadPackage(
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  try {
    onProgress?.({
      status: 'preparing',
      progress: 0,
      message: 'Preparing package files...'
    })

    const zip = new JSZip()
    const rootFolder = zip.folder('fintech-pro-ui-kit')
    
    if (!rootFolder) {
      throw new Error('Failed to create ZIP folder')
    }

    // Add component files
    onProgress?.({
      status: 'generating',
      progress: 20,
      message: 'Adding components...'
    })

    for (const [path, content] of Object.entries(componentFiles)) {
      rootFolder.file(path, content)
    }

    // Add documentation files
    onProgress?.({
      status: 'generating',
      progress: 40,
      message: 'Adding documentation...'
    })

    for (const [path, content] of Object.entries(documentationFiles)) {
      rootFolder.file(path, content)
    }

    // Add config files
    onProgress?.({
      status: 'generating',
      progress: 60,
      message: 'Adding configuration files...'
    })

    for (const [path, content] of Object.entries(configFiles)) {
      rootFolder.file(path, content)
    }

    // Generate the ZIP file
    onProgress?.({
      status: 'generating',
      progress: 80,
      message: 'Compressing files...'
    })

    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Download the file
    onProgress?.({
      status: 'downloading',
      progress: 90,
      message: 'Starting download...'
    })

    saveAs(blob, 'fintech-pro-ui-kit-v1.0.0.zip')

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Download complete!'
    })

  } catch (error) {
    console.error('Error generating package:', error)
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error instanceof Error ? error.message : 'Failed to generate package'
    })
    throw error
  }
}

export default generateAndDownloadPackage


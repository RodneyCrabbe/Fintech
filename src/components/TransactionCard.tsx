import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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

  const iconClass = `${sizeClasses[size]} flex-shrink-0`;

  switch (type) {
    case 'debit':
      return (
        <div className={`${iconClass} rounded-full bg-red-100 flex items-center justify-center`}>
          <svg className="w-2/3 h-2/3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      );
    case 'credit':
      return (
        <div className={`${iconClass} rounded-full bg-green-100 flex items-center justify-center`}>
          <svg className="w-2/3 h-2/3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      );
    case 'transfer':
      return (
        <div className={`${iconClass} rounded-full bg-blue-100 flex items-center justify-center`}>
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
    : `${amountPrefix}${formatCurrency(transaction.amount, transaction.currency)}`;

  return (
    <div
      className={cn(
        transactionCardVariants({ variant, size }),
        isClickable && "cursor-pointer",
        className
      )}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      aria-label={isClickable ? `View transaction: ${transaction.description}` : undefined}
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
                  size === 'sm' && "text-sm",
                  size === 'md' && "text-base",
                  size === 'lg' && "text-lg"
                )}>
                  {transaction.description}
                </h3>
                {transaction.merchant && (
                  <p className={cn(
                    "text-gray-600 truncate",
                    size === 'sm' && "text-xs",
                    size === 'md' && "text-sm",
                    size === 'lg' && "text-base"
                  )}>
                    {transaction.merchant}
                  </p>
                )}
              </div>
              <div className={cn(amountVariants({ size, type: transaction.type }))}>
                {amountDisplay}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-gray-500",
                size === 'sm' && "text-xs",
                size === 'md' && "text-sm",
                size === 'lg' && "text-base"
              )}>
                {formatDate(transaction.date, size!)}
              </span>
              <span className={cn(statusVariants({ status: transaction.status }))}>
                {transaction.status}
              </span>
            </div>
            {showBalance && transaction.balance !== undefined && (
              <p className={cn(
                "text-gray-600 mt-2",
                size === 'sm' && "text-xs",
                size === 'md' && "text-sm",
                size === 'lg' && "text-base"
              )}>
                Balance: {formatCurrency(transaction.balance, transaction.currency)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
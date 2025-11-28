import React, { forwardRef, useState } from 'react';

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
        className={`animate-spin ${iconSizes[size]}`}
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
      isSecure && (
        <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
          <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">Secure payment</span>
          </div>
        </div>
      )
    );

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
            {leftIcon && (
              <span className={`flex-shrink-0 ${iconSizes[size]}`} aria-hidden="true">
                {leftIcon}
              </span>
            )}
            
            <span className="flex-1">{children}</span>
            
            {rightIcon && (
              <span className={`flex-shrink-0 ${iconSizes[size]}`} aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
        
        {isSecure && (
          <div id="payment-security-info" className="sr-only">
            This payment is secured with industry-standard encryption
          </div>
        )}
      </button>
    );
  }
);

PaymentButton.displayName = 'PaymentButton';

export default PaymentButton;
export type { PaymentButtonProps };
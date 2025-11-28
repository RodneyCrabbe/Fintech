// ============================================================================
// REMAINING COMPONENT SOURCES - PaymentButton, ProfileSideMenu, QuickTradeWidget
// SecurityModal, TransactionCard, TransactionHistory, WatchlistCard, MarketTable
// ============================================================================

export const PAYMENT_BUTTON_SOURCE = `import React, { forwardRef, useState } from 'react';

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
  ({ variant = 'default', size = 'md', isLoading = false, isSecure = true, children, leftIcon, rightIcon, disabled, className = '', onClick, ...props }, ref) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden rounded-lg';
    const variantClasses = {
      default: 'bg-[#1E40AF] text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl border border-transparent',
      outline: 'bg-transparent text-[#1E40AF] border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white active:bg-blue-800',
      ghost: 'bg-transparent text-[#1E40AF] hover:bg-blue-50 active:bg-blue-100 border border-transparent'
    };
    const sizeClasses = { sm: 'px-4 py-2 text-sm min-h-[36px] gap-2', md: 'px-6 py-3 text-base min-h-[44px] gap-3', lg: 'px-8 py-4 text-lg min-h-[52px] gap-4' };
    const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading || isProcessing) return;
      setIsProcessing(true);
      try { if (onClick) await onClick(e); } finally { setIsProcessing(false); }
    };

    const isButtonDisabled = disabled || isLoading || isProcessing;
    const showLoadingState = isLoading || isProcessing;

    return (
      <button ref={ref} className={\\\`\\\${baseClasses} \\\${variantClasses[variant]} \\\${sizeClasses[size]} \\\${className}\\\`} disabled={isButtonDisabled} onClick={handleClick} type="button" {...props}>
        {isSecure ? (
          <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            </div>
          </div>
        ) : null}
        {showLoadingState ? (
          <>
            <svg className={\\\`animate-spin \\\${iconSizes[size]}\\\`} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon ? <span className={\\\`flex-shrink-0 \\\${iconSizes[size]}\\\`}>{leftIcon}</span> : null}
            <span className="flex-1">{children}</span>
            {rightIcon ? <span className={\\\`flex-shrink-0 \\\${iconSizes[size]}\\\`}>{rightIcon}</span> : null}
          </>
        )}
      </button>
    );
  }
);

PaymentButton.displayName = 'PaymentButton';
export default PaymentButton;
`

export const SECURITY_MODAL_SOURCE = `import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

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
  isDark?: boolean;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose, variant = 'default', size = 'md', title = 'Security Notice', children, showCloseButton = true, closeOnOverlayClick = true, closeOnEscape = true, className = '', isDark = true }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const sizeClasses = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };
  const variantClasses = {
    default: isDark ? 'bg-slate-900 border border-slate-700 shadow-2xl' : 'bg-white border border-gray-200 shadow-2xl',
    outline: isDark ? 'bg-slate-900 border-2 border-emerald-500/50 shadow-lg' : 'bg-white border-2 border-[#1E40AF] shadow-lg',
    ghost: isDark ? 'bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-xl' : 'bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl',
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!closeOnEscape || !isOpen) return;
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleOverlayClick} />
      <div ref={modalRef} className={\\\`relative w-full \\\${sizeClasses[size]} \\\${variantClasses[variant]} rounded-xl transform transition-all duration-200 ease-out \\\${className}\\\`} tabIndex={-1}>
        <div className={cn('flex items-center justify-between p-6 border-b', isDark ? 'border-slate-700' : 'border-gray-100')}>
          <div className="flex items-center space-x-3">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-full', isDark ? 'bg-emerald-500/20' : 'bg-[#1E40AF]/10')}>
              <svg className={cn('w-5 h-5', isDark ? 'text-emerald-400' : 'text-[#1E40AF]')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className={cn('text-xl font-semibold tracking-tight', isDark ? 'text-white' : 'text-gray-900')}>{title}</h2>
          </div>
          {showCloseButton ? (
            <button type="button" className={cn('flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200', isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100')} onClick={onClose}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          ) : null}
        </div>
        <div className={cn('p-6 leading-relaxed', isDark ? 'text-slate-300' : 'text-gray-700')}>{children}</div>
        <div className="px-6 pb-6">
          <div className={cn('flex items-center justify-center space-x-2 text-xs rounded-lg py-2 px-3 border', isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-[#1E40AF] bg-[#1E40AF]/5 border-[#1E40AF]/10')}>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-1.042.133-2.052.382-3.016z" clipRule="evenodd" /></svg>
            <span>Secured by industry-standard encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;
`

export const QUICK_TRADE_WIDGET_SOURCE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface QuickTradeWidgetProps {
  className?: string;
  isDark?: boolean;
  onTrade?: (data: { type: 'buy' | 'sell'; asset: string; amount: number; total: number }) => void;
}

const cryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67542.30 },
  { symbol: 'ETH', name: 'Ethereum', price: 3245.67 },
  { symbol: 'SOL', name: 'Solana', price: 178.92 },
  { symbol: 'XRP', name: 'Ripple', price: 0.6234 },
  { symbol: 'ADA', name: 'Cardano', price: 0.4521 },
];

export const QuickTradeWidget: React.FC<QuickTradeWidgetProps> = ({ className, isDark = true, onTrade }) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [selectedAsset, setSelectedAsset] = useState(cryptoAssets[0]);
  const [amount, setAmount] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const total = numericAmount * selectedAsset.price;

  const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  const handleTrade = async () => {
    if (numericAmount <= 0) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onTrade?.({ type: tradeType, asset: selectedAsset.symbol, amount: numericAmount, total });
    setIsProcessing(false);
    setAmount('');
  };

  const quickAmounts = [0.1, 0.5, 1, 5];

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-cyan-500/20' : 'bg-cyan-100')}>
            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </div>
          <div>
            <h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Quick Trade</h3>
            <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Instant execution</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className={cn('flex p-1 rounded-xl', isDark ? 'bg-slate-800' : 'bg-slate-100')}>
          <button onClick={() => setTradeType('buy')} className={cn('flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200', tradeType === 'buy' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>Buy</button>
          <button onClick={() => setTradeType('sell')} className={cn('flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200', tradeType === 'sell' ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>Sell</button>
        </div>

        <div className="relative">
          <label className={cn('block text-xs font-medium mb-2', isDark ? 'text-slate-400' : 'text-slate-600')}>Select Asset</label>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={cn('w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200', isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300')}>
            <div className="flex items-center gap-3">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', isDark ? 'bg-slate-700' : 'bg-slate-200')}><span className={isDark ? 'text-white' : 'text-slate-900'}>{selectedAsset.symbol.charAt(0)}</span></div>
              <div className="text-left">
                <p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{selectedAsset.symbol}</p>
                <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{formatCurrency(selectedAsset.price)}</p>
              </div>
            </div>
            <svg className={cn('w-5 h-5 transition-transform', isDark ? 'text-slate-400' : 'text-slate-500', isDropdownOpen ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {isDropdownOpen ? (
            <div className={cn('absolute z-10 w-full mt-2 rounded-xl border shadow-xl overflow-hidden', isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200')}>
              {cryptoAssets.map((asset) => (
                <button key={asset.symbol} onClick={() => { setSelectedAsset(asset); setIsDropdownOpen(false); }} className={cn('w-full flex items-center gap-3 p-3 transition-colors', selectedAsset.symbol === asset.symbol ? (isDark ? 'bg-slate-700' : 'bg-slate-100') : (isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'))}>
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', isDark ? 'bg-slate-600' : 'bg-slate-200')}><span className={isDark ? 'text-white' : 'text-slate-900'}>{asset.symbol.charAt(0)}</span></div>
                  <div className="text-left flex-1">
                    <p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{asset.symbol}</p>
                    <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.name}</p>
                  </div>
                  <span className={cn('text-sm font-medium tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>{formatCurrency(asset.price)}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <label className={cn('block text-xs font-medium mb-2', isDark ? 'text-slate-400' : 'text-slate-600')}>Amount ({selectedAsset.symbol})</label>
          <div className={cn('flex items-center rounded-xl border overflow-hidden', isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200')}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className={cn('flex-1 px-4 py-3 bg-transparent outline-none text-lg font-semibold tabular-nums', isDark ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400')} />
            <span className={cn('px-4 font-medium text-sm', isDark ? 'text-slate-500' : 'text-slate-500')}>{selectedAsset.symbol}</span>
          </div>
          <div className="flex gap-2 mt-3">
            {quickAmounts.map((quickAmount) => (
              <button key={quickAmount} onClick={() => setAmount(quickAmount.toString())} className={cn('flex-1 py-2 text-xs font-medium rounded-lg transition-colors', isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900')}>{quickAmount} {selectedAsset.symbol}</button>
            ))}
          </div>
        </div>

        <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-100')}>
          <div className="flex items-center justify-between mb-2">
            <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Total Cost</span>
            <span className={cn('text-xl font-bold tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Fee (0.1%)</span>
            <span className={cn('text-xs tabular-nums', isDark ? 'text-slate-400' : 'text-slate-600')}>{formatCurrency(total * 0.001)}</span>
          </div>
        </div>

        <button onClick={handleTrade} disabled={numericAmount <= 0 || isProcessing} className={cn('w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2', tradeType === 'buy' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25', (numericAmount <= 0 || isProcessing) ? 'opacity-50 cursor-not-allowed' : '')}>
          {isProcessing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset.symbol}</span>
              {numericAmount > 0 ? <span className="opacity-75">• {formatCurrency(total)}</span> : null}
            </>
          )}
        </button>

        <div className={cn('flex items-center justify-center gap-2 text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default QuickTradeWidget;
`

export const TRANSACTION_CARD_SOURCE = `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface TransactionData { id: string; type: 'debit' | 'credit' | 'transfer'; amount: number; currency: string; description: string; category?: string; merchant?: string; date: Date; status: 'completed' | 'pending' | 'failed'; balance?: number; }

const transactionCardVariants = cva(
  "relative rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]",
  { variants: { variant: { default: "bg-white border-gray-200 shadow-sm hover:shadow-md", outline: "bg-transparent border-gray-300 hover:border-[#1E40AF] hover:bg-gray-50", ghost: "bg-transparent border-transparent hover:bg-gray-50" }, size: { sm: "p-3", md: "p-4", lg: "p-6" } }, defaultVariants: { variant: "default", size: "md" } }
);

const amountVariants = cva("font-semibold tabular-nums", { variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" }, type: { debit: "text-red-600", credit: "text-green-600", transfer: "text-[#1E40AF]" } } });
const statusVariants = cva("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", { variants: { status: { completed: "bg-green-100 text-green-800", pending: "bg-yellow-100 text-yellow-800", failed: "bg-red-100 text-red-800" } } });

export interface TransactionCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof transactionCardVariants> { transaction: TransactionData; showBalance?: boolean; onTransactionClick?: (transaction: TransactionData) => void; }

const formatCurrency = (amount: number, currency: string): string => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Math.abs(amount));
const formatDate = (date: Date, size: 'sm' | 'md' | 'lg'): string => {
  if (size === 'sm') return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined });
};

const getTransactionIcon = (type: TransactionData['type'], size: 'sm' | 'md' | 'lg') => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  const iconClass = \\\`\\\${sizeClasses[size]} flex-shrink-0\\\`;

  if (type === 'debit') return <div className={\\\`\\\${iconClass} rounded-full bg-red-100 flex items-center justify-center\\\`}><svg className="w-2/3 h-2/3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>;
  if (type === 'credit') return <div className={\\\`\\\${iconClass} rounded-full bg-green-100 flex items-center justify-center\\\`}><svg className="w-2/3 h-2/3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></div>;
  return <div className={\\\`\\\${iconClass} rounded-full bg-blue-100 flex items-center justify-center\\\`}><svg className="w-2/3 h-2/3 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></div>;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, variant, size = 'md', showBalance = false, onTransactionClick, className, ...props }) => {
  const isClickable = !!onTransactionClick;
  const handleClick = () => { if (onTransactionClick) onTransactionClick(transaction); };
  const amountPrefix = transaction.type === 'debit' ? '-' : '+';
  const amountDisplay = transaction.type === 'transfer' ? formatCurrency(transaction.amount, transaction.currency) : \\\`\\\${amountPrefix}\\\${formatCurrency(transaction.amount, transaction.currency)}\\\`;

  return (
    <div className={cn(transactionCardVariants({ variant, size }), isClickable ? "cursor-pointer" : "", className)} onClick={isClickable ? handleClick : undefined} tabIndex={isClickable ? 0 : undefined} role={isClickable ? "button" : undefined} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {getTransactionIcon(transaction.type, size!)}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className={cn("font-medium text-gray-900 truncate", size === 'sm' ? "text-sm" : size === 'md' ? "text-base" : "text-lg")}>{transaction.description}</h3>
                {transaction.merchant ? <p className={cn("text-gray-600 truncate", size === 'sm' ? "text-xs" : size === 'md' ? "text-sm" : "text-base")}>{transaction.merchant}</p> : null}
              </div>
              <div className={cn(amountVariants({ size, type: transaction.type }))}>{amountDisplay}</div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("text-gray-500", size === 'sm' ? "text-xs" : size === 'md' ? "text-sm" : "text-base")}>{formatDate(transaction.date, size!)}</span>
              <span className={cn(statusVariants({ status: transaction.status }))}>{transaction.status}</span>
            </div>
            {showBalance && transaction.balance !== undefined ? <p className={cn("text-gray-600 mt-2", size === 'sm' ? "text-xs" : size === 'md' ? "text-sm" : "text-base")}>Balance: {formatCurrency(transaction.balance, transaction.currency)}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
`


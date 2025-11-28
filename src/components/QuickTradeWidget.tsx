import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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

export const QuickTradeWidget: React.FC<QuickTradeWidgetProps> = ({
  className,
  isDark = true,
  onTrade,
}) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [selectedAsset, setSelectedAsset] = useState(cryptoAssets[0]);
  const [amount, setAmount] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const total = numericAmount * selectedAsset.price;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleTrade = async () => {
    if (numericAmount <= 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onTrade?.({
      type: tradeType,
      asset: selectedAsset.symbol,
      amount: numericAmount,
      total,
    });
    
    setIsProcessing(false);
    setAmount('');
  };

  const quickAmounts = [0.1, 0.5, 1, 5];

  return (
    <div className={cn(
      'rounded-2xl border overflow-hidden',
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between px-5 py-4 border-b',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'
          )}>
            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Quick Trade
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              Instant execution
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Buy/Sell Toggle */}
        <div className={cn(
          'flex p-1 rounded-xl',
          isDark ? 'bg-slate-800' : 'bg-slate-100'
        )}>
          <button
            onClick={() => setTradeType('buy')}
            className={cn(
              'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
              tradeType === 'buy'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={cn(
              'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
              tradeType === 'sell'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Sell
          </button>
        </div>

        {/* Asset Selector */}
        <div className="relative">
          <label className={cn(
            'block text-xs font-medium mb-2',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            Select Asset
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              'w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200',
              isDark 
                ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                isDark ? 'bg-slate-700' : 'bg-slate-200'
              )}>
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  {selectedAsset.symbol.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className={cn(
                  'font-semibold text-sm',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {selectedAsset.symbol}
                </p>
                <p className={cn(
                  'text-xs',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  {formatCurrency(selectedAsset.price)}
                </p>
              </div>
            </div>
            <svg className={cn(
              'w-5 h-5 transition-transform',
              isDark ? 'text-slate-400' : 'text-slate-500',
              isDropdownOpen && 'rotate-180'
            )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className={cn(
              'absolute z-10 w-full mt-2 rounded-xl border shadow-xl overflow-hidden',
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            )}>
              {cryptoAssets.map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => {
                    setSelectedAsset(asset);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 transition-colors',
                    selectedAsset.symbol === asset.symbol
                      ? isDark ? 'bg-slate-700' : 'bg-slate-100'
                      : isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                    isDark ? 'bg-slate-600' : 'bg-slate-200'
                  )}>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>
                      {asset.symbol.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <p className={cn(
                      'font-semibold text-sm',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      {asset.symbol}
                    </p>
                    <p className={cn(
                      'text-xs',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      {asset.name}
                    </p>
                  </div>
                  <span className={cn(
                    'text-sm font-medium tabular-nums',
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  )}>
                    {formatCurrency(asset.price)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className={cn(
            'block text-xs font-medium mb-2',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            Amount ({selectedAsset.symbol})
          </label>
          <div className={cn(
            'flex items-center rounded-xl border overflow-hidden',
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
          )}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={cn(
                'flex-1 px-4 py-3 bg-transparent outline-none text-lg font-semibold tabular-nums',
                isDark ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'
              )}
            />
            <span className={cn(
              'px-4 font-medium text-sm',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {selectedAsset.symbol}
            </span>
          </div>

          {/* Quick amount buttons */}
          <div className="flex gap-2 mt-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className={cn(
                  'flex-1 py-2 text-xs font-medium rounded-lg transition-colors',
                  isDark 
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                )}
              >
                {quickAmount} {selectedAsset.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className={cn(
          'p-4 rounded-xl',
          isDark ? 'bg-slate-800/50' : 'bg-slate-100'
        )}>
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              'text-sm',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Total Cost
            </span>
            <span className={cn(
              'text-xl font-bold tabular-nums',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              Fee (0.1%)
            </span>
            <span className={cn(
              'text-xs tabular-nums',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              {formatCurrency(total * 0.001)}
            </span>
          </div>
        </div>

        {/* Trade Button */}
        <button
          onClick={handleTrade}
          disabled={numericAmount <= 0 || isProcessing}
          className={cn(
            'w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2',
            tradeType === 'buy'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25',
            (numericAmount <= 0 || isProcessing) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isProcessing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset.symbol}</span>
              {numericAmount > 0 && (
                <span className="opacity-75">• {formatCurrency(total)}</span>
              )}
            </>
          )}
        </button>

        {/* Security badge */}
        <div className={cn(
          'flex items-center justify-center gap-2 text-xs',
          isDark ? 'text-slate-500' : 'text-slate-500'
        )}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default QuickTradeWidget;


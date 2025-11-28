import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
  icon?: string;
  color: string;
}

interface AssetHoldingsProps {
  assets?: Asset[];
  className?: string;
  isDark?: boolean;
  onDeposit?: (asset: Asset) => void;
  onWithdraw?: (asset: Asset) => void;
  onTrade?: (asset: Asset) => void;
}

const defaultAssets: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', balance: 1.2345, value: 83342.50, price: 67500, change24h: 2.45, color: '#F7931A' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', balance: 15.5, value: 49608, price: 3200, change24h: -1.23, color: '#627EEA' },
  { id: '3', symbol: 'SOL', name: 'Solana', balance: 125.75, value: 22635, price: 180, change24h: 5.67, color: '#14F195' },
  { id: '4', symbol: 'USDT', name: 'Tether', balance: 10000, value: 10000, price: 1, change24h: 0.01, color: '#26A17B' },
  { id: '5', symbol: 'XRP', name: 'Ripple', balance: 5000, value: 3100, price: 0.62, change24h: 0.89, color: '#23292F' },
  { id: '6', symbol: 'ADA', name: 'Cardano', balance: 8500, value: 3842.50, price: 0.452, change24h: -2.15, color: '#0033AD' },
];

export const AssetHoldings: React.FC<AssetHoldingsProps> = ({
  assets = defaultAssets,
  className,
  isDark = true,
  onDeposit,
  onWithdraw,
  onTrade,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'value' | 'name' | 'change'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'value':
        comparison = a.value - b.value;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'change':
        comparison = a.change24h - b.change24h;
        break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatBalance = (balance: number, symbol: string): string => {
    if (balance >= 1000) {
      return balance.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return balance.toLocaleString('en-US', { maximumFractionDigits: 4 });
  };

  const handleSort = (column: 'value' | 'name' | 'change') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

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
            isDark ? 'bg-violet-500/20' : 'bg-violet-100'
          )}>
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Your Assets
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              Total: {formatCurrency(totalValue)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
            isDark 
              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          )}>
            + Deposit
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className={cn(
        'grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium',
        isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
      )}>
        <button 
          onClick={() => handleSort('name')}
          className="col-span-3 text-left flex items-center gap-1 hover:text-slate-300"
        >
          Asset
          {sortBy === 'name' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-2 text-right">Balance</div>
        <div className="col-span-2 text-right">Price</div>
        <button 
          onClick={() => handleSort('value')}
          className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300"
        >
          Value
          {sortBy === 'value' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <button 
          onClick={() => handleSort('change')}
          className="col-span-1 text-right flex items-center justify-end gap-1 hover:text-slate-300"
        >
          24h
          {sortBy === 'change' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Asset List */}
      <div className="divide-y divide-slate-800/50">
        {sortedAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
            className={cn(
              'grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200',
              selectedAsset === asset.id
                ? isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                : isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
            )}
          >
            {/* Asset Info */}
            <div className="col-span-3 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: asset.color }}
              >
                {asset.symbol.charAt(0)}
              </div>
              <div>
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
            </div>

            {/* Balance */}
            <div className="col-span-2 text-right">
              <p className={cn(
                'font-medium text-sm tabular-nums',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {formatBalance(asset.balance, asset.symbol)}
              </p>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                {asset.symbol}
              </p>
            </div>

            {/* Price */}
            <div className="col-span-2 text-right">
              <p className={cn(
                'font-medium text-sm tabular-nums',
                isDark ? 'text-slate-300' : 'text-slate-700'
              )}>
                {formatCurrency(asset.price)}
              </p>
            </div>

            {/* Value */}
            <div className="col-span-2 text-right">
              <p className={cn(
                'font-semibold text-sm tabular-nums',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {formatCurrency(asset.value)}
              </p>
            </div>

            {/* 24h Change */}
            <div className="col-span-1 text-right">
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold',
                asset.change24h >= 0
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-red-400 bg-red-500/10'
              )}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeposit?.(asset);
                }}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isDark 
                    ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10' 
                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                )}
                title="Deposit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWithdraw?.(asset);
                }}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isDark 
                    ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10' 
                    : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                )}
                title="Withdraw"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTrade?.(asset);
                }}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isDark 
                    ? 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10' 
                    : 'text-slate-500 hover:text-cyan-600 hover:bg-cyan-50'
                )}
                title="Trade"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={cn(
        'px-5 py-3 border-t text-center',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <button className={cn(
          'text-xs font-medium transition-colors',
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        )}>
          View All Assets →
        </button>
      </div>
    </div>
  );
};

export default AssetHoldings;


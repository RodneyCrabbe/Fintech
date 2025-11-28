import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
  icon?: string;
}

interface WatchlistCardProps {
  assets?: CryptoAsset[];
  onAssetClick?: (asset: CryptoAsset) => void;
  className?: string;
  isDark?: boolean;
}

const defaultAssets: CryptoAsset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change24h: 2.45, volume24h: 28500000000, marketCap: 1320000000000, sparkline: [65000, 66200, 65800, 67000, 66500, 67200, 67542] },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3245.67, change24h: -1.23, volume24h: 15200000000, marketCap: 390000000000, sparkline: [3300, 3280, 3250, 3220, 3260, 3240, 3245] },
  { id: '3', symbol: 'SOL', name: 'Solana', price: 178.92, change24h: 5.67, volume24h: 3200000000, marketCap: 78000000000, sparkline: [165, 168, 172, 175, 173, 177, 178] },
  { id: '4', symbol: 'XRP', name: 'Ripple', price: 0.6234, change24h: 0.89, volume24h: 1800000000, marketCap: 34000000000, sparkline: [0.61, 0.615, 0.62, 0.618, 0.622, 0.62, 0.623] },
  { id: '5', symbol: 'ADA', name: 'Cardano', price: 0.4521, change24h: -2.15, volume24h: 520000000, marketCap: 16000000000, sparkline: [0.47, 0.465, 0.46, 0.455, 0.458, 0.454, 0.452] },
];

const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const padding = 2;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10B981' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WatchlistCard: React.FC<WatchlistCardProps> = ({
  assets = defaultAssets,
  onAssetClick,
  className,
  isDark = true,
}) => {
  const [liveAssets, setLiveAssets] = useState(assets);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAssets(prev => prev.map(asset => {
        const change = (Math.random() - 0.5) * 0.002;
        const newPrice = asset.price * (1 + change);
        const newSparkline = [...asset.sparkline.slice(1), newPrice];
        return {
          ...asset,
          price: newPrice,
          sparkline: newSparkline,
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(price);
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toFixed(2)}`;
  };

  const handleAssetClick = (asset: CryptoAsset) => {
    setSelectedAsset(asset.id);
    onAssetClick?.(asset);
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
            isDark ? 'bg-amber-500/20' : 'bg-amber-100'
          )}>
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Watchlist
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {liveAssets.length} assets tracked
            </p>
          </div>
        </div>
        <button className={cn(
          'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
          isDark 
            ? 'text-emerald-400 hover:bg-emerald-500/10' 
            : 'text-emerald-600 hover:bg-emerald-50'
        )}>
          + Add
        </button>
      </div>

      {/* Table Header */}
      <div className={cn(
        'grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium',
        isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
      )}>
        <div className="col-span-4">Asset</div>
        <div className="col-span-3 text-right">Price</div>
        <div className="col-span-2 text-right">24h</div>
        <div className="col-span-3 text-right">Chart</div>
      </div>

      {/* Asset List */}
      <div className="divide-y divide-slate-800/50">
        {liveAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => handleAssetClick(asset)}
            className={cn(
              'grid grid-cols-12 gap-2 items-center px-5 py-3 cursor-pointer transition-all duration-200',
              selectedAsset === asset.id
                ? isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                : isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
            )}
          >
            {/* Asset Info */}
            <div className="col-span-4 flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  {asset.symbol.charAt(0)}
                </span>
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

            {/* Price */}
            <div className="col-span-3 text-right">
              <p className={cn(
                'font-semibold text-sm tabular-nums',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {formatPrice(asset.price)}
              </p>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Vol: {formatVolume(asset.volume24h)}
              </p>
            </div>

            {/* 24h Change */}
            <div className="col-span-2 text-right">
              <span className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold',
                asset.change24h >= 0
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-red-400 bg-red-500/10'
              )}>
                {asset.change24h >= 0 ? '↑' : '↓'}
                {Math.abs(asset.change24h).toFixed(2)}%
              </span>
            </div>

            {/* Sparkline */}
            <div className="col-span-3 flex justify-end">
              <MiniSparkline data={asset.sparkline} isPositive={asset.change24h >= 0} />
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
          View All Markets →
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;


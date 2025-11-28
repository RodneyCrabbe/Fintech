import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  value: number;
  allocation: number;
  color: string;
  change24h: number;
}

interface PortfolioDonutProps {
  assets?: PortfolioAsset[];
  totalValue?: number;
  className?: string;
  isDark?: boolean;
  onAssetHover?: (asset: PortfolioAsset | null) => void;
}

const defaultAssets: PortfolioAsset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', value: 45230, allocation: 45.2, color: '#F7931A', change24h: 2.45 },
  { id: '2', symbol: 'ETH', name: 'Ethereum', value: 28450, allocation: 28.4, color: '#627EEA', change24h: -1.23 },
  { id: '3', symbol: 'SOL', name: 'Solana', value: 12340, allocation: 12.3, color: '#14F195', change24h: 5.67 },
  { id: '4', symbol: 'USDT', name: 'Tether', value: 8500, allocation: 8.5, color: '#26A17B', change24h: 0.01 },
  { id: '5', symbol: 'Others', name: 'Other Assets', value: 5480, allocation: 5.6, color: '#8B5CF6', change24h: 1.25 },
];

export const PortfolioDonut: React.FC<PortfolioDonutProps> = ({
  assets = defaultAssets,
  totalValue = 100000,
  className,
  isDark = true,
  onAssetHover,
}) => {
  const [hoveredAsset, setHoveredAsset] = useState<PortfolioAsset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<PortfolioAsset | null>(null);

  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centerX = size / 2;
  const centerY = size / 2;

  let cumulativePercent = 0;

  const handleAssetHover = (asset: PortfolioAsset | null) => {
    setHoveredAsset(asset);
    onAssetHover?.(asset);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const displayAsset = hoveredAsset || selectedAsset;

  return (
    <div className={cn(
      'rounded-2xl border p-6',
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            isDark ? 'bg-violet-500/20' : 'bg-violet-100'
          )}>
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Portfolio
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              Asset Allocation
            </p>
          </div>
        </div>
        <span className={cn(
          'text-xs font-medium px-2 py-1 rounded-md',
          isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
        )}>
          +4.52% today
        </span>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={isDark ? '#1e293b' : '#f1f5f9'}
              strokeWidth={strokeWidth}
            />
            
            {/* Asset segments */}
            {assets.map((asset) => {
              const percent = asset.allocation / 100;
              const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
              const strokeDashoffset = -circumference * cumulativePercent;
              cumulativePercent += percent;
              
              const isActive = hoveredAsset?.id === asset.id || selectedAsset?.id === asset.id;
              
              return (
                <circle
                  key={asset.id}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke={asset.color}
                  strokeWidth={isActive ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    opacity: hoveredAsset && hoveredAsset.id !== asset.id ? 0.4 : 1,
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                  }}
                  onMouseEnter={() => handleAssetHover(asset)}
                  onMouseLeave={() => handleAssetHover(null)}
                  onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                />
              );
            })}
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {displayAsset ? (
              <>
                <span className={cn(
                  'text-xs font-medium',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  {displayAsset.symbol}
                </span>
                <span className={cn(
                  'text-xl font-bold',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {displayAsset.allocation.toFixed(1)}%
                </span>
                <span className={cn(
                  'text-sm',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  {formatCurrency(displayAsset.value)}
                </span>
              </>
            ) : (
              <>
                <span className={cn(
                  'text-xs font-medium',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  Total Value
                </span>
                <span className={cn(
                  'text-xl font-bold',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {formatCurrency(totalValue)}
                </span>
                <span className={cn(
                  'text-sm text-emerald-400'
                )}>
                  +$4,523.45
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className={cn(
              'flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200',
              hoveredAsset?.id === asset.id || selectedAsset?.id === asset.id
                ? isDark ? 'bg-slate-800' : 'bg-slate-100'
                : 'hover:bg-slate-800/50'
            )}
            onMouseEnter={() => handleAssetHover(asset)}
            onMouseLeave={() => handleAssetHover(null)}
            onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <div>
                <span className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {asset.symbol}
                </span>
                <span className={cn(
                  'text-xs ml-2',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  {asset.name}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                'text-sm font-semibold tabular-nums',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {asset.allocation.toFixed(1)}%
              </p>
              <p className={cn(
                'text-xs tabular-nums',
                asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
              )}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDonut;


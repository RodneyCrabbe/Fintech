import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MarketAsset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  color: string;
}

interface MarketTableProps {
  className?: string;
  isDark?: boolean;
  onAssetClick?: (asset: MarketAsset) => void;
  showPagination?: boolean;
}

const defaultAssets: MarketAsset[] = [
  { id: '1', rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change1h: 0.15, change24h: 2.45, change7d: 5.23, marketCap: 1320000000000, volume24h: 28500000000, sparkline: [65000, 66200, 65800, 67000, 66500, 67200, 67542], color: '#F7931A' },
  { id: '2', rank: 2, symbol: 'ETH', name: 'Ethereum', price: 3245.67, change1h: -0.05, change24h: -1.23, change7d: 3.45, marketCap: 390000000000, volume24h: 15200000000, sparkline: [3100, 3150, 3200, 3180, 3220, 3240, 3245], color: '#627EEA' },
  { id: '3', rank: 3, symbol: 'USDT', name: 'Tether', price: 1.00, change1h: 0.00, change24h: 0.01, change7d: 0.00, marketCap: 95000000000, volume24h: 45000000000, sparkline: [1, 1, 1, 1, 1, 1, 1], color: '#26A17B' },
  { id: '4', rank: 4, symbol: 'BNB', name: 'BNB', price: 598.45, change1h: 0.32, change24h: 1.87, change7d: -2.15, marketCap: 89000000000, volume24h: 1200000000, sparkline: [580, 590, 585, 595, 600, 595, 598], color: '#F3BA2F' },
  { id: '5', rank: 5, symbol: 'SOL', name: 'Solana', price: 178.92, change1h: 0.85, change24h: 5.67, change7d: 12.34, marketCap: 78000000000, volume24h: 3200000000, sparkline: [155, 160, 165, 170, 175, 177, 178], color: '#14F195' },
  { id: '6', rank: 6, symbol: 'XRP', name: 'XRP', price: 0.6234, change1h: 0.12, change24h: 0.89, change7d: 1.56, marketCap: 34000000000, volume24h: 1800000000, sparkline: [0.61, 0.615, 0.62, 0.618, 0.622, 0.620, 0.623], color: '#23292F' },
  { id: '7', rank: 7, symbol: 'USDC', name: 'USD Coin', price: 1.00, change1h: 0.00, change24h: 0.00, change7d: 0.00, marketCap: 32000000000, volume24h: 5500000000, sparkline: [1, 1, 1, 1, 1, 1, 1], color: '#2775CA' },
  { id: '8', rank: 8, symbol: 'ADA', name: 'Cardano', price: 0.4521, change1h: -0.25, change24h: -2.15, change7d: -5.67, marketCap: 16000000000, volume24h: 520000000, sparkline: [0.48, 0.47, 0.46, 0.455, 0.458, 0.454, 0.452], color: '#0033AD' },
  { id: '9', rank: 9, symbol: 'AVAX', name: 'Avalanche', price: 35.45, change1h: 0.45, change24h: 3.21, change7d: 8.95, marketCap: 14000000000, volume24h: 680000000, sparkline: [32, 33, 34, 34.5, 35, 35.2, 35.45], color: '#E84142' },
  { id: '10', rank: 10, symbol: 'DOGE', name: 'Dogecoin', price: 0.1234, change1h: -0.15, change24h: -1.45, change7d: 2.34, marketCap: 18000000000, volume24h: 890000000, sparkline: [0.12, 0.122, 0.121, 0.123, 0.124, 0.123, 0.1234], color: '#C2A633' },
];

const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 32;
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

export const MarketTable: React.FC<MarketTableProps> = ({
  className,
  isDark = true,
  onAssetClick,
  showPagination = true,
}) => {
  const [assets, setAssets] = useState(defaultAssets);
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change24h' | 'marketCap' | 'volume24h'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => ({
        ...asset,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.002),
        change1h: asset.change1h + (Math.random() - 0.5) * 0.1,
        change24h: asset.change24h + (Math.random() - 0.5) * 0.05,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'rank': comparison = a.rank - b.rank; break;
      case 'price': comparison = a.price - b.price; break;
      case 'change24h': comparison = a.change24h - b.change24h; break;
      case 'marketCap': comparison = a.marketCap - b.marketCap; break;
      case 'volume24h': comparison = a.volume24h - b.volume24h; break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const paginatedAssets = sortedAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedAssets.length / itemsPerPage);

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  const formatPrice = (price: number): string => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`;
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
            isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
          )}>
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              All Cryptocurrencies
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {sortedAssets.length} assets
            </p>
          </div>
        </div>

        {/* Search */}
        <div className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg border',
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        )}>
          <svg className={cn('w-4 h-4', isDark ? 'text-slate-500' : 'text-slate-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className={cn(
              'bg-transparent outline-none text-sm w-32',
              isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
            )}
          />
        </div>
      </div>

      {/* Table Header */}
      <div className={cn(
        'grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium',
        isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
      )}>
        <button onClick={() => handleSort('rank')} className="col-span-1 text-left flex items-center gap-1 hover:text-slate-300">
          # {sortBy === 'rank' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-2 text-left">Name</div>
        <button onClick={() => handleSort('price')} className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">
          Price {sortBy === 'price' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-1 text-right">1h %</div>
        <button onClick={() => handleSort('change24h')} className="col-span-1 text-right flex items-center justify-end gap-1 hover:text-slate-300">
          24h % {sortBy === 'change24h' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-1 text-right">7d %</div>
        <button onClick={() => handleSort('marketCap')} className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">
          Market Cap {sortBy === 'marketCap' && <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>}
        </button>
        <div className="col-span-2 text-right">Last 7 Days</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-800/50">
        {paginatedAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => onAssetClick?.(asset)}
            className={cn(
              'grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200',
              isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
            )}
          >
            {/* Rank */}
            <div className={cn(
              'col-span-1 text-sm font-medium',
              isDark ? 'text-slate-400' : 'text-slate-500'
            )}>
              {asset.rank}
            </div>

            {/* Name */}
            <div className="col-span-2 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: asset.color }}
              >
                {asset.symbol.charAt(0)}
              </div>
              <div>
                <p className={cn(
                  'font-semibold text-sm',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {asset.name}
                </p>
                <p className={cn(
                  'text-xs',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  {asset.symbol}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className={cn(
              'col-span-2 text-right font-semibold text-sm tabular-nums',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {formatPrice(asset.price)}
            </div>

            {/* 1h Change */}
            <div className={cn(
              'col-span-1 text-right text-sm font-medium tabular-nums',
              asset.change1h >= 0 ? 'text-emerald-400' : 'text-red-400'
            )}>
              {asset.change1h >= 0 ? '+' : ''}{asset.change1h.toFixed(2)}%
            </div>

            {/* 24h Change */}
            <div className={cn(
              'col-span-1 text-right text-sm font-medium tabular-nums',
              asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
            )}>
              {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
            </div>

            {/* 7d Change */}
            <div className={cn(
              'col-span-1 text-right text-sm font-medium tabular-nums',
              asset.change7d >= 0 ? 'text-emerald-400' : 'text-red-400'
            )}>
              {asset.change7d >= 0 ? '+' : ''}{asset.change7d.toFixed(2)}%
            </div>

            {/* Market Cap */}
            <div className={cn(
              'col-span-2 text-right text-sm tabular-nums',
              isDark ? 'text-slate-300' : 'text-slate-700'
            )}>
              {formatCurrency(asset.marketCap)}
            </div>

            {/* Sparkline */}
            <div className="col-span-2 flex justify-end">
              <MiniSparkline data={asset.sparkline} isPositive={asset.change7d >= 0} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className={cn(
          'flex items-center justify-between px-5 py-3 border-t',
          isDark ? 'border-slate-800' : 'border-slate-100'
        )}>
          <p className={cn(
            'text-xs',
            isDark ? 'text-slate-500' : 'text-slate-500'
          )}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedAssets.length)} of {sortedAssets.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50',
                isDark 
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 text-xs font-medium rounded-lg transition-colors',
                  currentPage === page
                    ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                    : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50',
                isDark 
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTable;


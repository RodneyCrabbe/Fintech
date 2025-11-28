import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MarketStats } from '../components/MarketStats';
import { MarketTable } from '../components/MarketTable';
import CryptoPriceTicker from '../components/CryptoPriceTicker';

interface MarketsPageProps {
  isDark?: boolean;
  onNavigate?: (page: string) => void;
}

const categories = [
  { id: 'all', label: 'All', count: 250 },
  { id: 'defi', label: 'DeFi', count: 45 },
  { id: 'nft', label: 'NFT & Gaming', count: 32 },
  { id: 'layer1', label: 'Layer 1', count: 28 },
  { id: 'layer2', label: 'Layer 2', count: 18 },
  { id: 'meme', label: 'Meme', count: 15 },
  { id: 'stablecoin', label: 'Stablecoins', count: 12 },
];

const trendingCoins = [
  { symbol: 'PEPE', name: 'Pepe', change: 45.67, rank: 1 },
  { symbol: 'WIF', name: 'dogwifhat', change: 32.45, rank: 2 },
  { symbol: 'BONK', name: 'Bonk', change: 28.90, rank: 3 },
  { symbol: 'FLOKI', name: 'Floki', change: 22.15, rank: 4 },
];

const topGainers = [
  { symbol: 'SOL', name: 'Solana', price: 178.92, change: 15.67 },
  { symbol: 'AVAX', name: 'Avalanche', price: 35.45, change: 12.34 },
  { symbol: 'INJ', name: 'Injective', price: 24.56, change: 10.89 },
];

const topLosers = [
  { symbol: 'ADA', name: 'Cardano', price: 0.452, change: -8.45 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.23, change: -6.78 },
  { symbol: 'ATOM', name: 'Cosmos', price: 9.12, change: -5.34 },
];

export const MarketsPage: React.FC<MarketsPageProps> = ({
  isDark = true,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(
            'text-2xl font-bold tracking-tight',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Markets
          </h1>
          <p className={cn(
            'text-sm mt-1',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            Explore cryptocurrencies and track market trends
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className={cn(
            'flex p-1 rounded-lg',
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          )}>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'table'
                  ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'cards'
                  ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <MarketStats isDark={isDark} />

      {/* Live Ticker Scroll */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <CryptoPriceTicker symbol="BTC" name="Bitcoin" initialPrice={67500} size="sm" className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
        <CryptoPriceTicker symbol="ETH" name="Ethereum" initialPrice={3200} size="sm" className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
        <CryptoPriceTicker symbol="SOL" name="Solana" initialPrice={180} size="sm" className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
        <CryptoPriceTicker symbol="BNB" name="BNB" initialPrice={598} size="sm" className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
        <CryptoPriceTicker symbol="XRP" name="XRP" initialPrice={0.62} size="sm" className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trending */}
        <div className={cn(
          'rounded-2xl border p-5',
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔥</span>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Trending
            </h3>
          </div>
          <div className="space-y-3">
            {trendingCoins.map((coin, index) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'text-xs font-medium w-5',
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  )}>
                    {coin.rank}
                  </span>
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold',
                    'bg-gradient-to-br from-amber-500 to-orange-500'
                  )}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className={cn(
                      'font-medium text-sm',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      {coin.symbol}
                    </p>
                  </div>
                </div>
                <span className="text-emerald-400 text-sm font-medium">
                  +{coin.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gainers */}
        <div className={cn(
          'rounded-2xl border p-5',
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📈</span>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Top Gainers
            </h3>
          </div>
          <div className="space-y-3">
            {topGainers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-emerald-500'
                  )}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className={cn(
                      'font-medium text-sm',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      {coin.symbol}
                    </p>
                    <p className={cn(
                      'text-xs',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      ${coin.price}
                    </p>
                  </div>
                </div>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                  +{coin.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className={cn(
          'rounded-2xl border p-5',
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        )}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📉</span>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Top Losers
            </h3>
          </div>
          <div className="space-y-3">
            {topLosers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-red-500'
                  )}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className={cn(
                      'font-medium text-sm',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      {coin.symbol}
                    </p>
                    <p className={cn(
                      'text-xs',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      ${coin.price}
                    </p>
                  </div>
                </div>
                <span className="text-red-400 text-sm font-medium bg-red-500/10 px-2 py-0.5 rounded">
                  {coin.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeCategory === category.id
                ? isDark 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : isDark 
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-600' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
            )}
          >
            {category.label}
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              activeCategory === category.id
                ? isDark ? 'bg-emerald-500/30' : 'bg-emerald-200'
                : isDark ? 'bg-slate-700' : 'bg-slate-100'
            )}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Market Table */}
      <MarketTable 
        isDark={isDark} 
        onAssetClick={(asset) => onNavigate?.('trade')}
      />
    </div>
  );
};

export default MarketsPage;


// ============================================================================
// FINAL COMPONENT SOURCES - TransactionHistory, WatchlistCard, MarketTable, ProfileSideMenu
// ============================================================================

export const TRANSACTION_HISTORY_SOURCE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface Transaction { id: string; type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'; asset: string; amount: number; value: number; fee: number; status: 'completed' | 'pending' | 'failed'; timestamp: Date; txHash?: string; from?: string; to?: string; }

const defaultTransactions: Transaction[] = [
  { id: '1', type: 'buy', asset: 'BTC', amount: 0.05, value: 3377.11, fee: 3.38, status: 'completed', timestamp: new Date(Date.now() - 300000), txHash: '0x1a2b3c...4d5e6f' },
  { id: '2', type: 'sell', asset: 'ETH', amount: 2.5, value: 8000, fee: 8.00, status: 'completed', timestamp: new Date(Date.now() - 3600000) },
  { id: '3', type: 'deposit', asset: 'USDT', amount: 5000, value: 5000, fee: 0, status: 'completed', timestamp: new Date(Date.now() - 7200000), from: '0x9a8b7c...6d5e4f' },
  { id: '4', type: 'withdraw', asset: 'SOL', amount: 25, value: 4500, fee: 0.5, status: 'pending', timestamp: new Date(Date.now() - 14400000), to: '0x3c4d5e...6f7g8h' },
];

const typeConfig = { buy: { label: 'Buy', color: 'emerald', icon: '↗' }, sell: { label: 'Sell', color: 'red', icon: '↙' }, deposit: { label: 'Deposit', color: 'cyan', icon: '↓' }, withdraw: { label: 'Withdraw', color: 'amber', icon: '↑' }, transfer: { label: 'Transfer', color: 'violet', icon: '↔' } };
const statusConfig = { completed: { label: 'Completed', color: 'emerald' }, pending: { label: 'Pending', color: 'amber' }, failed: { label: 'Failed', color: 'red' } };

interface TransactionHistoryProps { transactions?: Transaction[]; className?: string; isDark?: boolean; showFilters?: boolean; onTransactionClick?: (tx: Transaction) => void; }

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions = defaultTransactions, className, isDark = true, showFilters = true, onTransactionClick }) => {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false;
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    return true;
  });

  const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return \\\`\\\${minutes}m ago\\\`;
    if (hours < 24) return \\\`\\\${hours}h ago\\\`;
    if (days < 7) return \\\`\\\${days}d ago\\\`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const formatAmount = (amount: number, asset: string): string => amount >= 1000 ? \\\`\\\${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} \\\${asset}\\\` : \\\`\\\${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} \\\${asset}\\\`;

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-blue-500/20' : 'bg-blue-100')}>
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div><h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Transaction History</h3><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{filteredTransactions.length} transactions</p></div>
        </div>
        <button className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Export
        </button>
      </div>

      {showFilters ? (
        <div className={cn('px-5 py-3 border-b flex flex-wrap gap-3', isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50')}>
          <div className="flex items-center gap-1">
            {(['all', 'buy', 'sell', 'deposit', 'withdraw', 'transfer'] as const).map((type) => (
              <button key={type} onClick={() => setFilter(type)} className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize', filter === type ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') : (isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'))}>{type}</button>
            ))}
          </div>
          <div className={cn('flex items-center gap-1 border-l pl-3', isDark ? 'border-slate-700' : 'border-slate-200')}>
            {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
              <button key={status} onClick={() => setStatusFilter(status)} className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize', statusFilter === status ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') : (isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'))}>{status}</button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="divide-y divide-slate-800/50 max-h-[500px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className={cn('px-5 py-12 text-center', isDark ? 'text-slate-500' : 'text-slate-500')}><svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg><p>No transactions found</p></div>
        ) : filteredTransactions.map((tx) => {
          const typeInfo = typeConfig[tx.type];
          const statusInfo = statusConfig[tx.status];
          const bgColor = typeInfo.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' : typeInfo.color === 'red' ? 'rgba(239, 68, 68, 0.2)' : typeInfo.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' : typeInfo.color === 'amber' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.2)';
          const textColor = typeInfo.color === 'emerald' ? '#10B981' : typeInfo.color === 'red' ? '#EF4444' : typeInfo.color === 'cyan' ? '#06B6D4' : typeInfo.color === 'amber' ? '#F59E0B' : '#8B5CF6';
          return (
            <div key={tx.id} onClick={() => onTransactionClick?.(tx)} className={cn('flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-200', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: bgColor }}><span style={{ color: textColor }}>{typeInfo.icon}</span></div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{typeInfo.label} {tx.asset}</p>
                    <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : tx.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400')}>{statusInfo.label}</span>
                  </div>
                  <p className={cn('text-xs mt-0.5', isDark ? 'text-slate-500' : 'text-slate-500')}>{formatDate(tx.timestamp)} {tx.txHash ? \\\`• Tx: \\\${tx.txHash}\\\` : tx.from ? \\\`• From: \\\${tx.from}\\\` : tx.to ? \\\`• To: \\\${tx.to}\\\` : ''}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('font-semibold text-sm tabular-nums', tx.type === 'buy' || tx.type === 'deposit' ? 'text-emerald-400' : tx.type === 'sell' || tx.type === 'withdraw' ? 'text-red-400' : isDark ? 'text-white' : 'text-slate-900')}>{tx.type === 'buy' || tx.type === 'deposit' ? '+' : tx.type === 'sell' || tx.type === 'withdraw' ? '-' : ''}{formatAmount(tx.amount, tx.asset)}</p>
                <p className={cn('text-xs tabular-nums', isDark ? 'text-slate-500' : 'text-slate-500')}>{formatCurrency(tx.value)} {tx.fee > 0 ? \\\`• Fee: \\\${formatCurrency(tx.fee)}\\\` : ''}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTransactions.length > 0 ? (
        <div className={cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')}>
          <button className={cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>Load More Transactions →</button>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionHistory;
`

export const WATCHLIST_CARD_SOURCE = `import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface CryptoAsset { id: string; symbol: string; name: string; price: number; change24h: number; volume24h: number; marketCap: number; sparkline: number[]; }

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
    return \\\`\\\${x},\\\${y}\\\`;
  }).join(' ');

  return <svg width={width} height={height} className="overflow-visible"><polyline points={points} fill="none" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

interface WatchlistCardProps { assets?: CryptoAsset[]; onAssetClick?: (asset: CryptoAsset) => void; className?: string; isDark?: boolean; }

export const WatchlistCard: React.FC<WatchlistCardProps> = ({ assets = defaultAssets, onAssetClick, className, isDark = true }) => {
  const [liveAssets, setLiveAssets] = useState(assets);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAssets(prev => prev.map(asset => {
        const change = (Math.random() - 0.5) * 0.002;
        const newPrice = asset.price * (1 + change);
        const newSparkline = [...asset.sparkline.slice(1), newPrice];
        return { ...asset, price: newPrice, sparkline: newSparkline };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => price >= 1000 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price) : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(price);
  const formatVolume = (volume: number): string => volume >= 1e9 ? \\\`$\\\${(volume / 1e9).toFixed(2)}B\\\` : volume >= 1e6 ? \\\`$\\\${(volume / 1e6).toFixed(2)}M\\\` : \\\`$\\\${volume.toFixed(2)}\\\`;
  const handleAssetClick = (asset: CryptoAsset) => { setSelectedAsset(asset.id); onAssetClick?.(asset); };

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-amber-500/20' : 'bg-amber-100')}>
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
          <div><h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Watchlist</h3><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{liveAssets.length} assets tracked</p></div>
        </div>
        <button className={cn('text-xs font-medium px-3 py-1.5 rounded-lg transition-colors', isDark ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-emerald-600 hover:bg-emerald-50')}>+ Add</button>
      </div>
      <div className={cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')}>
        <div className="col-span-4">Asset</div><div className="col-span-3 text-right">Price</div><div className="col-span-2 text-right">24h</div><div className="col-span-3 text-right">Chart</div>
      </div>
      <div className="divide-y divide-slate-800/50">
        {liveAssets.map((asset) => (
          <div key={asset.id} onClick={() => handleAssetClick(asset)} className={cn('grid grid-cols-12 gap-2 items-center px-5 py-3 cursor-pointer transition-all duration-200', selectedAsset === asset.id ? (isDark ? 'bg-emerald-500/10' : 'bg-emerald-50') : (isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'))}>
            <div className="col-span-4 flex items-center gap-3">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', isDark ? 'bg-slate-800' : 'bg-slate-100')}><span className={isDark ? 'text-white' : 'text-slate-900'}>{asset.symbol.charAt(0)}</span></div>
              <div><p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{asset.symbol}</p><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.name}</p></div>
            </div>
            <div className="col-span-3 text-right"><p className={cn('font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{formatPrice(asset.price)}</p><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Vol: {formatVolume(asset.volume24h)}</p></div>
            <div className="col-span-2 text-right"><span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold', asset.change24h >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')}>{asset.change24h >= 0 ? '↑' : '↓'}{Math.abs(asset.change24h).toFixed(2)}%</span></div>
            <div className="col-span-3 flex justify-end"><MiniSparkline data={asset.sparkline} isPositive={asset.change24h >= 0} /></div>
          </div>
        ))}
      </div>
      <div className={cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <button className={cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>View All Markets →</button>
      </div>
    </div>
  );
};

export default WatchlistCard;
`

export const MARKET_TABLE_SOURCE = `import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface MarketAsset { id: string; rank: number; symbol: string; name: string; price: number; change1h: number; change24h: number; change7d: number; marketCap: number; volume24h: number; sparkline: number[]; color: string; }

const defaultAssets: MarketAsset[] = [
  { id: '1', rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change1h: 0.15, change24h: 2.45, change7d: 5.23, marketCap: 1320000000000, volume24h: 28500000000, sparkline: [65000, 66200, 65800, 67000, 66500, 67200, 67542], color: '#F7931A' },
  { id: '2', rank: 2, symbol: 'ETH', name: 'Ethereum', price: 3245.67, change1h: -0.05, change24h: -1.23, change7d: 3.45, marketCap: 390000000000, volume24h: 15200000000, sparkline: [3100, 3150, 3200, 3180, 3220, 3240, 3245], color: '#627EEA' },
  { id: '3', rank: 3, symbol: 'USDT', name: 'Tether', price: 1.00, change1h: 0.00, change24h: 0.01, change7d: 0.00, marketCap: 95000000000, volume24h: 45000000000, sparkline: [1, 1, 1, 1, 1, 1, 1], color: '#26A17B' },
  { id: '4', rank: 4, symbol: 'BNB', name: 'BNB', price: 598.45, change1h: 0.32, change24h: 1.87, change7d: -2.15, marketCap: 89000000000, volume24h: 1200000000, sparkline: [580, 590, 585, 595, 600, 595, 598], color: '#F3BA2F' },
  { id: '5', rank: 5, symbol: 'SOL', name: 'Solana', price: 178.92, change1h: 0.85, change24h: 5.67, change7d: 12.34, marketCap: 78000000000, volume24h: 3200000000, sparkline: [155, 160, 165, 170, 175, 177, 178], color: '#14F195' },
];

const MiniSparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1; const width = 100; const height = 32; const padding = 2;
  const points = data.map((value, index) => { const x = padding + (index / (data.length - 1)) * (width - padding * 2); const y = height - padding - ((value - min) / range) * (height - padding * 2); return \\\`\\\${x},\\\${y}\\\`; }).join(' ');
  return <svg width={width} height={height} className="overflow-visible"><polyline points={points} fill="none" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

interface MarketTableProps { className?: string; isDark?: boolean; onAssetClick?: (asset: MarketAsset) => void; showPagination?: boolean; }

export const MarketTable: React.FC<MarketTableProps> = ({ className, isDark = true, onAssetClick, showPagination = true }) => {
  const [assets, setAssets] = useState(defaultAssets);
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change24h' | 'marketCap' | 'volume24h'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => ({ ...asset, price: asset.price * (1 + (Math.random() - 0.5) * 0.002), change1h: asset.change1h + (Math.random() - 0.5) * 0.1, change24h: asset.change24h + (Math.random() - 0.5) * 0.05 })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter(asset => asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedAssets = [...filteredAssets].sort((a, b) => { let comparison = 0; switch (sortBy) { case 'rank': comparison = a.rank - b.rank; break; case 'price': comparison = a.price - b.price; break; case 'change24h': comparison = a.change24h - b.change24h; break; case 'marketCap': comparison = a.marketCap - b.marketCap; break; case 'volume24h': comparison = a.volume24h - b.volume24h; break; } return sortOrder === 'desc' ? -comparison : comparison; });
  const paginatedAssets = sortedAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedAssets.length / itemsPerPage);
  const handleSort = (column: typeof sortBy) => { if (sortBy === column) { setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); } else { setSortBy(column); setSortOrder('desc'); } };
  const formatCurrency = (value: number): string => value >= 1e12 ? \\\`$\\\${(value / 1e12).toFixed(2)}T\\\` : value >= 1e9 ? \\\`$\\\${(value / 1e9).toFixed(2)}B\\\` : value >= 1e6 ? \\\`$\\\${(value / 1e6).toFixed(2)}M\\\` : \\\`$\\\${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}\\\`;
  const formatPrice = (price: number): string => price >= 1 ? \\\`$\\\${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\\\` : \\\`$\\\${price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}\\\`;

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-emerald-500/20' : 'bg-emerald-100')}><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
          <div><h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>All Cryptocurrencies</h3><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{sortedAssets.length} assets</p></div>
        </div>
        <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border', isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200')}>
          <svg className={cn('w-4 h-4', isDark ? 'text-slate-500' : 'text-slate-400')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className={cn('bg-transparent outline-none text-sm w-32', isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400')} />
        </div>
      </div>
      <div className={cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')}>
        <button onClick={() => handleSort('rank')} className="col-span-1 text-left flex items-center gap-1 hover:text-slate-300"># {sortBy === 'rank' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-2 text-left">Name</div>
        <button onClick={() => handleSort('price')} className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">Price {sortBy === 'price' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-1 text-right">1h %</div>
        <button onClick={() => handleSort('change24h')} className="col-span-1 text-right flex items-center justify-end gap-1 hover:text-slate-300">24h % {sortBy === 'change24h' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-1 text-right">7d %</div>
        <button onClick={() => handleSort('marketCap')} className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">Market Cap {sortBy === 'marketCap' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-2 text-right">Last 7 Days</div>
      </div>
      <div className="divide-y divide-slate-800/50">
        {paginatedAssets.map((asset) => (
          <div key={asset.id} onClick={() => onAssetClick?.(asset)} className={cn('grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')}>
            <div className={cn('col-span-1 text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>{asset.rank}</div>
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: asset.color }}>{asset.symbol.charAt(0)}</div>
              <div><p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{asset.name}</p><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.symbol}</p></div>
            </div>
            <div className={cn('col-span-2 text-right font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{formatPrice(asset.price)}</div>
            <div className={cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change1h >= 0 ? 'text-emerald-400' : 'text-red-400')}>{asset.change1h >= 0 ? '+' : ''}{asset.change1h.toFixed(2)}%</div>
            <div className={cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400')}>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</div>
            <div className={cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change7d >= 0 ? 'text-emerald-400' : 'text-red-400')}>{asset.change7d >= 0 ? '+' : ''}{asset.change7d.toFixed(2)}%</div>
            <div className={cn('col-span-2 text-right text-sm tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>{formatCurrency(asset.marketCap)}</div>
            <div className="col-span-2 flex justify-end"><MiniSparkline data={asset.sparkline} isPositive={asset.change7d >= 0} /></div>
          </div>
        ))}
      </div>
      {showPagination && totalPages > 1 ? (
        <div className={cn('flex items-center justify-between px-5 py-3 border-t', isDark ? 'border-slate-800' : 'border-slate-100')}>
          <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedAssets.length)} of {sortedAssets.length}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (<button key={page} onClick={() => setCurrentPage(page)} className={cn('w-8 h-8 text-xs font-medium rounded-lg transition-colors', currentPage === page ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'))}>{page}</button>))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}>Next</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MarketTable;
`

export const PROFILE_SIDE_MENU_SOURCE = `import React from 'react';
import { cn } from '../lib/utils';

interface ProfileSideMenuProps { isOpen: boolean; onClose: () => void; isDark: boolean; currentPage: string; onNavigate: (page: string) => void; navItems: Array<{ id: string; label: string; icon: React.ReactNode; }>; }

export const ProfileSideMenu: React.FC<ProfileSideMenuProps> = ({ isOpen, onClose, isDark, currentPage, onNavigate, navItems }) => {
  React.useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = 'unset'; };
    }
  }, [isOpen, onClose]);

  const handleNavClick = (pageId: string) => { onNavigate(pageId); onClose(); };
  const menuItems = [...navItems, { id: 'settings', label: 'Settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }, { id: 'help', label: 'Help & Support', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }, { id: 'logout', label: 'Log Out', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> }];

  return (
    <>
      <div className={cn('fixed inset-0 z-50 transition-opacity duration-300', isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={onClose}><div className={cn('absolute inset-0', isDark ? 'bg-slate-950/80 backdrop-blur-sm' : 'bg-slate-900/80 backdrop-blur-sm')} /></div>
      <div className={cn('fixed top-0 right-0 h-full w-full sm:w-96 max-w-sm z-50 transform transition-transform duration-300 ease-out shadow-2xl', isDark ? 'bg-slate-900' : 'bg-white', isOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className={cn('flex items-center justify-between p-6 border-b', isDark ? 'border-slate-800' : 'border-slate-200')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><span className="text-white text-sm font-bold">A</span></div>
            <div><h3 className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>Alex Chen</h3><p className={cn('text-xs', isDark ? 'text-emerald-400' : 'text-emerald-600')}>Pro Account</p></div>
          </div>
          <button onClick={onClose} className={cn('p-2 rounded-lg transition-colors', isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900')}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-120px)] pb-20">
          <div className="p-4 space-y-1">
            <div className="mb-4"><p className={cn('text-xs font-semibold uppercase tracking-wider px-3 py-2', isDark ? 'text-slate-500' : 'text-slate-500')}>Navigation</p><div className="mt-2 space-y-1">{navItems.map((item) => (<button key={item.id} onClick={() => handleNavClick(item.id)} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200', currentPage === item.id ? (isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border border-emerald-200') : (isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'))}><span className={currentPage === item.id ? 'opacity-100' : 'opacity-70'}>{item.icon}</span><span>{item.label}</span>{currentPage === item.id ? <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> : null}</button>))}</div></div>
            <div className={cn('h-px my-4', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
            <div><p className={cn('text-xs font-semibold uppercase tracking-wider px-3 py-2', isDark ? 'text-slate-500' : 'text-slate-500')}>Account</p><div className="mt-2 space-y-1">{menuItems.slice(navItems.length).map((item) => (<button key={item.id} onClick={() => { if (item.id === 'logout') { console.log('Logout clicked'); } else { handleNavClick(item.id); } }} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200', item.id === 'logout' ? (isDark ? 'text-rose-400 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50') : (isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'))}><span className="opacity-70">{item.icon}</span><span>{item.label}</span><svg className="w-4 h-4 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>))}</div></div>
          </div>
        </div>
        <div className={cn('absolute bottom-0 left-0 right-0 p-4 border-t', isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200')}>
          <div className={cn('flex items-center gap-2 px-4 py-2 rounded-lg', isDark ? 'bg-slate-800/50' : 'bg-slate-100')}><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><p className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-600')}>All systems operational</p></div>
        </div>
      </div>
    </>
  );
};

export default ProfileSideMenu;
`


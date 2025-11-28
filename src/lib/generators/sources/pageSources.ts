// ============================================================================
// PAGE SOURCES - Demo Pages for the UI Kit
// ============================================================================

export const CRYPTO_DASHBOARD_PAGE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BalanceWidget } from '../components/BalanceWidget';
import { PortfolioDonut } from '../components/PortfolioDonut';
import { CryptoPriceTicker } from '../components/CryptoPriceTicker';
import { TransactionHistory } from '../components/TransactionHistory';
import { WatchlistCard } from '../components/WatchlistCard';
import { AlertsWidget } from '../components/AlertsWidget';
import { QuickTradeWidget } from '../components/QuickTradeWidget';
import { AssetHoldings } from '../components/AssetHoldings';

interface CryptoDashboardProps { isDark?: boolean; }

const CryptoDashboard: React.FC<CryptoDashboardProps> = ({ isDark = true }) => {
  const [showQuickTrade, setShowQuickTrade] = useState(false);

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Dashboard</h1>
            <p className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Welcome back! Here\\\\'s your portfolio overview.</p>
          </div>
          <button onClick={() => setShowQuickTrade(true)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">Quick Trade</button>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BalanceWidget isDark={isDark} />
            <CryptoPriceTicker isDark={isDark} />
            <TransactionHistory isDark={isDark} />
          </div>
          <div className="space-y-6">
            <PortfolioDonut isDark={isDark} />
            <AlertsWidget isDark={isDark} />
            <WatchlistCard isDark={isDark} />
          </div>
        </div>
        <AssetHoldings isDark={isDark} />
      </div>
      {showQuickTrade ? <QuickTradeWidget isDark={isDark} onClose={() => setShowQuickTrade(false)} /> : null}
    </div>
  );
};

export default CryptoDashboard;
`

export const WALLET_PAGE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BalanceWidget } from '../components/BalanceWidget';
import { AssetHoldings } from '../components/AssetHoldings';
import { TransactionHistory } from '../components/TransactionHistory';
import { TransactionCard } from '../components/TransactionCard';

interface WalletPageProps { isDark?: boolean; }

const WalletPage: React.FC<WalletPageProps> = ({ isDark = true }) => {
  const [activeTab, setActiveTab] = useState<'assets' | 'transactions'>('assets');

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')}>
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Wallet</h1>
          <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>Manage your crypto assets and transactions</p>
        </header>
        <BalanceWidget isDark={isDark} showTrend showActions />
        <div className={cn('flex gap-4 border-b', isDark ? 'border-slate-800' : 'border-slate-200')}>
          <button onClick={() => setActiveTab('assets')} className={cn('px-4 py-3 text-sm font-medium transition-colors relative', activeTab === 'assets' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))}>{activeTab === 'assets' ? <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" /> : null}Assets</button>
          <button onClick={() => setActiveTab('transactions')} className={cn('px-4 py-3 text-sm font-medium transition-colors relative', activeTab === 'transactions' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))}>{activeTab === 'transactions' ? <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" /> : null}Transactions</button>
        </div>
        {activeTab === 'assets' ? <AssetHoldings isDark={isDark} /> : <TransactionHistory isDark={isDark} showFilters />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TransactionCard type="deposit" asset="BTC" amount={0.025} value={1688.56} status="completed" timestamp={new Date(Date.now() - 3600000)} isDark={isDark} />
          <TransactionCard type="withdraw" asset="ETH" amount={1.5} value={4800} status="pending" timestamp={new Date(Date.now() - 7200000)} isDark={isDark} />
          <TransactionCard type="transfer" asset="USDT" amount={1000} value={1000} status="completed" timestamp={new Date(Date.now() - 14400000)} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
`

export const TRADE_PAGE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { ChartComponent } from '../components/ChartComponent';
import { OrderBook } from '../components/OrderBook';
import { QuickTradeWidget } from '../components/QuickTradeWidget';
import { MarketStats } from '../components/MarketStats';

interface TradePageProps { isDark?: boolean; }

const TradePage: React.FC<TradePageProps> = ({ isDark = true }) => {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');

  const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT'];

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Trade</h1>
            <select value={selectedPair} onChange={(e) => setSelectedPair(e.target.value)} className={cn('px-4 py-2 rounded-xl font-medium text-sm', isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200', 'border focus:outline-none focus:ring-2 focus:ring-emerald-500')}>
              {pairs.map(pair => <option key={pair} value={pair}>{pair}</option>)}
            </select>
          </div>
          <MarketStats pair={selectedPair} isDark={isDark} />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <ChartComponent symbol={selectedPair.replace('/', '')} isDark={isDark} height={500} />
            <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')}>
              <div className="flex gap-4 mb-6">
                <button onClick={() => setOrderType('limit')} className={cn('px-4 py-2 rounded-xl font-medium text-sm transition-colors', orderType === 'limit' ? 'bg-emerald-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))}>Limit Order</button>
                <button onClick={() => setOrderType('market')} className={cn('px-4 py-2 rounded-xl font-medium text-sm transition-colors', orderType === 'market' ? 'bg-emerald-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))}>Market Order</button>
              </div>
              <QuickTradeWidget isDark={isDark} defaultPair={selectedPair} orderType={orderType} />
            </div>
          </div>
          <div className="space-y-6"><OrderBook pair={selectedPair} isDark={isDark} /></div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
`

export const MARKETS_PAGE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { MarketTable } from '../components/MarketTable';
import { CryptoPriceTicker } from '../components/CryptoPriceTicker';
import { WatchlistCard } from '../components/WatchlistCard';

interface MarketsPageProps { isDark?: boolean; }

const MarketsPage: React.FC<MarketsPageProps> = ({ isDark = true }) => {
  const [viewMode, setViewMode] = useState<'all' | 'watchlist' | 'gainers' | 'losers'>('all');

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Markets</h1>
          <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>Explore cryptocurrency markets and track prices in real-time</p>
        </header>
        <CryptoPriceTicker isDark={isDark} />
        <div className="flex flex-wrap gap-2">
          {(['all', 'watchlist', 'gainers', 'losers'] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={cn('px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors', viewMode === mode ? 'bg-emerald-500 text-white' : (isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'))}>{mode}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">{viewMode === 'watchlist' ? <WatchlistCard isDark={isDark} /> : <MarketTable isDark={isDark} showPagination />}</div>
          <div className="space-y-6">
            <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')}>
              <h3 className={cn('font-semibold mb-4', isDark ? 'text-white' : 'text-slate-900')}>Market Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total Market Cap</span><span className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>$2.45T</span></div>
                <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>24h Volume</span><span className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>$89.2B</span></div>
                <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>BTC Dominance</span><span className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>52.3%</span></div>
                <div className="flex justify-between"><span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Active Coins</span><span className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>12,456</span></div>
              </div>
            </div>
            <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')}>
              <h3 className={cn('font-semibold mb-4', isDark ? 'text-white' : 'text-slate-900')}>Fear & Greed Index</h3>
              <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center"><span className="text-white font-bold text-xl">72</span></div><div><p className="text-emerald-400 font-semibold">Greed</p><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Market sentiment is positive</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;
`

export const HISTORY_PAGE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { TransactionHistory } from '../components/TransactionHistory';

interface HistoryPageProps { isDark?: boolean; }

const HistoryPage: React.FC<HistoryPageProps> = ({ isDark = true }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | null>(null);

  const handleExport = (format: 'csv' | 'pdf') => {
    setExportFormat(format);
    console.log(\\\`Exporting as \\\${format.toUpperCase()}\\\`);
    setTimeout(() => setExportFormat(null), 2000);
  };

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')}>
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Transaction History</h1>
            <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>View and export your complete transaction history</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleExport('csv')} disabled={exportFormat !== null} className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2', isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200', exportFormat === 'csv' ? 'opacity-50' : '')}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>{exportFormat === 'csv' ? 'Exporting...' : 'Export CSV'}</button>
            <button onClick={() => handleExport('pdf')} disabled={exportFormat !== null} className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2', isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200', exportFormat === 'pdf' ? 'opacity-50' : '')}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>{exportFormat === 'pdf' ? 'Exporting...' : 'Export PDF'}</button>
          </div>
        </header>
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')}><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Total Transactions</p><p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')}>247</p></div>
            <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')}><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Total Volume</p><p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')}>$124.5K</p></div>
            <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')}><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Total Fees Paid</p><p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')}>$342.18</p></div>
            <div className={cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')}><p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Avg Transaction</p><p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')}>$504.05</p></div>
          </div>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', 'all'] as const).map((range) => (
            <button key={range} onClick={() => setDateRange(range)} className={cn('px-4 py-2 rounded-xl text-sm font-medium uppercase transition-colors', dateRange === range ? 'bg-emerald-500 text-white' : (isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'))}>{range === 'all' ? 'All Time' : range}</button>
          ))}
        </div>
        <TransactionHistory isDark={isDark} showFilters />
      </div>
    </div>
  );
};

export default HistoryPage;
`


import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Import existing components
import { BalanceWidget } from '../components/BalanceWidget';
import { TransactionCard } from '../components/TransactionCard';
import Chart from '../components/ChartComponent';
import CryptoPriceTicker from '../components/CryptoPriceTicker';
import PaymentButton from '../components/PaymentButton';
import SecurityModal from '../components/SecurityModal';

// Import new components
import { WatchlistCard } from '../components/WatchlistCard';
import { PortfolioDonut } from '../components/PortfolioDonut';
import { QuickTradeWidget } from '../components/QuickTradeWidget';
import { MarketStats } from '../components/MarketStats';
import { AlertsWidget } from '../components/AlertsWidget';
import { ProfileSideMenu } from '../components/ProfileSideMenu';

// Import Pages
import { MarketsPage } from './MarketsPage';
import { TradePage } from './TradePage';
import { WalletPage } from './WalletPage';
import { HistoryPage } from './HistoryPage';

// Types
interface TradeNotification {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  total: number;
  timestamp: Date;
}

type PageType = 'dashboard' | 'markets' | 'trade' | 'wallet' | 'history';

interface CryptoDashboardProps {
  initialDark?: boolean;
  onViewComponents?: () => void;
}

const CryptoDashboard: React.FC<CryptoDashboardProps> = ({ initialDark = true, onViewComponents }) => {
  const [isDark, setIsDark] = useState(initialDark);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [activeTimeRange, setActiveTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [lastTrade, setLastTrade] = useState<TradeNotification | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Sample data
  const recentTransactions = [
    {
      id: '1',
      type: 'credit' as const,
      amount: 0.05234,
      currency: 'BTC',
      description: 'Bitcoin Purchase',
      merchant: 'Market Order',
      date: new Date(),
      status: 'completed' as const,
    },
    {
      id: '2',
      type: 'debit' as const,
      amount: 250.00,
      currency: 'USD',
      description: 'Withdrawal to Bank',
      merchant: 'Chase ****4521',
      date: new Date(Date.now() - 86400000),
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'transfer' as const,
      amount: 1.5,
      currency: 'ETH',
      description: 'Internal Transfer',
      merchant: 'To Savings Wallet',
      date: new Date(Date.now() - 172800000),
      status: 'pending' as const,
    },
  ];

  const chartData = [
    { label: 'Jan', value: 85000 },
    { label: 'Feb', value: 92000 },
    { label: 'Mar', value: 88000 },
    { label: 'Apr', value: 95000 },
    { label: 'May', value: 102000 },
    { label: 'Jun', value: 100000 },
  ];

  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )},
    { id: 'markets', label: 'Markets', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )},
    { id: 'trade', label: 'Trade', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )},
    { id: 'wallet', label: 'Wallet', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )},
    { id: 'history', label: 'History', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  const handleTrade = (data: { type: 'buy' | 'sell'; asset: string; amount: number; total: number }) => {
    const notification: TradeNotification = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date(),
    };
    setLastTrade(notification);
    setShowNotification(true);
    setIsTradeModalOpen(true);
    
    setTimeout(() => setShowNotification(false), 5000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'markets':
        return <MarketsPage isDark={isDark} onNavigate={(page) => setCurrentPage(page as PageType)} />;
      case 'trade':
        return <TradePage isDark={isDark} />;
      case 'wallet':
        return <WalletPage isDark={isDark} />;
      case 'history':
        return <HistoryPage isDark={isDark} />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Hero Stats Section */}
      <section className="mb-8">
        {/* Welcome Banner */}
        <div className={cn(
          'rounded-2xl p-6 mb-6 border relative overflow-hidden',
          isDark ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800' : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200'
        )}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className={cn(
                'text-sm font-medium mb-1',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Good morning, Alex 👋
              </p>
              <h2 className={cn(
                'text-2xl md:text-3xl font-bold tracking-tight',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Your portfolio is up <span className="text-emerald-400">+4.52%</span> today
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <PaymentButton
                variant="outline"
                onClick={() => setCurrentPage('wallet')}
                isSecure={false}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Deposit
              </PaymentButton>
              <PaymentButton onClick={() => setCurrentPage('trade')}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Trade
              </PaymentButton>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <MarketStats isDark={isDark} />
      </section>

      {/* Live Price Ticker */}
      <section className="mb-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <CryptoPriceTicker symbol="BTC" name="Bitcoin" initialPrice={67500} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
          <CryptoPriceTicker symbol="ETH" name="Ethereum" initialPrice={3200} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
          <CryptoPriceTicker symbol="SOL" name="Solana" initialPrice={180} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
          <CryptoPriceTicker symbol="XRP" name="Ripple" initialPrice={0.62} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Chart & Balance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Portfolio Chart */}
          <div className={cn(
            'rounded-2xl border p-6',
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          )}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
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
                      'font-semibold',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      Portfolio Performance
                    </h3>
                    <p className={cn(
                      'text-sm',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      Track your investment growth
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Time Range Selector */}
              <div className={cn(
                'flex p-1 rounded-xl',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveTimeRange(range)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200',
                      activeTimeRange === range
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <Chart
              data={chartData}
              type="line"
              showGrid
              showLegend={false}
              size="lg"
              className={isDark ? 'bg-transparent border-none [&_h3]:text-white [&_p]:text-slate-400' : 'bg-transparent border-none'}
            />
          </div>

          {/* Balance Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BalanceWidget
              balance={100000}
              currency="USD"
              label="Total Portfolio"
              trend="up"
              trendValue={4520}
              trendPeriod="today"
              size="md"
              className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
            />
            <BalanceWidget
              balance={45230}
              currency="USD"
              label="Available Balance"
              trend="neutral"
              size="md"
              className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
            />
            <BalanceWidget
              balance={54770}
              currency="USD"
              label="In Positions"
              trend="up"
              trendValue={2340}
              trendPeriod="24h"
              size="md"
              className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
            />
          </div>

          {/* Watchlist */}
          <WatchlistCard isDark={isDark} />

          {/* Recent Transactions */}
          <div className={cn(
            'rounded-2xl border overflow-hidden',
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          )}>
            <div className={cn(
              'flex items-center justify-between px-5 py-4 border-b',
              isDark ? 'border-slate-800' : 'border-slate-100'
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                )}>
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className={cn(
                    'font-semibold text-sm',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    Recent Activity
                  </h3>
                  <p className={cn(
                    'text-xs',
                    isDark ? 'text-slate-500' : 'text-slate-500'
                  )}>
                    Your latest transactions
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('history')}
                className={cn(
                  'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
                  isDark 
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                View All
              </button>
            </div>
            <div className="p-4 space-y-3">
              {recentTransactions.map((tx) => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                  className={isDark ? 'bg-slate-800/50 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Trade & Portfolio */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Trade */}
          <QuickTradeWidget isDark={isDark} onTrade={handleTrade} />
          
          {/* Portfolio Allocation */}
          <PortfolioDonut isDark={isDark} />
          
          {/* Alerts */}
          <AlertsWidget isDark={isDark} />
        </div>
      </div>
    </>
  );

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300',
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    )}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={cn(
        'sticky top-0 z-40 backdrop-blur-xl border-b',
        isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
      )}>
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
                </div>
                <div>
                  <h1 className={cn(
                    'text-lg font-bold tracking-tight',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    Fintech Pro Dashboard
                  </h1>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className={cn(
                      'text-xs',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as PageType)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      currentPage === item.id
                        ? isDark 
                          ? 'bg-slate-800 text-white' 
                          : 'bg-slate-100 text-slate-900'
                        : isDark 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* View Components Button */}
              {onViewComponents && (
                <button
                  onClick={onViewComponents}
                  className={cn(
                    'hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                  )}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Components
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={cn(
                  'p-2 rounded-xl transition-colors',
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                )}
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Notifications */}
              <button className={cn(
                'relative p-2 rounded-xl transition-colors',
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              )}>
                <svg className={cn('w-5 h-5', isDark ? 'text-slate-400' : 'text-slate-600')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              </button>

              {/* User Avatar / Profile Button */}
              <button 
                onClick={() => setIsProfileMenuOpen(true)}
                className={cn(
                  'flex items-center gap-3 p-1.5 pr-4 rounded-xl transition-colors',
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className={cn(
                    'text-sm font-medium',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    Alex Chen
                  </p>
                  <p className={cn(
                    'text-xs',
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  )}>
                    Pro Account
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Trade Success Notification */}
      {showNotification && lastTrade && (
        <div className="fixed top-20 right-6 z-50 animate-slide-in">
          <div className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl',
            isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          )}>
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              lastTrade.type === 'buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
            )}>
              <svg className={cn(
                'w-5 h-5',
                lastTrade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'
              )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className={cn(
                'font-medium text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {lastTrade.type === 'buy' ? 'Purchase' : 'Sale'} Successful!
              </p>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                {lastTrade.amount} {lastTrade.asset} for ${lastTrade.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative max-w-[1600px] mx-auto px-6 py-8">
        {renderPage()}
      </main>

      {/* Mobile Navigation */}
      <nav className={cn(
        'fixed bottom-0 left-0 right-0 md:hidden border-t backdrop-blur-xl z-40',
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      )}>
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as PageType)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-xl transition-colors',
                currentPage === item.id
                  ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              )}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Profile Side Menu */}
      <ProfileSideMenu
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        isDark={isDark}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as PageType)}
        navItems={navItems}
      />

      {/* Trade Success Modal */}
      <SecurityModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        title="Trade Executed"
        variant="default"
        isDark={isDark}
      >
        {lastTrade && (
          <div className="space-y-4">
            <div className={cn(
              'p-4 rounded-xl text-center',
              lastTrade.type === 'buy' 
                ? isDark ? 'bg-emerald-500/20' : 'bg-emerald-50'
                : isDark ? 'bg-red-500/20' : 'bg-red-50'
            )}>
              <div className={cn(
                'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center',
                lastTrade.type === 'buy' 
                  ? isDark ? 'bg-emerald-500/30' : 'bg-emerald-100'
                  : isDark ? 'bg-red-500/30' : 'bg-red-100'
              )}>
                <svg className={cn(
                  'w-8 h-8',
                  lastTrade.type === 'buy' 
                    ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={cn(
                'text-lg font-bold',
                lastTrade.type === 'buy' 
                  ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                  : isDark ? 'text-red-400' : 'text-red-700'
              )}>
                {lastTrade.type === 'buy' ? 'Purchase' : 'Sale'} Successful!
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Asset</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>{lastTrade.asset}</span>
              </div>
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Amount</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>{lastTrade.amount} {lastTrade.asset}</span>
              </div>
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Total</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>${lastTrade.total.toFixed(2)}</span>
              </div>
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Time</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                  {lastTrade.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <PaymentButton 
              onClick={() => setIsTradeModalOpen(false)}
              className="w-full"
            >
              Done
            </PaymentButton>
          </div>
        )}
      </SecurityModal>

      {/* Custom Styles */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CryptoDashboard;

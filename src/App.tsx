import React, { useState } from 'react'
import { cn } from './lib/utils'

// Import components for showcase
import { TransactionCard } from './components/TransactionCard'
import { BalanceWidget } from './components/BalanceWidget'
import PaymentButton from './components/PaymentButton'
import Chart from './components/ChartComponent'
import CryptoPriceTicker from './components/CryptoPriceTicker'
import SecurityModal from './components/SecurityModal'
import { WatchlistCard } from './components/WatchlistCard'
import { PortfolioDonut } from './components/PortfolioDonut'
import { QuickTradeWidget } from './components/QuickTradeWidget'
import { MarketStats } from './components/MarketStats'
import { AlertsWidget } from './components/AlertsWidget'
import { DownloadSelector } from './components/DownloadSelector'

// Import dashboard page
import CryptoDashboard from './pages/CryptoDashboard'

function App() {
  const [isDark, setIsDark] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'components'>('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const sampleTransactions = [
    {
      id: '1',
      type: 'credit' as const,
      amount: 2500.00,
      currency: 'USD',
      description: 'Salary Deposit',
      category: 'Income',
      merchant: 'TechCorp Inc.',
      date: new Date(),
      status: 'completed' as const,
      balance: 15234.56
    },
    {
      id: '2',
      type: 'debit' as const,
      amount: 125.50,
      currency: 'USD',
      description: 'Coffee Shop',
      category: 'Food & Dining',
      merchant: 'Starbucks',
      date: new Date(Date.now() - 86400000),
      status: 'completed' as const,
      balance: 12734.56
    },
    {
      id: '3',
      type: 'transfer' as const,
      amount: 500.00,
      currency: 'USD',
      description: 'Transfer to Savings',
      category: 'Transfer',
      date: new Date(Date.now() - 172800000),
      status: 'pending' as const,
      balance: 12234.56
    },
  ]

  const chartData = [
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 5100 },
    { label: 'Mar', value: 4800 },
    { label: 'Apr', value: 6200 },
    { label: 'May', value: 5800 },
    { label: 'Jun', value: 7100 },
  ]

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'download', label: 'Download Kit' },
    { id: 'market-stats', label: 'Market Stats' },
    { id: 'balance', label: 'Balance Widget' },
    { id: 'crypto', label: 'Crypto Ticker' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'portfolio', label: 'Portfolio Donut' },
    { id: 'trade', label: 'Quick Trade' },
    { id: 'buttons', label: 'Payment Buttons' },
    { id: 'transactions', label: 'Transaction Cards' },
    { id: 'charts', label: 'Charts' },
    { id: 'alerts', label: 'Alerts Widget' },
    { id: 'modals', label: 'Modals' },
  ]

  const features = [
    { icon: '📦', title: '11 Components', description: 'Production-ready React components' },
    { icon: '🎨', title: 'Dark & Light', description: 'Full theme support included' },
    { icon: '📱', title: 'Responsive', description: 'Mobile-first design approach' },
    { icon: '♿', title: 'Accessible', description: 'WCAG 2.1 AA compliant' },
    { icon: '⚡', title: 'TypeScript', description: 'Full type definitions' },
    { icon: '🔒', title: 'GDPR Ready', description: 'EU compliance patterns' },
  ]

  // Show Dashboard view
  if (currentView === 'dashboard') {
    return (
      <CryptoDashboard onViewComponents={() => setCurrentView('components')} />
    )
  }

  // Components Showcase view
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-emerald-500 to-cyan-400' : 'bg-gradient-to-br from-emerald-600 to-cyan-500'}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Fintech Pro UI Kit
                </h1>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Component Library
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Dashboard Button */}
              <button
                onClick={() => setCurrentView('dashboard')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Live Dashboard
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${isDark ? 'left-9 bg-slate-900' : 'left-1 bg-white'}`}>
                  {isDark ? (
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className={`hidden lg:block w-56 flex-shrink-0 sticky top-24 h-fit`}>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id)
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? isDark
                          ? 'bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-400'
                          : 'bg-emerald-50 text-emerald-600 border-l-2 border-emerald-600'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* View Dashboard CTA */}
            <div className="mt-8 p-4 rounded-xl border bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
              <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                See components in action
              </p>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Live Dashboard
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 space-y-16">
            
            {/* Hero Section */}
            <section id="hero" className="scroll-mt-24">
              <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      v2.0.0
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      React + TypeScript
                    </span>
                  </div>
                  
                  <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Fintech Pro
                    <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      UI Component Kit
                    </span>
                  </h1>
                  
                  <p className={`text-lg max-w-2xl mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Production-ready React components for building modern fintech applications. 
                    Includes 11 premium components with dark mode, TypeScript, and Tailwind CSS.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 text-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>View Live Dashboard</span>
                    </button>
                    
                    <button
                      onClick={() => document.getElementById('balance')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 ${
                        isDark 
                          ? 'border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50' 
                          : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Browse Components</span>
                    </button>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {features.map((feature, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                          isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-lg'
                        } border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Download Section */}
            <section id="download" className="scroll-mt-24">
              <SectionHeader 
                title="Download UI Kit" 
                description="Get the full package in your preferred format - React or Vue.js."
                isDark={isDark}
              />
              <div className="mt-8 max-w-2xl">
                <DownloadSelector 
                  isDark={isDark} 
                  onDownloadComplete={(format) => {
                    console.log(`Downloaded: ${format}`)
                  }}
                />
              </div>
            </section>

            {/* Market Stats Section */}
            <section id="market-stats" className="scroll-mt-24">
              <SectionHeader 
                title="Market Stats" 
                description="Global market overview with key metrics and indicators."
                isDark={isDark}
              />
              <div className="mt-8">
                <MarketStats isDark={isDark} />
              </div>
            </section>

            {/* Balance Widget Section */}
            <section id="balance" className="scroll-mt-24">
              <SectionHeader 
                title="Balance Widget" 
                description="Display account balances with trend indicators and multiple variants."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <ComponentCard title="Default" isDark={isDark}>
                  <BalanceWidget
                    balance={12345.67}
                    currency="USD"
                    label="Total Balance"
                    trend="up"
                    trendValue={245.50}
                    trendPeriod="vs last month"
                    className={isDark ? 'bg-slate-800 border-slate-700 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
                  />
                </ComponentCard>
                
                <ComponentCard title="Outline Variant" isDark={isDark}>
                  <BalanceWidget
                    balance={8921.33}
                    currency="EUR"
                    label="Euro Account"
                    trend="down"
                    trendValue={120.00}
                    variant="outline"
                    className={isDark ? 'bg-slate-800/50 border-slate-600 [&_*]:text-slate-100 [&_label]:text-slate-400 hover:bg-slate-800' : ''}
                  />
                </ComponentCard>
                
                <ComponentCard title="Ghost Variant (Loading)" isDark={isDark}>
                  <BalanceWidget
                    balance={0}
                    isLoading={true}
                    variant="ghost"
                    className={isDark ? 'bg-slate-800/30 border-slate-700 [&_div]:bg-slate-700' : ''}
                  />
                </ComponentCard>
              </div>
            </section>

            {/* Crypto Ticker Section */}
            <section id="crypto" className="scroll-mt-24">
              <SectionHeader 
                title="Crypto Price Ticker" 
                description="Real-time cryptocurrency price display with live updates."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <ComponentCard title="Default Tickers" isDark={isDark}>
                  <div className="space-y-3">
                    <CryptoPriceTicker symbol="BTC" name="Bitcoin" initialPrice={67500} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                    <CryptoPriceTicker symbol="ETH" name="Ethereum" initialPrice={3200} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                    <CryptoPriceTicker symbol="SOL" name="Solana" initialPrice={180} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Size Variants" isDark={isDark}>
                  <div className="space-y-3">
                    <CryptoPriceTicker symbol="ADA" name="Cardano" size="sm" initialPrice={0.45} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                    <CryptoPriceTicker symbol="DOT" name="Polkadot" size="md" initialPrice={7.50} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                    <CryptoPriceTicker symbol="AVAX" name="Avalanche" size="lg" initialPrice={35} className={isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white [&_span]:text-white [&_div]:text-white' : ''} />
                  </div>
                </ComponentCard>
              </div>
            </section>

            {/* Watchlist Section */}
            <section id="watchlist" className="scroll-mt-24">
              <SectionHeader 
                title="Watchlist Card" 
                description="Track your favorite assets with real-time price updates and sparklines."
                isDark={isDark}
              />
              <div className="mt-8">
                <WatchlistCard isDark={isDark} />
              </div>
            </section>

            {/* Portfolio Donut Section */}
            <section id="portfolio" className="scroll-mt-24">
              <SectionHeader 
                title="Portfolio Donut" 
                description="Visualize portfolio allocation with interactive donut chart."
                isDark={isDark}
              />
              <div className="mt-8 max-w-md">
                <PortfolioDonut isDark={isDark} />
              </div>
            </section>

            {/* Quick Trade Section */}
            <section id="trade" className="scroll-mt-24">
              <SectionHeader 
                title="Quick Trade Widget" 
                description="Execute buy/sell orders with instant market execution."
                isDark={isDark}
              />
              <div className="mt-8 max-w-md">
                <QuickTradeWidget isDark={isDark} onTrade={(data) => alert(`Trade executed: ${data.type} ${data.amount} ${data.asset}`)} />
              </div>
            </section>

            {/* Payment Buttons Section */}
            <section id="buttons" className="scroll-mt-24">
              <SectionHeader 
                title="Payment Buttons" 
                description="Secure payment buttons with loading states and multiple variants."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <ComponentCard title="Variants" isDark={isDark}>
                  <div className="space-y-3">
                    <PaymentButton>Pay Now</PaymentButton>
                    <PaymentButton variant="outline">Pay with Card</PaymentButton>
                    <PaymentButton variant="ghost">Cancel Payment</PaymentButton>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Sizes" isDark={isDark}>
                  <div className="space-y-3">
                    <PaymentButton size="sm">Small Button</PaymentButton>
                    <PaymentButton size="md">Medium Button</PaymentButton>
                    <PaymentButton size="lg">Large Button</PaymentButton>
                  </div>
                </ComponentCard>
                
                <ComponentCard title="States" isDark={isDark}>
                  <div className="space-y-3">
                    <PaymentButton isLoading>Processing...</PaymentButton>
                    <PaymentButton disabled>Disabled</PaymentButton>
                    <PaymentButton isSecure={false}>No Security Badge</PaymentButton>
                  </div>
                </ComponentCard>
              </div>
            </section>

            {/* Transaction Cards Section */}
            <section id="transactions" className="scroll-mt-24">
              <SectionHeader 
                title="Transaction Cards" 
                description="Display transaction history with different states and formats."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <ComponentCard title="Transaction Types" isDark={isDark}>
                  <div className="space-y-3">
                    {sampleTransactions.map((tx) => (
                      <TransactionCard
                        key={tx.id}
                        transaction={tx}
                        onTransactionClick={(t) => alert(`Clicked: ${t.description}`)}
                        className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                      />
                    ))}
                  </div>
                </ComponentCard>
                
                <ComponentCard title="Size Variants" isDark={isDark}>
                  <div className="space-y-3">
                    <TransactionCard
                      transaction={sampleTransactions[0]}
                      size="sm"
                      className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                    />
                    <TransactionCard
                      transaction={sampleTransactions[1]}
                      size="md"
                      className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                    />
                    <TransactionCard
                      transaction={sampleTransactions[0]}
                      size="lg"
                      showBalance
                      className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                    />
                  </div>
                </ComponentCard>
              </div>
            </section>

            {/* Charts Section */}
            <section id="charts" className="scroll-mt-24">
              <SectionHeader 
                title="Chart Components" 
                description="Data visualization components for financial analytics."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <ComponentCard title="Line Chart" isDark={isDark} fullWidth>
                  <Chart
                    data={chartData}
                    type="line"
                    title="Portfolio Growth"
                    subtitle="Last 6 months performance"
                    className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                  />
                </ComponentCard>
                
                <ComponentCard title="Bar Chart" isDark={isDark} fullWidth>
                  <Chart
                    data={chartData}
                    type="bar"
                    title="Monthly Expenses"
                    subtitle="Spending breakdown"
                    className={isDark ? 'bg-slate-800 border-slate-700 [&_h3]:text-white [&_p]:text-slate-400 [&_span]:text-slate-400' : ''}
                  />
                </ComponentCard>
              </div>
            </section>

            {/* Alerts Section */}
            <section id="alerts" className="scroll-mt-24">
              <SectionHeader 
                title="Alerts Widget" 
                description="Notification center for price alerts, transactions, and security updates."
                isDark={isDark}
              />
              <div className="mt-8 max-w-lg">
                <AlertsWidget isDark={isDark} />
              </div>
            </section>

            {/* Modals Section */}
            <section id="modals" className="scroll-mt-24">
              <SectionHeader 
                title="Security Modals" 
                description="Secure modal dialogs for sensitive operations."
                isDark={isDark}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <ModalTriggerCard 
                  title="Default Modal"
                  description="Standard security modal"
                  isDark={isDark}
                  modalProps={{
                    title: "Security Verification",
                    children: (
                      <div className="space-y-4">
                        <p>Please verify your identity to continue with this transaction.</p>
                        <div className="p-4 bg-slate-100 rounded-lg">
                          <p className="text-sm font-medium text-slate-700">Transaction Details</p>
                          <p className="text-2xl font-bold text-slate-900 mt-1">$1,250.00</p>
                        </div>
                      </div>
                    )
                  }}
                />
                
                <ModalTriggerCard 
                  title="Outline Modal"
                  description="With outline styling"
                  isDark={isDark}
                  modalProps={{
                    title: "Confirm Payment",
                    variant: "outline",
                    children: (
                      <div className="space-y-4">
                        <p>You are about to send a payment. This action cannot be undone.</p>
                        <div className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">Payment to John Doe</p>
                            <p className="text-sm text-slate-600">Ending in •••• 4242</p>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                />
                
                <ModalTriggerCard 
                  title="Large Modal"
                  description="Extended content modal"
                  isDark={isDark}
                  modalProps={{
                    title: "Terms & Conditions",
                    size: "lg",
                    variant: "ghost",
                    children: (
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        <p>By proceeding with this transaction, you agree to the following terms:</p>
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                          <li>All transactions are final and cannot be reversed</li>
                          <li>You confirm that you are the authorized account holder</li>
                          <li>Standard processing fees may apply</li>
                          <li>Transactions are encrypted with 256-bit SSL</li>
                          <li>Your data is protected under GDPR regulations</li>
                        </ul>
                      </div>
                    )
                  }}
                />
              </div>
            </section>

            {/* Footer CTA */}
            <section className="scroll-mt-24">
              <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 text-center ${isDark ? 'bg-gradient-to-br from-emerald-900/50 via-slate-900 to-cyan-900/50' : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50'} border ${isDark ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h2 className={`text-3xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Ready to Build Your Crypto App?
                  </h2>
                  <p className={`text-lg max-w-xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    See all components working together in our interactive crypto dashboard demo.
                  </p>
                  
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Launch Live Dashboard</span>
                  </button>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Main Security Modal */}
      <SecurityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Secure Payment"
        isDark={isDark}
      >
        <div className="space-y-4">
          <p className={isDark ? 'text-slate-300' : 'text-gray-700'}>Your payment is being processed securely. All transactions are encrypted and protected.</p>
          <div className={cn(
            'p-4 border rounded-lg',
            isDark ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-green-50 border-green-200'
          )}>
            <div className={cn('flex items-center gap-2', isDark ? 'text-emerald-400' : 'text-green-700')}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Transaction Verified</span>
            </div>
          </div>
        </div>
      </SecurityModal>
    </div>
  )
}

// Section Header Component
function SectionHeader({ title, description, isDark }: { title: string; description: string; isDark: boolean }) {
  return (
    <div className="border-b pb-4 mb-4" style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}>
      <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  )
}

// Component Card Wrapper
function ComponentCard({ 
  title, 
  children, 
  isDark, 
  fullWidth = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  isDark: boolean; 
  fullWidth?: boolean 
}) {
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {title}
      </h3>
      <div className={fullWidth ? '' : ''}>
        {children}
      </div>
    </div>
  )
}

// Modal Trigger Card Component
function ModalTriggerCard({ 
  title, 
  description, 
  isDark, 
  modalProps 
}: { 
  title: string; 
  description: string; 
  isDark: boolean; 
  modalProps: { 
    title: string; 
    variant?: 'default' | 'outline' | 'ghost'; 
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode 
  } 
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={`rounded-2xl border p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
          isDark 
            ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/50' 
            : 'bg-white border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
          <svg className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
        <p className={`text-xs mt-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Click to preview →</p>
      </div>
      
      <SecurityModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalProps.title}
        variant={modalProps.variant}
        size={modalProps.size}
        isDark={isDark}
      >
        {modalProps.children}
      </SecurityModal>
    </>
  )
}

export default App

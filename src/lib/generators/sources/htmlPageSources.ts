// HTML Page Sources

export const DASHBOARD_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Fintech Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>
  <!-- Header -->
  <header class="dashboard-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">⚡</div>
        <div class="logo-text">
          <span class="logo-name">Fintech Pro</span>
          <span class="logo-status">● Live</span>
        </div>
      </div>
      <nav class="header-nav">
        <a href="dashboard.html" class="nav-link active">Dashboard</a>
        <a href="markets.html" class="nav-link">Markets</a>
        <a href="trade.html" class="nav-link">Trade</a>
        <a href="wallet.html" class="nav-link">Wallet</a>
        <a href="history.html" class="nav-link">History</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn">🔔</button>
        <div class="user-avatar">A</div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="dashboard-main">
    <!-- Welcome Banner -->
    <section class="welcome-banner">
      <div class="welcome-content">
        <p class="welcome-greeting">Good morning, Alex 👋</p>
        <h1 class="welcome-title">Your portfolio is up <span class="text-success">+4.52%</span> today</h1>
      </div>
      <div class="welcome-actions">
        <button class="btn btn-outline">↑ Deposit</button>
        <button class="btn btn-primary">↔ Trade</button>
      </div>
    </section>

    <!-- Market Stats -->
    <section class="market-stats">
      <div class="stat-card">
        <div class="stat-icon green">📈</div>
        <div class="stat-info">
          <div class="stat-value">$2.14T</div>
          <div class="stat-label">Market Cap</div>
        </div>
        <div class="stat-change up">+2.4%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">💹</div>
        <div class="stat-info">
          <div class="stat-value">$89.2B</div>
          <div class="stat-label">24h Volume</div>
        </div>
        <div class="stat-change up">+5.1%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">₿</div>
        <div class="stat-info">
          <div class="stat-value">52.4%</div>
          <div class="stat-label">BTC Dominance</div>
        </div>
        <div class="stat-change down">-0.3%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">🔥</div>
        <div class="stat-info">
          <div class="stat-value">76</div>
          <div class="stat-label">Fear & Greed</div>
        </div>
        <div class="stat-badge">Greed</div>
      </div>
    </section>

    <!-- Crypto Tickers -->
    <section class="ticker-row">
      <div class="crypto-ticker">
        <div class="ticker-icon btc">₿</div>
        <div class="ticker-info"><div class="ticker-name">Bitcoin</div><div class="ticker-code">BTC</div></div>
        <div class="ticker-price"><div class="ticker-current">$67,542</div><div class="ticker-change up">+2.45%</div></div>
      </div>
      <div class="crypto-ticker">
        <div class="ticker-icon eth">Ξ</div>
        <div class="ticker-info"><div class="ticker-name">Ethereum</div><div class="ticker-code">ETH</div></div>
        <div class="ticker-price"><div class="ticker-current">$3,245</div><div class="ticker-change up">+1.82%</div></div>
      </div>
      <div class="crypto-ticker">
        <div class="ticker-icon sol">◎</div>
        <div class="ticker-info"><div class="ticker-name">Solana</div><div class="ticker-code">SOL</div></div>
        <div class="ticker-price"><div class="ticker-current">$178</div><div class="ticker-change down">-0.54%</div></div>
      </div>
    </section>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <!-- Left Column -->
      <div class="grid-main">
        <!-- Chart -->
        <div class="chart-card">
          <div class="chart-header">
            <div><h3>Portfolio Performance</h3><p class="text-muted">Track your growth</p></div>
            <div class="time-tabs">
              <button class="time-tab">1D</button>
              <button class="time-tab">1W</button>
              <button class="time-tab active">1M</button>
              <button class="time-tab">1Y</button>
            </div>
          </div>
          <div class="chart-area">
            <svg viewBox="0 0 400 150" class="chart-svg">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3"/>
                  <stop offset="100%" style="stop-color:#10b981;stop-opacity:0"/>
                </linearGradient>
              </defs>
              <path d="M0 120 L66 90 L132 110 L198 70 L264 50 L330 30 L400 50 L400 150 L0 150 Z" fill="url(#grad)"/>
              <path d="M0 120 L66 90 L132 110 L198 70 L264 50 L330 30 L400 50" stroke="#10b981" stroke-width="2" fill="none"/>
            </svg>
          </div>
        </div>

        <!-- Balance Cards -->
        <div class="balance-row">
          <div class="balance-widget">
            <span class="balance-label">Total Portfolio</span>
            <div class="balance-amount">$100,000.00</div>
            <span class="balance-trend up">+$4,520 today</span>
          </div>
          <div class="balance-widget">
            <span class="balance-label">Available</span>
            <div class="balance-amount">$45,230.00</div>
            <span class="balance-subtitle">Ready to trade</span>
          </div>
          <div class="balance-widget">
            <span class="balance-label">In Positions</span>
            <div class="balance-amount">$54,770.00</div>
            <span class="balance-trend up">+$2,340 24h</span>
          </div>
        </div>

        <!-- Watchlist -->
        <div class="watchlist-card">
          <div class="watchlist-header"><h3>Watchlist</h3><button class="btn-small">+ Add</button></div>
          <div class="watchlist-items">
            <div class="watchlist-item">
              <div class="item-icon btc">₿</div>
              <div class="item-info"><div class="item-name">Bitcoin</div><div class="item-symbol">BTC</div></div>
              <div class="mini-chart"><svg width="60" height="24"><path d="M0 20 L15 12 L30 16 L45 8 L60 10" stroke="#10b981" stroke-width="2" fill="none"/></svg></div>
              <div class="item-price"><div class="price-value">$67,542</div><div class="price-change up">+2.45%</div></div>
            </div>
            <div class="watchlist-item">
              <div class="item-icon eth">Ξ</div>
              <div class="item-info"><div class="item-name">Ethereum</div><div class="item-symbol">ETH</div></div>
              <div class="mini-chart"><svg width="60" height="24"><path d="M0 12 L15 8 L30 14 L45 6 L60 9" stroke="#10b981" stroke-width="2" fill="none"/></svg></div>
              <div class="item-price"><div class="price-value">$3,245</div><div class="price-change up">+1.82%</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="grid-sidebar">
        <!-- Quick Trade -->
        <div class="quick-trade">
          <div class="trade-tabs"><button class="trade-tab active">Buy</button><button class="trade-tab">Sell</button></div>
          <div class="trade-form">
            <div class="form-group">
              <label>Select Asset</label>
              <div class="asset-select"><span class="asset-icon">₿</span><span class="asset-name">BTC</span><span class="asset-price">$67,542</span></div>
            </div>
            <div class="form-group">
              <label>Amount (BTC)</label>
              <input type="number" class="trade-input" placeholder="0.00">
            </div>
            <button class="trade-submit">Buy BTC</button>
          </div>
        </div>

        <!-- Portfolio Donut -->
        <div class="portfolio-donut">
          <h3>Allocation</h3>
          <div class="donut-visual">
            <svg viewBox="0 0 100 100" width="120" height="120">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" stroke-width="10"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f7931a" stroke-width="10" stroke-dasharray="100 152" transform="rotate(-90 50 50)"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#627eea" stroke-width="10" stroke-dasharray="63 189" stroke-dashoffset="-100" transform="rotate(-90 50 50)"/>
            </svg>
            <div class="donut-center"><span class="donut-total">$100K</span></div>
          </div>
          <div class="donut-legend">
            <span><i class="dot btc"></i>BTC 40%</span>
            <span><i class="dot eth"></i>ETH 25%</span>
            <span><i class="dot other"></i>Other 35%</span>
          </div>
        </div>

        <!-- Alerts -->
        <div class="alerts-widget">
          <div class="alerts-header"><h3>Notifications</h3><button class="btn-link">Mark read</button></div>
          <div class="alert-item"><div class="alert-icon">📊</div><div class="alert-content"><strong>BTC Alert</strong><p>Crossed $68,000</p></div></div>
          <div class="alert-item"><div class="alert-icon">✓</div><div class="alert-content"><strong>Deposit OK</strong><p>0.5 ETH confirmed</p></div></div>
        </div>
      </div>
    </div>
  </main>

  <!-- Mobile Nav -->
  <nav class="mobile-nav">
    <a href="dashboard.html" class="mobile-nav-item active">🏠 Dashboard</a>
    <a href="markets.html" class="mobile-nav-item">📈 Markets</a>
    <a href="trade.html" class="mobile-nav-item">↔ Trade</a>
    <a href="wallet.html" class="mobile-nav-item">💰 Wallet</a>
    <a href="history.html" class="mobile-nav-item">📋 History</a>
  </nav>

  <script src="../js/main.js"></script>
</body>
</html>`;

export const WALLET_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallet - Fintech Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="logo"><div class="logo-icon">⚡</div><span class="logo-name">Fintech Pro</span></div>
      <nav class="header-nav">
        <a href="dashboard.html" class="nav-link">Dashboard</a>
        <a href="markets.html" class="nav-link">Markets</a>
        <a href="trade.html" class="nav-link">Trade</a>
        <a href="wallet.html" class="nav-link active">Wallet</a>
        <a href="history.html" class="nav-link">History</a>
      </nav>
    </div>
  </header>

  <main class="page-main">
    <div class="page-header">
      <h1>Wallet</h1>
      <p class="text-muted">Manage your crypto assets</p>
    </div>

    <div class="wallet-grid">
      <!-- Total Balance Card -->
      <div class="wallet-balance-card">
        <div class="balance-header">
          <span>Total Balance</span>
          <button class="btn-icon">👁</button>
        </div>
        <div class="balance-amount large">$100,000.00</div>
        <div class="balance-change up">+$4,520.00 (+4.52%) today</div>
        <div class="balance-actions">
          <button class="btn btn-primary">↑ Deposit</button>
          <button class="btn btn-outline">↓ Withdraw</button>
          <button class="btn btn-outline">↔ Transfer</button>
        </div>
      </div>

      <!-- Assets List -->
      <div class="assets-card">
        <div class="card-header">
          <h3>Your Assets</h3>
          <input type="search" class="search-input" placeholder="Search assets...">
        </div>
        <div class="assets-list">
          <div class="asset-row">
            <div class="asset-info">
              <div class="asset-icon btc">₿</div>
              <div><div class="asset-name">Bitcoin</div><div class="asset-symbol">BTC</div></div>
            </div>
            <div class="asset-balance">
              <div class="balance-crypto">1.5234 BTC</div>
              <div class="balance-fiat">$102,853.42</div>
            </div>
            <div class="asset-change up">+2.45%</div>
            <div class="asset-actions">
              <button class="btn-small">Send</button>
              <button class="btn-small">Receive</button>
            </div>
          </div>
          <div class="asset-row">
            <div class="asset-info">
              <div class="asset-icon eth">Ξ</div>
              <div><div class="asset-name">Ethereum</div><div class="asset-symbol">ETH</div></div>
            </div>
            <div class="asset-balance">
              <div class="balance-crypto">12.5 ETH</div>
              <div class="balance-fiat">$40,562.50</div>
            </div>
            <div class="asset-change up">+1.82%</div>
            <div class="asset-actions">
              <button class="btn-small">Send</button>
              <button class="btn-small">Receive</button>
            </div>
          </div>
          <div class="asset-row">
            <div class="asset-info">
              <div class="asset-icon sol">◎</div>
              <div><div class="asset-name">Solana</div><div class="asset-symbol">SOL</div></div>
            </div>
            <div class="asset-balance">
              <div class="balance-crypto">85 SOL</div>
              <div class="balance-fiat">$15,130.00</div>
            </div>
            <div class="asset-change down">-0.54%</div>
            <div class="asset-actions">
              <button class="btn-small">Send</button>
              <button class="btn-small">Receive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <nav class="mobile-nav">
    <a href="dashboard.html" class="mobile-nav-item">🏠</a>
    <a href="markets.html" class="mobile-nav-item">📈</a>
    <a href="trade.html" class="mobile-nav-item">↔</a>
    <a href="wallet.html" class="mobile-nav-item active">💰</a>
    <a href="history.html" class="mobile-nav-item">📋</a>
  </nav>
</body>
</html>`;

export const TRADE_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trade - Fintech Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="logo"><div class="logo-icon">⚡</div><span class="logo-name">Fintech Pro</span></div>
      <nav class="header-nav">
        <a href="dashboard.html" class="nav-link">Dashboard</a>
        <a href="markets.html" class="nav-link">Markets</a>
        <a href="trade.html" class="nav-link active">Trade</a>
        <a href="wallet.html" class="nav-link">Wallet</a>
        <a href="history.html" class="nav-link">History</a>
      </nav>
    </div>
  </header>

  <main class="page-main">
    <div class="trade-layout">
      <!-- Chart Section -->
      <div class="trade-chart-section">
        <div class="pair-header">
          <div class="pair-info">
            <span class="pair-icon">₿</span>
            <div>
              <div class="pair-name">BTC/USD</div>
              <div class="pair-price">$67,542.30 <span class="up">+2.45%</span></div>
            </div>
          </div>
          <div class="pair-stats">
            <div class="stat"><span class="label">24h High</span><span class="value">$68,200</span></div>
            <div class="stat"><span class="label">24h Low</span><span class="value">$65,800</span></div>
            <div class="stat"><span class="label">24h Vol</span><span class="value">$2.1B</span></div>
          </div>
        </div>
        <div class="chart-container large">
          <svg viewBox="0 0 600 300" class="chart-svg">
            <defs>
              <linearGradient id="tradeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2"/>
                <stop offset="100%" style="stop-color:#10b981;stop-opacity:0"/>
              </linearGradient>
            </defs>
            <path d="M0 200 L100 180 L200 220 L300 150 L400 100 L500 80 L600 120 L600 300 L0 300 Z" fill="url(#tradeGrad)"/>
            <path d="M0 200 L100 180 L200 220 L300 150 L400 100 L500 80 L600 120" stroke="#10b981" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>

      <!-- Trade Form Section -->
      <div class="trade-form-section">
        <div class="quick-trade large">
          <div class="trade-tabs">
            <button class="trade-tab active buy">Buy</button>
            <button class="trade-tab sell">Sell</button>
          </div>
          <div class="trade-form">
            <div class="form-group">
              <label>Order Type</label>
              <select class="trade-select">
                <option>Market Order</option>
                <option>Limit Order</option>
                <option>Stop Limit</option>
              </select>
            </div>
            <div class="form-group">
              <label>Amount (BTC)</label>
              <input type="number" class="trade-input" placeholder="0.00">
              <div class="quick-amounts">
                <button class="quick-btn">25%</button>
                <button class="quick-btn">50%</button>
                <button class="quick-btn">75%</button>
                <button class="quick-btn">100%</button>
              </div>
            </div>
            <div class="form-group">
              <label>Total (USD)</label>
              <input type="text" class="trade-input" value="$0.00" readonly>
            </div>
            <div class="trade-summary">
              <div class="summary-row"><span>Available</span><span>$45,230.00 USD</span></div>
              <div class="summary-row"><span>Fee (0.1%)</span><span>$0.00</span></div>
            </div>
            <button class="trade-submit buy">Buy BTC</button>
          </div>
        </div>

        <!-- Order Book -->
        <div class="order-book">
          <div class="orderbook-header"><h3>Order Book</h3></div>
          <div class="orderbook-content">
            <div class="orderbook-row"><span class="price ask">68,245</span><span class="amount">0.523</span><span class="total">35.7K</span></div>
            <div class="orderbook-row"><span class="price ask">68,220</span><span class="amount">1.234</span><span class="total">84.2K</span></div>
            <div class="orderbook-row"><span class="price ask">68,200</span><span class="amount">0.850</span><span class="total">58.0K</span></div>
            <div class="orderbook-spread"><span class="spread-price">68,150</span><span>Spread</span></div>
            <div class="orderbook-row"><span class="price bid">68,100</span><span class="amount">0.920</span><span class="total">62.7K</span></div>
            <div class="orderbook-row"><span class="price bid">68,050</span><span class="amount">1.560</span><span class="total">106K</span></div>
            <div class="orderbook-row"><span class="price bid">68,000</span><span class="amount">2.100</span><span class="total">143K</span></div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <nav class="mobile-nav">
    <a href="dashboard.html" class="mobile-nav-item">🏠</a>
    <a href="markets.html" class="mobile-nav-item">📈</a>
    <a href="trade.html" class="mobile-nav-item active">↔</a>
    <a href="wallet.html" class="mobile-nav-item">💰</a>
    <a href="history.html" class="mobile-nav-item">📋</a>
  </nav>
</body>
</html>`;

export const MARKETS_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markets - Fintech Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="logo"><div class="logo-icon">⚡</div><span class="logo-name">Fintech Pro</span></div>
      <nav class="header-nav">
        <a href="dashboard.html" class="nav-link">Dashboard</a>
        <a href="markets.html" class="nav-link active">Markets</a>
        <a href="trade.html" class="nav-link">Trade</a>
        <a href="wallet.html" class="nav-link">Wallet</a>
        <a href="history.html" class="nav-link">History</a>
      </nav>
    </div>
  </header>

  <main class="page-main">
    <div class="page-header">
      <h1>Markets</h1>
      <div class="header-controls">
        <input type="search" class="search-input" placeholder="Search markets...">
        <div class="filter-tabs">
          <button class="filter-tab active">All</button>
          <button class="filter-tab">Favorites</button>
          <button class="filter-tab">Gainers</button>
          <button class="filter-tab">Losers</button>
        </div>
      </div>
    </div>

    <div class="markets-table">
      <div class="table-header">
        <span class="col-rank">#</span>
        <span class="col-name">Name</span>
        <span class="col-price">Price</span>
        <span class="col-change">24h %</span>
        <span class="col-volume">Volume</span>
        <span class="col-cap">Market Cap</span>
        <span class="col-chart">7d Chart</span>
        <span class="col-action"></span>
      </div>
      <div class="table-row">
        <span class="col-rank">1</span>
        <span class="col-name"><span class="coin-icon btc">₿</span><span class="coin-info"><strong>Bitcoin</strong><small>BTC</small></span></span>
        <span class="col-price">$67,542.30</span>
        <span class="col-change up">+2.45%</span>
        <span class="col-volume">$28.5B</span>
        <span class="col-cap">$1.32T</span>
        <span class="col-chart"><svg width="80" height="30"><path d="M0 25 L20 18 L40 22 L60 12 L80 15" stroke="#10b981" stroke-width="2" fill="none"/></svg></span>
        <span class="col-action"><button class="btn-small">Trade</button></span>
      </div>
      <div class="table-row">
        <span class="col-rank">2</span>
        <span class="col-name"><span class="coin-icon eth">Ξ</span><span class="coin-info"><strong>Ethereum</strong><small>ETH</small></span></span>
        <span class="col-price">$3,245.80</span>
        <span class="col-change up">+1.82%</span>
        <span class="col-volume">$15.2B</span>
        <span class="col-cap">$390B</span>
        <span class="col-chart"><svg width="80" height="30"><path d="M0 20 L20 15 L40 22 L60 10 L80 12" stroke="#10b981" stroke-width="2" fill="none"/></svg></span>
        <span class="col-action"><button class="btn-small">Trade</button></span>
      </div>
      <div class="table-row">
        <span class="col-rank">3</span>
        <span class="col-name"><span class="coin-icon sol">◎</span><span class="coin-info"><strong>Solana</strong><small>SOL</small></span></span>
        <span class="col-price">$178.45</span>
        <span class="col-change down">-0.54%</span>
        <span class="col-volume">$3.8B</span>
        <span class="col-cap">$82B</span>
        <span class="col-chart"><svg width="80" height="30"><path d="M0 15 L20 20 L40 12 L60 25 L80 22" stroke="#ef4444" stroke-width="2" fill="none"/></svg></span>
        <span class="col-action"><button class="btn-small">Trade</button></span>
      </div>
      <div class="table-row">
        <span class="col-rank">4</span>
        <span class="col-name"><span class="coin-icon xrp">✕</span><span class="coin-info"><strong>XRP</strong><small>XRP</small></span></span>
        <span class="col-price">$0.62</span>
        <span class="col-change up">+3.21%</span>
        <span class="col-volume">$2.1B</span>
        <span class="col-cap">$34B</span>
        <span class="col-chart"><svg width="80" height="30"><path d="M0 22 L20 18 L40 15 L60 10 L80 8" stroke="#10b981" stroke-width="2" fill="none"/></svg></span>
        <span class="col-action"><button class="btn-small">Trade</button></span>
      </div>
    </div>
  </main>

  <nav class="mobile-nav">
    <a href="dashboard.html" class="mobile-nav-item">🏠</a>
    <a href="markets.html" class="mobile-nav-item active">📈</a>
    <a href="trade.html" class="mobile-nav-item">↔</a>
    <a href="wallet.html" class="mobile-nav-item">💰</a>
    <a href="history.html" class="mobile-nav-item">📋</a>
  </nav>
</body>
</html>`;

export const HISTORY_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>History - Fintech Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="logo"><div class="logo-icon">⚡</div><span class="logo-name">Fintech Pro</span></div>
      <nav class="header-nav">
        <a href="dashboard.html" class="nav-link">Dashboard</a>
        <a href="markets.html" class="nav-link">Markets</a>
        <a href="trade.html" class="nav-link">Trade</a>
        <a href="wallet.html" class="nav-link">Wallet</a>
        <a href="history.html" class="nav-link active">History</a>
      </nav>
    </div>
  </header>

  <main class="page-main">
    <div class="page-header">
      <h1>Transaction History</h1>
      <div class="header-controls">
        <select class="filter-select"><option>All Types</option><option>Trades</option><option>Deposits</option><option>Withdrawals</option></select>
        <select class="filter-select"><option>All Assets</option><option>BTC</option><option>ETH</option><option>SOL</option></select>
        <button class="btn btn-outline">Export CSV</button>
      </div>
    </div>

    <div class="history-list">
      <div class="history-item">
        <div class="history-icon buy">↑</div>
        <div class="history-details">
          <div class="history-title">Buy BTC</div>
          <div class="history-subtitle">Market Order • Completed</div>
        </div>
        <div class="history-amount">
          <div class="amount-crypto">+0.05234 BTC</div>
          <div class="amount-fiat">-$3,534.20 USD</div>
        </div>
        <div class="history-meta">
          <div class="history-date">Today, 10:24 AM</div>
          <div class="history-status completed">Completed</div>
        </div>
      </div>

      <div class="history-item">
        <div class="history-icon deposit">↓</div>
        <div class="history-details">
          <div class="history-title">Deposit USD</div>
          <div class="history-subtitle">Bank Transfer • Chase ****4521</div>
        </div>
        <div class="history-amount">
          <div class="amount-fiat positive">+$5,000.00 USD</div>
        </div>
        <div class="history-meta">
          <div class="history-date">Yesterday, 3:15 PM</div>
          <div class="history-status completed">Completed</div>
        </div>
      </div>

      <div class="history-item">
        <div class="history-icon sell">↓</div>
        <div class="history-details">
          <div class="history-title">Sell ETH</div>
          <div class="history-subtitle">Limit Order • Filled at $3,280</div>
        </div>
        <div class="history-amount">
          <div class="amount-crypto">-2.5 ETH</div>
          <div class="amount-fiat positive">+$8,200.00 USD</div>
        </div>
        <div class="history-meta">
          <div class="history-date">Nov 25, 2:30 PM</div>
          <div class="history-status completed">Completed</div>
        </div>
      </div>

      <div class="history-item">
        <div class="history-icon withdraw">↑</div>
        <div class="history-details">
          <div class="history-title">Withdraw to Bank</div>
          <div class="history-subtitle">Wire Transfer • Chase ****4521</div>
        </div>
        <div class="history-amount">
          <div class="amount-fiat">-$2,500.00 USD</div>
        </div>
        <div class="history-meta">
          <div class="history-date">Nov 24, 11:00 AM</div>
          <div class="history-status pending">Pending</div>
        </div>
      </div>

      <div class="history-item">
        <div class="history-icon transfer">↔</div>
        <div class="history-details">
          <div class="history-title">Internal Transfer</div>
          <div class="history-subtitle">To Savings Wallet</div>
        </div>
        <div class="history-amount">
          <div class="amount-crypto">-1.5 ETH</div>
        </div>
        <div class="history-meta">
          <div class="history-date">Nov 23, 9:45 AM</div>
          <div class="history-status completed">Completed</div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="page-btn" disabled>← Previous</button>
      <span class="page-info">Page 1 of 10</span>
      <button class="page-btn">Next →</button>
    </div>
  </main>

  <nav class="mobile-nav">
    <a href="dashboard.html" class="mobile-nav-item">🏠</a>
    <a href="markets.html" class="mobile-nav-item">📈</a>
    <a href="trade.html" class="mobile-nav-item">↔</a>
    <a href="wallet.html" class="mobile-nav-item">💰</a>
    <a href="history.html" class="mobile-nav-item active">📋</a>
  </nav>
</body>
</html>`;


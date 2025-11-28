// HTML Styles Sources

export const COMPONENTS_CSS = `/* Fintech Pro - Component Styles */

/* Header */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #334155;
}
.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.logo-name {
  font-weight: 700;
  color: #f8fafc;
  font-size: 1.125rem;
}
.logo-status {
  font-size: 0.75rem;
  color: #10b981;
}
.header-nav {
  display: flex;
  gap: 0.25rem;
}
.nav-link {
  padding: 0.5rem 1rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.nav-link:hover {
  color: #f8fafc;
  background: #334155;
}
.nav-link.active {
  color: #f8fafc;
  background: #1e293b;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.icon-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.icon-btn:hover {
  background: #334155;
}
.user-avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
}

/* Main Content */
.dashboard-main, .page-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}
.page-header {
  margin-bottom: 1.5rem;
}
.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}
.header-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

/* Welcome Banner */
.welcome-banner {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.welcome-greeting {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
}
.welcome-actions {
  display: flex;
  gap: 0.75rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn-primary {
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: white;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}
.btn-outline {
  background: transparent;
  border: 1px solid #334155;
  color: #f8fafc;
}
.btn-outline:hover {
  background: #334155;
}
.btn-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  background: #334155;
  border: none;
  border-radius: 0.375rem;
  color: #f8fafc;
  cursor: pointer;
}
.btn-small:hover {
  background: #475569;
}
.btn-link {
  background: none;
  border: none;
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

/* Market Stats */
.market-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
}
.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.stat-icon.green { background: rgba(16, 185, 129, 0.1); }
.stat-icon.blue { background: rgba(59, 130, 246, 0.1); }
.stat-icon.orange { background: rgba(247, 147, 26, 0.1); }
.stat-icon.purple { background: rgba(168, 85, 247, 0.1); }
.stat-info { flex: 1; }
.stat-value { font-size: 1.125rem; font-weight: 700; color: #f8fafc; }
.stat-label { font-size: 0.75rem; color: #64748b; }
.stat-change { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }
.stat-change.up { color: #10b981; background: rgba(16, 185, 129, 0.1); }
.stat-change.down { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
.stat-badge { font-size: 0.75rem; font-weight: 600; color: #f59e0b; background: rgba(245, 158, 11, 0.1); padding: 0.25rem 0.5rem; border-radius: 0.25rem; }

/* Ticker Row */
.ticker-row {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}
.crypto-ticker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid #475569;
  border-radius: 0.75rem;
  min-width: 200px;
  flex-shrink: 0;
}
.ticker-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
}
.ticker-icon.btc { background: #f7931a; }
.ticker-icon.eth { background: #627eea; }
.ticker-icon.sol { background: #9945ff; }
.ticker-info { flex: 1; }
.ticker-name { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.ticker-code { color: #94a3b8; font-size: 0.75rem; }
.ticker-price { text-align: right; }
.ticker-current { font-weight: 700; color: #f8fafc; }
.ticker-change { font-size: 0.75rem; font-weight: 600; }
.ticker-change.up { color: #10b981; }
.ticker-change.down { color: #ef4444; }

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
}
.grid-main { display: flex; flex-direction: column; gap: 1.5rem; }
.grid-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

/* Chart Card */
.chart-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  padding: 1.25rem;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.chart-header h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; }
.chart-header p { font-size: 0.75rem; color: #64748b; }
.time-tabs { display: flex; gap: 0.25rem; background: #0f172a; padding: 0.25rem; border-radius: 0.5rem; }
.time-tab { padding: 0.375rem 0.75rem; background: none; border: none; color: #64748b; font-size: 0.75rem; font-weight: 600; border-radius: 0.375rem; cursor: pointer; }
.time-tab.active { background: #10b981; color: white; }
.chart-area { position: relative; }
.chart-svg { width: 100%; height: 150px; }

/* Balance Row */
.balance-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.balance-widget {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  padding: 1rem;
}
.balance-label { color: #64748b; font-size: 0.75rem; display: block; margin-bottom: 0.25rem; }
.balance-amount { font-size: 1.25rem; font-weight: 700; color: #f8fafc; }
.balance-amount.large { font-size: 2rem; }
.balance-trend { font-size: 0.75rem; font-weight: 600; }
.balance-trend.up { color: #10b981; }
.balance-subtitle { font-size: 0.75rem; color: #64748b; }
.balance-change { font-size: 0.875rem; color: #10b981; margin-top: 0.5rem; }
.balance-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

/* Watchlist */
.watchlist-card { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.watchlist-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #334155; }
.watchlist-header h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; }
.watchlist-items { padding: 0.5rem; }
.watchlist-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; transition: background 0.2s; }
.watchlist-item:hover { background: #334155; }
.item-icon { width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
.item-icon.btc { background: #f7931a; }
.item-icon.eth { background: #627eea; }
.item-info { flex: 1; }
.item-name { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.item-symbol { color: #64748b; font-size: 0.75rem; }
.mini-chart { width: 60px; }
.item-price { text-align: right; }
.price-value { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.price-change { font-size: 0.75rem; font-weight: 600; }
.price-change.up { color: #10b981; }
.price-change.down { color: #ef4444; }

/* Quick Trade */
.quick-trade { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.trade-tabs { display: flex; border-bottom: 1px solid #334155; }
.trade-tab { flex: 1; padding: 1rem; background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.trade-tab.active { color: #10b981; border-bottom: 2px solid #10b981; }
.trade-tab.active.buy { color: #10b981; border-bottom-color: #10b981; }
.trade-tab.active.sell, .trade-tab.sell:hover { color: #ef4444; }
.trade-form { padding: 1.25rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.5rem; }
.asset-select { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; cursor: pointer; }
.asset-icon { width: 2rem; height: 2rem; background: #f7931a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
.asset-name { font-weight: 600; color: #f8fafc; flex: 1; }
.asset-price { color: #94a3b8; font-size: 0.875rem; }
.trade-input, .trade-select { width: 100%; padding: 0.75rem; background: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; color: #f8fafc; font-size: 1rem; }
.trade-select { cursor: pointer; }
.quick-amounts { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.quick-btn { flex: 1; padding: 0.5rem; background: #334155; border: none; border-radius: 0.375rem; color: #94a3b8; font-size: 0.75rem; cursor: pointer; }
.quick-btn:hover { background: #475569; color: #f8fafc; }
.trade-summary { margin: 1rem 0; padding: 1rem; background: #0f172a; border-radius: 0.5rem; }
.summary-row { display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.5rem; }
.summary-row:last-child { margin-bottom: 0; }
.summary-row span:first-child { color: #64748b; }
.summary-row span:last-child { color: #f8fafc; }
.trade-submit { width: 100%; padding: 1rem; background: linear-gradient(135deg, #10b981, #06b6d4); border: none; border-radius: 0.75rem; color: white; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }
.trade-submit.buy { background: linear-gradient(135deg, #10b981, #06b6d4); }
.trade-submit.sell { background: linear-gradient(135deg, #ef4444, #f97316); }

/* Portfolio Donut */
.portfolio-donut { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; padding: 1.25rem; }
.portfolio-donut h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; margin-bottom: 1rem; }
.donut-visual { position: relative; display: flex; justify-content: center; margin-bottom: 1rem; }
.donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
.donut-total { font-size: 1.25rem; font-weight: 700; color: #f8fafc; }
.donut-legend { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.donut-legend span { display: flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: #94a3b8; }
.dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
.dot.btc { background: #f7931a; }
.dot.eth { background: #627eea; }
.dot.other { background: #10b981; }

/* Alerts Widget */
.alerts-widget { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.alerts-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #334155; }
.alerts-header h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; }
.alert-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem 1.25rem; border-bottom: 1px solid #334155; }
.alert-item:last-child { border-bottom: none; }
.alert-icon { font-size: 1rem; }
.alert-content { flex: 1; }
.alert-content strong { display: block; font-size: 0.875rem; color: #f8fafc; }
.alert-content p { font-size: 0.75rem; color: #64748b; margin-top: 0.125rem; }

/* Mobile Nav */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid #334155;
  padding: 0.5rem;
  z-index: 50;
}
.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.625rem;
  font-weight: 500;
}
.mobile-nav-item.active {
  color: #10b981;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .balance-row { grid-template-columns: 1fr; }
  .header-nav { display: none; }
  .mobile-nav { display: flex; }
  .dashboard-main, .page-main { padding-bottom: 5rem; }
}
@media (max-width: 640px) {
  .welcome-banner { flex-direction: column; align-items: flex-start; }
  .market-stats { grid-template-columns: 1fr 1fr; }
}

/* Additional Page Styles */
.search-input {
  padding: 0.625rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: #f8fafc;
  font-size: 0.875rem;
  min-width: 200px;
}
.filter-tabs { display: flex; gap: 0.25rem; background: #1e293b; padding: 0.25rem; border-radius: 0.5rem; }
.filter-tab { padding: 0.5rem 1rem; background: none; border: none; color: #64748b; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; cursor: pointer; }
.filter-tab.active { background: #334155; color: #f8fafc; }
.filter-select { padding: 0.625rem 1rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: #f8fafc; font-size: 0.875rem; }

/* Wallet Page */
.wallet-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; }
.wallet-balance-card { background: linear-gradient(135deg, #1e293b, #334155); border: 1px solid #475569; border-radius: 1rem; padding: 1.5rem; }
.assets-card { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.card-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #334155; }
.card-header h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; }
.assets-list { padding: 0.5rem; }
.asset-row { display: grid; grid-template-columns: 1fr 1fr auto auto; gap: 1rem; align-items: center; padding: 1rem; border-radius: 0.5rem; }
.asset-row:hover { background: #334155; }
.asset-info { display: flex; align-items: center; gap: 0.75rem; }
.asset-icon { width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
.asset-icon.btc { background: #f7931a; }
.asset-icon.eth { background: #627eea; }
.asset-icon.sol { background: #9945ff; }
.asset-icon.xrp { background: #00aae4; }
.asset-name { font-weight: 600; color: #f8fafc; }
.asset-symbol { font-size: 0.75rem; color: #64748b; }
.balance-crypto { font-weight: 600; color: #f8fafc; }
.balance-fiat { font-size: 0.875rem; color: #64748b; }
.asset-change { font-size: 0.875rem; font-weight: 600; }
.asset-change.up { color: #10b981; }
.asset-change.down { color: #ef4444; }
.asset-actions { display: flex; gap: 0.5rem; }

/* Trade Page */
.trade-layout { display: grid; grid-template-columns: 1fr 400px; gap: 1.5rem; }
.trade-chart-section { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; padding: 1.25rem; }
.pair-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem; }
.pair-info { display: flex; align-items: center; gap: 0.75rem; }
.pair-icon { width: 2.5rem; height: 2.5rem; background: #f7931a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
.pair-name { font-weight: 700; color: #f8fafc; }
.pair-price { font-size: 0.875rem; color: #94a3b8; }
.pair-price .up { color: #10b981; }
.pair-stats { display: flex; gap: 1.5rem; }
.pair-stats .stat { text-align: center; }
.pair-stats .label { font-size: 0.625rem; color: #64748b; display: block; }
.pair-stats .value { font-size: 0.875rem; font-weight: 600; color: #f8fafc; }
.chart-container.large .chart-svg { height: 300px; }
.trade-form-section { display: flex; flex-direction: column; gap: 1.5rem; }

/* Order Book */
.order-book { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.orderbook-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #334155; }
.orderbook-header h3 { font-size: 1rem; font-weight: 600; color: #f8fafc; }
.orderbook-content { padding: 0.75rem; }
.orderbook-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; padding: 0.375rem 0.5rem; font-size: 0.75rem; font-family: monospace; }
.orderbook-row:hover { background: #334155; border-radius: 0.25rem; }
.price { font-weight: 600; }
.price.ask { color: #ef4444; }
.price.bid { color: #10b981; }
.amount { color: #f8fafc; text-align: center; }
.total { color: #64748b; text-align: right; }
.orderbook-spread { display: flex; justify-content: space-between; padding: 0.75rem; background: #0f172a; margin: 0.5rem 0; border-radius: 0.5rem; }
.spread-price { font-weight: 700; color: #f8fafc; }

/* Markets Table */
.markets-table { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.table-header, .table-row { display: grid; grid-template-columns: 50px 2fr 1fr 100px 1fr 1fr 100px 80px; gap: 1rem; padding: 1rem 1.25rem; align-items: center; }
.table-header { background: #0f172a; font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
.table-row { border-bottom: 1px solid #334155; font-size: 0.875rem; }
.table-row:hover { background: #334155; }
.col-rank { color: #64748b; }
.col-name { display: flex; align-items: center; gap: 0.75rem; }
.coin-icon { width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
.coin-icon.btc { background: #f7931a; }
.coin-icon.eth { background: #627eea; }
.coin-icon.sol { background: #9945ff; }
.coin-icon.xrp { background: #00aae4; }
.coin-info strong { display: block; color: #f8fafc; }
.coin-info small { color: #64748b; font-size: 0.75rem; }
.col-price { font-weight: 600; color: #f8fafc; }
.col-change { font-weight: 600; }
.col-change.up { color: #10b981; }
.col-change.down { color: #ef4444; }
.col-volume, .col-cap { color: #94a3b8; }

/* History Page */
.history-list { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; overflow: hidden; }
.history-item { display: grid; grid-template-columns: auto 1fr auto auto; gap: 1rem; padding: 1rem 1.25rem; border-bottom: 1px solid #334155; align-items: center; }
.history-item:hover { background: #334155; }
.history-icon { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.history-icon.buy { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.history-icon.sell { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.history-icon.deposit { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.history-icon.withdraw { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.history-icon.transfer { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
.history-title { font-weight: 600; color: #f8fafc; }
.history-subtitle { font-size: 0.75rem; color: #64748b; }
.amount-crypto { font-weight: 600; color: #f8fafc; }
.amount-fiat { font-size: 0.875rem; color: #64748b; }
.amount-fiat.positive { color: #10b981; }
.history-date { font-size: 0.75rem; color: #64748b; }
.history-status { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }
.history-status.completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.history-status.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1.5rem; }
.page-btn { padding: 0.5rem 1rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: #f8fafc; font-size: 0.875rem; cursor: pointer; }
.page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.page-info { font-size: 0.875rem; color: #64748b; }

@media (max-width: 1024px) {
  .wallet-grid, .trade-layout { grid-template-columns: 1fr; }
  .table-header, .table-row { grid-template-columns: 50px 1fr 1fr 80px; }
  .col-volume, .col-cap, .col-chart { display: none; }
  .history-item { grid-template-columns: auto 1fr auto; }
  .history-meta { display: none; }
}
`;


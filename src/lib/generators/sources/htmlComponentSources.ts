// HTML Component Sources

export const BALANCE_WIDGET_HTML = `<!-- Balance Widget Component -->
<div class="balance-widget">
  <div class="balance-header">
    <span class="balance-label">Total Balance</span>
    <span class="balance-trend up">+4.52%</span>
  </div>
  <div class="balance-amount">$100,000.00</div>
  <div class="balance-subtitle">Available to trade</div>
</div>

<style>
.balance-widget {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
  border-radius: 1rem;
  padding: 1.5rem;
}
.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.balance-label {
  color: #94a3b8;
  font-size: 0.875rem;
}
.balance-trend {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}
.balance-trend.up {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}
.balance-trend.down {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}
.balance-amount {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}
.balance-subtitle {
  color: #64748b;
  font-size: 0.75rem;
}
</style>`;

export const TRANSACTION_CARD_HTML = `<!-- Transaction Card Component -->
<div class="transaction-card">
  <div class="transaction-icon credit">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12l7-7 7 7"/>
    </svg>
  </div>
  <div class="transaction-details">
    <div class="transaction-title">Bitcoin Purchase</div>
    <div class="transaction-subtitle">Market Order</div>
  </div>
  <div class="transaction-amount credit">+0.05234 BTC</div>
</div>

<style>
.transaction-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  transition: all 0.2s;
}
.transaction-card:hover {
  background: #334155;
}
.transaction-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.transaction-icon.credit {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}
.transaction-icon.debit {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.transaction-details {
  flex: 1;
}
.transaction-title {
  font-weight: 600;
  color: #f8fafc;
  font-size: 0.875rem;
}
.transaction-subtitle {
  color: #64748b;
  font-size: 0.75rem;
}
.transaction-amount {
  font-weight: 600;
  font-size: 0.875rem;
}
.transaction-amount.credit { color: #10b981; }
.transaction-amount.debit { color: #ef4444; }
</style>`;

export const CRYPTO_TICKER_HTML = `<!-- Crypto Price Ticker Component -->
<div class="crypto-ticker">
  <div class="ticker-icon">
    <span class="ticker-symbol">₿</span>
  </div>
  <div class="ticker-info">
    <div class="ticker-name">Bitcoin</div>
    <div class="ticker-code">BTC</div>
  </div>
  <div class="ticker-price">
    <div class="ticker-current">$67,542.30</div>
    <div class="ticker-change up">+2.45%</div>
  </div>
</div>

<style>
.crypto-ticker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #475569;
  border-radius: 0.75rem;
  min-width: 200px;
}
.ticker-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #f7931a 0%, #ffb84d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ticker-symbol {
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}
.ticker-info { flex: 1; }
.ticker-name {
  font-weight: 600;
  color: #f8fafc;
  font-size: 0.875rem;
}
.ticker-code {
  color: #94a3b8;
  font-size: 0.75rem;
}
.ticker-price { text-align: right; }
.ticker-current {
  font-weight: 700;
  color: #f8fafc;
}
.ticker-change {
  font-size: 0.75rem;
  font-weight: 600;
}
.ticker-change.up { color: #10b981; }
.ticker-change.down { color: #ef4444; }
</style>`;

export const PAYMENT_BUTTON_HTML = `<!-- Payment Button Component -->
<button class="payment-button">
  <svg class="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
  <span>Pay Now</span>
  <span class="secure-badge">🔒 Secure</span>
</button>

<style>
.payment-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}
.payment-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}
.payment-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.button-icon {
  width: 1rem;
  height: 1rem;
}
.secure-badge {
  font-size: 0.75rem;
  opacity: 0.9;
}
</style>`;

export const WATCHLIST_CARD_HTML = `<!-- Watchlist Card Component -->
<div class="watchlist-card">
  <div class="watchlist-header">
    <h3 class="watchlist-title">Watchlist</h3>
    <button class="watchlist-add">+ Add</button>
  </div>
  <div class="watchlist-items">
    <div class="watchlist-item">
      <div class="item-icon btc">₿</div>
      <div class="item-info">
        <div class="item-name">Bitcoin</div>
        <div class="item-symbol">BTC</div>
      </div>
      <div class="item-chart">
        <svg width="60" height="24" viewBox="0 0 60 24">
          <path d="M0 20 L10 15 L20 18 L30 10 L40 12 L50 5 L60 8" stroke="#10b981" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <div class="item-price">
        <div class="price-value">$67,542</div>
        <div class="price-change up">+2.45%</div>
      </div>
    </div>
    <div class="watchlist-item">
      <div class="item-icon eth">Ξ</div>
      <div class="item-info">
        <div class="item-name">Ethereum</div>
        <div class="item-symbol">ETH</div>
      </div>
      <div class="item-chart">
        <svg width="60" height="24" viewBox="0 0 60 24">
          <path d="M0 12 L10 8 L20 14 L30 6 L40 10 L50 4 L60 7" stroke="#10b981" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <div class="item-price">
        <div class="price-value">$3,245</div>
        <div class="price-change up">+1.82%</div>
      </div>
    </div>
  </div>
</div>

<style>
.watchlist-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  overflow: hidden;
}
.watchlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #334155;
}
.watchlist-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
}
.watchlist-add {
  background: #334155;
  border: none;
  color: #10b981;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.watchlist-items { padding: 0.5rem; }
.watchlist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
.watchlist-item:hover { background: #334155; }
.item-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
}
.item-icon.btc { background: #f7931a; }
.item-icon.eth { background: #627eea; }
.item-info { flex: 1; }
.item-name { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.item-symbol { color: #64748b; font-size: 0.75rem; }
.item-chart { width: 60px; }
.item-price { text-align: right; }
.price-value { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.price-change { font-size: 0.75rem; font-weight: 600; }
.price-change.up { color: #10b981; }
.price-change.down { color: #ef4444; }
</style>`;

export const QUICK_TRADE_HTML = `<!-- Quick Trade Widget -->
<div class="quick-trade">
  <div class="trade-tabs">
    <button class="trade-tab active">Buy</button>
    <button class="trade-tab">Sell</button>
  </div>
  <div class="trade-form">
    <div class="form-group">
      <label>Select Asset</label>
      <div class="asset-select">
        <span class="asset-icon">₿</span>
        <span class="asset-name">BTC</span>
        <span class="asset-price">$67,542.30</span>
      </div>
    </div>
    <div class="form-group">
      <label>Amount (BTC)</label>
      <input type="number" class="trade-input" placeholder="0.00" step="0.001">
      <div class="quick-amounts">
        <button class="quick-btn">0.1</button>
        <button class="quick-btn">0.5</button>
        <button class="quick-btn">1</button>
        <button class="quick-btn">5</button>
      </div>
    </div>
    <button class="trade-submit">Buy BTC</button>
  </div>
</div>

<style>
.quick-trade {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  overflow: hidden;
}
.trade-tabs {
  display: flex;
  border-bottom: 1px solid #334155;
}
.trade-tab {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.trade-tab.active {
  color: #10b981;
  border-bottom: 2px solid #10b981;
}
.trade-form { padding: 1.25rem; }
.form-group { margin-bottom: 1rem; }
.form-group label {
  display: block;
  color: #94a3b8;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}
.asset-select {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.5rem;
}
.asset-icon {
  width: 2rem;
  height: 2rem;
  background: #f7931a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
}
.asset-name { font-weight: 600; color: #f8fafc; flex: 1; }
.asset-price { color: #94a3b8; font-size: 0.875rem; }
.trade-input {
  width: 100%;
  padding: 0.75rem;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: #f8fafc;
  font-size: 1rem;
}
.quick-amounts {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.quick-btn {
  flex: 1;
  padding: 0.5rem;
  background: #334155;
  border: none;
  border-radius: 0.375rem;
  color: #94a3b8;
  font-size: 0.75rem;
  cursor: pointer;
}
.quick-btn:hover { background: #475569; color: #f8fafc; }
.trade-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  border: none;
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>`;


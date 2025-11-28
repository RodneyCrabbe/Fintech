// HTML Component Sources - Part 2

export const PORTFOLIO_DONUT_HTML = `<!-- Portfolio Donut Component -->
<div class="portfolio-donut">
  <div class="donut-header">
    <h3>Portfolio Allocation</h3>
  </div>
  <div class="donut-chart">
    <svg viewBox="0 0 100 100" class="donut-svg">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" stroke-width="12"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#f7931a" stroke-width="12" 
        stroke-dasharray="100.53 150.79" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#627eea" stroke-width="12" 
        stroke-dasharray="62.83 188.49" stroke-dashoffset="-100.53" transform="rotate(-90 50 50)"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="12" 
        stroke-dasharray="37.70 213.62" stroke-dashoffset="-163.36" transform="rotate(-90 50 50)"/>
    </svg>
    <div class="donut-center">
      <div class="donut-total">$100K</div>
      <div class="donut-label">Total</div>
    </div>
  </div>
  <div class="donut-legend">
    <div class="legend-item"><span class="legend-dot btc"></span>BTC 40%</div>
    <div class="legend-item"><span class="legend-dot eth"></span>ETH 25%</div>
    <div class="legend-item"><span class="legend-dot other"></span>Other 35%</div>
  </div>
</div>

<style>
.portfolio-donut {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  padding: 1.25rem;
}
.donut-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
}
.donut-chart {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 1rem;
}
.donut-svg {
  width: 100%;
  height: 100%;
}
.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.donut-total {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
}
.donut-label {
  font-size: 0.75rem;
  color: #64748b;
}
.donut-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #94a3b8;
}
.legend-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.legend-dot.btc { background: #f7931a; }
.legend-dot.eth { background: #627eea; }
.legend-dot.other { background: #10b981; }
</style>`;

export const MARKET_STATS_HTML = `<!-- Market Stats Component -->
<div class="market-stats">
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
</div>

<style>
.market-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
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
.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #f8fafc;
}
.stat-label {
  font-size: 0.75rem;
  color: #64748b;
}
.stat-change {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
.stat-change.up { color: #10b981; background: rgba(16, 185, 129, 0.1); }
.stat-change.down { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
.stat-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
</style>`;

export const ALERTS_WIDGET_HTML = `<!-- Alerts Widget Component -->
<div class="alerts-widget">
  <div class="alerts-header">
    <h3>Notifications</h3>
    <button class="alerts-action">Mark all read</button>
  </div>
  <div class="alerts-list">
    <div class="alert-item unread">
      <div class="alert-icon price">📊</div>
      <div class="alert-content">
        <div class="alert-title">BTC Price Alert</div>
        <div class="alert-message">Bitcoin crossed $68,000 resistance level</div>
        <div class="alert-time">2 min ago</div>
      </div>
      <button class="alert-dismiss">×</button>
    </div>
    <div class="alert-item">
      <div class="alert-icon success">✓</div>
      <div class="alert-content">
        <div class="alert-title">Deposit Confirmed</div>
        <div class="alert-message">Your deposit of 0.5 ETH has been confirmed</div>
        <div class="alert-time">1 hour ago</div>
      </div>
      <button class="alert-dismiss">×</button>
    </div>
    <div class="alert-item">
      <div class="alert-icon warning">⚠</div>
      <div class="alert-content">
        <div class="alert-title">Security Alert</div>
        <div class="alert-message">New login detected from Chrome on Windows</div>
        <div class="alert-time">3 hours ago</div>
      </div>
      <button class="alert-dismiss">×</button>
    </div>
  </div>
</div>

<style>
.alerts-widget {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  overflow: hidden;
}
.alerts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #334155;
}
.alerts-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
}
.alerts-action {
  background: none;
  border: none;
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.alerts-list { padding: 0.5rem; }
.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
.alert-item:hover { background: #334155; }
.alert-item.unread { background: rgba(16, 185, 129, 0.05); }
.alert-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}
.alert-icon.price { background: rgba(59, 130, 246, 0.1); }
.alert-icon.success { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.alert-icon.warning { background: rgba(245, 158, 11, 0.1); }
.alert-content { flex: 1; }
.alert-title { font-weight: 600; color: #f8fafc; font-size: 0.875rem; }
.alert-message { color: #94a3b8; font-size: 0.75rem; margin-top: 0.125rem; }
.alert-time { color: #64748b; font-size: 0.625rem; margin-top: 0.25rem; }
.alert-dismiss {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.alert-dismiss:hover { color: #94a3b8; }
</style>`;

export const SECURITY_MODAL_HTML = `<!-- Security Modal Component -->
<div class="modal-overlay" id="securityModal">
  <div class="modal-container">
    <div class="modal-header">
      <div class="modal-icon">🔒</div>
      <h2 class="modal-title">Security Verification</h2>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <p>Please verify your identity to continue with this transaction.</p>
      <div class="modal-details">
        <div class="detail-label">Transaction Amount</div>
        <div class="detail-value">$1,250.00</div>
      </div>
      <div class="modal-success">
        <span class="success-icon">✓</span>
        <span>Transaction Verified</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-btn secondary" onclick="closeModal()">Cancel</button>
      <button class="modal-btn primary">Confirm</button>
    </div>
  </div>
</div>

<style>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}
.modal-container {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 1rem;
}
.modal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-bottom: 1px solid #334155;
}
.modal-icon {
  font-size: 1.5rem;
}
.modal-title {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: #f8fafc;
}
.modal-close {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal-body {
  padding: 1.25rem;
}
.modal-body p {
  color: #94a3b8;
  margin-bottom: 1rem;
}
.modal-details {
  background: #0f172a;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.detail-label {
  font-size: 0.75rem;
  color: #64748b;
}
.detail-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
}
.modal-success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 0.5rem;
  color: #10b981;
  font-weight: 600;
}
.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem;
  border-top: 1px solid #334155;
}
.modal-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-btn.secondary {
  background: #334155;
  border: none;
  color: #f8fafc;
}
.modal-btn.primary {
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  border: none;
  color: white;
}
</style>

<script>
function closeModal() {
  document.getElementById('securityModal').style.display = 'none';
}
</script>`;

export const CHART_COMPONENT_HTML = `<!-- Chart Component -->
<div class="chart-component">
  <div class="chart-header">
    <div class="chart-info">
      <h3>Portfolio Performance</h3>
      <p>Last 6 months</p>
    </div>
    <div class="chart-legend">
      <span class="legend-value">$100,000</span>
      <span class="legend-change up">+12.5%</span>
    </div>
  </div>
  <div class="chart-area">
    <svg viewBox="0 0 400 200" class="chart-svg">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3"/>
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:0"/>
        </linearGradient>
      </defs>
      <path d="M0 150 L66 120 L132 140 L198 100 L264 80 L330 60 L400 80 L400 200 L0 200 Z" fill="url(#chartGradient)"/>
      <path d="M0 150 L66 120 L132 140 L198 100 L264 80 L330 60 L400 80" stroke="#10b981" stroke-width="2" fill="none"/>
    </svg>
    <div class="chart-labels">
      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
    </div>
  </div>
</div>

<style>
.chart-component {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  padding: 1.25rem;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}
.chart-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
}
.chart-info p {
  font-size: 0.75rem;
  color: #64748b;
}
.chart-legend {
  text-align: right;
}
.legend-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
}
.legend-change {
  font-size: 0.875rem;
  font-weight: 600;
}
.legend-change.up { color: #10b981; }
.chart-area { position: relative; }
.chart-svg {
  width: 100%;
  height: 150px;
}
.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
}
.chart-labels span {
  font-size: 0.625rem;
  color: #64748b;
}
</style>`;

export const ORDER_BOOK_HTML = `<!-- Order Book Component -->
<div class="order-book">
  <div class="orderbook-header">
    <h3>Order Book</h3>
    <span class="orderbook-pair">BTC/USD</span>
  </div>
  <div class="orderbook-content">
    <div class="orderbook-side asks">
      <div class="orderbook-row">
        <span class="price ask">68,245.00</span>
        <span class="amount">0.5234</span>
        <span class="total">35,712</span>
      </div>
      <div class="orderbook-row">
        <span class="price ask">68,220.00</span>
        <span class="amount">1.2340</span>
        <span class="total">84,199</span>
      </div>
      <div class="orderbook-row">
        <span class="price ask">68,200.00</span>
        <span class="amount">0.8500</span>
        <span class="total">57,970</span>
      </div>
    </div>
    <div class="orderbook-spread">
      <span class="spread-price">68,150.00</span>
      <span class="spread-label">Spread: $50</span>
    </div>
    <div class="orderbook-side bids">
      <div class="orderbook-row">
        <span class="price bid">68,100.00</span>
        <span class="amount">0.9200</span>
        <span class="total">62,652</span>
      </div>
      <div class="orderbook-row">
        <span class="price bid">68,050.00</span>
        <span class="amount">1.5600</span>
        <span class="total">106,158</span>
      </div>
      <div class="orderbook-row">
        <span class="price bid">68,000.00</span>
        <span class="amount">2.1000</span>
        <span class="total">142,800</span>
      </div>
    </div>
  </div>
</div>

<style>
.order-book {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  overflow: hidden;
}
.orderbook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #334155;
}
.orderbook-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
}
.orderbook-pair {
  font-size: 0.75rem;
  color: #64748b;
  background: #334155;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
.orderbook-content { padding: 0.75rem; }
.orderbook-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  font-family: 'Monaco', monospace;
}
.orderbook-row:hover { background: #334155; border-radius: 0.25rem; }
.price { font-weight: 600; }
.price.ask { color: #ef4444; }
.price.bid { color: #10b981; }
.amount { color: #f8fafc; text-align: center; }
.total { color: #64748b; text-align: right; }
.orderbook-spread {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #0f172a;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
}
.spread-price {
  font-weight: 700;
  color: #f8fafc;
}
.spread-label {
  font-size: 0.75rem;
  color: #64748b;
}
</style>`;


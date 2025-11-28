import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratorProgress } from './index'

// Import HTML sources
import {
  BALANCE_WIDGET_HTML,
  TRANSACTION_CARD_HTML,
  CRYPTO_TICKER_HTML,
  PAYMENT_BUTTON_HTML,
  WATCHLIST_CARD_HTML,
  QUICK_TRADE_HTML,
} from './sources/htmlComponentSources'

import {
  PORTFOLIO_DONUT_HTML,
  MARKET_STATS_HTML,
  ALERTS_WIDGET_HTML,
  SECURITY_MODAL_HTML,
  CHART_COMPONENT_HTML,
  ORDER_BOOK_HTML,
} from './sources/htmlComponentSources2'

import {
  DASHBOARD_PAGE_HTML,
  WALLET_PAGE_HTML,
  TRADE_PAGE_HTML,
  MARKETS_PAGE_HTML,
  HISTORY_PAGE_HTML,
} from './sources/htmlPageSources'

import { COMPONENTS_CSS } from './sources/htmlStylesSources'

export interface HtmlGeneratorOptions {
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: GeneratorProgress) => void
}

// Base CSS styles
const BASE_CSS = `/* Fintech Pro UI Kit - Base Styles */
:root {
  --color-primary: #10b981;
  --color-secondary: #06b6d4;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.5;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.text-muted { color: var(--color-text-muted); }
.text-success { color: var(--color-success); }
.text-error { color: var(--color-error); }
.up { color: #10b981; }
.down { color: #ef4444; }
`

// Main JavaScript
const MAIN_JS = `// Fintech Pro UI Kit - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Fintech Pro UI Kit loaded');
  
  // Tab switching
  document.querySelectorAll('.trade-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.trade-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Time range tabs
  document.querySelectorAll('.time-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.time-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
`

// Index HTML
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fintech Pro UI Kit - HTML/CSS</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div class="container" style="padding: 3rem 1.5rem;">
    <div style="text-align: center; margin-bottom: 3rem;">
      <div style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #10b981, #06b6d4); border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">⚡</div>
      <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Fintech Pro UI Kit</h1>
      <p style="color: #94a3b8; margin-bottom: 2rem;">HTML/CSS Components for Fintech Applications</p>
    </div>
    
    <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">📄 Demo Pages</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
      <a href="pages/dashboard.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; text-align: center; text-decoration: none; color: #f8fafc; transition: all 0.2s;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🏠</span>
        <span style="font-weight: 600;">Dashboard</span>
      </a>
      <a href="pages/wallet.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; text-align: center; text-decoration: none; color: #f8fafc; transition: all 0.2s;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">💰</span>
        <span style="font-weight: 600;">Wallet</span>
      </a>
      <a href="pages/trade.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; text-align: center; text-decoration: none; color: #f8fafc; transition: all 0.2s;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">↔️</span>
        <span style="font-weight: 600;">Trade</span>
      </a>
      <a href="pages/markets.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; text-align: center; text-decoration: none; color: #f8fafc; transition: all 0.2s;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">📈</span>
        <span style="font-weight: 600;">Markets</span>
      </a>
      <a href="pages/history.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; text-align: center; text-decoration: none; color: #f8fafc; transition: all 0.2s;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">📋</span>
        <span style="font-weight: 600;">History</span>
      </a>
    </div>

    <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">🧩 Components</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;">
      <a href="components/balance-widget.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Balance Widget</a>
      <a href="components/transaction-card.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Transaction Card</a>
      <a href="components/crypto-ticker.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Crypto Ticker</a>
      <a href="components/payment-button.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Payment Button</a>
      <a href="components/watchlist-card.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Watchlist Card</a>
      <a href="components/quick-trade.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Quick Trade</a>
      <a href="components/portfolio-donut.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Portfolio Donut</a>
      <a href="components/market-stats.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Market Stats</a>
      <a href="components/alerts-widget.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Alerts Widget</a>
      <a href="components/chart-component.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Chart Component</a>
      <a href="components/order-book.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Order Book</a>
      <a href="components/security-modal.html" style="display: block; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem; text-decoration: none; color: #f8fafc;">Security Modal</a>
    </div>
  </div>
</body>
</html>`

// README
const README_MD = `# Fintech Pro UI Kit - HTML/CSS Version

Production-ready HTML/CSS components for building modern fintech applications.

## 🚀 Quick Start

1. Open \`index.html\` in your browser
2. Browse demo pages in the \`pages/\` folder
3. Copy components from the \`components/\` folder

## 📁 Structure

\`\`\`
fintech-pro-html/
├── index.html          # Main index with links
├── css/
│   ├── styles.css      # Base styles & utilities
│   └── components.css  # Component-specific styles
├── js/
│   └── main.js         # JavaScript functionality
├── components/         # Individual HTML components
│   ├── balance-widget.html
│   ├── transaction-card.html
│   ├── crypto-ticker.html
│   └── ...
├── pages/              # Demo pages
│   ├── dashboard.html
│   ├── wallet.html
│   ├── trade.html
│   ├── markets.html
│   └── history.html
└── assets/             # Images and icons
\`\`\`

## 🎨 Customization

Edit CSS variables in \`css/styles.css\`:

\`\`\`css
:root {
  --color-primary: #10b981;
  --color-secondary: #06b6d4;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}
\`\`\`

## 📦 Components Included

- Balance Widget
- Transaction Card
- Crypto Price Ticker
- Payment Button
- Watchlist Card
- Quick Trade Widget
- Portfolio Donut Chart
- Market Stats
- Alerts Widget
- Chart Component
- Order Book
- Security Modal

## 📄 License

Licensed for commercial and personal use.
`

export async function generateHtmlPackage(
  options: HtmlGeneratorOptions = {}
): Promise<void> {
  const {
    includePages = true,
    includeDocs = true,
    onProgress
  } = options

  const zip = new JSZip()
  const root = zip.folder('fintech-pro-html')!

  onProgress?.({ status: 'preparing', progress: 0, message: 'Preparing HTML package...' })

  // Create folder structure
  const cssFolder = root.folder('css')!
  const jsFolder = root.folder('js')!
  const componentsFolder = root.folder('components')!
  const pagesFolder = root.folder('pages')!
  root.folder('assets')

  onProgress?.({ status: 'generating', progress: 10, message: 'Adding stylesheets...' })

  // Add CSS files
  cssFolder.file('styles.css', BASE_CSS)
  cssFolder.file('components.css', COMPONENTS_CSS)

  onProgress?.({ status: 'generating', progress: 20, message: 'Adding JavaScript...' })

  // Add JavaScript
  jsFolder.file('main.js', MAIN_JS)

  onProgress?.({ status: 'generating', progress: 30, message: 'Adding components...' })

  // Add component files
  componentsFolder.file('balance-widget.html', BALANCE_WIDGET_HTML)
  componentsFolder.file('transaction-card.html', TRANSACTION_CARD_HTML)
  componentsFolder.file('crypto-ticker.html', CRYPTO_TICKER_HTML)
  componentsFolder.file('payment-button.html', PAYMENT_BUTTON_HTML)
  componentsFolder.file('watchlist-card.html', WATCHLIST_CARD_HTML)
  componentsFolder.file('quick-trade.html', QUICK_TRADE_HTML)
  componentsFolder.file('portfolio-donut.html', PORTFOLIO_DONUT_HTML)
  componentsFolder.file('market-stats.html', MARKET_STATS_HTML)
  componentsFolder.file('alerts-widget.html', ALERTS_WIDGET_HTML)
  componentsFolder.file('chart-component.html', CHART_COMPONENT_HTML)
  componentsFolder.file('order-book.html', ORDER_BOOK_HTML)
  componentsFolder.file('security-modal.html', SECURITY_MODAL_HTML)

  onProgress?.({ status: 'generating', progress: 50, message: 'Adding demo pages...' })

  if (includePages) {
    pagesFolder.file('dashboard.html', DASHBOARD_PAGE_HTML)
    pagesFolder.file('wallet.html', WALLET_PAGE_HTML)
    pagesFolder.file('trade.html', TRADE_PAGE_HTML)
    pagesFolder.file('markets.html', MARKETS_PAGE_HTML)
    pagesFolder.file('history.html', HISTORY_PAGE_HTML)
  }

  onProgress?.({ status: 'generating', progress: 70, message: 'Adding index and docs...' })

  // Add main index
  root.file('index.html', INDEX_HTML)

  if (includeDocs) {
    root.file('README.md', README_MD)
  }

  onProgress?.({ status: 'generating', progress: 90, message: 'Creating ZIP file...' })

  const content = await zip.generateAsync({ type: 'blob' })

  onProgress?.({ status: 'downloading', progress: 95, message: 'Downloading...' })

  saveAs(content, 'fintech-pro-html.zip')

  onProgress?.({ status: 'complete', progress: 100, message: 'Download complete!' })
}

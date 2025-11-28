import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratorProgress } from './index'
import {
  ALERTS_WIDGET_SOURCE,
  BALANCE_WIDGET_SOURCE,
  ASSET_HOLDINGS_SOURCE,
  CHART_COMPONENT_SOURCE,
  CRYPTO_PRICE_TICKER_SOURCE,
  MARKET_STATS_SOURCE,
  ORDER_BOOK_SOURCE,
  PAYMENT_BUTTON_SOURCE,
  PORTFOLIO_DONUT_SOURCE,
  QUICK_TRADE_WIDGET_SOURCE,
  SECURITY_MODAL_SOURCE,
  TRANSACTION_CARD_SOURCE,
  TRANSACTION_HISTORY_SOURCE,
  WATCHLIST_CARD_SOURCE,
  MARKET_TABLE_SOURCE,
  PROFILE_SIDE_MENU_SOURCE,
  CRYPTO_DASHBOARD_PAGE,
  WALLET_PAGE,
  TRADE_PAGE,
  MARKETS_PAGE,
  HISTORY_PAGE,
} from './sources'

export interface ReactGeneratorOptions {
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: GeneratorProgress) => void
}

// ============================================================================
// UTILITY SOURCE CODE
// ============================================================================

const UTILS_SOURCE = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

// ============================================================================
// CONFIGURATION FILES
// ============================================================================

const packageJsonContent = `{
  "name": "fintech-pro-ui-kit-react",
  "version": "1.0.0",
  "description": "Production-ready fintech UI components for React 18+",
  "main": "src/components/index.ts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "keywords": ["react", "typescript", "ui-kit", "fintech", "components", "tailwindcss"],
  "author": "Fintech Pro UI Kit",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.8"
  }
}
`

const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`

const tsconfigContent = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`

const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`

const postcssConfigContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

const mainCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #1E40AF;
  --color-secondary: #64748B;
  --color-accent: #10B981;
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-text: #ffffff;
  --color-text-muted: #a1a1aa;
  
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
}

body {
  margin: 0;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

const readmeContent = `# Fintech Pro UI Kit - React

Production-ready fintech UI components for React 18+ with TypeScript and Tailwind CSS.

## Installation

\`\`\`bash
npm install
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

## Components Included

### Core Components (16)
- **AlertsWidget** - Display alerts and notifications
- **AssetHoldings** - Display asset portfolio with charts
- **BalanceWidget** - Show account balance with trends
- **ChartComponent** - Financial charts (line/bar)
- **CryptoPriceTicker** - Real-time crypto prices
- **MarketStats** - Market overview statistics
- **MarketTable** - Cryptocurrency market table with sorting
- **OrderBook** - Trading order book visualization
- **PaymentButton** - Secure payment buttons
- **PortfolioDonut** - Portfolio allocation donut chart
- **ProfileSideMenu** - User profile sidebar navigation
- **QuickTradeWidget** - Quick buy/sell interface
- **SecurityModal** - Secure modal dialogs
- **TransactionCard** - Transaction display card
- **TransactionHistory** - Transaction history list with filters
- **WatchlistCard** - Asset watchlist with sparklines

### Demo Pages (5)
- **CryptoDashboard** - Main dashboard with all widgets
- **HistoryPage** - Transaction history with export
- **MarketsPage** - Market overview and listings
- **TradePage** - Trading interface with charts
- **WalletPage** - Wallet management

## Usage

\`\`\`tsx
import { BalanceWidget, PaymentButton, TransactionCard } from './components'

function App() {
  return (
    <div>
      <BalanceWidget
        balance={12345.67}
        currency="USD"
        label="Total Balance"
        trend="up"
        trendValue={245.50}
      />
      <PaymentButton onClick={() => handlePayment()}>
        Pay Now
      </PaymentButton>
    </div>
  )
}
\`\`\`

## Customization

All components support:
- **Variants**: default, outline, ghost
- **Sizes**: sm, md, lg
- **Dark mode**: isDark prop
- **Custom className**: Tailwind classes

## License

MIT License - See LICENSE.md for details.
`

const componentsIndexContent = `// Core Components
export { AlertsWidget } from './AlertsWidget'
export { AssetHoldings } from './AssetHoldings'
export { BalanceWidget } from './BalanceWidget'
export { default as ChartComponent } from './ChartComponent'
export { default as CryptoPriceTicker } from './CryptoPriceTicker'
export { MarketStats } from './MarketStats'
export { MarketTable } from './MarketTable'
export { OrderBook } from './OrderBook'
export { default as PaymentButton } from './PaymentButton'
export { PortfolioDonut } from './PortfolioDonut'
export { ProfileSideMenu } from './ProfileSideMenu'
export { QuickTradeWidget } from './QuickTradeWidget'
export { default as SecurityModal } from './SecurityModal'
export { TransactionCard } from './TransactionCard'
export { TransactionHistory } from './TransactionHistory'
export { WatchlistCard } from './WatchlistCard'
`

const pagesIndexContent = `export { default as CryptoDashboard } from './CryptoDashboard'
export { default as HistoryPage } from './HistoryPage'
export { default as MarketsPage } from './MarketsPage'
export { default as TradePage } from './TradePage'
export { default as WalletPage } from './WalletPage'
`

const mainTsxContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { CryptoDashboard } from './pages'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CryptoDashboard />
  </React.StrictMode>,
)
`

const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fintech Pro UI Kit</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const licenseContent = `MIT License

Copyright (c) 2024 Fintech Pro UI Kit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`

// ============================================================================
// COMPONENT AND PAGE SOURCES
// ============================================================================

function getComponentSources(): Record<string, string> {
  return {
    AlertsWidget: ALERTS_WIDGET_SOURCE,
    AssetHoldings: ASSET_HOLDINGS_SOURCE,
    BalanceWidget: BALANCE_WIDGET_SOURCE,
    ChartComponent: CHART_COMPONENT_SOURCE,
    CryptoPriceTicker: CRYPTO_PRICE_TICKER_SOURCE,
    MarketStats: MARKET_STATS_SOURCE,
    MarketTable: MARKET_TABLE_SOURCE,
    OrderBook: ORDER_BOOK_SOURCE,
    PaymentButton: PAYMENT_BUTTON_SOURCE,
    PortfolioDonut: PORTFOLIO_DONUT_SOURCE,
    ProfileSideMenu: PROFILE_SIDE_MENU_SOURCE,
    QuickTradeWidget: QUICK_TRADE_WIDGET_SOURCE,
    SecurityModal: SECURITY_MODAL_SOURCE,
    TransactionCard: TRANSACTION_CARD_SOURCE,
    TransactionHistory: TRANSACTION_HISTORY_SOURCE,
    WatchlistCard: WATCHLIST_CARD_SOURCE,
  }
}

function getPageSources(): Record<string, string> {
  return {
    CryptoDashboard: CRYPTO_DASHBOARD_PAGE,
    WalletPage: WALLET_PAGE,
    TradePage: TRADE_PAGE,
    MarketsPage: MARKETS_PAGE,
    HistoryPage: HISTORY_PAGE,
  }
}

// ============================================================================
// GENERATOR FUNCTION
// ============================================================================

export async function generateReactPackage(
  options: ReactGeneratorOptions = {}
): Promise<void> {
  const { includePages = true, includeDocs = true, onProgress } = options

  try {
    onProgress?.({
      status: 'preparing',
      progress: 0,
      message: 'Preparing React package...'
    })

    const zip = new JSZip()
    const rootFolder = zip.folder('fintech-pro-react')!

    // Add config files
    onProgress?.({
      status: 'generating',
      progress: 10,
      message: 'Adding configuration files...'
    })

    rootFolder.file('package.json', packageJsonContent)
    rootFolder.file('tailwind.config.js', tailwindConfigContent)
    rootFolder.file('tsconfig.json', tsconfigContent)
    rootFolder.file('vite.config.ts', viteConfigContent)
    rootFolder.file('postcss.config.js', postcssConfigContent)
    rootFolder.file('index.html', indexHtmlContent)

    // Add src folder structure
    const srcFolder = rootFolder.folder('src')!
    srcFolder.file('index.css', mainCssContent)
    srcFolder.file('main.tsx', mainTsxContent)

    // Add lib folder
    const libFolder = srcFolder.folder('lib')!
    libFolder.file('utils.ts', UTILS_SOURCE)

    // Get component sources
    onProgress?.({
      status: 'generating',
      progress: 30,
      message: 'Adding components...'
    })

    const componentSources = getComponentSources()
    const componentsFolder = srcFolder.folder('components')!
    componentsFolder.file('index.ts', componentsIndexContent)

    for (const [name, source] of Object.entries(componentSources)) {
      componentsFolder.file(`${name}.tsx`, source)
    }

    // Add pages
    if (includePages) {
      onProgress?.({
        status: 'generating',
        progress: 50,
        message: 'Adding demo pages...'
      })

      const pageSources = getPageSources()
      const pagesFolder = srcFolder.folder('pages')!
      pagesFolder.file('index.ts', pagesIndexContent)

      for (const [name, source] of Object.entries(pageSources)) {
        pagesFolder.file(`${name}.tsx`, source)
      }
    }

    // Add documentation
    if (includeDocs) {
      onProgress?.({
        status: 'generating',
        progress: 70,
        message: 'Adding documentation...'
      })

      rootFolder.file('README.md', readmeContent)
      rootFolder.file('LICENSE.md', licenseContent)
    }

    // Generate ZIP
    onProgress?.({
      status: 'generating',
      progress: 85,
      message: 'Compressing files...'
    })

    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Download
    onProgress?.({
      status: 'downloading',
      progress: 95,
      message: 'Starting download...'
    })

    saveAs(blob, 'fintech-pro-react-v1.0.0.zip')

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Download complete!'
    })

  } catch (error) {
    console.error('Error generating React package:', error)
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error instanceof Error ? error.message : 'Failed to generate package'
    })
    throw error
  }
}

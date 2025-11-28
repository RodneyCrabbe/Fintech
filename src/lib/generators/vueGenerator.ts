import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratorProgress } from './index'
import {
  VUE_ALERTS_WIDGET,
  VUE_BALANCE_WIDGET,
  VUE_ASSET_HOLDINGS,
  VUE_TRANSACTION_CARD,
  VUE_PAYMENT_BUTTON,
  VUE_QUICK_TRADE_WIDGET,
  VUE_WATCHLIST_CARD,
  VUE_CHART_COMPONENT,
  VUE_CRYPTO_PRICE_TICKER,
  VUE_ORDER_BOOK,
  VUE_PORTFOLIO_DONUT,
  VUE_MARKET_STATS,
  VUE_TRANSACTION_HISTORY,
  VUE_MARKET_TABLE,
  VUE_SECURITY_MODAL,
  VUE_PROFILE_SIDE_MENU,
  VUE_MINI_SPARKLINE,
  VUE_UTILS,
  VUE_CRYPTO_DASHBOARD_PAGE,
  VUE_WALLET_PAGE,
  VUE_TRADE_PAGE,
  VUE_MARKETS_PAGE,
  VUE_HISTORY_PAGE,
  VUE_MAIN_TS,
  VUE_APP,
  VUE_ROUTER,
} from './sources'

export interface VueGeneratorOptions {
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: GeneratorProgress) => void
}

// ============================================================================
// CONFIGURATION FILES
// ============================================================================

const packageJsonContent = `{
  "name": "fintech-pro-ui-kit-vue",
  "version": "1.0.0",
  "description": "Production-ready fintech UI components for Vue 3",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "keywords": ["vue", "vue3", "typescript", "ui-kit", "fintech", "components", "tailwindcss"],
  "author": "Fintech Pro UI Kit",
  "license": "MIT",
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.8",
    "vue-tsc": "^1.8.0"
  }
}
`

const viteConfigContent = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`

const tsconfigContent = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`

const tsconfigNodeContent = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`

const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
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
}

body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fintech Pro UI Kit - Vue 3</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`

const readmeContent = `# Fintech Pro UI Kit - Vue 3

Production-ready fintech UI components for Vue 3 with TypeScript and Tailwind CSS.

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

\`\`\`vue
<script setup lang="ts">
import BalanceWidget from '@/components/BalanceWidget.vue'
import PaymentButton from '@/components/PaymentButton.vue'

const handlePayment = () => {
  console.log('Payment clicked')
}
</script>

<template>
  <BalanceWidget
    :balance="12345.67"
    currency="USD"
    label="Total Balance"
    trend="up"
    :trend-value="245.50"
  />
  <PaymentButton @click="handlePayment">
    Pay Now
  </PaymentButton>
</template>
\`\`\`

## Vue 3 Composition API

All components use Vue 3 Composition API with TypeScript:
- Props defined using \`defineProps<T>()\`
- Events defined using \`defineEmits<T>()\`
- Full TypeScript support
- \`<script setup>\` syntax

## License

MIT License - See LICENSE.md for details.
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

const componentsIndexContent = `// Core Components
export { default as AlertsWidget } from './AlertsWidget.vue'
export { default as AssetHoldings } from './AssetHoldings.vue'
export { default as BalanceWidget } from './BalanceWidget.vue'
export { default as ChartComponent } from './ChartComponent.vue'
export { default as CryptoPriceTicker } from './CryptoPriceTicker.vue'
export { default as MarketStats } from './MarketStats.vue'
export { default as MarketTable } from './MarketTable.vue'
export { default as MiniSparkline } from './MiniSparkline.vue'
export { default as OrderBook } from './OrderBook.vue'
export { default as PaymentButton } from './PaymentButton.vue'
export { default as PortfolioDonut } from './PortfolioDonut.vue'
export { default as ProfileSideMenu } from './ProfileSideMenu.vue'
export { default as QuickTradeWidget } from './QuickTradeWidget.vue'
export { default as SecurityModal } from './SecurityModal.vue'
export { default as TransactionCard } from './TransactionCard.vue'
export { default as TransactionHistory } from './TransactionHistory.vue'
export { default as WatchlistCard } from './WatchlistCard.vue'
`

// ============================================================================
// COMPONENT AND PAGE SOURCES
// ============================================================================

function getComponentSources(): Record<string, string> {
  return {
    AlertsWidget: VUE_ALERTS_WIDGET,
    AssetHoldings: VUE_ASSET_HOLDINGS,
    BalanceWidget: VUE_BALANCE_WIDGET,
    ChartComponent: VUE_CHART_COMPONENT,
    CryptoPriceTicker: VUE_CRYPTO_PRICE_TICKER,
    MarketStats: VUE_MARKET_STATS,
    MarketTable: VUE_MARKET_TABLE,
    MiniSparkline: VUE_MINI_SPARKLINE,
    OrderBook: VUE_ORDER_BOOK,
    PaymentButton: VUE_PAYMENT_BUTTON,
    PortfolioDonut: VUE_PORTFOLIO_DONUT,
    ProfileSideMenu: VUE_PROFILE_SIDE_MENU,
    QuickTradeWidget: VUE_QUICK_TRADE_WIDGET,
    SecurityModal: VUE_SECURITY_MODAL,
    TransactionCard: VUE_TRANSACTION_CARD,
    TransactionHistory: VUE_TRANSACTION_HISTORY,
    WatchlistCard: VUE_WATCHLIST_CARD,
  }
}

function getPageSources(): Record<string, string> {
  return {
    CryptoDashboard: VUE_CRYPTO_DASHBOARD_PAGE,
    WalletPage: VUE_WALLET_PAGE,
    TradePage: VUE_TRADE_PAGE,
    MarketsPage: VUE_MARKETS_PAGE,
    HistoryPage: VUE_HISTORY_PAGE,
  }
}

// ============================================================================
// GENERATOR FUNCTION
// ============================================================================

export async function generateVuePackage(
  options: VueGeneratorOptions = {}
): Promise<void> {
  const { includePages = true, includeDocs = true, onProgress } = options

  try {
    onProgress?.({
      status: 'preparing',
      progress: 0,
      message: 'Preparing Vue package...'
    })

    const zip = new JSZip()
    const rootFolder = zip.folder('fintech-pro-vue')!

    // Add config files
    onProgress?.({
      status: 'generating',
      progress: 10,
      message: 'Adding configuration files...'
    })

    rootFolder.file('package.json', packageJsonContent)
    rootFolder.file('vite.config.ts', viteConfigContent)
    rootFolder.file('tsconfig.json', tsconfigContent)
    rootFolder.file('tsconfig.node.json', tsconfigNodeContent)
    rootFolder.file('tailwind.config.js', tailwindConfigContent)
    rootFolder.file('postcss.config.js', postcssConfigContent)
    rootFolder.file('index.html', indexHtmlContent)

    // Add src folder structure
    const srcFolder = rootFolder.folder('src')!
    srcFolder.file('main.ts', VUE_MAIN_TS)
    srcFolder.file('App.vue', VUE_APP)
    srcFolder.file('router.ts', VUE_ROUTER)
    srcFolder.file('index.css', mainCssContent)

    // Add lib folder
    const libFolder = srcFolder.folder('lib')!
    libFolder.file('utils.ts', VUE_UTILS)

    // Get component sources
    onProgress?.({
      status: 'generating',
      progress: 30,
      message: 'Adding Vue components...'
    })

    const componentSources = getComponentSources()
    const componentsFolder = srcFolder.folder('components')!
    componentsFolder.file('index.ts', componentsIndexContent)

    for (const [name, source] of Object.entries(componentSources)) {
      componentsFolder.file(`${name}.vue`, source)
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

      for (const [name, source] of Object.entries(pageSources)) {
        pagesFolder.file(`${name}.vue`, source)
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

    saveAs(blob, 'fintech-pro-vue-v1.0.0.zip')

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Download complete!'
    })

  } catch (error) {
    console.error('Error generating Vue package:', error)
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error instanceof Error ? error.message : 'Failed to generate package'
    })
    throw error
  }
}

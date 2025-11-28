// ============================================================================
// VUE 3 PAGE SOURCES AND HELPER COMPONENTS
// ============================================================================

export const VUE_MINI_SPARKLINE = `<template>
  <svg :width="width" :height="height" class="overflow-visible">
    <polyline :points="points" fill="none" :stroke="isPositive ? '#10B981' : '#EF4444'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ data: number[]; isPositive: boolean; width?: number; height?: number }>(), { width: 80, height: 24 })

const points = computed(() => {
  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  const range = max - min || 1
  const padding = 2
  return props.data.map((value, index) => {
    const x = padding + (index / (props.data.length - 1)) * (props.width - padding * 2)
    const y = props.height - padding - ((value - min) / range) * (props.height - padding * 2)
    return \`\${x},\${y}\`
  }).join(' ')
})
</script>
`

export const VUE_UTILS = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

export const VUE_CRYPTO_DASHBOARD_PAGE = `<template>
  <div :class="cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')">
    <div class="max-w-7xl mx-auto space-y-6">
      <header class="flex items-center justify-between">
        <div>
          <h1 :class="cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')">Dashboard</h1>
          <p :class="cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')">Welcome back! Here's your portfolio overview.</p>
        </div>
        <button @click="showQuickTrade = true" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">Quick Trade</button>
      </header>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <BalanceWidget :is-dark="isDark" />
          <CryptoPriceTicker :is-dark="isDark" />
          <TransactionHistory :is-dark="isDark" />
        </div>
        <div class="space-y-6">
          <PortfolioDonut :is-dark="isDark" />
          <AlertsWidget :is-dark="isDark" />
          <WatchlistCard :is-dark="isDark" />
        </div>
      </div>
      <AssetHoldings :is-dark="isDark" />
    </div>
    <QuickTradeWidget v-if="showQuickTrade" :is-dark="isDark" @close="showQuickTrade = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../lib/utils'
import BalanceWidget from '../components/BalanceWidget.vue'
import PortfolioDonut from '../components/PortfolioDonut.vue'
import CryptoPriceTicker from '../components/CryptoPriceTicker.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import WatchlistCard from '../components/WatchlistCard.vue'
import AlertsWidget from '../components/AlertsWidget.vue'
import QuickTradeWidget from '../components/QuickTradeWidget.vue'
import AssetHoldings from '../components/AssetHoldings.vue'

const props = withDefaults(defineProps<{ isDark?: boolean }>(), { isDark: true })
const showQuickTrade = ref(false)
</script>
`

export const VUE_WALLET_PAGE = `<template>
  <div :class="cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')">
    <div class="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 :class="cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')">Wallet</h1>
        <p :class="cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')">Manage your crypto assets and transactions</p>
      </header>
      <BalanceWidget :is-dark="isDark" show-trend show-actions />
      <div :class="cn('flex gap-4 border-b', isDark ? 'border-slate-800' : 'border-slate-200')">
        <button @click="activeTab = 'assets'" :class="cn('px-4 py-3 text-sm font-medium transition-colors relative', activeTab === 'assets' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">
          <span v-if="activeTab === 'assets'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></span>Assets
        </button>
        <button @click="activeTab = 'transactions'" :class="cn('px-4 py-3 text-sm font-medium transition-colors relative', activeTab === 'transactions' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">
          <span v-if="activeTab === 'transactions'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></span>Transactions
        </button>
      </div>
      <AssetHoldings v-if="activeTab === 'assets'" :is-dark="isDark" />
      <TransactionHistory v-else :is-dark="isDark" show-filters />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TransactionCard :transaction="{ id: '1', type: 'deposit', asset: 'BTC', amount: 0.025, value: 1688.56, fee: 0, status: 'completed', timestamp: new Date(Date.now() - 3600000) }" :is-dark="isDark" />
        <TransactionCard :transaction="{ id: '2', type: 'withdraw', asset: 'ETH', amount: 1.5, value: 4800, fee: 2.40, status: 'pending', timestamp: new Date(Date.now() - 7200000) }" :is-dark="isDark" />
        <TransactionCard :transaction="{ id: '3', type: 'transfer', asset: 'USDT', amount: 1000, value: 1000, fee: 1, status: 'completed', timestamp: new Date(Date.now() - 14400000) }" :is-dark="isDark" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../lib/utils'
import BalanceWidget from '../components/BalanceWidget.vue'
import AssetHoldings from '../components/AssetHoldings.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import TransactionCard from '../components/TransactionCard.vue'

const props = withDefaults(defineProps<{ isDark?: boolean }>(), { isDark: true })
const activeTab = ref<'assets' | 'transactions'>('assets')
</script>
`

export const VUE_TRADE_PAGE = `<template>
  <div :class="cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')">
    <div class="max-w-7xl mx-auto space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <h1 :class="cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')">Trade</h1>
          <select v-model="selectedPair" :class="cn('px-4 py-2 rounded-xl font-medium text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500', isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200')">
            <option v-for="pair in pairs" :key="pair" :value="pair">{{ pair }}</option>
          </select>
        </div>
        <MarketStats :pair="selectedPair" :is-dark="isDark" />
      </header>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-3 space-y-6">
          <ChartComponent :symbol="selectedPair.replace('/', '')" :is-dark="isDark" :height="500" />
          <div :class="cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')">
            <div class="flex gap-4 mb-6">
              <button @click="orderType = 'limit'" :class="cn('px-4 py-2 rounded-xl font-medium text-sm transition-colors', orderType === 'limit' ? 'bg-emerald-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">Limit Order</button>
              <button @click="orderType = 'market'" :class="cn('px-4 py-2 rounded-xl font-medium text-sm transition-colors', orderType === 'market' ? 'bg-emerald-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">Market Order</button>
            </div>
            <QuickTradeWidget :is-dark="isDark" :default-pair="selectedPair" :order-type="orderType" />
          </div>
        </div>
        <div class="space-y-6">
          <OrderBook :pair="selectedPair" :is-dark="isDark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../lib/utils'
import ChartComponent from '../components/ChartComponent.vue'
import OrderBook from '../components/OrderBook.vue'
import QuickTradeWidget from '../components/QuickTradeWidget.vue'
import MarketStats from '../components/MarketStats.vue'

const props = withDefaults(defineProps<{ isDark?: boolean }>(), { isDark: true })
const selectedPair = ref('BTC/USDT')
const orderType = ref<'limit' | 'market'>('limit')
const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT']
</script>
`

export const VUE_MARKETS_PAGE = `<template>
  <div :class="cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')">
    <div class="max-w-7xl mx-auto space-y-6">
      <header>
        <h1 :class="cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')">Markets</h1>
        <p :class="cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')">Explore cryptocurrency markets and track prices in real-time</p>
      </header>
      <CryptoPriceTicker :is-dark="isDark" />
      <div class="flex flex-wrap gap-2">
        <button v-for="mode in ['all', 'watchlist', 'gainers', 'losers']" :key="mode" @click="viewMode = mode" :class="cn('px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors', viewMode === mode ? 'bg-emerald-500 text-white' : (isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'))">{{ mode }}</button>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div class="xl:col-span-3">
          <WatchlistCard v-if="viewMode === 'watchlist'" :is-dark="isDark" />
          <MarketTable v-else :is-dark="isDark" show-pagination />
        </div>
        <div class="space-y-6">
          <div :class="cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')">
            <h3 :class="cn('font-semibold mb-4', isDark ? 'text-white' : 'text-slate-900')">Market Overview</h3>
            <div class="space-y-3">
              <div class="flex justify-between"><span :class="isDark ? 'text-slate-400' : 'text-slate-600'">Total Market Cap</span><span :class="cn('font-medium', isDark ? 'text-white' : 'text-slate-900')">$2.45T</span></div>
              <div class="flex justify-between"><span :class="isDark ? 'text-slate-400' : 'text-slate-600'">24h Volume</span><span :class="cn('font-medium', isDark ? 'text-white' : 'text-slate-900')">$89.2B</span></div>
              <div class="flex justify-between"><span :class="isDark ? 'text-slate-400' : 'text-slate-600'">BTC Dominance</span><span :class="cn('font-medium', isDark ? 'text-white' : 'text-slate-900')">52.3%</span></div>
              <div class="flex justify-between"><span :class="isDark ? 'text-slate-400' : 'text-slate-600'">Active Coins</span><span :class="cn('font-medium', isDark ? 'text-white' : 'text-slate-900')">12,456</span></div>
            </div>
          </div>
          <div :class="cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')">
            <h3 :class="cn('font-semibold mb-4', isDark ? 'text-white' : 'text-slate-900')">Fear & Greed Index</h3>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center"><span class="text-white font-bold text-xl">72</span></div>
              <div><p class="text-emerald-400 font-semibold">Greed</p><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Market sentiment is positive</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../lib/utils'
import MarketTable from '../components/MarketTable.vue'
import CryptoPriceTicker from '../components/CryptoPriceTicker.vue'
import WatchlistCard from '../components/WatchlistCard.vue'

const props = withDefaults(defineProps<{ isDark?: boolean }>(), { isDark: true })
const viewMode = ref<'all' | 'watchlist' | 'gainers' | 'losers'>('all')
</script>
`

export const VUE_HISTORY_PAGE = `<template>
  <div :class="cn('min-h-screen p-6', isDark ? 'bg-slate-950' : 'bg-slate-50')">
    <div class="max-w-6xl mx-auto space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 :class="cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')">Transaction History</h1>
          <p :class="cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')">View and export your complete transaction history</p>
        </div>
        <div class="flex gap-2">
          <button @click="handleExport('csv')" :disabled="exportFormat !== null" :class="cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2', isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200', exportFormat === 'csv' ? 'opacity-50' : '')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>{{ exportFormat === 'csv' ? 'Exporting...' : 'Export CSV' }}
          </button>
          <button @click="handleExport('pdf')" :disabled="exportFormat !== null" :class="cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2', isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200', exportFormat === 'pdf' ? 'opacity-50' : '')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>{{ exportFormat === 'pdf' ? 'Exporting...' : 'Export PDF' }}
          </button>
        </div>
      </header>
      <div :class="cn('p-6 rounded-2xl border', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div :class="cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')"><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Total Transactions</p><p :class="cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')">247</p></div>
          <div :class="cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')"><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Total Volume</p><p :class="cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')">$124.5K</p></div>
          <div :class="cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')"><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Total Fees Paid</p><p :class="cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')">$342.18</p></div>
          <div :class="cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')"><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Avg Transaction</p><p :class="cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-slate-900')">$504.05</p></div>
        </div>
      </div>
      <div class="flex gap-2">
        <button v-for="range in ['7d', '30d', '90d', 'all']" :key="range" @click="dateRange = range" :class="cn('px-4 py-2 rounded-xl text-sm font-medium uppercase transition-colors', dateRange === range ? 'bg-emerald-500 text-white' : (isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'))">{{ range === 'all' ? 'All Time' : range }}</button>
      </div>
      <TransactionHistory :is-dark="isDark" show-filters />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../lib/utils'
import TransactionHistory from '../components/TransactionHistory.vue'

const props = withDefaults(defineProps<{ isDark?: boolean }>(), { isDark: true })
const dateRange = ref<'7d' | '30d' | '90d' | 'all'>('30d')
const exportFormat = ref<'csv' | 'pdf' | null>(null)

const handleExport = (format: 'csv' | 'pdf') => {
  exportFormat.value = format
  console.log(\`Exporting as \${format.toUpperCase()}\`)
  setTimeout(() => { exportFormat.value = null }, 2000)
}
</script>
`

export const VUE_MAIN_TS = `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

createApp(App).use(router).mount('#app')
`

export const VUE_APP = `<template>
  <router-view />
</template>

<script setup lang="ts">
// Main App component - just renders the router view
</script>
`

export const VUE_ROUTER = `import { createRouter, createWebHistory } from 'vue-router'
import CryptoDashboard from './pages/CryptoDashboard.vue'
import WalletPage from './pages/WalletPage.vue'
import TradePage from './pages/TradePage.vue'
import MarketsPage from './pages/MarketsPage.vue'
import HistoryPage from './pages/HistoryPage.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: CryptoDashboard },
  { path: '/wallet', name: 'Wallet', component: WalletPage },
  { path: '/trade', name: 'Trade', component: TradePage },
  { path: '/markets', name: 'Markets', component: MarketsPage },
  { path: '/history', name: 'History', component: HistoryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
`


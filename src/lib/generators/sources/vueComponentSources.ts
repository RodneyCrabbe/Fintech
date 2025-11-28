// ============================================================================
// VUE 3 COMPONENT SOURCES - Converted from React to Vue Composition API
// ============================================================================

export const VUE_ALERTS_WIDGET = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center relative', isDark ? 'bg-rose-500/20' : 'bg-rose-100')">
          <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{{ unreadCount }}</span>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Alerts</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ unreadCount }} unread notifications</p>
        </div>
      </div>
      <button :class="cn('text-xs font-medium px-3 py-1.5 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')">Mark all read</button>
    </div>
    <div class="divide-y divide-slate-800/50 max-h-80 overflow-y-auto">
      <div v-for="alert in localAlerts" :key="alert.id" @click="handleClick(alert)" :class="cn('flex items-start gap-3 p-4 cursor-pointer transition-all duration-200', !alert.read ? (isDark ? 'bg-slate-800/30' : 'bg-blue-50/50') : '', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', isDark ? getTypeConfig(alert.type).bgDark : getTypeConfig(alert.type).bg)">
          <component :is="getTypeConfig(alert.type).icon" :class="getTypeConfig(alert.type).textColor" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p :class="cn('font-medium text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ alert.title }}</p>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-400')">{{ formatTime(alert.timestamp) }}</span>
              <button @click.stop="handleDismiss(alert.id)" :class="cn('p-1 rounded-md transition-colors', isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200')">
                <svg :class="cn('w-3 h-3', isDark ? 'text-slate-500' : 'text-slate-400')" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <p :class="cn('text-sm mt-0.5', isDark ? 'text-slate-400' : 'text-slate-600')">{{ alert.message }}</p>
          <div v-if="!alert.read" class="flex items-center gap-1 mt-2">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span :class="cn('text-xs font-medium', isDark ? 'text-blue-400' : 'text-blue-600')">New</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')">
      <button :class="cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')">View All Notifications →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

interface Alert { id: string; type: 'price' | 'news' | 'transaction' | 'security'; title: string; message: string; timestamp: Date; read: boolean; priority: 'low' | 'medium' | 'high' }

const props = withDefaults(defineProps<{ alerts?: Alert[]; className?: string; isDark?: boolean }>(), { isDark: true })
const emit = defineEmits<{ (e: 'alertClick', alert: Alert): void; (e: 'dismiss', alertId: string): void }>()

const defaultAlerts: Alert[] = [
  { id: '1', type: 'price', title: 'BTC Price Alert', message: 'Bitcoin crossed $68,000 resistance level', timestamp: new Date(Date.now() - 300000), read: false, priority: 'high' },
  { id: '2', type: 'transaction', title: 'Deposit Confirmed', message: 'Your deposit of 0.5 ETH has been confirmed', timestamp: new Date(Date.now() - 1800000), read: false, priority: 'medium' },
  { id: '3', type: 'news', title: 'Market Update', message: 'SEC approves new Bitcoin ETF applications', timestamp: new Date(Date.now() - 3600000), read: true, priority: 'low' },
  { id: '4', type: 'security', title: 'New Device Login', message: 'Login detected from Chrome on Windows', timestamp: new Date(Date.now() - 7200000), read: true, priority: 'high' },
]

const localAlerts = ref(props.alerts || defaultAlerts)
const unreadCount = computed(() => localAlerts.value.filter(a => !a.read).length)

const getTypeConfig = (type: string) => {
  const configs: Record<string, { bg: string; bgDark: string; textColor: string; icon: string }> = {
    price: { bg: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', textColor: 'text-emerald-500', icon: 'TrendingUpIcon' },
    transaction: { bg: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', textColor: 'text-cyan-500', icon: 'ArrowsIcon' },
    news: { bg: 'bg-violet-100', bgDark: 'bg-violet-500/20', textColor: 'text-violet-500', icon: 'NewsIcon' },
    security: { bg: 'bg-amber-100', bgDark: 'bg-amber-500/20', textColor: 'text-amber-500', icon: 'ShieldIcon' }
  }
  return configs[type] || configs.news
}

const formatTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (minutes < 60) return \`\${minutes}m ago\`
  if (hours < 24) return \`\${hours}h ago\`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const handleDismiss = (alertId: string) => {
  localAlerts.value = localAlerts.value.filter(a => a.id !== alertId)
  emit('dismiss', alertId)
}

const handleClick = (alert: Alert) => {
  localAlerts.value = localAlerts.value.map(a => a.id === alert.id ? { ...a, read: true } : a)
  emit('alertClick', alert)
}
</script>
`

export const VUE_BALANCE_WIDGET = `<template>
  <div :class="cn(containerClasses, className)" @click="handleClick" @keydown="handleKeydown">
    <template v-if="isLoading">
      <div :class="cn(styles.label, 'animate-pulse bg-slate-200 rounded h-4 w-16')"></div>
      <div :class="cn(styles.balance, 'animate-pulse bg-slate-200 rounded h-8 w-32')"></div>
      <div class="animate-pulse bg-slate-200 rounded h-4 w-20"></div>
    </template>
    <template v-else>
      <label :class="styles.label">{{ label }}</label>
      <div class="flex items-baseline gap-2">
        <span :class="styles.balance">{{ formatCurrency(balance, currency) }}</span>
        <span :class="styles.currency">{{ currency }}</span>
      </div>
      <div v-if="trend && trendValue !== undefined" :class="cn('flex items-center gap-1', styles.trend, trendColorClass)">
        <TrendIcon :trend="trend" :size="size" />
        <span>{{ trend === 'up' ? '+' : '-' }}{{ formatTrendValue(trendValue, currency) }} {{ trendPeriod }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Props {
  balance: number
  currency?: string
  label?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
  trendPeriod?: string
  isLoading?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'USD',
  label: 'Current Balance',
  trendPeriod: 'vs last month',
  isLoading: false,
  variant: 'default',
  size: 'md'
})

const emit = defineEmits<{ (e: 'click'): void }>()

const sizeStyles = {
  sm: { label: 'text-xs font-medium text-slate-600', balance: 'text-lg font-bold text-slate-900', currency: 'text-sm font-semibold text-slate-700', trend: 'text-xs' },
  md: { label: 'text-sm font-medium text-slate-600', balance: 'text-2xl font-bold text-slate-900', currency: 'text-base font-semibold text-slate-700', trend: 'text-sm' },
  lg: { label: 'text-base font-medium text-slate-600', balance: 'text-3xl font-bold text-slate-900', currency: 'text-lg font-semibold text-slate-700', trend: 'text-base' }
}

const variantStyles = {
  default: 'bg-white border-slate-200 shadow-sm hover:shadow-md',
  outline: 'bg-transparent border-slate-300 hover:border-[#1E40AF] hover:bg-slate-50',
  ghost: 'bg-slate-50 border-transparent hover:bg-slate-100'
}

const styles = computed(() => sizeStyles[props.size])

const containerClasses = computed(() => cn(
  'relative flex flex-col rounded-xl border transition-all duration-200',
  variantStyles[props.variant],
  props.size === 'sm' ? 'p-4 gap-2' : props.size === 'lg' ? 'p-8 gap-4' : 'p-6 gap-3',
  'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
))

const trendColorClass = computed(() => props.trend === 'up' ? 'text-green-600' : props.trend === 'down' ? 'text-red-600' : 'text-slate-600')

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
}

const formatTrendValue = (value: number, currency?: string): string => {
  const absValue = Math.abs(value)
  if (currency) return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absValue)
  return \`\${absValue.toFixed(2)}%\`
}

const handleClick = () => emit('click')
const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); emit('click') } }
</script>
`

export const VUE_ASSET_HOLDINGS = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-violet-500/20' : 'bg-violet-100')">
          <svg class="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Asset Holdings</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ localAssets.length }} assets in portfolio</p>
        </div>
      </div>
      <button :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors', isDark ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-emerald-600 hover:bg-emerald-50')">+ Add Asset</button>
    </div>
    <div :class="cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')">
      <div class="col-span-3">Asset</div><div class="col-span-2 text-right">Price</div><div class="col-span-2 text-right">24h</div><div class="col-span-2 text-right">Holdings</div><div class="col-span-3 text-right">Value</div>
    </div>
    <div class="divide-y divide-slate-800/50">
      <div v-for="asset in localAssets" :key="asset.symbol" :class="cn('grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')">
        <div class="col-span-3 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: asset.color }">{{ asset.symbol.charAt(0) }}</div>
          <div>
            <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ asset.symbol }}</p>
            <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ asset.name }}</p>
          </div>
        </div>
        <div class="col-span-2 text-right">
          <p :class="cn('font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')">{{ formatPrice(asset.price) }}</p>
        </div>
        <div class="col-span-2 text-right">
          <span :class="cn('inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold', asset.change24h >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')">{{ asset.change24h >= 0 ? '↑' : '↓' }}{{ Math.abs(asset.change24h).toFixed(2) }}%</span>
        </div>
        <div class="col-span-2 text-right"><p :class="cn('font-medium text-sm tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')">{{ formatHoldings(asset.holdings, asset.symbol) }}</p></div>
        <div class="col-span-3 text-right">
          <p :class="cn('font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')">{{ formatCurrency(asset.value) }}</p>
          <div class="flex items-center justify-end gap-2 mt-1">
            <button @click.stop="emit('trade', asset)" :class="cn('text-xs font-medium transition-colors', isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500')">Trade</button>
          </div>
        </div>
      </div>
    </div>
    <div :class="cn('px-5 py-4 border-t', isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50')">
      <div class="flex items-center justify-between">
        <span :class="cn('text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-600')">Total Portfolio Value</span>
        <span :class="cn('text-lg font-bold', isDark ? 'text-white' : 'text-slate-900')">{{ formatCurrency(totalValue) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

interface Asset { symbol: string; name: string; price: number; holdings: number; value: number; change24h: number; color: string }
const props = withDefaults(defineProps<{ assets?: Asset[]; className?: string; isDark?: boolean }>(), { isDark: true })
const emit = defineEmits<{ (e: 'deposit', asset: Asset): void; (e: 'withdraw', asset: Asset): void; (e: 'trade', asset: Asset): void }>()

const defaultAssets: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67542.30, holdings: 0.5234, value: 35363.65, change24h: 2.45, color: '#F7931A' },
  { symbol: 'ETH', name: 'Ethereum', price: 3245.67, holdings: 4.2156, value: 13683.23, change24h: -1.23, color: '#627EEA' },
  { symbol: 'SOL', name: 'Solana', price: 178.92, holdings: 45.5, value: 8140.86, change24h: 5.67, color: '#14F195' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, holdings: 5000, value: 5000, change24h: 0.01, color: '#26A17B' },
]

const localAssets = ref(props.assets || defaultAssets)
const totalValue = computed(() => localAssets.value.reduce((sum, asset) => sum + asset.value, 0))

const formatPrice = (price: number): string => price >= 1 ? \`$\${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\` : \`$\${price.toFixed(4)}\`
const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
const formatHoldings = (holdings: number, symbol: string): string => holdings >= 1000 ? \`\${holdings.toLocaleString('en-US', { maximumFractionDigits: 2 })} \${symbol}\` : \`\${holdings.toLocaleString('en-US', { maximumFractionDigits: 6 })} \${symbol}\`
</script>
`

export const VUE_TRANSACTION_CARD = `<template>
  <div :class="cn(containerClasses, className)" @click="handleClick" @keydown="handleKeydown">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: bgColor }">
        <span :style="{ color: textColor }">{{ typeConfig.icon }}</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 :class="cn('font-semibold', isDark ? 'text-white' : 'text-slate-900', size === 'sm' ? 'text-sm' : 'text-base')">{{ typeConfig.label }} {{ transaction.asset }}</h3>
            <p :class="cn('text-xs mt-0.5', isDark ? 'text-slate-500' : 'text-slate-500')">{{ formatDate(transaction.timestamp) }}</p>
          </div>
          <span :class="cn('px-2 py-0.5 text-xs font-medium rounded-full', statusClasses)">{{ statusConfig.label }}</span>
        </div>
        <div class="mt-3 flex items-end justify-between">
          <div>
            <p :class="cn('font-semibold tabular-nums', amountColorClass, size === 'sm' ? 'text-lg' : 'text-xl')">{{ amountPrefix }}{{ formatAmount(transaction.amount, transaction.asset) }}</p>
            <p :class="cn('text-xs tabular-nums', isDark ? 'text-slate-500' : 'text-slate-500')">{{ formatCurrency(transaction.value) }} {{ transaction.fee > 0 ? \`• Fee: \${formatCurrency(transaction.fee)}\` : '' }}</p>
          </div>
          <button v-if="transaction.txHash" :class="cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')">View Details →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

interface Transaction { id: string; type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'; asset: string; amount: number; value: number; fee: number; status: 'completed' | 'pending' | 'failed'; timestamp: Date; txHash?: string }

const props = withDefaults(defineProps<{ transaction: Transaction; variant?: 'default' | 'outline'; size?: 'sm' | 'md' | 'lg'; showBalance?: boolean; className?: string; isDark?: boolean }>(), { variant: 'default', size: 'md', showBalance: false, isDark: true })
const emit = defineEmits<{ (e: 'click', tx: Transaction): void }>()

const typeConfigs = { buy: { label: 'Buy', color: 'emerald', icon: '↗' }, sell: { label: 'Sell', color: 'red', icon: '↙' }, deposit: { label: 'Deposit', color: 'cyan', icon: '↓' }, withdraw: { label: 'Withdraw', color: 'amber', icon: '↑' }, transfer: { label: 'Transfer', color: 'violet', icon: '↔' } }
const statusConfigs = { completed: { label: 'Completed', color: 'emerald' }, pending: { label: 'Pending', color: 'amber' }, failed: { label: 'Failed', color: 'red' } }

const typeConfig = computed(() => typeConfigs[props.transaction.type])
const statusConfig = computed(() => statusConfigs[props.transaction.status])

const bgColor = computed(() => typeConfig.value.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' : typeConfig.value.color === 'red' ? 'rgba(239, 68, 68, 0.2)' : typeConfig.value.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' : typeConfig.value.color === 'amber' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.2)')
const textColor = computed(() => typeConfig.value.color === 'emerald' ? '#10B981' : typeConfig.value.color === 'red' ? '#EF4444' : typeConfig.value.color === 'cyan' ? '#06B6D4' : typeConfig.value.color === 'amber' ? '#F59E0B' : '#8B5CF6')

const containerClasses = computed(() => cn('rounded-2xl border p-5 cursor-pointer transition-all duration-200', props.isDark ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50' : 'bg-white border-slate-200 hover:bg-slate-50', props.size === 'sm' ? 'p-4' : props.size === 'lg' ? 'p-6' : 'p-5'))
const statusClasses = computed(() => props.transaction.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : props.transaction.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400')
const amountColorClass = computed(() => ['buy', 'deposit'].includes(props.transaction.type) ? 'text-emerald-400' : ['sell', 'withdraw'].includes(props.transaction.type) ? 'text-red-400' : props.isDark ? 'text-white' : 'text-slate-900')
const amountPrefix = computed(() => ['buy', 'deposit'].includes(props.transaction.type) ? '+' : ['sell', 'withdraw'].includes(props.transaction.type) ? '-' : '')

const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
const formatAmount = (amount: number, asset: string): string => amount >= 1000 ? \`\${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} \${asset}\` : \`\${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} \${asset}\`
const formatDate = (date: Date): string => { const now = new Date(); const diff = now.getTime() - date.getTime(); const hours = Math.floor(diff / 3600000); if (hours < 24) return \`\${hours}h ago\`; return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }

const handleClick = () => emit('click', props.transaction)
const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); emit('click', props.transaction) } }
</script>
`

export const VUE_PAYMENT_BUTTON = `<template>
  <button :class="cn(buttonClasses, className)" :disabled="disabled || isProcessing" @click="handleClick">
    <span v-if="isProcessing" class="absolute inset-0 flex items-center justify-center">
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
    </span>
    <span :class="{ 'opacity-0': isProcessing }">
      <slot>{{ defaultLabel }}</slot>
    </span>
    <svg v-if="showArrow && !isProcessing" class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; size?: 'sm' | 'md' | 'lg'; disabled?: boolean; showArrow?: boolean; className?: string }>(), { variant: 'primary', size: 'md', disabled: false, showArrow: false })
const emit = defineEmits<{ (e: 'click'): void }>()

const isProcessing = ref(false)

const variantStyles = {
  primary: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/25',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-white',
  outline: 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10',
  ghost: 'text-slate-400 hover:text-white hover:bg-slate-800'
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl'
}

const buttonClasses = computed(() => cn(
  'relative inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group',
  variantStyles[props.variant],
  sizeStyles[props.size]
))

const defaultLabel = computed(() => props.size === 'sm' ? 'Pay' : 'Pay Now')

const handleClick = async () => {
  isProcessing.value = true
  emit('click')
  setTimeout(() => { isProcessing.value = false }, 2000)
}
</script>
`

export const VUE_QUICK_TRADE_WIDGET = `<template>
  <div :class="cn('rounded-2xl border p-6', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div class="flex items-center justify-between mb-6">
      <h3 :class="cn('font-semibold text-lg', isDark ? 'text-white' : 'text-slate-900')">Quick Trade</h3>
      <div class="flex rounded-lg overflow-hidden border" :class="isDark ? 'border-slate-700' : 'border-slate-200'">
        <button @click="tradeType = 'buy'" :class="cn('px-4 py-2 text-sm font-medium transition-colors', tradeType === 'buy' ? 'bg-emerald-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">Buy</button>
        <button @click="tradeType = 'sell'" :class="cn('px-4 py-2 text-sm font-medium transition-colors', tradeType === 'sell' ? 'bg-red-500 text-white' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'))">Sell</button>
      </div>
    </div>
    <div class="space-y-4">
      <div>
        <label :class="cn('block text-sm font-medium mb-2', isDark ? 'text-slate-400' : 'text-slate-600')">Select Asset</label>
        <select v-model="selectedAsset" :class="cn('w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500', isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900')">
          <option v-for="asset in assets" :key="asset.symbol" :value="asset.symbol">{{ asset.symbol }} - {{ asset.name }}</option>
        </select>
      </div>
      <div>
        <label :class="cn('block text-sm font-medium mb-2', isDark ? 'text-slate-400' : 'text-slate-600')">Amount (USD)</label>
        <input v-model="amount" type="number" placeholder="Enter amount" :class="cn('w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500', isDark ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400')" />
      </div>
      <div :class="cn('p-4 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-50')">
        <div class="flex justify-between text-sm">
          <span :class="isDark ? 'text-slate-400' : 'text-slate-600'">You {{ tradeType === 'buy' ? 'receive' : 'pay' }}</span>
          <span :class="cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')">{{ estimatedAmount }} {{ selectedAsset }}</span>
        </div>
        <div class="flex justify-between text-sm mt-2">
          <span :class="isDark ? 'text-slate-400' : 'text-slate-600'">Fee</span>
          <span :class="isDark ? 'text-slate-400' : 'text-slate-600'">{{ fee }}%</span>
        </div>
      </div>
      <button @click="handleTrade" :class="cn('w-full py-4 rounded-xl font-semibold text-white transition-colors', tradeType === 'buy' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600')">{{ tradeType === 'buy' ? 'Buy' : 'Sell' }} {{ selectedAsset }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ className?: string; isDark?: boolean }>(), { isDark: true })
const emit = defineEmits<{ (e: 'trade', data: { type: string; asset: string; amount: number }): void }>()

const tradeType = ref<'buy' | 'sell'>('buy')
const selectedAsset = ref('BTC')
const amount = ref(100)
const fee = ref(0.5)

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67542.30 },
  { symbol: 'ETH', name: 'Ethereum', price: 3245.67 },
  { symbol: 'SOL', name: 'Solana', price: 178.92 },
]

const currentAsset = computed(() => assets.find(a => a.symbol === selectedAsset.value) || assets[0])
const estimatedAmount = computed(() => (amount.value / currentAsset.value.price).toFixed(6))

const handleTrade = () => emit('trade', { type: tradeType.value, asset: selectedAsset.value, amount: amount.value })
</script>
`

export const VUE_WATCHLIST_CARD = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-amber-500/20' : 'bg-amber-100')">
          <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Watchlist</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ liveAssets.length }} assets tracked</p>
        </div>
      </div>
      <button :class="cn('text-xs font-medium px-3 py-1.5 rounded-lg transition-colors', isDark ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-emerald-600 hover:bg-emerald-50')">+ Add</button>
    </div>
    <div :class="cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')">
      <div class="col-span-4">Asset</div><div class="col-span-3 text-right">Price</div><div class="col-span-2 text-right">24h</div><div class="col-span-3 text-right">Chart</div>
    </div>
    <div class="divide-y divide-slate-800/50">
      <div v-for="asset in liveAssets" :key="asset.id" @click="handleAssetClick(asset)" :class="cn('grid grid-cols-12 gap-2 items-center px-5 py-3 cursor-pointer transition-all duration-200', selectedAsset === asset.id ? (isDark ? 'bg-emerald-500/10' : 'bg-emerald-50') : (isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'))">
        <div class="col-span-4 flex items-center gap-3">
          <div :class="cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', isDark ? 'bg-slate-800' : 'bg-slate-100')"><span :class="isDark ? 'text-white' : 'text-slate-900'">{{ asset.symbol.charAt(0) }}</span></div>
          <div><p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ asset.symbol }}</p><p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ asset.name }}</p></div>
        </div>
        <div class="col-span-3 text-right"><p :class="cn('font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')">{{ formatPrice(asset.price) }}</p></div>
        <div class="col-span-2 text-right"><span :class="cn('inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold', asset.change24h >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')">{{ asset.change24h >= 0 ? '↑' : '↓' }}{{ Math.abs(asset.change24h).toFixed(2) }}%</span></div>
        <div class="col-span-3 flex justify-end"><MiniSparkline :data="asset.sparkline" :is-positive="asset.change24h >= 0" /></div>
      </div>
    </div>
    <div :class="cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')">
      <button :class="cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')">View All Markets →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '../lib/utils'
import MiniSparkline from './MiniSparkline.vue'

interface CryptoAsset { id: string; symbol: string; name: string; price: number; change24h: number; sparkline: number[] }
const props = withDefaults(defineProps<{ assets?: CryptoAsset[]; className?: string; isDark?: boolean }>(), { isDark: true })
const emit = defineEmits<{ (e: 'assetClick', asset: CryptoAsset): void }>()

const defaultAssets: CryptoAsset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change24h: 2.45, sparkline: [65000, 66200, 65800, 67000, 66500, 67200, 67542] },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3245.67, change24h: -1.23, sparkline: [3300, 3280, 3250, 3220, 3260, 3240, 3245] },
  { id: '3', symbol: 'SOL', name: 'Solana', price: 178.92, change24h: 5.67, sparkline: [165, 168, 172, 175, 173, 177, 178] },
]

const liveAssets = ref(props.assets || defaultAssets)
const selectedAsset = ref<string | null>(null)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    liveAssets.value = liveAssets.value.map(asset => {
      const change = (Math.random() - 0.5) * 0.002
      const newPrice = asset.price * (1 + change)
      return { ...asset, price: newPrice, sparkline: [...asset.sparkline.slice(1), newPrice] }
    })
  }, 3000)
})

onUnmounted(() => clearInterval(interval))

const formatPrice = (price: number): string => price >= 1000 ? \`$\${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\` : \`$\${price.toFixed(4)}\`
const handleAssetClick = (asset: CryptoAsset) => { selectedAsset.value = asset.id; emit('assetClick', asset) }
</script>
`


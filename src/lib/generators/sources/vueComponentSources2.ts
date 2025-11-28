// ============================================================================
// VUE 3 COMPONENT SOURCES PART 2 - More components
// ============================================================================

export const VUE_CHART_COMPONENT = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-blue-500/20' : 'bg-blue-100')">
          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ symbol }} Price Chart</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ timeframe }}</p>
        </div>
      </div>
      <div class="flex gap-1">
        <button v-for="tf in timeframes" :key="tf" @click="timeframe = tf" :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors', timeframe === tf ? 'bg-emerald-500/20 text-emerald-400' : (isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'))">{{ tf }}</button>
      </div>
    </div>
    <div class="p-5">
      <canvas ref="canvasRef" :style="{ width: '100%', height: height + 'px' }"></canvas>
    </div>
    <div :class="cn('grid grid-cols-4 gap-4 px-5 py-4 border-t', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div v-for="stat in stats" :key="stat.label">
        <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ stat.label }}</p>
        <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ symbol?: string; height?: number; className?: string; isDark?: boolean }>(), { symbol: 'BTC', height: 300, isDark: true })
const canvasRef = ref<HTMLCanvasElement | null>(null)
const timeframe = ref('1D')
const timeframes = ['1H', '4H', '1D', '1W', '1M']

const mockData = Array.from({ length: 50 }, (_, i) => 65000 + Math.random() * 5000 + Math.sin(i / 5) * 1000)
const stats = computed(() => [
  { label: 'Open', value: '$67,542.30' },
  { label: 'High', value: '$68,950.00' },
  { label: 'Low', value: '$65,230.50' },
  { label: 'Volume', value: '$28.5B' },
])

const drawChart = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = props.height * dpr
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, rect.width, props.height)

  const min = Math.min(...mockData)
  const max = Math.max(...mockData)
  const range = max - min || 1
  const stepX = rect.width / (mockData.length - 1)
  const padding = 20

  ctx.beginPath()
  ctx.strokeStyle = '#10B981'
  ctx.lineWidth = 2
  mockData.forEach((value, i) => {
    const x = i * stepX
    const y = props.height - padding - ((value - min) / range) * (props.height - padding * 2)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  const gradient = ctx.createLinearGradient(0, 0, 0, props.height)
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)')
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
  ctx.lineTo(rect.width, props.height)
  ctx.lineTo(0, props.height)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()
}

onMounted(() => drawChart())
watch(timeframe, () => drawChart())
</script>
`

export const VUE_CRYPTO_PRICE_TICKER = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Live Prices</h3>
      <span :class="cn('flex items-center gap-2 text-xs', isDark ? 'text-slate-500' : 'text-slate-500')"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Real-time</span>
    </div>
    <div class="relative overflow-hidden">
      <div class="flex animate-scroll gap-8 px-5 py-4" :style="{ animationDuration: '30s' }">
        <div v-for="(crypto, index) in [...cryptos, ...cryptos]" :key="index" class="flex items-center gap-4 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: crypto.color }">{{ crypto.symbol.charAt(0) }}</div>
            <div>
              <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ crypto.symbol }}</p>
              <p :class="cn('text-xs tabular-nums', isDark ? 'text-slate-400' : 'text-slate-600')">{{ formatPrice(crypto.price) }}</p>
            </div>
          </div>
          <span :class="cn('px-2 py-1 rounded-md text-xs font-semibold', crypto.change >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')">{{ crypto.change >= 0 ? '+' : '' }}{{ crypto.change.toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ className?: string; isDark?: boolean }>(), { isDark: true })

const cryptos = ref([
  { symbol: 'BTC', price: 67542.30, change: 2.45, color: '#F7931A' },
  { symbol: 'ETH', price: 3245.67, change: -1.23, color: '#627EEA' },
  { symbol: 'SOL', price: 178.92, change: 5.67, color: '#14F195' },
  { symbol: 'XRP', price: 0.6234, change: 0.89, color: '#00AAE4' },
  { symbol: 'ADA', price: 0.4521, change: -2.15, color: '#0033AD' },
])

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    cryptos.value = cryptos.value.map(c => ({
      ...c,
      price: c.price * (1 + (Math.random() - 0.5) * 0.002),
      change: c.change + (Math.random() - 0.5) * 0.1
    }))
  }, 2000)
})

onUnmounted(() => clearInterval(interval))

const formatPrice = (price: number): string => price >= 1 ? \`$\${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\` : \`$\${price.toFixed(4)}\`
</script>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll { animation: scroll linear infinite; }
</style>
`

export const VUE_ORDER_BOOK = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-purple-500/20' : 'bg-purple-100')">
          <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Order Book</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ symbol }}</p>
        </div>
      </div>
      <div class="flex gap-1">
        <button v-for="v in ['both', 'bids', 'asks']" :key="v" @click="view = v as any" :class="cn('px-2 py-1 text-xs rounded transition-colors capitalize', view === v ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') : (isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'))">{{ v }}</button>
      </div>
    </div>
    <div :class="cn('grid grid-cols-3 gap-2 px-5 py-2 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')">
      <div>Price (USDT)</div><div class="text-right">Amount</div><div class="text-right">Total</div>
    </div>
    <div class="max-h-60 overflow-y-auto">
      <div v-if="view !== 'bids'" class="space-y-0.5 p-2">
        <div v-for="(order, i) in asks" :key="'ask-' + i" class="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs">
          <div class="absolute inset-0 bg-red-500/10" :style="{ width: order.depth + '%' }"></div>
          <span class="relative text-red-400 font-medium">{{ formatPrice(order.price) }}</span>
          <span class="relative text-right" :class="isDark ? 'text-slate-300' : 'text-slate-700'">{{ order.amount.toFixed(4) }}</span>
          <span class="relative text-right" :class="isDark ? 'text-slate-500' : 'text-slate-500'">{{ formatCurrency(order.total) }}</span>
        </div>
      </div>
      <div :class="cn('px-5 py-3 text-center border-y', isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50')">
        <p :class="cn('font-bold text-lg', isDark ? 'text-white' : 'text-slate-900')">{{ formatPrice(currentPrice) }}</p>
        <p :class="cn('text-xs', spreadPct >= 0 ? 'text-emerald-400' : 'text-red-400')">Spread: {{ spreadPct.toFixed(3) }}%</p>
      </div>
      <div v-if="view !== 'asks'" class="space-y-0.5 p-2">
        <div v-for="(order, i) in bids" :key="'bid-' + i" class="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs">
          <div class="absolute inset-0 bg-emerald-500/10" :style="{ width: order.depth + '%' }"></div>
          <span class="relative text-emerald-400 font-medium">{{ formatPrice(order.price) }}</span>
          <span class="relative text-right" :class="isDark ? 'text-slate-300' : 'text-slate-700'">{{ order.amount.toFixed(4) }}</span>
          <span class="relative text-right" :class="isDark ? 'text-slate-500' : 'text-slate-500'">{{ formatCurrency(order.total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ symbol?: string; className?: string; isDark?: boolean }>(), { symbol: 'BTC/USDT', isDark: true })

const view = ref<'both' | 'bids' | 'asks'>('both')
const currentPrice = ref(67542.30)

const generateOrders = (basePrice: number, isAsk: boolean) => {
  return Array.from({ length: 8 }, (_, i) => {
    const offset = (i + 1) * (Math.random() * 10 + 5)
    const price = isAsk ? basePrice + offset : basePrice - offset
    const amount = Math.random() * 2 + 0.1
    return { price, amount, total: price * amount, depth: Math.random() * 100 }
  })
}

const asks = ref(generateOrders(currentPrice.value, true))
const bids = ref(generateOrders(currentPrice.value, false))

const spreadPct = computed(() => {
  if (asks.value.length === 0 || bids.value.length === 0) return 0
  return ((asks.value[0].price - bids.value[0].price) / currentPrice.value) * 100
})

let interval: ReturnType<typeof setInterval>
onMounted(() => {
  interval = setInterval(() => {
    currentPrice.value *= (1 + (Math.random() - 0.5) * 0.001)
    asks.value = generateOrders(currentPrice.value, true)
    bids.value = generateOrders(currentPrice.value, false)
  }, 2000)
})
onUnmounted(() => clearInterval(interval))

const formatPrice = (price: number): string => price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const formatCurrency = (value: number): string => value >= 1000 ? \`\${(value / 1000).toFixed(2)}K\` : value.toFixed(2)
</script>
`

export const VUE_PORTFOLIO_DONUT = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-pink-500/20' : 'bg-pink-100')">
          <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Portfolio Allocation</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ localAssets.length }} assets</p>
        </div>
      </div>
    </div>
    <div class="p-5 flex items-center gap-6">
      <div class="relative">
        <svg :width="size" :height="size" :viewBox="\`0 0 \${size} \${size}\`">
          <g v-for="(segment, i) in segments" :key="i" @mouseenter="hoveredIndex = i" @mouseleave="hoveredIndex = null" class="cursor-pointer transition-all duration-200" :style="{ transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)', transformOrigin: 'center' }">
            <path :d="segment.path" :fill="segment.color" :stroke="isDark ? '#0f172a' : '#ffffff'" stroke-width="2" />
          </g>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center flex-col">
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Total Value</p>
          <p :class="cn('font-bold text-lg', isDark ? 'text-white' : 'text-slate-900')">{{ formatCurrency(totalValue) }}</p>
        </div>
      </div>
      <div class="flex-1 space-y-3">
        <div v-for="(asset, i) in localAssets" :key="asset.symbol" @mouseenter="hoveredIndex = i" @mouseleave="hoveredIndex = null" :class="cn('flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors', hoveredIndex === i ? (isDark ? 'bg-slate-800' : 'bg-slate-100') : '')">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: asset.color }"></div>
            <span :class="cn('font-medium text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ asset.symbol }}</span>
          </div>
          <div class="text-right">
            <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ asset.percentage.toFixed(1) }}%</p>
            <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ formatCurrency(asset.value) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

interface Asset { symbol: string; value: number; percentage: number; color: string }
const props = withDefaults(defineProps<{ assets?: Asset[]; totalValue?: number; className?: string; isDark?: boolean }>(), { totalValue: 100000, isDark: true })

const defaultAssets: Asset[] = [
  { symbol: 'BTC', value: 45000, percentage: 45, color: '#F7931A' },
  { symbol: 'ETH', value: 25000, percentage: 25, color: '#627EEA' },
  { symbol: 'SOL', value: 15000, percentage: 15, color: '#14F195' },
  { symbol: 'Others', value: 15000, percentage: 15, color: '#8B5CF6' },
]

const localAssets = ref(props.assets || defaultAssets)
const hoveredIndex = ref<number | null>(null)
const size = 160
const radius = 60
const innerRadius = 40

const segments = computed(() => {
  let currentAngle = -90
  return localAssets.value.map((asset) => {
    const angle = (asset.percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const cx = size / 2
    const cy = size / 2
    const largeArc = angle > 180 ? 1 : 0

    const x1 = cx + radius * Math.cos(startRad)
    const y1 = cy + radius * Math.sin(startRad)
    const x2 = cx + radius * Math.cos(endRad)
    const y2 = cy + radius * Math.sin(endRad)
    const x3 = cx + innerRadius * Math.cos(endRad)
    const y3 = cy + innerRadius * Math.sin(endRad)
    const x4 = cx + innerRadius * Math.cos(startRad)
    const y4 = cy + innerRadius * Math.sin(startRad)

    return {
      path: \`M \${x1} \${y1} A \${radius} \${radius} 0 \${largeArc} 1 \${x2} \${y2} L \${x3} \${y3} A \${innerRadius} \${innerRadius} 0 \${largeArc} 0 \${x4} \${y4} Z\`,
      color: asset.color
    }
  })
})

const formatCurrency = (value: number): string => value >= 1000 ? \`$\${(value / 1000).toFixed(1)}K\` : \`$\${value.toFixed(2)}\`
</script>
`

export const VUE_MARKET_STATS = `<template>
  <div :class="cn('flex flex-wrap gap-4', className)">
    <div v-for="stat in stats" :key="stat.label" :class="cn('flex items-center gap-3 px-4 py-2 rounded-xl', isDark ? 'bg-slate-800/50' : 'bg-slate-100')">
      <div>
        <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ stat.label }}</p>
        <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ stat.value }}</p>
      </div>
      <span v-if="stat.change !== undefined" :class="cn('text-xs font-medium', stat.change >= 0 ? 'text-emerald-400' : 'text-red-400')">{{ stat.change >= 0 ? '+' : '' }}{{ stat.change.toFixed(2) }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ pair?: string; className?: string; isDark?: boolean }>(), { pair: 'BTC/USDT', isDark: true })

const stats = computed(() => [
  { label: '24h High', value: '$68,950.00', change: 2.1 },
  { label: '24h Low', value: '$65,230.50', change: -1.5 },
  { label: '24h Volume', value: '$28.5B', change: 15.3 },
  { label: 'Market Cap', value: '$1.32T', change: 2.45 },
])
</script>
`

export const VUE_TRANSACTION_HISTORY = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-blue-500/20' : 'bg-blue-100')">
          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">Transaction History</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ filteredTransactions.length }} transactions</p>
        </div>
      </div>
      <button :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Export
      </button>
    </div>
    <div v-if="showFilters" :class="cn('px-5 py-3 border-b flex flex-wrap gap-3', isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50')">
      <div class="flex items-center gap-1">
        <button v-for="type in ['all', 'buy', 'sell', 'deposit', 'withdraw', 'transfer']" :key="type" @click="filter = type as any" :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize', filter === type ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') : (isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'))">{{ type }}</button>
      </div>
    </div>
    <div class="divide-y divide-slate-800/50 max-h-[500px] overflow-y-auto">
      <div v-if="filteredTransactions.length === 0" :class="cn('px-5 py-12 text-center', isDark ? 'text-slate-500' : 'text-slate-500')">
        <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <p>No transactions found</p>
      </div>
      <div v-else v-for="tx in filteredTransactions" :key="tx.id" @click="emit('transactionClick', tx)" :class="cn('flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-200', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: getTypeConfig(tx.type).bgColor }">
            <span :style="{ color: getTypeConfig(tx.type).textColor }">{{ getTypeConfig(tx.type).icon }}</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ getTypeConfig(tx.type).label }} {{ tx.asset }}</p>
              <span :class="cn('px-2 py-0.5 text-xs font-medium rounded-full', getStatusClasses(tx.status))">{{ tx.status }}</span>
            </div>
            <p :class="cn('text-xs mt-0.5', isDark ? 'text-slate-500' : 'text-slate-500')">{{ formatDate(tx.timestamp) }}</p>
          </div>
        </div>
        <div class="text-right">
          <p :class="cn('font-semibold text-sm tabular-nums', getAmountClass(tx.type))">{{ getAmountPrefix(tx.type) }}{{ formatAmount(tx.amount, tx.asset) }}</p>
          <p :class="cn('text-xs tabular-nums', isDark ? 'text-slate-500' : 'text-slate-500')">{{ formatCurrency(tx.value) }}</p>
        </div>
      </div>
    </div>
    <div v-if="filteredTransactions.length > 0" :class="cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')">
      <button :class="cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')">Load More Transactions →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../lib/utils'

interface Transaction { id: string; type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'; asset: string; amount: number; value: number; fee: number; status: 'completed' | 'pending' | 'failed'; timestamp: Date }
const props = withDefaults(defineProps<{ transactions?: Transaction[]; className?: string; isDark?: boolean; showFilters?: boolean }>(), { isDark: true, showFilters: true })
const emit = defineEmits<{ (e: 'transactionClick', tx: Transaction): void }>()

const defaultTransactions: Transaction[] = [
  { id: '1', type: 'buy', asset: 'BTC', amount: 0.05, value: 3377.11, fee: 3.38, status: 'completed', timestamp: new Date(Date.now() - 300000) },
  { id: '2', type: 'sell', asset: 'ETH', amount: 2.5, value: 8000, fee: 8.00, status: 'completed', timestamp: new Date(Date.now() - 3600000) },
  { id: '3', type: 'deposit', asset: 'USDT', amount: 5000, value: 5000, fee: 0, status: 'completed', timestamp: new Date(Date.now() - 7200000) },
  { id: '4', type: 'withdraw', asset: 'SOL', amount: 25, value: 4500, fee: 0.5, status: 'pending', timestamp: new Date(Date.now() - 14400000) },
]

const localTransactions = ref(props.transactions || defaultTransactions)
const filter = ref<'all' | 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'>('all')

const filteredTransactions = computed(() => filter.value === 'all' ? localTransactions.value : localTransactions.value.filter(tx => tx.type === filter.value))

const getTypeConfig = (type: string) => {
  const configs: Record<string, { label: string; icon: string; bgColor: string; textColor: string }> = {
    buy: { label: 'Buy', icon: '↗', bgColor: 'rgba(16, 185, 129, 0.2)', textColor: '#10B981' },
    sell: { label: 'Sell', icon: '↙', bgColor: 'rgba(239, 68, 68, 0.2)', textColor: '#EF4444' },
    deposit: { label: 'Deposit', icon: '↓', bgColor: 'rgba(6, 182, 212, 0.2)', textColor: '#06B6D4' },
    withdraw: { label: 'Withdraw', icon: '↑', bgColor: 'rgba(245, 158, 11, 0.2)', textColor: '#F59E0B' },
    transfer: { label: 'Transfer', icon: '↔', bgColor: 'rgba(139, 92, 246, 0.2)', textColor: '#8B5CF6' }
  }
  return configs[type] || configs.transfer
}

const getStatusClasses = (status: string): string => status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
const getAmountClass = (type: string): string => ['buy', 'deposit'].includes(type) ? 'text-emerald-400' : ['sell', 'withdraw'].includes(type) ? 'text-red-400' : props.isDark ? 'text-white' : 'text-slate-900'
const getAmountPrefix = (type: string): string => ['buy', 'deposit'].includes(type) ? '+' : ['sell', 'withdraw'].includes(type) ? '-' : ''

const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
const formatAmount = (amount: number, asset: string): string => \`\${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} \${asset}\`
const formatDate = (date: Date): string => { const diff = Date.now() - date.getTime(); const hours = Math.floor(diff / 3600000); if (hours < 24) return \`\${hours}h ago\`; return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
</script>
`

export const VUE_MARKET_TABLE = `<template>
  <div :class="cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)">
    <div :class="cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')">
      <div class="flex items-center gap-3">
        <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-emerald-500/20' : 'bg-emerald-100')">
          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <div>
          <h3 :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">All Cryptocurrencies</h3>
          <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ sortedAssets.length }} assets</p>
        </div>
      </div>
      <div :class="cn('flex items-center gap-2 px-3 py-2 rounded-lg border', isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200')">
        <svg :class="cn('w-4 h-4', isDark ? 'text-slate-500' : 'text-slate-400')" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input v-model="searchQuery" type="text" placeholder="Search..." :class="cn('bg-transparent outline-none text-sm w-32', isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400')" />
      </div>
    </div>
    <div :class="cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')">
      <button @click="handleSort('rank')" class="col-span-1 text-left flex items-center gap-1 hover:text-slate-300"># <span v-if="sortBy === 'rank'">{{ sortOrder === 'desc' ? '↓' : '↑' }}</span></button>
      <div class="col-span-2 text-left">Name</div>
      <button @click="handleSort('price')" class="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">Price <span v-if="sortBy === 'price'">{{ sortOrder === 'desc' ? '↓' : '↑' }}</span></button>
      <div class="col-span-1 text-right">1h %</div>
      <button @click="handleSort('change24h')" class="col-span-1 text-right flex items-center justify-end gap-1 hover:text-slate-300">24h % <span v-if="sortBy === 'change24h'">{{ sortOrder === 'desc' ? '↓' : '↑' }}</span></button>
      <div class="col-span-1 text-right">7d %</div>
      <button @click="handleSort('marketCap')" class="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">Market Cap <span v-if="sortBy === 'marketCap'">{{ sortOrder === 'desc' ? '↓' : '↑' }}</span></button>
      <div class="col-span-2 text-right">Last 7 Days</div>
    </div>
    <div class="divide-y divide-slate-800/50">
      <div v-for="asset in paginatedAssets" :key="asset.id" @click="emit('assetClick', asset)" :class="cn('grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')">
        <div :class="cn('col-span-1 text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-500')">{{ asset.rank }}</div>
        <div class="col-span-2 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: asset.color }">{{ asset.symbol.charAt(0) }}</div>
          <div>
            <p :class="cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')">{{ asset.name }}</p>
            <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">{{ asset.symbol }}</p>
          </div>
        </div>
        <div :class="cn('col-span-2 text-right font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')">{{ formatPrice(asset.price) }}</div>
        <div :class="cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change1h >= 0 ? 'text-emerald-400' : 'text-red-400')">{{ asset.change1h >= 0 ? '+' : '' }}{{ asset.change1h.toFixed(2) }}%</div>
        <div :class="cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400')">{{ asset.change24h >= 0 ? '+' : '' }}{{ asset.change24h.toFixed(2) }}%</div>
        <div :class="cn('col-span-1 text-right text-sm font-medium tabular-nums', asset.change7d >= 0 ? 'text-emerald-400' : 'text-red-400')">{{ asset.change7d >= 0 ? '+' : '' }}{{ asset.change7d.toFixed(2) }}%</div>
        <div :class="cn('col-span-2 text-right text-sm tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')">{{ formatCurrency(asset.marketCap) }}</div>
        <div class="col-span-2 flex justify-end"><MiniSparkline :data="asset.sparkline" :is-positive="asset.change7d >= 0" /></div>
      </div>
    </div>
    <div v-if="showPagination && totalPages > 1" :class="cn('flex items-center justify-between px-5 py-3 border-t', isDark ? 'border-slate-800' : 'border-slate-100')">
      <p :class="cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, sortedAssets.length) }} of {{ sortedAssets.length }}</p>
      <div class="flex items-center gap-2">
        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')">Previous</button>
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="cn('w-8 h-8 text-xs font-medium rounded-lg transition-colors', currentPage === page ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'))">{{ page }}</button>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" :class="cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '../lib/utils'
import MiniSparkline from './MiniSparkline.vue'

interface MarketAsset { id: string; rank: number; symbol: string; name: string; price: number; change1h: number; change24h: number; change7d: number; marketCap: number; sparkline: number[]; color: string }
const props = withDefaults(defineProps<{ className?: string; isDark?: boolean; showPagination?: boolean }>(), { isDark: true, showPagination: true })
const emit = defineEmits<{ (e: 'assetClick', asset: MarketAsset): void }>()

const defaultAssets: MarketAsset[] = [
  { id: '1', rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change1h: 0.15, change24h: 2.45, change7d: 5.23, marketCap: 1320000000000, sparkline: [65000, 66200, 65800, 67000, 66500, 67200, 67542], color: '#F7931A' },
  { id: '2', rank: 2, symbol: 'ETH', name: 'Ethereum', price: 3245.67, change1h: -0.05, change24h: -1.23, change7d: 3.45, marketCap: 390000000000, sparkline: [3100, 3150, 3200, 3180, 3220, 3240, 3245], color: '#627EEA' },
  { id: '3', rank: 3, symbol: 'USDT', name: 'Tether', price: 1.00, change1h: 0.00, change24h: 0.01, change7d: 0.00, marketCap: 95000000000, sparkline: [1, 1, 1, 1, 1, 1, 1], color: '#26A17B' },
  { id: '4', rank: 4, symbol: 'BNB', name: 'BNB', price: 598.45, change1h: 0.32, change24h: 1.87, change7d: -2.15, marketCap: 89000000000, sparkline: [580, 590, 585, 595, 600, 595, 598], color: '#F3BA2F' },
  { id: '5', rank: 5, symbol: 'SOL', name: 'Solana', price: 178.92, change1h: 0.85, change24h: 5.67, change7d: 12.34, marketCap: 78000000000, sparkline: [155, 160, 165, 170, 175, 177, 178], color: '#14F195' },
]

const assets = ref(defaultAssets)
const sortBy = ref<'rank' | 'price' | 'change24h' | 'marketCap'>('rank')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

let interval: ReturnType<typeof setInterval>
onMounted(() => {
  interval = setInterval(() => {
    assets.value = assets.value.map(a => ({ ...a, price: a.price * (1 + (Math.random() - 0.5) * 0.002), change1h: a.change1h + (Math.random() - 0.5) * 0.1 }))
  }, 5000)
})
onUnmounted(() => clearInterval(interval))

const filteredAssets = computed(() => assets.value.filter(a => a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || a.symbol.toLowerCase().includes(searchQuery.value.toLowerCase())))
const sortedAssets = computed(() => {
  const sorted = [...filteredAssets.value]
  sorted.sort((a, b) => {
    let cmp = 0
    if (sortBy.value === 'rank') cmp = a.rank - b.rank
    else if (sortBy.value === 'price') cmp = a.price - b.price
    else if (sortBy.value === 'change24h') cmp = a.change24h - b.change24h
    else if (sortBy.value === 'marketCap') cmp = a.marketCap - b.marketCap
    return sortOrder.value === 'desc' ? -cmp : cmp
  })
  return sorted
})
const totalPages = computed(() => Math.ceil(sortedAssets.value.length / itemsPerPage))
const paginatedAssets = computed(() => sortedAssets.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage))

const handleSort = (column: typeof sortBy.value) => {
  if (sortBy.value === column) sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  else { sortBy.value = column; sortOrder.value = 'desc' }
}

const formatPrice = (price: number): string => price >= 1 ? \`$\${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\` : \`$\${price.toFixed(6)}\`
const formatCurrency = (value: number): string => value >= 1e12 ? \`$\${(value / 1e12).toFixed(2)}T\` : value >= 1e9 ? \`$\${(value / 1e9).toFixed(2)}B\` : \`$\${(value / 1e6).toFixed(2)}M\`
</script>
`

export const VUE_SECURITY_MODAL = `<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" @click="emit('close')"></div>
      <div ref="modalRef" :class="cn('relative w-full max-w-md rounded-2xl border p-6 shadow-2xl', isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200')" role="dialog" aria-modal="true">
        <button @click="emit('close')" :class="cn('absolute top-4 right-4 p-2 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div class="flex flex-col items-center text-center">
          <div :class="cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4', isDark ? 'bg-amber-500/20' : 'bg-amber-100')">
            <svg class="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 :class="cn('text-xl font-bold mb-2', isDark ? 'text-white' : 'text-slate-900')">{{ title }}</h2>
          <p :class="cn('text-sm mb-6', isDark ? 'text-slate-400' : 'text-slate-600')">{{ message }}</p>
          <div class="w-full space-y-3">
            <button @click="emit('confirm')" :class="cn('w-full py-3 px-4 rounded-xl font-semibold text-white transition-colors', confirmVariant === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600')">{{ confirmText }}</button>
            <button @click="emit('close')" :class="cn('w-full py-3 px-4 rounded-xl font-semibold transition-colors', isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200')">{{ cancelText }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { cn } from '../lib/utils'

const props = withDefaults(defineProps<{ isOpen: boolean; title?: string; message?: string; confirmText?: string; cancelText?: string; confirmVariant?: 'default' | 'danger'; isDark?: boolean }>(), { title: 'Security Verification', message: 'Please confirm this action to proceed.', confirmText: 'Confirm', cancelText: 'Cancel', confirmVariant: 'default', isDark: true })
const emit = defineEmits<{ (e: 'close'): void; (e: 'confirm'): void }>()

const modalRef = ref<HTMLElement | null>(null)

watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
    document.addEventListener('keydown', handleEscape)
    onUnmounted(() => document.removeEventListener('keydown', handleEscape))
  } else {
    document.body.style.overflow = 'unset'
  }
})
</script>
`

export const VUE_PROFILE_SIDE_MENU = `<template>
  <Teleport to="body">
    <div :class="cn('fixed inset-0 z-50 transition-opacity duration-300', isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')" @click="emit('close')">
      <div :class="cn('absolute inset-0', isDark ? 'bg-slate-950/80 backdrop-blur-sm' : 'bg-slate-900/80 backdrop-blur-sm')"></div>
    </div>
    <div :class="cn('fixed top-0 right-0 h-full w-full sm:w-96 max-w-sm z-50 transform transition-transform duration-300 ease-out shadow-2xl', isDark ? 'bg-slate-900' : 'bg-white', isOpen ? 'translate-x-0' : 'translate-x-full')">
      <div :class="cn('flex items-center justify-between p-6 border-b', isDark ? 'border-slate-800' : 'border-slate-200')">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><span class="text-white text-sm font-bold">A</span></div>
          <div>
            <h3 :class="cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')">Alex Chen</h3>
            <p :class="cn('text-xs', isDark ? 'text-emerald-400' : 'text-emerald-600')">Pro Account</p>
          </div>
        </div>
        <button @click="emit('close')" :class="cn('p-2 rounded-lg transition-colors', isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="overflow-y-auto h-[calc(100vh-120px)] pb-20">
        <div class="p-4 space-y-1">
          <div class="mb-4">
            <p :class="cn('text-xs font-semibold uppercase tracking-wider px-3 py-2', isDark ? 'text-slate-500' : 'text-slate-500')">Navigation</p>
            <div class="mt-2 space-y-1">
              <button v-for="item in navItems" :key="item.id" @click="handleNavClick(item.id)" :class="cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200', currentPage === item.id ? (isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border border-emerald-200') : (isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'))">
                <span :class="currentPage === item.id ? 'opacity-100' : 'opacity-70'">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
                <svg v-if="currentPage === item.id" class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div :class="cn('h-px my-4', isDark ? 'bg-slate-800' : 'bg-slate-200')"></div>
          <div>
            <p :class="cn('text-xs font-semibold uppercase tracking-wider px-3 py-2', isDark ? 'text-slate-500' : 'text-slate-500')">Account</p>
            <div class="mt-2 space-y-1">
              <button v-for="item in accountItems" :key="item.id" @click="handleNavClick(item.id)" :class="cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200', item.id === 'logout' ? (isDark ? 'text-rose-400 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50') : (isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'))">
                <span class="opacity-70">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
                <svg class="w-4 h-4 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div :class="cn('absolute bottom-0 left-0 right-0 p-4 border-t', isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200')">
        <div :class="cn('flex items-center gap-2 px-4 py-2 rounded-lg', isDark ? 'bg-slate-800/50' : 'bg-slate-100')">
          <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <p :class="cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-600')">All systems operational</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { cn } from '../lib/utils'

interface NavItem { id: string; label: string; icon: string }
const props = defineProps<{ isOpen: boolean; isDark: boolean; currentPage: string; navItems: NavItem[] }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'navigate', page: string): void }>()

const accountItems = [
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'help', label: 'Help & Support', icon: '❓' },
  { id: 'logout', label: 'Log Out', icon: '🚪' }
]

const handleNavClick = (pageId: string) => {
  if (pageId === 'logout') console.log('Logout clicked')
  else emit('navigate', pageId)
  emit('close')
}

watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
    document.addEventListener('keydown', handleEscape)
    onUnmounted(() => document.removeEventListener('keydown', handleEscape))
  } else {
    document.body.style.overflow = 'unset'
  }
})
</script>
`


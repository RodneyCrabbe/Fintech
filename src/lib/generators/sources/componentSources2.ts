// ============================================================================
// EMBEDDED COMPONENT SOURCE CODE - Part 2 (ChartComponent - PortfolioDonut)
// ============================================================================

export const CHART_COMPONENT_SOURCE = `import React, { useMemo, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface ChartDataPoint { label: string; value: number; color?: string; }

interface ChartProps extends VariantProps<typeof chartVariants> {
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area' | 'pie';
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
}

const chartVariants = cva(
  'relative w-full rounded-lg border bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500',
  {
    variants: {
      variant: {
        default: 'border-gray-200 shadow-sm',
        outline: 'border-2 border-blue-200 shadow-none',
        ghost: 'border-transparent shadow-none bg-gray-50/50',
      },
      size: {
        sm: 'h-64 p-4',
        md: 'h-80 p-6',
        lg: 'h-96 p-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

const Chart: React.FC<ChartProps> = ({ data, type, title, subtitle, showGrid = true, showLegend = true, showTooltip = true, animated = true, variant, size, className, ...props }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const primaryColor = '#1E40AF';
  const colorPalette = [primaryColor, '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#EF4444', '#F59E0B', '#10B981'];

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width - 32, height: rect.height - (title || subtitle ? 80 : 40) });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [title, subtitle]);

  const processedData = useMemo(() => data.map((item, index) => ({ ...item, color: item.color || colorPalette[index % colorPalette.length] })), [data]);
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.value)), [data]);

  const renderLineChart = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;
    const padding = 40;
    const chartWidth = dimensions.width - padding * 2;
    const chartHeight = dimensions.height - padding * 2;
    const stepX = chartWidth / Math.max(processedData.length - 1, 1);

    const points = processedData.map((item, index) => {
      const x = padding + index * stepX;
      const y = padding + chartHeight - ((item.value - minValue) / (maxValue - minValue || 1)) * chartHeight;
      return { x, y, ...item };
    });

    const pathData = points.map((point, index) => \\\`\\\${index === 0 ? 'M' : 'L'} \\\${point.x} \\\${point.y}\\\`).join(' ');

    return (
      <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
        {showGrid ? (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return <line key={\\\`grid-\\\${i}\\\`} x1={padding} y1={y} x2={dimensions.width - padding} y2={y} stroke="#9CA3AF" strokeWidth="1" />;
            })}
          </g>
        ) : null}
        <path d={pathData} fill="none" stroke={primaryColor} strokeWidth="3" className={animated ? 'animate-pulse' : ''} />
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={hoveredIndex === index ? 6 : 4} fill={primaryColor} className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => showTooltip ? setHoveredIndex(index) : null} onMouseLeave={() => setHoveredIndex(null)} role="button" tabIndex={0} />
        ))}
      </svg>
    );
  };

  const renderBarChart = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;
    const padding = 40;
    const chartWidth = dimensions.width - padding * 2;
    const chartHeight = dimensions.height - padding * 2;
    const barWidth = chartWidth / processedData.length * 0.8;
    const barSpacing = chartWidth / processedData.length * 0.2;

    return (
      <svg width={dimensions.width} height={dimensions.height}>
        {showGrid ? (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return <line key={\\\`grid-\\\${i}\\\`} x1={padding} y1={y} x2={dimensions.width - padding} y2={y} stroke="#9CA3AF" strokeWidth="1" />;
            })}
          </g>
        ) : null}
        {processedData.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = padding + index * (barWidth + barSpacing);
          const y = dimensions.height - padding - barHeight;
          return (
            <rect key={index} x={x} y={y} width={barWidth} height={barHeight} fill={item.color}
              className={\\\`cursor-pointer transition-all duration-200 \\\${hoveredIndex === index ? 'opacity-80' : 'opacity-100'} \\\${animated ? 'animate-pulse' : ''}\\\`}
              onMouseEnter={() => showTooltip ? setHoveredIndex(index) : null} onMouseLeave={() => setHoveredIndex(null)} />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    if (type === 'line') return renderLineChart();
    if (type === 'bar') return renderBarChart();
    return renderLineChart();
  };

  return (
    <div ref={chartRef} className={cn(chartVariants({ variant, size }), className)} role="img" aria-label={title || 'Chart'} {...props}>
      {(title || subtitle) ? (
        <div className="mb-4">
          {title ? <h3 className="text-lg font-semibold text-gray-900">{title}</h3> : null}
          {subtitle ? <p className="text-sm text-gray-600 mt-1">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="w-full h-full flex items-center justify-center">{renderChart()}</div>
      {showLegend && processedData.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {processedData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Chart;
`

export const CRYPTO_PRICE_TICKER_SOURCE = `import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface CryptoData { symbol: string; name: string; price: number; change24h: number; changePercent24h: number; }

const cryptoTickerVariants = cva(
  "inline-flex items-center justify-between rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border-slate-200 shadow-sm hover:shadow-md",
        outline: "border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50",
        ghost: "border-transparent bg-transparent text-slate-900 hover:bg-slate-100"
      },
      size: {
        sm: "px-3 py-2 text-xs gap-2 min-w-[200px]",
        md: "px-4 py-3 text-sm gap-3 min-w-[280px]",
        lg: "px-6 py-4 text-base gap-4 min-w-[320px]"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);

const iconSizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
const priceSizeMap = { sm: "text-sm font-semibold", md: "text-lg font-bold", lg: "text-xl font-bold" };

interface CryptoPriceTickerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cryptoTickerVariants> {
  symbol: string;
  name?: string;
  refreshInterval?: number;
  showIcon?: boolean;
  showName?: boolean;
  onPriceUpdate?: (data: CryptoData) => void;
  initialPrice?: number;
  mockData?: boolean;
}

const generateMockData = (symbol: string, name?: string, currentPrice?: number): CryptoData => {
  const basePrice = currentPrice || Math.random() * 50000 + 1000;
  const changePercent = (Math.random() - 0.5) * 10;
  const change24h = basePrice * (changePercent / 100);
  return { symbol: symbol.toUpperCase(), name: name || \\\`\\\${symbol} Coin\\\`, price: basePrice + (Math.random() - 0.5) * 100, change24h, changePercent24h: changePercent };
};

const CryptoPriceTicker: React.FC<CryptoPriceTickerProps> = ({ className, variant, size = "md", symbol, name, refreshInterval = 30000, showIcon = true, showName = false, onPriceUpdate, initialPrice, mockData = true, ...props }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchCryptoData = async () => {
    try {
      setError(null);
      if (mockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = generateMockData(symbol, name, cryptoData?.price || initialPrice);
        setCryptoData(data);
        onPriceUpdate?.(data);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        throw new Error('Real API not implemented');
      }
    } catch (err) {
      setError('Failed to fetch price data');
      console.error('Error fetching crypto data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, refreshInterval);
    return () => clearInterval(interval);
  }, [symbol, refreshInterval]);

  const formatPrice = (price: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: price < 1 ? 6 : 2 }).format(price);
  const formatPercentage = (percent: number): string => \\\`\\\${percent >= 0 ? '+' : ''}\\\${percent.toFixed(2)}%\\\`;

  if (isLoading && !cryptoData) {
    return (
      <div className={cn(cryptoTickerVariants({ variant, size, className }))} role="status">
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full bg-slate-300 animate-pulse", iconSizeMap[size!])} />
          <div className="space-y-1">
            <div className="h-3 bg-slate-300 rounded animate-pulse w-16" />
            <div className="h-2 bg-slate-300 rounded animate-pulse w-12" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="h-4 bg-slate-300 rounded animate-pulse w-20" />
          <div className="h-3 bg-slate-300 rounded animate-pulse w-16" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(cryptoTickerVariants({ variant, size, className }), "border-red-200 bg-red-50")} role="alert">
        <div className="flex items-center gap-2 text-red-600">
          <svg className={cn("fill-current", iconSizeMap[size!])} viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          <span className="text-sm">Error loading data</span>
        </div>
      </div>
    );
  }

  if (!cryptoData) return null;

  return (
    <div className={cn(cryptoTickerVariants({ variant, size }), isAnimating ? 'scale-105 transition-transform duration-300' : '', className)} {...props}>
      <div className="flex items-center gap-3">
        {showIcon ? (
          <div className={cn("rounded-full bg-slate-200 flex items-center justify-center", iconSizeMap[size!])}>
            <span className="text-xs font-bold">{cryptoData.symbol.charAt(0)}</span>
          </div>
        ) : null}
        <div className="flex flex-col">
          <span className={cn("font-semibold", priceSizeMap[size!])}>{cryptoData.symbol}</span>
          {showName ? <span className="text-xs text-slate-600">{cryptoData.name}</span> : null}
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-bold", priceSizeMap[size!])}>{formatPrice(cryptoData.price)}</div>
        <div className={cn("text-xs", cryptoData.changePercent24h >= 0 ? "text-green-600" : "text-red-600")}>{formatPercentage(cryptoData.changePercent24h)}</div>
      </div>
    </div>
  );
};

export default CryptoPriceTicker;
`

export const ORDER_BOOK_SOURCE = `import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface OrderEntry { price: number; amount: number; total: number; }
interface OrderBookProps { symbol?: string; className?: string; isDark?: boolean; }

const generateOrders = (basePrice: number, count: number, isBuy: boolean): OrderEntry[] => {
  const orders: OrderEntry[] = [];
  for (let i = 0; i < count; i++) {
    const priceOffset = (Math.random() * 100 + i * 10) * (isBuy ? -1 : 1);
    const price = basePrice + priceOffset;
    const amount = Math.random() * 2 + 0.1;
    orders.push({ price: Math.max(0.01, price), amount, total: price * amount });
  }
  return orders.sort((a, b) => isBuy ? b.price - a.price : a.price - b.price);
};

export const OrderBook: React.FC<OrderBookProps> = ({ symbol = 'BTC/USD', className, isDark = true }) => {
  const [buyOrders, setBuyOrders] = useState<OrderEntry[]>([]);
  const [sellOrders, setSellOrders] = useState<OrderEntry[]>([]);
  const [spread, setSpread] = useState(0);
  const [lastPrice, setLastPrice] = useState(67542.30);
  const [priceChange, setPriceChange] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const updateOrders = () => {
      const newBuyOrders = generateOrders(lastPrice - 50, 8, true);
      const newSellOrders = generateOrders(lastPrice + 50, 8, false);
      setBuyOrders(newBuyOrders);
      setSellOrders(newSellOrders);
      if (newBuyOrders.length > 0 && newSellOrders.length > 0) {
        setSpread(newSellOrders[0].price - newBuyOrders[0].price);
      }
    };

    updateOrders();
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 20;
      setLastPrice(prev => {
        const newPrice = prev + change;
        setPriceChange(change > 0 ? 'up' : 'down');
        setTimeout(() => setPriceChange(null), 500);
        return newPrice;
      });
      updateOrders();
    }, 2000);

    return () => clearInterval(interval);
  }, [lastPrice]);

  const maxTotal = Math.max(...buyOrders.map(o => o.total), ...sellOrders.map(o => o.total));
  const formatPrice = (price: number) => price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatAmount = (amount: number) => amount.toFixed(4);

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-indigo-500/20' : 'bg-indigo-100')}>
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div>
            <h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Order Book</h3>
            <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{symbol}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={cn('px-2 py-1 text-xs font-medium rounded', isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700')}>0.01</button>
          <button className={cn('px-2 py-1 text-xs font-medium rounded', isDark ? 'text-slate-500 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100')}>0.1</button>
          <button className={cn('px-2 py-1 text-xs font-medium rounded', isDark ? 'text-slate-500 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100')}>1</button>
        </div>
      </div>
      <div className={cn('grid grid-cols-3 gap-2 px-5 py-2 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')}>
        <div>Price (USD)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>
      <div className="px-2">
        {sellOrders.slice().reverse().map((order, index) => (
          <div key={\\\`sell-\\\${index}\\\`} className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs hover:bg-red-500/10 cursor-pointer">
            <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{ width: \\\`\\\${(order.total / maxTotal) * 100}%\\\` }} />
            <div className="relative text-red-400 font-medium tabular-nums">{formatPrice(order.price)}</div>
            <div className={cn('relative text-right tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>{formatAmount(order.amount)}</div>
            <div className={cn('relative text-right tabular-nums', isDark ? 'text-slate-400' : 'text-slate-500')}>{formatPrice(order.total)}</div>
          </div>
        ))}
      </div>
      <div className={cn('flex items-center justify-between px-5 py-3 border-y', isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50')}>
        <div className={cn('text-lg font-bold tabular-nums transition-colors duration-300', priceChange === 'up' ? 'text-emerald-400' : priceChange === 'down' ? 'text-red-400' : isDark ? 'text-white' : 'text-slate-900')}>
          \${formatPrice(lastPrice)}
          {priceChange ? <span className="ml-2 text-sm">{priceChange === 'up' ? '↑' : '↓'}</span> : null}
        </div>
        <div className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Spread: \${spread.toFixed(2)}</div>
      </div>
      <div className="px-2">
        {buyOrders.map((order, index) => (
          <div key={\\\`buy-\\\${index}\\\`} className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs hover:bg-emerald-500/10 cursor-pointer">
            <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10" style={{ width: \\\`\\\${(order.total / maxTotal) * 100}%\\\` }} />
            <div className="relative text-emerald-400 font-medium tabular-nums">{formatPrice(order.price)}</div>
            <div className={cn('relative text-right tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>{formatAmount(order.amount)}</div>
            <div className={cn('relative text-right tabular-nums', isDark ? 'text-slate-400' : 'text-slate-500')}>{formatPrice(order.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
`

export const PORTFOLIO_DONUT_SOURCE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface PortfolioAsset { id: string; symbol: string; name: string; value: number; allocation: number; color: string; change24h: number; }

interface PortfolioDonutProps {
  assets?: PortfolioAsset[];
  totalValue?: number;
  className?: string;
  isDark?: boolean;
  onAssetHover?: (asset: PortfolioAsset | null) => void;
}

const defaultAssets: PortfolioAsset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', value: 45230, allocation: 45.2, color: '#F7931A', change24h: 2.45 },
  { id: '2', symbol: 'ETH', name: 'Ethereum', value: 28450, allocation: 28.4, color: '#627EEA', change24h: -1.23 },
  { id: '3', symbol: 'SOL', name: 'Solana', value: 12340, allocation: 12.3, color: '#14F195', change24h: 5.67 },
  { id: '4', symbol: 'USDT', name: 'Tether', value: 8500, allocation: 8.5, color: '#26A17B', change24h: 0.01 },
  { id: '5', symbol: 'Others', name: 'Other Assets', value: 5480, allocation: 5.6, color: '#8B5CF6', change24h: 1.25 },
];

export const PortfolioDonut: React.FC<PortfolioDonutProps> = ({ assets = defaultAssets, totalValue = 100000, className, isDark = true, onAssetHover }) => {
  const [hoveredAsset, setHoveredAsset] = useState<PortfolioAsset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<PortfolioAsset | null>(null);

  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centerX = size / 2;
  const centerY = size / 2;

  let cumulativePercent = 0;

  const handleAssetHover = (asset: PortfolioAsset | null) => {
    setHoveredAsset(asset);
    onAssetHover?.(asset);
  };

  const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  const displayAsset = hoveredAsset || selectedAsset;

  return (
    <div className={cn('rounded-2xl border p-6', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-violet-500/20' : 'bg-violet-100')}>
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
          </div>
          <div>
            <h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Portfolio</h3>
            <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Asset Allocation</p>
          </div>
        </div>
        <span className={cn('text-xs font-medium px-2 py-1 rounded-md', isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}>+4.52% today</span>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke={isDark ? '#1e293b' : '#f1f5f9'} strokeWidth={strokeWidth} />
            {assets.map((asset) => {
              const percent = asset.allocation / 100;
              const strokeDasharray = \\\`\\\${circumference * percent} \\\${circumference * (1 - percent)}\\\`;
              const strokeDashoffset = -circumference * cumulativePercent;
              cumulativePercent += percent;
              const isActive = hoveredAsset?.id === asset.id || selectedAsset?.id === asset.id;
              return (
                <circle key={asset.id} cx={centerX} cy={centerY} r={radius} fill="none" stroke={asset.color} strokeWidth={isActive ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} className="transition-all duration-300 cursor-pointer"
                  style={{ opacity: hoveredAsset && hoveredAsset.id !== asset.id ? 0.4 : 1, filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none' }}
                  onMouseEnter={() => handleAssetHover(asset)} onMouseLeave={() => handleAssetHover(null)}
                  onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)} />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {displayAsset ? (
              <>
                <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>{displayAsset.symbol}</span>
                <span className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>{displayAsset.allocation.toFixed(1)}%</span>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-500')}>{formatCurrency(displayAsset.value)}</span>
              </>
            ) : (
              <>
                <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>Total Value</span>
                <span className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>{formatCurrency(totalValue)}</span>
                <span className="text-sm text-emerald-400">+\$4,523.45</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {assets.map((asset) => (
          <div key={asset.id} className={cn('flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200', hoveredAsset?.id === asset.id || selectedAsset?.id === asset.id ? (isDark ? 'bg-slate-800' : 'bg-slate-100') : 'hover:bg-slate-800/50')}
            onMouseEnter={() => handleAssetHover(asset)} onMouseLeave={() => handleAssetHover(null)} onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
              <div>
                <span className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-slate-900')}>{asset.symbol}</span>
                <span className={cn('text-xs ml-2', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.name}</span>
              </div>
            </div>
            <div className="text-right">
              <p className={cn('text-sm font-semibold tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{asset.allocation.toFixed(1)}%</p>
              <p className={cn('text-xs tabular-nums', asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400')}>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDonut;
`


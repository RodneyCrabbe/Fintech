import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OrderEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  symbol?: string;
  className?: string;
  isDark?: boolean;
}

const generateOrders = (basePrice: number, count: number, isBuy: boolean): OrderEntry[] => {
  const orders: OrderEntry[] = [];
  for (let i = 0; i < count; i++) {
    const priceOffset = (Math.random() * 100 + i * 10) * (isBuy ? -1 : 1);
    const price = basePrice + priceOffset;
    const amount = Math.random() * 2 + 0.1;
    orders.push({
      price: Math.max(0.01, price),
      amount,
      total: price * amount,
    });
  }
  return orders.sort((a, b) => isBuy ? b.price - a.price : a.price - b.price);
};

export const OrderBook: React.FC<OrderBookProps> = ({
  symbol = 'BTC/USD',
  className,
  isDark = true,
}) => {
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

  const maxTotal = Math.max(
    ...buyOrders.map(o => o.total),
    ...sellOrders.map(o => o.total)
  );

  const formatPrice = (price: number) => price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatAmount = (amount: number) => amount.toFixed(4);

  return (
    <div className={cn(
      'rounded-2xl border overflow-hidden',
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between px-5 py-4 border-b',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
          )}>
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Order Book
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {symbol}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={cn(
            'px-2 py-1 text-xs font-medium rounded',
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
          )}>
            0.01
          </button>
          <button className={cn(
            'px-2 py-1 text-xs font-medium rounded',
            isDark ? 'text-slate-500 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
          )}>
            0.1
          </button>
          <button className={cn(
            'px-2 py-1 text-xs font-medium rounded',
            isDark ? 'text-slate-500 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
          )}>
            1
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className={cn(
        'grid grid-cols-3 gap-2 px-5 py-2 text-xs font-medium',
        isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
      )}>
        <div>Price (USD)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>

      {/* Sell Orders (Asks) */}
      <div className="px-2">
        {sellOrders.slice().reverse().map((order, index) => (
          <div
            key={`sell-${index}`}
            className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs hover:bg-red-500/10 cursor-pointer"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-red-500/10"
              style={{ width: `${(order.total / maxTotal) * 100}%` }}
            />
            <div className="relative text-red-400 font-medium tabular-nums">
              {formatPrice(order.price)}
            </div>
            <div className={cn(
              'relative text-right tabular-nums',
              isDark ? 'text-slate-300' : 'text-slate-700'
            )}>
              {formatAmount(order.amount)}
            </div>
            <div className={cn(
              'relative text-right tabular-nums',
              isDark ? 'text-slate-400' : 'text-slate-500'
            )}>
              {formatPrice(order.total)}
            </div>
          </div>
        ))}
      </div>

      {/* Spread & Last Price */}
      <div className={cn(
        'flex items-center justify-between px-5 py-3 border-y',
        isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'
      )}>
        <div className={cn(
          'text-lg font-bold tabular-nums transition-colors duration-300',
          priceChange === 'up' ? 'text-emerald-400' : priceChange === 'down' ? 'text-red-400' : isDark ? 'text-white' : 'text-slate-900'
        )}>
          ${formatPrice(lastPrice)}
          {priceChange && (
            <span className="ml-2 text-sm">
              {priceChange === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className={cn(
          'text-xs',
          isDark ? 'text-slate-500' : 'text-slate-500'
        )}>
          Spread: ${spread.toFixed(2)}
        </div>
      </div>

      {/* Buy Orders (Bids) */}
      <div className="px-2">
        {buyOrders.map((order, index) => (
          <div
            key={`buy-${index}`}
            className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-xs hover:bg-emerald-500/10 cursor-pointer"
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-emerald-500/10"
              style={{ width: `${(order.total / maxTotal) * 100}%` }}
            />
            <div className="relative text-emerald-400 font-medium tabular-nums">
              {formatPrice(order.price)}
            </div>
            <div className={cn(
              'relative text-right tabular-nums',
              isDark ? 'text-slate-300' : 'text-slate-700'
            )}>
              {formatAmount(order.amount)}
            </div>
            <div className={cn(
              'relative text-right tabular-nums',
              isDark ? 'text-slate-400' : 'text-slate-500'
            )}>
              {formatPrice(order.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;


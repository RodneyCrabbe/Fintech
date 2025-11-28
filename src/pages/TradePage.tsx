import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Chart from '../components/ChartComponent';
import { OrderBook } from '../components/OrderBook';
import { QuickTradeWidget } from '../components/QuickTradeWidget';
import { TransactionHistory } from '../components/TransactionHistory';
import CryptoPriceTicker from '../components/CryptoPriceTicker';
import SecurityModal from '../components/SecurityModal';

interface TradePageProps {
  isDark?: boolean;
}

const tradingPairs = [
  { symbol: 'BTC/USD', price: 67542.30, change: 2.45 },
  { symbol: 'ETH/USD', price: 3245.67, change: -1.23 },
  { symbol: 'SOL/USD', price: 178.92, change: 5.67 },
  { symbol: 'BNB/USD', price: 598.45, change: 1.87 },
];

const recentTrades = [
  { price: 67542.30, amount: 0.0234, type: 'buy', time: '12:45:23' },
  { price: 67540.15, amount: 0.1500, type: 'sell', time: '12:45:21' },
  { price: 67541.80, amount: 0.0567, type: 'buy', time: '12:45:18' },
  { price: 67538.90, amount: 0.2100, type: 'sell', time: '12:45:15' },
  { price: 67542.10, amount: 0.0890, type: 'buy', time: '12:45:12' },
  { price: 67543.50, amount: 0.0345, type: 'buy', time: '12:45:09' },
  { price: 67539.75, amount: 0.1234, type: 'sell', time: '12:45:06' },
  { price: 67541.00, amount: 0.0678, type: 'buy', time: '12:45:03' },
];

const openOrders = [
  { id: '1', pair: 'BTC/USD', type: 'limit', side: 'buy', price: 66500, amount: 0.5, filled: 0, status: 'open' },
  { id: '2', pair: 'ETH/USD', type: 'limit', side: 'sell', price: 3400, amount: 2.0, filled: 0.5, status: 'partial' },
];

const chartData = [
  { label: '00:00', value: 67100 },
  { label: '04:00', value: 67350 },
  { label: '08:00', value: 67200 },
  { label: '12:00', value: 67450 },
  { label: '16:00', value: 67300 },
  { label: '20:00', value: 67542 },
];

export const TradePage: React.FC<TradePageProps> = ({
  isDark = true,
}) => {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [activeTab, setActiveTab] = useState<'chart' | 'depth'>('chart');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [lastTrade, setLastTrade] = useState<{ type: string; asset: string; amount: number; total: number } | null>(null);

  const handleTrade = (data: { type: 'buy' | 'sell'; asset: string; amount: number; total: number }) => {
    setLastTrade(data);
    setIsTradeModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className={cn(
              'text-2xl font-bold tracking-tight',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Trade
            </h1>
            <p className={cn(
              'text-sm mt-1',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Advanced trading interface
            </p>
          </div>
        </div>

        {/* Pair Selector */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {tradingPairs.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setSelectedPair(pair)}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap',
                selectedPair.symbol === pair.symbol
                  ? isDark 
                    ? 'bg-slate-800 border border-emerald-500/50' 
                    : 'bg-slate-100 border border-emerald-300'
                  : isDark 
                    ? 'bg-slate-900/50 border border-slate-800 hover:border-slate-700' 
                    : 'bg-white border border-slate-200 hover:border-slate-300'
              )}
            >
              <span className={cn(
                'font-semibold text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {pair.symbol}
              </span>
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded',
                pair.change >= 0 
                  ? 'text-emerald-400 bg-emerald-500/10' 
                  : 'text-red-400 bg-red-500/10'
              )}>
                {pair.change >= 0 ? '+' : ''}{pair.change}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Ticker */}
      <div className={cn(
        'rounded-2xl border p-4',
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      )}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                {selectedPair.symbol}
              </p>
              <p className={cn(
                'text-2xl font-bold tabular-nums',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                ${selectedPair.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className={cn(
              'h-12 w-px',
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            )} />
            <div>
              <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>24h Change</p>
              <p className={cn(
                'text-lg font-semibold',
                selectedPair.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              )}>
                {selectedPair.change >= 0 ? '+' : ''}{selectedPair.change}%
              </p>
            </div>
            <div>
              <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>24h High</p>
              <p className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                $68,250.00
              </p>
            </div>
            <div>
              <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>24h Low</p>
              <p className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                $65,890.00
              </p>
            </div>
            <div>
              <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>24h Volume</p>
              <p className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                $28.5B
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-8 space-y-4">
          {/* Chart/Depth Toggle */}
          <div className={cn(
            'flex items-center gap-2 p-1 rounded-xl w-fit',
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          )}>
            <button
              onClick={() => setActiveTab('chart')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                activeTab === 'chart'
                  ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              Chart
            </button>
            <button
              onClick={() => setActiveTab('depth')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                activeTab === 'depth'
                  ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              Depth
            </button>
          </div>

          {/* Chart */}
          <Chart
            data={chartData}
            type="line"
            title="Price Chart"
            subtitle="Last 24 hours"
            size="lg"
            className={isDark ? 'bg-slate-900/80 border-slate-800 [&_h3]:text-white [&_p]:text-slate-400' : ''}
          />

          {/* Recent Trades */}
          <div className={cn(
            'rounded-2xl border overflow-hidden',
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          )}>
            <div className={cn(
              'flex items-center justify-between px-5 py-4 border-b',
              isDark ? 'border-slate-800' : 'border-slate-100'
            )}>
              <h3 className={cn(
                'font-semibold text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Recent Trades
              </h3>
            </div>
            <div className={cn(
              'grid grid-cols-3 gap-2 px-5 py-2 text-xs font-medium',
              isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
            )}>
              <div>Price (USD)</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Time</div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {recentTrades.map((trade, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 px-5 py-2 text-xs"
                >
                  <div className={cn(
                    'font-medium tabular-nums',
                    trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
                  )}>
                    ${trade.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={cn(
                    'text-right tabular-nums',
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  )}>
                    {trade.amount.toFixed(4)}
                  </div>
                  <div className={cn(
                    'text-right tabular-nums',
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  )}>
                    {trade.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Order Book */}
          <OrderBook symbol={selectedPair.symbol} isDark={isDark} />

          {/* Quick Trade */}
          <QuickTradeWidget isDark={isDark} onTrade={handleTrade} />
        </div>
      </div>

      {/* Open Orders */}
      <div className={cn(
        'rounded-2xl border overflow-hidden',
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      )}>
        <div className={cn(
          'flex items-center justify-between px-5 py-4 border-b',
          isDark ? 'border-slate-800' : 'border-slate-100'
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              isDark ? 'bg-amber-500/20' : 'bg-amber-100'
            )}>
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className={cn(
                'font-semibold text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Open Orders
              </h3>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                {openOrders.length} active orders
              </p>
            </div>
          </div>
          <button className={cn(
            'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
            isDark 
              ? 'text-red-400 hover:bg-red-500/10' 
              : 'text-red-600 hover:bg-red-50'
          )}>
            Cancel All
          </button>
        </div>

        {openOrders.length > 0 ? (
          <>
            <div className={cn(
              'grid grid-cols-8 gap-2 px-5 py-2 text-xs font-medium',
              isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50'
            )}>
              <div>Pair</div>
              <div>Type</div>
              <div>Side</div>
              <div className="text-right">Price</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Filled</div>
              <div className="text-right">Status</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y divide-slate-800/50">
              {openOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-8 gap-2 items-center px-5 py-3 text-sm">
                  <div className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>
                    {order.pair}
                  </div>
                  <div className={cn('capitalize', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    {order.type}
                  </div>
                  <div className={cn(
                    'capitalize font-medium',
                    order.side === 'buy' ? 'text-emerald-400' : 'text-red-400'
                  )}>
                    {order.side}
                  </div>
                  <div className={cn('text-right tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>
                    ${order.price.toLocaleString()}
                  </div>
                  <div className={cn('text-right tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>
                    {order.amount}
                  </div>
                  <div className={cn('text-right tabular-nums', isDark ? 'text-slate-400' : 'text-slate-500')}>
                    {order.filled}/{order.amount}
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded-full capitalize',
                      order.status === 'open' ? 'bg-blue-500/10 text-blue-400' :
                      order.status === 'partial' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <button className={cn(
                      'text-xs font-medium px-2 py-1 rounded transition-colors',
                      isDark 
                        ? 'text-red-400 hover:bg-red-500/10' 
                        : 'text-red-600 hover:bg-red-50'
                    )}>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={cn(
            'px-5 py-12 text-center',
            isDark ? 'text-slate-500' : 'text-slate-500'
          )}>
            <p>No open orders</p>
          </div>
        )}
      </div>

      {/* Trade Success Modal */}
      <SecurityModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        title="Trade Executed"
      >
        {lastTrade && (
          <div className="space-y-4">
            <div className={cn(
              'p-4 rounded-xl text-center',
              lastTrade.type === 'buy' ? 'bg-emerald-50' : 'bg-red-50'
            )}>
              <div className={cn(
                'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center',
                lastTrade.type === 'buy' ? 'bg-emerald-100' : 'bg-red-100'
              )}>
                <svg className={cn(
                  'w-8 h-8',
                  lastTrade.type === 'buy' ? 'text-emerald-600' : 'text-red-600'
                )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={cn(
                'text-lg font-bold',
                lastTrade.type === 'buy' ? 'text-emerald-700' : 'text-red-700'
              )}>
                {lastTrade.type === 'buy' ? 'Purchase' : 'Sale'} Successful!
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                <span className="text-sm text-slate-600">Asset</span>
                <span className="font-semibold text-slate-900">{lastTrade.asset}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                <span className="text-sm text-slate-600">Amount</span>
                <span className="font-semibold text-slate-900">{lastTrade.amount} {lastTrade.asset}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                <span className="text-sm text-slate-600">Total</span>
                <span className="font-semibold text-slate-900">${lastTrade.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </SecurityModal>
    </div>
  );
};

export default TradePage;


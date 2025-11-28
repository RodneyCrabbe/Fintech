import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer';
  asset: string;
  amount: number;
  value: number;
  fee: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  txHash?: string;
  from?: string;
  to?: string;
}

interface TransactionHistoryProps {
  transactions?: Transaction[];
  className?: string;
  isDark?: boolean;
  showFilters?: boolean;
  onTransactionClick?: (tx: Transaction) => void;
}

const defaultTransactions: Transaction[] = [
  { id: '1', type: 'buy', asset: 'BTC', amount: 0.05, value: 3377.11, fee: 3.38, status: 'completed', timestamp: new Date(Date.now() - 300000), txHash: '0x1a2b3c...4d5e6f' },
  { id: '2', type: 'sell', asset: 'ETH', amount: 2.5, value: 8000, fee: 8.00, status: 'completed', timestamp: new Date(Date.now() - 3600000), txHash: '0x2b3c4d...5e6f7g' },
  { id: '3', type: 'deposit', asset: 'USDT', amount: 5000, value: 5000, fee: 0, status: 'completed', timestamp: new Date(Date.now() - 7200000), from: '0x9a8b7c...6d5e4f' },
  { id: '4', type: 'withdraw', asset: 'SOL', amount: 25, value: 4500, fee: 0.5, status: 'pending', timestamp: new Date(Date.now() - 14400000), to: '0x3c4d5e...6f7g8h' },
  { id: '5', type: 'transfer', asset: 'BTC', amount: 0.1, value: 6754.23, fee: 1.50, status: 'completed', timestamp: new Date(Date.now() - 86400000), to: 'Savings Wallet' },
  { id: '6', type: 'buy', asset: 'ADA', amount: 1500, value: 678, fee: 0.68, status: 'failed', timestamp: new Date(Date.now() - 172800000) },
  { id: '7', type: 'sell', asset: 'XRP', amount: 2000, value: 1240, fee: 1.24, status: 'completed', timestamp: new Date(Date.now() - 259200000), txHash: '0x4d5e6f...7g8h9i' },
  { id: '8', type: 'deposit', asset: 'ETH', amount: 5, value: 16000, fee: 0, status: 'completed', timestamp: new Date(Date.now() - 345600000), from: 'External Wallet' },
];

const typeConfig = {
  buy: { label: 'Buy', color: 'emerald', icon: '↗' },
  sell: { label: 'Sell', color: 'red', icon: '↙' },
  deposit: { label: 'Deposit', color: 'cyan', icon: '↓' },
  withdraw: { label: 'Withdraw', color: 'amber', icon: '↑' },
  transfer: { label: 'Transfer', color: 'violet', icon: '↔' },
};

const statusConfig = {
  completed: { label: 'Completed', color: 'emerald' },
  pending: { label: 'Pending', color: 'amber' },
  failed: { label: 'Failed', color: 'red' },
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions = defaultTransactions,
  className,
  isDark = true,
  showFilters = true,
  onTransactionClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [dateRange, setDateRange] = useState<'all' | '7d' | '30d' | '90d'>('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false;
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      if (tx.timestamp < cutoff) return false;
    }
    return true;
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatAmount = (amount: number, asset: string): string => {
    if (amount >= 1000) return `${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${asset}`;
    return `${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${asset}`;
  };

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
            isDark ? 'bg-blue-500/20' : 'bg-blue-100'
          )}>
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Transaction History
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {filteredTransactions.length} transactions
            </p>
          </div>
        </div>
        <button className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1',
          isDark 
            ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
            : 'text-slate-600 hover:bg-slate-100'
        )}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={cn(
          'px-5 py-3 border-b flex flex-wrap gap-3',
          isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
        )}>
          {/* Type Filter */}
          <div className="flex items-center gap-1">
            {(['all', 'buy', 'sell', 'deposit', 'withdraw', 'transfer'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize',
                  filter === type
                    ? isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'
                    : isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className={cn(
            'flex items-center gap-1 border-l pl-3',
            isDark ? 'border-slate-700' : 'border-slate-200'
          )}>
            {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize',
                  statusFilter === status
                    ? isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'
                    : isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <div className={cn(
            'flex items-center gap-1 border-l pl-3 ml-auto',
            isDark ? 'border-slate-700' : 'border-slate-200'
          )}>
            {(['all', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  dateRange === range
                    ? isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'
                    : isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {range === 'all' ? 'All Time' : range}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transaction List */}
      <div className="divide-y divide-slate-800/50 max-h-[500px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className={cn(
            'px-5 py-12 text-center',
            isDark ? 'text-slate-500' : 'text-slate-500'
          )}>
            <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const typeInfo = typeConfig[tx.type];
            const statusInfo = statusConfig[tx.status];

            return (
              <div
                key={tx.id}
                onClick={() => onTransactionClick?.(tx)}
                className={cn(
                  'flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-200',
                  isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Type Icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-lg',
                    `bg-${typeInfo.color}-500/20`
                  )} style={{
                    backgroundColor: typeInfo.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' :
                                   typeInfo.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                   typeInfo.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' :
                                   typeInfo.color === 'amber' ? 'rgba(245, 158, 11, 0.2)' :
                                   'rgba(139, 92, 246, 0.2)'
                  }}>
                    <span style={{
                      color: typeInfo.color === 'emerald' ? '#10B981' :
                             typeInfo.color === 'red' ? '#EF4444' :
                             typeInfo.color === 'cyan' ? '#06B6D4' :
                             typeInfo.color === 'amber' ? '#F59E0B' :
                             '#8B5CF6'
                    }}>{typeInfo.icon}</span>
                  </div>

                  {/* Transaction Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        'font-semibold text-sm',
                        isDark ? 'text-white' : 'text-slate-900'
                      )}>
                        {typeInfo.label} {tx.asset}
                      </p>
                      <span className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded-full',
                        tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        tx.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      )}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className={cn(
                      'text-xs mt-0.5',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      {formatDate(tx.timestamp)} • {tx.txHash ? `Tx: ${tx.txHash}` : tx.from ? `From: ${tx.from}` : tx.to ? `To: ${tx.to}` : ''}
                    </p>
                  </div>
                </div>

                {/* Amount & Value */}
                <div className="text-right">
                  <p className={cn(
                    'font-semibold text-sm tabular-nums',
                    tx.type === 'buy' || tx.type === 'deposit' ? 'text-emerald-400' :
                    tx.type === 'sell' || tx.type === 'withdraw' ? 'text-red-400' :
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    {tx.type === 'buy' || tx.type === 'deposit' ? '+' : tx.type === 'sell' || tx.type === 'withdraw' ? '-' : ''}
                    {formatAmount(tx.amount, tx.asset)}
                  </p>
                  <p className={cn(
                    'text-xs tabular-nums',
                    isDark ? 'text-slate-500' : 'text-slate-500'
                  )}>
                    {formatCurrency(tx.value)} {tx.fee > 0 && `• Fee: ${formatCurrency(tx.fee)}`}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {filteredTransactions.length > 0 && (
        <div className={cn(
          'px-5 py-3 border-t text-center',
          isDark ? 'border-slate-800' : 'border-slate-100'
        )}>
          <button className={cn(
            'text-xs font-medium transition-colors',
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          )}>
            Load More Transactions →
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;


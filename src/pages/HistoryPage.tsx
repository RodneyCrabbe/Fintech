import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TransactionHistory } from '../components/TransactionHistory';
import { BalanceWidget } from '../components/BalanceWidget';
import SecurityModal from '../components/SecurityModal';

interface HistoryPageProps {
  isDark?: boolean;
}

const monthlyStats = [
  { month: 'Nov', deposits: 15000, withdrawals: 8500, trades: 125 },
  { month: 'Oct', deposits: 12000, withdrawals: 5200, trades: 98 },
  { month: 'Sep', deposits: 18500, withdrawals: 9800, trades: 145 },
  { month: 'Aug', deposits: 9000, withdrawals: 3500, trades: 67 },
];

const exportFormats = [
  { id: 'csv', label: 'CSV', description: 'Comma-separated values' },
  { id: 'pdf', label: 'PDF', description: 'Portable document format' },
  { id: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
];

export const HistoryPage: React.FC<HistoryPageProps> = ({
  isDark = true,
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleTransactionClick = (tx: any) => {
    setSelectedTransaction(tx);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(
            'text-2xl font-bold tracking-tight',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            History
          </h1>
          <p className={cn(
            'text-sm mt-1',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            View and export your transaction history
          </p>
        </div>
        <button
          onClick={() => setIsExportModalOpen(true)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200',
            isDark 
              ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
              : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BalanceWidget
          balance={245}
          currency="USD"
          label="Total Transactions"
          trend="up"
          trendValue={15}
          trendPeriod="this month"
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={45500}
          currency="USD"
          label="Total Deposits"
          trend="up"
          trendValue={12500}
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={27000}
          currency="USD"
          label="Total Withdrawals"
          trend="down"
          trendValue={5200}
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={435}
          currency="USD"
          label="Total Trades"
          trend="up"
          trendValue={45}
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
      </div>

      {/* Monthly Stats */}
      <div className={cn(
        'rounded-2xl border p-5',
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              isDark ? 'bg-violet-500/20' : 'bg-violet-100'
            )}>
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className={cn(
                'font-semibold text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Monthly Overview
              </h3>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Last 4 months activity
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {monthlyStats.map((stat) => (
            <div
              key={stat.month}
              className={cn(
                'p-4 rounded-xl',
                isDark ? 'bg-slate-800/50' : 'bg-slate-50'
              )}
            >
              <p className={cn(
                'font-semibold text-lg mb-3',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {stat.month}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Deposits</span>
                  <span className="text-emerald-400 font-medium">
                    +${stat.deposits.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Withdrawals</span>
                  <span className="text-red-400 font-medium">
                    -${stat.withdrawals.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Trades</span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>
                    {stat.trades}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <TransactionHistory 
        isDark={isDark}
        showFilters={true}
        onTransactionClick={handleTransactionClick}
      />

      {/* Transaction Detail Modal */}
      <SecurityModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Transaction Details"
        isDark={isDark}
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className={cn(
              'p-4 rounded-xl text-center',
              selectedTransaction.type === 'buy' || selectedTransaction.type === 'deposit' 
                ? isDark ? 'bg-emerald-500/20' : 'bg-emerald-50'
                : isDark ? 'bg-red-500/20' : 'bg-red-50'
            )}>
              <div className={cn(
                'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl',
                selectedTransaction.type === 'buy' || selectedTransaction.type === 'deposit' 
                  ? isDark ? 'bg-emerald-500/30' : 'bg-emerald-100'
                  : isDark ? 'bg-red-500/30' : 'bg-red-100'
              )}>
                {selectedTransaction.type === 'buy' ? '↗' : 
                 selectedTransaction.type === 'sell' ? '↙' : 
                 selectedTransaction.type === 'deposit' ? '↓' : 
                 selectedTransaction.type === 'withdraw' ? '↑' : '↔'}
              </div>
              <h3 className={cn(
                'text-lg font-bold capitalize',
                selectedTransaction.type === 'buy' || selectedTransaction.type === 'deposit' 
                  ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                  : isDark ? 'text-red-400' : 'text-red-700'
              )}>
                {selectedTransaction.type} {selectedTransaction.asset}
              </h3>
              <p className={cn(
                'text-sm',
                selectedTransaction.status === 'completed' 
                  ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                  : selectedTransaction.status === 'pending' 
                    ? isDark ? 'text-amber-400' : 'text-amber-600' 
                    : isDark ? 'text-red-400' : 'text-red-600'
              )}>
                {selectedTransaction.status}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Amount</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                  {selectedTransaction.amount} {selectedTransaction.asset}
                </span>
              </div>
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Value</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                  ${selectedTransaction.value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {selectedTransaction.fee > 0 && (
                <div className={cn(
                  'flex items-center justify-between p-3 rounded-lg',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Fee</span>
                  <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                    ${selectedTransaction.fee?.toFixed(2)}
                  </span>
                </div>
              )}
              <div className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <span className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>Date</span>
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
                  {selectedTransaction.timestamp?.toLocaleString()}
                </span>
              </div>
              {selectedTransaction.txHash && (
                <div className={cn('p-3 rounded-lg', isDark ? 'bg-slate-800' : 'bg-slate-100')}>
                  <p className={cn('text-sm mb-1', isDark ? 'text-slate-400' : 'text-slate-600')}>Transaction Hash</p>
                  <p className={cn('font-mono text-xs break-all', isDark ? 'text-slate-300' : 'text-slate-900')}>
                    {selectedTransaction.txHash}
                  </p>
                </div>
              )}
            </div>

            <button className={cn(
              'w-full py-3 rounded-lg font-semibold transition-colors',
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            )}>
              View on Explorer
            </button>
          </div>
        )}
      </SecurityModal>

      {/* Export Modal */}
      <SecurityModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export Transactions"
        isDark={isDark}
      >
        <div className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-slate-300' : 'text-slate-700')}>From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className={cn(
                  'w-full p-3 rounded-lg outline-none',
                  isDark 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-slate-100 text-slate-900'
                )}
              />
            </div>
            <div>
              <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-slate-300' : 'text-slate-700')}>To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className={cn(
                  'w-full p-3 rounded-lg outline-none',
                  isDark 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-slate-100 text-slate-900'
                )}
              />
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-slate-300' : 'text-slate-700')}>Format</label>
            <div className="space-y-2">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    selectedFormat === format.id
                      ? isDark 
                        ? 'bg-emerald-500/20 border-emerald-500/50' 
                        : 'bg-emerald-50 border-emerald-300'
                      : isDark 
                        ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div className="text-left">
                    <p className={cn('font-medium', isDark ? 'text-white' : 'text-slate-900')}>{format.label}</p>
                    <p className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}>{format.description}</p>
                  </div>
                  {selectedFormat === format.id && (
                    <svg className={cn('w-5 h-5', isDark ? 'text-emerald-400' : 'text-emerald-500')} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Types */}
          <div>
            <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-slate-300' : 'text-slate-700')}>Include</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Buys', 'Sells', 'Deposits', 'Withdrawals', 'Transfers'].map((type) => (
                <button
                  key={type}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border',
                    type === 'All'
                      ? isDark 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                        : 'bg-emerald-500/20 text-emerald-600 border-emerald-300'
                      : isDark 
                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Transactions
          </button>
        </div>
      </SecurityModal>
    </div>
  );
};

export default HistoryPage;


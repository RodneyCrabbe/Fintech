import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BalanceWidget } from '../components/BalanceWidget';
import { AssetHoldings } from '../components/AssetHoldings';
import { PortfolioDonut } from '../components/PortfolioDonut';
import PaymentButton from '../components/PaymentButton';
import SecurityModal from '../components/SecurityModal';

interface WalletPageProps {
  isDark?: boolean;
}

const walletAddresses = [
  { id: '1', label: 'Main Wallet', address: '0x1a2b3c4d5e6f...7890', network: 'Ethereum', balance: 15234.56 },
  { id: '2', label: 'Trading Wallet', address: '0x9f8e7d6c5b4a...3210', network: 'Ethereum', balance: 8500.00 },
  { id: '3', label: 'Bitcoin Wallet', address: 'bc1q2w3e4r5t...6y7u', network: 'Bitcoin', balance: 45230.00 },
];

const recentAddresses = [
  { address: '0x1234...5678', label: 'Exchange Hot Wallet', lastUsed: '2 hours ago' },
  { address: '0xabcd...efgh', label: 'DeFi Protocol', lastUsed: '1 day ago' },
  { address: '0x9876...5432', label: 'Cold Storage', lastUsed: '1 week ago' },
];

export const WalletPage: React.FC<WalletPageProps> = ({
  isDark = true,
}) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [activeWallet, setActiveWallet] = useState(walletAddresses[0]);

  const totalBalance = walletAddresses.reduce((sum, w) => sum + w.balance, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(
            'text-2xl font-bold tracking-tight',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Wallet
          </h1>
          <p className={cn(
            'text-sm mt-1',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            Manage your assets and transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PaymentButton
            variant="outline"
            onClick={() => setIsDepositModalOpen(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Deposit
          </PaymentButton>
          <PaymentButton onClick={() => setIsWithdrawModalOpen(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Withdraw
          </PaymentButton>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BalanceWidget
          balance={totalBalance}
          currency="USD"
          label="Total Balance"
          trend="up"
          trendValue={4520}
          trendPeriod="this week"
          size="lg"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={45230}
          currency="USD"
          label="Available"
          trend="neutral"
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={22500}
          currency="USD"
          label="In Orders"
          trend="up"
          trendValue={1200}
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
        <BalanceWidget
          balance={1234.56}
          currency="USD"
          label="Pending"
          trend="neutral"
          size="md"
          className={isDark ? 'bg-slate-900/80 border-slate-800 [&_*]:text-slate-100 [&_label]:text-slate-400' : ''}
        />
      </div>

      {/* Wallets & Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className={cn(
            'text-lg font-semibold',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Your Wallets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {walletAddresses.map((wallet) => (
              <div
                key={wallet.id}
                onClick={() => setActiveWallet(wallet)}
                className={cn(
                  'rounded-2xl border p-5 cursor-pointer transition-all duration-200',
                  activeWallet.id === wallet.id
                    ? isDark 
                      ? 'bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border-emerald-500/30' 
                      : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200'
                    : isDark 
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      wallet.network === 'Bitcoin' 
                        ? 'bg-amber-500/20' 
                        : 'bg-indigo-500/20'
                    )}>
                      {wallet.network === 'Bitcoin' ? (
                        <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className={cn(
                        'font-semibold text-sm',
                        isDark ? 'text-white' : 'text-slate-900'
                      )}>
                        {wallet.label}
                      </p>
                      <p className={cn(
                        'text-xs',
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      )}>
                        {wallet.network}
                      </p>
                    </div>
                  </div>
                  {activeWallet.id === wallet.id && (
                    <span className="text-emerald-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className={cn(
                  'text-xs font-mono mb-3',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  {wallet.address}
                </p>
                <div className="flex items-center justify-between">
                  <p className={cn(
                    'text-xl font-bold',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className={cn(
                      'p-2 rounded-lg transition-colors',
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    )}>
                      <svg className={cn('w-4 h-4', isDark ? 'text-slate-400' : 'text-slate-500')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className={cn(
                      'p-2 rounded-lg transition-colors',
                      isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    )}>
                      <svg className={cn('w-4 h-4', isDark ? 'text-slate-400' : 'text-slate-500')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Wallet Card */}
            <div className={cn(
              'rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[160px]',
              isDark 
                ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-900/50' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}>
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              )}>
                <svg className={cn('w-6 h-6', isDark ? 'text-slate-400' : 'text-slate-500')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className={cn(
                'font-medium text-sm',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Add New Wallet
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Donut */}
        <div>
          <PortfolioDonut isDark={isDark} />
        </div>
      </div>

      {/* Asset Holdings */}
      <AssetHoldings 
        isDark={isDark}
        onDeposit={(asset) => {
          setSelectedAsset(asset.symbol);
          setIsDepositModalOpen(true);
        }}
        onWithdraw={(asset) => {
          setSelectedAsset(asset.symbol);
          setIsWithdrawModalOpen(true);
        }}
      />

      {/* Recent Addresses */}
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
              isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'
            )}>
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className={cn(
                'font-semibold text-sm',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Address Book
              </h3>
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Recently used addresses
              </p>
            </div>
          </div>
          <button className={cn(
            'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
            isDark 
              ? 'text-emerald-400 hover:bg-emerald-500/10' 
              : 'text-emerald-600 hover:bg-emerald-50'
          )}>
            + Add Address
          </button>
        </div>
        <div className="divide-y divide-slate-800/50">
          {recentAddresses.map((addr, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-200',
                isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <svg className={cn('w-5 h-5', isDark ? 'text-slate-400' : 'text-slate-500')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className={cn(
                    'font-medium text-sm',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    {addr.label}
                  </p>
                  <p className={cn(
                    'text-xs font-mono',
                    isDark ? 'text-slate-500' : 'text-slate-500'
                  )}>
                    {addr.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  'text-xs',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  {addr.lastUsed}
                </span>
                <button className={cn(
                  'p-2 rounded-lg transition-colors',
                  isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                )}>
                  <svg className={cn('w-4 h-4', isDark ? 'text-slate-400' : 'text-slate-500')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Modal */}
      <SecurityModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Deposit Funds"
      >
        <div className="space-y-4">
          <div className={cn(
            'p-4 rounded-xl text-center',
            'bg-emerald-50'
          )}>
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-sm text-slate-700">Scan QR code or copy address below</p>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-slate-100 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Network</p>
              <p className="font-medium text-slate-900">Ethereum (ERC-20)</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Deposit Address</p>
              <p className="font-mono text-sm text-slate-900 break-all">
                0x1a2b3c4d5e6f7890abcdef1234567890abcdef12
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-700">
              ⚠️ Only send {selectedAsset} to this address. Sending other tokens may result in permanent loss.
            </p>
          </div>

          <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
            Copy Address
          </button>
        </div>
      </SecurityModal>

      {/* Withdraw Modal */}
      <SecurityModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title="Withdraw Funds"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Asset</label>
            <select 
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full p-3 bg-slate-100 rounded-lg text-slate-900 outline-none"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="SOL">Solana (SOL)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
            <div className="relative">
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-3 bg-slate-100 rounded-lg text-slate-900 outline-none pr-16"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-emerald-600">
                MAX
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Available: 1.2345 {selectedAsset}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Recipient Address</label>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="w-full p-3 bg-slate-100 rounded-lg text-slate-900 outline-none"
            />
          </div>

          <div className="p-3 bg-slate-100 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Network Fee</span>
              <span className="text-slate-900">0.0005 {selectedAsset}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">You will receive</span>
              <span className="font-semibold text-slate-900">
                {withdrawAmount ? (parseFloat(withdrawAmount) - 0.0005).toFixed(4) : '0.0000'} {selectedAsset}
              </span>
            </div>
          </div>

          <button className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
            Withdraw
          </button>
        </div>
      </SecurityModal>
    </div>
  );
};

export default WalletPage;


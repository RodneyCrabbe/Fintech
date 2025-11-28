// ============================================================================
// EMBEDDED COMPONENT SOURCE CODE - Part 1 (AlertsWidget - MarketStats)
// ============================================================================

export const ALERTS_WIDGET_SOURCE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface Alert {
  id: string;
  type: 'price' | 'news' | 'transaction' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface AlertsWidgetProps {
  alerts?: Alert[];
  className?: string;
  isDark?: boolean;
  onAlertClick?: (alert: Alert) => void;
  onDismiss?: (alertId: string) => void;
}

const defaultAlerts: Alert[] = [
  { id: '1', type: 'price', title: 'BTC Price Alert', message: 'Bitcoin crossed $68,000 resistance level', timestamp: new Date(Date.now() - 300000), read: false, priority: 'high' },
  { id: '2', type: 'transaction', title: 'Deposit Confirmed', message: 'Your deposit of 0.5 ETH has been confirmed', timestamp: new Date(Date.now() - 1800000), read: false, priority: 'medium' },
  { id: '3', type: 'news', title: 'Market Update', message: 'SEC approves new Bitcoin ETF applications', timestamp: new Date(Date.now() - 3600000), read: true, priority: 'low' },
  { id: '4', type: 'security', title: 'New Device Login', message: 'Login detected from Chrome on Windows', timestamp: new Date(Date.now() - 7200000), read: true, priority: 'high' },
];

const typeConfig = {
  price: { icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>), color: 'emerald' },
  transaction: { icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>), color: 'cyan' },
  news: { icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>), color: 'violet' },
  security: { icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>), color: 'amber' },
};

const colorMap: Record<string, { bg: string; bgDark: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', text: 'text-emerald-500' },
  cyan: { bg: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', text: 'text-cyan-500' },
  violet: { bg: 'bg-violet-100', bgDark: 'bg-violet-500/20', text: 'text-violet-500' },
  amber: { bg: 'bg-amber-100', bgDark: 'bg-amber-500/20', text: 'text-amber-500' },
};

export const AlertsWidget: React.FC<AlertsWidgetProps> = ({ alerts = defaultAlerts, className, isDark = true, onAlertClick, onDismiss }) => {
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const unreadCount = localAlerts.filter(a => !a.read).length;

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (minutes < 60) return \\\`\\\${minutes}m ago\\\`;
    if (hours < 24) return \\\`\\\${hours}h ago\\\`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDismiss = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalAlerts(prev => prev.filter(a => a.id !== alertId));
    onDismiss?.(alertId);
  };

  const handleClick = (alert: Alert) => {
    setLocalAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, read: true } : a));
    onAlertClick?.(alert);
  };

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center relative', isDark ? 'bg-rose-500/20' : 'bg-rose-100')}>
            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 ? <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{unreadCount}</span> : null}
          </div>
          <div>
            <h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Alerts</h3>
            <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{unreadCount} unread notifications</p>
          </div>
        </div>
        <button className={cn('text-xs font-medium px-3 py-1.5 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}>Mark all read</button>
      </div>
      <div className="divide-y divide-slate-800/50 max-h-80 overflow-y-auto">
        {localAlerts.map((alert) => {
          const config = typeConfig[alert.type];
          const colors = colorMap[config.color];
          return (
            <div key={alert.id} onClick={() => handleClick(alert)} className={cn('flex items-start gap-3 p-4 cursor-pointer transition-all duration-200', !alert.read ? (isDark ? 'bg-slate-800/30' : 'bg-blue-50/50') : '', isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')}>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', isDark ? colors.bgDark : colors.bg)}><span className={colors.text}>{config.icon}</span></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('font-medium text-sm', isDark ? 'text-white' : 'text-slate-900')}>{alert.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-400')}>{formatTime(alert.timestamp)}</span>
                  </div>
                </div>
                <p className={cn('text-sm mt-0.5', isDark ? 'text-slate-400' : 'text-slate-600')}>{alert.message}</p>
                {!alert.read ? <div className="flex items-center gap-1 mt-2"><span className="w-2 h-2 rounded-full bg-blue-500" /><span className={cn('text-xs font-medium', isDark ? 'text-blue-400' : 'text-blue-600')}>New</span></div> : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className={cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <button className={cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>View All Notifications →</button>
      </div>
    </div>
  );
};

export default AlertsWidget;
`

export const ASSET_HOLDINGS_SOURCE = `import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
  color: string;
}

interface AssetHoldingsProps {
  assets?: Asset[];
  className?: string;
  isDark?: boolean;
  onDeposit?: (asset: Asset) => void;
  onWithdraw?: (asset: Asset) => void;
  onTrade?: (asset: Asset) => void;
}

const defaultAssets: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', balance: 1.2345, value: 83342.50, price: 67500, change24h: 2.45, color: '#F7931A' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', balance: 15.5, value: 49608, price: 3200, change24h: -1.23, color: '#627EEA' },
  { id: '3', symbol: 'SOL', name: 'Solana', balance: 125.75, value: 22635, price: 180, change24h: 5.67, color: '#14F195' },
  { id: '4', symbol: 'USDT', name: 'Tether', balance: 10000, value: 10000, price: 1, change24h: 0.01, color: '#26A17B' },
  { id: '5', symbol: 'XRP', name: 'Ripple', balance: 5000, value: 3100, price: 0.62, change24h: 0.89, color: '#23292F' },
  { id: '6', symbol: 'ADA', name: 'Cardano', balance: 8500, value: 3842.50, price: 0.452, change24h: -2.15, color: '#0033AD' },
];

export const AssetHoldings: React.FC<AssetHoldingsProps> = ({ assets = defaultAssets, className, isDark = true, onDeposit, onWithdraw, onTrade }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'value' | 'name' | 'change'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'value': comparison = a.value - b.value; break;
      case 'name': comparison = a.name.localeCompare(b.name); break;
      case 'change': comparison = a.change24h - b.change24h; break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const formatCurrency = (value: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  const formatBalance = (balance: number): string => balance >= 1000 ? balance.toLocaleString('en-US', { maximumFractionDigits: 2 }) : balance.toLocaleString('en-US', { maximumFractionDigits: 4 });

  const handleSort = (column: 'value' | 'name' | 'change') => {
    if (sortBy === column) { setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); } 
    else { setSortBy(column); setSortOrder('desc'); }
  };

  return (
    <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-violet-500/20' : 'bg-violet-100')}>
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <div>
            <h3 className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>Your Assets</h3>
            <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>Total: {formatCurrency(totalValue)}</p>
          </div>
        </div>
        <button className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors', isDark ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200')}>+ Deposit</button>
      </div>
      <div className={cn('grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium', isDark ? 'text-slate-500 bg-slate-900/50' : 'text-slate-500 bg-slate-50')}>
        <button onClick={() => handleSort('name')} className="col-span-3 text-left flex items-center gap-1 hover:text-slate-300">Asset {sortBy === 'name' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-2 text-right">Balance</div>
        <div className="col-span-2 text-right">Price</div>
        <button onClick={() => handleSort('value')} className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-slate-300">Value {sortBy === 'value' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <button onClick={() => handleSort('change')} className="col-span-1 text-right flex items-center justify-end gap-1 hover:text-slate-300">24h {sortBy === 'change' ? <span>{sortOrder === 'desc' ? '↓' : '↑'}</span> : null}</button>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      <div className="divide-y divide-slate-800/50">
        {sortedAssets.map((asset) => (
          <div key={asset.id} onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)} className={cn('grid grid-cols-12 gap-2 items-center px-5 py-4 cursor-pointer transition-all duration-200', selectedAsset === asset.id ? (isDark ? 'bg-slate-800/50' : 'bg-slate-50') : (isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'))}>
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: asset.color }}>{asset.symbol.charAt(0)}</div>
              <div>
                <p className={cn('font-semibold text-sm', isDark ? 'text-white' : 'text-slate-900')}>{asset.symbol}</p>
                <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.name}</p>
              </div>
            </div>
            <div className="col-span-2 text-right">
              <p className={cn('font-medium text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{formatBalance(asset.balance)}</p>
              <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-500')}>{asset.symbol}</p>
            </div>
            <div className="col-span-2 text-right"><p className={cn('font-medium text-sm tabular-nums', isDark ? 'text-slate-300' : 'text-slate-700')}>{formatCurrency(asset.price)}</p></div>
            <div className="col-span-2 text-right"><p className={cn('font-semibold text-sm tabular-nums', isDark ? 'text-white' : 'text-slate-900')}>{formatCurrency(asset.value)}</p></div>
            <div className="col-span-1 text-right"><span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold', asset.change24h >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')}>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</span></div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button onClick={(e) => { e.stopPropagation(); onDeposit?.(asset); }} className={cn('p-2 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10' : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50')} title="Deposit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
              <button onClick={(e) => { e.stopPropagation(); onWithdraw?.(asset); }} className={cn('p-2 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-500 hover:text-red-600 hover:bg-red-50')} title="Withdraw"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
              <button onClick={(e) => { e.stopPropagation(); onTrade?.(asset); }} className={cn('p-2 rounded-lg transition-colors', isDark ? 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10' : 'text-slate-500 hover:text-cyan-600 hover:bg-cyan-50')} title="Trade"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></button>
            </div>
          </div>
        ))}
      </div>
      <div className={cn('px-5 py-3 border-t text-center', isDark ? 'border-slate-800' : 'border-slate-100')}>
        <button className={cn('text-xs font-medium transition-colors', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}>View All Assets →</button>
      </div>
    </div>
  );
};

export default AssetHoldings;
`

export const BALANCE_WIDGET_SOURCE = `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

interface BalanceWidgetProps extends VariantProps<typeof balanceVariants> {
  balance: number;
  currency?: string;
  label?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  trendPeriod?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

const balanceVariants = cva(
  'relative flex flex-col rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#1E40AF] focus-within:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-white border-slate-200 shadow-sm hover:shadow-md',
        outline: 'bg-transparent border-slate-300 hover:border-[#1E40AF] hover:bg-slate-50',
        ghost: 'bg-slate-50 border-transparent hover:bg-slate-100',
      },
      size: {
        sm: 'p-4 gap-2',
        md: 'p-6 gap-3',
        lg: 'p-8 gap-4',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

const balanceSizeStyles = {
  sm: { label: 'text-xs font-medium text-slate-600', balance: 'text-lg font-bold text-slate-900', currency: 'text-sm font-semibold text-slate-700', trend: 'text-xs', trendIcon: 'w-3 h-3' },
  md: { label: 'text-sm font-medium text-slate-600', balance: 'text-2xl font-bold text-slate-900', currency: 'text-base font-semibold text-slate-700', trend: 'text-sm', trendIcon: 'w-4 h-4' },
  lg: { label: 'text-base font-medium text-slate-600', balance: 'text-3xl font-bold text-slate-900', currency: 'text-lg font-semibold text-slate-700', trend: 'text-base', trendIcon: 'w-5 h-5' },
};

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'neutral'; size: keyof typeof balanceSizeStyles }> = ({ trend, size }) => {
  const iconClass = cn(balanceSizeStyles[size].trendIcon, 'inline-block');
  if (trend === 'up') return <svg className={cn(iconClass, 'text-green-600')} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>;
  if (trend === 'down') return <svg className={cn(iconClass, 'text-red-600')} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" /></svg>;
  return <svg className={cn(iconClass, 'text-slate-500')} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
};

const formatCurrency = (amount: number, currency: string): string => new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
const formatTrendValue = (value: number, currency?: string): string => {
  const absValue = Math.abs(value);
  if (currency) return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absValue);
  return \\\`\\\${absValue.toFixed(2)}%\\\`;
};

export const BalanceWidget: React.FC<BalanceWidgetProps> = ({ balance, currency = 'USD', label = 'Current Balance', trend, trendValue, trendPeriod = 'vs last month', isLoading = false, variant = 'default', size = 'md', className, onClick, ...props }) => {
  const styles = balanceSizeStyles[size || 'md'];
  const isClickable = !!onClick;
  const trendColorClass = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600';

  if (isLoading) {
    return (
      <div className={cn(balanceVariants({ variant, size }), className)} {...props}>
        <div className={cn(styles.label, 'animate-pulse bg-slate-200 rounded h-4 w-16')} />
        <div className={cn(styles.balance, 'animate-pulse bg-slate-200 rounded h-8 w-32')} />
        <div className="animate-pulse bg-slate-200 rounded h-4 w-20" />
      </div>
    );
  }

  return (
    <div className={cn(balanceVariants({ variant, size }), isClickable ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : '', className)} onClick={isClickable ? onClick : undefined} {...props}>
      <label className={styles.label}>{label}</label>
      <div className="flex items-baseline gap-2">
        <span className={styles.balance}>{formatCurrency(balance, currency)}</span>
        <span className={styles.currency}>{currency}</span>
      </div>
      {trend && trendValue !== undefined ? (
        <div className={cn("flex items-center gap-1", styles.trend, trendColorClass)}>
          <TrendIcon trend={trend} size={size || 'md'} />
          <span>{trend === 'up' ? '+' : '-'}{formatTrendValue(trendValue, currency)} {trendPeriod}</span>
        </div>
      ) : null}
    </div>
  );
};

export default BalanceWidget;
`

export const MARKET_STATS_SOURCE = `import React from 'react';
import { cn } from '../lib/utils';

interface StatItem {
  label: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

interface MarketStatsProps {
  className?: string;
  isDark?: boolean;
}

const defaultStats: StatItem[] = [
  { label: 'Market Cap', value: '$2.45T', change: 2.34, icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>), color: 'emerald' },
  { label: '24h Volume', value: '$89.2B', change: -1.23, icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>), color: 'cyan' },
  { label: 'BTC Dominance', value: '52.4%', change: 0.45, icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>), color: 'amber' },
  { label: 'Fear & Greed', value: '72', icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>), color: 'violet' },
];

const colorMap: Record<string, { bg: string; bgDark: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', text: 'text-emerald-500' },
  cyan: { bg: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', text: 'text-cyan-500' },
  amber: { bg: 'bg-amber-100', bgDark: 'bg-amber-500/20', text: 'text-amber-500' },
  violet: { bg: 'bg-violet-100', bgDark: 'bg-violet-500/20', text: 'text-violet-500' },
};

export const MarketStats: React.FC<MarketStatsProps> = ({ className, isDark = true }) => {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {defaultStats.map((stat, index) => {
        const colors = colorMap[stat.color];
        return (
          <div key={index} className={cn('rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02]', isDark ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg')}>
            <div className="flex items-start justify-between mb-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', isDark ? colors.bgDark : colors.bg)}><span className={colors.text}>{stat.icon}</span></div>
              {stat.change !== undefined ? <span className={cn('text-xs font-semibold px-2 py-1 rounded-md', stat.change >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10')}>{stat.change >= 0 ? '+' : ''}{stat.change}%</span> : null}
            </div>
            <p className={cn('text-xs font-medium mb-1', isDark ? 'text-slate-500' : 'text-slate-500')}>{stat.label}</p>
            <p className={cn('text-2xl font-bold tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MarketStats;
`


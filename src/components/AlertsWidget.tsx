import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
  {
    id: '1',
    type: 'price',
    title: 'BTC Price Alert',
    message: 'Bitcoin crossed $68,000 resistance level',
    timestamp: new Date(Date.now() - 300000),
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'transaction',
    title: 'Deposit Confirmed',
    message: 'Your deposit of 0.5 ETH has been confirmed',
    timestamp: new Date(Date.now() - 1800000),
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'news',
    title: 'Market Update',
    message: 'SEC approves new Bitcoin ETF applications',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
    priority: 'low',
  },
  {
    id: '4',
    type: 'security',
    title: 'New Device Login',
    message: 'Login detected from Chrome on Windows',
    timestamp: new Date(Date.now() - 7200000),
    read: true,
    priority: 'high',
  },
];

const typeConfig = {
  price: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'emerald',
  },
  transaction: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'cyan',
  },
  news: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: 'violet',
  },
  security: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'amber',
  },
};

const colorMap: Record<string, { bg: string; bgDark: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', text: 'text-emerald-500' },
  cyan: { bg: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', text: 'text-cyan-500' },
  violet: { bg: 'bg-violet-100', bgDark: 'bg-violet-500/20', text: 'text-violet-500' },
  amber: { bg: 'bg-amber-100', bgDark: 'bg-amber-500/20', text: 'text-amber-500' },
};

export const AlertsWidget: React.FC<AlertsWidgetProps> = ({
  alerts = defaultAlerts,
  className,
  isDark = true,
  onAlertClick,
  onDismiss,
}) => {
  const [localAlerts, setLocalAlerts] = useState(alerts);
  
  const unreadCount = localAlerts.filter(a => !a.read).length;

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDismiss = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalAlerts(prev => prev.filter(a => a.id !== alertId));
    onDismiss?.(alertId);
  };

  const handleClick = (alert: Alert) => {
    setLocalAlerts(prev => prev.map(a => 
      a.id === alert.id ? { ...a, read: true } : a
    ));
    onAlertClick?.(alert);
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
            'w-8 h-8 rounded-lg flex items-center justify-center relative',
            isDark ? 'bg-rose-500/20' : 'bg-rose-100'
          )}>
            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className={cn(
              'font-semibold text-sm',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Alerts
            </h3>
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {unreadCount} unread notifications
            </p>
          </div>
        </div>
        <button className={cn(
          'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
          isDark 
            ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
            : 'text-slate-600 hover:bg-slate-100'
        )}>
          Mark all read
        </button>
      </div>

      {/* Alerts List */}
      <div className="divide-y divide-slate-800/50 max-h-80 overflow-y-auto">
        {localAlerts.map((alert) => {
          const config = typeConfig[alert.type];
          const colors = colorMap[config.color];
          
          return (
            <div
              key={alert.id}
              onClick={() => handleClick(alert)}
              className={cn(
                'flex items-start gap-3 p-4 cursor-pointer transition-all duration-200',
                !alert.read && (isDark ? 'bg-slate-800/30' : 'bg-blue-50/50'),
                isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                isDark ? colors.bgDark : colors.bg
              )}>
                <span className={colors.text}>{config.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn(
                    'font-medium text-sm',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    {alert.title}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn(
                      'text-xs',
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    )}>
                      {formatTime(alert.timestamp)}
                    </span>
                    <button
                      onClick={(e) => handleDismiss(alert.id, e)}
                      className={cn(
                        'p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100',
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                      )}
                    >
                      <svg className={cn(
                        'w-3 h-3',
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className={cn(
                  'text-sm mt-0.5',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  {alert.message}
                </p>
                {!alert.read && (
                  <div className="flex items-center gap-1 mt-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className={cn(
                      'text-xs font-medium',
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    )}>
                      New
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={cn(
        'px-5 py-3 border-t text-center',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <button className={cn(
          'text-xs font-medium transition-colors',
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        )}>
          View All Notifications →
        </button>
      </div>
    </div>
  );
};

export default AlertsWidget;


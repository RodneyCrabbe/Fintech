import React from 'react';
import { cn } from '@/lib/utils';

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
  {
    label: 'Market Cap',
    value: '$2.45T',
    change: 2.34,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    label: '24h Volume',
    value: '$89.2B',
    change: -1.23,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    label: 'BTC Dominance',
    value: '52.4%',
    change: 0.45,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    color: 'amber',
  },
  {
    label: 'Fear & Greed',
    value: '72',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'violet',
  },
];

const colorMap: Record<string, { bg: string; bgDark: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', text: 'text-emerald-500' },
  cyan: { bg: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', text: 'text-cyan-500' },
  amber: { bg: 'bg-amber-100', bgDark: 'bg-amber-500/20', text: 'text-amber-500' },
  violet: { bg: 'bg-violet-100', bgDark: 'bg-violet-500/20', text: 'text-violet-500' },
};

export const MarketStats: React.FC<MarketStatsProps> = ({
  className,
  isDark = true,
}) => {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {defaultStats.map((stat, index) => {
        const colors = colorMap[stat.color];
        return (
          <div
            key={index}
            className={cn(
              'rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02]',
              isDark 
                ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' 
                : 'bg-white border-slate-200 hover:shadow-lg'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isDark ? colors.bgDark : colors.bg
              )}>
                <span className={colors.text}>{stat.icon}</span>
              </div>
              {stat.change !== undefined && (
                <span className={cn(
                  'text-xs font-semibold px-2 py-1 rounded-md',
                  stat.change >= 0 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : 'text-red-400 bg-red-500/10'
                )}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}%
                </span>
              )}
            </div>
            <p className={cn(
              'text-xs font-medium mb-1',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              {stat.label}
            </p>
            <p className={cn(
              'text-2xl font-bold tracking-tight',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MarketStats;


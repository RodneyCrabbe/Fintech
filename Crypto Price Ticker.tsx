import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  icon?: string;
}

const cryptoTickerVariants = cva(
  "inline-flex items-center justify-between rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border-slate-200 shadow-sm hover:shadow-md",
        outline: "border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50 hover:border-[#1E40AF]",
        ghost: "border-transparent bg-transparent text-slate-900 hover:bg-slate-100"
      },
      size: {
        sm: "px-3 py-2 text-xs gap-2 min-w-[200px]",
        md: "px-4 py-3 text-sm gap-3 min-w-[280px]",
        lg: "px-6 py-4 text-base gap-4 min-w-[320px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const iconSizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8"
};

const priceSizeMap = {
  sm: "text-sm font-semibold",
  md: "text-lg font-bold",
  lg: "text-xl font-bold"
};

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
  
  return {
    symbol: symbol.toUpperCase(),
    name: name || `${symbol} Coin`,
    price: basePrice + (Math.random() - 0.5) * 100,
    change24h,
    changePercent24h: changePercent
  };
};

const CryptoPriceTicker: React.FC<CryptoPriceTickerProps> = ({
  className,
  variant,
  size = "md",
  symbol,
  name,
  refreshInterval = 30000,
  showIcon = true,
  showName = false,
  onPriceUpdate,
  initialPrice,
  mockData = true,
  ...props
}) => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchCryptoData = async () => {
    try {
      setError(null);
      
      if (mockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = generateMockData(symbol, name, cryptoData?.price || initialPrice);
        setCryptoData(data);
        onPriceUpdate?.(data);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        // Real API implementation would go here
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

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatChange = (change: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(change);
  };

  const formatPercentage = (percent: number): string => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  if (isLoading && !cryptoData) {
    return (
      <div 
        className={cn(cryptoTickerVariants({ variant, size, className }))}
        role="status"
        aria-label="Loading cryptocurrency price data"
      >
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
      <div 
        className={cn(cryptoTickerVariants({ variant, size, className }), "border-red-200 bg-red-50")}
        role="alert"
        aria-label="Error loading cryptocurrency data"
      >
        <div className="flex items-center gap-2 text-red-600">
          <svg className={cn("fill-current", iconSizeMap[size!])} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Error loading data</span>
        </div>
      </div>
    );
  }

  if (!cryptoData) return null;
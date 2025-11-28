import React, { useMemo, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

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
  ariaLabel?: string;
  ariaDescription?: string;
}

const chartVariants = cva(
  'relative w-full rounded-lg border bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
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
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  title,
  subtitle,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  animated = true,
  variant,
  size,
  className,
  ariaLabel,
  ariaDescription,
  ...props
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const primaryColor = '#1E40AF';
  const colorPalette = [
    primaryColor,
    '#3B82F6',
    '#60A5FA',
    '#93C5FD',
    '#DBEAFE',
    '#EF4444',
    '#F59E0B',
    '#10B981',
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width - 32,
          height: rect.height - (title || subtitle ? 80 : 40),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [title, subtitle]);

  const processedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: item.color || colorPalette[index % colorPalette.length],
    }));
  }, [data]);

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
      const y = padding + chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
      return { x, y, ...item };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
        {showGrid && (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return (
                <line
                  key={`grid-${i}`}
                  x1={padding}
                  y1={y}
                  x2={dimensions.width - padding}
                  y2={y}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        )}
        
        <path
          d={pathData}
          fill="none"
          stroke={primaryColor}
          strokeWidth="3"
          className={animated ? 'animate-pulse' : ''}
        />
        
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={hoveredIndex === index ? 6 : 4}
            fill={primaryColor}
            className="cursor-pointer transition-all duration-200 hover:r-6"
            onMouseEnter={() => showTooltip && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`Data point: ${point.label}, value: ${point.value}`}
          />
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
        {showGrid && (
          <g className="opacity-20">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + (chartHeight / 4) * i;
              return (
                <line
                  key={`grid-${i}`}
                  x1={padding}
                  y1={y}
                  x2={dimensions.width - padding}
                  y2={y}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        )}
        
        {processedData.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = padding + index * (barWidth + barSpacing);
          const y = dimensions.height - padding - barHeight;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={item.color}
              className={`cursor-pointer transition-all duration-200 ${
                hoveredIndex === index ? 'opacity-80' : 'opacity-100'
              } ${animated ? 'animate-pulse' : ''}`}
              onMouseEnter={() => showTooltip && setHoveredIndex(index)}
              onMouseLeave={() => setHov
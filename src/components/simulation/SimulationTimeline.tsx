import type { MonthlyData } from '../../types';

interface SimulationTimelineProps {
  monthlyData: MonthlyData[];
  currentMonth?: number;
}

export function SimulationTimeline({ monthlyData, currentMonth = 12 }: SimulationTimelineProps) {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  const maxMarketShare = Math.max(...monthlyData.map(d => d.marketShare));

  return (
    <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-cyan-400 mb-6">12-Month Timeline</h3>
      
      {/* Timeline */}
      <div className="relative">
        {/* Revenue Chart Background */}
        <div className="h-40 mb-8 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-cyan-500/10" />
            ))}
          </div>

          {/* Revenue line */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area under curve */}
            <path
              d={`
                M ${(0 / 11) * 100}% ${100 - (monthlyData[0].revenue / maxRevenue) * 100}%
                ${monthlyData.slice(1).map((data, i) => 
                  `L ${((i + 1) / 11) * 100}% ${100 - (data.revenue / maxRevenue) * 100}%`
                ).join(' ')}
                L 100% 100%
                L 0% 100%
                Z
              `}
              fill="url(#revenueGradient)"
            />
            
            {/* Line */}
            <polyline
              points={monthlyData.map((data, i) => 
                `${(i / 11) * 100}%,${100 - (data.revenue / maxRevenue) * 100}%`
              ).join(' ')}
              fill="none"
              stroke="#00ffcc"
              strokeWidth="2"
              className="drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]"
            />
            
            {/* Data points */}
            {monthlyData.map((data, i) => (
              <circle
                key={i}
                cx={`${(i / 11) * 100}%`}
                cy={`${100 - (data.revenue / maxRevenue) * 100}%`}
                r="4"
                fill="#00ffcc"
                className="drop-shadow-[0_0_6px_rgba(0,255,204,0.8)]"
              />
            ))}
          </svg>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-right pr-2 text-xs text-cyan-400/50">
            <span>${(maxRevenue / 1000).toFixed(0)}k</span>
            <span>${(maxRevenue * 0.75 / 1000).toFixed(0)}k</span>
            <span>${(maxRevenue * 0.5 / 1000).toFixed(0)}k</span>
            <span>${(maxRevenue * 0.25 / 1000).toFixed(0)}k</span>
            <span>$0</span>
          </div>
        </div>

        {/* Month markers */}
        <div className="flex justify-between mb-4">
          {monthlyData.map((data) => (
            <div
              key={data.month}
              className="flex flex-col items-center"
              style={{ width: '8.33%' }}
            >
              {/* Month indicator */}
              <div
                className={`w-2 h-2 rounded-full mb-2 transition-all ${
                  data.month === currentMonth
                    ? 'bg-cyan-400 shadow-[0_0_12px_rgba(0,255,204,0.8)] scale-150'
                    : 'bg-cyan-500/30'
                }`}
              />
              
              {/* Month label */}
              <span
                className={`text-xs transition-all ${
                  data.month === currentMonth
                    ? 'text-cyan-400 font-semibold'
                    : 'text-white/40'
                }`}
              >
                M{data.month}
              </span>
            </div>
          ))}
        </div>

        {/* Market Share Chart */}
        <div className="mt-8 h-20 relative">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-t border-purple-500/10" />
            ))}
          </div>

          {/* Market share bars */}
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {monthlyData.map((data) => (
              <div
                key={data.month}
                className="flex-1 group relative"
              >
                <div
                  className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all hover:from-purple-400 hover:to-purple-300"
                  style={{ height: `${(data.marketShare / maxMarketShare) * 100}%` }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 border border-purple-500/50 rounded text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {data.marketShare.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {/* Y-axis label */}
          <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-right pr-2 text-xs text-purple-400/50">
            <span>{maxMarketShare.toFixed(0)}%</span>
            <span>0%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-white/60">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400" />
            <span className="text-white/60">Market Share</span>
          </div>
        </div>
      </div>

      {/* Monthly Details */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {monthlyData.filter((_, i) => i % 3 === 2).map((data) => (
          <div key={data.month} className="bg-cyan-500/5 rounded-lg p-3 border border-cyan-500/20">
            <div className="text-cyan-400 font-semibold mb-2">Month {data.month}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-white/50">Profit:</span>
                <span className={data.profit > 0 ? 'text-green-400' : 'text-red-400'}>
                  ${(data.profit / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Tech:</span>
                <span className="text-cyan-400">{data.techScore.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Finance:</span>
                <span className="text-green-400">{data.financeScore.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { LiveSimulationData } from '../../types';

interface SimulationDataViewerProps {
  data: LiveSimulationData;
  isVisible: boolean;
  onToggle: () => void;
}

export function SimulationDataViewer({ data, isVisible, onToggle }: SimulationDataViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors"
        title="Show Data"
      >
        <Eye className="w-5 h-5 text-cyan-400" />
      </button>
    );
  }

  return (
    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-cyan-500/20">
        <h3 className="text-cyan-400 font-semibold text-sm">Live Metrics</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={onToggle}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Current Month */}
          <div className="bg-cyan-500/10 rounded-lg p-2">
            <div className="text-cyan-400/70 text-xs mb-1">Current Month</div>
            <div className="text-cyan-400 font-bold text-xl">Month {data.currentMonth}/12</div>
            <div className="text-cyan-400/50 text-xs mt-1">
              {Math.floor(data.elapsedTime / 60)}:{(data.elapsedTime % 60).toString().padStart(2, '0')} elapsed
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-2">
            <div className="text-cyan-400/70 text-xs mb-2">Performance</div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Tech</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${data.performance.tech}%` }}
                  />
                </div>
                <span className="text-cyan-400 text-sm font-medium w-12 text-right">
                  {data.performance.tech.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Finance</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                    style={{ width: `${data.performance.finance}%` }}
                  />
                </div>
                <span className="text-green-400 text-sm font-medium w-12 text-right">
                  {data.performance.finance.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Market</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                    style={{ width: `${data.performance.market}%` }}
                  />
                </div>
                <span className="text-purple-400 text-sm font-medium w-12 text-right">
                  {data.performance.market.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Market Volatility */}
          <div className="bg-yellow-500/10 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400/70 text-xs">Market Volatility</span>
            </div>
            <div className="flex items-center gap-2">
              {data.marketVolatility > 30 ? (
                <TrendingUp className="w-4 h-4 text-red-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-400" />
              )}
              <span className={`font-bold text-sm ${data.marketVolatility > 30 ? 'text-red-400' : 'text-green-400'}`}>
                {data.marketVolatility.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Competitor Activity */}
          {data.competitorActivity.length > 0 && (
            <div className="bg-purple-500/10 rounded-lg p-2">
              <div className="text-purple-400/70 text-xs mb-1">Recent Activity</div>
              <div className="space-y-1">
                {data.competitorActivity.slice(0, 2).map((activity, index) => (
                  <div key={index} className="text-purple-400 text-xs">
                    • {activity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

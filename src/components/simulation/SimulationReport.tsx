import { Download, TrendingUp, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import type { Simulation } from '../../types';

interface SimulationReportProps {
  simulation: Simulation;
  onExport?: () => void;
  onNewSimulation?: () => void;
}

export function SimulationReport({ simulation, onExport, onNewSimulation }: SimulationReportProps) {
  const { performance, result } = simulation;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">Simulation Results</h2>
            <p className="text-white/60 text-sm mt-1">{simulation.studentName}</p>
          </div>
          <div className="flex gap-3">
            {onExport && (
              <button
                onClick={onExport}
                className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            )}
            {onNewSimulation && (
              <button
                onClick={onNewSimulation}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                New Simulation
              </button>
            )}
          </div>
        </div>

        {/* Performance Scores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <div className="text-cyan-400/70 text-sm mb-1">Tech Score</div>
            <div className="text-3xl font-bold text-cyan-400">{performance.tech.toFixed(1)}%</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4">
            <div className="text-green-400/70 text-sm mb-1">Finance Score</div>
            <div className="text-3xl font-bold text-green-400">{performance.finance.toFixed(1)}%</div>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <div className="text-purple-400/70 text-sm mb-1">Market Score</div>
            <div className="text-3xl font-bold text-purple-400">{performance.market.toFixed(1)}%</div>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <div className="text-yellow-400/70 text-sm mb-1">Overall</div>
            <div className="text-3xl font-bold text-yellow-400">{performance.overall.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      {result.riskFactors.length > 0 && (
        <div className="bg-gradient-to-br from-black/50 to-red-500/5 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-red-400">Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {result.riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start gap-2 text-red-400/80">
                <span className="text-red-400 mt-1">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-black/50 to-green-500/5 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-green-400/80">
                <span className="text-green-400 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Competitor Analysis */}
      <div className="bg-gradient-to-br from-black/50 to-purple-500/5 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-purple-400">Competitor Analysis</h3>
        </div>
        <div className="space-y-4">
          {result.competitors.map((competitor, index) => (
            <div key={index} className="bg-purple-500/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-semibold">{competitor.name}</span>
                <span className="text-purple-400 text-sm">{competitor.marketShare.toFixed(1)}% market share</span>
              </div>
              <p className="text-purple-400/70 text-sm">{competitor.strategy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Performance Chart */}
      <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-400">12-Month Performance</h3>
        </div>
        <div className="space-y-3">
          {result.monthlyData.map((month) => (
            <div key={month.month} className="flex items-center gap-4">
              <div className="w-20 text-white/60 text-sm">Month {month.month}</div>
              <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-white/50">Revenue: </span>
                  <span className="text-green-400">${(month.revenue / 1000).toFixed(1)}k</span>
                </div>
                <div>
                  <span className="text-white/50">Costs: </span>
                  <span className="text-red-400">${(month.costs / 1000).toFixed(1)}k</span>
                </div>
                <div>
                  <span className="text-white/50">Profit: </span>
                  <span className="text-cyan-400">${(month.profit / 1000).toFixed(1)}k</span>
                </div>
                <div>
                  <span className="text-white/50">Market: </span>
                  <span className="text-purple-400">{month.marketShare.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Volatility */}
      <div className="bg-gradient-to-br from-black/50 to-yellow-500/5 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Market Volatility</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-black/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
              style={{ width: `${result.marketVolatility}%` }}
            />
          </div>
          <span className="text-yellow-400 font-semibold">{result.marketVolatility.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

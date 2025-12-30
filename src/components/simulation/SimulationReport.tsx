import type { EconomicEngineResult } from '@/types/simulation';
import { LineChart } from '../charts/LineChart';

interface SimulationReportProps {
  studentName: string;
  results: EconomicEngineResult;
  onReset: () => void;
  onExport?: () => void;
}

export function SimulationReport({
  studentName,
  results,
  onReset,
  onExport,
}: SimulationReportProps) {
  const { performance, monthlyData, riskFactors, recommendations, competitorAnalysis } = results;

  // Prepare chart data
  const chartData = {
    labels: monthlyData.map((d) => `Month ${d.month}`),
    datasets: [
      {
        label: 'Technology',
        data: monthlyData.map((d) => d.tech),
        borderColor: '#00ffcc',
        backgroundColor: 'rgba(0, 255, 204, 0.1)',
        fill: true,
      },
      {
        label: 'Finance',
        data: monthlyData.map((d) => d.finance),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Market',
        data: monthlyData.map((d) => d.market),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Innovation',
        data: monthlyData.map((d) => d.innovation),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
      },
    ],
  };

  const performanceScore = Math.round(
    (performance.tech + performance.finance + performance.market + 
     performance.cybersecurity + performance.innovation) / 5
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6 py-6">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Simulation Report
          </h1>
          <p className="text-center text-cyan-400 text-xl">
            Student: <span className="font-bold">{studentName}</span>
          </p>
          <p className="text-center text-gray-400 mt-2">
            Overall Performance Score: <span className="text-cyan-400 font-bold text-2xl">{performanceScore}%</span>
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Technology', value: performance.tech, color: '#00ffcc' },
            { label: 'Finance', value: performance.finance, color: '#3b82f6' },
            { label: 'Market', value: performance.market, color: '#8b5cf6' },
            { label: 'Cybersecurity', value: performance.cybersecurity, color: '#22c55e' },
            { label: 'Innovation', value: performance.innovation, color: '#f59e0b' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-4 text-center"
            >
              <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
              <div className="text-3xl font-bold text-cyan-400">
                {Math.round(metric.value)}%
              </div>
              <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full"
                  style={{ 
                    width: `${metric.value}%`, 
                    background: `linear-gradient(to right, ${metric.color}, ${metric.color}dd)`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Growth Chart */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            12-Month Performance Trajectory
          </h2>
          <LineChart data={chartData} height={400} />
        </div>

        {/* Competitor Analysis */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Competitor Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitorAnalysis.map((competitor) => (
              <div
                key={competitor.name}
                className="bg-black/30 border border-cyan-500/20 rounded-lg p-4"
              >
                <h3 className="text-cyan-400 font-bold mb-2">{competitor.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{competitor.strategy}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Market Share:</span>
                  <span className="text-cyan-400 font-bold">{competitor.marketShare.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Strength:</span>
                  <span className="text-blue-400 font-bold">{competitor.strength.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-black/40 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Risk Factors
          </h2>
          <ul className="space-y-2">
            {riskFactors.map((risk, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 text-gray-300"
              >
                <span className="text-red-400 text-xl">⚠</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-black/40 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Recommendations
          </h2>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 text-gray-300"
              >
                <span className="text-green-400 text-xl">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onExport && (
            <button
              onClick={onExport}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Export Report
            </button>
          )}
          <button
            onClick={onReset}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,204,0.5)]"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            New Simulation
          </button>
        </div>
      </div>
    </div>
  );
}

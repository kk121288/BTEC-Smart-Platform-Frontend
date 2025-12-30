import { useState, useMemo } from 'react';
import { Download, TrendingUp, CheckCircle } from 'lucide-react';
import { useSimulationStore } from '../../store/simulationStore';

export function SimulationComparison() {
  const { history, compareSimulations } = useSimulationStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const comparisonResult = useMemo(() => {
    if (selectedIds.length < 2) return null;
    return compareSimulations(selectedIds);
  }, [selectedIds, compareSimulations]);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleExport = () => {
    alert('Export functionality would generate a PDF comparison report here');
  };

  const getMetricColor = (metric: string) => {
    if (metric.includes('Tech')) return 'text-cyan-400 bg-cyan-500/10';
    if (metric.includes('Finance')) return 'text-green-400 bg-green-500/10';
    if (metric.includes('Market')) return 'text-purple-400 bg-purple-500/10';
    return 'text-yellow-400 bg-yellow-500/10';
  };

  return (
    <div className="space-y-6">
      {/* Selection Panel */}
      <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-cyan-400">
            Select Simulations to Compare ({selectedIds.length}/4)
          </h2>
          {selectedIds.length >= 2 && (
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Comparison
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {history.slice(0, 10).map((simulation) => (
            <button
              key={simulation.id}
              onClick={() => toggleSelection(simulation.id)}
              disabled={!selectedIds.includes(simulation.id) && selectedIds.length >= 4}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedIds.includes(simulation.id)
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : 'border-cyan-500/30 bg-black/30 hover:border-cyan-500/50'
              } ${!selectedIds.includes(simulation.id) && selectedIds.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{simulation.studentName}</span>
                {selectedIds.includes(simulation.id) && (
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                )}
              </div>
              <div className="text-sm text-white/60 mb-2">
                {simulation.decisions.projectType} • {simulation.decisions.budget} budget
              </div>
              <div className="text-sm text-cyan-400">
                Overall: {simulation.performance.overall.toFixed(1)}%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Results */}
      {comparisonResult && comparisonResult.simulations.length >= 2 && (
        <>
          {/* Performance Comparison */}
          <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="text-left py-3 px-4 text-white/70 font-medium">Metric</th>
                    {comparisonResult.simulations.map((sim) => (
                      <th key={sim.id} className="text-left py-3 px-4 text-cyan-400 font-medium">
                        {sim.studentName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-cyan-500/10">
                    <td className="py-3 px-4 text-white/80">Tech Performance</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-cyan-400 font-semibold">
                        {sim.performance.tech.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-cyan-500/10">
                    <td className="py-3 px-4 text-white/80">Finance Performance</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-green-400 font-semibold">
                        {sim.performance.finance.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-cyan-500/10">
                    <td className="py-3 px-4 text-white/80">Market Performance</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-purple-400 font-semibold">
                        {sim.performance.market.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white/80 font-semibold">Overall Score</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-yellow-400 font-bold text-lg">
                        {sim.performance.overall.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Decision Comparison */}
          <div className="bg-gradient-to-br from-black/50 to-purple-500/5 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Decision Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 text-white/70 font-medium">Decision</th>
                    {comparisonResult.simulations.map((sim) => (
                      <th key={sim.id} className="text-left py-3 px-4 text-purple-400 font-medium">
                        {sim.studentName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4 text-white/80">Project Type</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.projectType}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4 text-white/80">Budget</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.budget}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4 text-white/80">Marketing</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.marketing}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4 text-white/80">AI Integration</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.aiIntegration || 'none'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="py-3 px-4 text-white/80">Cybersecurity</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.cybersecurity || 'basic'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white/80">Complexity</td>
                    {comparisonResult.simulations.map((sim) => (
                      <td key={sim.id} className="py-3 px-4 text-white/60">
                        {sim.decisions.complexityLevel}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          {comparisonResult.insights.length > 0 && (
            <div className="bg-gradient-to-br from-black/50 to-green-500/5 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-green-400">Key Insights</h3>
              </div>
              <div className="space-y-3">
                {comparisonResult.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${getMetricColor(insight.metric)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold">{insight.metric}</span>
                      <span className="text-sm">+{insight.difference.toFixed(1)}%</span>
                    </div>
                    <p className="text-sm opacity-90">{insight.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

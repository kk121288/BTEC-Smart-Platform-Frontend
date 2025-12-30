import { useState, useMemo } from 'react';
import { Search, Trash2, Eye, Calendar, TrendingUp } from 'lucide-react';
import { useSimulationStore } from '../../store/simulationStore';
import type { Simulation } from '../../types';

interface SimulationHistoryProps {
  onLoadSimulation?: (simulation: Simulation) => void;
}

export function SimulationHistory({ onLoadSimulation }: SimulationHistoryProps) {
  const { history, deleteSimulation, searchHistory } = useSimulationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'performance'>('date');
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);

  const filteredHistory = useMemo(() => {
    let results = searchQuery ? searchHistory(searchQuery) : history;
    
    if (sortBy === 'performance') {
      results = [...results].sort((a, b) => b.performance.overall - a.performance.overall);
    } else {
      results = [...results].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    
    return results;
  }, [history, searchQuery, sortBy, searchHistory]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this simulation?')) {
      deleteSimulation(id);
      if (selectedSimulation?.id === id) {
        setSelectedSimulation(null);
      }
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
          <input
            type="text"
            placeholder="Search by student name or project type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'performance')}
          className="px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="date">Sort by Date</option>
          <option value="performance">Sort by Performance</option>
        </select>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-12 text-center">
          <Calendar className="w-12 h-12 text-cyan-400/30 mx-auto mb-4" />
          <p className="text-white/60">No simulation history found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((simulation) => (
            <div
              key={simulation.id}
              className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{simulation.studentName}</h3>
                    <span className="text-sm text-white/50">{formatDate(simulation.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-cyan-400">
                      {simulation.decisions.projectType.charAt(0).toUpperCase() + simulation.decisions.projectType.slice(1)}
                    </span>
                    <span className="text-sm text-white/50">•</span>
                    <span className="text-sm text-white/60">
                      {simulation.decisions.budget.charAt(0).toUpperCase() + simulation.decisions.budget.slice(1)} Budget
                    </span>
                    <span className="text-sm text-white/50">•</span>
                    <span className="text-sm text-white/60">
                      {simulation.decisions.marketing === 'socialMedia' ? 'Social Media' : 
                       simulation.decisions.marketing.charAt(0).toUpperCase() + simulation.decisions.marketing.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(simulation.performance.overall)}`}>
                      Overall: {simulation.performance.overall.toFixed(1)}%
                    </div>
                    <div className="text-sm text-cyan-400">
                      Tech: {simulation.performance.tech.toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-400">
                      Finance: {simulation.performance.finance.toFixed(1)}%
                    </div>
                    <div className="text-sm text-purple-400">
                      Market: {simulation.performance.market.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSimulation(selectedSimulation?.id === simulation.id ? null : simulation)}
                    className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-cyan-400" />
                  </button>
                  {onLoadSimulation && (
                    <button
                      onClick={() => onLoadSimulation(simulation)}
                      className="p-2 hover:bg-green-500/20 rounded transition-colors group relative"
                      title="Load for Comparison"
                    >
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(simulation.id)}
                    className="p-2 hover:bg-red-500/20 rounded transition-colors group relative"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedSimulation?.id === simulation.id && (
                <div className="mt-4 pt-4 border-t border-cyan-500/20 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Decisions</h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-white/60">
                          <span className="text-white/80">Complexity:</span> {simulation.decisions.complexityLevel}
                        </div>
                        <div className="text-white/60">
                          <span className="text-white/80">Cybersecurity:</span> {simulation.decisions.cybersecurity}
                        </div>
                        <div className="text-white/60">
                          <span className="text-white/80">AI Integration:</span> {simulation.decisions.aiIntegration}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Risk Factors</h4>
                      <div className="space-y-1 text-sm">
                        {simulation.result.riskFactors.slice(0, 3).map((risk, i) => (
                          <div key={i} className="text-red-400/80 text-xs">• {risk}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

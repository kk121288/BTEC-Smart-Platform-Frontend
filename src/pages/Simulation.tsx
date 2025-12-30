import { useState, useEffect, useCallback } from 'react';
import { Play, History, GitCompare } from 'lucide-react';
import { SimulationSetup } from '../components/simulation/SimulationSetup';
import { VirtualEnvironment } from '../components/simulation/VirtualEnvironment';
import { SimulationDataViewer } from '../components/simulation/SimulationDataViewer';
import { SimulationReport } from '../components/simulation/SimulationReport';
import { SimulationHistory } from '../components/simulation/SimulationHistory';
import { SimulationComparison } from '../components/simulation/SimulationComparison';
import { SimulationTimeline } from '../components/simulation/SimulationTimeline';
import { EconomicEngine } from '../components/simulation/EconomicEngine';
import { useSimulationStore } from '../store/simulationStore';
import type { SimulationDecisions, Simulation, LiveSimulationData } from '../types';

type SimulationPhase = 'setup' | 'running' | 'results';
type Tab = 'run' | 'history' | 'compare';

export default function SimulationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('run');
  const [phase, setPhase] = useState<SimulationPhase>('setup');
  const [studentName, setStudentName] = useState('');
  const [decisions, setDecisions] = useState<SimulationDecisions | null>(null);
  const [liveData, setLiveData] = useState<LiveSimulationData | null>(null);
  const [showDataViewer, setShowDataViewer] = useState(true);

  const { currentSimulation, saveSimulation, setCurrentSimulation } = useSimulationStore();

  const completeSimulation = useCallback((result: ReturnType<EconomicEngine['calculate']>) => {
    const simulation: Simulation = {
      id: `sim-${Date.now()}`,
      studentName,
      decisions: decisions!,
      performance: result.performance,
      result,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    saveSimulation(simulation);
    setCurrentSimulation(simulation);
    setPhase('results');
  }, [studentName, decisions, saveSimulation, setCurrentSimulation]);

  useEffect(() => {
    if (phase === 'running' && decisions) {
      // Simulate progression through months
      let month = 1;
      let elapsed = 0;
      const engine = new EconomicEngine(decisions);
      const result = engine.calculate();
      
      const interval = setInterval(() => {
        elapsed += 1;
        
        if (month <= 12) {
          setLiveData({
            currentMonth: month,
            performance: result.performance,
            marketVolatility: result.marketVolatility,
            competitorActivity: [
              `Month ${month}: ${result.competitors[Math.floor(Math.random() * 3)].name} launched new campaign`,
            ],
            elapsedTime: elapsed,
          });
          
          month++;
        } else {
          clearInterval(interval);
          // Complete the simulation
          completeSimulation(result);
        }
      }, 500); // Fast simulation for demo

      return () => clearInterval(interval);
    }
  }, [phase, decisions, completeSimulation]);

  const handleStart = (name: string, newDecisions: SimulationDecisions) => {
    setStudentName(name);
    setDecisions(newDecisions);
    setPhase('running');
  };

  const handleNewSimulation = () => {
    setPhase('setup');
    setStudentName('');
    setDecisions(null);
    setLiveData(null);
    setCurrentSimulation(null);
  };

  const handleExport = () => {
    alert('Export functionality would generate a PDF report here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            Business Simulation
          </h1>
          <p className="text-white/60">
            Experience a 3D virtual business environment with real-time performance metrics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-cyan-500/20">
          <button
            onClick={() => setActiveTab('run')}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === 'run'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-white/60 border-transparent hover:text-white/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>Run Simulation</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === 'history'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-white/60 border-transparent hover:text-white/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === 'compare'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-white/60 border-transparent hover:text-white/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4" />
              <span>Compare</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'run' && (
          <div>
            {phase === 'setup' && (
              <SimulationSetup onStart={handleStart} />
            )}

            {phase === 'running' && decisions && liveData && (
              <div className="space-y-6">
                <div className="relative">
                  <VirtualEnvironment decisions={decisions} />
                  <SimulationDataViewer
                    data={liveData}
                    isVisible={showDataViewer}
                    onToggle={() => setShowDataViewer(!showDataViewer)}
                  />
                </div>
                <div className="text-center text-cyan-400 text-lg font-semibold animate-pulse">
                  Simulating Month {liveData.currentMonth} of 12...
                </div>
              </div>
            )}

            {phase === 'results' && currentSimulation && (
              <div className="space-y-6">
                <SimulationReport
                  simulation={currentSimulation}
                  onExport={handleExport}
                  onNewSimulation={handleNewSimulation}
                />
                <SimulationTimeline
                  monthlyData={currentSimulation.result.monthlyData}
                  currentMonth={12}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <SimulationHistory />
        )}

        {activeTab === 'compare' && (
          <SimulationComparison />
        )}
      </div>
    </div>
  );
}

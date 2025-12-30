import { useState } from 'react';
import type { SimulationDecisions, SimulationView, EconomicEngineResult } from '@/types/simulation';
import { SimulationSetup } from '@/components/simulation/SimulationSetup';
import { SimulationLoading } from '@/components/simulation/SimulationLoading';
import { VirtualEnvironment } from '@/components/simulation/VirtualEnvironment';
import { SimulationReport } from '@/components/simulation/SimulationReport';
import { runEconomicEngine } from '@/components/simulation/EconomicEngine';

export default function Simulation() {
  const [view, setView] = useState<SimulationView>('setup');
  const [studentName, setStudentName] = useState('');
  const [decisions, setDecisions] = useState<SimulationDecisions | null>(null);
  const [results, setResults] = useState<EconomicEngineResult | null>(null);

  const handleStart = (name: string, newDecisions: SimulationDecisions) => {
    setStudentName(name);
    setDecisions(newDecisions);
    setView('loading');
  };

  const handleLoadingComplete = () => {
    if (decisions) {
      // Run the economic engine
      const engineResults = runEconomicEngine(decisions);
      setResults(engineResults);
      setView('simulation');
      
      // After 5 seconds in simulation view, show report
      setTimeout(() => {
        setView('report');
      }, 5000);
    }
  };

  const handleReset = () => {
    setView('setup');
    setStudentName('');
    setDecisions(null);
    setResults(null);
  };

  const handleExport = () => {
    // TODO: Implement export functionality using export service
    console.log('Export report');
    alert('Export functionality will be available when backend is connected');
  };

  return (
    <div className="min-h-screen">
      {view === 'setup' && <SimulationSetup onStart={handleStart} />}
      
      {view === 'loading' && <SimulationLoading onComplete={handleLoadingComplete} />}
      
      {view === 'simulation' && decisions && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="h-screen flex flex-col">
            <div className="bg-black/40 backdrop-blur-lg border-b border-cyan-500/30 p-4">
              <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {studentName}'s Virtual Business World
              </h1>
              <p className="text-center text-cyan-400 mt-2">
                Analyzing your business environment...
              </p>
            </div>
            <div className="flex-1">
              <VirtualEnvironment budget={decisions.budget} />
            </div>
          </div>
        </div>
      )}
      
      {view === 'report' && results && (
        <SimulationReport
          studentName={studentName}
          results={results}
          onReset={handleReset}
          onExport={handleExport}
        />
      )}
    </div>
  );
}

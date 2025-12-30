import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Simulation, ComparisonResult, ComparisonInsight } from '../types';

interface SimulationStore {
  currentSimulation: Simulation | null;
  history: Simulation[];
  isRunning: boolean;
  currentMonth: number;
  
  // Actions
  setCurrentSimulation: (simulation: Simulation | null) => void;
  setIsRunning: (isRunning: boolean) => void;
  setCurrentMonth: (month: number) => void;
  saveSimulation: (simulation: Simulation) => void;
  loadHistory: () => void;
  deleteSimulation: (id: string) => void;
  searchHistory: (query: string) => Simulation[];
  compareSimulations: (ids: string[]) => ComparisonResult;
  clearHistory: () => void;
}

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      currentSimulation: null,
      history: [],
      isRunning: false,
      currentMonth: 0,

      setCurrentSimulation: (simulation) => set({ currentSimulation: simulation }),
      
      setIsRunning: (isRunning) => set({ isRunning }),
      
      setCurrentMonth: (month) => set({ currentMonth: month }),
      
      saveSimulation: (simulation) => {
        const history = get().history;
        const updatedHistory = [simulation, ...history].slice(0, 50); // Keep last 50
        set({ history: updatedHistory, currentSimulation: simulation });
      },
      
      loadHistory: () => {
        // History is automatically loaded from localStorage via persist middleware
        // This method can be used to trigger a re-render or fetch from API
      },
      
      deleteSimulation: (id) => {
        const history = get().history.filter(sim => sim.id !== id);
        set({ history });
      },
      
      searchHistory: (query) => {
        const history = get().history;
        if (!query) return history;
        
        const lowerQuery = query.toLowerCase();
        return history.filter(sim => 
          sim.studentName.toLowerCase().includes(lowerQuery) ||
          sim.decisions.projectType.toLowerCase().includes(lowerQuery)
        );
      },
      
      compareSimulations: (ids) => {
        const history = get().history;
        const simulations = history.filter(sim => ids.includes(sim.id));
        
        if (simulations.length < 2) {
          return { simulations: [], insights: [] };
        }
        
        const insights = generateInsights(simulations);
        return { simulations, insights };
      },
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'simulation-storage',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);

// Helper function to generate comparison insights
function generateInsights(simulations: Simulation[]): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];
  
  // Compare tech performance
  const techScores = simulations.map(s => ({ id: s.id, name: s.studentName, score: s.performance.tech }));
  const bestTech = techScores.reduce((a, b) => a.score > b.score ? a : b);
  const worstTech = techScores.reduce((a, b) => a.score < b.score ? a : b);
  
  if (bestTech.score - worstTech.score > 10) {
    insights.push({
      metric: 'Tech Performance',
      winner: bestTech.id,
      difference: bestTech.score - worstTech.score,
      recommendation: `${bestTech.name}'s tech approach with ${simulations.find(s => s.id === bestTech.id)?.decisions.aiIntegration || 'basic'} AI integration performed ${(bestTech.score - worstTech.score).toFixed(1)}% better`
    });
  }
  
  // Compare financial performance
  const financeScores = simulations.map(s => ({ id: s.id, name: s.studentName, score: s.performance.finance }));
  const bestFinance = financeScores.reduce((a, b) => a.score > b.score ? a : b);
  const worstFinance = financeScores.reduce((a, b) => a.score < b.score ? a : b);
  
  if (bestFinance.score - worstFinance.score > 10) {
    insights.push({
      metric: 'Financial Stability',
      winner: bestFinance.id,
      difference: bestFinance.score - worstFinance.score,
      recommendation: `${bestFinance.name}'s ${simulations.find(s => s.id === bestFinance.id)?.decisions.budget} budget strategy was ${(bestFinance.score - worstFinance.score).toFixed(1)}% more stable`
    });
  }
  
  // Compare market performance
  const marketScores = simulations.map(s => ({ id: s.id, name: s.studentName, score: s.performance.market }));
  const bestMarket = marketScores.reduce((a, b) => a.score > b.score ? a : b);
  const worstMarket = marketScores.reduce((a, b) => a.score < b.score ? a : b);
  
  if (bestMarket.score - worstMarket.score > 10) {
    insights.push({
      metric: 'Market Share',
      winner: bestMarket.id,
      difference: bestMarket.score - worstMarket.score,
      recommendation: `${bestMarket.name}'s ${simulations.find(s => s.id === bestMarket.id)?.decisions.marketing} marketing achieved ${(bestMarket.score - worstMarket.score).toFixed(1)}% better market penetration`
    });
  }
  
  return insights;
}

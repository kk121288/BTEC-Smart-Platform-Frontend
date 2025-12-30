import { create } from 'zustand';
import type { Simulation } from '@/types/simulation';

interface SimulationStore {
  currentSimulation: Simulation | null;
  history: Simulation[];
  isRunning: boolean;
  setCurrentSimulation: (simulation: Simulation | null) => void;
  setHistory: (history: Simulation[]) => void;
  setIsRunning: (isRunning: boolean) => void;
  addToHistory: (simulation: Simulation) => void;
  reset: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  currentSimulation: null,
  history: [],
  isRunning: false,
  
  setCurrentSimulation: (simulation) => set({ currentSimulation: simulation }),
  
  setHistory: (history) => set({ history }),
  
  setIsRunning: (isRunning) => set({ isRunning }),
  
  addToHistory: (simulation) =>
    set((state) => ({
      history: [simulation, ...state.history],
    })),
  
  reset: () =>
    set({
      currentSimulation: null,
      history: [],
      isRunning: false,
    }),
}));

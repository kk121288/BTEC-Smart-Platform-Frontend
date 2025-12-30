import { apiClient } from '@/lib/api-client';
import type { Simulation, SimulationDecisions } from '@/types/simulation';

export const simulationService = {
  /**
   * Start a new simulation
   */
  async start(studentName: string, decisions: SimulationDecisions): Promise<{ simulationId: string; status: string }> {
    const response = await apiClient.post('/simulation/start', {
      studentName,
      decisions,
    });
    return response.data;
  },

  /**
   * Save simulation results
   */
  async save(simulation: Omit<Simulation, 'id'>): Promise<{ success: boolean; savedId: string }> {
    const response = await apiClient.post('/simulation/save', simulation);
    return response.data;
  },

  /**
   * Get simulation history for a student
   */
  async getHistory(studentName: string): Promise<{ simulations: Simulation[] }> {
    const response = await apiClient.get(`/simulation/history/${encodeURIComponent(studentName)}`);
    return response.data;
  },

  /**
   * Get specific simulation results
   */
  async getResults(id: string): Promise<Simulation> {
    const response = await apiClient.get(`/simulation/results/${id}`);
    return response.data;
  },

  /**
   * Get leaderboard
   */
  async getLeaderboard(): Promise<{ topPerformers: Array<{ studentName: string; score: number; timestamp: number }> }> {
    const response = await apiClient.get('/simulation/leaderboard');
    return response.data;
  },
};

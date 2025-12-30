export type ProjectType = 'tech' | 'finance' | 'marketing';
export type BudgetLevel = 'low' | 'medium' | 'high';
export type MarketingStrategy = 'socialMedia' | 'traditional' | 'influencer';
export type ComplexityLevel = 'Basic' | 'Intermediate' | 'Advanced';
export type CybersecurityLevel = 'basic' | 'advanced' | 'enterprise';
export type AIIntegrationLevel = 'none' | 'basic' | 'advanced';

export interface SimulationDecisions {
  projectType: ProjectType;
  budget: BudgetLevel;
  marketing: MarketingStrategy;
  complexityLevel: ComplexityLevel;
  cybersecurity: CybersecurityLevel;
  aiIntegration: AIIntegrationLevel;
}

export interface SimulationPerformance {
  tech: number;
  finance: number;
  market: number;
  cybersecurity: number;
  innovation: number;
}

export interface MonthlyPerformance {
  month: number;
  tech: number;
  finance: number;
  market: number;
  innovation: number;
  revenue: number;
}

export interface CompetitorData {
  name: string;
  strategy: string;
  marketShare: number;
  strength: number;
}

export interface EconomicEngineResult {
  performance: SimulationPerformance;
  monthlyData: MonthlyPerformance[];
  riskFactors: string[];
  recommendations: string[];
  competitorAnalysis: CompetitorData[];
  marketVolatility: number;
  growthRate: number;
}

export interface Simulation {
  id: string;
  studentName: string;
  decisions: SimulationDecisions;
  results: EconomicEngineResult;
  timestamp: number;
  score: number;
}

export type SimulationView = 'setup' | 'loading' | 'simulation' | 'report';

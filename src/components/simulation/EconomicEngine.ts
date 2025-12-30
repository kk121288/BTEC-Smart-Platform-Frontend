import type {
  SimulationDecisions,
  EconomicEngineResult,
  SimulationPerformance,
  MonthlyPerformance,
  CompetitorData,
} from '@/types/simulation';
import { randomInRange, clamp } from '@/lib/utils';

/**
 * Advanced Economic Simulation Engine
 * 
 * This engine simulates a complex business environment with:
 * - Market volatility and random fluctuations
 * - Competitor AI with different strategies
 * - Tech efficiency based on decisions
 * - Financial stability calculations
 * - Market share dynamics
 * - Risk assessment
 * - 12-month growth trajectory
 */

const BUDGET_MULTIPLIERS = {
  low: 0.6,
  medium: 1.0,
  high: 1.5,
};

const PROJECT_TYPE_WEIGHTS = {
  tech: { tech: 1.5, finance: 0.8, market: 1.0, innovation: 1.4 },
  finance: { tech: 0.8, finance: 1.5, market: 1.1, innovation: 0.9 },
  marketing: { tech: 0.7, finance: 1.0, market: 1.6, innovation: 1.1 },
};

const MARKETING_EFFECTIVENESS = {
  socialMedia: 1.3,
  traditional: 0.9,
  influencer: 1.5,
};

const CYBERSECURITY_IMPACT = {
  basic: { security: 0.6, cost: 0.9 },
  advanced: { security: 1.0, cost: 1.1 },
  enterprise: { security: 1.4, cost: 1.3 },
};

const AI_INTEGRATION_BOOST = {
  none: 0,
  basic: 0.2,
  advanced: 0.5,
};

/**
 * Generate competitor data with AI-driven strategies
 */
function generateCompetitors(): CompetitorData[] {
  const strategies = [
    'Aggressive pricing strategy',
    'Innovation-focused approach',
    'Quality and premium positioning',
  ];
  
  return strategies.map((strategy, index) => ({
    name: `Competitor ${String.fromCharCode(65 + index)}`,
    strategy,
    marketShare: randomInRange(15, 30),
    strength: randomInRange(60, 85),
  }));
}

/**
 * Calculate market volatility (0-50% random fluctuation)
 */
function calculateMarketVolatility(): number {
  return randomInRange(0, 50);
}

/**
 * Calculate tech efficiency based on project type and AI integration
 */
function calculateTechEfficiency(decisions: SimulationDecisions): number {
  const baseEfficiency = 70;
  const projectWeight = PROJECT_TYPE_WEIGHTS[decisions.projectType].tech;
  const aiBoost = AI_INTEGRATION_BOOST[decisions.aiIntegration];
  const budgetMultiplier = BUDGET_MULTIPLIERS[decisions.budget];
  
  const efficiency = baseEfficiency * projectWeight * (1 + aiBoost) * budgetMultiplier;
  return clamp(efficiency, 0, 100);
}

/**
 * Calculate financial stability
 */
function calculateFinancialStability(decisions: SimulationDecisions): number {
  const baseStability = 65;
  const projectWeight = PROJECT_TYPE_WEIGHTS[decisions.projectType].finance;
  const budgetMultiplier = BUDGET_MULTIPLIERS[decisions.budget];
  const securityCost = CYBERSECURITY_IMPACT[decisions.cybersecurity].cost;
  
  const stability = baseStability * projectWeight * budgetMultiplier / securityCost;
  return clamp(stability, 0, 100);
}

/**
 * Calculate market share based on marketing strategy and innovation
 */
function calculateMarketShare(decisions: SimulationDecisions): number {
  const baseShare = 20;
  const projectWeight = PROJECT_TYPE_WEIGHTS[decisions.projectType].market;
  const marketingBoost = MARKETING_EFFECTIVENESS[decisions.marketing];
  const aiBoost = AI_INTEGRATION_BOOST[decisions.aiIntegration];
  
  const marketShare = baseShare * projectWeight * marketingBoost * (1 + aiBoost);
  return clamp(marketShare, 0, 100);
}

/**
 * Calculate cybersecurity score
 */
function calculateCybersecurity(decisions: SimulationDecisions): number {
  const baseScore = 50;
  const securityLevel = CYBERSECURITY_IMPACT[decisions.cybersecurity].security;
  const budgetMultiplier = BUDGET_MULTIPLIERS[decisions.budget];
  
  const score = baseScore * securityLevel * budgetMultiplier;
  return clamp(score, 0, 100);
}

/**
 * Calculate innovation score
 */
function calculateInnovation(decisions: SimulationDecisions): number {
  const baseInnovation = 60;
  const projectWeight = PROJECT_TYPE_WEIGHTS[decisions.projectType].innovation;
  const aiBoost = AI_INTEGRATION_BOOST[decisions.aiIntegration];
  const budgetMultiplier = BUDGET_MULTIPLIERS[decisions.budget];
  
  const innovation = baseInnovation * projectWeight * (1 + aiBoost) * budgetMultiplier;
  return clamp(innovation, 0, 100);
}

/**
 * Generate 12-month performance data with growth trajectory
 */
function generateMonthlyData(
  performance: SimulationPerformance,
  volatility: number
): MonthlyPerformance[] {
  const monthlyData: MonthlyPerformance[] = [];
  const growthRate = (performance.market + performance.innovation) / 200;
  
  for (let month = 1; month <= 12; month++) {
    const volatilityFactor = 1 + (randomInRange(-volatility, volatility) / 100);
    const growthFactor = 1 + (growthRate * month / 12);
    const monthFactor = volatilityFactor * growthFactor;
    
    monthlyData.push({
      month,
      tech: clamp(performance.tech * monthFactor, 0, 100),
      finance: clamp(performance.finance * monthFactor, 0, 100),
      market: clamp(performance.market * monthFactor, 0, 100),
      innovation: clamp(performance.innovation * monthFactor, 0, 100),
      revenue: Math.round(
        (performance.finance * performance.market * monthFactor) / 10
      ),
    });
  }
  
  return monthlyData;
}

/**
 * Assess risk factors based on decisions
 */
function assessRiskFactors(decisions: SimulationDecisions): string[] {
  const risks: string[] = [];
  
  if (decisions.budget === 'low') {
    risks.push('Limited budget may restrict growth opportunities');
  }
  
  if (decisions.cybersecurity === 'basic') {
    risks.push('Basic cybersecurity poses data breach risks');
  }
  
  if (decisions.marketing === 'traditional') {
    risks.push('Traditional marketing may have limited reach');
  }
  
  if (decisions.aiIntegration === 'none') {
    risks.push('No AI integration may reduce competitiveness');
  }
  
  if (decisions.budget === 'high' && decisions.projectType === 'tech') {
    risks.push('High investment in tech requires sustained innovation');
  }
  
  return risks;
}

/**
 * Generate recommendations based on performance and decisions
 */
function generateRecommendations(
  decisions: SimulationDecisions,
  performance: SimulationPerformance
): string[] {
  const recommendations: string[] = [];
  
  if (performance.tech < 70) {
    recommendations.push('Consider upgrading technology infrastructure');
  }
  
  if (performance.finance < 65) {
    recommendations.push('Implement cost optimization strategies');
  }
  
  if (performance.market < 60) {
    recommendations.push('Enhance marketing efforts and brand visibility');
  }
  
  if (performance.cybersecurity < 70) {
    recommendations.push('Upgrade cybersecurity measures to protect assets');
  }
  
  if (performance.innovation < 65) {
    recommendations.push('Invest in R&D and innovation initiatives');
  }
  
  if (decisions.aiIntegration === 'none') {
    recommendations.push('Explore AI integration for competitive advantage');
  }
  
  return recommendations;
}

/**
 * Main economic engine function
 * Runs the complete simulation and returns results
 */
export function runEconomicEngine(
  decisions: SimulationDecisions
): EconomicEngineResult {
  // Calculate market volatility
  const marketVolatility = calculateMarketVolatility();
  
  // Calculate performance metrics
  const performance: SimulationPerformance = {
    tech: calculateTechEfficiency(decisions),
    finance: calculateFinancialStability(decisions),
    market: calculateMarketShare(decisions),
    cybersecurity: calculateCybersecurity(decisions),
    innovation: calculateInnovation(decisions),
  };
  
  // Generate monthly performance data
  const monthlyData = generateMonthlyData(performance, marketVolatility);
  
  // Generate competitor analysis
  const competitorAnalysis = generateCompetitors();
  
  // Assess risks
  const riskFactors = assessRiskFactors(decisions);
  
  // Generate recommendations
  const recommendations = generateRecommendations(decisions, performance);
  
  // Calculate overall growth rate
  const growthRate = (
    (performance.market + performance.innovation + performance.tech) / 3
  ) / 10;
  
  return {
    performance,
    monthlyData,
    riskFactors,
    recommendations,
    competitorAnalysis,
    marketVolatility,
    growthRate,
  };
}

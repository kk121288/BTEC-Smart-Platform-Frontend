import type { SimulationDecisions, EconomicEngineResult, MonthlyData, CompetitorData, SimulationPerformance } from '../../types';

export class EconomicEngine {
  private decisions: SimulationDecisions;
  private volatility: number;

  constructor(decisions: SimulationDecisions) {
    this.decisions = decisions;
    this.volatility = Math.random() * 0.5; // 0-50% volatility
  }

  calculate(): EconomicEngineResult {
    const performance = this.calculatePerformance();
    const monthlyData = this.generateMonthlyData(performance);
    const competitors = this.generateCompetitors();
    const riskFactors = this.identifyRiskFactors();
    const recommendations = this.generateRecommendations();

    return {
      performance,
      monthlyData,
      marketVolatility: this.volatility * 100,
      riskFactors,
      recommendations,
      competitors,
    };
  }

  private calculatePerformance(): SimulationPerformance {
    // Tech Score Calculation
    let techScore = 50; // Base score
    
    // Project type multiplier
    if (this.decisions.projectType === 'tech') techScore += 20;
    else if (this.decisions.projectType === 'finance') techScore += 10;
    else techScore += 5;
    
    // AI integration boost
    if (this.decisions.aiIntegration === 'advanced') techScore += 15;
    else if (this.decisions.aiIntegration === 'basic') techScore += 8;
    
    // Complexity level
    if (this.decisions.complexityLevel === 'Advanced') techScore += 10;
    else if (this.decisions.complexityLevel === 'Intermediate') techScore += 5;
    
    techScore = Math.min(100, techScore + (Math.random() * 10 - 5));

    // Finance Score Calculation
    let financeScore = 50;
    
    // Budget impact
    if (this.decisions.budget === 'high') financeScore += 25;
    else if (this.decisions.budget === 'medium') financeScore += 15;
    else financeScore += 5;
    
    // Cybersecurity protection
    if (this.decisions.cybersecurity === 'enterprise') financeScore += 15;
    else if (this.decisions.cybersecurity === 'advanced') financeScore += 10;
    else financeScore += 3;
    
    // Apply volatility
    financeScore *= (1 - this.volatility);
    financeScore = Math.min(100, financeScore + (Math.random() * 10 - 5));

    // Market Score Calculation
    let marketScore = 50;
    
    // Marketing strategy
    if (this.decisions.marketing === 'socialMedia') marketScore += 30;
    else if (this.decisions.marketing === 'influencer') marketScore += 25;
    else marketScore += 10;
    
    // Project type fit with market
    if (this.decisions.projectType === 'marketing') marketScore += 15;
    else if (this.decisions.projectType === 'finance') marketScore += 8;
    
    // Budget for marketing
    if (this.decisions.budget === 'high') marketScore += 10;
    else if (this.decisions.budget === 'medium') marketScore += 5;
    
    marketScore = Math.min(100, marketScore + (Math.random() * 10 - 5));

    const overall = (techScore + financeScore + marketScore) / 3;

    return {
      tech: Math.round(techScore * 10) / 10,
      finance: Math.round(financeScore * 10) / 10,
      market: Math.round(marketScore * 10) / 10,
      overall: Math.round(overall * 10) / 10,
    };
  }

  private generateMonthlyData(performance: SimulationPerformance): MonthlyData[] {
    const data: MonthlyData[] = [];
    const baseRevenue = this.decisions.budget === 'high' ? 100000 : 
                      this.decisions.budget === 'medium' ? 50000 : 20000;
    
    for (let month = 1; month <= 12; month++) {
      const growthRate = performance.overall / 100;
      const monthlyGrowth = 1 + (growthRate * 0.1 * month) + (Math.random() * 0.1 - 0.05);
      
      const revenue = baseRevenue * monthlyGrowth;
      const costs = revenue * (0.7 - (performance.finance / 200)); // Better finance = lower costs
      const profit = revenue - costs;
      const marketShare = (performance.market / 100) * (10 + month * 0.5);
      
      data.push({
        month,
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(profit),
        marketShare: Math.round(marketShare * 10) / 10,
        techScore: performance.tech + (Math.random() * 10 - 5),
        financeScore: performance.finance + (Math.random() * 10 - 5),
      });
    }
    
    return data;
  }

  private generateCompetitors(): CompetitorData[] {
    return [
      {
        name: 'TechCorp Inc.',
        marketShare: 25 + Math.random() * 10,
        strategy: 'Aggressive expansion with high R&D investment',
      },
      {
        name: 'InnovateLabs',
        marketShare: 20 + Math.random() * 10,
        strategy: 'Focus on AI and automation technologies',
      },
      {
        name: 'MarketLeaders Co.',
        marketShare: 15 + Math.random() * 10,
        strategy: 'Strong social media presence and influencer partnerships',
      },
    ];
  }

  private identifyRiskFactors(): string[] {
    const risks: string[] = [];
    
    if (this.decisions.budget === 'low') {
      risks.push('Limited budget may restrict growth opportunities');
    }
    
    if (!this.decisions.cybersecurity || this.decisions.cybersecurity === 'basic') {
      risks.push('Basic cybersecurity poses significant data breach risks');
    }
    
    if (this.decisions.marketing === 'traditional') {
      risks.push('Traditional marketing may not reach digital-native customers');
    }
    
    if (!this.decisions.aiIntegration || this.decisions.aiIntegration === 'none') {
      risks.push('Lack of AI integration may reduce competitive advantage');
    }
    
    if (this.volatility > 0.3) {
      risks.push('High market volatility detected - financial stability at risk');
    }
    
    if (this.decisions.complexityLevel === 'Basic' && this.decisions.projectType === 'tech') {
      risks.push('Basic complexity level may not meet tech project requirements');
    }
    
    return risks;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.decisions.budget !== 'high') {
      recommendations.push('Consider increasing budget allocation for faster growth');
    }
    
    if (this.decisions.aiIntegration !== 'advanced') {
      recommendations.push('Upgrade to advanced AI integration for 15% efficiency boost');
    }
    
    if (this.decisions.cybersecurity !== 'enterprise') {
      recommendations.push('Enterprise-level cybersecurity reduces risk by 90%');
    }
    
    if (this.decisions.marketing === 'traditional') {
      recommendations.push('Switch to social media marketing for 30% better reach');
    }
    
    if (this.decisions.complexityLevel === 'Basic') {
      recommendations.push('Advance to Intermediate or Advanced for better performance');
    }
    
    return recommendations;
  }
}

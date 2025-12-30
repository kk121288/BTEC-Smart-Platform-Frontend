import { useState } from 'react';
import type { SimulationDecisions } from '../../types';

interface SimulationSetupProps {
  onStart: (studentName: string, decisions: SimulationDecisions) => void;
}

export function SimulationSetup({ onStart }: SimulationSetupProps) {
  const [studentName, setStudentName] = useState('');
  const [decisions, setDecisions] = useState<SimulationDecisions>({
    projectType: 'tech',
    budget: 'medium',
    marketing: 'socialMedia',
    complexityLevel: 'Intermediate',
    cybersecurity: 'advanced',
    aiIntegration: 'basic',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      onStart(studentName, decisions);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-black/50 to-cyan-500/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Setup Your Business Simulation</h2>
        
        {/* Student Name */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Project Type */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Project Type</label>
          <div className="grid grid-cols-3 gap-3">
            {(['tech', 'finance', 'marketing'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDecisions({ ...decisions, projectType: type })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.projectType === type
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Budget</label>
          <div className="grid grid-cols-3 gap-3">
            {(['low', 'medium', 'high'] as const).map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => setDecisions({ ...decisions, budget })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.budget === budget
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {budget.charAt(0).toUpperCase() + budget.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Marketing Strategy */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Marketing Strategy</label>
          <div className="grid grid-cols-3 gap-3">
            {(['socialMedia', 'traditional', 'influencer'] as const).map((marketing) => (
              <button
                key={marketing}
                type="button"
                onClick={() => setDecisions({ ...decisions, marketing })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.marketing === marketing
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {marketing === 'socialMedia' ? 'Social Media' : marketing.charAt(0).toUpperCase() + marketing.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Level */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Complexity Level</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Basic', 'Intermediate', 'Advanced'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDecisions({ ...decisions, complexityLevel: level })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.complexityLevel === level
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Cybersecurity */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">Cybersecurity Level</label>
          <div className="grid grid-cols-3 gap-3">
            {(['basic', 'advanced', 'enterprise'] as const).map((cyber) => (
              <button
                key={cyber}
                type="button"
                onClick={() => setDecisions({ ...decisions, cybersecurity: cyber })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.cybersecurity === cyber
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {cyber.charAt(0).toUpperCase() + cyber.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* AI Integration */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2 text-sm">AI Integration</label>
          <div className="grid grid-cols-3 gap-3">
            {(['none', 'basic', 'advanced'] as const).map((ai) => (
              <button
                key={ai}
                type="button"
                onClick={() => setDecisions({ ...decisions, aiIntegration: ai })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  decisions.aiIntegration === ai
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-black/30 border-cyan-500/30 text-white/60 hover:border-cyan-500/50'
                }`}
              >
                {ai.charAt(0).toUpperCase() + ai.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/20"
        >
          Generate Virtual World
        </button>
      </div>
    </form>
  );
}

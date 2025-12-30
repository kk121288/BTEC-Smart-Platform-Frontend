import { useState } from 'react';
import type { SimulationDecisions } from '@/types/simulation';

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

  const updateDecision = <K extends keyof SimulationDecisions>(
    key: K,
    value: SimulationDecisions[K]
  ) => {
    setDecisions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
          <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            BTEC Virtual World
          </h1>
          <p className="text-center text-cyan-400 mb-8 text-lg">
            Business Simulation Experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Name */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Project Type | نوع المشروع
              </label>
              <select
                value={decisions.projectType}
                onChange={(e) => updateDecision('projectType', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="tech">Technology | التكنولوجيا</option>
                <option value="finance">Finance | المالية</option>
                <option value="marketing">Marketing | التسويق</option>
              </select>
            </div>

            {/* Budget Level */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Budget Level | مستوى الميزانية
              </label>
              <select
                value={decisions.budget}
                onChange={(e) => updateDecision('budget', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="low">Low | منخفض</option>
                <option value="medium">Medium | متوسط</option>
                <option value="high">High | مرتفع</option>
              </select>
            </div>

            {/* Marketing Strategy */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Marketing Strategy | استراتيجية التسويق
              </label>
              <select
                value={decisions.marketing}
                onChange={(e) => updateDecision('marketing', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="socialMedia">Social Media | وسائل التواصل</option>
                <option value="traditional">Traditional | تقليدية</option>
                <option value="influencer">Influencer | المؤثرون</option>
              </select>
            </div>

            {/* Complexity Level */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Complexity Level | مستوى التعقيد
              </label>
              <select
                value={decisions.complexityLevel}
                onChange={(e) => updateDecision('complexityLevel', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="Basic">Basic | أساسي</option>
                <option value="Intermediate">Intermediate | متوسط</option>
                <option value="Advanced">Advanced | متقدم</option>
              </select>
            </div>

            {/* Cybersecurity Level */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                Cybersecurity Level | مستوى الأمن السيبراني
              </label>
              <select
                value={decisions.cybersecurity}
                onChange={(e) => updateDecision('cybersecurity', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="basic">Basic | أساسي</option>
                <option value="advanced">Advanced | متقدم</option>
                <option value="enterprise">Enterprise | مؤسسي</option>
              </select>
            </div>

            {/* AI Integration */}
            <div>
              <label className="block text-cyan-400 mb-2 font-semibold">
                AI Integration | تكامل الذكاء الاصطناعي
              </label>
              <select
                value={decisions.aiIntegration}
                onChange={(e) => updateDecision('aiIntegration', e.target.value as any)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              >
                <option value="none">None | لا يوجد</option>
                <option value="basic">Basic | أساسي</option>
                <option value="advanced">Advanced | متقدم</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,204,0.5)] hover:shadow-[0_0_30px_rgba(0,255,204,0.7)] transform hover:scale-105"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              START SIMULATION | ابدأ المحاكاة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

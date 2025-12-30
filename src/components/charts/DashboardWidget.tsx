import type { ReactNode } from 'react';

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onExport?: () => void;
  actions?: ReactNode;
}

export function DashboardWidget({
  title,
  subtitle,
  children,
  onExport,
  actions,
}: DashboardWidgetProps) {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,204,0.2)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          {onExport && (
            <button
              onClick={onExport}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
              title="Export"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
          {actions}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

import { useState } from 'react';
import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  vertical?: boolean;
  className?: string;
}

export function Tabs({ tabs, defaultTab, vertical = false, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`${vertical ? 'flex gap-4' : ''} ${className}`}>
      {/* Tab Headers */}
      <div
        className={`${
          vertical
            ? 'flex flex-col space-y-2 min-w-[200px]'
            : 'flex space-x-2 border-b border-cyan-500/30 mb-4'
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              vertical
                ? 'w-full text-left px-4 py-3 rounded-lg'
                : 'px-6 py-3 relative'
            } font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? vertical
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-cyan-400'
                : 'text-gray-400 hover:text-cyan-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
            {!vertical && activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`${vertical ? 'flex-1' : ''}`}>
        <div className="animate-fadeIn">{activeContent}</div>
      </div>
    </div>
  );
}

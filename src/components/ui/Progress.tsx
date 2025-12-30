interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const variantColors: Record<string, string> = {
  default: 'from-cyan-500 to-blue-500',
  success: 'from-green-500 to-emerald-500',
  warning: 'from-yellow-500 to-orange-500',
  danger: 'from-red-500 to-rose-500',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className = '',
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">{label}</span>
          {showLabel && (
            <span className="text-sm font-semibold text-cyan-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-700/50 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} bg-gradient-to-r ${variantColors[variant]} transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,204,0.5)]`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  className = '',
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap: Record<string, string> = {
    default: '#00ffcc',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${colorMap[variant]}66)`,
          }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-cyan-400 font-bold" style={{ fontSize: size / 5 }}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';

interface SimulationLoadingProps {
  onComplete: () => void;
}

const LOADING_STAGES = [
  'Building 3D World...',
  'Processing Big Data...',
  'Running Economic Engine...',
  'Analyzing Market Trends...',
  'Finalizing Results...',
];

export function SimulationLoading({ onComplete }: SimulationLoadingProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStage((prev) => {
        if (prev < LOADING_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 150);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Animated spinner */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
          <div
            className="absolute inset-4 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-cyan-400 font-bold text-2xl">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h2
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {LOADING_STAGES[stage]}
          </h2>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,204,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stage indicators */}
        <div className="flex justify-center space-x-2">
          {LOADING_STAGES.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= stage
                  ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,204,0.8)]'
                  : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>

        {/* Additional info */}
        <p className="text-gray-500 text-sm">
          Please wait while we prepare your simulation environment...
        </p>
      </div>
    </div>
  );
}

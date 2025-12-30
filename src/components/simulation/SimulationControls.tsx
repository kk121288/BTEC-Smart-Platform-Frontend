import { Camera, Grid3x3, Sun, RotateCcw, Maximize2, Download } from 'lucide-react';
import type { OrbitControls } from 'three-stdlib';
import * as THREE from 'three';

interface SimulationControlsProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  controlsRef: React.RefObject<OrbitControls | null>;
  onViewChange: (view: 'front' | 'top' | 'side' | 'iso') => void;
  onScreenshot: () => void;
  onReset: () => void;
}

export function SimulationControls({
  onViewChange,
  onScreenshot,
  onReset,
}: SimulationControlsProps) {
  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 p-3 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg">
      {/* Camera Views */}
      <div className="flex gap-2 pb-2 border-b border-cyan-500/20">
        <button
          onClick={() => onViewChange('front')}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Front View"
        >
          <Camera className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Front View
          </span>
        </button>
        <button
          onClick={() => onViewChange('top')}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Top View"
        >
          <Grid3x3 className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Top View
          </span>
        </button>
        <button
          onClick={() => onViewChange('side')}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Side View"
        >
          <Sun className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Side View
          </span>
        </button>
        <button
          onClick={() => onViewChange('iso')}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Isometric View"
        >
          <Camera className="w-5 h-5 text-cyan-400 rotate-45" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Isometric
          </span>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex gap-2 pb-2 border-b border-cyan-500/20">
        <button
          onClick={onReset}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Reset
          </span>
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onScreenshot}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Screenshot"
        >
          <Download className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Screenshot
          </span>
        </button>
        <button
          onClick={handleFullscreen}
          className="p-2 hover:bg-cyan-500/20 rounded transition-colors group relative"
          title="Fullscreen"
        >
          <Maximize2 className="w-5 h-5 text-cyan-400" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/90 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Fullscreen
          </span>
        </button>
      </div>
    </div>
  );
}

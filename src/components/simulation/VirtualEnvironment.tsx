import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, Grid } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import type { SimulationDecisions } from '../../types';
import { SimulationControls } from './SimulationControls';

interface VirtualEnvironmentProps {
  decisions: SimulationDecisions;
  onScreenshot?: (dataUrl: string) => void;
}

// Building components
function Skyscraper() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group position={[0, 2.5, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 5, 2]} />
        <meshStandardMaterial
          color="#00ffcc"
          metalness={0.8}
          roughness={0.2}
          emissive="#00ffcc"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Windows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[1.01, -2 + i * 0.5, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      ))}
    </group>
  );
}

function ModernBuilding() {
  return (
    <group position={[0, 1.5, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial
          color="#0099ff"
          metalness={0.5}
          roughness={0.4}
          emissive="#0099ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Windows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[1.01, -1 + i * 0.5, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      ))}
    </group>
  );
}

function Garage() {
  return (
    <group position={[0, 0.75, 0]}>
      {/* Main structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#666666"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[1.2, 0.8, 4]} />
        <meshStandardMaterial color="#ff6600" roughness={0.9} />
      </mesh>
      {/* Door */}
      <mesh position={[0.76, 0, 0]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
    </group>
  );
}

function Building({ budget }: { budget: 'low' | 'medium' | 'high' }) {
  switch (budget) {
    case 'high':
      return <Skyscraper />;
    case 'medium':
      return <ModernBuilding />;
    case 'low':
    default:
      return <Garage />;
  }
}

function Scene({ decisions }: { decisions: SimulationDecisions }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00ffcc" />
      
      {/* Building */}
      <Building budget={decisions.budget} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      
      {/* Grid */}
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#00ffcc"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00ffcc"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
      />
      
      {/* Environment */}
      <Sky
        distance={450000}
        sunPosition={[10, 10, 5]}
        inclination={0.6}
        azimuth={0.25}
      />
      <Environment preset="night" />
    </>
  );
}

export function VirtualEnvironment({ decisions, onScreenshot }: VirtualEnvironmentProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showControls, setShowControls] = useState(true);

  const handleViewChange = (view: 'front' | 'top' | 'side' | 'iso') => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const distance = 10;

    switch (view) {
      case 'front':
        camera.position.set(0, 2, distance);
        break;
      case 'top':
        camera.position.set(0, distance, 0);
        break;
      case 'side':
        camera.position.set(distance, 2, 0);
        break;
      case 'iso':
        camera.position.set(distance, distance, distance);
        break;
    }

    controls.target.set(0, 2, 0);
    controls.update();
  };

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onScreenshot?.(dataUrl);

    // Download the screenshot
    const link = document.createElement('a');
    link.download = `simulation-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleReset = () => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    camera.position.set(8, 6, 8);
    controls.target.set(0, 2, 0);
    controls.update();
  };

  return (
    <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden border border-cyan-500/20">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [8, 6, 8], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Scene decisions={decisions} />
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={20}
            target={[0, 2, 0]}
          />
        </Suspense>
      </Canvas>

      {showControls && (
        <SimulationControls
          cameraRef={cameraRef}
          controlsRef={controlsRef}
          onViewChange={handleViewChange}
          onScreenshot={handleScreenshot}
          onReset={handleReset}
        />
      )}

      {/* Toggle controls button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 right-4 px-3 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/10 transition-colors"
      >
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </button>
    </div>
  );
}

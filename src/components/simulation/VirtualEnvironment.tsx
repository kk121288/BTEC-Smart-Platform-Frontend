import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import type { BudgetLevel } from '@/types/simulation';
import { Skyscraper } from './3DModels/Skyscraper';
import { ModernBuilding } from './3DModels/ModernBuilding';
import { Garage } from './3DModels/Garage';

interface VirtualEnvironmentProps {
  budget: BudgetLevel;
}

/**
 * 3D Virtual Environment Component
 * Renders different 3D environments based on budget level
 * - High Budget: Skyscraper
 * - Medium Budget: Modern Building
 * - Low Budget: Garage
 */
export function VirtualEnvironment({ budget }: VirtualEnvironmentProps) {
  const renderModel = () => {
    switch (budget) {
      case 'high':
        return <Skyscraper />;
      case 'medium':
        return <ModernBuilding />;
      case 'low':
        return <Garage />;
      default:
        return <Garage />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [15, 10, 15], fov: 50 }}
        shadows
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffcc" />
          <pointLight position={[10, 5, 10]} intensity={0.5} color="#3b82f6" />
          
          {/* 3D Model based on budget */}
          {renderModel()}
          
          {/* Sky and Environment */}
          <Sky
            distance={450000}
            sunPosition={[5, 1, 8]}
            inclination={0.6}
            azimuth={0.25}
          />
          <Environment preset="night" />
          
          {/* Camera Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

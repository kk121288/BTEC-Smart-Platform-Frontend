import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import type { Group } from 'three';

/**
 * Modern Building 3D Model - Medium Budget Environment
 * Contemporary office building with modern architecture
 */
export function ModernBuilding() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main building structure */}
      <Box args={[5, 8, 5]} position={[0, 4, 0]}>
        <meshStandardMaterial
          color="#5a5a8f"
          metalness={0.6}
          roughness={0.3}
        />
      </Box>

      {/* Windows - floors */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Box key={i} args={[4.8, 0.8, 4.8]} position={[0, i * 1.1 + 0.5, 0]}>
          <meshStandardMaterial
            color="#6eb5ff"
            metalness={0.7}
            roughness={0.2}
            emissive="#3b82f6"
            emissiveIntensity={0.1}
          />
        </Box>
      ))}

      {/* Roof */}
      <Box args={[5.5, 0.5, 5.5]} position={[0, 8.5, 0]}>
        <meshStandardMaterial color="#00ffcc" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Ground floor - entrance */}
      <Box args={[2, 2, 0.5]} position={[0, 1, 2.5]}>
        <meshStandardMaterial
          color="#00ffcc"
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffcc"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Base */}
      <Box args={[6, 0.3, 6]} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#444" metalness={0.4} roughness={0.6} />
      </Box>
    </group>
  );
}

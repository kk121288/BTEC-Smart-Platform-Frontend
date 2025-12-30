import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import type { Group } from 'three';

/**
 * Skyscraper 3D Model - High Budget Environment
 * Modern glass and steel skyscraper with multiple floors
 */
export function Skyscraper() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main building tower */}
      <Box args={[4, 15, 4]} position={[0, 7.5, 0]}>
        <meshStandardMaterial
          color="#4a90e2"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Glass windows effect - multiple floors */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Box key={i} args={[3.8, 0.8, 3.8]} position={[0, i * 1.05 + 0.5, 0]}>
          <meshStandardMaterial
            color="#00ffcc"
            metalness={0.9}
            roughness={0.1}
            emissive="#00ffcc"
            emissiveIntensity={0.2}
          />
        </Box>
      ))}

      {/* Top floor - penthouse */}
      <Box args={[5, 2, 5]} position={[0, 16, 0]}>
        <meshStandardMaterial
          color="#00ffcc"
          metalness={1}
          roughness={0}
          emissive="#00ffcc"
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Base/Foundation */}
      <Box args={[5, 0.5, 5]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </Box>

      {/* Antenna */}
      <Cylinder args={[0.1, 0.1, 3]} position={[0, 18.5, 0]}>
        <meshStandardMaterial
          color="#00ffcc"
          metalness={1}
          emissive="#00ffcc"
          emissiveIntensity={0.8}
        />
      </Cylinder>
    </group>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import type { Group } from 'three';

/**
 * Garage 3D Model - Low Budget Environment
 * Small startup garage/workshop space
 */
export function Garage() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main garage structure */}
      <Box args={[6, 4, 5]} position={[0, 2, 0]}>
        <meshStandardMaterial
          color="#6b4423"
          metalness={0.2}
          roughness={0.8}
        />
      </Box>

      {/* Roof */}
      <Box args={[6.5, 0.3, 5.5]} position={[0, 4.15, 0]}>
        <meshStandardMaterial color="#4a2f1a" metalness={0.1} roughness={0.9} />
      </Box>

      {/* Garage door */}
      <Box args={[3, 3, 0.2]} position={[0, 1.5, 2.6]}>
        <meshStandardMaterial
          color="#555"
          metalness={0.5}
          roughness={0.6}
        />
      </Box>

      {/* Door segments (garage door texture) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i} args={[3, 0.4, 0.25]} position={[0, i * 0.5 + 0.2, 2.65]}>
          <meshStandardMaterial
            color="#666"
            metalness={0.4}
            roughness={0.7}
          />
        </Box>
      ))}

      {/* Window */}
      <Box args={[1.5, 1, 0.1]} position={[2, 3, 2.55]}>
        <meshStandardMaterial
          color="#87ceeb"
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </Box>

      {/* Small sign */}
      <Box args={[2, 0.5, 0.1]} position={[-1.5, 3.5, 2.55]}>
        <meshStandardMaterial
          color="#00ffcc"
          metalness={0.7}
          roughness={0.3}
          emissive="#00ffcc"
          emissiveIntensity={0.4}
        />
      </Box>

      {/* Ground/Base */}
      <Box args={[7, 0.2, 6]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#3a3a3a" metalness={0.2} roughness={0.9} />
      </Box>

      {/* Some boxes/crates (startup equipment) */}
      <Box args={[0.8, 0.8, 0.8]} position={[2.5, 0.4, -1.5]}>
        <meshStandardMaterial color="#8b4513" metalness={0.1} roughness={0.9} />
      </Box>
      <Box args={[0.6, 1, 0.6]} position={[-2.5, 0.5, -1.8]}>
        <meshStandardMaterial color="#654321" metalness={0.1} roughness={0.9} />
      </Box>
    </group>
  );
}

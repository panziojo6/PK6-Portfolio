import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { techStack } from '../data/skillsData';

// Generate orbits based on techStack
const innerOrbitSize = 6;
const midOrbitSize = 10;
const outerOrbitSize = techStack.length - (innerOrbitSize + midOrbitSize);

const innerOrbitRadius = 3;
const midOrbitRadius = 5;
const outerOrbitRadius = 7.5;

const getOrbitParams = (index) => {
  if (index < innerOrbitSize) {
    return { radius: innerOrbitRadius, speed: 0.2, yOffset: (Math.random() - 0.5) * 1 };
  } else if (index < innerOrbitSize + midOrbitSize) {
    return { radius: midOrbitRadius, speed: -0.15, yOffset: (Math.random() - 0.5) * 2 };
  } else {
    return { radius: outerOrbitRadius, speed: 0.1, yOffset: (Math.random() - 0.5) * 3 };
  }
};

function TechPlanet({ item, index }) {
  const ref = useRef();
  const { radius, speed, yOffset } = getOrbitParams(index);
  
  // Stagger starting positions
  const angleRef = useRef((index / techStack.length) * Math.PI * 2);
  
  // Assign a random planet color
  const colors = ["#00f0ff", "#a855f7", "#ffffff", "#4ade80", "#f472b6", "#fbbf24"];
  const color = colors[index % colors.length];

  useFrame((state, delta) => {
    angleRef.current += speed * delta;
    if (ref.current) {
      ref.current.position.x = Math.cos(angleRef.current) * radius;
      ref.current.position.z = Math.sin(angleRef.current) * radius;
    }
  });

  return (
    <group ref={ref} position={[0, yOffset, 0]}>
      {/* The Planet */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Orbit Trail (Optional, looks cool in space) */}
      <Trail
        width={0.2} // Width of the line
        color={color} // Color of the line
        length={2} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculation
      >
        <mesh>
          <sphereGeometry args={[0.01]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
      </Trail>

      {/* Holographic Label */}
      <Html distanceFactor={20} center zIndexRange={[100, 0]}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          marginTop: '40px',
        }}>
          <div style={{
            fontSize: '24px',
            textShadow: `0 0 10px ${color}`
          }}>
            {item.icon}
          </div>
          <div style={{
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            background: 'rgba(5, 10, 20, 0.8)',
            padding: '2px 6px',
            border: `1px solid ${color}`,
            borderRadius: '4px',
            backdropFilter: 'blur(4px)',
            whiteSpace: 'nowrap',
            marginTop: '4px',
            boxShadow: `0 0 10px ${color}80`
          }}>
            {item.name}
          </div>
        </div>
      </Html>
    </group>
  );
}

function CentralStar() {
  const starRef = useRef();
  
  useFrame(({ clock }) => {
    starRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={starRef}>
      {/* Core */}
      <Sphere args={[1, 64, 64]}>
        <meshBasicMaterial color="#a855f7" />
      </Sphere>
      
      {/* Glow */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} wireframe />
      </Sphere>
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
      </Sphere>
      
      {/* Label */}
      <Html distanceFactor={15} center>
        <div style={{
          color: '#fff',
          fontSize: '14px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textShadow: '0 0 20px #00f0ff, 0 0 40px #a855f7',
          pointerEvents: 'none',
        }}>
          CORE EXPERTISE
        </div>
      </Html>
    </group>
  );
}

export default function Skills3DSolarSystem() {
  return (
    <div className="solar-system-container" style={{ width: '100%', height: '700px', cursor: 'grab', position: 'relative' }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#a855f7" />
        
        {/* Background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Central Sun */}
        <CentralStar />

        {/* Tech Planets */}
        {techStack.map((item, index) => (
          <TechPlanet key={index} item={item} index={index} />
        ))}

        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5} // Don't let them look from directly below
          minPolarAngle={Math.PI / 4}   // Don't let them look from directly above
        />
      </Canvas>
    </div>
  );
}

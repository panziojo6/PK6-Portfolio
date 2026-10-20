import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function Satellite({ radius, speed, color, name, yOffset = 0, zOffset = 0 }) {
  const ref = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    angleRef.current += speed * delta;
    if (ref.current) {
      ref.current.position.x = Math.cos(angleRef.current) * radius;
      ref.current.position.z = Math.sin(angleRef.current) * radius + zOffset;
    }
  });

  return (
    <group ref={ref} position={[0, yOffset, 0]}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html distanceFactor={15} center>
        <div style={{
          color: color,
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          background: 'rgba(5, 8, 15, 0.7)',
          padding: '4px 8px',
          border: `1px solid ${color}`,
          borderRadius: '4px',
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
          marginTop: '20px',
          pointerEvents: 'none',
          boxShadow: `0 0 10px ${color}40`
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}

function RotatingGlobe() {
  const globeRef = useRef();
  
  useFrame(({ clock }) => {
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={globeRef}>
      {/* Core solid sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#001824"
          emissive="#000"
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.02, 32, 32]}>
        <meshBasicMaterial 
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Outer Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero3DGlobe() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', zIndex: 10 }}>
        <Title level={2} style={{ color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>
          GNSS <span style={{ color: '#00f0ff' }}>Command Center</span>
        </Title>
        <Paragraph style={{ color: '#a1a1aa', marginTop: '10px' }}>
          Live Tracking & Geospatial Analytics Hub
        </Paragraph>
      </div>

      <div className="hero-globe-container" style={{ position: 'relative', width: '100%', height: '600px', cursor: 'grab' }}>
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
          
          <RotatingGlobe />

          <Satellite radius={3.0} speed={0.4} color="#00f0ff" name="GPS Block III" yOffset={0.8} zOffset={0.5} />
          <Satellite radius={3.3} speed={0.3} color="#a855f7" name="Sentinel-1" yOffset={-0.5} zOffset={-1} />
          <Satellite radius={3.6} speed={0.5} color="#ffffff" name="Galileo" yOffset={1.2} zOffset={0} />
          <Satellite radius={2.7} speed={0.6} color="#00f0ff" name="GLONASS" yOffset={-1.0} zOffset={1} />
          <Satellite radius={4.0} speed={0.25} color="#a855f7" name="Landsat 9" yOffset={0.2} zOffset={1.5} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>
  );
}

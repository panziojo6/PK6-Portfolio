import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float } from "@react-three/drei";
import { techStack } from "../data/skillsData";

const RINGS = [
  { radius: 2.3, speed: 0.28, tilt: [0.35, 0, 0.1], color: "#22d3ee" },
  { radius: 3.7, speed: -0.2, tilt: [-0.5, 0.3, 0.25], color: "#a78bfa" },
  { radius: 4.9, speed: 0.14, tilt: [0.8, -0.2, -0.3], color: "#fbbf24" },
];

function Ring({ ring, items, compact }) {
  const group = useRef();
  useFrame((_, dt) => { group.current.rotation.y += dt * ring.speed; });
  return (
    <group rotation={ring.tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ring.radius, 0.006, 6, 180]} />
        <meshBasicMaterial color={ring.color} transparent opacity={0.35} />
      </mesh>
      <group ref={group}>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2;
          const pos = [Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius];
          return (
            <group key={it.name} position={pos}>
              <mesh>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color={it.color || ring.color} emissive={it.color || ring.color} emissiveIntensity={1.2} />
              </mesh>
              <Html center distanceFactor={compact ? 6 : 8.5} zIndexRange={[5, 0]}>
                <div className="skill-pill" style={{ color: it.color || ring.color }}><em><it.icon size={13} /></em>{it.name}</div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Core() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial color="#0b1b33" metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.25, 0]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.2} />
        </mesh>
        <pointLight color="#22d3ee" intensity={3} distance={6} />
      </group>
    </Float>
  );
}

export default function SkillsOrbit({ compact = false }) {
  const groups = useMemo(() => {
    const n = techStack.length;
    const a = Math.round(n * 0.25), b = Math.round(n * 0.35);
    return [techStack.slice(0, a), techStack.slice(a, a + b), techStack.slice(a + b)];
  }, []);

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 3.6, compact ? 17 : 14.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Stars radius={60} depth={30} count={900} factor={3} saturation={0} fade speed={0.4} />
        <Core />
        {RINGS.map((r, i) => <Ring key={i} ring={r} items={groups[i]} compact={compact} />)}
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.7} />
    </Canvas>
  );
}

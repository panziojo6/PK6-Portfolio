import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Float, Trail, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const SATS = [
  { name: "Sentinel-2", color: "#22d3ee", radius: 3.0, speed: 0.55, tilt: [0.5, 0.2, 0] },
  { name: "Sentinel-1", color: "#a78bfa", radius: 3.5, speed: -0.42, tilt: [1.2, 0.6, 0.3] },
  { name: "GPS", color: "#fbbf24", radius: 4.0, speed: 0.33, tilt: [0.9, -0.8, 0] },
  { name: "Galileo", color: "#4ade80", radius: 3.25, speed: -0.6, tilt: [-0.7, 0.4, 0.9] },
  { name: "BeiDou", color: "#fb7185", radius: 4.4, speed: 0.26, tilt: [1.5, 0.1, -0.4] },
];

/* Points scattered over the sphere = "data globe" */
function DataGlobe() {
  const group = useRef();
  const points = useMemo(() => {
    const n = 2200;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      // bias toward "land": clump by low-frequency noise
      const r = 2.02;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#0a1f3a" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.005, 36, 24]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.08} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#67e8f9" transparent opacity={0.9} sizeAttenuation />
      </points>
      {/* atmosphere */}
      <mesh>
        <sphereGeometry args={[2.22, 48, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.45, 48, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.035} side={THREE.BackSide} />
      </mesh>
      {/* equator + meridian rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.06, 0.006, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.06, 0.004, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* Scan ring sweeping the globe like a radar */
function Scanner() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.35) % 1;
    const y = -2.3 + t * 4.6;
    const r = Math.sqrt(Math.max(0.001, 2.12 ** 2 - y * y));
    ref.current.position.y = y;
    ref.current.scale.set(r, r, 1);
    ref.current.material.opacity = 0.55 * Math.sin(t * Math.PI);
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1, 96]} />
      <meshBasicMaterial color="#fbbf24" transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function Satellite({ name, color, radius, speed, tilt, reduced }) {
  const pivot = useRef();
  const body = useRef();
  const a0 = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }, dt) => {
    const a = a0 + clock.getElapsedTime() * speed;
    pivot.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    pivot.current.lookAt(0, 0, 0);
    if (body.current) body.current.rotation.z += dt * 0.8;
  });
  return (
    <group rotation={tilt}>
      {/* orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 6, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
      <group ref={pivot}>
        <Trail width={0.35} length={5} color={new THREE.Color(color)} attenuation={(t) => t * t}>
          <group ref={body}>
            <mesh>
              <boxGeometry args={[0.14, 0.14, 0.2]} />
              <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <boxGeometry args={[0.36, 0.02, 0.16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
            </mesh>
            <mesh position={[-0.3, 0, 0]}>
              <boxGeometry args={[0.36, 0.02, 0.16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
            </mesh>
            <pointLight color={color} intensity={1.2} distance={2} />
          </group>
        </Trail>
        <Html center distanceFactor={reduced ? 6.5 : 11} zIndexRange={[5, 0]}>
          <div className="sat-label" style={{ color }}>{name}</div>
        </Html>
      </group>
    </group>
  );
}

function Debris() {
  const items = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6 - 1],
        size: 0.12 + Math.random() * 0.22,
        color: ["#22d3ee", "#a78bfa", "#fbbf24", "#4ade80"][i % 4],
        kind: i % 3,
      })),
    []
  );
  return items.map((d, i) => (
    <Float key={i} speed={1.2 + (i % 3) * 0.4} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh position={d.pos}>
        {d.kind === 0 ? <icosahedronGeometry args={[d.size, 0]} /> : d.kind === 1 ? <octahedronGeometry args={[d.size, 0]} /> : <torusKnotGeometry args={[d.size * 0.6, d.size * 0.2, 48, 8]} />}
        <meshStandardMaterial color={d.color} wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  ));
}

export default function HeroScene({ reduced = false }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.2, reduced ? 11.5 : 8.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 6, 6]} intensity={1.6} color="#dbeafe" />
      <pointLight position={[-6, -3, -4]} intensity={1.2} color="#a78bfa" />
      <Suspense fallback={null}>
        <Stars radius={70} depth={40} count={reduced ? 500 : 2200} factor={3} saturation={0} fade speed={0.6} />
        <Sparkles count={reduced ? 20 : 70} scale={12} size={2} speed={0.3} color="#67e8f9" opacity={0.6} />
        <group position={[0, -0.2, 0]}>
          <DataGlobe />
          <Scanner />
          {SATS.map((s) => <Satellite key={s.name} {...s} reduced={reduced} />)}
          {!reduced && <Debris />}
        </group>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.7} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
    </Canvas>
  );
}

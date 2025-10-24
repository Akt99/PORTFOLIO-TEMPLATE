// src/components/ThreeHero.jsx
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture, Environment, Preload } from "@react-three/drei";
import * as THREE from "three";

/* --- Mouse-based parallax for the whole hero --- */
function MouseParallax({ children, intensity = 0.30 }) {
  const group = useRef();
  const { pointer } = useThree(); // normalized -1..1
  useFrame((_, dt) => {
    if (!group.current) return;
    // target rotations from pointer; damp to keep it smooth
    const targetX = -pointer.y * intensity;
    const targetY =  pointer.x * intensity;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 8);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 5);
  });
  return <group ref={group}>{children}</group>;
}

/* --- Your portrait plane (bigger) --- */
function PortraitPlane({ src = "/aktanimation2.png" }) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <Float speed={0.5} rotationIntensity={0.18} floatIntensity={0.6}>
      <mesh castShadow receiveShadow>
        {/* width, height */}
        <planeGeometry args={[4.0, 5.0, 1, 1]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.55}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* soft glare disc */}
      <mesh position={[0.55, 0.45, 0.01]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshBasicMaterial transparent opacity={0.12} color="#ffffff" map={radial()} />
      </mesh>
    </Float>
  );
}

/* radial texture (generated, no file) */
let _radial;
function radial() {
  if (_radial) return _radial;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  _radial = new THREE.CanvasTexture(c);
  _radial.colorSpace = THREE.SRGBColorSpace;
  return _radial;
}

export default function ThreeHero() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[2, 3, 2]} intensity={1.1} />
        <Environment preset="city" />

        {/* 🔥 interactive wrapper */}
        <MouseParallax intensity={0.35}>
          <PortraitPlane src="/aktanimation2.png" />
        </MouseParallax>

        <Sparkles
          count={100}
          size={2.4}
          speed={0.7}
          color="#9dd6ff"
          opacity={0.35}
          scale={[6, 5, 1]}
          position={[0, 0, -0.2]}
        />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}

// src/components/AtmosphereGlow.jsx
import * as THREE from "three";
import { useMemo } from "react";

/**
 * Soft neon-blue atmospheric halo that works on WebGL1 & WebGL2.
 * Renders on the backfaces with additive blending so it “glows”.
 */
export default function AtmosphereGlow({ scale = 1.06, color = "#5ec8ff" }) {
  const vertex = /* glsl */`
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vNormal = normalize(mat3(modelMatrix) * normal);
      vViewDir = normalize(worldPos.xyz - cameraPosition);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragment = /* glsl */`
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      // Fresnel-style rim lighting
      float fresnel = pow(1.0 - dot(normalize(vNormal), -normalize(vViewDir)), 3.0);
      // ~ #5ec8ff
      vec3 glow = vec3(0.37, 0.78, 1.0) * fresnel;
      gl_FragColor = vec4(glow, fresnel * 0.9);
    }
  `;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,   // render back faces for halo
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh scale={scale} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

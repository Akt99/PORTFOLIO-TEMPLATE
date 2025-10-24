// src/components/ContactGlobe.jsx
import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as topojson from "topojson-client";
import * as THREE from "three";

// Odisha label
const CITIES = [
  { lat: 20.9517, lng: 85.0985, name: "Odisha — I live here !", color: "#b8ffd8", dot: "#73e0b5" },
  { lat: 19.0760, lng: 72.8777, name: "Mumbai- I have been here !",               color: "#c7e1ff", dot: "#7fb6ff" },
  { lat: 12.9716, lng: 77.5946, name: "Bengaluru- I have been here !",            color: "#ffd7a8", dot: "#ffb166" },
];

export default function ContactGlobe({
  size = 380,
  className = "",
  minAlt = 1.4,   // closest zoom (lower = closer)
  maxAlt = 5.0,   // farthest zoom
  initialAlt = 2.6
}) {
  const globeRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [hoverD, setHoverD] = useState(null);  // new

  const altRef = useRef(initialAlt);
  const resumeTimer = useRef();

  // Load vector polygons (image-free)
  useEffect(() => {
    let alive = true;
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then(topology => {
        if (!alive) return;
        const geojson = topojson.feature(topology, topology.objects.countries);
        setCountries(geojson.features || []);
      });
    return () => { alive = false; };
  }, []);

  // Controls + zoom config
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;

    const controls = g.controls();
    // enable zoom (wheel/pinch)
    controls.enableZoom = true;
    controls.zoomSpeed = 0.6;

    // set a reasonable distance clamp based on globe radius
    const R = (g.getGlobeRadius && g.getGlobeRadius()) || 100;
    controls.minDistance = R * 1.15;
    controls.maxDistance = R * 4.5;

    // pause auto-rotate while interacting, resume shortly after
    const pause = () => {
      controls.autoRotate = false;
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
    const resume = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => (controls.autoRotate = true), 1200);
    };
    controls.addEventListener("start", pause);
    controls.addEventListener("end", resume);
    const scene = g.scene();                                      // 
    const rim = new THREE.DirectionalLight(0x4ea6ff, 0.7);        //
    rim.position.set(-3, 2, -6);                                  //
    scene.add(rim);                                               //
    // quality
    g.renderer().setPixelRatio(Math.min(1.8, window.devicePixelRatio || 1));

    return () => {
      controls.removeEventListener("start", pause);
      controls.removeEventListener("end", resume);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  /* Ocean material old
  const globeMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#0b1a24"),
    shininess: 18
  });*/
// Ocean new
const globeMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0a1d2a"),
    roughness: 1.0,
    metalness: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.35
  });


  // Subtle green land
  const greenShade = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 100 + name.charCodeAt(i)) >>> 0;
    const t = (hash % 100) / 100;
    const start = [124, 170, 100], end = [40, 150, 100];
    const mix = (a, b) => Math.round(a + (b - a) * (0.25 + 0.5 * t));
    const [r, g, b] = [mix(start[0], end[0]), mix(start[1], end[1]), mix(start[2], end[2])];
    return `rgba(${r}, ${g}, ${b}, 0.36)`;
  };

  // helpers to zoom programmatically (buttons)
  const setAlt = (next) => {
    const clamped = Math.min(maxAlt, Math.max(minAlt, next));
    altRef.current = clamped;
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView({ altitude: clamped }, 350);
  };
  const zoomIn = () => setAlt(altRef.current * 0.85);
  const zoomOut = () => setAlt(altRef.current / 0.85);

  return (
    <div
      className={`relative rounded-2xl bg-black/5 p-2 dark:bg-white/5 shadow-xl dark:shadow-black/30 ${className}`}
      style={{ width: size, height: size }}
    >
      <Globe
        ref={globeRef}
        width={size - 7}
        height={size - 4}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#007FFF"
        atmosphereAltitude={0.25}
        polygonsData={countries}
        polygonCapColor={(d) => greenShade(d.properties?.name ?? "")}
        polygonSideColor={() => "rgba(0,0,0,0.22)"}
        polygonStrokeColor={() => "#000000ff"}
        polygonLabel={({ properties }) => properties.name}
        labelsData={CITIES}
        

        labelText={(d) => d.name}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelAltitude={0.012}
        labelSize={(d)=>(d.name.includes("Odisha")? 1.5 : 1.3)}
        labelColor={(d) => d.color}
        labelDotRadius={0.38}
        labelDotColor={(d) => d.dot}
        onGlobeReady={(g) => {
          // initial POV + auto-rotate
          g.pointOfView({ altitude: initialAlt }, 0);
          const controls = g.controls();
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.6;
        }}
      />

      {/* Zoom UI */}
      <div className="pointer-events-none absolute right-3 top-3 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="pointer-events-auto h-8 w-8 rounded-md bg-black/40 text-white backdrop-blur hover:bg-black/60"
          aria-label="Zoom in"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="pointer-events-auto h-8 w-8 rounded-md bg-black/40 text-white backdrop-blur hover:bg-black/60"
          aria-label="Zoom out"
          title="Zoom out"
        >
          –
        </button>
      </div>
    </div>
  );
}

## Repo: Aktportfolio — quick orientation for AI coding agents

This file contains concise, actionable notes to help AI agents work productively in this React + Vite portfolio project.

1) Big picture
- Frontend-only React app built with Vite (no backend in this repo). Entry points: `src/main.jsx` and `src/App.jsx`.
- Routing: react-router is used. The app mounts routes via `createBrowserRouter`/`RouterProvider` in `src/main.jsx` (or `HashRouter` in `src/App.jsx` depending on which file is used). Look for `RootLayout.jsx` which composes `Navbar` + `<Outlet/>` + `Footer`.
- Components: `src/components/` contains presentational and interactive UI: `hero.jsx`, `ThreeHero.jsx` (3D portrait using three/react-three-fiber), `ContactGlobe.jsx` (globe built with `react-globe.gl` + `three`), and smaller utilities such as `theme-toggle.jsx` and `avatar-lightbox.jsx`.

2) Developer workflows (how to run/build/test)
- Local dev: npm run dev (uses Vite). Expect HMR; dev server serves the app at the default Vite port unless configured.
- Build: npm run build (Vite production build). Preview: npm run preview.
- Lint: npm run lint (runs ESLint configured in repository).
- When changing 3D or Globe code, small texture/material changes may require a full page reload; HMR for React will still replace components.

3) Project-specific conventions & patterns
- Routing conventions: pages live in `src/pages/` (thin wrappers) and components in `src/components/`. Add new top-level routes by updating the router in `src/main.jsx` or `src/App.jsx` and creating a matching `src/pages/` file or component.
- Named exports vs default: `Navbar` is a named export in `src/components/navbar.jsx` (import with { Navbar }). Many components are default exports — check the specific file.
- Styling: Tailwind CSS is used (`index.css` + `tailwind.config.js`). Prefer utility classes; components often accept `className` props for layout sizing.
- 3D/Canvas usage: `ThreeHero.jsx` and `ContactGlobe.jsx` rely on three.js and react-three-fiber. Respect their lifecycles: materials, renderer pixel ratio, and controls are configured in useEffect. When editing, avoid re-creating heavy objects on every render; reuse refs.

4) Integration points & external deps
- react-globe.gl (globe rendering) — see `src/components/ContactGlobe.jsx` for usage patterns: fetching topojson world data from unpkg, creating custom THREE.MeshPhysicalMaterial, and manipulating controls via `globeRef.current.controls()`.
- react-three-fiber, three, @react-three/drei — 3D components live in `src/components/ThreeHero.jsx`.
- router: react-router-dom v7+ (routes configured with createBrowserRouter in `src/main.jsx`). Some files show a HashRouter variant in `src/App.jsx` — prefer `src/main.jsx` router when adding new routes.

5) What AI agents should do (practical rules)
- Preserve small, focused edits. When changing component props, follow existing prop names (e.g., `ContactGlobe` accepts size, className, minAlt/maxAlt, initialAlt).
- Reuse existing assets under `public/` and `src/assets/` (logo and avatar images). Don’t add large new binary files without noting build-size impact.
- Route changes: update both the router (`src/main.jsx`) and any links in `src/components/navbar.jsx`.
- When modifying 3D/Globe code, run `npm run dev` to visually verify. If making material/lighting changes, ensure pixelRatio and renderer settings mirror existing patterns (see `ContactGlobe.jsx`).

6) Examples to reference
- Add a label/marker to the globe: follow `CITIES` array and `labelsData` usage in `src/components/ContactGlobe.jsx`.
- Add a new nav link: edit the `links` array in `src/components/navbar.jsx`, create `src/pages/YourPage.jsx`, and add a route in `src/main.jsx`.
- Use Tailwind utilities for spacing/typography. Example: `className="mx-auto max-w-5xl px-4 pt-24 pb-16"` in `hero.jsx`.

7) Files to inspect for context (high value)
- `package.json` — dev/build scripts and major dependencies
- `src/main.jsx`, `src/App.jsx` — routing and app bootstrapping
- `src/layouts/RootLayout.jsx` — app chrome (Navbar + Footer)
- `src/components/ContactGlobe.jsx`, `src/components/ThreeHero.jsx` — heavier visual components and 3D lifecycle patterns
- `src/components/navbar.jsx` — navigation, named export nuance, and mobile drawer pattern

If any section is unclear or you want the file to contain additional examples (tests, common PR fixes, or specific lint rules), tell me what to expand and I will iterate.

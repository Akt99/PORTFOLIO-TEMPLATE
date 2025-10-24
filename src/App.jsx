// src/App.jsx
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/navbar.jsx";
import Footer from "./components/footer";

import Home from "./pages/Home.jsx";
import About from "./components/about";
import Projects from "./components/projects";
import Contact from "./components/contact";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navbar />

      {/* No BackgroundVideo here—only Home mounts it */}
      <main className="relative z-10 pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </HashRouter>
  );
}

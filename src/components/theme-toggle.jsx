// src/components/theme-toggle.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "theme"; // "dark" | "light"

function isDarkOnHtml() {
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle({ className = "" }) {
  // Read current state from <html> (set by your head script)
  const [isDark, setIsDark] = useState(() => isDarkOnHtml());

  // Keep state in sync on mount (in case something else changed it)
  useEffect(() => {
    setIsDark(isDarkOnHtml());
  }, []);

  const apply = (next) => {
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setIsDark(next);
  };

  const handleClick = () => apply(!isDark);

  return (
    <motion.button
      whileTap={{ scale: 0.9, rotate: -10 }}
      whileHover={{ rotate: 5 }}
      onClick={handleClick}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light" : "Switch to dark"}
      className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-900 ${className}`}
    >
      {isDark ? (
        // Sun
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4V1h0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zM19.16 17.24l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM12 7a5 5 0 100 10 5 5 0 000-10z"/>
        </svg>
      ) : (
        // Moon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-200">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </motion.button>
  );
}

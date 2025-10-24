// src/components/tech-icons.jsx
import { motion, useReducedMotion } from "framer-motion";

const icons = [
  { name: "HTML", src: "/tech/html.svg" },
  { name: "CSS", src: "/tech/css.svg" },
  { name: "JavaScript", src: "/tech/js.svg" },
  { name: "TypeScript", src: "/tech/ts.svg" },
  { name: "React", src: "/tech/react.svg" },
  { name: "Next.js", src: "/tech/next.svg" },
  { name: "Vite", src: "/tech/vite.svg" },
  { name: "Tailwind", src: "/tech/tailwind.svg" },
  { name: "Node", src: "/tech/node.svg" },
  { name: "Express", src: "/tech/express.svg" },
  { name: "Firebase", src: "/tech/firebase.svg" },
  { name: "Supabase", src: "/tech/supabase.svg" },  // critical
  { name: "Python", src: "/tech/python.svg" },
  { name: "Flask", src: "/tech/flask.svg" },
  { name: "Django", src: "/tech/django.svg" },
  { name: "Selenium", src: "/tech/selenium.svg" },  // critical (was stalling)
  { name: "Java", src: "/tech/java.svg" },
];

const CRITICAL_ICON_NAMES = new Set(["Supabase", "Selenium"]);

export default function TechIcons({ listVariants }) {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.985 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.ul
      variants={{
        hidden: { ...(listVariants?.hidden ?? {}) },
        show: {
          ...(listVariants?.show ?? {}),
          transition: {
            ...(listVariants?.show?.transition ?? {}),
            staggerChildren: 0.06, // slightly tighter so any IO jitter is less visible
          },
        },
      }}
      className="mx-auto mt-2 grid max-w-5xl grid-cols-5 gap-5 sm:grid-cols-8 md:grid-cols-9"
    >
      {icons.map((i, idx) => {
        // Eager-load the first row + any critical icons (Supabase, Selenium)
        const inFirstRow = idx < 9; // matches md:grid-cols-9 first row
        const isCritical = inFirstRow || CRITICAL_ICON_NAMES.has(i.name);

        return (
          <motion.li
            key={i.name}
            variants={item}
            className="flex items-center justify-center"
            title={i.name}
            whileHover={{ y: reduce ? 0 : -6, rotate: reduce ? 0 : 2 }}
            whileTap={{ scale: reduce ? 1 : 0.96 }}
            style={{ willChange: "transform", contain: "layout paint" }}
          >
            <div className="rounded-2xl bg-white/60 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10">
              <img
                src={i.src}
                alt={i.name}
                width={48}
                height={48}
                decoding="async"
                loading={isCritical ? "eager" : "lazy"}
                fetchpriority={CRITICAL_ICON_NAMES.has(i.name) ? "high" : undefined}
                draggable={false}
                className="h-12 w-12 object-contain drop-shadow-sm"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = "/tech/fallback.svg";
                  }
                }}
              />
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

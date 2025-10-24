// src/components/projects.jsx
import { motion, useReducedMotion } from "framer-motion";
import { projects as projectsData } from "../data/projects.js";

export default function Projects() {
  const reduce = useReducedMotion();

  // Parent controls reveal + stagger for all cards
  const parent = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.08, // consistent cascade
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  const items = Array.isArray(projectsData) ? projectsData : [];

  return (
    <motion.section
      id="projects"
      className="mx-auto max-w-5xl px-4 py-16"
      variants={parent}
      initial="hidden"                // start hidden so it always animates
      whileInView="show"              // single, reliable trigger
      viewport={{
        once: false,                  // can replay when scrolled back
        amount: 0.2,                  // 20% visible to trigger
        margin: "160px 0px -80px 0px" // early trigger without being too picky
      }}
    >
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Selected work that I’m proud of.
      </p>

      {/* Empty-state guard (helps during HMR or bad imports) */}
      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          No projects to show right now. Check your <code className="font-mono">../data/projects.js</code> import path or data shape.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((p, i) => (
            <motion.article
              key={p.id || p.title || i} // stable key if you have ids
              variants={child}           // controlled by parent; no per-card viewport
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm
                         dark:border-gray-800 dark:bg-gray-900"
              whileHover={{
                y: reduce ? 0 : -6,
                boxShadow: reduce ? undefined : "0 12px 30px rgba(0,0,0,0.12)",
              }}
              style={{ willChange: "transform" }}
            >
              {/* cover (keep lightweight to avoid decode stalls) */}
              <div className="aspect-video w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" />

              <div className="p-5">
                <h3
                  className="text-lg font-semibold text-gray-900 transition-colors
                             group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400"
                >
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2.5 py-0.5 text-xs
                                 border-gray-200 bg-gray-50 text-gray-700
                                 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <div className="mt-4">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline
                                 dark:text-blue-400"
                    >
                      Visit <span aria-hidden>→</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </motion.section>
  );
}

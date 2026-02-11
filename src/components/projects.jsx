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
        Here are some of my work :
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
              {/* project snapshot */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                {p.image ? (
                  <motion.img
                    src={p.image}
                    alt={p.imageAlt || `${p.title} snapshot`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    whileHover={reduce ? undefined : { scale: 1.035 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3
                  className="text-lg font-semibold text-gray-900 transition-colors
                             group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400"
                >
                  {p.title}
                </h3>

                {Array.isArray(p.points) && p.points.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {p.points.map((point, idx) => (
                      <li key={`${p.title}-point-${idx}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {p.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech?.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={reduce ? undefined : { y: -2, scale: 1.03 }}
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="rounded-full border px-2.5 py-0.5 text-xs
                                 border-gray-200 bg-gray-50 text-gray-700
                                 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                {(p.github || p.demo) && (
                  <div className="mt-4 flex items-center gap-2">
                    {p.github && (
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={reduce ? undefined : { y: -2, scale: 1.06, rotate: -6 }}
                        whileTap={reduce ? undefined : { scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 280, damping: 16 }}
                        aria-label={`Open ${p.title} GitHub repository`}
                        title="Open on GitHub"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border
                                   border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50
                                   dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.97 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.23 0 4.64-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .5z" />
                        </svg>
                      </motion.a>
                    )}

                    {p.demo && (
                      <motion.a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                        whileTap={reduce ? undefined : { scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18 }}
                        aria-label={`Open ${p.title} demo`}
                        title="Watch demo"
                        className="inline-flex items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                          <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.84-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" />
                        </svg>
                        Demo Video
                      </motion.a>
                    )}
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

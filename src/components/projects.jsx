import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <p className="mt-2 text-gray-600">Selected work that I’m proud of.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map(p => (
          <article key={p.title} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50" />
            <div className="p-5">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{t}</span>
                ))}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
                  Visit →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

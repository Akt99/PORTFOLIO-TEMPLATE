export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight">About</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <p className="md:col-span-2 text-gray-700">
          I’m a developer focused on building accessible, performant interfaces. I enjoy
          clean design systems, component architecture, and shipping value fast.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>• React, Next.js, Vite</li>
          <li>• Tailwind, shadcn/ui</li>
          <li>• Node, Express</li>
          <li>• Firebase / Supabase</li>
        </ul>
      </div>
    </section>
  );
}

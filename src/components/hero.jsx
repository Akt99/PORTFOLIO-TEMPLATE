export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <span>⚡️</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          I build fast, clean web experiences.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          React • Vite • Tailwind. I design and develop responsive UIs and ship performant apps.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#projects" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">View Projects</a>
          <a href="#contact" className="rounded-md border px-4 py-2 hover:bg-gray-50">Contact</a>
        </div>
      </div>
    </section>
  );
}

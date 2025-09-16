import { useState } from "react";

export default function Contact() {
  const email = "you@example.com"; // ← put your email here
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed — just email me directly.");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
      <p className="mt-2 text-gray-600">
        Have a project or role in mind? Let’s talk.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${email}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Email me
        </a>

        <button
          onClick={copyEmail}
          className="rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50"
        >
          {copied ? "Copied!" : "Copy email"}
        </button>

        <a
          href="https://www.linkedin.com/in/your-handle"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/your-handle"
          target="_blank"
          rel="noreferrer"
          className="text-gray-900 hover:underline"
        >
          GitHub
        </a>
      </div>

      {/* Optional contact form (uses Formspree — replace the action URL with yours or remove this block) */}
      <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
        <form
          action="https://formspree.io/f/your-id" // ← replace with your Formspree endpoint or remove the form
          method="POST"
          className="grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tell me about your project…"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
        <p className="mt-2 text-xs text-gray-500">
          Don’t want a form? Delete it and keep the email/copy buttons above.
        </p>
      </div>
    </section>
  );
}

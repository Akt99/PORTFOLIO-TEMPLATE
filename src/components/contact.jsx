import { useState } from "react";
import ContactGlobe from "./ContactGlobe.jsx";

export default function Contact() {
  const email = "arnabkumartripathy@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed — just email me directly : arnabkumartripathy@gmail.com | arnabtripathy96@gmail.com");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-14">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Contact</h2><br></br>
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        The world is a very small place, small enough to travel and large enough<br></br> 
        to be understood by human mind, isn't it ?
        I know you have a project or <br></br>
        role in mind ;) Let’s talk !
      </p>

      {/* Top row: left content + right globe (more compact, globe nudged up) */}
      <div className="mt-4 grid gap-6 md:gap-8 md:grid-cols-2 md:items-start">
        {/* Left column */}
        <div className="space-y-3">
          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/Akt99"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="transition-colors text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.97 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.23 0 4.64-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .5z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/your-handle"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="transition-colors text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V23h-3.95V8.5z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/or__know?igsh=MTExbDU2NXBpOWJheQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="transition-colors text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9.5zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
              </svg>
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Email me
            </a>
            <button
              onClick={copyEmail}
              className="rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-white dark:text-black dark:hover:bg-white"
            >
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </div>

        {/* Right column: globe; nudged up a bit */}
        <div className="flex justify-end">
          <ContactGlobe size={380} className="self-start md:-mt-22" />
        </div>
      </div>

      {/* Form (full width below) */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white">
        <form action="https://formspree.io/f/your-id" method="POST" className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-white dark:text-black dark:placeholder-black"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-white dark:text-black dark:placeholder-black"
              placeholder="you@example.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-white dark:text-black dark:placeholder-black"
              placeholder="Tell me about your project…"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="w-full sm:w-auto rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
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

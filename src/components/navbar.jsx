import { useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#home" className="text-lg font-semibold tracking-tight">
          YourName<span className="text-blue-600">.</span>
        </a>

        <button
          className="md:hidden rounded p-2 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map(l => (
            <li key={l.href}><a className="text-sm text-gray-700 hover:text-blue-600" href={l.href}>{l.label}</a></li>
          ))}
          <li>
            <a href="#contact" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Hire me
            </a>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="border-t bg-white md:hidden">
          <ul className="mx-auto max-w-5xl space-y-2 px-4 py-3">
            {links.map(l => (
              <li key={l.href}><a className="block py-2" href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

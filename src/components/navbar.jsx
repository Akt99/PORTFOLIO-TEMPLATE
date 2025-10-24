// src/components/navbar.jsx
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./theme-toggle.jsx";
import { AnimatePresence, motion } from "framer-motion";
import AvatarLightbox from "./avatar-lightbox.jsx";
import avatar from "../assets/aktavatar2.png";

const links = [
  { href: "/home",         label: "Home" },       // default
  { href: "/about",    label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/contact",  label: "Contact" },
];

export function Navbar() {  // NAMED export
  const [open, setOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  const linkClass =
    "text-sm text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400";
  const activeClass = "text-blue-600 dark:text-blue-400";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"
        role="navigation"
        aria-label="Main"
      >
        {/* Brand: avatar opens lightbox; name navigates home */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAvatar(true)}
            className="outline-none"
            aria-label="Open profile photo"
            title="Open profile photo"
          >
            <img
              src={avatar}
              alt="Arnab"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/70 dark:ring-gray-800"
              loading="eager"
              decoding="async"
            />
          </button>

          {/* go Home instead of /about */}
          <Link to="/home" className="text-lg font-semibold tracking-tight">
            Arnab Kumar Tripathy<span className="text-blue-600">.</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink
                to={l.href}
                className={({ isActive }) => (isActive ? activeClass : linkClass)}
                end={l.href === "/home"} // exact match for Home
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/contact"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Hire me
            </NavLink>
          </li>
          <li className="pl-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Right side controls on mobile: theme + menu btn */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" fill="currentColor" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer (animated) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t bg-white dark:bg-gray-900 dark:border-gray-800"
          >
            <ul className="mx-auto max-w-5xl space-y-2 px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <NavLink
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 text-blue-600 dark:text-blue-400"
                        : "block py-2 text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                    }
                    end={l.href === "/home"}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-block rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Hire me
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar lightbox */}
      <AvatarLightbox
        open={showAvatar}
        src={avatar}
        alt="Arnab — profile photo"
        onClose={() => setShowAvatar(false)}
      />
    </header>
  );
}

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function AvatarLightbox({ open, src, alt = "", onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Always mount AnimatePresence in a portal so exit animations play
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Center container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.figure
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative"
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="
                  block rounded-2xl shadow-2xl ring-1 ring-white/15
                  bg-black
                  max-h-[85vh] max-w-[92vw] md:max-w-[900px]
                  object-contain
                "
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute -top-3 -right-3 inline-flex h-9 w-9 items-center justify-center
                           rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-black/10
                           hover:bg-white dark:bg-gray-800 dark:text-gray-200 dark:ring-white/10"
                aria-label="Close"
                title="Close"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M6.225 4.811L4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z"/>
                </svg>
              </button>
            </motion.figure>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

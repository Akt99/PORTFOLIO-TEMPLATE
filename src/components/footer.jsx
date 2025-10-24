export default function Footer() {
  return (
    <footer className="relative z-20 border-t bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <span>© {new Date().getFullYear()} arnabkumartripathy@gmail.com  </span>
        <a href="#" className="hover:text-blue-600">Back to top ↑</a>
      </div>
    </footer>
  );
}

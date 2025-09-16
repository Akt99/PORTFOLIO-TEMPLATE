export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <span>© {new Date().getFullYear()} YourName</span>
        <a href="#home" className="hover:text-blue-600">Back to top ↑</a>
      </div>
    </footer>
  );
}

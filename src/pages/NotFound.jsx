import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">404 — Not Found</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">That page doesn’t exist.</p>
      <Link to="/" className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Go to Home
      </Link>
    </section>
  );
}

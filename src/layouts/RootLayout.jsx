import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

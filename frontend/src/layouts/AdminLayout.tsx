import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header
          className="h-14 px-6 flex  bg-white text-black border-zinc-200
         dark:bg-zinc-950  dark:text-white dark:border-zinc-800 items-center justify-between border-b"
        >
          <h1 className="text-lg font-medium ">Admin-Dashboard</h1>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1  overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

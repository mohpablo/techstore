import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const {theme , setTheme}  = useContext(themeContext)

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-xl
      transition-all duration-300
      bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black
      dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800
      active:scale-95"
    >
      <div className="relative w-5 h-5">
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            theme ? "opacity-0 rotate-90 scale-75" : "opacity-100"
          }`}
        />
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            theme ? "opacity-100" : "opacity-0 -rotate-90 scale-75"
          }`}
        />
      </div>
    </button>
  );
}

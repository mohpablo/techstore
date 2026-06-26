import { useEffect, useState } from "react";
import { themeContext } from "./ThemeContext";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDark = localStorage.getItem("theme") === "dark";
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
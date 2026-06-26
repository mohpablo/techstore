import { createContext } from "react";

type themeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const themeContext = createContext<themeContextType>({
  theme: "light",
  setTheme: () => {},
});



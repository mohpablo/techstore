import { createContext } from "react";

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: string;
  setUser: (value: string) => void;
};

export const userContext = createContext<UserContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: "",
  setUser: () => {},
});

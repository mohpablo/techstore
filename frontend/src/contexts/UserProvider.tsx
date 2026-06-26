import { useEffect, useState } from "react";
import { userContext } from "./UserContext";

export default function UserProvider({ children }: React.PropsWithChildren) {
  const LoggedIn: boolean = !!sessionStorage.getItem("LoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(LoggedIn);

  const userName = sessionStorage.getItem("userName");
  const [user, setUser] = useState<string>(userName || "");

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("userName", user);
    } else {
      sessionStorage.removeItem("userName");
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("LoggedIn", String(isLoggedIn));
    } else {
      sessionStorage.removeItem("LoggedIn");
    }
  }, [isLoggedIn]);

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
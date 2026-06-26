import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ThemeProvider from "./contexts/ThemeProvider";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

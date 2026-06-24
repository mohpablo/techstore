import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProvider from "./contexts/UserContext";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./layouts/AdminLayout";
import ThemeProvider from "./contexts/ThemeContext";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ViewUser from "./components/users/ViewUser";
import CreateUser from "./components/users/CreateUser";
import UpdateUser from "./components/users/UpdateUser";
import CategoriesPage from "./pages/CategoriesPage";
import CreateCategory from "./components/categories/CreateCategory";
import ViewCategory from "./components/categories/ViewCategory";
import UpdateCategory from "./components/categories/UpdateCategory";
import SettingsPage from "./pages/SettingsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Auth",
      element: <AuthPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "products",
          element: <ProductsPage/>,
        },
        {
          path: "categories",
          children: [
            {
              index: true,
              element: <CategoriesPage />,
            },
            {
              path: "create",
              element: <CreateCategory />,
            },
            {
              path: ":id",
              element: <ViewCategory />,
            },
            {
              path: ":id/edit",
              element: <UpdateCategory />,
            },
          ],
        },
        {
          path: "orders",
          element: <h1>Orders</h1>,
        },
        {
          path: "users",
          children: [
            {
              index: true,
              element: <UsersPage />,
            },
            {
              path: "create",
              element: <CreateUser />,
            },
            {
              path: ":id",
              element: <ViewUser />,
            },
            {
              path: ":id/edit",
              element: <UpdateUser />,
            },
          ],
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import { usersRoute } from "./usersRoute";
import { productsRoute } from "./productsRoute";
import { categoriesRoute } from "./categoriesRoute";
import { ordersRoute } from "./ordersRoute";
import { settingsRoute } from "./settingsRoute";

export const router = createBrowserRouter([
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
      productsRoute,
      categoriesRoute,
      ordersRoute,
      usersRoute,
      settingsRoute,
    ],
  },
]);

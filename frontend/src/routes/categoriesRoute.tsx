import type { RouteObject } from "react-router-dom";
import UpdateCategory from "../components/categories/UpdateCategory";
import ViewCategory from "../components/categories/ViewCategory";
import CreateCategory from "../components/categories/CreateCategory";
import CategoriesPage from "../pages/CategoriesPage";

export const categoriesRoute: RouteObject = {
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
};

import type { RouteObject } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";

export const productsRoute: RouteObject = {
  path: "products",
  element: <ProductsPage />,
};

import type { RouteObject } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import ViewProduct from "../components/products/ViewProduct";

export const productsRoute: RouteObject = {
  path: "products",
  children: [
    {
      index: true,
      element: <ProductsPage />,
    },
    {
      path:':id',
      element: <ViewProduct/>
    }
  ],
};

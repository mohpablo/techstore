import type { PaginationMeta } from "./paginationMeta.type";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  discount_price: number;
  price: number;
  short_description: string;
  status: string;
  stock: number;
  is_featured: boolean;
};

type ViewProduct = {
  description: string;
} & Product;

type ProductResponse = {
  data: Product[];
  meta: PaginationMeta;
};

export type { Product, ProductResponse, ViewProduct };

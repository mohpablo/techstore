import type { PaginationMeta } from "./paginationMeta.type";

type Category = {
  id: number;
  name: string;
  image?: string;
  description: string;
};

type CreateCategory = { name: string; description: string; image?: File };

type UpdateCategory = Partial<CreateCategory> & {
  remove_image?: boolean; 
};

type CategoriesResponse = {
  data: Category[];
  meta: PaginationMeta;
};

export type { Category, CategoriesResponse , CreateCategory, UpdateCategory };

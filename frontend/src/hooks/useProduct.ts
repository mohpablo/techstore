import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";

export function useProducts(
  page: number,
  search?: string,
  status?: string,
  archived?: boolean
) {
  const { data, error, isFetching } = useQuery({
    queryKey: ["products",page, search, status, archived],
    queryFn: async () => await getProducts(page,search,status,archived),
    staleTime: 5 * 60 * 1000,
  });

  return {
    products: data?.data,
    meta: data?.meta,
    isFetching,
    productsError: error,
  };
}

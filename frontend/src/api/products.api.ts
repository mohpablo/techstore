import type { ProductResponse } from "../types/products.types";
import { api } from "./client";

export const getProducts = async (
  page: number,
  search?: string,
  status?: string,
  archived?: boolean,
): Promise<ProductResponse> => {
  try {
    const searchQuery = search ? `&search=${search}` : ``;
    const statusQuery = status ? `&status=${status}` : ``;
    const archivedQuery = archived ? `&archived=${archived}` : ``;
    const response = await api.get(`products?page=${page}` + searchQuery + statusQuery + archivedQuery);
    return response.data;
  } catch (err) {
    if (err && typeof err === "object" && "response" in err) {
      const axiosError = err as { response?: { data?: unknown } };
      console.log(axiosError.response?.data);
    } else {
      console.log("An unexpected error occurred:", err);
    }
    throw err;
  }
};

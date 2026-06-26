import type {
  CategoriesResponse,
  Category,
  CreateCategory,
  UpdateCategory,
} from "../types/categories.types";
import { api } from "./client";

export const getCategories = async (
  page: number = 1,
  search?: string,
  archived: boolean = false,
): Promise<CategoriesResponse> => {
  try {
    const response = await api.get(
      `categories?page=${page}&search=${search}&archived=${archived}`,
    );
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

export const createCategory = async ({
  name,
  description,
  image,
}: CreateCategory): Promise<Category> => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }
    console.log([...formData.entries()]);
    const response = await api.post("categories", formData);

    console.log(response.data);
    return response.data.data;
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

export const viewCategory = async (id: number): Promise<Category> => {
  try {
    const response = await api.get(`categories/${id}`);
    console.log(response.data);
    return response.data.data;
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

export const updateCategory = async (
  id: number,
  data: UpdateCategory,
): Promise<Category> => {
  try {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.remove_image === true) {
      formData.append("remove_image", "true");
    }
    console.log([...formData.entries()]);
    const response = await api.put(`categories/${id}`, formData);
    return response.data.data;
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

export const archiveCategory = async (id: number): Promise<Category> => {
  try {
    const reponse = await api.get(`categories/${id}/archive`);
    return reponse.data.data;
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

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`categories/${id}`);
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

export const restoreCategory = async (id: number): Promise<Category> => {
  try {
    const reponse = await api.get(`categories/${id}/restore`);
    return reponse.data.data;
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

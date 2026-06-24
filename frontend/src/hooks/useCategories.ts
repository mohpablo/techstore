import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  archiveCategory,
  createCategory,
  deleteCategory,
  getCategories,
  restoreCategory,
  updateCategory,
  viewCategory,
} from "../api/categories.api";
import type { CreateCategory, UpdateCategory } from "../types/categories.types";
import { useNavigate } from "react-router-dom";

export function useCategories(
  page: number,
  search?: string,
  archived: boolean = false,
) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["categories", page, search, archived],
    queryFn: () => getCategories(page, search, archived),
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: data?.data,
    meta: data?.meta,
    isFetching,
    categoriesError: error,
  };
}

export function useCreateCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (data: CreateCategory) => await createCategory(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories", { state: { createdCategory: data.name } });
    },
  });

  return {
    loading: isPending,
    apiError: error,
    createCategory: mutate,
  };
}

export function useViewCategory(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => viewCategory(id),
    staleTime: 5 * 60 * 1000,
  });

  return { category: data, loading: isLoading, error };
}

export function useUpdateCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateCategory }) =>
      await updateCategory(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      navigate("/categories", { state: { UpdatedCategory: data.name } });
    },
  });

  return {
    loading: isPending,
    apiError: error,
    updateCategory: mutate,
  };
}

export function useArchiveCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (id: number) => await archiveCategory(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories", { state: { ArchivedCategory: data.name } });
    },
  });

  return {
    loading: isPending,
    apiError: error,
    archiveCategory: mutate,
  };
}

export function useDeleteCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (id: number) => await deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  return {
    loading: isPending,
    apiError: error,
    deleteCategory: mutate,
  };
}

export function useRestoreCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (id: number) => await restoreCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigate("/categories");
    },
  });

  return {
    loading: isPending,
    apiError: error,
    restoreCategory: mutate,
  };
}

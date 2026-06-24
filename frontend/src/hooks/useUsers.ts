import { useNavigate } from "react-router-dom";
import {
  ArchiveUser,
  CreateUser,
  DeleteUser,
  getUserById,
  getUsers,
  RestoreUser,
  UpdateUser,
} from "../api/users.api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { CreateUsers } from "../types/user.types";
import type { UpdateUserSchema } from "../schemas/user.schema";

export function useUsers(
  page: number,
  search?: string,
  role?: string,
  archived?: boolean,
) {
  const { data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["users", page, search, role, archived],
    queryFn: () => getUsers(page, search, role, archived),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 5 * 60 * 1000,
  });

  return {
    users: data?.data,
    meta: data?.meta,
    isFetching,
    usersError: error,
    isPlaceholderData,
  };
}

export function useViewUser(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    staleTime: 5 * 60 * 1000,
  });

  return { user: data, loading: isLoading, error };
}

export function useRestoreUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async (id: number) => await RestoreUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { state: { restoredUser: data.name } });
    },
  });

  return { restoreUser: mutate, restoreError: error };
}

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: (id: number) => DeleteUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { state: { deletedUser: data.message } });
    },
  });

  return { deleteUser: mutate, deleteError: error };
}

export function useCreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (NewUser: CreateUsers) => {
      return await CreateUser(NewUser);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User Created");
      navigate("/users", { state: { newUser: data.name } });
    },
  });

  return {
    loading: isPending,
    apiError: error,
    createUser: mutate,
  };
}

export function useArchiveUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: (id: number) => ArchiveUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { state: { archivedUser: data.name } });
    },
  });

  return { archiveUser: mutate, archiveError: error };
}

export function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateUserSchema }) =>
      await UpdateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { state: { updatedUser: data.name } });
    },
  });

  return {
    loading: isPending,
    apiError: error,
    updateUserData: data,
    updateUser: mutate,
  };
}

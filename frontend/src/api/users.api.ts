import type {
  CreateUsers,
  User,
  UserResponse,
  UsersResponse,
} from "../types/user.types";
import { api } from "./client";
import type { Success } from "../types/auth.types";
import type { UpdateUserSchema } from "../schemas/user.schema";

export const getUsers = async (
  page: number = 1,
  search?: string,
  role?: string,
  archived?: boolean,
): Promise<UsersResponse> => {
  try {
    const searchQuery = search ? `&search=${search}` : ``;
    const roleQuery = role ? `&role=${role}` : ``;
    const archivedQuery = archived ? `&archived=${archived}` : ``;
    const response = await api.get(
      `users?page=${page}` + searchQuery + roleQuery + archivedQuery,
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

export const CreateUser = async (data: CreateUsers): Promise<User> => {
  try {
    const response = await api.post("users", data);
    const userResponse: UserResponse = response.data;
    const user: User = userResponse.data;
    return user;
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

export const ArchiveUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`users/${id}/archive`);
    const userResponse: UserResponse = response.data;
    const user: User = userResponse.data;
    return user;
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

export const RestoreUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`users/${id}/restore`);
    const userResponse: UserResponse = response.data;
    const user: User = userResponse.data;
    console.log(user);
    return user;
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

export const DeleteUser = async (id: number): Promise<Success> => {
  try {
    const response = await api.delete(`users/${id}`);
    const userResponse: Success = response.data;
    return userResponse;
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

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`users/${id}`);
    const userResponse: UserResponse = response.data;
    const user: User = userResponse.data;
    return user;
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

export const UpdateUser = async (
  id: number,
  data: UpdateUserSchema,
): Promise<User> => {
  try {
    const response = await api.put(`users/${id}`, data);
    const userResponse: UserResponse = response.data;
    const user: User = userResponse.data;
    return user;
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

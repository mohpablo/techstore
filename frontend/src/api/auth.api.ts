import axios from "axios";
import { api } from "./client";
import type { User } from "../types/user.types";

// CSRF MUST NOT use /api/v1
export const getCsrf = () =>
  axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });

export const login = async (email: string, password: string) => {
  try {
    console.log("login");
    return await api.post("login", { email, password });
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

export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
) => {
  try {
    console.log("register");
    return await api.post("register", {
      name,
      email,
      password,
      password_confirmation,
    });
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

export const logout = () => api.post("logout");

export const getUser = async (): Promise<User> => {
  try {
    const response = await api.get("user");
    const user: User = response.data;
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

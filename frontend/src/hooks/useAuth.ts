import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, getUser, getCsrf, logout, register } from "../api/auth.api.ts";
import { userContext } from "../contexts/UserContext.tsx";
import type { Error, signIn, signUp } from "../types/auth.types.ts";
import type { User } from "../types/user.types.ts";

export function useAuth() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser  } = useContext(userContext);

  const signInMutation = useMutation({
    mutationFn: async (data: signIn) => {
      await getCsrf();
      await login(data.email, data.password);
    },
    onSuccess: async () => {
      const username: User = await getUser();
      setUser(username.name);
      setIsLoggedIn(true);
      navigate("/");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (data: signUp) => {
      await getCsrf();
      await register(
        data.name,
        data.email,
        data.password,
        data.password_confirmation,
      );
    },
    onSuccess: async () => {
      const username: User = await getUser();
      setUser(username.name);
      setIsLoggedIn(true);
      navigate("/");
    },
  });

  const signOutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsLoggedIn(false);
    },
  });

  const getErrorMessage = (error: unknown): Error => {
    if (axios.isAxiosError<Error>(error)) {
      return error.response?.data ?? { message: "Action failed", errors: {} };
    }
    return { message: "An unexpected error occurred", errors: {} };
  };

  const signIn = (email: string, password: string) =>
    signInMutation.mutate({ email, password });

  const signUp = (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => signUpMutation.mutate({ name, email, password, password_confirmation });

  const signOut = () => signOutMutation.mutate();

  return {
    loading: signInMutation.isPending || signUpMutation.isPending,
    error: signInMutation.error
      ? getErrorMessage(signInMutation.error)
      : signUpMutation.error
        ? getErrorMessage(signUpMutation.error)
        : null,
    signIn,
    signUp,
    signOut,
  };
}

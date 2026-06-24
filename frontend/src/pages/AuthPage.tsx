import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../hooks/useAuth";

import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthForm from "../components/auth/AuthForm";
import AuthToggle from "../components/auth/AuthToggle";

import {
  loginSchema,
  registerSchema,
  type LoginForm,
  type RegisterForm,
} from "../schemas/auth.schema";

export default function AuthPage() {
  const { signIn, signUp, error, loading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    reset();
  };

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    if (isLogin) {
      await signIn(data.email, data.password);
    } else {
      const regData = data as RegisterForm;
      await signUp(
        regData.name,
        regData.email,
        regData.password,
        regData.password_confirmation,
      );
    }
    reset();
  };

  return (
    <AuthCard>
      <AuthHeader isLogin={isLogin} />

      <AuthForm
        isLogin={isLogin}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        loading={loading}
        error={error?.message}
      />

      <AuthToggle isLogin={isLogin} onToggle={toggleMode} />
    </AuthCard>
  );
}

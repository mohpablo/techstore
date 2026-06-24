import AuthInput from "./AuthInput";
import AuthError from "./AuthError";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

type AuthFormValues = {
  email: string;
  password: string;
  name?: string; 
  password_confirmation?: string; 
};
type Props = {
  isLogin: boolean;
  register: UseFormRegister<AuthFormValues>;
  errors: FieldErrors<AuthFormValues>;
  onSubmit: (e: React.SyntheticEvent) => void;
  loading: boolean;
  error?: string;
};

export default function AuthForm({
  isLogin,
  register,
  errors,
  onSubmit,
  loading,
  error,
}: Props) {
  return (
    <>
      {error && <AuthError message={error} />}

      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        {!isLogin && (
          <div>
            <AuthInput
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        <div>
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isLogin && (
          <div>
            <AuthInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("password_confirmation")}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-medium
          bg-black text-white hover:bg-zinc-800
          dark:bg-white dark:text-black dark:hover:bg-zinc-200
          disabled:opacity-50"
        >
          {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>
    </>
  );
}

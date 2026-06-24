import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  ArrowLeft,
  ChevronRight,
  Users,
  Info,
  Mail,
  Phone,
  Lock,
  Check,
} from "lucide-react";
import InputField from "../InputField";
import ErrorToast from "../ErrorToast";
import ErrorSpan from "../ErrorSpan";
import { ROLES } from "../../types/user.types";
import { useForm, useWatch } from "react-hook-form";
import {
  createUserSchema,
  type CreateUserSchema,
} from "../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "../../hooks/useUsers";

export default function CreateUser() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const selectedRole = useWatch({ control, name: "role" });

  const { loading, apiError, createUser } = useCreateUser();

  const onSubmit = (data: CreateUserSchema) => {
    createUser(data);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-3 md:p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <button
              onClick={() => navigate("/users")}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Users
            </button>
            <ChevronRight
              size={14}
              className="text-zinc-300 dark:text-zinc-700"
            />
            <span className="text-zinc-400 dark:text-zinc-500 font-medium">
              Create Member
            </span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/5">
                <UserPlus size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Add New Member
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1.5">
                  <Info size={14} /> Set up a new account.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/users")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-all border border-zinc-200 dark:border-zinc-800"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </header>
        {apiError && <ErrorToast message={apiError.message} />}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 shadow-xl shadow-black/2"
        >
          <div className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <InputField
                  label="Full Name"
                  icon={Users}
                  placeholder="Alex Rivera"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <ErrorSpan message={errors.name?.message} />
                )}
              </div>

              <div className="space-y-1">
                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="alex@example.com"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <ErrorSpan message={errors.email?.message} />
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1 block">
                Assigned Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROLES.map((role) => {
                  const isActive = selectedRole === role.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setValue("role", role.value)}
                      className={`
                        relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all
                        ${
                          isActive
                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md"
                            : "border-zinc-200 bg-zinc-50/50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400 hover:border-zinc-300"
                        }
                      `}
                    >
                      <div className="flex w-full justify-between items-center mb-0.5">
                        <span className="text-[13px] font-bold tracking-tight">
                          {role.label}
                        </span>
                        {isActive && <Check size={12} />}
                      </div>
                      <span className="text-[11px] opacity-70 leading-tight">
                        {role.desc}
                      </span>
                    </button>
                  );
                })}
                {errors.role?.message && (
                  <ErrorSpan message={errors.role?.message} />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <InputField
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="10 digit phone number"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <ErrorSpan message={errors.phone?.message} />
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-900" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <InputField
                  label="Password"
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <ErrorSpan message={errors.password.message} />
                )}
              </div>

              <div className="space-y-1">
                <InputField
                  label="Confirm Password"
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation?.message && (
                  <ErrorSpan message={errors.password_confirmation.message} />
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold transition-all bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.99] text-[15px] shadow-lg shadow-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

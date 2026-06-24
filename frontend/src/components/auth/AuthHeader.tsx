export default function AuthHeader({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        {isLogin ? "Welcome back" : "Create account"}
      </h1>

      <p className="text-sm text-zinc-500 mt-1">
        {isLogin
          ? "Sign in to your dashboard"
          : "Start managing your dashboard"}
      </p>
    </div>
  );
}

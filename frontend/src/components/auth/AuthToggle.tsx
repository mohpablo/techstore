export default function AuthToggle({ isLogin, onToggle }: any) {
  return (
    <div className="mt-6 text-center text-sm text-zinc-500">
      {isLogin ? "Don't have an account?" : "Already have an account?"}

      <button
        onClick={onToggle}
        className="ml-2 font-medium text-black dark:text-white hover:underline"
      >
        {isLogin ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
}

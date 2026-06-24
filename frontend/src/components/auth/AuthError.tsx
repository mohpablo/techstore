type AuthErrorProps = {
  message: string;
};

export default function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {message}
    </div>
  );
}

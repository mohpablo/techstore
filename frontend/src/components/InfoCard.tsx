type Props = {
  label: string;
  value?: string;
  loading?: boolean;
};

export default function InfoCard({ label, value, loading }: Props) {
  return (
    <div
      className="
        rounded-xl border p-4
        border-zinc-200 bg-white
        dark:border-zinc-800 dark:bg-zinc-950
      "
    >
      <p className="text-sm text-zinc-500 mb-2">{label}</p>

      {loading ? (
        <div
          className="
            h-5 w-3/4 rounded-md
            bg-zinc-200 animate-pulse

            dark:bg-zinc-800
          "
        />
      ) : (
        <p className="font-medium text-black dark:text-white">{value}</p>
      )}
    </div>
  );
}

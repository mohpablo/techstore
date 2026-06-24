export type ColumnConfig<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

type PaginationMeta = {
  current_page?: number;
  last_page?: number;
  total?: number;
};

type DataTableProps<T> = {
  title: string;
  subtitle: string;
  data: T[] | undefined;
  columns: ColumnConfig<T>[];
  meta: PaginationMeta | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  renderActions?: (item: T) => React.ReactNode;
  emptyStateText?: string;
};

export default function Table<T extends { id: string | number }>({
  title,
  subtitle,
  data,
  columns,
  meta,
  page,
  setPage,
  renderActions,
  emptyStateText = "No records found",
}: DataTableProps<T>) {
  const totalColumns = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="rounded-2xl border overflow-hidden border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="px-6 py-4 border-b flex items-center justify-between border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          {meta?.total ?? 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-200 dark:border-zinc-800">
            <tr className="text-left text-zinc-500">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 font-medium ${col.className ?? ""} ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition-colors border-zinc-100 hover:bg-zinc-50 dark:border-zinc-100/5 dark:hover:bg-zinc-900/40"
                >
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className={`px-6 py-4 ${col.className ?? ""} ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                            ? "text-right"
                            : "text-left"
                      }`}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {renderActions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t flex items-center justify-between border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Page {meta?.current_page ?? 1} of {meta?.last_page ?? 1}
        </p>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-zinc-200 bg-white disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
          >
            Prev
          </button>
          <button
            disabled={page === meta?.last_page || !meta?.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-black text-white disabled:opacity-40 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

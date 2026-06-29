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
  title, subtitle, data, columns, meta, page, setPage, renderActions, emptyStateText = "No records found",
}: DataTableProps<T>) {
  const totalColumns = columns.length + (renderActions ? 1 : 0);

  const getAlignClass = (align?: string) => 
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div>
          <h2 className="table-title">{title}</h2>
          <p className="table-subtitle">{subtitle}</p>
        </div>
        <span className="table-count-badge">{meta?.total ?? 0} total</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead className="table-head-row">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={`table-header-cell ${getAlignClass(col.align)} ${col.className ?? ""}`}>
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="table-header-cell text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {!data?.length ? (
              <tr>
                <td colSpan={totalColumns} className="px-6 py-12 text-center text-zinc-500">{emptyStateText}</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="table-row">
                  {columns.map((col, i) => (
                    <td key={i} className={`table-cell ${getAlignClass(col.align)} ${col.className ?? ""}`}>
                      {col.render(item)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="table-cell"><div className="flex justify-center gap-2">{renderActions(item)}</div></td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p className="text-sm text-zinc-500">Page {meta?.current_page ?? 1} of {meta?.last_page ?? 1}</p>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="pagination-btn">Prev</button>
          <button disabled={page === meta?.last_page || !meta?.last_page} onClick={() => setPage((p) => p + 1)} className="pagination-btn pagination-btn-next">Next</button>
        </div>
      </div>
    </div>
  );
}

import { Archive, ArchiveRestore, Eye, Pencil, Trash } from "lucide-react";
import type { PaginationMeta } from "../../types/paginationMeta.type";
import type { Product } from "../../types/products.types";
import Table from "../Table";

type Props = {
  products: Product[] | undefined;
  meta: PaginationMeta | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onArchive: (id: number) => void;
  isArchived: boolean;
  onRestore: (id: number) => void;
  ondelete: (id: number) => void;
};

export default function ProductsTable({
  products,
  meta,
  page,
  setPage,
  isArchived,
  onArchive,
  onRestore,
  ondelete,
}: Props) {
  return (
    <Table<Product>
      title="Products"
      subtitle={
        isArchived
          ? "View and restore Archived products"
          : "Create, view and manage products"
      }
      data={products}
      meta={meta}
      page={page}
      setPage={setPage}
      columns={[
        {
          header: "Name",
          className: "font-medium text-black dark:text-white",
          render: (product) => product.name,
        },
        {
          header: "Category",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => product.category,
        },
        {
          header: "Brand",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => product.brand,
        },
        {
          header: "Price",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => product.price,
        },
        {
          header: "discount_price",
          className: "text-zinc-600 dark:text-zinc-400",
          align:"center",
          render: (product) => product.discount_price,
        },
        {
          header: "short_description",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => product.short_description,
        },
        {
          header: "Stock",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => product.stock,
        },
        {
          header: "Featured",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => (
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                product.is_featured
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                  : "bg-zinc-50 text-zinc-600 ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20"
              }`}
            >
              {product.is_featured ? "Featured" : "Standard"}
            </span>
          ),
        },
        {
          header: "status",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (product) => {
            const statusConfig: Record<
              string,
              { text: string; classes: string }
            > = {
              active: {
                text: "Active",
                classes:
                  "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
              },
              inactive: {
                text: "Inactive",
                classes:
                  "bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
              },
              out_of_stock: {
                text: "Out of Stock",
                classes:
                  "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
              },
            };
            const current = statusConfig[product.status];
            return (
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${current.classes}`}
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    product.status === "active"
                      ? "bg-emerald-500"
                      : product.status === "inactive"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                  }`}
                />
                {current.text}
              </span>
            );
          },
        },
      ]}
      renderActions={(product) => (
        <>
          {!isArchived && (
            <button
              onClick={() => {}}
              className="p-2 border rounded-lg text-blue-600 dark:text-blue-300"
            >
              <Pencil size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => confirm("Delete?") && ondelete(product.id)}
              className="p-2 border rounded-lg text-red-600"
            >
              <Trash size={16} />
            </button>
          ) : (
            <button
              onClick={() => {}}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              <Eye size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => onRestore(product.id)}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              <ArchiveRestore size={16} />
            </button>
          ) : (
            <button
              onClick={() => onArchive(product.id)}
              className="p-2 border rounded-lg text-red-600"
            >
              <Archive size={16} />
            </button>
          )}
        </>
      )}
    />
  );
}

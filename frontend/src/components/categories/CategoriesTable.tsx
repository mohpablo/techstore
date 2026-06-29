import { Archive, ArchiveRestore, Eye, Pencil, Trash } from "lucide-react";
import type { Category } from "../../types/categories.types";
import type { PaginationMeta } from "../../types/paginationMeta.type";
import Table from "../Table";
import { useNavigate } from "react-router-dom";

type Props = {
  categories: Category[] | undefined;
  meta: PaginationMeta | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onArchive: (id: number) => void;
  isArchived: boolean;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
};

export default function CategoriesTable({
  categories,
  meta,
  page,
  setPage,
  onArchive,
  isArchived,
  onDelete,
  onRestore,
}: Props) {
  const navigate = useNavigate();
  return (
    <Table<Category>
      title="Categories"
      subtitle={
        isArchived
          ? "View and restore Archived categories"
          : "Create, view and manage categories"
      }
      data={categories}
      meta={meta}
      page={page}
      setPage={setPage}
      columns={[
        {
          header: "Name",
          className: "font-medium text-black dark:text-white",
          render: (category) => category.name,
        },
        {
          header: "Description",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (category) => category.description,
        },
      ]}
      emptyStateText="No categories found"
      renderActions={(category) => (
        <>
          {!isArchived && (
            <button
              onClick={() => navigate(`${category.id}/edit`)}
              className="p-2 border rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
            >
              <Pencil size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => confirm("Delete?" ) && onDelete(category.id)}
              className="p-2 border rounded-lg text-red-600"
            >
              <Trash size={16} />
            </button>
          ) : (
            <button
              onClick={() => navigate(`${category.id}`)}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <Eye size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => onRestore(category.id)}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              <ArchiveRestore size={16} />
            </button>
          ) : (
            <button
              onClick={() => onArchive(category.id)}
              className="p-2 border rounded-lg text-red-600 dark:text-red-300 hover:bg-red-50/50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Archive size={16} />
            </button>
          )}
        </>
      )}
    />
  );
}

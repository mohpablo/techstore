import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user.types";
import { Eye, Archive, ArchiveRestore, Trash, Pencil } from "lucide-react";
import Table from "../Table";
import type { PaginationMeta } from "../../types/paginationMeta.type";

type Props = {
  users: User[] | undefined;
  meta: PaginationMeta | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onArchive: (id: number) => void;
  isArchived: boolean;
  onRestore: (id: number) => void;
  ondelete: (id: number) => void;
};

export default function UsersTable({
  users,
  meta,
  page,
  setPage,
  onArchive,
  isArchived,
  onRestore,
  ondelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <Table<User>
      title="Users"
      subtitle={
        isArchived
          ? "View and restore Archived users"
          : "Create, view and manage users"
      }
      data={users}
      columns={[
        {
          header: "Name",
          className: "font-medium text-black dark:text-white",
          render: (user) => user.name,
        },
        {
          header: "Email",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (user) => user.email,
        },
        {
          header: "Role",
          align: "left",
          render: (user) => (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {user.role}
            </span>
          ),
        },
        {
          header: "Phone",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (user) => user.phone || "No phone",
        },
        {
          header: "Last Login",
          className: "text-zinc-600 dark:text-zinc-400",
          render: (user) =>
            user.last_login_at
              ? new Date(user.last_login_at).toLocaleString()
              : "Never",
        },
      ]}
      meta={meta}
      page={page}
      setPage={setPage}
      emptyStateText="No users Found"
      renderActions={(user) => (
        <>
          {!isArchived && (
            <button
              onClick={() => navigate(`/users/${user.id}/edit`)}
              className="p-2 border rounded-lg text-blue-600 dark:text-blue-300"
            >
              <Pencil size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => confirm("Delete?") && ondelete(user.id)}
              className="p-2 border rounded-lg text-red-600"
            >
              <Trash size={16} />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/users/${user.id}`)}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              <Eye size={16} />
            </button>
          )}
          {isArchived ? (
            <button
              onClick={() => onRestore(user.id)}
              className="p-2 border rounded-lg text-zinc-600 dark:text-zinc-300"
            >
              <ArchiveRestore size={16} />
            </button>
          ) : (
            <button
              onClick={() => onArchive(user.id)}
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

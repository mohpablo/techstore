import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UsersTable from "../components/users/UsersTable";
import UsersTableSkeleton from "../components/users/UsersTableSkeleton";
import UsersHeader from "../components/users/UsersHeader";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccesToast";
import {
  useUsers,
  useArchiveUser,
  useRestoreUser,
  useDeleteUser,
} from "../hooks/useUsers";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [archived, setArchive] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const newUserName = location.state?.newUser;
  const archivedUserName = location.state?.archivedUser;
  const restoredUserName = location.state?.restoredUser;
  const deletedUserName = location.state?.deletedUser;

  const [successMsg, setSuccessMsg] = useState<string | null>();

  useEffect(() => {
    let message: string | null = null;

    if (newUserName) message = `you crated a new user ${newUserName}`;
    if (archivedUserName) message = `${archivedUserName} was archived`;
    if (restoredUserName) message = `${restoredUserName} was restored`;
    if (deletedUserName) message = `${deletedUserName} was deleled`;

    if (message) {
      const timer = setTimeout(() => {
        setSuccessMsg(message);
        window.history.replaceState({}, document.title);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [newUserName, archivedUserName, restoredUserName, deletedUserName]);

  const { users, meta, usersError, isFetching } = useUsers(
    page,
    searchTerm,
    roleFilter,
    archived,
  );

  const { archiveUser, archiveError } = useArchiveUser();

  const { restoreUser, restoreError } = useRestoreUser();

  const { deleteUser, deleteError } = useDeleteUser();

  const handleAddUser = () => {
    navigate("/users/create");
  };

  const handleViewArchive = () => {
    setArchive(!archived);
  };

  return (
    <>
      <UsersHeader
        onAddUser={handleAddUser}
        onViewArchive={handleViewArchive}
        isArchived={archived}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      {successMsg && (
        <SuccessToast
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}
      {usersError && (
        <ErrorToast message={usersError.message || "Failed to fetch users"} />
      )}
      {archiveError && (
        <ErrorToast
          message={archiveError.message || "Failed to archive user"}
        />
      )}
      {restoreError && (
        <ErrorToast
          message={restoreError.message || "Failed to restore user"}
        />
      )}
      {deleteError && (
        <ErrorToast message={deleteError.message || "Failed to delete user"} />
      )}
      {isFetching ? (
        <UsersTableSkeleton />
      ) : (
        <UsersTable
          users={users}
          meta={meta}
          page={page}
          setPage={setPage}
          onArchive={archiveUser}
          isArchived={archived}
          onRestore={restoreUser}
          ondelete={deleteUser}
        />
      )}
    </>
  );
}

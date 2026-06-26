import { useEffect, useState } from "react";
import CategoriesHeader from "../components/categories/CategoriesHeader";
import {
  useArchiveCategory,
  useCategories,
  useDeleteCategory,
  useRestoreCategory,
} from "../hooks/useCategories";
import CategoriesTableSkeleton from "../components/categories/CategoriesTableSkeleton";
import CategoriesTable from "../components/categories/CategoriesTable";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccesToast";
import { useLocation } from "react-router-dom";

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [archived, setArchived] = useState(false);
  const { apiError, archiveCategory, loading } = useArchiveCategory();
  const {
    apiError: restoreApiError,
    restoreCategory,
    loading: restoreLoading,
  } = useRestoreCategory();
  const {
    loading: deleteLoading,
    apiError: deleteApiError,
    deleteCategory,
  } = useDeleteCategory();
  const { categories, isFetching, categoriesError, meta } = useCategories(
    page,
    search,
    archived,
  );
  const location = useLocation();

  const createdCatName = location.state?.createdCategory;
  const updatedCatName = location.state?.UpdatedCategory;
  const archivedCatName = location.state?.ArchivedCategory;
  const restoredCatName = location.state?.RestoredCategory;

  const [successMsg, setSuccessMsg] = useState<string | null>();

  useEffect(() => {
    let message: string | null = null;

    if (createdCatName) message = `Category ${createdCatName} created`;
    if (updatedCatName) message = `Category ${updatedCatName} was updated`;
    if (archivedCatName) message = `Category ${archivedCatName} was archived`;
    if (restoredCatName) message = `Category ${restoredCatName} was restored`;

    if (message) {
      const timer = setTimeout(() => {
        setSuccessMsg(message);
        window.history.replaceState({}, document.title);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [createdCatName, updatedCatName, archivedCatName, restoredCatName]);

  return (
    <div className="p-8">
      <CategoriesHeader
        search={search}
        setSearch={setSearch}
        archived={archived}
        setArchived={setArchived}
      />
      {successMsg && (
        <SuccessToast
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}
      {categoriesError && <ErrorToast message={categoriesError.message} />}
      {apiError && <ErrorToast message={apiError.message} />}
      {restoreApiError && <ErrorToast message={restoreApiError.message} />}
      {deleteApiError && <ErrorToast message={deleteApiError.message} />}
      {isFetching || loading || restoreLoading || deleteLoading ? (
        <CategoriesTableSkeleton />
      ) : (
        <CategoriesTable
          categories={categories}
          meta={meta}
          page={page}
          setPage={setPage}
          onArchive={archiveCategory}
          isArchived={archived}
          onDelete={deleteCategory}
          onRestore={restoreCategory}
        />
      )}
    </div>
  );
}

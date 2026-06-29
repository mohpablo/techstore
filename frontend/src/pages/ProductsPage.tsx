import { useState } from "react";
import ProductsHeader from "../components/products/ProductsHeader";
import { useProducts } from "../hooks/useProduct";
import ProductsTable from "../components/products/ProductsTable";
import ProductsTableSkeleton from "../components/products/ProductTableskeleton";
import ErrorToast from "../components/ErrorToast";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [archived, setArchive] = useState(false);

  const handleViewArchive = () => {
    setArchive(!archived);
  };

  const { products, isFetching, meta, productsError } = useProducts(
    page,
    searchTerm,
    statusFilter,
    archived,
  );
  return (
    <>
      <ProductsHeader
        isArchived={archived}
        onAddProduct={() => {}}
        onViewArchive={handleViewArchive}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />
      {productsError && <ErrorToast message={productsError.message} />}
      {isFetching ? (
        <ProductsTableSkeleton />
      ) : (
        <ProductsTable
          products={products}
          meta={meta}
          isArchived={archived}
          onArchive={() => {}}
          page={page}
          setPage={setPage}
          onRestore={() => {}}
          ondelete={() => {}}
        />
      )}
    </>
  );
}

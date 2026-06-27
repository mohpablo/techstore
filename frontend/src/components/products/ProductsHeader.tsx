import { Archive, Package } from "lucide-react";
import Header from "../Header";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onAddProduct: () => void;
  onViewArchive: () => void;
  isArchived: boolean;
};

export default function ProductsHeader({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onAddProduct,
  onViewArchive,
  isArchived,
}: Props) {
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "out_of_stock", label: "Out of stock"},
  ];
  return (
    <Header
      title={"Manage Products"}
      subtitle={
        isArchived
          ? "View Archive products"
          : "Create, view and manage products"
      }
      primaryAction={{
        label: "add Product",
        onClick: onAddProduct,
        icon: <Package size={18} />,
      }}
      secondaryAction={{
        label: "view archived Products",
        onClick: onViewArchive,
        icon: <Archive size={18} />,
      }}
      filterOptions={statusOptions}
      filterPlaceholder="All Status"
      filterValue={statusFilter}
      setFilterValue={setStatusFilter}
      searchPlaceholder="search for a product by name"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
}

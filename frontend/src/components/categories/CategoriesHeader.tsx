import { Archive, TagIcon } from "lucide-react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  archived: boolean;
  setArchived: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoriesHeader({
  search,
  setSearch,
  setArchived,
  archived,
}: Props) {
  const navigate = useNavigate();
  return (
    <Header
      title={archived ? "Manage Archived Categories" : "Manage Categories"}
      subtitle={archived ? "View and restore Archived categories" : "Create, view and manage categories"}
      primaryAction={{
        label: "Add Category",
        onClick: () => {
          navigate("/categories/create");
        },
        icon: <TagIcon size={18} />,
      }}
      secondaryAction={{
        label: archived ? "View Categories" : "View Archived",
        onClick: () => {
          setArchived(!archived);
        },
        icon: <Archive size={18} />,
      }}
      searchPlaceholder="Search categories by name..."
      searchTerm={search}
      setSearchTerm={setSearch}
    />
  );
}

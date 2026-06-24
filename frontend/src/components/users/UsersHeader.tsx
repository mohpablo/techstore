import { UserPlus, Archive } from "lucide-react";
import Header from "../Header";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  onAddUser: () => void;
  onViewArchive: () => void;
  isArchived: boolean;
};

export default function UsersHeader({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  onAddUser,
  onViewArchive,
  isArchived,
}: Props) {
  const roleOptions = [
    { value: "manager", label: "Manager" },
    { value: "customer", label: "Customer" },
  ];
  return (
    <Header
      title="User Management"
      subtitle={
        isArchived
          ? "View and restore Archived users"
          : "Create, view and manage users"
      }
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search users by name or email..."
      filterValue={roleFilter}
      setFilterValue={setRoleFilter}
      filterOptions={roleOptions}
      filterPlaceholder="All Roles"
      primaryAction={{
        label: "Add User",
        onClick: onAddUser,
        icon: <UserPlus size={16} />,
      }}
      secondaryAction={{
        label: isArchived ? "View Users" : "View Archived",
        onClick: onViewArchive,
        icon: <Archive size={16} />,
      }}
    />
  );
}

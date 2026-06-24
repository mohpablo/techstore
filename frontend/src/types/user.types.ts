import type { PaginationMeta } from "./paginationMeta.type";


type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  last_login_at: string;
  avatar: string | null;
};

type CreateUsers = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string | null;
  role: string;
};

type UsersResponse = {
  data: User[];
  meta: PaginationMeta;
};

type UserResponse = {
  data: User;
};

type UserRole = "admin" | "manager" | "customer";

type RoleOption = {
  value: UserRole;
  label: string;
  desc: string;
};

type VaildationError = {
  gobal: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

const ROLES: RoleOption[] = [
  { value: "customer", label: "Customer", desc: "View resources." },
  { value: "manager", label: "Manager", desc: "Manage team." },
  { value: "admin", label: "Admin", desc: "Full control." },
];

export type {
  User,
  UsersResponse,
  UserResponse,
  CreateUsers,
  UserRole,
  RoleOption,
  VaildationError,
};

export { ROLES };

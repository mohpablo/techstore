import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

type NavItem = {
  name: string;
  icon: LucideIcon;
  path: string;
};

export default function Sidebar() {
  const { user } = useContext(userContext);
  const { signOut } = useAuth();

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Products", icon: Package, path: "products" },
    { name: "Categories", icon: Tags, path: "categories" },
    { name: "Orders", icon: ShoppingCart, path: "orders" },
    {
      name: "Users",
      icon: Users,
      path: "users",
    },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  return (
    <aside
      className="w-64 h-screen sticky top-0 overflow-y-auto flex flex-col border-r
      bg-white border-zinc-200
      dark:bg-zinc-950 dark:border-zinc-800
      scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
    >
      <div className="px-6 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-lg font-bold tracking-tight bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          ADMIN PANEL
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
                    }`
              }
            >
              <Icon
                size={20}
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
        <div className="rounded-xl p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 flex items-center justify-center shrink-0">
              <span className="text-white dark:text-zinc-900 font-bold text-sm">
                {user?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
                Admin
              </p>
              <p className="font-semibold text-sm truncate text-zinc-900 dark:text-white">
                {user}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              text-sm font-medium transition-all duration-200
              bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-md
              dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100
              active:scale-95"
          >
            <LogOut size={16} strokeWidth={2} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

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
    { name: "Users", icon: Users, path: "users" },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="sidebar-title">ADMIN PANEL</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
            }
          >
            <item.icon
              size={20}
              className="shrink-0 transition-transform duration-200 hover:scale-110"
            />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-info">
            <div className="avatar">{user?.charAt(0).toUpperCase() || "A"}</div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Admin Profile
              </p>
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                {user || "Administrator"}
              </p>
            </div>
          </div>
          <button onClick={signOut} className="logout-btn">
            <LogOut size={16} strokeWidth={2} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

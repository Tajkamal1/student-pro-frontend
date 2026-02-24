import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Code2,
  FolderOpen,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Daily Tasks", path: "/tasks", icon: CalendarCheck },
  { title: "Practice", path: "/practice", icon: Code2 },
  { title: "Student Storage", path: "/storage", icon: FolderOpen },
];

interface DashboardSidebarProps {
  userName: string;
  onLogout?: () => void;
}

const DashboardSidebar = ({ userName, onLogout }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`hidden md:flex flex-col justify-between bg-gradient-to-b from-primary to-navy-dark text-primary-foreground transition-all duration-300 ${
        collapsed ? "w-20" : "w-[270px]"
      }`}
      style={{ boxShadow: "var(--shadow-sidebar)" }}
    >
      <div>
        <div className="flex items-center justify-between p-5 pb-2">
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-gold" />
              <span className="font-display text-lg font-bold tracking-wide">StudentPro</span>
            </motion.div>
          )}
          {collapsed && <GraduationCap className="mx-auto h-7 w-7 text-gold" />}
        </div>

        <div className="flex justify-end px-3 pb-4">
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-md p-1.5 transition-colors hover:bg-white/10">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="space-y-1.5 px-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => navigate(item.path)}
                className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 border-l-4 border-gold shadow-lg shadow-black/10"
                    : "border-l-4 border-transparent hover:bg-white/8 hover:border-gold/50 hover:translate-x-1"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-gold" : "text-white/70 group-hover:text-gold"
                  }`}
                />
                {!collapsed && <span>{item.title}</span>}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-3 p-4">
        {onLogout && (
          <button
            onClick={onLogout}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        )}
        <div
          className={`flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white font-display text-sm font-bold text-primary animate-pulse-gold">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-xs text-white/50">Student</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;

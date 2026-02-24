import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Menu, X,
  LayoutDashboard, CalendarCheck, Code2, FolderOpen, LogOut,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Daily Tasks", path: "/tasks", icon: CalendarCheck },
  { title: "Practice", path: "/practice", icon: Code2 },
  { title: "Student Storage", path: "/storage", icon: FolderOpen },
];

interface MobileTopbarProps {
  userName: string;
  onLogout?: () => void;
}

const MobileTopbar = ({ userName, onLogout }: MobileTopbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground md:hidden">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-gold" />
          <span className="font-display text-lg font-bold">StudentPro</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-white text-sm font-bold text-primary">
            {userName.charAt(0).toUpperCase()}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-card md:hidden"
          >
            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </button>
                );
              })}
              {onLogout && (
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileTopbar;

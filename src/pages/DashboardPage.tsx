import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Code2,
  FolderOpen,
  BookOpen,
  Sparkles,
  LogOut,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCard from "@/components/DashboardCard";
import MobileTopbar from "@/components/MobileTopbar";
import StatsBar from "@/components/StatsBar";

import { api, getUserId, clearUserId } from "@/services/api";

interface UserData {
  name?: string;
  email?: string;
  tasksCompleted?: number;
  streak?: number;
  hoursToday?: number;
  progress?: number;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = getUserId();

  // ================================
  // 🔥 FETCH DASHBOARD DATA
  // ================================
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get(`/dashboard/user/${userId}`);

        setUser(response.data);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);

        // If backend fails → logout user
        clearUserId();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  // ================================
  // 🔐 LOGOUT
  // ================================
  const handleLogout = () => {
    clearUserId();
    navigate("/login");
  };

  // ================================
  // ⏳ LOADING SCREEN
  // ================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary"
        />
      </div>
    );
  }

  const userName = user?.name || "Student";

  const cards = [
    {
      title: "Daily Tasks",
      description:
        "Track and manage your learning goals daily. Stay consistent and build productive habits.",
      icon: CalendarCheck,
      path: "/tasks",
      buttonText: "Open Tasks",
      stat: String(user?.tasksCompleted ?? 0),
      statLabel: "tasks completed",
    },
    {
      title: "Practice Platforms",
      description:
        "Improve skills through coding & cybersecurity platforms. Challenge yourself daily.",
      icon: Code2,
      path: "/practice",
      buttonText: "Explore Platforms",
      stat: "3",
      statLabel: "platforms connected",
    },
    {
      title: "Student Storage",
      description:
        "Access and manage your stored files, notes, and resources from the cloud.",
      icon: FolderOpen,
      path: "/storage",
      buttonText: "Open Storage",
    },
    {
      title: "Study Resources",
      description:
        "Access curated study materials, notes, and reference guides for your courses.",
      icon: BookOpen,
      path: "/resources",
      buttonText: "Browse Resources",
    },
  ];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar userName={userName} onLogout={handleLogout} />

      <div className="flex flex-1 flex-col">
        <MobileTopbar userName={userName} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  {greeting()}, {userName}
                </h1>

                <motion.div
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <span className="text-2xl">👋</span>
                </motion.div>
              </div>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-secondary" />
                Here's what's happening with your studies today
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>

          {/* Stats Section */}
          <div className="mb-8">
            <StatsBar user={user} />
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
            {cards.map((card, index) => (
              <DashboardCard key={card.title} {...card} index={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
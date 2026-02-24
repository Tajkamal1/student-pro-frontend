import { motion } from "framer-motion";
import { CalendarCheck, Code2, BarChart3, BookOpen, Sparkles } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCard from "@/components/DashboardCard";
import MobileTopbar from "@/components/MobileTopbar";
import StatsBar from "@/components/StatsBar";

const userName = "Student";

const cards = [
  {
    title: "Daily Tasks",
    description: "Track and manage your learning goals daily. Stay consistent and build productive habits.",
    icon: CalendarCheck,
    path: "/tasks",
    buttonText: "Open Tasks",
    stat: "5",
    statLabel: "tasks remaining today",
  },
  {
    title: "Practice Platforms",
    description: "Improve skills through coding & cybersecurity platforms. Challenge yourself daily.",
    icon: Code2,
    path: "/practice",
    buttonText: "Explore Platforms",
    stat: "3",
    statLabel: "platforms connected",
  },
  {
    title: "Attendance Tracker",
    description: "Monitor your class attendance and maintain your academic record effortlessly.",
    icon: BarChart3,
    path: "/attendance",
    buttonText: "View Attendance",
    stat: "92%",
    statLabel: "attendance rate",
  },
  {
    title: "Study Resources",
    description: "Access curated study materials, notes, and reference guides for your courses.",
    icon: BookOpen,
    path: "/resources",
    buttonText: "Browse Resources",
  },
];

const Index = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar userName={userName} />

      <div className="flex flex-1 flex-col">
        <MobileTopbar userName={userName} />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
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
          </motion.div>

          {/* Stats */}
          <div className="mb-8">
            <StatsBar />
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {cards.map((card, index) => (
              <DashboardCard key={card.title} {...card} index={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

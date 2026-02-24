import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileTopbar from "@/components/MobileTopbar";
import { api, getUserId, clearUserId } from "@/services/api";

const defaultPlatforms = [
  { name: "LeetCode", url: "https://leetcode.com", description: "Practice coding problems & algorithms", color: "from-amber-500 to-orange-600" },
  { name: "HackerRank", url: "https://hackerrank.com", description: "Coding challenges & competitions", color: "from-emerald-500 to-green-600" },
  { name: "TryHackMe", url: "https://tryhackme.com", description: "Learn cybersecurity through hands-on labs", color: "from-red-500 to-rose-600" },
  { name: "CodeChef", url: "https://codechef.com", description: "Competitive programming contests", color: "from-blue-500 to-indigo-600" },
  { name: "GitHub", url: "https://github.com", description: "Host and review code, manage projects", color: "from-gray-600 to-gray-800" },
  { name: "Codeforces", url: "https://codeforces.com", description: "Competitive programming platform", color: "from-sky-500 to-blue-600" },
];

const PracticePage = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const [userName, setUserName] = useState("Student");
  const [platforms, setPlatforms] = useState(defaultPlatforms);

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    api.get(`/dashboard/user/${userId}`)
      .then((res) => setUserName(res.data.name || "Student"))
      .catch(() => {});
    // Try to fetch platforms from server
    api.get(`/practice/platforms/${userId}`)
      .then((res) => { if (Array.isArray(res.data) && res.data.length) setPlatforms(res.data); })
      .catch(() => {});
  }, [userId, navigate]);

  const handleLogout = () => { clearUserId(); navigate("/login"); };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar userName={userName} onLogout={handleLogout} />
      <div className="flex flex-1 flex-col">
        <MobileTopbar userName={userName} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="mb-2 flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Practice Platforms</h1>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">Sharpen your skills across multiple platforms</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color || "from-primary to-navy-dark"} text-white`}>
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-display text-lg font-bold text-card-foreground">{p.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{p.description}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Visit Platform
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PracticePage;

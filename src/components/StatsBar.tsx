import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, Flame, Clock } from "lucide-react";

const stats = [
  { label: "Tasks Done", value: "12", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-500" },
  { label: "Hours Today", value: "4.5", icon: Clock, color: "text-blue-500" },
  { label: "Progress", value: "78%", icon: TrendingUp, color: "text-violet-500" },
];

const StatsBar = () => (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: i * 0.08 }}
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-accent ${stat.color}`}>
          <stat.icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-xl font-bold text-card-foreground">
            {stat.value}
          </p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;

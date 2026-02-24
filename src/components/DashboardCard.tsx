import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  buttonText: string;
  index: number;
  stat?: string;
  statLabel?: string;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  path,
  buttonText,
  index,
  stat,
  statLabel,
}: DashboardCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.12, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Decorative gradient accent */}
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

      {/* Icon badge */}
      <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>

      {/* Title with gold accent */}
      <h3 className="relative mb-2 flex items-center gap-2 font-display text-lg font-bold text-card-foreground">
        <span className="h-5 w-1 rounded-full bg-secondary" />
        {title}
      </h3>

      <p className="relative mb-5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Stat */}
      {stat && (
        <div className="relative mb-5 rounded-lg bg-accent px-4 py-3">
          <p className="font-display text-2xl font-bold text-primary">{stat}</p>
          <p className="text-xs text-muted-foreground">{statLabel}</p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => navigate(path)}
        className="relative flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:gap-3 hover:bg-primary/90 hover:shadow-md"
      >
        {buttonText}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
};

export default DashboardCard;

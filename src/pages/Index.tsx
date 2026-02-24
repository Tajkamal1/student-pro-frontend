import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle2, BarChart3, Code2, Sparkles } from "lucide-react";

const features = [
  { icon: CheckCircle2, title: "Task Management", desc: "Organize and track your daily learning goals" },
  { icon: Code2, title: "Practice Hub", desc: "Access top coding & cybersecurity platforms" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Monitor your growth with detailed analytics" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">StudentPro</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mx-auto mb-6 flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-secondary" />
            Built for students, by students
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Your Academic
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Success Hub
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">
            Track tasks, practice coding, manage resources, and stay on top of your academic life — all in one place.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:bg-accent"
            >
              I have an account
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 grid max-w-4xl gap-6 sm:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-base font-bold text-card-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;

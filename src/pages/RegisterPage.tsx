import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api, getUserId, setUserId } from "@/services/api";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  BarChart3,
  Clock,
} from "lucide-react";

const features = [
  { icon: CalendarCheck, text: "Track study hours & maintain streaks" },
  { icon: CheckCircle2, text: "Manage tasks with smart prioritization" },
  { icon: BarChart3, text: "Monitor attendance across all subjects" },
  { icon: Clock, text: "Plan study schedules effectively" },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===========================
  // 🔐 AUTO REDIRECT IF LOGGED IN
  // ===========================
  useEffect(() => {
    const existingUser = getUserId();
    if (existingUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ===========================
  // 📝 REGISTER HANDLER
  // ===========================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // If backend returns token + userId → auto login
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data?.userId) {
        setUserId(response.data.userId);
        navigate("/dashboard"); // Auto login after register
      } else {
        navigate("/login"); // Fallback if backend doesn't auto-login
      }
    }catch (err: any) {
  const detail = err.response?.data?.detail;

  if (Array.isArray(detail)) {
    setError(detail[0]?.msg || "Registration failed");
  } else {
    setError(detail || "Registration failed");
  }
}
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT - BRANDING */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary to-navy-dark p-12 text-primary-foreground lg:flex"
      >
        <div className="max-w-md">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GraduationCap className="mb-8 h-20 w-20 text-gold" />
          </motion.div>

          <h2 className="mb-4 font-display text-4xl font-bold">
            Start Your Journey
          </h2>

          <p className="mb-10 text-lg text-white/70">
            Create your free account and unlock the full potential of your
            academic life.
          </p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <f.icon className="h-5 w-5 text-gold" />
                </div>
                <span className="text-sm text-white/80">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RIGHT - FORM */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2"
      >
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">
              StudentPro
            </span>
          </div>

          <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
            Create Account
          </h2>

          <p className="mb-8 text-muted-foreground">
            Get started with your free account
          </p>

          {error && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAME */}
            <div className="group relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* EMAIL */}
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* PASSWORD */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-primary hover:text-primary/80"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
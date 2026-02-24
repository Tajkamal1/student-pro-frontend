import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { api, setUserId, getUserId } from "@/services/api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  // 🔐 LOGIN HANDLER
  // ===========================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // If backend returns token also store it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUserId(res.data.userId);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* ================= LEFT - FORM ================= */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">
              StudentPro
            </span>
          </div>

          <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
            Welcome back
          </h2>
          <p className="mb-8 text-muted-foreground">
            Sign in to continue your learning journey
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

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </motion.div>

      {/* ================= RIGHT - BRANDING ================= */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary to-navy-dark p-12 text-primary-foreground lg:flex"
      >
        <div className="max-w-md text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GraduationCap className="mx-auto mb-8 h-20 w-20 text-gold" />
          </motion.div>

          <h2 className="mb-4 font-display text-4xl font-bold">
            Track. Plan. Succeed.
          </h2>

          <p className="mb-10 text-lg text-white/70">
            Join thousands of students who use StudentPro to boost productivity,
            maintain learning streaks, and achieve academic excellence.
          </p>

          <div className="flex justify-center gap-8">
            {[
              { icon: Target, label: "Focus" },
              { icon: TrendingUp, label: "Grow" },
              { icon: Sparkles, label: "Excel" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
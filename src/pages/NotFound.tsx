import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { getUserId } from "@/services/api";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Log error
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // If logged in, redirect to dashboard instead of home
  const handleGoBack = () => {
    const userId = getUserId();

    if (userId) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-lg"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>
        </div>

        <h1 className="mb-2 font-display text-4xl font-bold text-foreground">
          404
        </h1>

        <p className="mb-6 text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Check, Trash2, Calendar } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileTopbar from "@/components/MobileTopbar";
import { api, getUserId, clearUserId } from "@/services/api";

interface Task {
  _id?: string;
  id?: string;
  title: string;
  completed: boolean;
  date?: string;
}

const TasksPage = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    fetchData();
  }, [userId, navigate]);

  const fetchData = async () => {
    try {
      const [userRes, tasksRes] = await Promise.all([
        api.get(`/dashboard/user/${userId}`),
        api.get(`/tasks/${userId}`).catch(() => ({ data: [] })),
      ]);
      setUserName(userRes.data.name || "Student");
      setTasks(Array.isArray(tasksRes.data) ? tasksRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await api.post(`/tasks/${userId}`, { title: newTask, completed: false });
      setTasks((prev) => [...prev, res.data]);
      setNewTask("");
    } catch (err) {
      // Fallback: add locally
      setTasks((prev) => [...prev, { title: newTask, completed: false, id: Date.now().toString() }]);
      setNewTask("");
    }
  };

  const toggleTask = async (task: Task) => {
    const id = task._id || task.id;
    try {
      await api.put(`/tasks/${id}`, { completed: !task.completed });
    } catch {}
    setTasks((prev) =>
      prev.map((t) => ((t._id || t.id) === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = async (task: Task) => {
    const id = task._id || task.id;
    try {
      await api.delete(`/tasks/${id}`);
    } catch {}
    setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
  };

  const handleLogout = () => { clearUserId(); navigate("/login"); };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar userName={userName} onLogout={handleLogout} />
      <div className="flex flex-1 flex-col">
        <MobileTopbar userName={userName} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Daily Tasks</h1>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">Manage your daily learning goals</p>
          </motion.div>

          {/* Add task form */}
          <form onSubmit={addTask} className="mb-8 flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              maxLength={200}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add
            </motion.button>
          </form>

          {/* Task list */}
          <div className="space-y-3">
            {tasks.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                No tasks yet. Add your first task above!
              </div>
            )}
            {tasks.map((task, i) => (
              <motion.div
                key={task._id || task.id || i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all ${
                  task.completed ? "opacity-60" : ""
                }`}
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <button
                  onClick={() => toggleTask(task)}
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    task.completed
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {task.completed && <Check className="h-4 w-4" />}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TasksPage;

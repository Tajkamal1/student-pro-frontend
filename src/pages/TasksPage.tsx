import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Check, Trash2, Calendar } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileTopbar from "@/components/MobileTopbar";
import { api, getUserId, clearUserId } from "@/services/api";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const TasksPage = () => {
  const navigate = useNavigate();
  const userId = getUserId();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, [userId, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const [userRes, tasksRes] = await Promise.all([
        api.get(`/dashboard/user/${userId}`),
        api.get(`/tasks/${userId}`)
      ]);

      setUserName(userRes.data.name || "Student");
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await api.post("/tasks", {
        userId,
        title: newTask,
        completed: false
      });

      setTasks((prev) => [res.data, ...prev]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    clearUserId();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar userName={userName} onLogout={handleLogout} />

      <div className="flex flex-1 flex-col">
        <MobileTopbar userName={userName} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold md:text-3xl">
                Daily Tasks
              </h1>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">
              Manage your daily learning goals
            </p>
          </motion.div>

          {/* Add Task */}
          <form onSubmit={addTask} className="mb-8 flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              maxLength={200}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add
            </motion.button>
          </form>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                No tasks yet. Add your first task above!
              </div>
            )}

            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => toggleTask(task)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    task.completed
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {task.completed && <Check className="h-4 w-4" />}
                </button>

                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
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
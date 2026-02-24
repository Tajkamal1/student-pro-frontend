import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, FileText, Download, Search, File } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileTopbar from "@/components/MobileTopbar";
import { api, getUserId, clearUserId } from "@/services/api";

interface StorageItem {
  _id?: string;
  id?: string;
  name: string;
  type?: string;
  size?: string;
  url?: string;
  createdAt?: string;
}

const StoragePage = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const [userName, setUserName] = useState("Student");
  const [files, setFiles] = useState<StorageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    const fetchData = async () => {
      try {
        const [userRes, storageRes] = await Promise.all([
          api.get(`/dashboard/user/${userId}`),
          api.get(`/storage/${userId}`).catch(() => ({ data: [] })),
        ]);
        setUserName(userRes.data.name || "Student");
        setFiles(Array.isArray(storageRes.data) ? storageRes.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, navigate]);

  const handleLogout = () => { clearUserId(); navigate("/login"); };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (type?: string) => {
    if (type?.includes("pdf")) return <FileText className="h-6 w-6 text-red-500" />;
    return <File className="h-6 w-6 text-primary" />;
  };

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
              <FolderOpen className="h-6 w-6 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Student Storage</h1>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">Your files and resources from the cloud</p>
          </motion.div>

          {/* Search */}
          <div className="group relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full max-w-md rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {filteredFiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border bg-card p-12 text-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <FolderOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                {search ? "No files found" : "No files yet"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {search
                  ? "Try a different search term"
                  : "Your stored files and resources will appear here"}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredFiles.map((file, i) => (
                <motion.div
                  key={file._id || file.id || i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-[var(--shadow-card-hover)]"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size || "—"} {file.createdAt ? `· ${new Date(file.createdAt).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                  {file.url && (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StoragePage;

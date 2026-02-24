import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, FileText, Download, Search, File } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileTopbar from "@/components/MobileTopbar";
import { api, getUserId, clearUserId } from "@/services/api";

interface StorageItem {
  _id: string;
  name: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
}

const StoragePage = () => {
  const navigate = useNavigate();
  const userId = getUserId();

  const [userName, setUserName] = useState("Student");
  const [files, setFiles] = useState<StorageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchStorage = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const userRes = await api.get(`/dashboard/user/${userId}`);
        setUserName(userRes.data.name || "Student");

        // Fetch files from database
        const storageRes = await api.get(`/storage/${userId}`);
        setFiles(storageRes.data || []);
      } catch (error) {
        console.error("Error fetching storage:", error);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, [userId, navigate]);

  const handleLogout = () => {
    clearUserId();
    navigate("/login");
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "—";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getFileIcon = (type: string) => {
    if (type?.includes("pdf"))
      return <FileText className="h-6 w-6 text-red-500" />;
    return <File className="h-6 w-6 text-primary" />;
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
              <FolderOpen className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold md:text-3xl">
                Student Storage
              </h1>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">
              Your uploaded files from database
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {filteredFiles.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <FolderOpen className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
              <h3 className="text-lg font-semibold">
                {search ? "No files found" : "No files uploaded yet"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {search
                  ? "Try another search term"
                  : "Upload files to see them here"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file._id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    {getFileIcon(file.fileType)}
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.fileSize)} ·{" "}
                      {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 hover:bg-accent"
                  >
                    <Download className="h-4 w-4" />
                  </a>
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
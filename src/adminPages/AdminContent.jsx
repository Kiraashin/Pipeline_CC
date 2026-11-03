
import { useEffect, useMemo, useState } from "react";
import {
    Search,
    FolderKanban,
    CheckCircle2,
    Clock3,
    Trash2,
    Loader2,
    ClipboardList,
} from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

import { getContents, deleteContent } from "../services/contentService";

const STATUSES = [
    "idea",
    "scripting",
    "recording",
    "editing",
    "ready",
    "published",
];

const getError = (err) =>
    err.response?.data?.message ||
    err.response?.data?.error?.message ||
    err.message ||
    "Terjadi kesalahan.";


const getContentArray = (response) => {
    const rows = response?.data?.data ?? response?.data;

    if (!Array.isArray(rows)) {
        console.log("Response bukan array:", response);
        return [];
    }

    return rows.map((row) => {
        const content = row.content || row;
        const channel = row.channel || content.channel;

        return {
            ...content,
            channel,
            channelId: channel?.id,
            channelName: channel?.name || channel?.handleName || "",
            channelPlatform: channel?.platform || "",
            checklists: row.checklists || content.checklists || [],
        };
    });
};


export default function AdminContent() {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteContentId, setDeleteContentId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    // GET ALL CONTENTS
    const fetchContents = async () => {
        setLoading(true);
        setError("");

        try {
            console.log("1. Mulai fetch contents");

            const response = await getContents();

            console.log("2. Response berhasil:", response);

            const data = getContentArray(response);

            console.log("3. Hasil normalisasi:", data);

            setContents(data);
        } catch (err) {
            console.log("URL:", err.config?.baseURL + err.config?.url);
            console.log("STATUS:", err.response?.status);
            console.log("RESPONSE:", err.response?.data);
            console.error("Fetch contents error:", err);
            console.error("Error response:", err.response?.data);
            console.error("Status:", err.response?.status);

            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, []);

    // SEARCH & FILTER
    const filteredContents = useMemo(() => {
        return contents.filter((item) => {
            const keyword = search.toLowerCase();

            const matchSearch =
                item.title?.toLowerCase().includes(keyword) ||
                item.description?.toLowerCase().includes(keyword) ||
                item.channelName?.toLowerCase().includes(keyword);

            const matchStatus =
                statusFilter === "all" || item.status === statusFilter;

            return matchSearch && matchStatus;
        });
    }, [contents, search, statusFilter]);

    // DELETE CONTENT
    const handleDelete = async (id) => {

        try {
            setDeletingId(id);
            setError("");

            await deleteContent(id);

            setContents((prev) => prev.filter((item) => item.id !== id));
            toast.success("Konten berhasil dihapus");
        } catch (err) {
            console.error("Delete content error:", err);
            toast.error(getError(err));
        } finally {
            setDeletingId(null);
        }
    };

    // SUMMARY
    const summary = [
        {
            label: "Total Konten",
            value: contents.length,
            icon: FolderKanban,
        },
        {
            label: "Total Tugas",
            value: contents.reduce(
                (total, item) => total + (item.checklists?.length || 0),
                0
            ),
            icon: ClipboardList,
        },
        {
            label: "Selesai",
            value: contents.filter((item) => item.status === "published").length,
            icon: CheckCircle2,
        },
        {
            label: "Dalam Proses",
            value: contents.filter((item) =>
                ["scripting", "recording", "editing"].includes(item.status)
            ).length,
            icon: Clock3,
        },
    ];

    return (
        <main className="min-h-full bg-background">
            <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 sm:px-6 lg:px-32">

                {/* HEADER */}
                <section className="flex flex-col justify-between gap-3 pt-8 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold md:text-3xl">
                                Konten
                            </h1>
                            <Badge variant="secondary">{contents.length}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Pantau dan kelola seluruh konten dari semua Creator.
                        </p>
                    </div>
                </section>

                <Dialog
                    open={deleteContentId !== null}
                    onOpenChange={(open) => {
                        if (!open && !isDeleting) setDeleteContentId(null);
                    }}
                >
                    <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                            <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-destructive/10">
                                <Trash2 className="size-5 text-destructive" />
                            </div>

                            <DialogTitle>Hapus Konten?</DialogTitle>

                            <DialogDescription>
                                Apakah kamu yakin ingin menghapus konten ini? Tindakan ini tidak
                                dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="mt-4">
                            <Button
                                variant="outline"
                                disabled={isDeleting}
                                onClick={() => setDeleteContentId(null)}
                            >
                                Batal
                            </Button>

                            <Button
                                variant="destructive"
                                disabled={isDeleting}
                                onClick={async () => {
                                    try {
                                        setIsDeleting(true);
                                        await handleDelete(deleteContentId);
                                        setDeleteContentId(null);
                                    } finally {
                                        setIsDeleting(false);
                                    }
                                }}
                            >
                                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* SUMMARY */}
                <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {summary.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex items-center gap-3 rounded-xl border bg-card p-4"
                        >
                            <div className="rounded-lg bg-muted p-2">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{label}</p>
                                <p className="text-xl font-semibold">{value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CONTENT LIST */}
                <section className="overflow-hidden rounded-xl border bg-card">
                    <div className="space-y-4 p-4">
                        <div>
                            <h2 className="text-sm font-semibold">Semua Konten</h2>
                            <p className="text-xs text-muted-foreground">
                                Daftar konten yang terdaftar di platform.
                            </p>
                        </div>

                        {/* SEARCH & FILTER */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul, deskripsi, atau channel..."
                                    className="pl-9"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-10 rounded-md border bg-background px-3 text-sm sm:w-44"
                            >
                                <option value="all">Semua Status</option>
                                {STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Separator />

                    {/* ERROR */}
                    {error && (
                        <div className="m-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    {/* LOADING */}
                    {loading ? (
                        <div className="flex min-h-60 items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="size-5 animate-spin" />
                            Mengambil data konten...
                        </div>
                    ) : filteredContents.length === 0 ? (
                        <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
                            <FolderKanban className="mb-3 size-8 text-muted-foreground" />
                            <h3 className="text-sm font-medium">
                                {contents.length === 0
                                    ? "Belum ada konten"
                                    : "Konten tidak ditemukan"}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {contents.length === 0
                                    ? "Belum ada konten yang terdaftar."
                                    : "Coba kata kunci atau filter lainnya."}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredContents.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                                >
                                    {/* CONTENT INFO */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="truncate text-sm font-semibold">
                                                {item.title || "Tanpa judul"}
                                            </h3>
                                            <Badge variant="outline">#{item.id}</Badge>
                                            <Badge variant="secondary">
                                                {item.status || "idea"}
                                            </Badge>
                                        </div>

                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                            {item.description || "Tidak ada deskripsi"}
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                            {item.channelName && (
                                                <span>{item.channelName}</span>
                                            )}
                                            {item.channelPlatform && (
                                                <span>• {item.channelPlatform}</span>
                                            )}
                                            {item.formatType && (
                                                <span>• {item.formatType}</span>
                                            )}
                                            {item.priority && (
                                                <span>• Prioritas: {item.priority}</span>
                                            )}
                                            {item.scheduledDate && (
                                                <span>
                                                    • Jadwal:{" "}
                                                    {item.scheduledDate
                                                        ? new Date(item.scheduledDate).toLocaleDateString("id-ID", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "-"}
                                                </span>
                                            )}
                                        </div>

                                        {/* TASKS - READ ONLY */}
                                        {item.checklists?.length > 0 && (
                                            <div className="mt-3 space-y-1">
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    Checklist ({item.checklists.length})
                                                </p>
                                                {item.checklists.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="flex items-center gap-2 text-xs text-muted-foreground"
                                                    >
                                                        <span>
                                                            {task.isCompleted ? "✓" : "○"}
                                                        </span>
                                                        <span
                                                            className={
                                                                task.isCompleted
                                                                    ? "line-through"
                                                                    : ""
                                                            }
                                                        >
                                                            {task.taskName}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* DELETE ONLY */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => setDeleteContentId(item.id)}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border-t px-4 py-3 text-xs text-muted-foreground">
                        {filteredContents.length} dari {contents.length} konten ditampilkan
                    </div>
                </section>
            </div>
        </main>
    );
}

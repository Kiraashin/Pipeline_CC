
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";

const AdminUser = () => {
    const [users, setUsers] = useState([]);

    const [metadata, setMetadata] = useState({
        page: 1,
        pageCount: 1,
        pages: [1],
    });

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // DELETE MODAL
    const [deleteUserTarget, setDeleteUserTarget] = useState(null);

    // FETCH USERS
    const fetchUsers = async (currentPage = page) => {
        try {
            setLoading(true);
            setError("");

            const response = await getUsers(currentPage);
            const result = response?.data;

            setUsers(
                Array.isArray(result?.data)
                    ? result.data
                    : []
            );

            setMetadata(
                result?.metadata || {
                    page: currentPage,
                    pageCount: 1,
                    pages: [1],
                }
            );
        } catch (err) {
            console.error("Fetch users error:", err);
            console.error("Response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                "Gagal mengambil data pengguna."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    // DELETE USER
    const handleDelete = async (user) => {
        try {
            setDeletingId(user.id);
            setError("");
            setSuccess("");

            await deleteUser(user.id);

            setSuccess(
                `Pengguna ${user.name} berhasil dihapus.`
            );

            if (users.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            } else {
                await fetchUsers(page);
            }

            return true;
        } catch (err) {
            console.error("Delete user error:", err);

            setError(
                err.response?.data?.message ||
                "Gagal menghapus pengguna."
            );

            return false;
        } finally {
            setDeletingId(null);
        }
    };

    // FILTER USERS
    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.role} ${user.id}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalUsers = metadata?.totalCount ?? null;

    return (
        <div className="min-h-screen space-y-6 px-4 py-6 sm:px-6 lg:px-32">

            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-indigo-500">
                        MANAGEMENT
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                        User Management
                    </h1>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Kelola seluruh akun creator dan editor.
                    </p>
                </div>

                <button
                    onClick={() => fetchUsers(page)}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-80 disabled:opacity-50"
                >
                    <span>↻</span>
                    Refresh
                </button>
            </section>

            {/* DELETE CONFIRMATION MODAL */}
            <Dialog
                open={deleteUserTarget !== null}
                onOpenChange={(open) => {
                    if (!open && deletingId === null) {
                        setDeleteUserTarget(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                            <Trash2 className="size-6 text-destructive" />
                        </div>

                        <DialogTitle className="text-lg">
                            Hapus Pengguna?
                        </DialogTitle>

                        <DialogDescription className="leading-relaxed">
                            Apakah kamu yakin ingin menghapus akun{" "}
                            <span className="font-semibold text-foreground">
                                {deleteUserTarget?.name}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-4 gap-2">
                        <Button
                            variant="outline"
                            disabled={deletingId !== null}
                            onClick={() => setDeleteUserTarget(null)}
                        >
                            Batal
                        </Button>

                        <Button
                            variant="destructive"
                            disabled={deletingId !== null}
                            onClick={async () => {
                                if (!deleteUserTarget) return;

                                const result = await handleDelete(
                                    deleteUserTarget
                                );

                                if (result) {
                                    setDeleteUserTarget(null);
                                }
                            }}
                        >
                            {deletingId !== null
                                ? "Menghapus..."
                                : "Ya, Hapus"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* NOTIFICATIONS */}
            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
                    {success}
                </div>
            )}

            {/* SUMMARY */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/* TOTAL USERS */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                    <p className="text-sm text-[var(--text-secondary)]">
                        User ditampilkan
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
                        {loading ? "..." : users.length}
                    </h2>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        Pada halaman ini
                    </p>
                </div>

                {/* CREATORS */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Creator
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-indigo-500">
                        {loading
                            ? "..."
                            : users.filter(
                                (user) => user.role === "creator"
                            ).length}
                    </h2>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        Pada halaman ini
                    </p>
                </div>

                {/* EDITORS */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Editor
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-emerald-500">
                        {loading
                            ? "..."
                            : users.filter(
                                (user) => user.role === "editor"
                            ).length}
                    </h2>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        Pada halaman ini
                    </p>
                </div>
            </section>

            {/* USER TABLE */}
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">

                {/* TABLE HEADER */}
                <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-semibold text-[var(--text-primary)]">
                            All Users
                        </h2>

                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            Daftar akun yang terdaftar di platform.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Cari nama, role, atau ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-9 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                                    User
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                                    User ID
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-16 text-center text-sm text-[var(--text-secondary)]"
                                    >
                                        Memuat data pengguna...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-16 text-center"
                                    >
                                        <div className="text-3xl">
                                            ⌕
                                        </div>

                                        <p className="mt-3 font-medium text-[var(--text-primary)]">
                                            {search
                                                ? "Pengguna tidak ditemukan"
                                                : "Belum ada pengguna"}
                                        </p>

                                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                            {search
                                                ? "Coba gunakan kata kunci lain."
                                                : "Data pengguna akan muncul di sini."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-[var(--background)]/50"
                                    >
                                        {/* USER INFO */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 font-bold text-indigo-500">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "U"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-[var(--text-primary)]">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-[var(--text-secondary)]">
                                                        Registered User
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* USER ID */}
                                        <td className="px-5 py-4">
                                            <span className="font-mono text-sm text-[var(--text-secondary)]">
                                                #{user.id}
                                            </span>
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold capitalize ${
                                                    user.role === "creator"
                                                        ? "bg-indigo-500/10 text-indigo-500"
                                                        : "bg-emerald-500/10 text-emerald-500"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-5 py-4 text-right">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="text-destructive"
                                                disabled={deletingId !== null}
                                                onClick={() =>
                                                    setDeleteUserTarget(user)
                                                }
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col justify-between gap-4 border-t border-[var(--border)] p-5 sm:flex-row sm:items-center">
                    <p className="text-xs text-[var(--text-secondary)]">
                        Halaman{" "}
                        <span className="font-semibold text-[var(--text-primary)]">
                            {metadata.page || page}
                        </span>{" "}
                        dari{" "}
                        <span className="font-semibold text-[var(--text-primary)]">
                            {metadata.pageCount || 1}
                        </span>
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* PREVIOUS */}
                        <button
                            onClick={() =>
                                setPage((prev) =>
                                    Math.max(1, prev - 1)
                                )
                            }
                            disabled={page <= 1 || loading}
                            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-primary)] transition hover:bg-[var(--background)] disabled:opacity-30"
                        >
                            ←
                        </button>

                        {/* PAGE NUMBERS */}
                        {(metadata.pages || [1]).map((number) => (
                            <button
                                key={number}
                                onClick={() => setPage(number)}
                                disabled={loading}
                                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                                    page === number
                                        ? "bg-indigo-600 text-white"
                                        : "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--background)]"
                                }`}
                            >
                                {number}
                            </button>
                        ))}

                        {/* NEXT */}
                        <button
                            onClick={() =>
                                setPage((prev) =>
                                    Math.min(
                                        metadata.pageCount || 1,
                                        prev + 1
                                    )
                                )
                            }
                            disabled={
                                page >= (metadata.pageCount || 1) ||
                                loading
                            }
                            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text-primary)] transition hover:bg-[var(--background)] disabled:opacity-30"
                        >
                            →
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminUser;

import { useEffect, useMemo, useState } from "react";
import {
  Search, Plus, SlidersHorizontal, FolderKanban,
  ClipboardList, CheckCircle2, Clock3, Pencil,
  Trash2, Loader2, X,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { getChannelList } from "../services/channelService";

import {
  getContents,
  createContent,
  updateContent,
  updateContentStatus,
  deleteContent,
} from "../services/contentService";

const STATUSES = [
  "idea",
  "scripting",
  "recording",
  "editing",
  "ready",
  "published",
];

const FORMATS = [
  "short_video",
  "long_video",
  "carousel",
  "single_post",
];

const PRIORITIES = ["low", "medium", "high"];

const emptyForm = {
  channelId: "",
  title: "",
  description: "",
  scriptDraft: "",
  formatType: "short_video",
  priority: "medium",
  scheduledDate: "",
};

const getError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error?.message ||
  err.message ||
  "Terjadi kesalahan.";

const getContentArray = (response) => {
  const rows = response?.data?.data;

  if (!Array.isArray(rows)) return [];

  return rows.map((row) => ({
    ...row.content,
    channel: row.channel,
    channelId: row.channel?.id,
    channelName: row.channel?.name,
    channelPlatform: row.channel?.platform,
  }));
};

export default function Content() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [channels, setChannels] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [editingStatus, setEditingStatus] = useState("");

  const fetchChannels = async () => {
    try {
      setLoadingChannels(true);

      const response = await getChannelList();
      const data = response.data?.data;

      setChannels(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoadingChannels(false);
    }
  };

  // GET CONTENTS
  const fetchContents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getContents();
      setContents(getContentArray(response));
    } catch (err) {
      console.error("Fetch contents error:", err.response?.data || err);
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
    fetchChannels();
  }, []);

  // SEARCH & FILTER
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [contents, search, statusFilter]);

  // FORM
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setEditingId(null);
    setEditingStatus("");
    setForm({ ...emptyForm });
    setError("");
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditingStatus(item.status);

    setForm({
      channelId: String(item.channelId || item.channel?.id || ""),
      title: item.title || "",
      description: item.description || "",
      scriptDraft: item.scriptDraft || "",
      formatType: item.formatType || "short_video",
      priority: item.priority || "medium",
      scheduledDate: item.scheduledDate?.slice(0, 10) || "",
    });

    setModalOpen(true);
  };

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        description: form.description,
        formatType: form.formatType,
        priority: form.priority,
        scheduledDate: form.scheduledDate,
      };

      if (editingId) {
        const updatePayload = { ...payload };

        if (editingStatus === "scripting") {
          updatePayload.scriptDraft = form.scriptDraft;
        }

        await updateContent(editingId, updatePayload);
      } else {
        await createContent({
          ...payload,
          channelId: Number(form.channelId),
        });
      }

      setModalOpen(false);
      setForm({ ...emptyForm });
      setEditingId(null);
      await fetchContents();
    } catch (err) {
      console.error("Save content error:", err.response?.data || err);
      setError(getError(err));
    } finally {
      setSaving(false);
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (id, status) => {
    try {
      setError("");

      let payload = { status };

      if (status === "published") {
        const publishedUrl = window.prompt(
          "Masukkan URL konten yang sudah dipublikasikan:"
        );

        if (!publishedUrl) return;

        payload.publishedUrl = publishedUrl.trim();
      }

      await updateContentStatus(id, payload);
      await fetchContents();
    } catch (err) {
      console.error("Update status error:", err.response?.data || err);
      setError(getError(err));
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus konten ini?")) return;

    try {
      setError("");
      await deleteContent(id);
      await fetchContents();
    } catch (err) {
      console.error("Delete content error:", err.response?.data || err);
      setError(getError(err));
    }
  };

  // SUMMARY
  const summary = [
    { label: "Total Konten", value: contents.length, icon: FolderKanban },
    { label: "Total Tugas", value: "—", icon: ClipboardList },
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
      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 sm:px-6 lg:px-30">

        {/* HEADER */}
        <section className="flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">Konten</h1>
              <Badge variant="secondary">{contents.length}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Kelola seluruh konten yang kamu buat.
            </p>
          </div>

          <Button onClick={handleAdd} className="gap-2">
            <Plus className="size-4" />
            Tambahkan konten
          </Button>
        </section>

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
              <h2 className="text-sm font-semibold">Semua konten</h2>
              <p className="text-xs text-muted-foreground">
                Daftar seluruh konten dari backend.
              </p>
            </div>

            {/* SEARCH & FILTER */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari konten..."
                  className="pl-9"
                />
              </div>

              <div className="relative sm:w-44">
                <SlidersHorizontal className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm"
                >
                  <option value="all">Semua status</option>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Separator />

          {/* ERROR */}
          {error && (
            <div className="m-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* LOADING & DATA */}
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
                  ? "Tambahkan konten baru untuk memulai."
                  : "Coba kata kunci atau filter lain."}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredContents.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-3 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_150px_100px] lg:items-center"
                >
                  {/* CONTENT INFO */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold">
                        {item.title || "Tanpa judul"}
                      </h3>
                      <Badge variant="outline">#{item.id}</Badge>
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {item.description || "Tidak ada deskripsi"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {item.channelName && <span>{item.channelName}</span>}
                      {item.channelPlatform && <span>• {item.channelPlatform}</span>}
                      {item.formatType && <span>• {item.formatType}</span>}
                      {item.priority && (
                        <span>• Prioritas: {item.priority}</span>
                      )}
                      {item.scheduledDate && (
                        <span>
                          • Jadwal:{" "}
                          {new Date(
                            `${item.scheduledDate.slice(0, 10)}T00:00:00`
                          ).toLocaleDateString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STATUS */}
                  <select
                    value={item.status || "idea"}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                    className="h-9 rounded-md border bg-background px-2 text-xs"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t px-4 py-3 text-xs text-muted-foreground">
            {filteredContents.length} konten ditampilkan
          </div>
        </section>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border bg-card shadow-xl">

            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="font-semibold">
                  {editingId ? "Edit Konten" : "Tambah Konten"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Lengkapi informasi konten.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                <X className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">

              {/* CHANNEL */}
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Channel *
                </label>

                <select
                  name="channelId"
                  value={form.channelId}
                  onChange={handleChange}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  required
                  disabled={loadingChannels || !!editingId}
                >
                  <option value="">
                    {loadingChannels ? "Memuat channel..." : "Pilih channel"}
                  </option>

                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.handleName} ({channel.platform})
                    </option>
                  ))}
                </select>
              </div>

              {/* TITLE */}
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Judul Konten *
                </label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul konten"
                  maxLength={255}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Deskripsi konten..."
                  className="min-h-20 w-full rounded-md border bg-background p-3 text-sm"
                />
              </div>

              {/* SCRIPT DRAFT */}
              {editingId && editingStatus === "scripting" && (
                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Script Draft
                  </label>

                  <textarea
                    name="scriptDraft"
                    value={form.scriptDraft}
                    onChange={handleChange}
                    placeholder="Tulis draft script..."
                    className="min-h-20 w-full rounded-md border bg-background p-3 text-sm"
                  />
                </div>
              )}

              {/* FORMAT & PRIORITY */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Format Konten *
                  </label>
                  <select
                    name="formatType"
                    value={form.formatType}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                    required
                  >
                    {FORMATS.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Prioritas *
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                    required
                  >
                    {PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SCHEDULED DATE */}
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Jadwal Publikasi *
                </label>
                <Input
                  type="date"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                >
                  Batal
                </Button>

                <Button type="submit" disabled={saving}>
                  {saving && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  {editingId ? "Simpan Perubahan" : "Tambah Konten"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

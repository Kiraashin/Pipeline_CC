import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  ArrowUpDown,
  Circle,
  CheckCircle2,
  Clock3,
  AlertCircle,
  CalendarDays,
  X,
  ListTodo,
  Trash2,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  FolderKanban,
  ClipboardList,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const initialContents = [
  {
    id: "CNT-101",
    title: "Instagram Reels Campaign",
    description: "Konten promosi produk untuk Instagram Reels.",
    tasks: [
      {
        id: "TSK-101",
        title: "Buat konsep konten",
        status: "Done",
        priority: "High",
        dueDate: "Oct 30",
      },
      {
        id: "TSK-102",
        title: "Edit video promosi",
        status: "In Progress",
        priority: "Urgent",
        dueDate: "Oct 31",
      },
      {
        id: "TSK-103",
        title: "Tulis caption dan hashtag",
        status: "Todo",
        priority: "Medium",
        dueDate: "Nov 02",
      },
    ],
  },
  {
    id: "CNT-102",
    title: "Instagram Reels Campaign",
    description: "Konten promosi produk untuk Instagram Reels.",
    tasks: [
      {
        id: "TSK-101",
        title: "Buat konsep konten",
        status: "Done",
        priority: "High",
        dueDate: "Oct 30",
      },
      {
        id: "TSK-102",
        title: "Edit video promosi",
        status: "In Progress",
        priority: "Urgent",
        dueDate: "Oct 31",
      },
      {
        id: "TSK-103",
        title: "Tulis caption dan hashtag",
        status: "Todo",
        priority: "Medium",
        dueDate: "Nov 02",
      },
    ],
  },
  {
    id: "CNT-101",
    title: "Instagram Reels Campaign",
    description: "Konten promosi produk untuk Instagram Reels.",
    tasks: [
      {
        id: "TSK-101",
        title: "Buat konsep konten",
        status: "Done",
        priority: "High",
        dueDate: "Oct 30",
      },
      {
        id: "TSK-102",
        title: "Edit video promosi",
        status: "In Progress",
        priority: "Urgent",
        dueDate: "Oct 31",
      },
      {
        id: "TSK-103",
        title: "Tulis caption dan hashtag",
        status: "Todo",
        priority: "Medium",
        dueDate: "Nov 02",
      },
    ],
  },
];

const statusConfig = {
  Todo: {
    label: "To do",
    icon: Circle,
    className: "text-muted-foreground",
  },
  "In Progress": {
    label: "In progress",
    icon: Clock3,
    className: "text-blue-600 dark:text-blue-400",
  },
  Done: {
    label: "Selesai",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400",
  },
};

const priorityConfig = {
  Urgent: { icon: AlertCircle, className: "text-red-500" },
  High: { icon: ArrowUpDown, className: "text-orange-500" },
  Medium: { icon: ArrowUpDown, className: "text-amber-500" },
  Low: { icon: ArrowUpDown, className: "text-muted-foreground" },
};

const statusOptions = ["Todo", "In Progress", "Done"];
const priorityOptions = ["Urgent", "High", "Medium", "Low"];

const emptyContentForm = {
  title: "",
  description: "",
};

const emptyTaskForm = {
  title: "",
  priority: "Medium",
  dueDate: "",
};

function getContentProgress(content) {
  const total = content.tasks.length;

  if (!total) return 0;

  const completed = content.tasks.filter(
    (task) => task.status === "Done",
  ).length;

  return Math.round((completed / total) * 100);
}

function getContentStatus(content) {
  const tasks = content.tasks;

  if (!tasks.length) return "Todo";
  if (tasks.every((task) => task.status === "Done")) return "Done";
  if (tasks.some((task) => task.status === "In Progress")) {
    return "In Progress";
  }

  return "Todo";
}

function formatDate(date) {
  if (!date) return "No date";

  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export default function Channel() {
  const [contents, setContents] = useState(initialContents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [contentFilter, setContentFilter] = useState("all");

  const [selectedContents, setSelectedContents] = useState([]);
  const [expandedContents, setExpandedContents] = useState([0]);

  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  
  // Menyimpan indeks spesifik dari item konten yang sedang aktif
  const [activeContentIndex, setActiveContentIndex] = useState(null);

  const [contentForm, setContentForm] = useState(emptyContentForm);
  const [taskForm, setTaskForm] = useState(emptyTaskForm);

  const totalTasks = contents.reduce(
    (total, content) => total + content.tasks.length,
    0,
  );

  const allTasks = contents.flatMap((content) => content.tasks);

  const contentOptions = useMemo(() => {
    return [...new Set(contents.map((c) => c.id))];
  }, [contents]);

  const stats = useMemo(
    () => [
      {
        label: "Jumlah Konten",
        value: contents.length,
        icon: FolderKanban,
      },
      {
        label: "Total Tugas",
        value: allTasks.length,
        icon: ListTodo,
      },
      {
        label: "Dalam Proses",
        value: allTasks.filter((task) => task.status === "In Progress")
          .length,
        icon: Clock3,
      },
      {
        label: "Selesai",
        value: allTasks.filter((task) => task.status === "Done").length,
        icon: CheckCircle2,
      },
    ],
    [contents, allTasks.length],
  );

  const filteredContents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return contents.filter((content) => {
      const matchesContent =
        contentFilter === "all" || content.id === contentFilter;

      const matchesSearch =
        !keyword ||
        content.title.toLowerCase().includes(keyword) ||
        content.description.toLowerCase().includes(keyword) ||
        content.id.toLowerCase().includes(keyword) ||
        content.tasks.some((task) =>
          task.title.toLowerCase().includes(keyword),
        );

      const matchingTasks = content.tasks.filter((task) => {
        return statusFilter === "all" || task.status === statusFilter;
      });

      const matchesStatusFilter =
        statusFilter === "all" ? true : matchingTasks.length > 0;

      return matchesContent && matchesSearch && matchesStatusFilter;
    });
  }, [contents, search, statusFilter, contentFilter]);

  function getNextId(prefix, items) {
    const maxNumber = Math.max(
      100,
      ...items.map(
        (item) => Number(item.id.replace(`${prefix}-`, "")) || 0,
      ),
    );

    return `${prefix}-${maxNumber + 1}`;
  }

  function createContent(event) {
    event.preventDefault();

    const title = contentForm.title.trim();
    if (!title) return;

    const newContent = {
      id: getNextId("CNT", contents),
      title,
      description: contentForm.description.trim(),
      tasks: [],
    };

    setContents((current) => [newContent, ...current]);
    setExpandedContents([0]);
    setSearch("");
    setStatusFilter("all");
    setContentFilter("all");
    setContentForm(emptyContentForm);
    setOpenContentDialog(false);
  }

  // Menerima parameter index spesifik dari konten
  function openCreateTask(contentIndex) {
    setActiveContentIndex(contentIndex);
    setTaskForm(emptyTaskForm);
    setOpenTaskDialog(true);
  }

  function createTask(event) {
    event.preventDefault();

    const title = taskForm.title.trim();
    if (!title || activeContentIndex === null) return;

    const newTask = {
      id: getNextId("TSK", allTasks),
      title,
      status: "Todo",
      priority: taskForm.priority,
      dueDate: taskForm.dueDate
        ? formatDate(taskForm.dueDate)
        : "No date",
    };

    // Menambahkan tugas hanya ke indeks spesifik
    setContents((current) =>
      current.map((content, idx) =>
        idx === activeContentIndex
          ? { ...content, tasks: [...content.tasks, newTask] }
          : content,
      ),
    );

    setSearch("");
    setStatusFilter("all");
    setContentFilter("all");
    setTaskForm(emptyTaskForm);
    setOpenTaskDialog(false);
    setActiveContentIndex(null);
  }

  function updateTask(contentIndex, taskId, changes) {
    setContents((current) =>
      current.map((content, idx) =>
        idx === contentIndex
          ? {
              ...content,
              tasks: content.tasks.map((task) =>
                task.id === taskId ? { ...task, ...changes } : task,
              ),
            }
          : content,
      ),
    );
  }

  function deleteTask(contentIndex, taskId) {
    setContents((current) =>
      current.map((content, idx) =>
        idx === contentIndex
          ? {
              ...content,
              tasks: content.tasks.filter((task) => task.id !== taskId),
            }
          : content,
      ),
    );
  }

  function deleteContent(contentIndex) {
    setContents((current) =>
      current.filter((_, idx) => idx !== contentIndex),
    );
  }

  function deleteSelectedContents() {
    setContents((current) =>
      current.filter(
        (content) => !selectedContents.includes(content.id),
      ),
    );

    setSelectedContents([]);
  }

  function toggleContentSelection(contentId, checked) {
    setSelectedContents((current) =>
      checked
        ? current.includes(contentId)
          ? current
          : [...current, contentId]
        : current.filter((id) => id !== contentId),
    );
  }

  function toggleAllSelection(checked) {
    setSelectedContents((current) => {
      if (checked) {
        return [
          ...new Set([
            ...current,
            ...filteredContents.map((content) => content.id),
          ]),
        ];
      }

      return current.filter(
        (id) => !filteredContents.some((content) => content.id === id),
      );
    });
  }

  function toggleExpanded(index) {
    setExpandedContents((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setContentFilter("all");
  }

  const allFilteredSelected =
    filteredContents.length > 0 &&
    filteredContents.every((content) =>
      selectedContents.includes(content.id),
    );

  const activeContent =
    activeContentIndex !== null ? contents[activeContentIndex] : null;

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Konten
              </h1>

              <Badge
                variant="secondary"
                className="rounded-md font-medium tabular-nums"
              >
                {contents.length}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Kelola konten dan tugas yang harus diselesaikan di setiap konten.
            </p>
          </div>

          <Dialog
            open={openContentDialog}
            onOpenChange={setOpenContentDialog}
          >
            <DialogTrigger
              render={
                <Button
                  className="h-9 shrink-0 gap-2 rounded-lg px-3.5"
                  onClick={() => setContentForm(emptyContentForm)}
                >
                  <Plus className="size-4" />
                  Tambahkan konten
                </Button>
              }
            />

            <DialogContent className="rounded-xl sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah konten</DialogTitle>
                <DialogDescription>
                  Buat konten baru, lalu tambahkan tugas yang perlu diselesaikan.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={createContent} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="content-title">Nama konten</Label>
                  <Input
                    id="content-title"
                    autoFocus
                    value={contentForm.title}
                    onChange={(event) =>
                      setContentForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Contoh: Instagram Reels Campaign"
                    className="h-10 rounded-lg"
                    maxLength={120}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-description">
                    Deskripsi
                    <span className="ml-1 font-normal text-muted-foreground">
                      (opsional)
                    </span>
                  </Label>

                  <textarea
                    id="content-description"
                    value={contentForm.description}
                    onChange={(event) =>
                      setContentForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Jelaskan tujuan konten ini..."
                    rows={3}
                    maxLength={1000}
                    className="flex w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <DialogFooter className="gap-2 pt-1">
                  <DialogClose
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-lg"
                      >
                        Batal
                      </Button>
                    }
                  />
                  <Button type="submit" className="rounded-lg">
                    <Plus className="mr-1 size-4" />
                    Buat konten
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                  <StatIcon className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-xl font-semibold tabular-nums">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold">Semua konten</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {filteredContents.length} dari {contents.length} konten
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  className="h-9 gap-2 rounded-lg"
                  onClick={resetFilters}
                >
                  <RotateCcw className="size-3.5" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari konten atau tugas..."
                  className="h-9 rounded-lg pl-9 pr-9"
                />

                {search && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 size-7 -translate-y-1/2 rounded-md"
                    onClick={() => setSearch("")}
                    aria-label="Hapus pencarian"
                  >
                    <X className="size-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex">
                <Select
                  value={contentFilter}
                  onValueChange={setContentFilter}
                >
                  <SelectTrigger className="h-9 w-full rounded-lg sm:w-44">
                    <FolderKanban className="mr-1.5 size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Pilih ID Konten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua ID</SelectItem>
                    {contentOptions.map((id) => (
                      <SelectItem key={id} value={id}>
                        {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="h-9 w-full rounded-lg sm:w-36">
                    <SlidersHorizontal className="mr-1 size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Semua status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusConfig[status].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bulk actions */}
          {selectedContents.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  {selectedContents.length}
                </strong>{" "}
                konten dipilih
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg"
                  onClick={() => setSelectedContents([])}
                >
                  Batal
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 gap-1.5 rounded-lg"
                  onClick={deleteSelectedContents}
                >
                  <Trash2 className="size-3.5" />
                  Hapus pilihan
                </Button>
              </div>
            </div>
          )}

          {/* List header */}
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_100px_36px] items-center gap-3 border-b bg-muted/20 px-5 py-2.5 text-xs font-medium text-muted-foreground lg:grid">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={allFilteredSelected}
                onCheckedChange={toggleAllSelection}
                aria-label="Pilih semua konten"
              />
              <span>Konten dan tugas</span>
            </div>
            <span>Status</span>
            <span>Progress</span>
            <span />
          </div>

          {/* Content rows */}
          {filteredContents.length > 0 ? (
            <div>
              {filteredContents.map((content, index) => {
                const isExpanded = expandedContents.includes(index);
                const isSelected = selectedContents.includes(content.id);
                const progress = getContentProgress(content);
                const contentStatus = getContentStatus(content);
                const ContentStatusIcon = statusConfig[contentStatus].icon;

                const matchingTasks = content.tasks.filter((task) => {
                  const matchesSearch =
                    !search.trim() ||
                    task.title.toLowerCase().includes(search.trim().toLowerCase());

                  const matchesStatus =
                    statusFilter === "all" || task.status === statusFilter;

                  return matchesSearch && matchesStatus;
                });

                const visibleTasks =
                  statusFilter === "all"
                    ? content.tasks
                    : matchingTasks;

                return (
                  <article
                    key={`${content.id}-${index}`}
                    className={`border-b last:border-b-0 ${
                      isSelected ? "bg-muted/20" : ""
                    }`}
                  >
                    {/* Content item */}
                    <div className="group grid gap-3 px-4 py-4 transition-colors hover:bg-muted/20 sm:px-5 lg:grid-cols-[minmax(0,1fr)_120px_100px_36px] lg:items-center">
                      <div className="flex min-w-0 items-start gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            toggleContentSelection(content.id, checked)
                          }
                          className="mt-1"
                          aria-label={`Pilih ${content.title}`}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-0.5 size-7 shrink-0 rounded-md text-muted-foreground"
                          onClick={() => toggleExpanded(index)}
                          aria-label={
                            isExpanded ? "Tutup daftar tugas" : "Buka daftar tugas"
                          }
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-4" />
                          ) : (
                            <ChevronRight className="size-4" />
                          )}
                        </Button>

                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                          <FolderKanban className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-xs text-muted-foreground">
                              {content.id}
                            </span>
                            <span className="break-words text-sm font-medium">
                              {content.title}
                            </span>
                          </div>

                          {content.description && (
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                              {content.description}
                            </p>
                          )}

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <ClipboardList className="size-3.5" />
                              {content.tasks.length} tugas
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <CheckCircle2 className="size-3.5" />
                              {content.tasks.filter(
                                (task) => task.status === "Done",
                              ).length}{" "}
                              selesai
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden lg:block">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs ${statusConfig[contentStatus].className}`}
                        >
                          <ContentStatusIcon className="size-3.5" />
                          {statusConfig[contentStatus].label}
                        </span>
                      </div>

                      <div className="hidden lg:block">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-md text-muted-foreground opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
                                aria-label={`Aksi untuk ${content.title}`}
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onClick={() => openCreateTask(index)}
                            >
                              <Plus className="mr-2 size-3.5" />
                              Tambah tugas
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => toggleExpanded(index)}
                            >
                              {isExpanded ? "Tutup daftar tugas" : "Lihat tugas"}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => deleteContent(index)}
                            >
                              <Trash2 className="mr-2 size-3.5" />
                              Hapus konten
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Mobile progress */}
                      <div className="ml-[5.25rem] flex items-center gap-2 lg:hidden">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs ${statusConfig[contentStatus].className}`}
                        >
                          <ContentStatusIcon className="size-3.5" />
                          {statusConfig[contentStatus].label}
                        </span>

                        <span className="text-xs text-muted-foreground">·</span>

                        <span className="text-xs text-muted-foreground">
                          {progress}% selesai
                        </span>
                      </div>
                    </div>

                    {/* Nested tasks */}
                    {isExpanded && (
                      <div className="border-t bg-muted/10">
                        <div className="flex flex-col justify-between gap-2 px-4 py-3 pl-6 sm:flex-row sm:items-center sm:pl-[5.25rem]">
                          <span className="text-xs font-medium text-muted-foreground">
                            Daftar tugas
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-fit gap-1.5 rounded-lg"
                            onClick={() => openCreateTask(index)}
                          >
                            <Plus className="size-3.5" />
                            Tambah tugas
                          </Button>
                        </div>

                        {visibleTasks.length > 0 ? (
                          <div className="pb-2">
                            {visibleTasks.map((task) => {
                              const status = statusConfig[task.status];
                              const priority = priorityConfig[task.priority];
                              const TaskStatusIcon = status.icon;
                              const TaskPriorityIcon = priority.icon;

                              return (
                                <div
                                  key={task.id}
                                  className="group/task flex flex-col gap-3 px-4 py-3 pl-6 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:pl-[5.25rem]"
                                >
                                  <div className="flex min-w-0 flex-1 items-start gap-3">
                                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
                                      <TaskStatusIcon
                                        className={`size-4 ${status.className}`}
                                      />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="break-words text-sm">
                                        {task.title}
                                      </p>

                                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <span>{task.id}</span>

                                        <span
                                          className={`inline-flex items-center gap-1 ${priority.className}`}
                                        >
                                          <TaskPriorityIcon className="size-3.5" />
                                          {task.priority}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                          <CalendarDays className="size-3.5" />
                                          {task.dueDate}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 pl-8 sm:pl-0">
                                    <Select
                                      value={task.status}
                                      onValueChange={(value) =>
                                        updateTask(index, task.id, {
                                          status: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger className="h-8 w-32 rounded-md border-transparent bg-transparent px-2 text-xs shadow-none hover:border-border hover:bg-muted/50">
                                        <SelectValue />
                                      </SelectTrigger>

                                      <SelectContent>
                                        {statusOptions.map((option) => (
                                          <SelectItem
                                            key={option}
                                            value={option}
                                          >
                                            {statusConfig[option].label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>

                                    <Select
                                      value={task.priority}
                                      onValueChange={(value) =>
                                        updateTask(index, task.id, {
                                          priority: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger className="h-8 w-28 rounded-md border-transparent bg-transparent px-2 text-xs shadow-none hover:border-border hover:bg-muted/50">
                                        <SelectValue />
                                      </SelectTrigger>

                                      <SelectContent>
                                        {priorityOptions.map((option) => (
                                          <SelectItem
                                            key={option}
                                            value={option}
                                          >
                                            {option}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger
                                        render={
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 shrink-0 rounded-md text-muted-foreground"
                                            aria-label={`Aksi untuk ${task.title}`}
                                          >
                                            <MoreHorizontal className="size-4" />
                                          </Button>
                                        }
                                      />

                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() =>
                                            deleteTask(index, task.id)
                                          }
                                          className="text-destructive focus:text-destructive"
                                        >
                                          <Trash2 className="mr-2 size-3.5" />
                                          Hapus tugas
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="px-6 py-8 text-center sm:pl-[5.25rem]">
                            <p className="text-sm text-muted-foreground">
                              Belum ada tugas yang cocok.
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              className="mt-1 h-auto"
                              onClick={() => openCreateTask(index)}
                            >
                              Tambahkan tugas
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl border bg-muted/30">
                <FolderKanban className="size-5 text-muted-foreground" />
              </div>

              <h3 className="text-sm font-medium">Konten tidak ditemukan</h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                Coba ubah pencarian atau filter, atau tambahkan konten baru.
              </p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 h-8 rounded-lg"
                onClick={resetFilters}
              >
                <RotateCcw className="mr-1.5 size-3.5" />
                Reset filter
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col gap-1.5 border-t bg-muted/10 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>
              {filteredContents.length} konten · {totalTasks} tugas
            </span>

            <span>
              {selectedContents.length > 0
                ? `${selectedContents.length} konten dipilih`
                : "Perubahan tersimpan di state halaman"}
            </span>
          </div>
        </section>
      </div>

      <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
        <DialogContent className="rounded-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah tugas</DialogTitle>
            <DialogDescription>
              {activeContent
                ? `Tambahkan tugas ke "${activeContent.title}".`
                : "Tambahkan tugas baru ke konten."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={createTask} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="task-title">Nama tugas</Label>
              <Input
                id="task-title"
                autoFocus
                value={taskForm.title}
                onChange={(event) =>
                  setTaskForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Contoh: Buat desain thumbnail"
                className="h-10 rounded-lg"
                maxLength={120}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Prioritas</Label>
              <Select
                value={taskForm.priority}
                onValueChange={(value) =>
                  setTaskForm((current) => ({
                    ...current,
                    priority: value,
                  }))
                }
              >
                <SelectTrigger id="task-priority" className="h-10 rounded-lg">
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-due-date">
                Tenggat waktu
                <span className="ml-1 font-normal text-muted-foreground">
                  (opsional)
                </span>
              </Label>
              <Input
                id="task-due-date"
                type="date"
                value={taskForm.dueDate}
                onChange={(event) =>
                  setTaskForm((current) => ({
                    ...current,
                    dueDate: event.target.value,
                  }))
                }
                className="h-10 rounded-lg"
              />
            </div>

            <DialogFooter className="gap-2 pt-1">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                  >
                    Batal
                  </Button>
                }
              />
              <Button type="submit" className="rounded-lg">
                <Plus className="mr-1 size-4" />
                Tambah tugas
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
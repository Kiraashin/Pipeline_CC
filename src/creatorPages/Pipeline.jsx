import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  closestCorners,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  CalendarDays,
  MessageSquare,
  Paperclip,
  Circle,
  CheckCircle2,
  Clock3,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const initialColumns = [
  {
    id: "ide",
    title: "Ide",
    color: "bg-slate-500",
    tasks: [
      {
        id: 1,
        title: "Research competitor products",
        description: "Analyze features and pricing from competitors.",
        priority: "Low",
        date: "Oct 29",
        tag: "Research",
        tagColor: "bg-blue-500/10",
        comments: 3,
        attachments: 2,
        assignee: ["KA", "JD"],
      },
      {
        id: 2,
        title: "Define project requirements",
        description: "Document the initial product specifications.",
        priority: "Medium",
        date: "Oct 30",
        tag: "Planning",
        tagColor: "bg-blue-500/10 text-blue-400",
        comments: 5,
        attachments: 1,
        assignee: ["AR"],
      },
    ],
  },
  {
    id: "penulisan",
    title: "Penulisan",
    color: "bg-blue-500",
    tasks: [
      {
        id: 3,
        title: "Design landing page",
        description: "Create a modern and responsive landing page.",
        priority: "High",
        date: "Oct 28",
        tag: "Design",
        tagColor: "bg-pink-500/10 text-pink-400",
        comments: 8,
        attachments: 3,
        assignee: ["KA", "ML"],
      },
      {
        id: 4,
        title: "Setup authentication",
        description: "Implement login and registration functionality.",
        priority: "High",
        date: "Oct 31",
        tag: "Development",
        tagColor: "bg-emerald-500/10 text-emerald-400",
        comments: 4,
        attachments: 0,
        assignee: ["JD"],
      },
    ],
  },
  {
    id: "rekaman",
    title: "Rekaman",
    color: "bg-red-500",
    tasks: [
      {
        id: 5,
        title: "Build dashboard interface",
        description: "Develop the main dashboard and analytics cards.",
        priority: "High",
        date: "Oct 27",
        tag: "Development",
        tagColor: "bg-emerald-500/10 text-emerald-400",
        comments: 12,
        attachments: 4,
        assignee: ["KA", "AR"],
      },
      {
        id: 6,
        title: "API integration",
        description: "Connect frontend components to backend endpoints.",
        priority: "Medium",
        date: "Oct 29",
        tag: "Backend",
        tagColor: "bg-orange-500/10 text-orange-400",
        comments: 6,
        attachments: 2,
        assignee: ["ML"],
      },
    ],
  },
  {
    id: "penyuntingan",
    title: "Penyuntingan",
    color: "bg-yellow-500",
    tasks: [
      {
        id: 7,
        title: "Review user management",
        description: "Check CRUD functionality and error handling.",
        priority: "Medium",
        date: "Oct 27",
        tag: "Testing",
        tagColor: "bg-cyan-500/10 text-cyan-400",
        comments: 7,
        attachments: 1,
        assignee: ["JD", "KA"],
      },
    ],
  },
  {
    id: "selesai",
    title: "Selesai",
    color: "bg-green-500",
    tasks: [
      {
        id: 8,
        title: "Initialize project repository",
        description: "Setup repository and initial project structure.",
        priority: "Low",
        date: "Oct 24",
        tag: "Setup",
        tagColor: "bg-slate-500/10 text-slate-400",
        comments: 2,
        attachments: 1,
        assignee: ["KA"],
      },
    ],
  },
];

const priorityStyles = {
  High: "text-rose-400 bg-rose-500/10",
  Medium: "text-amber-400 bg-amber-500/10",
  Low: "text-sky-400 bg-sky-500/10",
};

const avatarColors = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-emerald-500",
];

function AvatarGroup({ members }) {
  return (
    <div className="flex items-center -space-x-2">
      {members.map((member, index) => (
        <div
          key={member}
          title={member}
          className={`flex size-7 items-center justify-center rounded-full border-2 border-card text-[9px] font-bold text-white ${
            avatarColors[index % avatarColors.length]
          }`}
        >
          {member}
        </div>
      ))}
    </div>
  );
}

function TaskCard({ task, onMove, onMoveLeft }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(task.id),
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: "grab",
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${task.tagColor}`}
        >
          {task.tag}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground opacity-60 hover:opacity-100"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMoveLeft(task);
            }}
            title="Move task to previous stage"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground opacity-60 hover:opacity-100"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMove(task);
            }}
            title="Move task to next stage"
          >
            <HugeiconsIcon icon={ArrowRight02Icon} />
          </Button>
        </div>
      </div>

      <h3 className="text-sm font-semibold leading-5 tracking-tight">
        {task.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
        {task.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium ${priorityStyles[task.priority]}`}
        >
          <CircleDot className="size-3" />
          {task.priority}
        </span>

        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
          <CalendarDays className="size-3" />
          {task.date}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <AvatarGroup members={task.assignee} />

        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-[10px]">
            <MessageSquare className="size-3.5" />
            {task.comments}
          </span>

          <span className="flex items-center gap-1 text-[10px]">
            <Paperclip className="size-3.5" />
            {task.attachments}
          </span>
        </div>
      </div>
    </article>
  );
}

function DroppableColumn({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-40 space-y-3 rounded-xl transition-colors ${
        isOver ? "bg-primary/10 ring-2 ring-primary/30" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function Pipeline() {
  const [columns, setColumns] = useState(initialColumns);
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("board");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [activeColumn, setActiveColumn] = useState("todo");
  function handleDragEnd({ active, over }) {
    if (!over) return;

    const taskId = Number(active.id);
    const targetId = String(over.id);

    setColumns((previous) => {
      const sourceIndex = previous.findIndex((column) =>
        column.tasks.some((task) => task.id === taskId),
      );

      const targetIndex = previous.findIndex(
        (column) => column.id === targetId,
      );

      if (sourceIndex === -1 || targetIndex === -1) {
        return previous;
      }

      if (sourceIndex === targetIndex) return previous;

      const updated = previous.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      const taskIndex = updated[sourceIndex].tasks.findIndex(
        (task) => task.id === taskId,
      );

      const [task] = updated[sourceIndex].tasks.splice(taskIndex, 1);
      updated[targetIndex].tasks.push(task);

      return updated;
    });
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    tag: "Development",
  });

  const allTasks = columns.flatMap((column) => column.tasks);
  const completedTasks = columns.find((column) => column.id === "selesai").tasks
    .length;

  const totalTasks = allTasks.length;
  const completion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      const matchesSearch = `${task.title} ${task.description} ${task.tag}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        filterPriority === "All" || task.priority === filterPriority;

      return matchesSearch && matchesPriority;
    }),
  }));

  function moveTask(task) {
  setColumns((previous) => {
    const currentIndex = previous.findIndex((column) =>
      column.tasks.some((item) => item.id === task.id),
    );

    if (currentIndex === -1) return previous;

    // Kalau sudah di kolom paling kanan, hapus task
    if (currentIndex === previous.length - 1) {
      const updated = previous.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      updated[currentIndex].tasks = updated[currentIndex].tasks.filter(
        (item) => item.id !== task.id,
      );

      console.log("Task dihapus:", task);

      return updated;
    }

    // Kalau belum paling kanan, pindahkan ke kolom berikutnya
    const updated = previous.map((column) => ({
      ...column,
      tasks: [...column.tasks],
    }));

    const taskIndex = updated[currentIndex].tasks.findIndex(
      (item) => item.id === task.id,
    );

    const [selected] = updated[currentIndex].tasks.splice(taskIndex, 1);

    updated[currentIndex + 1].tasks.push(selected);

    return updated;
  });
}

  function moveTaskLeft(task) {
    setColumns((previous) => {
      const currentIndex = previous.findIndex((column) =>
        column.tasks.some((item) => item.id === task.id),
      );

      // Task sudah berada di kolom paling kiri
      if (currentIndex <= 0) return previous;

      const updated = previous.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      const sourceTasks = updated[currentIndex].tasks;
      const taskIndex = sourceTasks.findIndex((item) => item.id === task.id);

      if (taskIndex === -1) return previous;

      const [selected] = sourceTasks.splice(taskIndex, 1);

      // Pindahkan ke kolom sebelumnya
      updated[currentIndex - 1].tasks.push(selected);

      return updated;
    });
  }

  function addTask(event) {
    event.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      id: Date.now(),
      description: newTask.description || "No description provided.",
      date: "Nov 02",
      tagColor:
        newTask.tag === "Design"
          ? "bg-pink-500/10 text-pink-400"
          : newTask.tag === "Research"
            ? "bg-violet-500/10 text-violet-400"
            : "bg-emerald-500/10 text-emerald-400",
      comments: 0,
      attachments: 0,
      assignee: ["KA"],
    };

    setColumns((previous) =>
      previous.map((column) =>
        column.id === activeColumn
          ? { ...column, tasks: [...column.tasks, task] }
          : column,
      ),
    );

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      tag: "Development",
    });

    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-screen-2xl space-y-8 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LayoutGrid className="size-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Project Pipeline
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your workflow and keep everything moving.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="size-4" />
            Create task
          </Button>
        </header>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total tasks</span>
              <Circle className="size-4 text-primary" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold">{totalTasks}</span>
              <span className="text-xs text-muted-foreground">
                Across all stages
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">In progress</span>
              <Clock3 className="size-4 text-amber-400" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold">
                {
                  columns.find((column) => column.id === "rekaman").tasks
                    .length
                }
              </span>
              <span className="text-xs text-muted-foreground">
                Active tasks
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completed</span>
              <CheckCircle2 className="size-4 text-emerald-400" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold">{completedTasks}</span>
              <span className="text-xs text-muted-foreground">
                Tasks finished
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Completion rate
              </span>
              <ArrowUpRight className="size-4 text-primary" />
            </div>
            <div className="mt-4">
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{completion}%</span>
                <span className="text-xs text-muted-foreground">
                  Overall progress
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold">Board overview</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Track tasks from backlog to completion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-9 md:w-52"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border p-1">
              <SlidersHorizontal className="ml-2 size-4 text-muted-foreground" />
              <select
                value={filterPriority}
                onChange={(event) => setFilterPriority(event.target.value)}
                className="h-8 bg-transparent px-2 text-xs outline-none"
                aria-label="Filter by priority"
              >
                <option value="All">All priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex rounded-lg border border-border p-1">
              <Button
                size="icon"
                variant={activeView === "board" ? "secondary" : "ghost"}
                className="size-8"
                onClick={() => setActiveView("board")}
                aria-label="Board view"
              >
                <LayoutGrid className="size-4" />
              </Button>
              <Button
                size="icon"
                variant={activeView === "list" ? "secondary" : "ghost"}
                className="size-8"
                onClick={() => setActiveView("list")}
                aria-label="List view"
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Kanban board */}
        {activeView === "board" ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <section className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-5">
              {filteredColumns.map((column) => (
                <div key={column.id} className="min-w-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2.5 rounded-full ${column.color}`}
                      />
                      <h3 className="text-sm font-semibold">{column.title}</h3>
                      <span className="flex size-6 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
                        {column.tasks.length}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => {
                        setActiveColumn(column.id);
                        setShowForm(true);
                      }}
                      aria-label={`Add task to ${column.title}`}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  <DroppableColumn id={column.id}>
                    {column.tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMove={moveTask}
                        onMoveLeft={moveTaskLeft}
                      />
                    ))}

                    {column.tasks.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                        No tasks found
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setActiveColumn(column.id);
                        setShowForm(true);
                      }}
                    >
                      <Plus className="size-4" />
                      Add a task
                    </Button>
                  </DroppableColumn>
                </div>
              ))}
            </section>
          </DndContext>
        ) : (
          <section className="overflow-hidden rounded-xl border border-border/70 bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4 font-medium">Task</th>
                    <th className="px-5 py-4 font-medium">Stage</th>
                    <th className="px-5 py-4 font-medium">Priority</th>
                    <th className="px-5 py-4 font-medium">Due date</th>
                    <th className="px-5 py-4 font-medium">Assignees</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColumns.flatMap((column) =>
                    column.tasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium">{task.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {task.tag}
                          </p>
                        </td>
                        <td className="px-5 py-4">{column.title}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-md px-2 py-1 text-xs ${priorityStyles[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">
                          {task.date}
                        </td>
                        <td className="px-5 py-4">
                          <AvatarGroup members={task.assignee} />
                        </td>
                        <td className="px-5 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveTask(task)}
                          >
                            Move <ArrowUpRight className="ml-1 size-3" />
                          </Button>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Create task dialog */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowForm(false);
              }
            }}
          >
            <form
              onSubmit={addTask}
              className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <div>
                <h2 className="text-xl font-bold">Create a new task</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a task to your project pipeline.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="task-title">
                  Task title
                </label>
                <Input
                  id="task-title"
                  autoFocus
                  required
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask({ ...newTask, title: event.target.value })
                  }
                  placeholder="e.g. Build new dashboard"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor="task-description"
                >
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      description: event.target.value,
                    })
                  }
                  placeholder="What needs to be done?"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="task-stage">
                    Stage
                  </label>
                  <select
                    id="task-stage"
                    value={activeColumn}
                    onChange={(event) => setActiveColumn(event.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="task-priority"
                  >
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={newTask.priority}
                    onChange={(event) =>
                      setNewTask({
                        ...newTask,
                        priority: event.target.value,
                      })
                    }
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="task-tag">
                  Category
                </label>
                <select
                  id="task-tag"
                  value={newTask.tag}
                  onChange={(event) =>
                    setNewTask({ ...newTask, tag: event.target.value })
                  }
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="mr-2 size-4" />
                  Create task
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
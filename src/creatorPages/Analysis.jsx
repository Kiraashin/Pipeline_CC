
import { useState } from "react";
import {
    Heart,
    MessageCircle,
    Share2,
    BarChart3,
    CalendarDays,
    TrendingUp,
    Pencil,
    Check,
    X,
} from "lucide-react";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

const initialPerformances = [
    {
        id: 1,
        title: "Membangun REST API Modern dari Nol",
        platform: "YouTube",
        likes: 2450,
        comments: 320,
        shares: 145,
        updatedAt: "2026-11-01",
    },
    {
        id: 2,
        title: "Tips Produktivitas untuk Developer",
        platform: "Instagram",
        likes: 1820,
        comments: 210,
        shares: 98,
        updatedAt: "2026-10-31",
    },
    {
        id: 3,
        title: "Belajar React untuk Pemula",
        platform: "TikTok",
        likes: 3200,
        comments: 450,
        shares: 280,
        updatedAt: "2026-10-30",
    },
    {
        id: 4,
        title: "Cara Mengelola Database dengan Prisma",
        platform: "YouTube",
        likes: 1980,
        comments: 180,
        shares: 120,
        updatedAt: "2026-10-29",
    },
    {
        id: 5,
        title: "5 Tips Meningkatkan Engagement Konten",
        platform: "Instagram",
        likes: 3000,
        comments: 120,
        shares: 202,
        updatedAt: "2026-10-28",
    },
];

const formatNumber = (number) =>
    new Intl.NumberFormat("id-ID").format(number);

const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

export default function ContentPerformance() {
    const [performances, setPerformances] = useState(initialPerformances);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const totalLikes = performances.reduce((sum, item) => sum + item.likes, 0);
    const totalComments = performances.reduce((sum, item) => sum + item.comments, 0);
    const totalShares = performances.reduce((sum, item) => sum + item.shares, 0);

    const summary = [
        { label: "Total Konten", value: formatNumber(performances.length), icon: BarChart3 },
        { label: "Total Likes", value: formatNumber(totalLikes), icon: Heart },
        { label: "Total Comments", value: formatNumber(totalComments), icon: MessageCircle },
        { label: "Total Shares", value: formatNumber(totalShares), icon: Share2 },
    ];

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditData({
            likes: item.likes,
            comments: item.comments,
            shares: item.shares,
        });
    };

    const handleChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = (id) => {
        const values = ["likes", "comments", "shares"];

        const hasInvalidValue = values.some(
            (field) =>
                editData[field] === "" ||
                !Number.isInteger(Number(editData[field])) ||
                Number(editData[field]) < 0
        );

        if (hasInvalidValue) return;

        setPerformances((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        ...Object.fromEntries(
                            values.map((field) => [field, Number(editData[field])])
                        ),
                        updatedAt: new Date().toLocaleDateString("en-CA"),
                    }
                    : item
            )
        );

        setEditingId(null);
        setEditData({});
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    return (
        <div className="mx-auto max-w-screen-2xl space-y-7 px-4 py-6 sm:px-6 lg:px-30">

            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-end">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Analisis Performa
                        </h1>
                        <Badge variant="secondary" className="rounded-md">
                            {performances.length}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Pantau perkembangan dan interaksi audiens dari seluruh konten.
                    </p>
                </div>
            </section>

            {/* SUMMARY */}
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {summary.map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-5"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-muted-foreground">
                                {label}
                            </p>
                            <div className="rounded-lg bg-muted p-2">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>
                        </div>
                        <p className="mt-4 text-2xl font-bold tracking-tight tabular-nums">
                            {value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Keseluruhan konten
                        </p>
                    </div>
                ))}
            </section>

            {/* PERFORMANCE LIST */}
            <section className="overflow-hidden rounded-xl border bg-card">

                {/* SECTION HEADER */}
                <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="space-y-1">
                        <h2 className="text-sm font-semibold">Performa Konten</h2>
                        <p className="text-xs text-muted-foreground">
                            Rincian interaksi dan engagement setiap konten.
                        </p>
                    </div>
                    <Badge variant="outline" className="w-fit rounded-md">
                        {performances.length} Konten
                    </Badge>
                </div>

                <Separator />

                {/* TABLE HEADER */}
                <div className="hidden grid-cols-[minmax(0,1fr)_90px_100px_90px_110px_80px] gap-3 bg-muted/40 px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
                    <span>Nama Konten</span>
                    <span>Likes</span>
                    <span>Comments</span>
                    <span>Shares</span>
                    <span className="text-right">Engagement</span>
                    <span className="text-right">Aksi</span>
                </div>

                {/* CONTENT DATA */}
                <div className="divide-y">
                    {performances.map((item) => {
                        const isEditing = editingId === item.id;

                        const engagement =
                            item.likes + item.comments + item.shares;

                        const metrics = [
                            { field: "likes", label: "Likes", icon: Heart },
                            { field: "comments", label: "Comments", icon: MessageCircle },
                            { field: "shares", label: "Shares", icon: Share2 },
                        ];

                        return (
                            <div
                                key={item.id}
                                className="grid gap-4 px-4 py-4 transition-colors hover:bg-muted/30 sm:px-5 lg:grid-cols-[minmax(0,1fr)_90px_100px_90px_110px_80px] lg:items-center"
                            >

                                {/* CONTENT INFO */}
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold">
                                        {item.title}
                                    </h3>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="rounded-md text-[10px] font-normal">
                                            {item.platform}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            #{item.id}
                                        </span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <CalendarDays className="size-3" />
                                            {formatDate(item.updatedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* METRICS */}
                                <div className="col-span-full grid grid-cols-3 gap-3 lg:col-span-1 lg:contents">
                                    {metrics.map(({ field, label, icon: Icon }) => (
                                        <div key={field} className="min-w-0">
                                            <div className="mb-1 flex items-center gap-1 text-muted-foreground lg:hidden">
                                                <Icon className="size-3" />
                                                <span className="text-[11px]">{label}</span>
                                            </div>

                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={editData[field]}
                                                    onChange={(e) =>
                                                        handleChange(field, e.target.value)
                                                    }
                                                    className="h-9 w-full min-w-0 rounded-md border bg-background px-2 text-sm font-medium tabular-nums outline-none focus:ring-1 focus:ring-ring"
                                                />
                                            ) : (
                                                <>
                                                    <span className="hidden text-xs text-muted-foreground lg:block">
                                                        {label}
                                                    </span>
                                                    <p className="text-sm font-semibold tabular-nums">
                                                        {formatNumber(item[field])}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* ENGAGEMENT */}
                                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 lg:justify-end lg:bg-transparent lg:p-0">
                                    <div className="flex items-center gap-2 lg:hidden">
                                        <TrendingUp className="size-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                            Total Engagement
                                        </span>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-bold tabular-nums">
                                            {formatNumber(
                                                isEditing
                                                    ? ["likes", "comments", "shares"].reduce(
                                                        (sum, field) =>
                                                            sum + (Number(editData[field]) || 0),
                                                        0
                                                    )
                                                    : engagement
                                            )}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            Interaksi
                                        </p>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                onClick={() => handleSave(item.id)}
                                                title="Simpan"
                                            >
                                                <Check className="size-4" />
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-8"
                                                onClick={handleCancel}
                                                title="Batal"
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="size-8"
                                            onClick={() => handleEdit(item)}
                                            title="Edit performa"
                                        >
                                            <Pencil className="size-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t px-4 py-3 sm:px-5">
                    <p className="text-xs text-muted-foreground">
                        Menampilkan {performances.length} konten
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Total interaksi:{" "}
                        <span className="font-semibold text-foreground">
                            {formatNumber(totalLikes + totalComments + totalShares)}
                        </span>
                    </p>
                </div>
            </section>
        </div>
    );
}

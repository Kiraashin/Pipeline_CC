import useGetContent from "../../komponen tambahan/src/modules/content/hooks/useGetContent";
import { Dialog, DialogTrigger } from "../../komponen tambahan/components/ui/dialog";
import { Button } from "../../komponen tambahan/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import AppHeader from "../../komponen tambahan/src/modules/shared/components/organism/AppHeader";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import Kanban from "../../komponen tambahan/src/modules/dashboard/components/Kanban";
import { editContentService } from "../../komponen tambahan/src/modules/content/services/contentService";
import FormCreateEditContent from "../../komponen tambahan/src/modules/content/components/FormCreateEditContent";
import FilterItem from "../../komponen tambahan/src/modules/content/components/FilterItem";
import { CONTENT_FORMAT, CONTENT_PLATFORM, CONTENT_STATUS } from "../../komponen tambahan/src/modules/content/pages/ContentIndexPage";

export default function DashboardIndexPages() {
    const [formOpen, setFormOpen] = useState(false)
    const {
        isLoading,
        data,
        setStatus,
        setFormat,
        setPlatform,
        filter
    } = useGetContent()

    const handleSaveScript = async (item, values) => {
        // panggil API, mis. PATCH /contents/:id { hook, script, cta }
        await editContentService({
            id: Number(parseInt(item.content.id)),
            scriptDraft: values.scriptDraft
        });
        // lalu refresh data / update state
    };

    return (
        <div className="px-32 py-6">
            <AppHeader
                title="Halaman Utama"
                description="Kelola Pipeline konten"
            >
            </AppHeader>
            <section className="flex flex-col justify-end gap-4 md:flex-row md:items-center">

                <div className="flex flex-wrap items-center gap-2 py-6">
                    <div className="relative min-w-[180px] flex-1 md:flex-none">
                        {/* <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                        // value={search}
                        // onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search tasks..."
                        className="w-full pl-9 md:w-52"
                        /> */}
                    </div>
                </div>
            </section>
            <FormCreateEditContent
                contentId={null}
                initContent={null}
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
            />
            <Kanban data={data && data.data} isLoading={isLoading} onSaveScript={handleSaveScript} />
        </div>
    )
}
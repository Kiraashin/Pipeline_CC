
import { useState } from 'react';

import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '../../components/ui/dialog';

import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

import { HugeiconsIcon } from '@hugeicons/react';
import { Trash2, Add01Icon } from '@hugeicons/core-free-icons';

const platforms = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const platformImages = {
  youtube: "https://media-public.canva.com/KE6ns/MAElfQKE6ns/1/s.png",
  instagram: "https://media-public.canva.com/9h6qU/MAElfZ9h6qU/1/s.png",
  tiktok: "https://media-public.canva.com/e6HWU/MAHXaNe6HWU/1/s.png",
  linkedin: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjwQZ9IVBRtSZrkYbD5EUF0OBKWPcTv3Mu8hhMT2sYIA9m4EAhzJrkABA4&s=10",
};

const ProductList = ({ products = [], onDelete, onAdd }) => {
  const [openProduct, setOpenProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    handleName: '',
    platform: 'youtube',
  });

  // POST: tambah channel melalui parent
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.handleName.trim() || !form.platform) return;

    setIsSubmitting(true);

    try {
      await onAdd?.({
        handleName: form.handleName.trim(),
        platform: form.platform,
      });

      setForm({
        handleName: '',
        platform: 'youtube',
      });

      setOpenAdd(false);
    } catch (error) {
      // Error ditangani oleh ProductListPage
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE: hapus channel melalui parent
  const handleDelete = async (product) => {
    setIsDeleting(true);

    try {
      await onDelete?.(product);
      setOpenProduct(null);
    } catch (error) {
      // Error ditangani oleh ProductListPage
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="w-full bg-background py-5 sm:py-7">
      <div className="mx-auto space-y-5 px-4 sm:px-6 lg:px-30">

        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Saluran
            </h2>
            <p className="text-sm text-muted-foreground">
              Kelola dan atur semua saluran kamu dalam satu tempat.
            </p>
          </div>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger
              render={
                <Button className="h-9 gap-2 rounded-lg px-3.5 shadow-sm">
                  <HugeiconsIcon icon={Add01Icon} size={17} />
                  Tambah Saluran
                </Button>
              }
            />

            <DialogContent className="rounded-2xl sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg tracking-tight">
                  Tambah Saluran
                </DialogTitle>
                <DialogDescription>
                  Masukkan informasi saluran yang ingin kamu tambahkan.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAdd} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="channel-handle">Username Platform</Label>
                  <Input
                    id="channel-handle"
                    placeholder="Contoh: @mrbeast"
                    value={form.handleName}
                    onChange={(e) =>
                      setForm({ ...form, handleName: e.target.value })
                    }
                    className="h-10 rounded-lg"
                    required
                  />
                </div>

                {/* Platform */}
                <div className="space-y-2">
                  <Label>Platform</Label>

                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.value}
                        type="button"
                        variant={
                          form.platform === platform.value
                            ? 'default'
                            : 'outline'
                        }
                        className="h-10 rounded-lg"
                        onClick={() =>
                          setForm({
                            ...form,
                            platform: platform.value,
                          })
                        }
                      >
                        {platform.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <DialogFooter className="gap-2 pt-2">
                  <DialogClose
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-lg"
                        disabled={isSubmitting}
                      >
                        Batal
                      </Button>
                    }
                  />

                  <Button
                    type="submit"
                    className="rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Tambah Saluran'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-muted">
              <HugeiconsIcon icon={Add01Icon} size={21} />
            </div>

            <h3 className="text-sm font-semibold">
              Belum ada saluran
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Tambahkan saluran pertamamu untuk mulai mengelola data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <Card
                key={product.id ?? index}
                className="group overflow-hidden rounded-xl border bg-card shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent>
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg sm:h-32">
                    {platformImages[product.platform?.toLowerCase()] ? (
                      <img
                        src={platformImages[product.platform.toLowerCase()]}
                        alt={product.platform}
                        className="size-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Tidak ada gambar
                      </span>
                    )}
                  </div>
                </CardContent>

                {/* Information */}
                <CardContent className="space-y-2.5 p-3">
                  <div className="min-w-0 space-y-1">
                    <h1 className="truncate text-sm font-bold  tracking-tight">
                      {product.handleName}
                    </h1>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs capitalize text-muted-foreground">
                      Saluran {product.platform}
                    </span>

                    <Dialog
                      open={openProduct === (product.id ?? index)}
                      onOpenChange={(isOpen) =>
                        setOpenProduct(
                          isOpen ? (product.id ?? index) : null
                        )
                      }
                    >
                      <DialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Hapus ${product.handle_name}`}
                          >
                            <HugeiconsIcon
                              icon={Trash2}
                              size={17}
                              strokeWidth={2}
                            />
                          </Button>
                        }
                      />

                      <DialogContent className="rounded-2xl sm:max-w-md">
                        <DialogHeader className="items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                            <HugeiconsIcon
                              icon={Trash2}
                              size={23}
                            />
                          </div>

                          <DialogTitle className="text-center text-lg">
                            Hapus saluran?
                          </DialogTitle>

                          <DialogDescription className="text-center leading-relaxed">
                            Kamu yakin ingin menghapus{' '}
                            <strong className="text-foreground">
                              {product.handle_name}
                            </strong>
                            ? Tindakan ini tidak dapat dibatalkan.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="gap-2 pt-2 sm:justify-center">
                          <DialogClose
                            render={
                              <Button
                                variant="outline"
                                className="rounded-lg"
                                disabled={isDeleting}
                              >
                                Batal
                              </Button>
                            }
                          />

                          <Button
                            variant="destructive"
                            className="rounded-lg"
                            disabled={isDeleting}
                            onClick={() => handleDelete(product)}
                          >
                            {isDeleting ? 'Menghapus...' : 'Hapus'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;

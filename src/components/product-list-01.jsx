
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
  { value: 'x', label: 'X' },
];

const ProductList = ({ products = [], onDelete, onAdd }) => {
  const [openProduct, setOpenProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    handle_name: '',
    platform: 'youtube',
  });

  // POST: tambah channel melalui parent
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.handle_name.trim() || !form.platform) return;

    setIsSubmitting(true);

    try {
      await onAdd?.({
        handle_name: form.handle_name.trim(),
        platform: form.platform,
      });

      setForm({
        handle_name: '',
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
      <div className="mx-auto max-w-screen-2xl space-y-5 px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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
                    value={form.handle_name}
                    onChange={(e) =>
                      setForm({ ...form, handle_name: e.target.value })
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
                {/* Image */}
                <CardContent>
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg sm:h-32">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imgAlt ?? product.name}
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
                    <h3 className="truncate text-sm font-semibold tracking-tight">
                      {product.handle_name}
                    </h3>

                    <p className="truncate text-xs text-muted-foreground capitalize">
                      {product.platform}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs capitalize text-muted-foreground">
                      {product.type || 'Channel'}
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

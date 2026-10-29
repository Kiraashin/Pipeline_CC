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
import { cn } from '../../lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Trash2,
  Add01Icon,
} from '@hugeicons/core-free-icons';

const ProductList = ({ products = [], onDelete, onAdd }) => {
  const [openProduct, setOpenProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState({
  name: "",
  price: "",
  type: "",
});

  const handleAdd = (e) => {
  e.preventDefault();

  onAdd?.({
    id: crypto.randomUUID(),
    name: form.name.trim(),
    type: form.type,
  });

  setForm({
    name: "",
    type: "youtube",
  });

  setOpenAdd(false);
};

  const handleDelete = (product) => {
    onDelete?.(product);
    setOpenProduct(null);
  };

  return (
    <section className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-screen-2xl space-y-8 px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Saluran
            </h2>
            <p className="text-sm text-muted-foreground">
              Kelola dan atur semua saluran kamu dalam satu tempat
            </p>
          </div>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger
              render={
                <Button className="h-10 gap-2 rounded-xl px-4 shadow-sm">
                  <HugeiconsIcon icon={Add01Icon} size={18} />
                  Tambah Saluran
                </Button>
              }
            />

            <DialogContent className="rounded-2xl sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl tracking-tight">
                  Tambah Saluran
                </DialogTitle>
                <DialogDescription>
                  Masukkan informasi saluran yang ingin kamu tambahkan.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAdd} className="space-y-5 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="channel-name">Nama Saluran</Label>
                  <Input
                    id="channel-name"
                    placeholder="Contoh: MrBeast"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="h-11 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
  <Label>Jenis Saluran</Label>

  <div className="grid grid-cols-2 gap-3">
    <Button
      type="button"
      variant={form.type === "youtube" ? "default" : "outline"}
      className="h-11 rounded-xl"
      onClick={() => setForm({ ...form, type: "online" })}
    >
      Youtube
    </Button>

    <Button
      type="button"
      variant={form.type === "instagram" ? "default" : "outline"}
      className="h-11 rounded-xl"
      onClick={() => setForm({ ...form, type: "offline" })}
    >
      Instagram
    </Button>

    <Button
      type="button"
      variant={form.type === "tiktok" ? "default" : "outline"}
      className="h-11 rounded-xl"
      onClick={() => setForm({ ...form, type: "online" })}
    >
      Tiktok
    </Button>

    <Button
      type="button"
      variant={form.type === "x" ? "default" : "outline"}
      className="h-11 rounded-xl"
      onClick={() => setForm({ ...form, type: "offline" })}
    >
      X
    </Button>
  </div>
</div>
                <DialogFooter className="gap-2 pt-2">
                  <DialogClose
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                      >
                        Batal
                      </Button>
                    }
                  />
                  <Button type="submit" className="rounded-xl">
                    Tambah Saluran
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
              <HugeiconsIcon icon={Add01Icon} size={22} />
            </div>
            <h3 className="font-medium">Belum ada saluran</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tambahkan saluran pertamamu untuk mulai mengelola data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <Card
                key={product.id ?? index}
                className={cn(
                  'group overflow-hidden rounded-2xl border bg-card shadow-none transition-all duration-200',
                  'hover:-translate-y-1 hover:shadow-md',
                  product.salePrice && 'relative'
                )}
              >
                <CardContent className="p-4 pb-0">
                  <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-muted/40">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imgAlt ?? product.name}
                        className="size-full object-contain p-12 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Tidak ada gambar
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardContent className="space-y-4 p-4">
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 tracking-tight">
                      {product.name}
                    </h3>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 min-h-12 font-semibold leading-6 tracking-tight">
                      {product.price}
                    </h3>
                    </div>

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
                            className="size-9 shrink-0 rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Hapus ${product.name}`}
                          >
                            <HugeiconsIcon
                              icon={Trash2}
                              size={18}
                              strokeWidth={2}
                            />
                          </Button>
                        }
                      />

                      <DialogContent className="rounded-2xl sm:max-w-md">
                        <DialogHeader className="items-center gap-3">
                          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                            <HugeiconsIcon
                              icon={Trash2}
                              size={25}
                              strokeWidth={2}
                            />
                          </div>

                          <DialogTitle className="text-center text-xl">
                            Hapus saluran?
                          </DialogTitle>

                          <DialogDescription className="text-center leading-relaxed">
                            Kamu yakin ingin menghapus{' '}
                            <strong className="text-foreground">
                              {product.name}
                            </strong>
                            ? Tindakan ini tidak dapat dibatalkan.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="gap-2 pt-3 sm:justify-center">
                          <DialogClose
                            render={
                              <Button
                                variant="outline"
                                className="rounded-xl"
                              >
                                Batal
                              </Button>
                            }
                          />
                          <Button
                            variant="destructive"
                            className="rounded-xl"
                            onClick={() => handleDelete(product)}
                          >
                            Hapus
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

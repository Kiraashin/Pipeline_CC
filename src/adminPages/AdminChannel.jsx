import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ProductList from '../components/product-list-01';
import { usePagination } from '../../hooks/use-pagination';
import {
  getChannels,
  deleteChannel,
} from '../services/channelService';

const PAGINATION_ITEMS_TO_DISPLAY = 5;

const AdminChannels = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: PAGINATION_ITEMS_TO_DISPLAY,
  });

  // GET CHANNEL
  const fetchChannels = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getChannels(currentPage);

      const channelData = response.data?.data ?? [];
      const metadata = response.data?.metadata ?? {};

      setProducts(Array.isArray(channelData) ? channelData : []);
      setTotalPages(Number(metadata.pageCount ?? 1));

    } catch (error) {
      console.error('Gagal mengambil channel:', error);
      toast.error(
        error?.response?.data?.message || 'Gagal mengambil data channel'
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  // DELETE CHANNEL
  const handleDelete = async (product) => {
    try {
      await deleteChannel(product.id);

      toast.success('Channel berhasil dihapus');

      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchChannels();
      }
    } catch (error) {
      console.error('Gagal menghapus channel:', error);
      toast.error(
        error?.response?.data?.message || 'Gagal menghapus channel'
      );
    }
  };

  return (
    <div className="space-y-5 p-4 sm:p-6">

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Memuat channel...
        </p>
      ) : products.length === 0 ? (
        <div className="rounded-xl border py-12 text-center text-sm text-muted-foreground">
          Belum ada channel.
        </div>
      ) : (
        <ProductList
          products={products}
          onDelete={handleDelete}
        />
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pb-5">

          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
            className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {showLeftEllipsis && (
            <span className="px-1 text-muted-foreground">...</span>
          )}

          {pages.map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={isLoading}
              className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-muted'
              }`}
            >
              {page}
            </button>
          ))}

          {showRightEllipsis && (
            <span className="px-1 text-muted-foreground">...</span>
          )}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || isLoading}
            className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm disabled:opacity-40"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>

        </div>
      )}
    </div>
  );
};

export default AdminChannels;
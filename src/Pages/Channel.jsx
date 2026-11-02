import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import ProductList from '../components/product-list-01';
import { usePagination } from '../../hooks/use-pagination';

import {
  getChannels,
  createChannel,
  deleteChannel,
} from '../services/channelService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGINATION_ITEMS_TO_DISPLAY = 5;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    isFirstPage: true,
    isLastPage: true,
  });

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

      console.log('Response channel:', response.data);

      const channelData = response.data?.data ?? [];
      const metadata = response.data?.metadata ?? {};

      setProducts(Array.isArray(channelData) ? channelData : []);
      setPagination(metadata);
      setTotalPages(Number(metadata.pageCount ?? 1));

    } catch (error) {
      console.error('Gagal mengambil channel:', error);

      toast.error(
        error?.response?.data?.message ||
        'Gagal mengambil data channel'
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  // POST CHANNEL
  const handleAdd = async (data) => {
    try {
      await createChannel(data);

      toast.success('Channel berhasil ditambahkan');

      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        await fetchChannels();
      }
    } catch (error) {
      console.error('Gagal menambahkan channel:', error);

      toast.error(
        error?.response?.data?.message ||
        'Gagal menambahkan channel'
      );

      throw error;
    }
  };

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
        error?.response?.data?.message ||
        'Gagal menghapus channel'
      );

      throw error;
    }
  };

  return (
    <div className="space-y-1">
      <ProductList
        products={products}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />

      {isLoading && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Memuat channel...
        </p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pb-5">

        {/* PREVIOUS */}
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1 || isLoading}
          className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* LEFT ELLIPSIS */}
        {showLeftEllipsis && (
          <span className="px-1 text-muted-foreground">...</span>
        )}

        {/* PAGE NUMBERS */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={isLoading}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-all ${currentPage === page
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border hover:bg-muted'
              }`}
          >
            {page}
          </button>
        ))}

        {/* RIGHT ELLIPSIS */}
        {showRightEllipsis && (
          <span className="px-1 text-muted-foreground">...</span>
        )}

        {/* NEXT */}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages || isLoading}
          className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
};

export default ProductListPage;

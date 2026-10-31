import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import ProductList from '../components/product-list-01';
import { usePagination } from '../../hooks/use-pagination';

import {
  getChannels,
  createChannel,
  deleteChannel,
} from '../services/channelService';

const PAGINATION_ITEMS_TO_DISPLAY = 3;

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
      <div className="flex items-center justify-center gap-3 pb-5">
        <button
          onClick={() => setCurrentPage(pagination.prevPage)}
          disabled={pagination.isFirstPage || isLoading}
          className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-muted-foreground">
          Halaman {pagination.currentPage ?? currentPage}
        </span>

        <button
          onClick={() => setCurrentPage(pagination.nextPage)}
          disabled={pagination.isLastPage || isLoading}
          className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;

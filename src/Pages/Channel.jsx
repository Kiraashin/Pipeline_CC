import { useState } from 'react';
import ProductList from '../components/product-list-01';

const initialProducts = [
  {
    id: '1',
    image: 'https://media-public.canva.com/KE6ns/MAElfQKE6ns/1/s.png',
    name: 'Youtube Channel',
    price: "MrBeast",
  },
  {
    id: '2',
    image: 'https://media-public.canva.com/Pish0/MAElfTPish0/1/s.png',
    name: 'Instagram Channel',
    price: "Punipun",
  },
  {
    id: '3',
    image: 'https://media-public.canva.com/e6HWU/MAHXaNe6HWU/1/s.png',
    name: 'Saluran Tiktok',
    price: "Raffi ahmad",
  },
  {
    id: '4',
    image: 'https://media-public.canva.com/7rcnw/MAFu857rcnw/1/s.png',
    name: 'Saluran X',
    price: "Fufufafa"
  }
];

const ProductListPage = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleAdd = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleDelete = (product) => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== product.id)
    );
  };

  return (
    <ProductList
      products={products}
      onAdd={handleAdd}
      onDelete={handleDelete}
    />
  );
};

export default ProductListPage;

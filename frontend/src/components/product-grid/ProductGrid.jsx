import ErrorCard from '../error/ErrorCard';
import ProductCard from './ProductCard';
import { fetchProducts } from '@/services/apiClient.js';
import { TbShoeOff } from 'react-icons/tb';

export default async function ProductGrid() {
  const { ok, data } = await fetchProducts();
  if (!ok) {
    return (
      <ErrorCard
        message="We're sorry, we couldn't load the products. Please try again."
        Icon={TbShoeOff}
      />
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200">
        <p>No products available</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
      {data.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

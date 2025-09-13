import ProductCard from './ProductCard';
import { fetchProducts } from '@/services/apiClient.js';

export default async function ProductGrid() {
  const products = await fetchProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
      {products && products.map((product) => <ProductCard key={product.slug} product={product} />)}
    </div>
  );
}

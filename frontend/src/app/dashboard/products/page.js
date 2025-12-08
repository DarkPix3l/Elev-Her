import ProductClient from './ProductClient';
import { fetchProducts } from '@/services/apiServer';
import { TbShoeOff } from 'react-icons/tb';
import ErrorCard from '@/components/error/ErrorCard.jsx';

export default async function ProductsPage() {
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

  return <ProductClient products={data} />;
}

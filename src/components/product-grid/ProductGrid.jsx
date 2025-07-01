import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
      {products && products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

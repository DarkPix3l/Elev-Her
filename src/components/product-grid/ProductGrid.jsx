import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  /*   const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // logic to update cart state goes here
  }; */

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

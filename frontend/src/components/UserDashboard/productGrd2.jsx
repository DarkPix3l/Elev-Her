'use client';

import useProductDialogStore from '@/store/useProductDialogStore';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductDialogContent from '../ui/product_dialog/ProductDialogContent';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import StarRating from '@/components/ui/StarRating';

export default function ProductGrid({ products, onAddToCart }) {
  const {
    selectedProduct,
    selectedSize,
    selectedColor,
    setSelectedProduct,
    setSelectedSize,
    setSelectedColor,
    reset,
  } = useProductDialogStore();

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize && selectedColor) {
      onAddToCart(selectedProduct, selectedSize, selectedColor);
      reset();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products &&
        products.map((product) => (
          <Card key={product.slug} className="group hover:shadow-lg transition-shadow h-full">
            <CardContent className="p-0 md:p-3 flex flex-col h-full">
              <div className="relative mb-4">
                <img
                  src={product.mainImage || '/placeholder.svg'}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {!product.inStock && (
                  <Badge className="absolute top-2 left-2" variant="destructive">
                    Out of Stock
                  </Badge>
                )}
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Sale
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-col">
                  <div>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.summary}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">€{product.price}</p>
                    {product.originalPrice > product.price && (
                      <p className="text-sm text-gray-500 line-through">€{product.originalPrice}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating averageRating={product.averageRating} size={15} />
                  <span className="text-sm text-gray-600">
                    {product.averageRating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <Badge variant="outline">{product.category}</Badge>
              </div>

              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </DialogTrigger>

                  <ProductDialogContent
                    product={product}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    setSelectedSize={setSelectedSize}
                    setSelectedColor={setSelectedColor}
                    handleAddToCart={handleAddToCart}
                  />
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

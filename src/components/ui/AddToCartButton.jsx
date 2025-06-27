import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({ product, onAddToCart }) {
  return (
    <Button
      variant="cart"
      size="icon"
      className="absolute right-0 bottom-0 translate-1/3"
      /* onClick={() => onAddToCart(product)} */
      aria-label="Add to cart"
    >
      <PlusIcon />
    </Button>
  );
}

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import React from "react";

export const AddToCartButton = React.forwardRef(function AddToCartButton(
  { onClick, disabled, className, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      variant="cart"
      size="icon"
      disabled={disabled}
      onClick={onClick}
      className={`absolute right-0 bottom-0 translate-1/3 ${className}`}
      aria-label="Add to cart"
      {...props}
    >
      <PlusIcon />
    </Button>
  );
});

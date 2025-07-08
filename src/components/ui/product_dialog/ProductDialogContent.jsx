"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/product_dialog/dialog"
import { Button } from "@/components/ui/Button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

export default function ProductDialogContent({
  product,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  handleAddToCart,
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{product.summary}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <h2>{product.title}</h2>
        <img
          src={product.mainImage || "/placeholder.svg"}
          alt={product.title}
          className="w-[80%] h-64 object-cover rounded-lg mx-auto"
        />

        <div className="space-y-4 text-white">
          <div>
            <label className="text-sm font-medium">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    EU {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {product.color.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart - €{product.price}
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

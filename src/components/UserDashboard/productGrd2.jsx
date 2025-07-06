"use client"

import { useState } from "react"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StarRating from "@/components/ui/StarRating";

export default function ProductGrid({ shoes, onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize && selectedColor) {
      onAddToCart(selectedProduct, selectedSize, selectedColor)
      setSelectedProduct(null)
      setSelectedSize("")
      setSelectedColor("")
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shoes.map((shoe) => (
        <Card key={shoe.slug} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img
                src={shoe.mainImage || "/placeholder.svg"}
                alt={shoe.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              {!shoe.inStock && (
                <Badge className="absolute top-2 left-2" variant="destructive">
                  Out of Stock
                </Badge>
              )}
              {shoe.originalPrice > shoe.price && (
                <Badge className="absolute top-2 right-2" variant="secondary">
                  Sale
                </Badge>
              )}
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{shoe.title}</h3>
                  <p className="text-sm text-gray-600">{shoe.summary}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">€{shoe.price}</p>
                  {shoe.originalPrice > shoe.price && (
                    <p className="text-sm text-gray-500 line-through">€{shoe.originalPrice}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StarRating averageRating={shoe.averageRating} size={15} />
                <span className="text-sm text-gray-600">
                  {shoe.averageRating} ({shoe.reviewCount} reviews)
                </span>
              </div>

              <Badge variant="outline">{shoe.category}</Badge>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={!shoe.inStock} onClick={() => setSelectedProduct(shoe)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {shoe.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{shoe.summary}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <h2>{shoe.title}</h2>
                    <img
                      src={shoe.mainImage || "/placeholder.svg"}
                      alt={shoe.title}
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
                            {shoe.sizes.map((size) => (
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
                            {shoe.color.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full" onClick={handleAddToCart} disabled={!selectedSize || !selectedColor}>
                        Add to Cart - €{shoe.price}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

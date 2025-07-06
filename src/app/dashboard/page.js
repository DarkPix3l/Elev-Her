"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, User, Package, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/UserDashboard/productGrd2";
import ShoppingCartPanel from "@/components/UserDashboard/ShoppingCartPanel";
import OrderHistory from "@/components/UserDashboard/OrderHistory";
import UserProfile from "@/components/UserDashboard/UserProfile";
import useCartStore from "@/store/useCartStore";
import Navbar from "@/components/ui/NavBar";
import { fetchProducts } from '@/services/product.apis';



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [shoes, setShoes] = useState([]); // State to hold fetched shoe data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  const { cartItems, addToCart, removeFromCart, updateQuantity } =
    useCartStore();

  const categories = ["All", "inclusive-sizing", "model", "cut", "Skate"];

  const filteredShoes = shoes.filter((shoe) => {
    const matchesSearch =
      shoe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || shoe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

useEffect(() => {
  const fetchShoes = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setShoes(data);
    } catch (e) {
      setError(e);
      console.error("Failed to fetch shoes:", e);
    } finally {
      setLoading(false);
    }
  };

  fetchShoes();
}, []);

{loading ? (
  <div className="text-center text-muted">Loading shoes...</div>
) : error ? (
  <div className="text-center text-red-500">Error loading shoes.</div>
) : (
  <ProductGrid shoes={filteredShoes} onAddToCart={addToCart} />
)}

  return (
    <div className="h-fit min-h-screen [background-image:radial-gradient(farthest-corner_at_center,_oklch(0.6249_0.2197_356.35),_oklch(36.194%_0.03849_276.321)_60%)]">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-2 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6 mt-25"
        >
          <TabsList className="flex w-full relative  bg-gray-500/50 shadow-[20px_0_30px_5px_rgb(47,47,80)] ">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Browse Shoes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search shoes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <ProductGrid shoes={filteredShoes} onAddToCart={addToCart} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <p className="text-sm text-gray-400">
                    Add some shoes to your wishlist to see them here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>

      {/* Shopping Cart Panel */}
      <ShoppingCartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

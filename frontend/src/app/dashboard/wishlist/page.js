'use client';

import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WishlistPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Your wishlist is empty</p>
          <p className="text-sm text-gray-400">Add some shoes to your wishlist to see them here</p>
        </div>
      </CardContent>
    </Card>
  );
}

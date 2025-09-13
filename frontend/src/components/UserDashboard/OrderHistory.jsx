'use client';

import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

const sampleOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 335.0,
    items: [
      {
        name: 'Nike Air Max 270',
        size: '10',
        color: 'Black',
        quantity: 1,
        price: 150,
      },
      {
        name: 'Adidas Ultraboost 22',
        size: '10',
        color: 'White',
        quantity: 1,
        price: 180,
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 170.0,
    items: [
      {
        name: 'Jordan 1 Retro High',
        size: '9',
        color: 'Black/Red',
        quantity: 1,
        price: 170,
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'processing',
    total: 125.0,
    items: [
      {
        name: 'Converse Chuck Taylor',
        size: '8',
        color: 'White',
        quantity: 1,
        price: 65,
      },
      {
        name: 'Vans Old Skool',
        size: '8',
        color: 'Black/White',
        quantity: 1,
        price: 60,
      },
    ],
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'shipped':
      return <Truck className="h-4 w-4 text-blue-500" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrderHistory() {
  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="space-y-4 ">
            {sampleOrders.map((order) => (
              <Card key={order.id} className="border">
                <CardContent className="cardy p-0 md:p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order {order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="item-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="font-bold ml-auto">€ {order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-t">
                        <div className="max-w-[69%] md:max-w-auto">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

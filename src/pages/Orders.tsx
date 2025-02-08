import React, { useState } from 'react';
import { Clock, Package, CheckCircle } from 'lucide-react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const mockOrders = [
  {
    id: '1',
    restaurant: {
      id: '1',
      name: 'Svenska Köket'
    },
    items: [
      { name: 'Köttbullar med potatismos', quantity: 2, price: 149 },
      { name: 'Laxfilé med dillstuvad potatis', quantity: 1, price: 189 }
    ],
    status: 'delivered',
    deliveryOption: { provider: 'foodora', estimatedTime: '30-45 min', price: 49 },
    totalAmount: 536,
    createdAt: '2024-02-20T14:30:00Z',
    hasReview: false
  }
];

const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Fantastisk mat och snabb leverans! Köttbullarna var perfekt tillagade.',
    userName: 'Anna L.',
    createdAt: '2024-02-21T10:15:00Z'
  }
];

const statusIcons = {
  pending: Clock,
  delivering: Package,
  delivered: CheckCircle
};

const statusColors = {
  pending: 'text-yellow-500',
  delivering: 'text-blue-500',
  delivered: 'text-green-500'
};

const Orders = () => {
  const [reviews, setReviews] = useState(mockReviews);

  const handleReviewSubmit = async (review: {
    rating: number;
    comment: string;
    restaurantId: string;
    orderId: string;
  }) => {
    // I en riktig implementation skulle detta anropa en API-endpoint
    const newReview = {
      id: Date.now().toString(),
      rating: review.rating,
      comment: review.comment,
      userName: 'Du',
      createdAt: new Date().toISOString()
    };
    
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dina beställningar</h1>
      
      <div className="space-y-8">
        {mockOrders.map((order) => {
          const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
          const statusColor = statusColors[order.status as keyof typeof statusColors];
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{order.restaurant.name}</h2>
                  <div className={`flex items-center space-x-2 ${statusColor}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-600">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{item.price * item.quantity} kr</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Leverans ({order.deliveryOption.provider})</span>
                      <span>{order.deliveryOption.price} kr</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                      <span>Totalt</span>
                      <span>{order.totalAmount} kr</span>
                    </div>
                  </div>
                </div>
              </div>

              {order.status === 'delivered' && !order.hasReview && (
                <div className="p-6 bg-gray-50 border-t">
                  <h3 className="text-lg font-semibold mb-4">Lämna en recension</h3>
                  <ReviewForm
                    restaurantId={order.restaurant.id}
                    orderId={order.id}
                    onSubmit={handleReviewSubmit}
                  />
                </div>
              )}
            </div>
          );
        })}

        {reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Dina recensioner</h2>
            <ReviewList reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
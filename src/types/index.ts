export interface Restaurant {
  id: string;
  name: string;
  description: string;
  city: string;
  image: string;
  rating: number;
  deliveryOptions: DeliveryOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface DeliveryOption {
  provider: 'foodora' | 'uber-eats' | 'wolt';
  estimatedTime: string;
  price: number;
  available: boolean;
  minimumOrder?: number;
  maxDistance?: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  deliveryOption: DeliveryOption;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  totalAmount: number;
  createdAt: string;
  trackingUrl?: string;
  estimatedDeliveryTime?: string;
}
import { create } from 'zustand';
import { CartItem, DeliveryOption } from '../types';

interface StoreState {
  cart: CartItem[];
  selectedCity: string;
  selectedDeliveryOption: DeliveryOption | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setSelectedCity: (city: string) => void;
  setDeliveryOption: (option: DeliveryOption) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  selectedCity: 'Malmö',
  selectedDeliveryOption: null,
  
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: quantity === 0
        ? state.cart.filter((item) => item.id !== itemId)
        : state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
    })),

  setSelectedCity: (city) => set({ selectedCity: city }),
  
  setDeliveryOption: (option) => set({ selectedDeliveryOption: option }),
  
  clearCart: () => set({ cart: [], selectedDeliveryOption: null }),
}));
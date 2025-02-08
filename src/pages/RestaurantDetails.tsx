import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Star, Clock } from 'lucide-react';
import { fetchDeliveryOptions, getDeliveryProviderColor } from '../services/delivery';
import { restaurants, menuItems } from '../services/restaurants';
import type { MenuItem, DeliveryOption } from '../types';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { addToCart, setDeliveryOption } = useStore();
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [loading, setLoading] = useState(true);

  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id || ''] || [];

  useEffect(() => {
    const loadDeliveryOptions = async () => {
      try {
        const options = await fetchDeliveryOptions(id || '', restaurant?.city || '', '21120');
        setDeliveryOptions(options);
        if (options.length > 0) {
          setSelectedDelivery(options[0]);
          setDeliveryOption(options[0]);
        }
      } catch (error) {
        console.error('Failed to load delivery options:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeliveryOptions();
  }, [id, setDeliveryOption, restaurant]);

  if (!restaurant) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Restaurangen hittades inte</h2>
      </div>
    );
  }

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDeliveryChange = (option: DeliveryOption) => {
    setSelectedDelivery(option);
    setDeliveryOption(option);
  };

  const getDeliveryProviderImage = (provider: string) => {
    const images = {
      foodora: 'https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365a002c60c2a215/view?project=678bfed4002a8a6174c4',
      'uber-eats': 'https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365b00396bd1708f/view?project=678bfed4002a8a6174c4',
      wolt: 'https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365400237ee66773/view?project=678bfed4002a8a6174c4'
    };
    return images[provider as keyof typeof images] || '';
  };

  // Gruppera menyn efter kategori
  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-8">
      <div className="relative h-64 bg-gray-800">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80">
          <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-1 text-white">{restaurant.rating}</span>
              <span className="ml-1 text-gray-300">({restaurant.reviewCount} omdömen)</span>
            </div>
            <span className="text-white">•</span>
            <span className="text-white">{restaurant.city}</span>
          </div>
          <p className="text-gray-200 mt-2">{restaurant.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Meny</h2>
            <div className="space-y-8">
              {Object.entries(menuByCategory).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-semibold">{item.price} kr</span>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                            >
                              Lägg till
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Leveransalternativ</h2>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Hämtar leveransalternativ...</p>
              </div>
            ) : deliveryOptions.length === 0 ? (
              <p className="text-center text-gray-600 py-4">
                Tyvärr finns inga leveransalternativ tillgängliga för din adress.
              </p>
            ) : (
              <div className="space-y-4">
                {deliveryOptions.map((option) => (
                  <label
                    key={option.provider}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDelivery?.provider === option.provider
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      className="hidden"
                      checked={selectedDelivery?.provider === option.provider}
                      onChange={() => handleDeliveryChange(option)}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm">
                          <img
                            src={getDeliveryProviderImage(option.provider)}
                            alt={option.provider}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-medium capitalize">{option.provider}</span>
                      </div>
                      <span className="text-gray-600">{option.price} kr</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {option.estimatedTime}
                    </div>
                    {option.minimumOrder && (
                      <p className="mt-1 text-xs text-gray-500">
                        Minsta ordervärde: {option.minimumOrder} kr
                      </p>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
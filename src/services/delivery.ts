import type { DeliveryOption } from '../types';

// Simulera API-anrop till leveranstjänsterna
export const fetchDeliveryOptions = async (
  restaurantId: string,
  city: string,
  postalCode: string
): Promise<DeliveryOption[]> => {
  const mockDeliveryTimes = {
    foodora: '30-45 min',
    'uber-eats': '35-50 min',
    wolt: '25-40 min',
  };

  const mockPrices = {
    foodora: 49,
    'uber-eats': 55,
    wolt: 45,
  };

  await new Promise(resolve => setTimeout(resolve, 1000));

  const isInFoodoraZone = parseInt(postalCode) >= 20000 && parseInt(postalCode) <= 25000;
  const isInUberZone = parseInt(postalCode) >= 21000 && parseInt(postalCode) <= 23000;
  const isInWoltZone = parseInt(postalCode) >= 20000 && parseInt(postalCode) <= 24000;

  return [
    {
      provider: 'foodora',
      estimatedTime: mockDeliveryTimes.foodora,
      price: mockPrices.foodora,
      available: isInFoodoraZone,
      minimumOrder: 150,
      maxDistance: 10,
    },
    {
      provider: 'uber-eats',
      estimatedTime: mockDeliveryTimes['uber-eats'],
      price: mockPrices['uber-eats'],
      available: isInUberZone,
      minimumOrder: 100,
      maxDistance: 8,
    },
    {
      provider: 'wolt',
      estimatedTime: mockDeliveryTimes.wolt,
      price: mockPrices.wolt,
      available: isInWoltZone,
      minimumOrder: 120,
      maxDistance: 12,
    },
  ].filter(option => option.available);
};

export const getDeliveryProviderImage = (provider: string) => {
  const images = {
    foodora: 'https://postimg.cc/TKLZjfbG',
    'uber-eats': 'https://postimg.cc/LqD16KsK',
    wolt: 'https://postimg.cc/nC07J93V',
  };
  return images[provider as keyof typeof images] || '';
};

export const getDeliveryProviderColor = (provider: string) => {
  const colors = {
    foodora: 'bg-pink-500',
    'uber-eats': 'bg-black',
    wolt: 'bg-blue-500',
  };
  return colors[provider as keyof typeof colors] || 'bg-gray-500';
};

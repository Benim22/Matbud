import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Star, Clock, MapPin } from 'lucide-react';

const mockRestaurants = [
  {
    id: '1',
    name: 'Svenska Köket',
    description: 'Traditionell svensk husmanskost',
    city: 'Malmö',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    rating: 4.5,
    reviewCount: 128,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '30-45 min', price: 49 },
      { provider: 'wolt', estimatedTime: '25-40 min', price: 45 }
    ]
  },
  {
    id: '2',
    name: 'Havets Pärlor',
    description: 'Färsk fisk och skaldjur',
    city: 'Trelleborg',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
    rating: 4.7,
    reviewCount: 89,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '35-50 min', price: 55 }
    ]
  },
  {
    id: '3',
    name: 'Skånska Delikatesser',
    description: 'Lokala specialiteter och skånska favoriter',
    city: 'Ystad',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
    rating: 4.6,
    reviewCount: 156,
    deliveryOptions: [
      { provider: 'wolt', estimatedTime: '30-45 min', price: 49 }
    ]
  },
  {
    id: '4',
    name: 'Trelleborgs Steakhouse',
    description: 'Premium kött och grillrätter',
    city: 'Trelleborg',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    rating: 4.4,
    reviewCount: 72,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '40-55 min', price: 59 }
    ]
  },
  {
    id: '5',
    name: 'Ystads Fiskrökeri',
    description: 'Nyrökta delikatesser från havet',
    city: 'Ystad',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
    rating: 4.8,
    reviewCount: 94,
    deliveryOptions: [
      { provider: 'wolt', estimatedTime: '25-40 min', price: 45 }
    ]
  }
];

const Home = () => {
  const { selectedCity } = useStore();
  const filteredRestaurants = mockRestaurants.filter(r => r.city === selectedCity);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Restauranger i {selectedCity}
        </h1>
        <p className="mt-2 text-gray-600">
          Upptäck lokala favoriter och få maten levererad direkt hem
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurant/${restaurant.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-48">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <h2 className="text-xl font-semibold">
                    {restaurant.name}
                  </h2>
                  <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{restaurant.rating}</span>
                    <span className="text-xs text-gray-300">({restaurant.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{restaurant.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {restaurant.city}
                </div>
                <div className="flex items-center space-x-4">
                  {restaurant.deliveryOptions.map((option) => (
                    <span
                      key={option.provider}
                      className="flex items-center text-gray-500"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      {option.estimatedTime}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
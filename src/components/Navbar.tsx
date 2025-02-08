import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShoppingCart, Menu, MapPin } from 'lucide-react';

const cities = ['Malmö', 'Ystad', 'Trelleborg'];

const Navbar = () => {
  const { cart, selectedCity, setSelectedCity } = useStore();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Menu className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold">MatBud</span>
          </Link>

          <div className="flex items-center space-x-8">
            <div className="relative">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-gray-100 transition-colors cursor-pointer font-medium text-gray-700"
                  style={{ minWidth: '140px' }}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-orange-500" />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-orange-500 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
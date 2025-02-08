import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

const paymentMethods = [
  {
    id: 'card',
    name: 'Kreditkort',
    icon: CreditCard,
    fields: ['cardNumber', 'expiry', 'cvc']
  },
  {
    id: 'swish',
    name: 'Swish',
    icon: Smartphone,
    fields: ['phone']
  },
  {
    id: 'klarna',
    name: 'Klarna',
    icon: Wallet,
    fields: ['email']
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, selectedDeliveryOption, clearCart } = useStore();
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
    city: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = selectedDeliveryOption?.price || 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and redirect to orders page
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Kassa</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Leveransadress</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gatuadress
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postnummer
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Betalningsmetod</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPayment.id === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="hidden"
                      checked={selectedPayment.id === method.id}
                      onChange={() => setSelectedPayment(method)}
                    />
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-gray-600" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </label>
                );
              })}

              {selectedPayment.id === 'card' && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kortnummer
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Utgångsdatum
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/ÅÅ"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment.id === 'swish' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              )}

              {selectedPayment.id === 'klarna' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    E-postadress
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Din beställning</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>{item.price * item.quantity} kr</span>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Delsumma</span>
                  <span>{subtotal} kr</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Leverans</span>
                  <span>{deliveryFee} kr</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Totalt</span>
                  <span>{total} kr</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {isProcessing ? (
                  <span>Bearbetar betalning...</span>
                ) : (
                  <span>Betala {total} kr</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
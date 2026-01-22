'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearCart } from '@/lib/redux/cartSlice';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const t = useTranslations('Checkout');
  const tc = useTranslations('Cart');
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    dispatch(clearCart());
  };

  if (items.length === 0 && !orderComplete) {
    router.push(`/${locale}/products`);
    return null;
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white">{t('success')}</h1>
          <p className="text-lg text-gray-300">{t('successMessage')}</p>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            className="btn-primary px-6 py-3 rounded-lg focus-ring"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-4">{t('shippingInfo')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('fullName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('address')}</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('city')}</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('zipCode')}</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-semibold text-white mb-4">{t('paymentInfo')}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('cardNumber')}</label>
                <input
                  type="text"
                  required
                  placeholder="4242 4242 4242 4242"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-2">{t('testCard')}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary py-4 rounded-lg focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? t('processing') : t('placeOrder')}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="glass rounded-2xl p-6 h-fit border border-white/5">
          <h2 className="text-xl font-semibold text-white mb-4">{t('orderSummary')}</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-cyan-300">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-300">{tc('total')}</span>
              <span className="text-white">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

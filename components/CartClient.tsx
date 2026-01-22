'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/redux/cartSlice';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

export default function CartClient() {
  const t = useTranslations('Cart');
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const { show } = useToast();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    show(quantity <= 0 ? t('removed') : t('updated'));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('empty')}</p>
        <Link href={`/${locale}/products`} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center bg-white rounded-lg shadow p-4">
              <div className="relative w-24 h-24 mr-4">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{t('quantity')}: {item.quantity}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 border rounded px-2 py-1"
                    value={item.quantity}
                    min={0}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      show(t('removed'));
                    }}
                    className="ml-4 text-red-600 hover:underline"
                  >
                    {t('removeItem')}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">{t('total')}</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Checkout</button>
          <button
            className="w-full mt-3 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200"
            onClick={() => {
              dispatch(clearCart());
              show(t('cleared'));
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

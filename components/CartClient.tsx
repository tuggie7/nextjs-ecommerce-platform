'use client';

import { useState } from 'react';
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
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    show(quantity <= 0 ? t('removed') : t('updated'));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">{t('title')}</h1>
        <p className="text-gray-300 mb-6">{t('empty')}</p>
        <Link href={`/${locale}/products`} className="btn-primary px-6 py-3 rounded-lg inline-block">
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">{t('title')}</h1>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 focus:outline-none"
            onClick={() => setZoomedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.title}
              fill
              className="object-contain drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center glass rounded-2xl p-4 border border-white/5">
              <button
                className="relative w-24 h-24 mr-4 cursor-zoom-in hover:opacity-80 transition"
                onClick={() => setZoomedImage({ src: item.image, title: item.title })}
                aria-label={`View ${item.title} image`}
              >
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </button>
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-300">{t('quantity')}: {item.quantity}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                    className="px-3 py-1 bg-white/10 rounded hover:bg-white/15 text-white"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 border border-white/10 bg-transparent text-white rounded px-2 py-1"
                    value={item.quantity}
                    min={0}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-white/10 rounded hover:bg-white/15 text-white"
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
                <div className="text-lg font-bold text-cyan-300">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="glass rounded-2xl p-6 h-fit border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">{t('total')}</span>
            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
          <Link href={`/${locale}/checkout`} className="block w-full btn-primary py-3 rounded-lg text-center focus-ring">
            Checkout
          </Link>
          <button
            className="w-full mt-3 bg-white/10 text-white py-3 rounded-lg hover:bg-white/15"
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

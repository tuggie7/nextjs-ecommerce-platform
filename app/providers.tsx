'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import { ToastProvider } from '@/components/ToastProvider';
import { useEffect } from 'react';

function StoreHydration({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        store.dispatch({ type: 'cart/hydrate', payload: cartData });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        store.dispatch({ type: 'wishlist/hydrate', payload: wishlistData });
      } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error);
      }
    }

    // Subscribe to store changes and save to localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydration>
        <ToastProvider>{children}</ToastProvider>
      </StoreHydration>
    </Provider>
  );
}

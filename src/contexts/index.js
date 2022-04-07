import { AuthProvider, AuthContext } from './auth-context';
import { AuthModalProvider, AuthModalContext } from './auth-modal-context';
import { WishlistProvider, WishlistContext } from './wishlist-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext, CartProvider } from './cart-context';
import { LoadingContext, LoadingProvider } from './loading-context';
import { ToastContext, ToastProvider } from './toast-context';
import { OrderContext, OrderProvider } from './order-context';

const Providers = props => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AuthModalProvider>
            <LoadingProvider>
              <OrderProvider>
                <CartProvider>
                  <WishlistProvider>{props.children}</WishlistProvider>
                </CartProvider>
              </OrderProvider>
            </LoadingProvider>
          </AuthModalProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export {
  Providers,
  AuthContext,
  AuthModalContext,
  WishlistContext,
  CartContext,
  LoadingContext,
  ToastContext,
  OrderContext,
};

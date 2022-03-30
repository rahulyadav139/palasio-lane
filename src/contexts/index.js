import { AuthProvider, AuthContext } from './auth-context';
import { AuthModalProvider, AuthModalContext } from './auth-modal-context';
import { WishlistProvider, WishlistContext } from './wishlist-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext, CartProvider } from './cart-context';
import { LoadingContext, LoadingProvider } from './loading-context';

const Providers = props => {
  return (
    <Router>
      <AuthProvider>
        <AuthModalProvider>
          <LoadingProvider>
            <CartProvider>
              <WishlistProvider>{props.children}</WishlistProvider>
            </CartProvider>
          </LoadingProvider>
        </AuthModalProvider>
      </AuthProvider>
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
};

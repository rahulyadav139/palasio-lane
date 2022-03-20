import { AuthProvider, AuthContext } from './auth-context';
import { AuthModalProvider, AuthModalContext } from './auth-modal-context';
import { WishlistProvider, WishlistContext } from './wishlist-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext, CartProvider } from './cart-context';

const Providers = props => {
  return (
    <Router>
      <AuthProvider>
        <AuthModalProvider>
          <CartProvider>
            <WishlistProvider>{props.children}</WishlistProvider>
          </CartProvider>
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
};

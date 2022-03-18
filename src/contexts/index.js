import { AuthProvider, AuthContext } from './auth-context';
import { AuthModalProvider, AuthModalContext } from './auth-modal-context';
import { WishlistProvider, WishlistContext } from './wishlist-context';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = props => {
  return (
    <Router>
      <AuthModalProvider>
        <AuthProvider>
          <WishlistProvider>{props.children}</WishlistProvider>
        </AuthProvider>
      </AuthModalProvider>
    </Router>
  );
};

export { Providers, AuthContext, AuthModalContext, WishlistContext };

import './App.css';
import {
  Homepage,
  Wishlist,
  ProductDetailPage,
  ProductListingPage,
  Cart,
} from './pages';

import { AuthModal } from './components';
import { useAuthModal, useAuth } from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  const { isAuth } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Navigate to="/" />} />
        <Route path="/products/:collection" element={<ProductListingPage />} />

        <Route
          path="/products/:collection/:category"
          element={<ProductListingPage />}
        />

        <Route path="/product/:prodId" element={<ProductDetailPage />} />

        {isAuth && <Route path="/wishlist" element={<Wishlist />} />}
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {isAuthModal && (
        <AuthModal
          onReset={resetModal}
          onSwitch={switchModal}
          isAuthTypeLogin={isAuthTypeLogin}
        />
      )}
    </div>
  );
}

export default App;

import './App.css';
import {
  Homepage,
  Wishlist,
  ProductDetailPage,
  ProductListingPage,
  Cart,
} from './pages';

import { AuthModal, Loading } from './components';
import { useAuthModal, useAuth, useLoading } from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  const { isAuth } = useAuth();

  const { loading } = useLoading();

  useEffect(() => {
    loading
      ? document.querySelector('body').classList.add('no-overflow')
      : document.querySelector('body').classList.remove('no-overflow');
  }, [loading]);

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
        {isAuth && <Route path="/cart" element={<Cart />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {loading && <Loading />}

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

import './App.css';
import {
  Homepage,
  Wishlist,
  ProductDetailPage,
  ProductListingPage,
  Cart,
  Checkout,
  UserProfile,
} from './pages';

import {
  AuthModal,
  Loading,
  Toast,
  ScrollTopButton,
  Header,
  Footer,
} from './components';
import { useAuthModal, useAuth, useLoading, useToast } from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  const { toast } = useToast();

  const { isAuth } = useAuth();

  const { loading } = useLoading();

  return (
    <div className="App">
      <Header />
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
        {isAuth && <Route path="/checkout/:orderId" element={<Checkout />} />}
        {isAuth && <Route path="/profile/*" element={<UserProfile />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!loading && <Footer />}

      <ScrollTopButton />

      {loading && <Loading />}

      {isAuthModal && (
        <AuthModal
          onReset={resetModal}
          onSwitch={switchModal}
          isAuthTypeLogin={isAuthTypeLogin}
        />
      )}

      {toast.status && <Toast />}
    </div>
  );
}

export default App;

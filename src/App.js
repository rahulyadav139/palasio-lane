import './App.css';
import {
  Homepage,
  Wishlist,
  ProductDetailPage,
  ProductListingPage,
  Cart,
  Checkout,
  UserProfile,
  ResetPasswordPage,
  PageNotFound,
} from './pages';

import {
  AuthModal,
  Loading,
  Toast,
  ScrollTopButton,
  Header,
  Footer,
  ForgotPassword,
  PrivateRoutes,
} from './components';
import {
  useAuthModal,
  useAuth,
  useLoading,
  useToast,
  useWishlist,
  useCart,
} from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  const { toast, setToast } = useToast();

  const { loginHandler } = useAuth();

  const { loading } = useLoading();

  const { getUpdatedWishlist } = useWishlist();

  const { getUpdatedCart } = useCart();

  useEffect(() => {
    const cookieArr = document.cookie.split(';').map(cookie => {
      const splitted = cookie.split('=');
      return { key: splitted[0], value: splitted[1] };
    });
    const token = cookieArr.find(
      cookieObject => cookieObject.key === 'token'
    )?.value;

    if (!token) return;

    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 400) {
          setToast({
            status: true,
            type: 'loading',
            message: 'You logged out!',
          });
          document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
          return;
        }

        const data = await res.json();

        const {
          fullName,
          token: useToken,
          addresses,
          email,
          wishlist,
          cart,
        } = data;

        loginHandler(fullName, useToken, addresses, email);

        getUpdatedWishlist(wishlist);

        getUpdatedCart(cart);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:collection" element={<ProductListingPage />} />

        <Route
          path="/products/:collection/:category"
          element={<ProductListingPage />}
        />

        <Route path="/product/:prodId" element={<ProductDetailPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:orderId" element={<Checkout />} />
          <Route path="/profile/*" element={<UserProfile />} />
        </Route>

        <Route
          path="/reset-password/:passwordToken"
          element={<ResetPasswordPage />}
        />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!loading && <Footer />}

      <ScrollTopButton />

      {loading && <Loading />}

      {isAuthModal && (
        <AuthModal
          onReset={resetModal}
          onSwitch={switchModal}
          isAuthTypeLogin={isAuthTypeLogin}
          onShowForgotPasswordModal={() => setIsPasswordModal(true)}
        />
      )}

      {isPasswordModal && (
        <ForgotPassword
          onHideForgotPasswordModal={() => setIsPasswordModal(false)}
        />
      )}

      {toast.status && <Toast />}
    </div>
  );
}

export default App;

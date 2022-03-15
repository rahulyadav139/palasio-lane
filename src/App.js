import './App.css';
import Homepage from './pages/Homepage';
import Wishlist from './pages/Wishlist';
import ProductListingPage from './pages/ProductListingPage';
import { AuthModal } from './components';
import { useAuthModal } from './contexts/auth-modal-context';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/products"
          element={<Navigate to="/" element={<Homepage />} />}
        />
        <Route path="/products/:collection" element={<ProductListingPage />} />

        <Route
          path="/products/:collection/:category"
          element={<ProductListingPage />}
        />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="*" element={<Homepage />} />
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

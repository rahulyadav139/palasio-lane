import { useContext } from 'react';
import {
  AuthContext,
  AuthModalContext,
  WishlistContext,
  CartContext,
  LoadingContext,
  ToastContext,
  OrderContext
} from '../contexts';

const useAuth = () => useContext(AuthContext);

const useAuthModal = () => useContext(AuthModalContext);

const useWishlist = () => useContext(WishlistContext);

const useCart = () => useContext(CartContext);

const useLoading = () => useContext(LoadingContext);

const useToast = () => useContext(ToastContext);

const useOrder = () => useContext(OrderContext)

export {
  useAuth,
  useAuthModal,
  useWishlist,
  useCart,
  useLoading,
  useToast,
  useOrder,
};

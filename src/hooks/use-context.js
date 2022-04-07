import { useContext } from 'react';
import {
  AuthContext,
  AuthModalContext,
  WishlistContext,
  CartContext,
} from '../contexts';

const useAuth = () => useContext(AuthContext);

const useAuthModal = () => useContext(AuthModalContext);

const useWishlist = () => useContext(WishlistContext);

const useCart = () => useContext(CartContext);

export { useAuth, useAuthModal, useWishlist, useCart };

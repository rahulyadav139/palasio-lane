import { useContext } from 'react';
import { AuthContext, AuthModalContext, WishlistContext } from '../contexts';

const useAuth = () => useContext(AuthContext);

const useAuthModal = () => useContext(AuthModalContext);

const useWishlist = () => useContext(WishlistContext);

export { useAuth, useAuthModal, useWishlist };

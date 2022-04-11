import './UserProfile.css';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  Profile,
  ChangePassword,
  UserAddress,
  DeleteUserAccount,
  Orders,
} from '../../components';
import { useCart, useWishlist, useOrder, useToast, useAuth } from '../../hooks';

const UserProfile = props => {
  const { getUpdatedCart } = useCart();
  const { getUpdatedWishlist } = useWishlist();
  const { resetOrderDetails } = useOrder();
  const { setToast } = useToast();
  const { logoutHandler } = useAuth();
  const navigate = useNavigate();

  const userLogoutHandler = () => {
    getUpdatedCart([]);
    getUpdatedWishlist([]);
    resetOrderDetails();
    logoutHandler();
    navigate('/');
    setToast({
      status: true,
      type: 'success',
      message: 'Logout successfully!',
    });
  };
  return (
    <main className="main">
      <div className="heading-4">Account</div>
      <div className="hr-line fad"></div>
      <div className="user-profile-container">
        <div className="user-profile-sidebar">
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/profile/orders">Orders</NavLink>
          <NavLink to="/profile/address">Address</NavLink>
          <NavLink to="/profile/change-password">Change Password</NavLink>
          <NavLink to="/profile/delete-account">Delete Account</NavLink>
          <button onClick={userLogoutHandler} className="btn primary">
            Logout
          </button>
        </div>
        <div className="user-profile-main">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<DeleteUserAccount />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};
export { UserProfile };

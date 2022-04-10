import './UserProfile.css';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Profile, ChangePassword } from '../../components';

const UserProfile = props => {
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
          <button className="btn primary">Logout</button>
        </div>
        <div className="user-profile-main">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="orders" element={<div>test</div>} />
            <Route path="address" element={<div></div>} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<div></div>} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};
export { UserProfile };

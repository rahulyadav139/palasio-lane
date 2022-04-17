import { Homepage } from '../../pages';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
const PrivateRoutes = () => {
  const { isAuth } = useAuth();
  return (
    <>{isAuth ? <Outlet /> : <Navigate to="/" element={<Homepage />} />}</>
  );
};
export { PrivateRoutes };

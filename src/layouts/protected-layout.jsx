import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/auth-store';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
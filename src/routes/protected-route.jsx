

import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/auth-store';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
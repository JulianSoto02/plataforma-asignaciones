import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'admin' | 'docente';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirigir a login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Redirigir al dashboard correspondiente si no tiene el rol adecuado
    return <Navigate to={user.role === 'admin' ? '/admin' : '/docente'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
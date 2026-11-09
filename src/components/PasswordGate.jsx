import { useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordScreen from './PasswordScreen';

export default function PasswordGate({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <PasswordScreen currentPath={location.pathname} />;
  }

  return children ? children : <Outlet />;
}

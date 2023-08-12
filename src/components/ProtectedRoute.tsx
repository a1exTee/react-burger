import { useLocation, Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { getCookie } from '../utils/data';
import { FC } from 'react';

type TProtectedRouteElement = {
  children: ReactElement,
  anonymous?: boolean
}

const ProtectedRoute: FC<TProtectedRouteElement> = ({ children, anonymous = false }) => {

  const isAuthorized = getCookie("accessToken");
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  
  if (anonymous && isAuthorized) {
    return <Navigate to={ from } />
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location}}/>
  }

  return children;
}

export default ProtectedRoute;
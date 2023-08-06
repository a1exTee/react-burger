import { useLocation, Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppSelector } from '../utils/prop-types';

type TProtectedRouteElement = {
  children: ReactElement,
  anonymous?: boolean
}

export default function ProtectedRoute({ children, anonymous = false }: TProtectedRouteElement) {

  const isAuthorized = useAppSelector((store) => store.authReducer.isAuthorized);

  const location = useLocation();
  const from = location.state?.from || '/';
  
  if (anonymous && isAuthorized) {
    return <Navigate to={ from } />
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location}}/>
  }

  return children;
}
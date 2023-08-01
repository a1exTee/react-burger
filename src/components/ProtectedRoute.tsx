import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

type TProtectedRouteElement = {
  children: ReactElement,
  anonymous?: boolean
}

export default function ProtectedRoute({ children, anonymous = false }: TProtectedRouteElement) {
  // @ts-ignore
  const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

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
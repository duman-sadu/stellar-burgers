import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchUser } from '../../services/slices/userSlice';

import { Preloader } from '../ui/preloader';

type TProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children }: TProps) => {
  const { user, isAuthChecked } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const redirectPath = location.state?.from || { pathname: '/' };
    return <Navigate to={redirectPath} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

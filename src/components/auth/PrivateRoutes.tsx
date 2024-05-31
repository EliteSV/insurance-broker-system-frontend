import { Spin } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { login, logout, setUser } from '../../store/slices/authSlice';
import { useLazyGetLoggedUserQuery } from '../../api/api';
import { useEffect } from 'react';

const PrivateRoutes = () => {
  const auth = useAppSelector((state) => state.auth);
  const [getLoggedUser, userResult] = useLazyGetLoggedUserQuery();
  const dispatch = useAppDispatch();
  const checkToken = () => {
    if (auth.token) {
      return auth.token;
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        dispatch(login({ token: storedToken }));
        return storedToken;
      }
    }
    return null;
  };

  const token = checkToken();

  useEffect(() => {
    if (token && !auth.user) {
      getLoggedUser()
        .unwrap()
        .then((data) => {
          dispatch(setUser({ user: data }));
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  });

  return token ? (
    <>
      <Outlet />
      <Spin spinning={userResult.isLoading} fullscreen size="large" />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;

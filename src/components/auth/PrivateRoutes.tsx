import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { login, setUser } from '../../store/slices/authSlice';
import { useLazyGetLoggedUserQuery } from '../../api/api';
import { useEffect } from 'react';

const PrivateRoutes = () => {
  const auth = useAppSelector((state) => state.auth);
  const [getLoggedUser] = useLazyGetLoggedUserQuery();
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
        });
    }
  });

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

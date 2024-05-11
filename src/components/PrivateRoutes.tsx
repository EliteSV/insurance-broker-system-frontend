import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'

const PrivateRoutes = () => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
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
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes
import { Result, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { isAdmin } from '../../utils/auth';

const AdminRoutes = () => {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return isAdmin(loggedUser?.rol_id) ? (
    <Outlet />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="No tienes acceso a esta página"
      extra={
        <Button type="primary" onClick={goHome}>
          Volver al inicio
        </Button>
      }
    />
  );
};

export default AdminRoutes;

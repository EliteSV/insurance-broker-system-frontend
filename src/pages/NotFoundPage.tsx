import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo siento, la página que visitaste no existe."
      extra={
        <Button type="primary" onClick={goHome}>
          Volver al inicio
        </Button>
      }
    />
  );
};

export default NotFoundPage;

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ButtonRegresar() {
    const navigate = useNavigate();
    return (
        <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Regresar
        </Button>
    )
}

export default ButtonRegresar
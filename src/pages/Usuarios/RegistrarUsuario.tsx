import { Button, Col, Row, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import UsuarioForm from '../../components/forms/UsuarioForm'
import { useCrearUsuarioMutation } from '../../api/api';

const RegistrarUsuario = () => {
    const navigate = useNavigate();
    const [crearUsuario, crearUsuarioResult] = useCrearUsuarioMutation();

    const onFinish = (values: any) => {
        crearUsuario(values).unwrap().then((res) => {
            console.log(res);
            message.success('Usuario registrado exitosamente.');
            navigate('/usuarios')
        }).catch((error) => {
            console.log(error);
            message.error('Ocurrió un error al registrar el usuario.')
        })
    }

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/usuarios')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <UsuarioForm onFinish={onFinish} isLoading={crearUsuarioResult.isLoading} requiredPassword={true} />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default RegistrarUsuario;
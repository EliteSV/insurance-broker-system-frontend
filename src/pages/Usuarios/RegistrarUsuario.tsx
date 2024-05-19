import { Col, Row, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import UsuarioForm from '../../components/forms/UsuarioForm'
import { useCrearUsuarioMutation } from '../../api/api';
import { ButtonRegresar } from '../../components/common';

const { Title } = Typography;

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
                    <ButtonRegresar />
                    <Title level={2}>Registrar Usuario</Title>
                    <UsuarioForm onFinish={onFinish} isLoading={crearUsuarioResult.isLoading} requiredPassword={true} submitText='Registrar' />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default RegistrarUsuario;
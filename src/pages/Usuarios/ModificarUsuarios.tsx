import { Col, Row, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import UsuarioForm from '../../components/forms/UsuarioForm'
import { useModificarUsuarioMutation, useGetUsuarioQuery } from '../../api/api';
import { ButtonRegresar } from '../../components/common';

const { Title } = Typography;

const ModificarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modificar, modificarResult] = useModificarUsuarioMutation();
    const { data: usuario } = useGetUsuarioQuery(Number(id));

    const onFinish = (values: any) => {
        modificar({ id: Number(id), data: values }).unwrap().then((res) => {
            console.log(res);
            message.success('Usuario modificado exitosamente.');
            navigate('/usuarios')
        }).catch((error) => {
            console.log(error);
            message.error('Ocurrió un error al modificar el usuario.')
        })
    }

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <ButtonRegresar />
                    <Title level={2}>Modificar Usuario</Title>
                    <UsuarioForm initialValues={usuario} onFinish={onFinish} isLoading={modificarResult.isLoading} requiredPassword={false} submitText='Modificar' />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default ModificarUsuario;
import {Button, Col, Row, message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import UsuarioForm from '../../components/forms/UsuarioForm'
import { useModificarUsuarioMutation, useGetUsuarioQuery } from '../../api/api';

const ModificarUsuario = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [modificar, modificarResult] = useModificarUsuarioMutation();
    const {data:usuario} = useGetUsuarioQuery(Number(id));

    const onFinish = (values: any) =>{
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('nombre',values.nombre);
        formData.append('email',values.email);
        formData.append('password',values.password);
        formData.append('rol_id',values.rol);

        modificar({ id: Number(id),formData}).unwrap().then((res)=>{
            console.log(res);
            message.success('Usuario registrado exitosamente.');
            navigate('/usuarios')
        }).catch((error) =>{
            console.log(error);
            message.error('Ocurrió un error al registrar el usuario.')
        })
    }

    return(
        <PageLayout>
                <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/usuarios')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <UsuarioForm initialValues={usuario} onFinish={onFinish} isLoading2={modificarResult.isLoading} requiredPassword={false} />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default ModificarUsuario;
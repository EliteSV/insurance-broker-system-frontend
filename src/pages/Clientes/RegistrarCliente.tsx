import { Button, Col, Row, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import ClienteForm from '../../components/forms/ClienteForm';
import { useCrearClienteMutation } from '../../api/api';
import { TipoDocumento } from '../../types/Documento';

const RegistrarCliente = () => {
    const navigate = useNavigate();
    const [crearCliente] = useCrearClienteMutation();

    const onFinish = (values: any) => {
        const formData = new FormData();
        formData.append('nombre', values.nombre);
        formData.append('email', values.email);
        formData.append('telefono', values.telefono);
        formData.append('direccion', values.direccion);
        formData.append('dui', values.dui);
        formData.append('nit', values.nit);
        formData.append('documentos[0][file]', values.documentos_dui.file)
        formData.append('documentos[0][tipo_documento_id]', TipoDocumento.DUI.toString());
        formData.append('documentos[1][file]', values.documentos_nit.file)
        formData.append('documentos[1][tipo_documento_id]', TipoDocumento.NIT.toString());
        for (let i = 0; i < values.documentos_polizas.fileList.length; i++) {
            formData.append(`documentos[${i + 2}][file]`, values.documentos_polizas.fileList[i].originFileObj);
            formData.append(`documentos[${i + 2}][tipo_documento_id]`, TipoDocumento.POLIZA.toString());
        }
        crearCliente(formData).then((res) => {
            console.log(res);
            message.success('Cliente registrado exitosamente.');
            navigate('/clientes');
        })
            .catch((error) => {
                console.error(error);
                message.error('Ocurrió un error al registrar el cliente.');
            });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/clientes')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <ClienteForm onFinish={onFinish} />
                </Col>
            </Row>
        </PageLayout>
    );
};

export default RegistrarCliente;

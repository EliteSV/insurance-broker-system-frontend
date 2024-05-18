import { Row, Col, Typography, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetClienteQuery, useModificarClienteMutation } from '../../api/api';
import ClienteForm from '../../components/forms/ClienteForm';
import { TipoDocumento } from '../../types/Documento';

const { Title } = Typography;

const ModificarCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: cliente, isLoading } = useGetClienteQuery(Number(id));
    const [modificar, modificarResult] = useModificarClienteMutation();
    const onFinish = (values: any) => {
        console.log(values);
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('nombre', values.nombre);
        formData.append('email', values.email);
        formData.append('telefono', values.telefono);
        formData.append('direccion', values.direccion);
        formData.append('dui', values.dui);
        formData.append('nit', values.nit);
        let docIndex = 0;
        if (values.documentos_dui) {
            formData.append(`documentos[${docIndex}][file]`, values.documentos_dui.file)
            formData.append(`documentos[${docIndex}][tipo_documento_id]`, TipoDocumento.DUI.toString());
            docIndex++;
        }
        if (values.documentos_nit) {
            formData.append(`documentos[${docIndex}][file]`, values.documentos_nit.file)
            formData.append(`documentos[${docIndex}][tipo_documento_id]`, TipoDocumento.NIT.toString());
            docIndex++;
        }
        if (values.documentos_polizas) {
            for (let i = 0; i < values.documentos_polizas.fileList.length; i++) {
                formData.append(`documentos[${i + docIndex}][file]`, values.documentos_polizas.fileList[i].originFileObj);
                formData.append(`documentos[${i + docIndex}][tipo_documento_id]`, TipoDocumento.POLIZA.toString());
            }
        }
        modificar({ id: Number(id), formData }).unwrap().then(() => {
            message.success('Cliente modificado con éxito.');
            navigate('/clientes');
        }).catch(() => {
            message.error('Ocurrió un error al modificar el cliente.');
        });
    };

    return (
        <PageLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                    <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate('/clientes')} style={{ marginBottom: 24 }}>
                        Regresar
                    </Button>
                    <Title level={2}>Modificar Cliente</Title>
                    <Spin spinning={isLoading}>
                        <ClienteForm initialValues={cliente} onFinish={onFinish} submitText='Modificar' requireDocs={false} isLoading={modificarResult.isLoading} />
                    </Spin>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default ModificarCliente;
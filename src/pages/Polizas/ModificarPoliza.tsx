import { Row, Col, Typography, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { useGetPolizaQuery, useModificarPolizaMutation } from '../../api/api';
import PolizaForm from '../../components/forms/PolizaForm';
import { ButtonRegresar } from '../../components/common';

const { Title } = Typography;

const ModificarPoliza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: poliza, isLoading } = useGetPolizaQuery(Number(id));
  const [modificar, modificarResult] = useModificarPolizaMutation();
  const onFinish = (values: any) => {
    const { vigencia, ...rest } = values;
    const payload = {
      ...rest,
      id: Number(id),
      fecha_inicio: vigencia[0],
      fecha_vencimiento: vigencia[1],
    };
    modificar(payload)
      .unwrap()
      .then(() => {
        message.success("Póliza modificada con éxito.");
        navigate("/polizas");
      })
      .catch(() => {
        message.error("Ocurrió un error al modificar la poliza.");
      });
  };

  return (
    <PageLayout>
        <Row align='middle' style={{ marginTop: '64px' }}>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
                <ButtonRegresar />
                <Title level={2}>Modificar Poliza</Title>
                <Spin spinning={isLoading}>
                    <PolizaForm initialValues={poliza} onFinish={onFinish} submitText='Modificar' isLoading={modificarResult.isLoading} showEstado />
                </Spin>
            </Col>
        </Row>
    </PageLayout>
);
};

export default ModificarPoliza;

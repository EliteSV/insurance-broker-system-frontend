import { Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout'

import { useGetPagosQuery } from '../../api/api';
import TablaPagos from '../../components/tablas/TablaPagos';

function PagosPage() {
    const navigate = useNavigate()
    const { data, isLoading } = useGetPagosQuery()

    const handleClick = () => {
        navigate('/pagos/registrar')
    }

    return (
        <PageLayout>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '24px' }} onClick={handleClick}>Registrar nuevo</Button>
                    <TablaPagos data={data || []} isLoading={isLoading} showPoliza />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default PagosPage

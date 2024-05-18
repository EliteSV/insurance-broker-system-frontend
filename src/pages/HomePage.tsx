import { Card, Statistic, Row, Col } from 'antd';

import {
    UserOutlined,
    InsuranceOutlined,
    SafetyOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import PageLayout from '../components/PageLayout'
import PolizasPorTipo from '../components/graficos/PolizasPorTipo';
import ClientesPorEstado from '../components/graficos/ClientesPorEstado';

function HomePage() {
    return (
        <PageLayout>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                    <Card>
                        <Statistic
                            title="Polizas Vigentes"
                            value={1128}
                            prefix={<InsuranceOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                    <Card>
                        <Statistic
                            title="Polizas Vencidas"
                            value={15}
                            prefix={<WarningOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                    <Card>
                        <Statistic
                            title="Total de Aseguradoras"
                            value={10}
                            prefix={<SafetyOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                    <Card>
                        <Statistic
                            title="Total de Clientes"
                            value={850}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Card title="Polizas por tipo" bordered={false}>
                        <PolizasPorTipo />
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Card title="Estado de Clientes" bordered={false}>
                        <ClientesPorEstado />
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    )
}

export default HomePage
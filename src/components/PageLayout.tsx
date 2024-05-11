import React, { useState } from 'react';
import {
    AreaChartOutlined,
    DollarOutlined,
    SafetyOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    CopyOutlined,
    FundOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Content, Sider } = Layout;



const items = [
    {
        key: '/',
        label: <Link to="/">Dashboard</Link>,
        icon: <PieChartOutlined />,
    },
    {
        key: '/clientes',
        label: <Link to="/clientes">Clientes</Link>,
        icon: <UserOutlined />,
    },
    {
        key: '/polizas',
        label: <Link to="/polizas">Pólizas</Link>,
        icon: <CopyOutlined />,
    },
    {
        key: '/aseguradoras',
        label: <Link to="/aseguradoras">Aseguradoras</Link>,
        icon: <SafetyOutlined />,
    },
    {
        key: '/pagos',
        label: <Link to="/pagos">Pagos</Link>,
        icon: <DollarOutlined />,
    },

    {
        key: '/reportes',
        label: <Link to="/reportes">Reportes</Link>,
        icon: <AreaChartOutlined />,
    },
    {
        key: '/contabilidad',
        label: <Link to="/contabilidad">Contabilidad</Link>,
        icon: <FundOutlined />,
    },
    {
        key: '/usuarios',
        label: <Link to="/usuarios">Usuarios</Link>,
        icon: <TeamOutlined />,
    },
    {
        key: '/logout',
        label: <Link to="/logout">Salir</Link>,
        icon: <LogoutOutlined />,
    }
];

function PageLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px', padding: '16px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default PageLayout;
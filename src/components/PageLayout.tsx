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
import { RolEnum } from '../types/Rol';
import { useAppSelector } from '../store/hooks';

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
    roles: [RolEnum.Admin, RolEnum.Gerente],
  },
  {
    key: '/contabilidad',
    label: <Link to="/contabilidad">Contabilidad</Link>,
    icon: <FundOutlined />,
    roles: [RolEnum.Admin, RolEnum.Gerente],
  },
  {
    key: '/usuarios',
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <TeamOutlined />,
    roles: [RolEnum.Admin],
  },
  {
    key: '/logout',
    label: <Link to="/logout">Salir</Link>,
    icon: <LogoutOutlined />,
  },
];

function PageLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const filteredItems = items.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(loggedUser?.rol_id as RolEnum);
  });

  return (
    <Layout style={{ width: '100%', minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onBreakpoint={(broken) => setCollapsed(broken)}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={filteredItems}
        />
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

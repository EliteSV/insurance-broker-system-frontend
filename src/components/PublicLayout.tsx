import { Layout } from 'antd';

const { Header, Content } = Layout;

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <h1 style={{ color: 'white' }}>AdminSeguros360</h1>
            </Header>
            <Content>
                {children}
            </Content >
        </Layout>
    )
}

export default PublicLayout
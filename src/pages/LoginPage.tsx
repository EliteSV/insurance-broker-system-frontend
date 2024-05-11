import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Card, Row, Form, Input, Button, Typography, message } from 'antd';
import PublicLayout from '../components/PublicLayout';
import { useLoginMutation } from '../api/api';
import { login } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginRequest, loginResult] = useLoginMutation();

    const onFinish = (values: any) => {
        loginRequest(values).unwrap().then((response) => {
            dispatch(login({ token: response.token }));
            navigate('/');
        }).catch(() => {
            message.error('Usuario o contraseña incorrectos');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <PublicLayout>
            <Row align='middle' style={{ marginTop: '64px' }}>
                <Col span={6} offset={8}>
                    <Card style={{ padding: '20px' }}>
                        <Title level={2} style={{ textAlign: 'center' }}>Iniciar sesión</Title>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder='Usuario' />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='Contraseña' />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loginResult.isLoading}>
                                    Iniciar sesión
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PublicLayout >
    );
};

export default LoginPage;

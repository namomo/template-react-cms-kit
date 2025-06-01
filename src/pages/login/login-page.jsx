import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/auth.service';
import useAuthStore from '@/stores/auth-store';
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { username, password } = values;
    try {
      const { token, user } = await loginUser({ username, password });
      console.log('[Login Success]', { token, user });
      setAuth({ token, user });
      message.success('로그인 성공');
      navigate('/dashboard');
    } catch (err) {
      message.error('로그인 실패: ' + err.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <Card style={{ width: 300 }}>
          <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
          <Form onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '사용자명을 입력하세요' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
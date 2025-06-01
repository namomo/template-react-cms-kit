import { Typography } from 'antd';
import useAuthStore from '@/stores/auth-store';

const { Title } = Typography;

const DashboardPage = () => {
  const { token } = useAuthStore();

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Dashboard</Title>
      <p>환영합니다! 로그인한 사용자: {token ? '사용자' : '알 수 없음'}</p>
    </div>
  );
};

export default DashboardPage;

import { Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import useAuthStore from '@/stores/auth-store';

const HeaderActionsDropdown = () => {
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    // 실제 환경이라면 여기서 서버 로그아웃 API 호출 등의 로직 추가 가능
    clearAuth();
  };

  const items = [
    {
      key: 'profile_info',
      label: (
        <div style={{ padding: '8px 0', minWidth: '150px' }}>
          <div style={{ fontWeight: 'bold' }}>{user?.name || '사용자'}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {user?.email || 'user@example.com'}
          </div>
        </div>
      ),
      disabled: true, // 정보 표시용이므로 클릭 방지
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '로그아웃',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click']}
      arrow
    >
      <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
        <Space>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }} // 임시 테마 색상, 필요에 따라 수정
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default HeaderActionsDropdown;

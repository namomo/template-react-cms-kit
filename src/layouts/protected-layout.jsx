import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, theme, Spin } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/auth-store';
import { getMenuItems } from '@/services/menu.service';

import ThemeToggle from '@/components/layout/theme-toggle';
import HeaderActionsDropdown from '@/components/layout/header-actions-dropdown';
import AppFooter from '@/components/layout/app-footer';
import appConfig from '@/constants/app-config';

const { Header, Sider, Content } = Layout;

// 아이콘 이름을 실제 컴포넌트로 매핑하는 객체
const iconMapper = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  SettingOutlined: <SettingOutlined />,
};

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadMenu = async () => {
      setLoading(true);
      const data = await getMenuItems();

      // 서버 또는 로컬에서 온 데이터를 antd Menu 형식에 맞게 변환
      const formattedData = data.map((item) => ({
        ...item,
        icon: iconMapper[item.icon] || null, // 문자열을 컴포넌트로 변환
      }));

      setMenuItems(formattedData);
      setLoading(false);
    };

    loadMenu();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px'
          }}
        />
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin />
          </div>
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        )}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ paddingRight: '24px', display: 'flex', alignItems: 'center' }}>
            <ThemeToggle />
            <HeaderActionsDropdown />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        {appConfig.layout.showFooter && <AppFooter />}
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;

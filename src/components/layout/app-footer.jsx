import { Layout } from 'antd';
import appConfig from '@/constants/app-config';

const { Footer } = Layout;

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{ textAlign: 'center', padding: '16px 50px' }}>
      {appConfig.siteName} ©{currentYear} Created by Template CMS Kit
    </Footer>
  );
};

export default AppFooter;

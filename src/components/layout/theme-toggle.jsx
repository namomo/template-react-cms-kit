import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import useThemeStore from '@/stores/theme-store';

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useThemeStore();
  const isDarkMode = themeMode === 'dark';

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      style={{ marginRight: '16px' }}
      title={isDarkMode ? "라이트모드로 전환" : "다크모드로 전환"}
    />
  );
};

export default ThemeToggle;

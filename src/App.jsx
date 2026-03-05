import { ConfigProvider, theme } from 'antd';
import AppRouter from '@/routes/app-router';
import useThemeStore from '@/stores/theme-store';

function App() {
  const { themeMode } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;

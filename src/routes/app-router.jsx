

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login-page';
import DashboardPage from '@/pages/dashboard/dashboard-page';
import ProtectedLayout from '@/layouts/protected-layout';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 보호된 레이아웃 안에 중첩 라우트 구성 */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* 추후 다른 보호 라우트 추가 가능 */}
      </Route>

      {/* fallback */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
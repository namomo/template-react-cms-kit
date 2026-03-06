# `template-react-cms-kit` 소스 코드 분석 보고서

### 1. 개요
해당 템플릿은 **React 19와 Vite** 환경에서 **Ant Design(antd)** 프레임워크를 기반으로 구축된 최신 어드민(백오피스) 보일러플레이트입니다. 전역 상태 관리는 **Zustand**를 사용하며, 라우팅 처리는 **React Router v6**를 활용하고 있습니다.

### 2. 주요 패키지 구성 (`package.json`)
- **React 생태계**: `react`, `react-dom` (v19.1.0), `vite` (v6.3.5)
- **UI 및 아이콘**: `antd` (v5.25.4), `@ant-design/icons` (v6.1.0)
- **라우터**: `react-router-dom` (v6.30.1)
- **상태 관리 및 데이터 페칭**: `zustand` (v5.0.5), `swr` (v2.3.3)

---

### 3. 주요 디렉토리 및 파일 구조 분석

#### 3-1. 엔트리 & 구성 (`src/main.jsx`, `src/App.jsx`)
- `main.jsx`: 서비스 최상단 진입점으로 React 트리(Strict Mode) 렌더링.
- `App.jsx`: `antd`의 `<ConfigProvider>`를 통해 전역 테마(Dark/Light) 상태를 설정하고 전체적인 라우팅 포인트(`AppRouter`)를 감싸는 역할을 합니다.

#### 3-2. 라우터 설정 (`src/routes/app-router.jsx`)
- **공개 라우트(Public Route)**: `/login` (비인증 사용자 접근 가능)
- **보호 라우트(Protected Route)**: `ProtectedLayout`으로 감싸진 라우트들(`/dashboard`). 정의되지 않은 페이지(`*`) 접근 시 `/login`으로 리다이렉트합니다.

#### 3-3. 핵심 레이아웃 (`src/layouts/protected-layout.jsx`)
- 애플리케이션의 뼈대 역할을 합니다. **Sidebar**, **Header**, **Content**, **Footer** 섹션으로 화면을 분할하여 어드민 인터페이스를 구성합니다.
- `useAuthStore`를 통해 인증된 사용자(`isAuthenticated`)인지 확인하고, 인증되지 않았다면 `/login`으로 튕겨내는 가드 역할을 합니다.
- `menu.service.js`를 호출해 동적으로 좌측 메뉴 아이템을 렌더링하도록 셋업되어 있습니다.

#### 3-4. 컴포넌트 (`src/components/layout/`)
- 헤더 영역과 관련된 작은 단위 컴포넌트들로 분리되어 있습니다.
  - `theme-toggle.jsx`: 다크모드 설정 아이콘 기능.
  - `header-actions-dropdown.jsx`: 프로필 및 로그아웃 등 헤더 우측 메뉴 트리거.
  - `app-footer.jsx`: 어드민 하단 푸터 관리 컴포넌트.

#### 3-5. 전역 상태 관리 (`src/stores/`)
- `auth-store.js`: 인증 관련 상태(token, user 정보)를 관리하며, 새로고침 시에도 세션을 유지할 수 있도록 `localStorage`와 연동되어 있습니다.
- `theme-store.js`: 다크/라이트 모드 상태 정보를 저장하는 Zustand 스토어입니다.

#### 3-6. 통신 및 서비스 (`src/libs/`, `src/services/`)
- `libs/api-client.js`: 애플리케이션 전체에서 사용할 Fetch API 래퍼입니다. 공용 헤더 주입 및 일괄적인 통신 에러 처리(Throw Exception)를 수행합니다.
- `services/auth.service.js`, `menu.service.js`: API 통신(또는 모의 Mock 데이터)을 기반으로 로그인, 로그아웃, 메뉴 호출 비즈니스 로직을 제공합니다. 

---

### 4. 종합 평가
- 코딩 룰에서 명시된 대로 코드가 적절하게 분산되고, **SRP(단일 책임 원칙)**를 어느 정도 훌륭하게 준수하고 있습니다.
- 상태(Store), 로직(Service), 통신(Libs), 뷰(Pages/Layouts) 레이어가 명확히 구별되어 있어 확장이 용이합니다.
- 네이밍 컨벤션 가이드에 따라 파일명(`kebab-case`)과 함수/Hook명(`camelCase`)이 올바르게 설계되어 있습니다.

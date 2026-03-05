# 프로젝트 아키텍처 및 소스 코드 분석

본 문서는 `template-react-cms-kit` 프로젝트의 전반적인 구조와 주요 소스 코드의 역할을 분석한 내용을 담고 있습니다.

## 1. 프로젝트 개요

`template-react-cms-kit`는 **React 19**와 **Vite**를 기반으로 구축된 백오피스(CMS/어드민)용 초기 보일러플레이트입니다. 모던 프론트엔드 환경에 맞춘 간결한 설정과 라우팅, 전역 상태 관리가 특징입니다.

### 주요 기술 스택

* **코어**: React 19, Vite
* **라우팅**: `react-router-dom` (v6)
* **전역 상태 관리**: `zustand`
* **데이터 페칭**: `swr` (명시되어 있으나 제공된 초기 구조에서는 미사용)
* **UI 프레임워크**: `antd` (Ant Design)

---

## 2. 주요 구조 및 로직 분석 (`src/` 디렉토리)

프로젝트 핵심 비즈니스 로직과 UI 컴포넌트는 모두 `src` 디렉토리에 집중되어 있습니다. 주요 디렉토리별 역할은 다음과 같습니다.

### 2.1 라우팅 및 레이아웃 (`routes/`, `layouts/`)

* **`routes/app-router.jsx`**:
  * `BrowserRouter`와 `<Routes>`, `<Route>`를 사용해 애플리케이션의 엔트리 라우팅 경로를 정의합니다.
  * 퍼블릭 라우트인 `/login` 경로와 인증된 사용자만 접근할 수 있는 `ProtectedLayout` 내부의 `/dashboard` 경로를 분리하여 관리합니다.
  * 정의되지 않은 경로(`*`) 접근 시 `/login`으로 리다이렉트 처리되는 fallback 구조를 갖추고 있습니다.

* **`routes/protected-route.jsx` / `layouts/protected-layout.jsx`**:
  * 인증(로그인)된 사용자만이 내부 페이지를 열람할 수 있도록 제한하는 가드(Guard) 컴포넌트입니다.
  * `useAuthStore` 훅을 통해 `isAuthenticated` 값을 확인하고, 인증되지 않은 경우 `<Navigate to="/login" replace />` 로 바로 되돌려 보냅니다. `ProtectedLayout`은 서브 라우트를 위해 `<Outlet />`을 렌더링합니다.

### 2.2 전역 상태 관리 (`stores/`)

* **`stores/auth-store.js`**:
  * **Zustand** 라이브러리를 사용해 전역 인증 상태를 관리합니다.
  * 관리되는 상태:
    * `token`: API 요청에 사용될 인증 토큰
    * `user`: 로그인한 사용자 정보 객체
    * `isAuthenticated`: 현재 로그인 여부 (Boolean)
  * `localStorage`와 연동하여 브라우저 새로고침이나 재접속 시에도 사용자 세션이 유지되도록 초기 설정(`getStoredAuth()`)이 포함되어 있습니다.

### 2.3 API 통신 및 서비스 모듈 (`libs/`, `services/`)

* **`libs/api-client.js`**:
  * 네이티브 `fetch` API 기반의 래퍼(Wrapper) 유틸리티 함수(`apiRequest`)를 제공합니다.
  * 기본 API URL 접두어 구성(`/api`), 공통 HTTP 헤더(`Content-Type: application/json` 등) 설정, 그리고 응답 에러 일괄 처리 기능을 담당합니다. 다른 모든 서비스 로직에서 HTTP 요청을 보낼 때 이 모듈을 확장 및 재사용하도록 설계되었습니다.

* **`services/auth.service.js`**:
  * 사용자 인증과 관련된 외부 통신 규격을 정의합니다.
  * 현재 초기 보일러플레이트 구조이므로 백엔드 서버 연동은 주석 처리되어 있으며, 대신 `Promise`와 `setTimeout`을 사용하여 0.5초 뒤에 더미 토큰과 사용자 데이터를 반환하는 **Mock(가짜) 응답 로직**이 활성화되어 있습니다. 
  * 로그인 API 연동 시 주석 처리된 부분을 해제하고 사용하면 됩니다.

### 2.4 페이지 구성 (`pages/`)

* **로그인 페이지 (`pages/login/login-page.jsx`)**:
  * `antd` UI 라이브러리의 `<Form>`, `<Card>`, `<Input>` 등을 활용하여 직관적인 로그인 폼 인터페이스를 제공합니다.
  * 사용자가 입력한 아이디/패스워드를 `auth.service.js`의 `loginUser` 함수로 전달합니다.
  * 로그인 성공 시 반환된 토큰 및 유저 정보를 Zustand의 `setAuth` 함수를 통해 스토어에 보관하고, 성공 메시지와 함께 `/dashboard`로 페이지를 전환합니다.

* **대시보드 페이지 (`pages/dashboard/dashboard-page.jsx`)**:
  * 로그인 이후에 제일 처음 보게 될 홈(Home) 화면 격인 컴포넌트입니다.
  * 전역 상태 기반의 토큰 데이터를 참조해 기초적인 UI만 렌더링하도록 되어 있으며, 추가적인 비즈니스 로직과 컴포넌트를 이 화면에 덧붙여 확장하도록 구성되어 있습니다.

---

## 3. 요약 및 확장 방향

`template-react-cms-kit` 프로젝트는 어드민, 백오피스 시스템 구축에 필수적인 **로그인 폼 화면 제공**, **토큰 관리**, **보호된 라우팅 체계** 등 기초 뼈대를 훌륭하게 제공하고 있습니다.

향후 애플리케이션의 기능 확장은 다음과 같이 진행할 수 있습니다.

1. `libs/api-client.js`의 `API_BASE_URL` 환경 변수 구성 변경 (`.env` 활용)
2. `services/` 폴더 내 도메인 별 실제 API 통신 로직 추가 구축
3. `pages/` 폴더 내 비즈니스 페이지별 컴포넌트 신규 작성
4. `routes/app-router.jsx`의 `ProtectedLayout` 자식 라우트로 신규 페이지 라우트 등록
5. 좌측 메뉴바(Side Nav)나 상단 헤더 툴바 등의 형태는 `layouts/protected-layout.jsx` 컴포넌트 내부의 구조 변경을 통해 손쉽게 구성 가능

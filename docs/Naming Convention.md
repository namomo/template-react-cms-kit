
# 🧭 React 프로젝트 네이밍 컨벤션

> 이 문서는 React 기반 프로젝트에서 사용하는 **폴더, 파일, 컴포넌트, 함수 등**의 네이밍 규칙을 정의합니다.
> **운영체제(OS) 호환성**, **Git 충돌 방지**, **가독성 및 유지보수성 향상**을 목적으로 합니다.

---

## 🗂️ 1. 디렉토리 및 파일 구조

- **kebab-case** 사용 (`-` 하이픈으로 단어 구분)
- 모두 **소문자**
- **대소문자 혼용 금지** (Git + OS 충돌 방지 목적)

### 📁 예시

```text
/components
  /interface-write
    interface-write.jsx
    interface-write.service.jsx
    interface-write.actions.jsx
    interface-write.constants.jsx
```

---

## 🧱 2. 컴포넌트

- 파일명: `kebab-case`
- 컴포넌트명: `PascalCase`
- 디렉토리 단위로 캡슐화

```jsx
// 📄 interface-write.jsx
const InterfaceWrite = () => {
  return <div>...</div>;
};
export default InterfaceWrite;
```

---

## 🧩 3. 커스텀 훅

- 함수명: `camelCase`, 반드시 `use`로 시작
- 파일명: `use-[기능].js`, `use-[기능]-effect.js` 등

```text
useInterfaceWriteEffect.js
useSaveHandler.js
```

---

## 🗃️ 3-1. Zustand 상태 관리 (Store)

- 파일명: `[기능]-store.js`, `[도메인].store.js` 등
- 디렉토리 위치 예시: `/stores/` 또는 컴포넌트 하위에 위치
- 상태 생성 함수는 `create[도메인]Store` 형태로 작성

```text
/stores
  └── interface-write-store.js
```

```js
// interface-write-store.js
import { create } from 'zustand';

const useInterfaceWriteStore = create((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
}));

export default useInterfaceWriteStore;
```

---

## 🔧 4. API / 서비스 / 네비게이션 유틸

| 파일명                   | 용도                     | 함수명 예시              |
|--------------------------|--------------------------|--------------------------|
| `*.service.js`           | 서버 요청, 데이터 가공, 처리        | `buildFormFields()`      |
| `*.actions.js`         | 사용자 액션, 페이지 이동              | `goToListPage()`         |

- 함수는 `camelCase`
- 파일명은 `kebab-case`

---

## 🔡 5. 상수 / 타입 정의

| 파일명                    | 내용             | 예시                    |
|---------------------------|------------------|-------------------------|
| `*.constants.js`          | 메시지, 키 등    | `VALIDATION_MSG`, `ACTION_KEYS` |
| `*.types.js`              | 타입, Enum 등    | `InterfaceWriteState`, `FormMode` |

---

## 🧪 6. 테스트 파일

- 파일명: `*.test.js`, `*.spec.js`
- 컴포넌트와 동일한 이름 사용

```text
interface-write.test.js
```

---

## 🎯 7. 경로 Alias (선택)

- `@components`, `@hooks`, `@utils`, `@assets` 등 alias 사용 권장

```js
// vite.config.js 또는 jsconfig.json
resolve: {
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@hooks': '/src/hooks',
    '@utils': '/src/utils'
  }
}
```

---

## ✅ 빠른 룩업 테이블

| 항목              | 예시                         | 규칙 설명                        |
|-------------------|------------------------------|----------------------------------|
| 디렉토리          | `interface-write`            | kebab-case, 소문자               |
| 컴포넌트 파일     | `interface-write.jsx`        | kebab-case                       |
| 컴포넌트명        | `InterfaceWrite`             | PascalCase                       |
| 커스텀 훅         | `useSaveHandler`             | camelCase, `use` prefix 필수     |
| 서비스            | `interface-write.service.js` | 함수는 camelCase                 |
| 사용자 액션        | `interface-write.actions.js`| 함수명: `goTo`, `navigateTo` 등 |
| 상수              | `interface-write.constants.js`| 상수명: 대문자 + 스네이크케이스 |
| 타입              | `interface-write.types.js`   | PascalCase 타입명                |

---

## 📌 기타 권장 사항

- 파일명을 변경할 땐 **`git mv`** 명령을 사용하여 Git rename 인식 문제 방지
- 가능한 한 **하나의 기능 단위(컴포넌트)를 하나의 디렉토리로 캡슐화**

---

## 📚 예시 디렉토리 구조

```text
/components/interface-write
  ├── interface-write.jsx
  ├── interface-write.service.jsx
  ├── interface-write.actions.jsx
  ├── interface-write.constants.jsx
  ├── interface-write.test.jsx
```

---

> 이 컨벤션은 협업과 유지보수를 쉽게 만들고, 코드 품질을 높이는 데 기여합니다.
> 모든 신규 컴포넌트는 이 규칙을 따르도록 합니다.


---
#naming #camelCase #kebab-case
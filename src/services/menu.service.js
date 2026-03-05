import { apiRequest } from '@/libs/api-client';
import { defaultMenuItems } from '@/constants/default-menu';

export async function getMenuItems() {
  try {
    // 백엔드 연동 시 아래 코드를 활성화하세요.
    /*
    const data = await apiRequest('/menu', {
      method: 'GET',
    });
    return data;
    */

    // 현재는 API가 없으므로 고의로 에러를 내거나 바로 fallback을 반환합니다.
    // 테스트용: 서버 응답 지연 시뮬레이션 후 fallback 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultMenuItems); // 항상 실패한다고 가정하고 로컬 fallback 제공
      }, 300);
    });

  } catch (error) {
    console.warn('메뉴 데이터를 불러오는데 실패하여 기본 메뉴를 사용합니다.', error);
    return defaultMenuItems;
  }
}

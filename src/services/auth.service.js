

import { apiRequest } from '@/libs/api-client';

export async function loginUser({ username, password }) {
  // TODO: 서버 구축 후 아래 코드 사용
  /*
  const data = await apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return {
    token: data.token,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    },
  };
  */

  // 현재는 서버가 없으므로 더미 응답 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-token-123456',
        user: {
          id: 'user-001',
          name: username,
          email: `${username}@example.com`,
        },
      });
    }, 500);
  });
}
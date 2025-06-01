import { create } from 'zustand';

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

const useAuthStore = create((set) => {
  const { token, user } = getStoredAuth();

  return {
    token,
    user,
    isAuthenticated: !!token,
    setAuth: ({ token, user }) => {
      localStorage.setItem('auth', JSON.stringify({ token, user }));
      set({ token, user, isAuthenticated: !!token });
    },
    clearAuth: () => {
      localStorage.removeItem('auth');
      set({ token: null, user: null, isAuthenticated: false });
    },
  };
});

export default useAuthStore;
import { create } from 'zustand';

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem('app-theme');
    return stored ? stored : 'light';
  } catch {
    return 'light';
  }
};

const useThemeStore = create((set) => ({
  themeMode: getStoredTheme(),
  toggleTheme: () => set((state) => {
    const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('app-theme', newTheme);
    return { themeMode: newTheme };
  }),
  setTheme: (mode) => {
    localStorage.setItem('app-theme', mode);
    set({ themeMode: mode });
  }
}));

export default useThemeStore;

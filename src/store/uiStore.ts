import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Language } from '../types';

interface UIState {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      sidebarOpen: true,

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),

      setLanguage: (language) => {
        set({ language });
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
      },

      toggleLanguage: () => set((state) => {
        const newLanguage = state.language === 'en' ? 'ar' : 'en';
        document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLanguage;
        return { language: newLanguage };
      }),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-storage',
    }
  )
);

// Initialize theme and language on load
const initialState = useUIStore.getState();
if (initialState.theme === 'dark') {
  document.documentElement.classList.add('dark');
}
if (initialState.language === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
}

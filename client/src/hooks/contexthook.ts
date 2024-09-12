import constant from '@/common/constant.js';
import { Context, createContext } from 'react';

interface ThemeAndLangContextProps {
  theme: string;
  toggleTheme: () => void;
  language: string;
  changeLanguage: (lng: string) => void;
}

export const ThemeAndLangContext: Context<ThemeAndLangContextProps> = createContext<ThemeAndLangContextProps>({
  theme: constant.theme.dark,
  toggleTheme: () => {},
  language: 'en',
  changeLanguage: () => {},
});

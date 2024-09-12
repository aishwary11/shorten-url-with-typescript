import { store } from '@/store.ts';

type Url = {
  shortUrl: string;
  longUrl: string;
  urlCode: string;
  createdAt: string;
};
type Theme = {
  dark: string;
  light: string;
};

type ThemeAndLangContextProps = {
  theme: string;
  toggleTheme: () => void;
  language: string;
  changeLanguage: (lng: string) => void;
};

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

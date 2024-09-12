import constant from '@/common/constant.js';
import { ThemeAndLangContextProps } from '@/types.js';
import { ComponentType, Context, createContext, FC, useState } from 'react';

export const ThemeAndLangContext: Context<ThemeAndLangContextProps> = createContext<ThemeAndLangContextProps>({
  theme: constant.theme.dark,
  toggleTheme: () => {},
  language: 'en',
  changeLanguage: () => {},
});

const withTheme =
  <P extends object>(WrappedComponent: ComponentType<P>): FC<P> =>
  (props: P) => {
    const [theme, setTheme] = useState(constant.theme.dark);
    const [language, setLanguage] = useState('en');

    const toggleTheme = () => setTheme(prevTheme => (prevTheme === constant.theme.dark ? constant.theme.light : constant.theme.dark));
    const changeLanguage = (lng: string) => setLanguage(lng);

    return (
      <ThemeAndLangContext.Provider value={{ theme, toggleTheme, language, changeLanguage }}>
        <WrappedComponent
          {...props}
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          changeLanguage={changeLanguage}
        />
      </ThemeAndLangContext.Provider>
    );
  };

export default withTheme;

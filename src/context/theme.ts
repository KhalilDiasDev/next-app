import { createContext, useContext } from "react";

interface props {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<props>({
  isThemeDark: true,
  toggleTheme: () => undefined,
});

export const useThemeContext = () => useContext(ThemeContext);

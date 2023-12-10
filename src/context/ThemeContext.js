import { createContext } from "react";

const ThemeContext = createContext({
  darkTheme: false,
  setDarkTheme: () => null,
});

export default ThemeContext;

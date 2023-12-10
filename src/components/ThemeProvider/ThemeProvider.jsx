import { useState, useEffect } from "react";
import ThemeContext from "../../context/ThemeContext";
// import ThemeContext from "@/context/ThemeContext";

const ThemeProvider = ({ children }) => {
  const themeFromStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("crypto-theme")
      ? JSON.parse(localStorage.getItem("crypto-theme"))
      : false;

  const [darkTheme, setDarkTheme] = useState(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState(false);
  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-white dark:bg-dark text-[#1E1E1E]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

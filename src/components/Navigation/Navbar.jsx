import { useContext } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import ThemeContext from "../../context/ThemeContext";

function Navbar() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <nav className="fixed top-0 bg-white dark:bg-dark border-b border-slate-300 dark:border-slate-700  border-bborder-porrangedark:border-pgreen dark:text-white h-20  dark:bg-darks right-0 w-full p-4 2xl:p-7 z-[200] flex items-center justify-between ">
      <h1 className=" text-xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-porrange to-sorrange dark:from-pgreen dark:to-sgreen  text-start">
        Task
      </h1>
      <div className="rounded-xl mr-3 p-[1px] shadow-mds border border-porrange dark:border-sgreen flex bg-gradient-to-r from-primary to-secondary dark:from-darkP dark:to-darkS text-base text-center items-center font-bold">
        <div className=" p-2 lg:p-3 ">
          {darkTheme ? (
            <BiSun
              onClick={() => {
                setDarkTheme(false);
                localStorage.removeItem("crypto-theme");
              }}
              className=" hover:cursor-pointer text-white font-extrabold text-xl h-6  -rotate-90 transition-all dark:rotate-90 duration-300"
            />
          ) : (
            <BiMoon
              onClick={() => {
                setDarkTheme(true);
                localStorage.setItem("crypto-theme", "true");
              }}
              className=" hover:cursor-pointer text-darkbg font-extrabold text-xl h-6  -rotate-90 transition-all dark:rotate-90 duration-300"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

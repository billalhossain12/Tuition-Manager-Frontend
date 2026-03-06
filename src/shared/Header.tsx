import { Link } from "react-router-dom";
import siteLogo from "../assets/Dollar-logo.svg";
import siteLogoWhite from "../assets/DF_Logo_White.svg";
import useTheme from "../hooks/useTheme";
import { ConfigProvider, theme as antdTheme } from "antd";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useTheme();

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (typeof setTheme === "function") {
      setTheme(checked ? "dark" : "light");
    }
  };

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <div
        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)" }}
        className="md:px-[5rem] px-[1rem] sticky top-0 bg-white dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor z-[999] flex items-center justify-between border-b-[1px] dark:border-b-gray-600 no-print md:gap-0 gap-3"
      >
        <Link to="/">
          <img
            className="w-[100px] h-[100px]"
            src={isDarkMode ? siteLogoWhite : siteLogo}
            alt="Logo Image"
          />
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-[1.1rem]">
            {" "}
            Plan · Retire · Travel · Live Better for Less
          </p>
          <DarkModeSwitch
            sunColor="orange"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

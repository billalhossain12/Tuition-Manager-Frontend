import { Icon } from "@iconify/react/dist/iconify.js";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "../redux/features/APIEndpoints/userApi/userApi";
import useTheme from "../hooks/useTheme";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  designation: string;
  profileImg: string;
  user: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MobileHeaderProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function MobileHeader({ setIsVisible }: MobileHeaderProps) {
  const { data } = useGetMeQuery(undefined);
  const user: IUser = data?.data || {};

  // Dark Mode Implementation
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
    <header className="w-full fixed z-50 h-[80px] shadow-lg bg-white dark:bg-gray-800 flex items-center justify-between p-5 md:hidden">
      <div className="flex items-center gap-3">
        <Icon
          onClick={() => setIsVisible(true)}
          className="text-gray-900 dark:text-white"
          icon="rivet-icons:menu"
          width="40"
          height="40"
        />
        <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
          TM
        </h3>
      </div>

      <div className="flex items-center gap-3">
        <div className="border-[1px] border-brand-navy dark:border-gray-600 rounded-full p-[2px]">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={user?.profileImg}
            alt="Admin Profile Image"
          />
        </div>
        <DarkModeSwitch
          sunColor="orange"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
        />
      </div>
    </header>
  );
}

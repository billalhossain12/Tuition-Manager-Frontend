import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/APIEndpoints/authApi/authSlice";
import { setActiveStyle } from "../utils/setActiveStyle";

interface AdminSidebarProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function MobileSidebar({
  setIsVisible,
  isVisible,
}: AdminSidebarProps) {
  const handleMobileViewNavClick = () => {
    if (isVisible) {
      setIsVisible(false);
    }
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure to logout?");
    if (!isConfirmed) {
      return;
    }
    dispatch(logout());
    navigate("/admin-login");
    toast.success("You are successfully logged out.");
  };

  return (
    <aside
      className={`min-h-screen p-5 min-w-60 shadow-lg shadow-right bg-white dark:bg-gray-800 text-gray-900 dark:text-white fixed md:hidden z-50 duration-300 transition-all ${isVisible ? "left-0" : "left-[-500px]"}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[25px] text-gray-900 dark:text-white">
          TM
        </h3>
        <Icon
          onClick={() => setIsVisible(false)}
          className="text-red-500 dark:text-red-400 cursor-pointer"
          icon="maki:cross"
          width="30"
          height="30"
        />
      </div>
      <nav className="mt-10">
        <ul className="space-y-8">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors mt-5"
              style={setActiveStyle}
              end
              onClick={handleMobileViewNavClick}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="students"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <FileText size={20} />
              <span>Students</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="routines"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Icon
                icon="icon-park-outline:concept-sharing"
                width="20"
                height="20"
              />
              <span>Routines</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="attendance"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Download size={20} />
              <span>Attendance</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="payments"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Icon
                icon="arcticons:digismart-consultation-ticket"
                width="20"
                height="20"
              />
              <span>Payments</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="reports"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <MessageSquare size={20} />
              <span>Reports</span>
            </NavLink>
          </li>
          <li onClick={handleMobileViewNavClick}>
            <NavLink
              to="settings"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li className="pt-16">
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

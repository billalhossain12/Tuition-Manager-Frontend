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

export default function AdminSidebar() {
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
    <aside className="min-h-screen p-5 min-w-60 shadow-lg shadow-right duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white fixed md:block hidden">
      <nav className="mt-24">
        <ul className="space-y-8">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors mt-5"
              style={setActiveStyle}
              end
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="students"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <FileText size={20} />
              <span>Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="routines"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Download size={20} />
              <span>Routines</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="attendance"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <Icon
                icon="icon-park-outline:concept-sharing"
                width="20"
                height="20"
              />
              <span>Attendance</span>
            </NavLink>
          </li>
          <li>
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
          <li>
            <NavLink
              to="reports"
              className="flex items-center gap-3 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              style={setActiveStyle}
            >
              <MessageSquare size={20} />
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
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
              className="flex items-center gap-3 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer"
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

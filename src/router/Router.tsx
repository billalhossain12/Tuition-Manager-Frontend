import { createBrowserRouter } from "react-router-dom";

import Login from "../Features/Dashboard/Pages/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../Features/Dashboard/Pages/Dashboard";
import Students from "../Features/Dashboard/Pages/Students";
import Routines from "../Features/Dashboard/Pages/Routines";
import Attendance from "../Features/Dashboard/Pages/Attendance";
import Payments from "../Features/Dashboard/Pages/Payments";
import Settings from "../Features/Dashboard/Pages/Settings";
import Reports from "../Features/Dashboard/Pages/Reports";
import Register from "../Features/Dashboard/Pages/Register";

export const router = createBrowserRouter([
  // User/Public Routes
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Protected Routes
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "routines",
        element: <Routines />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

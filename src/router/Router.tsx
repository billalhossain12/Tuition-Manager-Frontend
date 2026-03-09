import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../Features/Dashboard/Pages/Dashboard";
import Students from "../Features/Dashboard/Pages/Students/Students";
import Routines from "../Features/Dashboard/Pages/Routines/Routines";
import Attendance from "../Features/Dashboard/Pages/Attendance";
import Payments from "../Features/Dashboard/Pages/Payments";
import Settings from "../Features/Dashboard/Pages/Settings";
import Reports from "../Features/Dashboard/Pages/Reports";
import EditStudent from "../Features/Dashboard/Pages/Students/EditStudent";
import ViewStudent from "../Features/Dashboard/Pages/Students/ViewStudent";
import CreateStudent from "../Features/Dashboard/Pages/Students/CreateStudent";
import CreateRoutine from "../Features/Dashboard/Pages/Routines/CreateRoutine";
import EditRoutine from "../Features/Dashboard/Pages/Routines/EditRoutine";
import Login from "../Features/Dashboard/Pages/Auth/Login";
import Register from "../Features/Dashboard/Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import ViewRoutine from "../Features/Dashboard/Pages/Routines/ViewRoutine";

export const router = createBrowserRouter([
  // User/Public Routes
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  // Protected Routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
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
        path: "students/create",
        element: <CreateStudent />,
      },
      {
        path: "students/edit/:id",
        element: <EditStudent />,
      },
      {
        path: "students/view/:id",
        element: <ViewStudent />,
      },
      {
        path: "routines",
        element: <Routines />,
      },
      {
        path: "routines/create",
        element: <CreateRoutine />,
      },
      {
        path: "routines/edit/:id",
        element: <EditRoutine />,
      },
      {
        path: "routines/view/:id",
        element: <ViewRoutine />,
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

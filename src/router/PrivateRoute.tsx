import { ReactChild } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/features/APIEndpoints/authApi/authSlice";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute({ children }: { children: ReactChild }) {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/admin-login" replace={true} />;
  }

  return children;
}

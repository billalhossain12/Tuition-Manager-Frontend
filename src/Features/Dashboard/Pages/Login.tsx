// AdminLogin.tsx

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/APIEndpoints/authApi/authApi";
import {
  setUser,
  TUser,
} from "../../../redux/features/APIEndpoints/authApi/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { useAppDispatch } from "../../../redux/hooks";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [login, { isLoading, isError, error: loggingError }] =
    useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    const res = await login({ email, password }).unwrap();
    const user = verifyToken(res.data.accessToken) as TUser;
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    toast.success("Login success!");
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!isLoading && isError && loggingError) {
      showApiErrorToast(loggingError);
    }
  }, [isLoading, isError, loggingError]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="py-[2rem] min-h-screen flex items-start justify-center bg-gray-100 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-md dark:border-[1px] dark:border-gray-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                required
              />
              {isVisible ? (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye-off"
                />
              ) : (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye"
                />
              )}
            </div>
            <div className="flex justify-end">
              <Link
                to="/send-otp"
                className="mt-1 hover:underline cursor-pointer"
              >
                Forgot password? Reset
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading ? true : false}
            className={`w-full text-white py-2 rounded-md hover:bg-gray-800 duration-300 dark:hover:bg-neutral-700 transition flex justify-center items-center h-[45px] ${
              isLoading
                ? "bg-gray-300 hover:bg-gray-300 dark:bg-neutral-600 dark:hover:bg-neutral-600"
                : "bg-gray-700 dark:bg-neutral-700"
            }`}
          >
            {isLoading ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width="30"
                height="30"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

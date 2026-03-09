import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../../redux/features/APIEndpoints/authApi/authApi";
import { useAppDispatch } from "../../../../redux/hooks";
import { toast } from "react-toastify";
import {
  setUser,
  TUser,
} from "../../../../redux/features/APIEndpoints/authApi/authSlice";
import { verifyToken } from "../../../../utils/verifyToken";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, error: loggingError }] =
    useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      toast.error("Please enter both email and password.");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black md:px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl md:p-8 p-3">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <Icon icon="mdi:email-outline" className="text-gray-500 mr-2" />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none dark:text-white"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:border-gray-700">
              <Icon icon="mdi:lock-outline" className="text-gray-500 mr-2" />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none dark:text-white"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?
          <Link to="/register" className="text-green-600 ml-1 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

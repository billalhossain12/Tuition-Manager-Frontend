/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useSendOTPMutation } from "../../../redux/features/APIEndpoints/authApi/authApi";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";
import RedStar from "../../../components/UI/RedStar";
import { updateOTPField } from "../../../redux/features/OTP/OTP";

const SendOtpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.OTP);

  const [showError, setShowError] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [sendOTP, { isLoading, isError, error }] = useSendOTPMutation();

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      return setShowError(true);
    }
    if (email && !emailRegex.test(email)) {
      return setShowError(true);
    }

    // Implement your OTP sending logic here
    const res = await sendOTP({ email });
    if (res?.error) return;
    toast.success("OTP is sent successfully.");
    navigate("/verify-otp-form");
  };

  useEffect(() => {
    if (!isLoading && isError && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  return (
    <div className="min-h-screen flex items-start justify-center py-[2rem] bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSendOtp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
          Email Verification
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Enter your email address to receive a verification code.
        </p>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Email Address
            <RedStar />
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email here."
            value={email}
            onChange={(e) => {
              dispatch(
                updateOTPField({
                  key: "email",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        {showError && !email && (
          <p className="text-red-500 text-center">Email is required.</p>
        )}
        {showError && email && !emailRegex.test(email) && (
          <p className="text-red-500 text-center">Email is invalid.</p>
        )}
        <button
          type="submit"
          disabled={isLoading ? true : false}
          className={`w-full text-white py-2 rounded-md hover:bg-gray-800 duration-300 transition flex justify-center items-center h-[45px] mt-5 ${
            isLoading ? "bg-gray-300 hover:bg-gray-300" : "bg-gray-700"
          }`}
        >
          {isLoading ? (
            <Icon icon="eos-icons:three-dots-loading" width="30" height="30" />
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default SendOtpForm;

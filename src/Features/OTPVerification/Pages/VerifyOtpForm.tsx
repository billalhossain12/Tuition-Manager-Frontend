/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "../Components/OTPStyles.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../../redux/features/APIEndpoints/authApi/authApi";
import { updateOTPField } from "../../../redux/features/OTP/OTP";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";
import Countdown, { zeroPad } from "react-countdown";

const VerifyOtpForm: React.FC = () => {
  const navigate = useNavigate();
  const { otp, email } = useAppSelector((state) => state.OTP);
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState<boolean>(false);
  const [isOTPExpired, setIsOTPExpired] = useState(false);
  const [verifyOTP, { isLoading, isError, error }] = useVerifyOTPMutation();

  const [
    resendOTP,
    {
      isLoading: resendingOTP,
      isError: isErrorResendOTP,
      error: resendOTPError,
    },
  ] = useSendOTPMutation();

  const handleResend = async () => {
    //OTP Resending logic
    const res = await resendOTP({ email });
    if (res?.error) return;
    toast.success("OTP is sent again successfully.");
  };

  const handleOTPChange = (value: string) => {
    dispatch(updateOTPField({ key: "otp", value: value }));
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp?.trim()?.length < 6) {
      return setShowError(true);
    }
    // Implement your OTP verification logic here
    const res = await verifyOTP({ email, otp });
    if (res?.error) return;
    toast.success("OTP is Veirfied successfully.");
    navigate("/reset-password-form");
  };

  useEffect(() => {
    if (!isLoading && isError && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  useEffect(() => {
    if (!resendingOTP && isErrorResendOTP && resendOTPError) {
      showApiErrorToast(resendOTPError);
    }
  }, [resendingOTP, isErrorResendOTP, resendOTPError]);

  // Render the Countdown component with stable props
  const CountdownRenderer = ({
    seconds,
    minutes,
  }: {
    seconds: number;
    minutes: number;
  }) => (
    <div className="mt-2">
      <span className="font-bold">OTP expires in: </span>
      <span>{zeroPad(minutes)}</span>
      <span>:</span>
      <span>{zeroPad(seconds)}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-start justify-center py-[2rem] bg-gray-100 dark:bg-gray-900 px-4">
      <form className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-2">
          Verify Your Identity
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
          Enter the 6-digit code sent to your email address.
        </p>
        <div className="flex justify-center mb-2">
          <OtpInput
            value={otp}
            onChange={handleOTPChange}
            numInputs={6}
            shouldAutoFocus
            containerStyle="otp-container"
            renderInput={(props) => (
              <input
                {...props}
                className="otp-input w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mx-1"
              />
            )}
          />
        </div>
        {showError && !otp && (
          <p className=" text-red-500 text-center">OTP is required.</p>
        )}
        {showError && otp && otp.length < 6 && (
          <p className=" text-red-500  text-center">
            Please fill in the all fields!
          </p>
        )}
        <div className="flex justify-center text-orange-400">
          {isOTPExpired ? (
            <p className="text-orange-400 font-medium mt-2">
              OTP has expired! Please request a new one.
            </p>
          ) : (
            <Countdown
              date={Date.now() + 60000 * 5}
              onComplete={() => setIsOTPExpired(true)}
              renderer={CountdownRenderer}
            />
          )}
        </div>
        <div className="text-center mb-4">
          <span className="text-gray-600 dark:text-gray-300">
            Didn’t receive the code?
          </span>{" "}
          <button
            type="button"
            disabled={resendingOTP}
            onClick={handleResend}
            className="text-gray-600 hover:underline hover:text-gray-700 dark:text-gray-400 font-semibold text-sm sm:text-base mt-5"
          >
            Send Again
          </button>
        </div>
        <button
          onClick={handleVerify}
          type="button"
          disabled={isLoading}
          className={`w-full text-white py-2 duration-300 rounded-md transition flex justify-center items-center h-[45px] mt-5 ${
            isLoading ? "bg-gray-300" : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {isLoading ? (
            <Icon icon="eos-icons:three-dots-loading" width="30" height="30" />
          ) : (
            "Verify OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OTP {
  email: string;
  isVerified: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: OTP = {
  email: "",
  isVerified: "",
  otp: "",
  newPassword: "",
  confirmPassword: "",
};

const OTPSlice = createSlice({
  name: "OTP",
  initialState,
  reducers: {
    updateOTPField: (
      state,
      action: PayloadAction<{ key: keyof OTP; value: string }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetOTPFields: (state) => {
      state.newPassword = "";
      state.confirmPassword = "";
      state.otp = "";
      state.email = "";
      state.isVerified = "";
    },
  },
});

// Export actions and reducer
export const { updateOTPField, resetOTPFields } = OTPSlice.actions;
export default OTPSlice.reducer;

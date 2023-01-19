import { configureStore } from "@reduxjs/toolkit";
// Slices
import loginReducer from "../features/auth/slices/loginSlice";
import signupReducer from "../features/auth/slices/signupSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer
  }
});
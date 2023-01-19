import { configureStore } from "@reduxjs/toolkit";
// Slices
import loginReducer from "../features/auth/slices/loginSlice";
import signupReducer from "../features/auth/slices/signupSlice";
import popupReducer from "../features/popup/slices/popupSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    popup: popupReducer
  }
});
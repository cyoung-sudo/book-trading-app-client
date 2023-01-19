import { configureStore } from "@reduxjs/toolkit";
// Slices
import appReducer from "../appSlice";
import loginReducer from "../features/auth/slices/loginSlice";
import signupReducer from "../features/auth/slices/signupSlice";
import popupReducer from "../features/popup/slices/popupSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    signup: signupReducer,
    popup: popupReducer
  }
});
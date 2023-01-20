import { configureStore } from "@reduxjs/toolkit";
// Slices
import appReducer from "../appSlice";
import authReducer from "../features/auth/slices/authSlice";
import popupReducer from "../features/popup/slices/popupSlice";
import userReducer from "../features/user/slices/userSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    popup: popupReducer,
    user: userReducer
  }
});
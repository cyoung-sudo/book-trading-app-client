import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    authUser: null
  },
  reducers: {
    //----- Set authenticated user
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
    //----- Reset authenticated user
    resetUser: state => {
      state.authUser = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = appSlice.actions;

export default appSlice.reducer;
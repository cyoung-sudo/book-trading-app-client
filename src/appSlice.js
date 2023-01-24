import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    authUser: null,
    refreshToggle: false
  },
  reducers: {
    //----- Set authenticated user
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
    //----- Reset authenticated user
    resetUser: state => {
      state.authUser = null;
    },
    //----- Manual refresh
    refresh: state => {
      state.refreshToggle = !state.refreshToggle;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser, refresh } = appSlice.actions;

export default appSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null
  },
  reducers: {
    //----- Set authenticated user
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //----- Reset authenticated user
    resetUser: state => {
      state.user = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = appSlice.actions;

export default appSlice.reducer;
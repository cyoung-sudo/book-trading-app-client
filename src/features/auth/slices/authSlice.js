import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    password: ""
  },
  reducers: {
    //----- Set username
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    //----- Set password
    setPassword: (state, action) => {
      state.password = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUsername, setPassword } = authSlice.actions;

export default authSlice.reducer;
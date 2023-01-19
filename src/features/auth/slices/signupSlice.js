import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    username: "",
    password: ""
  },
  reducers: {
    //----- Set username
    setUser: (state, action) => {
      state.username = action.payload;
    },
    //----- Set password
    setPass: (state, action) => {
      state.password = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, setPass } = signupSlice.actions;

export default signupSlice.reducer;
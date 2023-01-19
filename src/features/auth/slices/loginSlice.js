import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
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
export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
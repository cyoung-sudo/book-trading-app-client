import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    user: null
  },
  reducers: {
    //----- Set users
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    //----- Set user
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setUsers, setUser } = userSlice.actions;

export default userSlice.reducer;
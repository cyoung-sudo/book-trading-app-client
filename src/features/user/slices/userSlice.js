import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: []
  },
  reducers: {
    //----- Set users
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
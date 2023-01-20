import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    fullName: "",
    city: "",
    state: ""
  },
  reducers: {
    //----- Set full-name
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    //----- Set city
    setCity: (state, action) => {
      state.city = action.payload;
    },
    //----- Set state
    setState: (state, action) => {
      state.state = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setFullName, setCity, setState } = settingSlice.actions;

export default settingSlice.reducer;
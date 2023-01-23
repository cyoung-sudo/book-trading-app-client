import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    title: "",
    description: ""
  },
  reducers: {
    //----- Set title
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    //----- Set description
    setDescription: (state, action) => {
      state.description = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setTitle, setDescription } = bookSlice.actions;

export default bookSlice.reducer;
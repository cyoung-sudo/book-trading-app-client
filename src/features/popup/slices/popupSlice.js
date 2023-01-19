import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    message: "",
    type: ""
  },
  reducers: {
    //----- Set popup
    setPopup: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    //----- Reset popup
    resetPopup: state => {
      state.message = "";
      state.type = "";
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPopup, resetPopup } = popupSlice.actions;

export default popupSlice.reducer;
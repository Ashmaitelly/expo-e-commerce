import { createSlice } from "@reduxjs/toolkit";

const appSLice = createSlice({
  name: "app",
  initialState: { language: "en" },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = appSLice.actions;
export default appSLice.reducer;

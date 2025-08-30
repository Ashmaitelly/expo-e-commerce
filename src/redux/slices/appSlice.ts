import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSLice = createSlice({
  name: "app",
  initialState: { language: "en", username: "", loggedIn: false },
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = "";
      state.loggedIn = false;
    },
  },
});

export const { setLanguage, login, logout } = appSLice.actions;
export default appSLice.reducer;

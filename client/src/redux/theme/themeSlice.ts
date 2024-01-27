import { createSlice } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export interface IThemeState {
  theme: Theme;
}

const initialState: IThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

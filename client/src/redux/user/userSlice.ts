import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  username: string;
  email: string;
  profilePicture: string;
}

export interface IUserState {
  currentUser: IUser | undefined;
  error: any;
  loading: any;
}

const initialState: IUserState = {
  currentUser: undefined,
  error: undefined,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    signFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signFailure } = userSlice.actions;

export default userSlice.reducer;

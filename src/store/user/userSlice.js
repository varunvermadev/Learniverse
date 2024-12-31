import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginReducer, removeUserReducer } from "./reducer";
import { fetchLogin } from "./thunk";

const initialState = {
  name: "",
  email: "",
  token: "",
  isAuth: false,
  role: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: removeUserReducer,
  },
  extraReducers: (builder) =>
    builder.addCase(fetchLogin.fulfilled, fetchLoginReducer),
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;

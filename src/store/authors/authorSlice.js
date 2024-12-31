import { createSlice } from "@reduxjs/toolkit";

import { addAuthor, removeAuthor, saveAuthors } from "./thunk";

import {
  addAuthorReducer,
  removeAuthorReducer,
  saveAuthorsReducer,
} from "./reducers";

const authorSlice = createSlice({
  name: "authors",
  initialState: {
    authors: [],
  },

  extraReducers: (builder) =>
    builder
      .addCase(saveAuthors.fulfilled, saveAuthorsReducer)
      .addCase(addAuthor.fulfilled, addAuthorReducer)
      .addCase(removeAuthor.fulfilled, removeAuthorReducer),
});

export default authorSlice.reducer;

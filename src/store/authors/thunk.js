import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAddAuthor,
  getAuthors,
  getRemoveAuthor,
} from "../../services/services";

import { ADD_AUTHOR, REMOVE_AUTHOR, SAVE_AUTHORS } from "./types";

export const saveAuthors = createAsyncThunk(SAVE_AUTHORS, async function () {
  const res = await getAuthors();
  return res;
});

export const addAuthor = createAsyncThunk(ADD_AUTHOR, async function (author) {
  const res = await getAddAuthor(author);
  return res;
});

export const removeAuthor = createAsyncThunk(
  REMOVE_AUTHOR,
  async function (id) {
    const res = await getRemoveAuthor(id);
    if (res.successful) return id;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLogin } from "../../services/services";
import { FETCH_LOGIN } from "./types";

export const fetchLogin = createAsyncThunk(
  FETCH_LOGIN,
  async function (formData) {
    const { result, user, successful } = await getLogin(formData);
    if (!successful)
      throw new Error(
        "❌ Invalid Data! Please try with correct name, email and password "
      );

    localStorage.setItem("token", result);

    return { ...user, token: result };
  }
);

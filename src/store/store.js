import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import authorsReducer from "./authors/authorSlice";
import coursesReducer from "./courses/coursesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    authors: authorsReducer,
    courses: coursesReducer,
  },
});

export default store;

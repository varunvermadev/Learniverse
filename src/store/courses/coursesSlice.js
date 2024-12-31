import { createSlice } from "@reduxjs/toolkit";

import {
  createCourse,
  deleteCourse,
  saveCourses,
  updateCourse,
} from "./thunks";

import {
  createCourseReducer,
  deleteCourseReducer,
  saveCoursesReducer,
  updateCourseReducer,
} from "./reducer";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  extraReducers: (builder) =>
    builder
      .addCase(saveCourses.fulfilled, saveCoursesReducer)
      .addCase(deleteCourse.fulfilled, deleteCourseReducer)
      .addCase(updateCourse.fulfilled, updateCourseReducer)
      .addCase(createCourse.fulfilled, createCourseReducer),
});

export default coursesSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CREATE_COURSE,
  DELETE_COURSE,
  SAVE_COURSE,
  UPDATE_COURSE,
} from "./types";

import {
  getCourses,
  getDeleteCourse,
  getNewCourse,
  getUpdateCourse,
} from "../../services/services";

const saveCourses = createAsyncThunk(SAVE_COURSE, async function () {
  const res = await getCourses();
  return res;
});

const deleteCourse = createAsyncThunk(DELETE_COURSE, async function (id) {
  const res = await getDeleteCourse(id);
  if (res.successful) return id;
});

const updateCourse = createAsyncThunk(
  UPDATE_COURSE,
  async function (courseData) {
    const res = await getUpdateCourse(courseData);
    if (res.successful) return res.result;
  }
);

const createCourse = createAsyncThunk(
  CREATE_COURSE,
  async function (courseData) {
    const res = await getNewCourse(courseData);
    if (res.successful) return res.result;
  }
);

export { saveCourses, deleteCourse, updateCourse, createCourse };

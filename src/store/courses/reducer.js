const saveCoursesReducer = (state, action) => {
  state.courses = action.payload ?? [];
};

const deleteCourseReducer = (state, action) => {
  state.courses = state.courses.filter(
    (course) => course.id !== action.payload
  );
};

const updateCourseReducer = (state, action) => {
  state.courses = state.courses.filter(
    (course) => course.id !== action.payload.id
  );
  state.courses.push(action.payload);
};

const createCourseReducer = (state, action) => {
  state.courses.push(action.payload);
};

export {
  saveCoursesReducer,
  deleteCourseReducer,
  updateCourseReducer,
  createCourseReducer,
};

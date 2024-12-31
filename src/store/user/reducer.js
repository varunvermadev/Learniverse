export const fetchLoginReducer = (state, action) => {
  state.name = action.payload.name;
  state.email = action.payload.email;
  state.token = action.payload.token;
  state.isAuth = true;
  state.role = action.payload.email === "admin@email.com" ? "ADMIN" : "USER";
};

export const removeUserReducer = (state) => {
  state.name = "";
  state.email = "";
  state.token = "";
  state.isAuth = false;
};

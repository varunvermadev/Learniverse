const saveAuthorsReducer = (state, action) => {
  state.authors = action.payload ?? [];
};

const addAuthorReducer = (state, action) => {
  state.authors.push(action.payload);
};

const removeAuthorReducer = (state, action) => {
  state.authors = state.authors.filter(
    (author) => author.id !== action.payload
  );
};

export { saveAuthorsReducer, addAuthorReducer, removeAuthorReducer };

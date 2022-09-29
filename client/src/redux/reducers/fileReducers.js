import {
  GET_FILES,
  GET_CATEGORIES,
  GET_FILES_BY_CATEGORY,
  GET_FILES_BY_USER,
  GET_PRIVATE_FILES_BY_USER,
  ADD_FILE,
  FILE_LOADING
} from "../actions/types";

const initialState = {
  files: [],
  categories: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
      console.log(state)
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case GET_CATEGORIES:
      console.log(state)
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case GET_FILES_BY_CATEGORY:
      console.log(state)
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case GET_FILES_BY_USER:
      console.log(state)
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case GET_PRIVATE_FILES_BY_USER:
      console.log(state)
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case ADD_FILE:
      console.log(state)
      return {
        ...state,
        file: action.payload,
        loading: false
      };
    case FILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

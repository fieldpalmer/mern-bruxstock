import {
  GET_FILES,
  ADD_FILE,
  SELECT_FILE,
  GET_USER_FILES,
  FILE_LOADING
} from "../actions/types";

const initialState = {
  files: [],
  userFiles: [],
  currentFile: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case GET_USER_FILES:
      return {
        ...state,
        userFiles: action.payload,
        loading: false
      };
    case SELECT_FILE:
      return {
        ...state,
        currentFiles: action.payload,
        loading: false
      };
    case ADD_FILE:
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

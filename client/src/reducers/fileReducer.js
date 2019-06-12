import {
  GET_FILE,
  GET_FILES,
  // GET_USER_FILES,
  FILE_LOADING
  // SET_CURRENT_USER,
  // GET_ERRORS
} from "../actions/types";

const initialState = {
  files: [],
  file: "",
  // userFiles: [],
  loading: false
  // errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILE:
      return {
        ...state,
        file: action.payload,
        loading: true
      };
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
        loading: true
      };
    case FILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

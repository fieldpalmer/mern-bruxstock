import axios from "axios";
import {
  ADD_FILE,
  GET_ERRORS,
  GET_FILE,
  GET_FILES,
  GET_CATEGORIES,
  GET_USER_FILES,
  FILE_LOADING
} from "./types";

// view selected file
export const getFile = filename => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/files/${filename}`)
    .then(res =>
      dispatch({
        type: GET_FILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all files
export const getFiles = () => dispatch => {
  dispatch(setFileLoading());
  axios
    .get("/api/files")
    .then(res =>
      dispatch({
        type: GET_FILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all categories
export const getCategories = () => dispatch => {
  dispatch(setFileLoading());
  axios
    .get("/api/files/categories")
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get user files
export const getUserFiles = userid => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/files/portfolio/${userid}`)
    .then(res =>
      dispatch({
        type: GET_USER_FILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add file
export const addFile = (fileData, history) => dispatch => {
  dispatch(setFileLoading());
  axios
    .post("/api/files/upload", fileData)
    .then(res =>
      dispatch(
        {
          type: ADD_FILE,
          payload: res.data
        },
        window.location.reload()
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};

// file loading
export const setFileLoading = () => {
  return {
    type: FILE_LOADING
  };
};

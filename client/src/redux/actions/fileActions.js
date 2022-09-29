import axios from "axios";
import {
  ADD_FILE,
  GET_ERRORS,
  GET_FILE,
  GET_FILES,
  GET_CATEGORIES,
  GET_FILES_BY_CATEGORY,
  GET_FILES_BY_USER,
  GET_PRIVATE_FILES_BY_USER,
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

// get files by category
export const getFilesByCategory = category => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/files/category/${category}`)
    .then(res =>
      dispatch({
        type: GET_FILES_BY_CATEGORY,
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

// get files by user
export const getFilesByUser = _id => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/files/user/${_id}`)
    .then(res =>
      dispatch({
        type: GET_FILES_BY_USER,
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

// get public AND private files for user
export const getPrivateFilesByUser = _id => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/files/user/private/${_id}`)
    .then(res =>
      dispatch({
        type: GET_PRIVATE_FILES_BY_USER,
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
  console.log(fileData);
  dispatch(setFileLoading());
  console.log(fileData);
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
        payload: err.response.data
      })
    );
};

// file loading
export const setFileLoading = () => {
  return {
    type: FILE_LOADING
  };
};

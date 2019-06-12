import axios from "axios";
import {
  GET_FILE,
  GET_FILES,
  GET_USER_FILES,
  FILE_LOADING,
  // SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

// get current file
export const getCurrentFile = filename => dispatch => {
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
        type: GET_FILE,
        payload: {}
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
        type: GET_FILES,
        payload: null
      })
    );
};

// get files by user id
export const getFilesByUserId = id => dispatch => {
  dispatch(setFileLoading());
  axios
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_FILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_FILES,
        payload: null
      })
    );
};

// create file
export const createfile = (fileData, history) => dispatch => {
  axios
    .post("/api/files/upload", fileData)
    .then(res => history.push("/dashboard"))
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

// delete file
export const deleteFile = id => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    axios
      .delete(`/api/files/delete/:${id}`)
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
  }
};
// };

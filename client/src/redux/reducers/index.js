import { combineReducers } from "redux";
import fileReducer from "./fileReducers";
import authReducer from "./authReducers";

export default combineReducers({
  files: fileReducer,
  auth: authReducer
});

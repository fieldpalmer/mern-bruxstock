import { combineReducers } from "redux";
import fileReducer from "./fileReducers";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  files: fileReducer,
  auth: authReducer,
  errors: errorReducer
});

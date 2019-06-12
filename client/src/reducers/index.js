import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fileReducer from "./fileReducer";

export default combineReducers({
  files: fileReducer,
  error: errorReducer,
  auth: authReducer
});

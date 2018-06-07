import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errReducer,
  profile: profileReducer,
  post: postReducer
});

export default appReducer;

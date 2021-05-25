import { combineReducers } from "redux";
import taskReducers from "./task/redux";

const rootReducer = combineReducers({
  task: taskReducers
});

export default rootReducer;
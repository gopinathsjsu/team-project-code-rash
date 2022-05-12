import {modifyReducer}  from "./modify";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    modifyData: modifyReducer
});

export default rootReducer;
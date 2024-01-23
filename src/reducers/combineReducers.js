// import { documentReducer } from "./documents/reducer";
import { authReducer } from "./authReducer";
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
    // documentReducer,
    authReducer
})
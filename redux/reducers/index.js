import { combineReducers } from "redux";
import { scoreReducer } from "./scoreReducer";

export const rootReducer = combineReducers({ scores: scoreReducer });

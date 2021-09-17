import { combineReducers } from "redux";
import { constructorReducer } from './burgers-constructor';
import { userInfoReducer } from "./user-info";
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers(
  {
    burgersConstructor: constructorReducer,
    userInfo: userInfoReducer,
    ordersInfo: wsReducer
  }
)

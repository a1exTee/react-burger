import { burgerConstructorReducer } from "./burger-constructor/burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients";
import { modalReducer } from "./modal/modal";
import { orderReducer } from "./order/order";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  modalReducer,
  orderReducer,
});
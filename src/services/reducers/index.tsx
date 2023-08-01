import { burgerConstructorReducer } from "./burger-constructor/burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients";
import { modalReducer } from "./modal/modal";
import { orderReducer } from "./order/order";
import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  modalReducer,
  orderReducer,
  authReducer
});

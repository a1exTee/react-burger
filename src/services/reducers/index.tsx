import { burgerConstructorReducer } from "./burger-constructor/burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients";
import { modalReducer } from "./modal/modal";
import { orderReducer } from "./order/order";
import { currentOrderReducer } from "./order/current-order";
import { combineReducers } from "redux";
import { userInfoReducer } from "./auth/auth";
import { wsReducer } from "./ws/ws-reducers";
import { wsAuthReducer } from "./ws/ws-auth-reducers";
import { resetPasswordReducer } from "./auth/reset-password";
 

export const rootReducer = combineReducers({
  burgerConstructorReducer,
  burgerIngredientsReducer,
  modalReducer,
  orderReducer,
  userInfoReducer,
  currentOrderReducer,
  wsReducer,
  wsAuthReducer,
  resetPasswordReducer
});  

export type RootState = ReturnType<typeof rootReducer>;
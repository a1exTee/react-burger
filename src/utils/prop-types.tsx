import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { Action, ActionCreator } from "redux";
import { ReactElement } from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../../src/index";
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR } from "../services/actions/order/order";
import { RESET_CONSTRUCTOR } from "../services/actions/burger-constructor/burger-constructor";
import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR, MODAL_ADD_INGREDIENT, MODAL_DEL_INGREDIENT } from "../services/actions/burger-ingredients/burger-ingredients";


export type TServerResponse<T> = {
  success: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TSetOrderResponse = TServerResponse<{
  order: TOrder;
}>;


//////////////////////

export interface ImodalAddIngredient {
  readonly type: typeof MODAL_ADD_INGREDIENT;
  ingr: TIngredient[] | null;
}

export interface ImodalDeleteIngredient {
  readonly type: typeof MODAL_DEL_INGREDIENT;
}


export type TError = {
  success?: boolean;
  message?: string
}

export type TClearConstructor = {
  readonly type: typeof RESET_CONSTRUCTOR;
  name: '';
};

export type TGetIngredientsRequest = {
  readonly type: typeof INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccess = {
  readonly type: typeof INGREDIENTS_SUCCESS;
  ingr: TIngredient[] | null;
};

export type TGetIngredientsFailed = {
  readonly type: typeof INGREDIENTS_ERROR;
  error: string;
};

export type TGetNumberOrder = {
  readonly type: typeof ORDER_REQUEST;
};

export type TGetNumberOrderSuccess = {
  readonly type: typeof ORDER_SUCCESS;
  name: string;
  number: number
};

export type TGetNumberOrderFailed = {
  readonly type: typeof ORDER_ERROR;
  error: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TConstructorState = {
  bun: TIngredient | null;
  ingredientsConstructor: TIngredient[];
};

export type TIngredientState = {
  ingredients: TIngredient[] | null;
  request: boolean;
  failed: boolean;
};

export type TOrderIngredient = TIngredient & {
  count: number;
};


export type TUser = {
  name: string;
  email: string;
  password?: string;
};

export type TUserState = {
  user: TUser | null;
  isAuthChecked: Boolean;
};


export type TOrderStatus = "created" | "pending" | "done";

export type TOrder = {
  _id: string;
  name: string;
  ingredients: Array<string>;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TSelectIngredientState = {
  ingredient: TIngredient | null;
};

export type TSelectedOrderState = {
  order: TOrder | null;
};


export type TDragged = {
  id: number;
  ingredient: TIngredient;
};

export enum Category {
  BUN = "bun",
  SAUCE = "sauce",
  MAIN = "main",
}


export type TModal = {
  children: ReactElement,
  closeModal: () => void,
  title?: string
}

export type TOverlay = {
  children: ReactElement,
  onClick: () => void,
}

export type TOrderDetails = {
  numberOrder: number,
  loader: boolean,
}

export type TGetIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsFailed
  | ImodalAddIngredient
  | ImodalDeleteIngredient;
export type TGetNumberOrderActions =
  | TGetNumberOrder
  | TGetNumberOrderSuccess
  | TGetNumberOrderFailed
  | TClearConstructor;
/*export type TIngredientDetailsActions =
  | TSelectIngredient
  | TDeleteInfoIngredient;
export type TBurgerConstructorActions =
  | TAddIngredient
  | TAddBun
  | TDeleteIngredient
  | TMoveIngredient
  | TClearConstructor;*/


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TApplicationActions = TGetIngredientsActions | TGetNumberOrderActions 
/*| TIngredientDetailsActions | TBurgerConstructorActions | TRestorePasswordActions
 | TRegisterUserActions | TResetPasswordActions | TLoginActions | TUpdateTokenActions | 
 TGetUserActions | TLogoutActions | TPatchUserActions | TWebSocketActions | TWebSocketUserActions*/ ;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, Action, TApplicationActions>>;

type DispatchFunc = () => AppDispatch | AppThunk;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;


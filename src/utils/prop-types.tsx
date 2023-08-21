import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { Action, ActionCreator } from "redux";
import { ReactElement } from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store";
import { RootState } from "../services/reducers";
import { RESET_CONSTRUCTOR } from "../services/actions/burger-constructor/burger-constructor";
import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR, MODAL_ADD_INGREDIENT, MODAL_DEL_INGREDIENT } from "../services/actions/burger-ingredients/burger-ingredients";
import { TResetPasswordActions } from "../services/actions/auth/reset-password";
import { TCurrentOrderActions } from "../services/actions/order/current-order";
import { TIngrediensConstructorActions } from "../services/actions/burger-constructor/burger-constructor";
import { TLoginActions } from "../services/actions/auth/auth";
import { TWsActions } from "../services/actions/ws/ws-actions";
import { TWsAuthActions } from "../services/actions/ws/ws-auth-actions";
import { TIngredientsDataActions } from "../services/actions/burger-ingredients/burger-ingredients";



//import { TIngredientInfoActions } from "../services/actions/ingredient";
//import { TOrderActions } from "../services/actions/order";


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

/*export type TConstructorIngredient = TIngredient & {
  id: string;
};*/

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
  status: TOrderStatus; //string
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


export type TModal = {
  children: ReactElement,
  closeModal: () => void,
  title?: string
}

export type TOverlay = {
  children?: ReactElement,
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

/*export type TIngredientDetailsActions =
  | TSelectIngredient
  | TDeleteInfoIngredient;
export type TBurgerConstructorActions =
  | TAddIngredient
  | TAddBun
  | TDeleteIngredient
  | TMoveIngredient
  | TClearConstructor;*/ 



export type TApplicationActions = TGetIngredientsActions | TResetPasswordActions
| TCurrentOrderActions | TIngrediensConstructorActions | TLoginActions | TWsActions | TWsAuthActions | TIngredientsDataActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, Action, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch | AppThunk;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;
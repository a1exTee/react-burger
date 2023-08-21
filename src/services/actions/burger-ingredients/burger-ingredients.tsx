import { requestIngredients } from "../../../utils/data";
import { TIngredient, AppThunk, AppDispatch } from "../../../utils/prop-types";

export const INGREDIENTS_REQUEST: "INGREDIENTS_REQUEST" = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS: "INGREDIENTS_SUCCESS" = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR: "INGREDIENTS_ERROR" = "INGREDIENTS_ERROR";
export const MODAL_ADD_INGREDIENT: "MODAL_ADD_INGREDIENT" = 'MODAL_ADD_INGREDIENT';
export const MODAL_DEL_INGREDIENT: "MODAL_DEL_INGREDIENT" = 'MODAL_DEL_INGREDIENT';


export interface IGetIngredientsRequest {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof INGREDIENTS_SUCCESS; 
  payload: Array<TIngredient>
}

export interface IGetIngredientsFailed {
  readonly type: typeof INGREDIENTS_ERROR;
}

export type TIngredientsDataActions = 
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  ;

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (payload: Array<TIngredient>): IGetIngredientsSuccess => ({
  type: INGREDIENTS_SUCCESS,
  payload
});

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: INGREDIENTS_ERROR,
});


export const getIngredients: AppThunk<void> = () =>  {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
  
    requestIngredients()
      .then((data) => {
        dispatch({ type: INGREDIENTS_SUCCESS, ingr: data.data });
      })
      .catch((err) => {
        dispatch({ type: INGREDIENTS_ERROR, error: err });
        //dispatch({ type: RESET_CONSTRUCTOR });
      });
  };
}

export const modalAddIngredient = (res: TIngredient) => ({
  type: MODAL_ADD_INGREDIENT,
  ingr: res,
});

export const modalDeleteIngredient = () => ({
  type: MODAL_DEL_INGREDIENT,
});  
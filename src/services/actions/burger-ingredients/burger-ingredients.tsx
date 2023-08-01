import { requestIngredients } from "../../../utils/data";
import { apiUrl } from "../../../utils/data";
import { TIngredient, AppThunk, AppDispatch } from "../../../utils/prop-types";

export const INGREDIENTS_REQUEST: "INGREDIENTS_REQUEST" = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS: "INGREDIENTS_SUCCESS" = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR: "INGREDIENTS_ERROR" = "INGREDIENTS_ERROR";
export const MODAL_ADD_INGREDIENT: "MODAL_ADD_INGREDIENT" = 'MODAL_ADD_INGREDIENT';
export const MODAL_DEL_INGREDIENT: "MODAL_DEL_INGREDIENT" = 'MODAL_DEL_INGREDIENT';


export const getIngredients: AppThunk<void> = () =>  {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
    // @ts-ignore
    requestIngredients(`${apiUrl}ingredients`)
      .then((data) => {
        dispatch({ type: INGREDIENTS_SUCCESS, ingr: data.data });
      })
      .catch((err) => {
        dispatch({ type: INGREDIENTS_ERROR, error: err });
        //dispatch({ type: RESET_CONSTRUCTOR });
      });
  };
}

export const modalAddIngredient = (res: object) => ({
  type: MODAL_ADD_INGREDIENT,
  ingr: res,
});

export const modalDeleteIngredient = () => ({
  type: MODAL_DEL_INGREDIENT,
});

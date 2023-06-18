import { requestIngredients } from "../../../utils/data";
import { apiUrl } from "../../../utils/data";
import { RESET_CONSTRUCTOR } from "../burger-constructor/burger-constructor";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const MODAL_ADD_INGREDIENT = 'MODAL_ADD_INGREDIENT';
export const MODAL_DEL_INGREDIENT = 'MODAL_DEL_INGREDIENT';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
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

export const modalAddIngredient = (res) => ({
  type: MODAL_ADD_INGREDIENT,
  ingr: res,
});

export const modalDeleteIngredient = () => ({
  type: MODAL_DEL_INGREDIENT,
});
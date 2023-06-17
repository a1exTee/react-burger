import { requestIngredients } from "../../../utils/data";
import { apiUrl } from "../../../utils/data";
import { RESET_CONSTRUCTOR } from "../burger-constructor/burger-constructor";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCSESS = "INGREDIENTS_SUCCSESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
    requestIngredients(`${apiUrl}ingredients`)
      .then((data) => {
        dispatch({ type: INGREDIENTS_SUCCSESS, ingr: data.data });
      })
      .catch((err) => {
        dispatch({ type: INGREDIENTS_ERROR, error: err });
        dispatch({ type: RESET_CONSTRUCTOR });
      });
  };
}
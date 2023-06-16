import { apiUrl } from "../../../utils/data";
import { requestIngredients } from "../../../utils/data";
import { RESET_CONSTRUCTOR } from "../burger-constructor/burger-constructor";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCSESS = "ORDER_SUCCSESS";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLEAN_ORDER = "CLEAN_ORDER";

export function sendOrder(ingr) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });

    requestIngredients(`${apiUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingr.map((el) => el._id) }),
    })
      .then((order) => {
        dispatch({ type: ORDER_SUCCSESS, order: order.order });
        dispatch({ type: RESET_CONSTRUCTOR });
      })
      .catch((err) => {
        dispatch({ type: ORDER_ERROR, error: err });
        dispatch({ type: RESET_CONSTRUCTOR });
      });
  };
}
import { orderData } from "../../../utils/order-data";
import { RESET_CONSTRUCTOR } from "../burger-constructor/burger-constructor";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const sendOrder = (idArray) => {
  return function(dispatch) {
  dispatch({
    type: ORDER_REQUEST,
  });

  orderData(idArray)
    .then(res => {
      if(res) {
        dispatch({
          type: ORDER_SUCCESS,
          number: res.order.number,
          name: res.name
        })
      }
    })
    .then(() => {
      dispatch({
        type: RESET_CONSTRUCTOR,
      })
    })
    .catch(() => {
      dispatch({
        type: ORDER_ERROR,
      })
    })
}}

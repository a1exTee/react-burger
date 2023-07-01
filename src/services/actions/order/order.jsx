import { RESET_CONSTRUCTOR } from "../burger-constructor/burger-constructor";
import { apiUrl, checkResponse } from "../../../utils/data";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";


export const getOrderData = (idArray) => {
  return fetch(`${apiUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': idArray
    })
  })
  .then((res) => checkResponse(res))
}

export const sendOrder = (idArray) => {
  return function(dispatch) {
  dispatch({
    type: ORDER_REQUEST,
  });

  getOrderData(idArray)
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

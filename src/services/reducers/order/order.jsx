import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR} from "../../actions/order/order";
  
  const initialState = {
    order: null,
    orderRequest: false,
    orderError: false,
    name: '',
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_REQUEST: {
        return { ...state, orderRequest: true, orderError: false };
      }
      case ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          name: action.name,
          order: action.number,
        };
      }
      case ORDER_ERROR: {
        return {...initialState, orderError: true };
      }
  
      default: {
        return state;
      }
    }
  };
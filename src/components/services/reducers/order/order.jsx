import {ORDER_REQUEST, ORDER_SUCCSESS, ORDER_ERROR, CLEAN_ORDER} from "../../actions/order/order";
  
  const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_REQUEST: {
        return { ...state, orderRequest: true };
      }
      case ORDER_SUCCSESS: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: false,
          order: action.order,
        };
      }
      case ORDER_ERROR: {
        return { ...state, orderRequest: false, orderFailed: true };
      }
      case CLEAN_ORDER: {
        return { ...state, order: {} };
      }
  
      default: {
        return state;
      }
    }
  };
import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR} from "../../actions/order/order";
import { TGetNumberOrderActions } from "../../../utils/prop-types";

type TGetNumberOrderState = {
  order: number | undefined,
  orderRequest: boolean,
  orderError: boolean,
  name: string,
}

export const initialState: TGetNumberOrderState = {
  order: undefined,
  orderRequest: false,
  orderError: false,
  name: '',
}
  
export const orderReducer = (state = initialState, action: TGetNumberOrderActions): TGetNumberOrderState => {
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
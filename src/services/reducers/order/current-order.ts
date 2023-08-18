import { TCurrentOrderActions, DELETE_CURRENT_ORDER_INFO, ADD_CURRENT_ORDER_INFO } from "../../actions/order/current-order";
import { TOrder } from "../../../utils/prop-types";

type TInitialState ={
  information: TOrder | null
}

export const initialState: TInitialState = {
  information: null
}

export const currentOrderReducer = (state = initialState, action: TCurrentOrderActions) => {
  switch (action.type) {
    case ADD_CURRENT_ORDER_INFO: {
      return { ...state, order: action.payload };
    }
    case DELETE_CURRENT_ORDER_INFO: {
      return { ...state, order: null };
    }
    default: {
      return state;
    }
  }
};
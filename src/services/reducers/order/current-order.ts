import { TCurrentOrderActions, DELETE_CURRENT_ORDER_INFO, ADD_CURRENT_ORDER_INFO } from "../../actions/order/current-order";
import { TOrder } from "../../../utils/prop-types";

type TInitialState ={
  information: TOrder | null
}

const initialState: TInitialState = {
  information: null
}

export const currentOrderReducer = (state = initialState, action: TCurrentOrderActions) => {
  switch (action.type) {
    case ADD_CURRENT_ORDER_INFO: {
      return { information: action.payload };
    }
    case DELETE_CURRENT_ORDER_INFO: {
      return { information: null };
    }
    default: {
      return state;
    }
  }
};
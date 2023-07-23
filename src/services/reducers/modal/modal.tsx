import {TOGGLE_MODAL_INGREDIENT, TOGGLE_MODAL_ORDER} from "../../actions/modal/modal";
import { TIngredient } from "../../../utils/prop-types";

export interface ItoggleModalIngredient {
  readonly type: typeof TOGGLE_MODAL_INGREDIENT;
  ingr: boolean;
}

export interface ItoggleModalOrder {
  readonly type: typeof TOGGLE_MODAL_ORDER;
  ingr: boolean;
}


type TModalInitialState = {
  isModalIngr?: boolean,
  isModalOrder?: boolean,
}
  
  const initialState: TModalInitialState = {
    isModalIngr: false,
    isModalOrder: false,
  };

  export type TmodalReducer = | ItoggleModalIngredient | ItoggleModalOrder;
  
  export const modalReducer = (state = initialState, action: TmodalReducer): TModalInitialState => {
    switch (action.type) {
      case TOGGLE_MODAL_INGREDIENT: {
        return {isModalIngr: action.ingr };
      }
      case TOGGLE_MODAL_ORDER: {
        return {isModalOrder: action.ingr };
      }
  
      default: {
        return state;
      }
    }
  };
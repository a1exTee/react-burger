import {TOGGLE_MODAL_INGREDIENT, TOGGLE_MODAL_ORDER} from "../../actions/modal/modal";
  
  const initialState = {
    isModalIngr: false,
    isModalOrder: false,
  };
  
  export const modalReducer = (state = initialState, action) => {
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
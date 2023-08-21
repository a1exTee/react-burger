import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR, MODAL_ADD_INGREDIENT, MODAL_DEL_INGREDIENT} from "../../actions/burger-ingredients/burger-ingredients";
import { TIngredient, TGetIngredientsActions } from "../../../utils/prop-types";

type TGetIngredientsState = {
  ingredients: Array<TIngredient> | null,
  ingredientsRequest: boolean,
  ingredientsChecker: boolean,
  selectedIngredient: null | object,
}

export const initialState: TGetIngredientsState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsChecker: false,
  selectedIngredient: null,
};

export const burgerIngredientsReducer = (state = initialState, action: TGetIngredientsActions): TGetIngredientsState => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true,  ingredientsChecker: false,};
    }
    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.ingr,
      };
    } 
    case INGREDIENTS_ERROR: {
      return { ...initialState, ingredientsChecker: true, ingredientsRequest: false };
    }
    case MODAL_ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.ingr,
      }
    }
    case MODAL_DEL_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null,
      }
    }

    default: {
      return state;
    }
  }
};

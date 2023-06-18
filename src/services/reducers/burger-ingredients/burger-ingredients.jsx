import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR, MODAL_ADD_INGREDIENT, MODAL_DEL_INGREDIENT} from "../../actions/burger-ingredients/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsChecker: false,
  selectedIngredient: null,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
      return { ...initialState, ingredientsChecker: true };
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
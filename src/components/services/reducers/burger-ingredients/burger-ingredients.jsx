import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCSESS, INGREDIENTS_ERROR} from "../../actions/burger-ingredients/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsChecker: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case INGREDIENTS_SUCCSESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsChecker: false,
        ingredients: action.ingr,
      };
    }
    case INGREDIENTS_ERROR: {
      return { ...state, ingredientsRequest: true, ingredientsChecker: true };
    }

    default: {
      return state;
    }
  }
};
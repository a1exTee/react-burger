import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, RESET_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../actions/burger-constructor/burger-constructor";
import { TIngredient } from "../../../utils/prop-types";
import { TIngrediensConstructorActions } from "../../actions/burger-constructor/burger-constructor";


type TBurgerConstructorReducer = {
  ingredientsConstructor: Array<TIngredient> | [],
  bun: Array<TIngredient> | []
}

  const initialState: TBurgerConstructorReducer = {
    ingredientsConstructor: [],
    bun: [],
  };
  
  export const burgerConstructorReducer = (state = initialState, action: TIngrediensConstructorActions) => {
    switch (action.type) {
      case ADD_IN_CONSTRUCTOR: {
        return {
          ...state,
          ingredientsConstructor: [...state.ingredientsConstructor, action.ingredientsConstructor],
        };
      }
      case ADD_BUN_IN_CONSTRUCTOR: {
        return {
          ...state,
          bun: action.bun
        }
      }
      case DEL_IN_CONSTRUCTOR: {
        return {
          ...state,
          ingredientsConstructor: [...state.ingredientsConstructor.filter((ingr) => ingr.id !== action.id)]
        }
      }
      case RESET_CONSTRUCTOR:
        return {
          ingredientsConstructor: [],
        }
      case REPLACE_INGREDIENT: {
        const items = [...state.ingredientsConstructor]
          items.splice(action.item.dragIndex, 0)
        return {
          ...state,
          ingredientsConstructor: items,
        }
      }
  
      default: {
        return state;
      }
    }
  };
  
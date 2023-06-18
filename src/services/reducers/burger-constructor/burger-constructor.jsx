import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, RESET_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../actions/burger-constructor/burger-constructor";

  const initialState = {
    ingredientsConstructor: [],
    bun: null,
  };
  
  export const burgerConstructorReducer = (state = initialState, action) => {
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
          items.splice(action.item.dragIndex, 0, 
          items.splice(action.item.hoverIndex, 1)[0])
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
  
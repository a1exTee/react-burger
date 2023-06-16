import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, DND_CONSTRUCTOR, TOTAL_PRICE, RESET_CONSTRUCTOR,} from "../../actions/burger-constructor/burger-constructor";

  const initialState = {
    ingredientsConstructor: [],
    total: 0,
  };
  
  export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOTAL_PRICE: {
        return { ...state, total: action.value };
      }
      case ADD_IN_CONSTRUCTOR: {
        return {
          ...state,
          ingredientsConstructor: [...state.ingredientsConstructor, action.value],
        };
      }
      case ADD_BUN_IN_CONSTRUCTOR: {
        return {
          ...state,
          state: [
            state.ingredientsConstructor.splice(
              0,
              2,
              action.valueTop,
              action.valueBottom
            ),
          ],
        };
      }
  
      case DEL_IN_CONSTRUCTOR: {
        return {
          ...state,
          state: [...state.ingredientsConstructor.splice(action.value, 1)],
        };
      }
      case DND_CONSTRUCTOR: {
        const arrayIngr = state.ingredientsConstructor;
  
        const ingrDrop = arrayIngr.find(
          (item, index) => action.indexDrop == index
        );
        const ingrDrag = arrayIngr.find(
          (item, index) => action.indexDrag == index
        );
        arrayIngr.splice(action.indexDrag, 1);
        arrayIngr.splice(action.indexDrop, 0, ingrDrag);
  
        return {
          ...state,
          ingredientsConstructor: arrayIngr,
        };
      }
      case RESET_CONSTRUCTOR: {
        return {
          ...state,
          state: [
            ...state.ingredientsConstructor.splice(
              2,
              state.ingredientsConstructor.length
            ),
          ],
        };
      }
  
      default: {
        return state;
      }
    }
  };
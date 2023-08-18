import { burgerIngredientsReducer, initialState } from './burger-ingredients';
import {
  getIngredients,
  getIngredientsRequest,
  getIngredientsFailed,
} from '../../actions/burger-ingredients/burger-ingredients';

describe('Ingredients Data Reducer', () => {

  const initialItemsState = {
    ingredients: null,
    ingredientsRequest: false,
    ingredientsChecker: false,
    selectedIngredient: null,
  };

  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle INGREDIENTS_REQUEST', () => {
    const action = getIngredientsRequest();

    const expectedState = {
      ...initialItemsState,
      ingredientsRequest: true,
    };

    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle INGREDIENTS_ERROR', () => {
    const action = getIngredientsFailed();

    const expectedState = {
      ...initialState, 
      ingredientsRequest: false,
      ingredientsChecker: true,
    };

    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

});    
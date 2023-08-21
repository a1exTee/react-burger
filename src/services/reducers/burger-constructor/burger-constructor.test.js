import { burgerConstructorReducer, initialState } from './burger-constructor';
import {
  addIngredientInConstructor,
  moveIngredientInConstructor, 
  deleteIngredient,
  addBunsInConstructor,
  deleteAllIngredients,
} from '../../actions/burger-constructor/burger-constructor';


describe('Ingredients Constructor Reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BUN_IN_CONSTRUCTOR', () => {
    const bun = [{ id: '1', name: 'Bun', price: 1.99 }];
    const action = { type: 'ADD_BUN_IN_CONSTRUCTOR', bun };

    const expectedState = {
      ingredientsConstructor: [],
      bun,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_IN_CONSTRUCTOR', () => {
    const ingredientsConstructor = { id: '2', name: 'Tomato', price: 0.99 };
    const action = { type: 'ADD_IN_CONSTRUCTOR', ingredientsConstructor };

    const expectedState = {
      ingredientsConstructor: [ingredientsConstructor],
      bun: null,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DEL_IN_CONSTRUCTOR', () => {
    const ingredient1 = { id: '2', name: 'Tomato', price: 0.99 };
    const ingredient2 = { id: '3', name: 'Lettuce', price: 0.5 };
    const initialState = {
      ingredientsConstructor: [ingredient1, ingredient2],
      bun: null,
    };

    const action = deleteIngredient(ingredient1.id);

    const expectedState = {
      ingredientsConstructor: [ingredient2],
      bun: null,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_CONSTRUCTOR', () => {
    const initialState = {
      ingredientsConstructor: [{ id: '1', name: 'Cheese', price: 1.5 }],
      bun: [{ id: '2', name: 'Bun', price: 1.99 }],
    };

    const action = deleteAllIngredients();

    const expectedState = {
      ingredientsConstructor: [],
      bun: null,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });
  
});
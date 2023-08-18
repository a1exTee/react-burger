import { orderReducer, initialState } from './order';
import {
  sendOrder,
} from '../../actions/order/order';

describe('Order Reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, 0)).toEqual(initialState);
  });

  it('should handle ORDER_SUCCESS', () => {
    const ingredient1 = { id: '2', name: 'Tomato', price: 0.99 };
    const ingredient2 = { id: '3', name: 'Lettuce', price: 0.5 };
    const action = sendOrder([ingredient1.id, ingredient2.id]);

    const expectedState = {
        ...initialState,
        orderRequest: false,
        name: action.name,
        order: action.number,
    }; 
 
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  
});
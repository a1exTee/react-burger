import { currentOrderReducer, initialState } from './current-order';
import { addCurrentOrderInfo, deleteCurrentOrderInfo } from '../../actions/order/current-order';

describe('Current Order Reducer', () => {
  it('should return the initial state', () => {
    expect(currentOrderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CURRENT_ORDER_INFO', () => {
    const order = { id: '1', name: 'Burger', price: 10.99 };
    const action = addCurrentOrderInfo(order);

    const expectedState = {
      information: null,
      order: order,
    };

    expect(currentOrderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle DELETE_CURRENT_ORDER_INFO', () => {
    const initialState = {
      information: null,
      order: { id: '1', name: 'Burger', price: 10.99 },
    };

    const action = deleteCurrentOrderInfo();

    const expectedState = {
      information: null,
      order: null,
    };

    expect(currentOrderReducer(initialState, action)).toEqual(expectedState);
  });
});


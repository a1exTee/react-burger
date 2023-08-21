import { orderReducer, initialState } from './order';
import {
  getOrderNumberRequest,
  getOrderNumberSuccess,
  getOrderNumberFailed,
  addOrderItems,
  deleteOrderInfo,
} from '../../actions/order/order';

describe('Order Reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_NUMBER_REQUEST', () => {
    const action = getOrderNumberRequest();

    const expectedState = {
      ...initialState,
      orderNumberRequest: true,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
    const orderNumber = 12345;
    const action = getOrderNumberSuccess(orderNumber);

    const expectedState = {
      ...initialState,
      orderNumber,
      orderNumberRequest: false,
      orderNumberFailed: false,
      isLoaded: true,
    }; 

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_NUMBER_FAILED', () => {
    const action = getOrderNumberFailed();

    const expectedState = {
      ...initialState,
      orderNumberRequest: false,
      orderNumberFailed: true,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_ORDER_ITEMS', () => {
    const orderItems = ['item1', 'item2'];
    const action = addOrderItems(orderItems);

    const expectedState = {
      ...initialState,
      orderItems,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_ORDER_INFO', () => {
    const action = deleteOrderInfo();

    const initialState = {
      orderNumber: 12345,
      orderNumberRequest: false,
      orderNumberFailed: false,
      isLoaded: true,
      orderItems: ['item1', 'item2'],
    };

    const expectedState = {
      ...initialState,
      orderNumber: null,
      orderNumberRequest: false,
      orderNumberFailed: false,
      isLoaded: false,
      orderItems: [],
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });
});
import { wsReducer, initialState } from './ws-reducers';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../../actions/ws/ws-actions';

describe('wsReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const action = { type: WS_CONNECTION_SUCCESS };
    const expectedState = {
      ...initialState,
      wsConnected: true,
    };
    expect(wsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const error = 'Connection error';
    const action = { type: WS_CONNECTION_ERROR, payload: error };
    const expectedState = {
      ...initialState,
      wsConnected: false,
      wsError: error,
    };
    expect(wsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    const action = { type: WS_CONNECTION_CLOSED };
    const expectedState = {
      ...initialState,
      wsConnected: false,
    };
    expect(wsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_GET_ORDERS', () => {
    const orders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const total = 2;
    const totalToday = 1;
    const action = {
      type: WS_GET_ORDERS,
      payload: { orders, total, totalToday }
    };
    const expectedState = {
      ...initialState,
      orders,
      total,
      totalToday
    };
    expect(wsReducer(initialState, action)).toEqual(expectedState);
  });
});


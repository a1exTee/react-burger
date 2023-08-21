import { wsAuthReducer, initialState } from './ws-auth-reducers';
import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_AUTH_ORDERS
} from '../../actions/ws/ws-auth-actions';

describe('wsAuthReducer', () => {
  it('should return the initial state', () => {
    expect(wsAuthReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
    const action = { type: WS_AUTH_CONNECTION_SUCCESS };
    const expectedState = {
      ...initialState,
      wsAuthConnected: true,
    };
    expect(wsAuthReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_CONNECTION_ERROR', () => {
    const error = 'Connection error';
    const action = { type: WS_AUTH_CONNECTION_ERROR, payload: error };
    const expectedState = {
      ...initialState,
      wsAuthError: error,
    };
    expect(wsAuthReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
    const action = { type: WS_AUTH_CONNECTION_CLOSED };
    const expectedState = {
      ...initialState,
      wsAuthConnected: false,
    };
    expect(wsAuthReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_GET_AUTH_ORDERS', () => {
    const orders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const total = 2;
    const totalToday = 1;
    const action = {
      type: WS_GET_AUTH_ORDERS,
      payload: { orders, total, totalToday }
    };
    const expectedState = {
      ...initialState,
      orders,
      total,
      totalToday
    };
    expect(wsAuthReducer(initialState, action)).toEqual(expectedState);
  });
});

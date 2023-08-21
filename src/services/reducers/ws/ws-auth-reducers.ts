import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_AUTH_ORDERS, TWsAuthActions
} from '../../actions/ws/ws-auth-actions';
import { TOrder } from '../../../utils/prop-types';

type TInitialState = {
  wsAuthConnected: boolean,
  wsAuthError: string | undefined,
  orders: Array<TOrder> | null,
  total: number | null,
  totalToday: number | null
}

export const initialState: TInitialState = {
  wsAuthConnected: false,
  wsAuthError: undefined,
  orders: null,
  total: null,
  totalToday: null
}

export const wsAuthReducer = (state = initialState, action: TWsAuthActions) => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsAuthError: undefined,
        wsAuthConnected: true
      };
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsAuthError: action.payload,
        wsAuthConnected: false
      };
    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsAuthError: undefined,
        wsAuthConnected: false,
        orders: null,
        total: null,
        totalToday: null
      };
    case WS_GET_AUTH_ORDERS:
      return {
        ...state,
        wsAuthError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
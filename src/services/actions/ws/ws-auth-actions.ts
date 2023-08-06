import { TOrder } from "../../../utils/prop-types";

export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';

export const WS_GET_AUTH_ORDERS: 'WS_GET_AUTH_ORDERS' = 'WS_GET_AUTH_ORDERS';


export interface IWsAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}
export interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}
export interface IWsAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  payload: string
}
export interface IWsAuthConnectionClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
export interface IWsGetAuthOrders {
  readonly type: typeof WS_GET_AUTH_ORDERS;
  payload:{orders: Array<TOrder>, total: number, totalToday: number}
}



export type TWsAuthActions = 
  | IWsAuthConnectionStart
  | IWsAuthConnectionSuccess
  | IWsAuthConnectionError
  | IWsAuthConnectionClosed
  | IWsGetAuthOrders;
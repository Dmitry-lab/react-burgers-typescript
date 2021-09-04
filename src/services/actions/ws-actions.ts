import { TOrder } from "../types/data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_CLOSE_CONNECTION: 'WS_CLOSE_CONNECTION' = 'WS_CLOSE_CONNECTION';
export const WS_SET_ORDER: 'WS_SET_ORDER' = 'WS_SET_ORDER';

type TWSConnectionSuccessAction = {
  type: typeof WS_CONNECTION_SUCCESS
}

type TWSConnectionStartAction = {
  type: typeof WS_CONNECTION_START
}

type TWSConnectionErrorAction = {
  type: typeof WS_CONNECTION_ERROR
}

type TWSConnectionClosedAction = {
  type: typeof WS_CONNECTION_CLOSED
}

type TWSCloseConnectionAction = {
  type: typeof WS_CLOSE_CONNECTION
}

type TWSGetOredersAction = {
  type: typeof WS_GET_ORDERS;
  payload: {orders: Array<TOrder>; total: number; totalToday: number}
}

type TWSSetOrderAction = {
  type: typeof WS_SET_ORDER;
  number: number;
}

export type TWSActions = TWSConnectionSuccessAction |
  TWSConnectionStartAction | 
  TWSConnectionErrorAction |
  TWSConnectionClosedAction |
  TWSCloseConnectionAction |
  TWSGetOredersAction |
  TWSSetOrderAction
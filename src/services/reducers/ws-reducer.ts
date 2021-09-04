import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SET_ORDER,
  TWSActions,
} from '../actions/ws-actions';
import { TOrder } from '../types/data';

type TWSState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  currentOrder: number;
  total: number;
  totalToday: number;
} 

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  currentOrder: 0,
  total: 0,
  totalToday: 0
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

    case WS_SET_ORDER:
      return {
        ...state,
        currentOrder: action.number,
      };

    default:
      return state;
  }
};

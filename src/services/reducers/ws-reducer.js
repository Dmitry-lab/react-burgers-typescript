import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SET_ORDER,
} from '../actions/ws-actions';

const initialState = {
  wsConnected: false,
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0
};

export const wsReducer = (state = initialState, action) => {
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

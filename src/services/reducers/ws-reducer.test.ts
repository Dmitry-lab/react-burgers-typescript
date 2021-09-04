import { initialState, wsReducer } from './ws-reducer';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SET_ORDER,
} from '../actions/ws-actions';

const testOrder = {
  _id: '6133d47647707f001b152b87',
  ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  date: '2021-09-04T20:17:58.229Z',
  updatedAt: '2021-09-04T20:17:58.374Z',
  number: '2528',
  price: 4324
}

describe('user-info reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {} as any)).toEqual({
      wsConnected: false,
      orders: [],
      currentOrder: 0,
      total: 0,
      totalToday: 0
    });
  });

  it('should handle SET_USER_INFO', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        wsConnected: true
      })
    );
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_ERROR
      })
    ).toEqual(
      expect.objectContaining({
        wsConnected: false
      })
    );
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
      })
    );
  });

  it('should handle WS_GET_ORDERS', () => {
    expect(
      wsReducer(initialState, {
        type: WS_GET_ORDERS,
        payload: {
          orders: [testOrder],
          total: 100,
          totalToday: 11
        }
      })
    ).toEqual(
      expect.objectContaining({
        orders: [testOrder],
        total: 100,
        totalToday: 11
      })
    );
  });

  it('should handle WS_SET_ORDER', () => {
    expect(
      wsReducer(initialState, {
        type: WS_SET_ORDER,
        number: 111
      })
    ).toEqual(
      expect.objectContaining({
        currentOrder: 111
      })
    );
  });
})

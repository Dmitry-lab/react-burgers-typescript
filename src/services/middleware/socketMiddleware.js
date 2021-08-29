import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CLOSE_CONNECTION,
  WS_GET_ORDERS
} from '../actions/ws-actions';

export const socketMiddleware = store => {
  let socket = null;

  return next => action => {
    const { dispatch } = store;
    const { type, wsUrl, token } = action;
    if (type === WS_CONNECTION_START) {
      socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}`); //проверить 20 минут жизни токена
    }
    if (type === WS_CLOSE_CONNECTION) {
      socket.close(1000)
    }
    if (socket) {
      socket.onopen = event => {
        dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
      };

      socket.onerror = event => {
        dispatch({ type: WS_CONNECTION_ERROR, payload: event });
      };

      socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch({ type: WS_GET_ORDERS, payload: restParsedData });
      };

      socket.onclose = event => {
        dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
      };
    }

    next(action);
  };
};

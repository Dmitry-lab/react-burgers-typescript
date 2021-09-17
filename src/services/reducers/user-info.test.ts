import { initialState, userInfoReducer } from './user-info';
import {
  SET_USER_INFO,
  REMOVE_USER_INFO,
  SET_REQUEST_FAILD
} from '../actions/user-info';

describe('user-info reducer', () => {
  it('should return the initial state', () => {
    expect(userInfoReducer(undefined, {} as any)).toEqual({
      info: {
        name: '',
        email: ''
      },
      requestError: ''
    });
  });

  it('should handle SET_USER_INFO', () => {
    expect(
      userInfoReducer(initialState, {
        type: SET_USER_INFO,
        user: { name: 'Dmitry', email: 'test@yandex.ru' }
      })
    ).toEqual({
      info: {
        name: 'Dmitry',
        email: 'test@yandex.ru'
      },
      requestError: ''
    });
  });

  it('should handle REMOVE_USER_INFO', () => {
    expect(
      userInfoReducer(initialState, {
        type: REMOVE_USER_INFO
      })
    ).toEqual(
      expect.objectContaining({
        info: {
          name: '',
          email: ''
        },
        requestError: ''
      })
    );
  });

  it('should handle SET_REQUEST_FAILD', () => {
    expect(
      userInfoReducer(initialState, {
        type: SET_REQUEST_FAILD,
        msg: 'Test error'
      })
    ).toEqual(
      expect.objectContaining({
        requestError: 'Test error'
      })
    );
  });
})

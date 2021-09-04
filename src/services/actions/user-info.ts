import {
  registration,
  logIn,
  refreshToken,
  logOut,
  updateUser,
  getUserInfo
} from "../../utils/api-requests";
import { setCookie, getToken } from "../../utils/cookies";
import { AppDispatch, AppThunk } from '../types/index';
import { TUserInfoResponse } from "../types/data";

export const SET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
export const REMOVE_USER_INFO: 'PLACE_USER_FAILD' = 'PLACE_USER_FAILD';
export const SET_REQUEST_FAILD: 'SET_REQUEST_FAILD' = 'SET_REQUEST_FAILD';

type TSetUserInfoAction = {
  type: typeof SET_USER_INFO;
  user: {name: string; email: string};
}

type TRemoveUserInfoAction = {
  type: typeof REMOVE_USER_INFO;
}

type TRequestFaildAction = {
  type: typeof SET_REQUEST_FAILD;
  msg: string;
}

export type TUserInfoActions = TSetUserInfoAction |
  TRemoveUserInfoAction |
  TRequestFaildAction

const setAuth = (res: TUserInfoResponse, dispatch: AppDispatch) => {
  setCookie('accessToken', getToken(res.accessToken), { expires: 24*60*60 });
  localStorage.setItem('refreshToken', getToken(res.refreshToken));
  localStorage.removeItem('resetPassword');
  dispatch({ type: SET_USER_INFO, user: res.user})
}

const clearTokens = () => {
  setCookie('accessToken','', { expires: 0 });
  localStorage.removeItem('refreshToken')
}

export const registerUser = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  registration(name, email, password)
    .then(res => {
      if (res.success === true) {
        setAuth(res, dispatch)
        return
      }

      return Promise.reject(res)
    })
    .catch(err => dispatch({ type: SET_REQUEST_FAILD, msg: `Ошибка регистрации ${err.message}` }))
}

export const userLogIn = (email: string, password: string) => (dispatch: AppDispatch) => {
  logIn(email, password)
    .then(res => {
      if (res.success === true) {
        setAuth(res, dispatch)
        return
      }

      return Promise.reject(res)
    })
    .catch(err => dispatch({ type: SET_REQUEST_FAILD, msg: `Ошибка авторизации ${err.message}` }))
}

export const userLogOut = () => (dispatch: AppDispatch) => {
  logOut()
    .then(res => {
      if (res.success === true) {
        localStorage.removeItem('refreshToken');
        setCookie('accessToken','', { expires: 0 });
        dispatch({ type: REMOVE_USER_INFO });
        return
      }

      return Promise.reject(res);
    })
    .catch(err => dispatch({ type: SET_REQUEST_FAILD, msg: `Ошибка сервера ${err.message}` }))
}

export const setUserInfo: AppThunk = (apiFunction: typeof getUserInfo | typeof updateUser, ...args: [string, string, string]) => (dispatch: AppDispatch) => {
  apiFunction(...args)
    .then((res: TUserInfoResponse) => {
      if (res.success === true) {
        dispatch({ type: SET_USER_INFO, user: res.user })
        return
      }
      return Promise.reject(res);
    })
    .catch((err: {} & {message: string}) => {
      if (err.message === 'jwt expired') {
        dispatch(updateToken(apiFunction, ...args) as any)
        return
      }

      clearTokens();
      dispatch({ type: REMOVE_USER_INFO})
    })
}

export const updateUserInfo = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  updateUser(name, email, password)
    .then(res => {
      if (res.success === true) {
        dispatch({ type: SET_USER_INFO, user: res.user })
        return
      }
      return Promise.reject(res);
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(updateToken as any)
        return
      }

      clearTokens();
      dispatch({ type: REMOVE_USER_INFO})
    })
}

export const updateToken: AppThunk = (apiFunction: typeof getUserInfo | typeof updateUser, ...args: [string, string, string]) =>
  (dispatch: AppDispatch) => {
    refreshToken()
      .then(data => {
        setCookie('accessToken', getToken(data.accessToken), { expires: 24*60*60 });
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUserInfo(apiFunction, ...args) as any)
      })
      .catch(err => dispatch({ type: REMOVE_USER_INFO }))
  }

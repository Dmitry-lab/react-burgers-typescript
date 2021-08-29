import {
  registration,
  logIn,
  refreshToken,
  logOut,
  updateUser
} from "../../utils/api-requests";
import { setCookie, getToken } from "../../utils/cookies";

export const SET_USER_INFO = 'GET_USER_INFO';
export const REMOVE_USER_INFO = 'PLACE_USER_FAILD';
export const SET_REQUEST_FAILD = 'SET_REQUEST_FAILD';

const setAuth = (res, dispatch) => {
  setCookie('accessToken', getToken(res.accessToken), { expires: 24*60*60 });
  localStorage.setItem('refreshToken', getToken(res.refreshToken));
  localStorage.removeItem('resetPassword');
  dispatch({ type: SET_USER_INFO, user: res.user})
}

const clearTokens = () => {
  setCookie('accessToken','', { expires: 0 });
  localStorage.removeItem('refreshToken')
}

export const registerUser = (name, email, password) => (dispatch) => {
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

export const userLogIn = (email, password) => (dispatch) => {
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

export const userLogOut = () => (dispatch) => {
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

export const setUserInfo = (apiFunction, ...args) => (dispatch) => {
  apiFunction(...args)
    .then(res => {
      if (res.success === true) {
        dispatch({ type: SET_USER_INFO, user: res.user })
        return
      }
      return Promise.reject(res);
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(updateToken(apiFunction, ...args))
        return
      }

      clearTokens();
      dispatch({ type: REMOVE_USER_INFO})
    })
}

export const updateUserInfo = (name, email, password) => (dispatch) => {
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
        dispatch(updateToken)
        return
      }

      clearTokens();
      dispatch({ type: REMOVE_USER_INFO})
    })
}

const updateToken = (apiFunction, ...args) => (dispatch) => {
  refreshToken()
    .then(data => {
      setCookie('accessToken', getToken(data.accessToken), { expires: 24*60*60 });
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(setUserInfo(apiFunction, ...args))
    })
    .catch(err => dispatch({ type: REMOVE_USER_INFO }))
}

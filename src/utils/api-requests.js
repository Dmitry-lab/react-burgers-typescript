import { getCookie } from './cookies';

export const BASE_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const ORDERS_URL_ALL = 'wss://norma.nomoreparties.space/orders/all';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const INGREDIENTS_ADDRESS = `${BASE_URL}/ingredients`;
const ORDER_ADDRESS = `${BASE_URL}/orders`;
const REGISTRATION_ADDRESS = `${BASE_URL}/auth/register`;
const LOGIN_ADDRESS = `${BASE_URL}/auth/login`;
const GET_USER_ADDRESS = `${BASE_URL}/auth/user`;
const REFRESH_TOKEN_ADDRESS = `${BASE_URL}/auth/token`;
const LOGOUT_ADDRESS = `${BASE_URL}/auth/logout`;
const RESET_PASSWORD_ADDRESS = `${BASE_URL}/password-reset`;
const SET_NEW_PASSWORD = `${BASE_URL}/password-reset/reset`;

export function getIngredients() {
  return (
    fetch(INGREDIENTS_ADDRESS)
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function placeOrder(ingredientsId) {
  return (
    fetch(ORDER_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ ingredients: ingredientsId })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function getOrderInfo(orderNumber) {
  return (
    fetch(`${ORDER_ADDRESS}/${orderNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function registration(name, email, password) {
  return (
    fetch(REGISTRATION_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function logIn(email, password) {
  return (
    fetch(LOGIN_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function resetPassword(email) {
  return (
    fetch(RESET_PASSWORD_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function setNewPassword(password, token) {
  return (
    fetch(SET_NEW_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, token })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function logOut() {
  return (
    fetch(LOGOUT_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function refreshToken() {
  return (
    fetch(REFRESH_TOKEN_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function getUserInfo() {
  return (
    fetch(GET_USER_ADDRESS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

export function updateUser(name, email, password) {
  return (
    fetch(GET_USER_ADDRESS, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (res.ok)
          return res.json()

        return Promise.reject(res.status)
      })
  )
}

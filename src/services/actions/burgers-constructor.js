import { getIngredients, placeOrder } from "../../utils/api-requests";

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const HIDE_INGREDIENT_INFO = 'HIDE_INGREDIENT_INFO';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILD = 'PLACE_ORDER_FAILD';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';
export const CHANGE_INGREDIENTS_GROUP = 'CHANGE_INGREDIENTS_GROUP'
export const CHANGE_SCROLL_TARGET = 'CHANGE_SCROLL_TARGET'
export const GET_TO_SCROLL_TARGET = 'GET_TO_SCROLL_TARGET'
export const ADD_INGREDIENT_IN_ORDER = 'ADD_INGREDIENT_IN_ORDER'
export const REMOVE_INGREDIENT_FROM_ORDER = 'REMOVE_INGREDIENT_FROM_ORDER'
export const SORT_INGREDIENTS = 'SORT_INGREDIENT'

export const getAllIngredients = () => (dispatch) => {
  getIngredients()
    .then(result => dispatch({ type: LOAD_INGREDIENTS, ingredients: result.data }))
    .catch(err => alert(`Ошибка обращения к серверу: ${err}`))
}

export const getOrderInfo = (ingredients) => (dispatch) => {
  placeOrder(ingredients)
    .then(result => dispatch({ type: PLACE_ORDER_SUCCESS, order: result.order }))
    .catch(err => dispatch({ type: PLACE_ORDER_FAILD }))
}

import { getIngredients, placeOrder } from "../../utils/api-requests";
import { TIngredient, TOrder, TTabNames } from "../types/data";
import { AppDispatch } from '../types/index';

export const LOAD_INGREDIENTS: 'LOAD_INGREDIENTS' = 'LOAD_INGREDIENTS';
export const SHOW_INGREDIENT_INFO: 'SHOW_INGREDIENT_INFO' = 'SHOW_INGREDIENT_INFO';
export const HIDE_INGREDIENT_INFO: 'HIDE_INGREDIENT_INFO' = 'HIDE_INGREDIENT_INFO';
export const PLACE_ORDER_SUCCESS: 'PLACE_ORDER_SUCCESS' = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILD: 'PLACE_ORDER_FAILD' = 'PLACE_ORDER_FAILD';
export const CLEAR_ORDER_INFO: 'CLEAR_ORDER_INFO' = 'CLEAR_ORDER_INFO';
export const CLEAR_PREV_ORDER: 'CLEAR_PREV_ORDER' = 'CLEAR_PREV_ORDER';
export const CHANGE_INGREDIENTS_GROUP: 'CHANGE_INGREDIENTS_GROUP' = 'CHANGE_INGREDIENTS_GROUP';
export const CHANGE_SCROLL_TARGET: 'CHANGE_SCROLL_TARGET' = 'CHANGE_SCROLL_TARGET';
export const GET_TO_SCROLL_TARGET: 'GET_TO_SCROLL_TARGET' = 'GET_TO_SCROLL_TARGET';
export const ADD_INGREDIENT_IN_ORDER: 'ADD_INGREDIENT_IN_ORDER' = 'ADD_INGREDIENT_IN_ORDER';
export const REMOVE_INGREDIENT_FROM_ORDER: 'REMOVE_INGREDIENT_FROM_ORDER' = 'REMOVE_INGREDIENT_FROM_ORDER';
export const SORT_INGREDIENTS: 'SORT_INGREDIENT' = 'SORT_INGREDIENT'

type TLoadAction = {
  type: typeof LOAD_INGREDIENTS;
  ingredients: Array<TIngredient>;
}

type TShowIngredientAction = {
  type: typeof SHOW_INGREDIENT_INFO;
  info: TIngredient;
}

type THideIngredientAction = {
  type: typeof HIDE_INGREDIENT_INFO;
}

type TPlaceOrederSuccessAction = {
  type: typeof PLACE_ORDER_SUCCESS;
  order: TOrder;
}

type TPlaceOrederFaildAction = {
  type: typeof PLACE_ORDER_FAILD;
}

type TClearOrderInfoAction = {
  type: typeof CLEAR_ORDER_INFO;
}

type TClearPrevOrder = {
  type: typeof CLEAR_PREV_ORDER;
}

type TChangeIngredientsGroup = {
  type: typeof CHANGE_INGREDIENTS_GROUP;
  newTab: TTabNames;
}

type TChangeScrollTarget = {
  type: typeof CHANGE_SCROLL_TARGET;
  target: TTabNames;
}

type TGetToTargetAction = {
  type: typeof GET_TO_SCROLL_TARGET;
  target: TTabNames;
  newTab: TTabNames;  
}

type TAddIngredientInOrderAction = {
  type: typeof ADD_INGREDIENT_IN_ORDER;
  ingredient: TIngredient;
}

type TRemoveIgredientAction = {
  type: typeof REMOVE_INGREDIENT_FROM_ORDER;
  index: number;
}

type TSortIngredientsAction = {
  type: typeof SORT_INGREDIENTS;
  dragIndex: number;
  hoverIndex: number;
}

export type TConstructorActions = TLoadAction |
  TShowIngredientAction |
  THideIngredientAction |
  TPlaceOrederSuccessAction |
  TPlaceOrederFaildAction |
  TPlaceOrederFaildAction |
  TClearOrderInfoAction |
  TClearPrevOrder |
  TChangeIngredientsGroup |
  TChangeScrollTarget |
  TGetToTargetAction |
  TAddIngredientInOrderAction |
  TRemoveIgredientAction |
  TSortIngredientsAction

export const getAllIngredients = () => (dispatch: AppDispatch) => {
  getIngredients()
    .then(result => dispatch({ type: LOAD_INGREDIENTS, ingredients: result.data }))
    .catch(err => alert(`Ошибка обращения к серверу: ${err}`))
}

export const getOrderInfo = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
  placeOrder(ingredients)
    .then(result => dispatch({ type: PLACE_ORDER_SUCCESS, order: result.order }))
    .catch(err => dispatch({ type: PLACE_ORDER_FAILD }))
}

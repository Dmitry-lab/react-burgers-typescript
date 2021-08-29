import {
  LOAD_INGREDIENTS,
  SHOW_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
  PLACE_ORDER_FAILD,
  PLACE_ORDER_SUCCESS,
  CLEAR_ORDER_INFO,
  CHANGE_INGREDIENTS_GROUP,
  CHANGE_SCROLL_TARGET,
  GET_TO_SCROLL_TARGET,
  ADD_INGREDIENT_IN_ORDER,
  REMOVE_INGREDIENT_FROM_ORDER,
  SORT_INGREDIENTS
} from '../actions/burgers-constructor';

const initialState = {
  ingredients: [],
  addedIngredients: [],
  viewedIngredient: null,
  currentOrder: null,
  orderRequestFaild: false,
  currentTab: 'buns',
  scrollTarget: ''
}

export const constructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients}
    }
    case SHOW_INGREDIENT_INFO: {
      return {
        ...state,
        viewedIngredient: action.info
      }
    }
    case HIDE_INGREDIENT_INFO: {
      return {
        ...state,
        viewedIngredient: null
      }
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: action.order,
      }
    }
    case PLACE_ORDER_FAILD: {
      return {
        ...state,
        orderRequestFaild: true,
        currentOrder: null
      }
    }
    case CLEAR_ORDER_INFO: {
      return {
        ...state,
        orderRequestFaild: false,
        currentOrder: null,
        addedIngredients: []
      }
    }
    case CHANGE_INGREDIENTS_GROUP: {
      return {
        ...state,
        currentTab: action.newTab
      }
    }
    case CHANGE_SCROLL_TARGET: {
      return {
        ...state,
        scrollTarget: action.target
      }
    }
    case GET_TO_SCROLL_TARGET: {
      return {
        ...state,
        scrollTarget: action.target,
        currentTab: action.newTab
      }
    }
    case ADD_INGREDIENT_IN_ORDER: {
      return {
        ...state,
        addedIngredients: action.ingredient.type === 'bun'
          ? [...state.addedIngredients.filter(item => item.type !== 'bun'), action.ingredient, action.ingredient]
          : [...state.addedIngredients, action.ingredient]
      }
    }
    case REMOVE_INGREDIENT_FROM_ORDER: {
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter((_, index) => index !== action.index)
      }
    }
    case SORT_INGREDIENTS: {
      const newArr = [...state.addedIngredients];
      let draggedItem = newArr[action.dragIndex];
      let targetItem = newArr[action.hoverIndex];
      newArr.splice(action.dragIndex, 1, targetItem);
      newArr.splice(action.hoverIndex, 1, draggedItem);
      return {
        ...state,
        addedIngredients: newArr
      }
    }
    default:
      return state
  }
}

import { initialState,  constructorReducer } from './burgers-constructor';
import {
  LOAD_INGREDIENTS,
  SHOW_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
  PLACE_ORDER_FAILD,
  PLACE_ORDER_SUCCESS,
  CLEAR_ORDER_INFO,
  CLEAR_PREV_ORDER,
  CHANGE_INGREDIENTS_GROUP,
  CHANGE_SCROLL_TARGET,
  GET_TO_SCROLL_TARGET,
  ADD_INGREDIENT_IN_ORDER,
  REMOVE_INGREDIENT_FROM_ORDER,
  SORT_INGREDIENTS
} from '../actions/burgers-constructor';

const testIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
}

const testOrder = {
  _id: '6133d47647707f001b152b87',
  ingredients: ['60d3b41abdacab0026a733c6'],
  owner: { name: 'Dmitry' },
  status: 'done',
  name: 'Space флюоресцентный бургер',
  date: '2021-09-04T20:17:58.229Z',
  updatedAt: '2021-09-04T20:17:58.374Z',
  number: '2528',
  price: 2136
}

describe('burger-constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {} as any)).toEqual({
      ingredients: [],
      addedIngredients: [],
      viewedIngredient: null,
      currentOrder: null,
      orderRequestFaild: false,
      currentTab: 'buns',
      scrollTarget: ''
    });
  });

  it('should handle LOAD_INGREDIENTS', () => {
    expect(
      constructorReducer(initialState, {
        type: LOAD_INGREDIENTS,
        ingredients: [testIngredient]
      })
    ).toEqual(
      expect.objectContaining({
        ingredients: [testIngredient],
      })
    );
  });

  it('should handle SHOW_INGREDIENT_INFO', () => {
    expect(
      constructorReducer(initialState, {
        type: SHOW_INGREDIENT_INFO,
        info: testIngredient,
      })
    ).toEqual(
      expect.objectContaining({
        viewedIngredient: testIngredient,
      })
    );
  });

  it('should handle HIDE_INGREDIENT_INFO', () => {
    expect(
      constructorReducer(initialState, {
        type: HIDE_INGREDIENT_INFO,
      })
    ).toEqual(
      expect.objectContaining({
        viewedIngredient: null,
      })
    );
  });

  it('should handle PLACE_ORDER_FAILD', () => {
    expect(
      constructorReducer(initialState, {
        type: PLACE_ORDER_FAILD,
      })
    ).toEqual(
      expect.objectContaining({
        orderRequestFaild: true,
        currentOrder: null
      })
    );
  });

  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(
      constructorReducer(initialState, {
        type: PLACE_ORDER_SUCCESS,
        order: testOrder
      })
    ).toEqual(
      expect.objectContaining({
        currentOrder: testOrder
      })
    );
  });

  it('should handle CLEAR_ORDER_INFO', () => {
    expect(
      constructorReducer(initialState, {
        type: CLEAR_ORDER_INFO,
      })
    ).toEqual(
      expect.objectContaining({
        orderRequestFaild: false,
        currentOrder: null,
        addedIngredients: []
      })
    );
  });

  it('should handle CLEAR_PREV_ORDER', () => {
    expect(
      constructorReducer(initialState, {
        type: CLEAR_PREV_ORDER,
      })
    ).toEqual(
      expect.objectContaining({
        currentOrder: null
      })
    );
  });

  it('should handle CHANGE_INGREDIENTS_GROUP', () => {
    expect(
      constructorReducer(initialState, {
        type: CHANGE_INGREDIENTS_GROUP,
        newTab: 'main',
      })
    ).toEqual(
      expect.objectContaining({
        currentTab: 'main'
      })
    );
  });

  it('should handle CHANGE_SCROLL_TARGET', () => {
    expect(
      constructorReducer(initialState, {
          type: CHANGE_SCROLL_TARGET,
          target: 'main',
        }
      )
    ).toEqual(
      expect.objectContaining({
        scrollTarget: 'main',
      })
    );
  });

  it('should handle GET_TO_SCROLL_TARGET', () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          currentTab: 'sauces',
          scrollTarget: 'main',
        },
        {
          type: GET_TO_SCROLL_TARGET,
          target: '',
          newTab: 'main',
        }
      )
    ).toEqual(
      expect.objectContaining({
        scrollTarget: '',
        currentTab: 'main'
      })
    );
  });

  it('should handle ADD_INGREDIENT_IN_ORDER', () => {
    expect(
      constructorReducer(initialState, {
        type: ADD_INGREDIENT_IN_ORDER,
        ingredient: testIngredient
      })
    ).toEqual(
      expect.objectContaining({
        addedIngredients: [testIngredient, testIngredient]
      })
    );
  });

  it('should handle REMOVE_INGREDIENT_FROM_ORDER', () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          addedIngredients: [testIngredient]
        },
        {
          type: REMOVE_INGREDIENT_FROM_ORDER,
          index: 0
        }
      )
    ).toEqual(
      expect.objectContaining({
        addedIngredients: [],
      })
    );
  });

  it('should handle POST_SEND_ORDER_SUCCESS', () => {
    const testIngredient1 = {
      ...testIngredient,
      name: 'Соус фирменный Space Sauce'
    }
    const testIngredient2 = {
      ...testIngredient,
      name: 'Соус Spicy-X'
    }
    expect(
      constructorReducer(
        {
          ...initialState,
          addedIngredients: [testIngredient1, testIngredient2]
        },
        {
          type: SORT_INGREDIENTS,
          dragIndex: 1,
          hoverIndex: 0
        }
      )
    ).toEqual(
      expect.objectContaining({
        addedIngredients: [testIngredient2, testIngredient1]
      })
    );
  });


});

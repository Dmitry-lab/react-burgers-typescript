import {
  SET_USER_INFO,
  REMOVE_USER_INFO,
  SET_REQUEST_FAILD
} from '../actions/user-info';

const initialState = {
  info: {
    name: '',
    email: ''
  },
  requestError: ''
}

export const userInfoReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_INFO: {
      return {
        ...state,
        info: action.user,
        requestError: ''
      }
    }
    case REMOVE_USER_INFO: {
      return {
        ...state,
        info: { name: '', email: '' },
        requestError: ''
      }
    }
    case SET_REQUEST_FAILD: {
      return {
        ...state,
        requestError: action.msg
      }
    }
    default: {
      return state
    }
  }
}

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TConstructorActions } from '../actions/burgers-constructor';
import { TUserInfoActions } from '../actions/user-info';
import { TWSActions  } from '../actions/ws-actions';

type TApplicationActions = TConstructorActions | TUserInfoActions | TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
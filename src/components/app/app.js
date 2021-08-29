import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import FeedPage from '../../pages/feed-page/feed-page';
import NotFound from '../../pages/not-found/not-found';
import UserInfo from '../../pages/user-info/user-info';
import UserOrders from '../../pages/user-orders/user-orders';
import OrderConsistPage from '../../pages/order-consist-page/order-consist-page';
import IngredientDetailsPage from '../../pages/ingredient-details-page/ingredient-details-page';
import { getAllIngredients } from '../../services/actions/burgers-constructor';
import { setUserInfo } from '../../services/actions/user-info';
import { getUserInfo } from '../../utils/api-requests';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../protected-route';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getAllIngredients());
    dispatch(setUserInfo(getUserInfo))
  }, [])

  const background = history.action === 'PUSH' ? location.state?.background : null;

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/feed' exact={true}>
          <FeedPage />
        </Route>
        <Route path='/feed/:number'>
          <OrderConsistPage />
        </Route>
        <Route path='/ingredients/:id'>
          <IngredientDetailsPage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Registration />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <UserInfo />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' exact={true}>
          <UserOrders />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:number' exact={true}>
          <OrderConsistPage />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

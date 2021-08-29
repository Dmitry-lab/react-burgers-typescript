import { React, useEffect } from 'react';
import styles from './user-orders.module.css';
import UserInfoNavigation from '../../components/user-info-navigation/user-info-navigation';
import OrdersList from '../../components/orders-list/orders-list';
import { useDispatch } from 'react-redux';
import { BASE_ORDERS_URL } from '../../utils/api-requests';
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from '../../services/actions/ws-actions';
import { getCookie } from '../../utils/cookies';

function UserOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, wsUrl: BASE_ORDERS_URL, token: getCookie('accessToken') })

    return () => dispatch({ type: WS_CLOSE_CONNECTION })
  }, [])

  return (
    <section className={styles.content}>
      <div className={styles.nav}>
        <UserInfoNavigation info='В этом разделе вы можете посмотреть свою историю заказов'/>
      </div>
      <OrdersList />
    </section>
  )
}

export default UserOrders;

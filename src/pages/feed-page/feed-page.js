import Main from '../../components/main/main';
import { React, useEffect } from 'react';
import OrdersList from '../../components/orders-list/orders-list';
import Statistics from '../../components/statistics/statistics';
import { useDispatch } from 'react-redux';
import { ORDERS_URL_ALL } from '../../utils/api-requests';
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from '../../services/actions/ws-actions';

function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START, wsUrl: ORDERS_URL_ALL})

    return () => dispatch({type: WS_CLOSE_CONNECTION })
  }, [])

  return (
    <Main name='Лента заказов'>
      <OrdersList />
      <Statistics />
    </Main>
  )
}

export default FeedPage;

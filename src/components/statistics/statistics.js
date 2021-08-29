import React, { useMemo } from 'react';
import styles from './statistics.module.css';
import OrdersNumberList from '../orders-number-list/orders-number-list';
import { useSelector } from 'react-redux';
import { numberFormat } from '../../utils/formating';

function Statistics() {
  const { total , totalToday, orders } = useSelector(store => store.ordersInfo)

  const doneOrders = useMemo(() => {
    return orders.filter(order => order.status === 'done')
  }, [orders])

  const ordersInWork = useMemo(() => {
    return orders.filter(order => order.status === 'pending' || order.status === 'created')
  }, [orders])

  const textClassName = 'text text_type_main-medium mt-15';
  const numberClassName = `${styles.glow} text text_type_digits-large`;

  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <OrdersNumberList list={doneOrders} name='Готовы'/>
        <OrdersNumberList list={ordersInWork} name='В работе'/>
      </div>
      <p className={textClassName}>Выполнено за всё время:</p>
      <span className={numberClassName}>{numberFormat(total)}</span>
      <p className={textClassName}>Выполнено за сегодня:</p>
      <span className={numberClassName}>{totalToday}</span>
    </div>
  )
}

export default Statistics;

import React, { useEffect, useState } from 'react';
import OrderConsist from '../../components/order-consist/order-consist';

import { useParams } from 'react-router-dom';
import styles from './order-consist-page.module.css';
import { getOrderInfo } from '../../utils/api-requests';


function OrderConsistPage() {
  const { number } = useParams();
  const [ orderInfo, setOrderInfo ] = useState(null);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    getOrderInfo(number)
      .then(data => {
        if (data.orders[0]) {
          setOrderInfo(data.orders[0])
          return
        }
        throw new Error('Заказа не существует');
      })
      .catch(err => setError(true))
  }, [])

  return (
    <div className={styles.content}>
      {orderInfo
        ? <OrderConsist info={orderInfo}/>
        : error
          ? <p className='text text_type_main-medium mt-30'>Ошибка при загрузке информации о заказе</p>
          : <p className='text text_type_main-medium mt-30'>Загрузка информации о заказе...</p>
      }
    </div>
  )
}

export default OrderConsistPage;

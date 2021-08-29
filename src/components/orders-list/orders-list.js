import React, { useState } from 'react';
import styles from './orders-list.module.css';
import OrderItem from '../order-item/order-item';
import { useSelector } from 'react-redux';
import Modal from '../modal/modal';
import OrderConsist from '../order-consist/order-consist';

function OrdersList() {
  const [isModalOpened, setModalOpened] = useState(false);
  const { orders } = useSelector(store => store.ordersInfo);
  const { ingredients } = useSelector((store) => store.burgersConstructor);

  const handlerCloseModal = () => {
    setModalOpened(false);
  }

  const handlerOpenModal = () => {
    setModalOpened(true);
  }

  return (
    <div className={styles.list}>
      {orders.length && ingredients.length
        ? orders.map(order => (
            order.ingredients ? <OrderItem order={order} key={order._id} onClick={handlerOpenModal}/> : null
        ))
        : <p className='text text_type_main-medium'>Загрузка информации о заказах...</p>
      }
      {isModalOpened &&
        <Modal onCloseClick={handlerCloseModal}>
          <OrderConsist />
        </Modal>
      }
    </div>
  )
}

export default OrdersList

import React, { useMemo, useEffect, useState } from 'react';
import styles from './order-consist.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { dateFormat } from '../../utils/formating';
import { getOrderInfo } from '../../utils/api-requests';
import { useParams } from 'react-router';
import { RootState } from '../../services/types';
import { TIngredient, TOrder, TStatusName } from '../../services/types/data';

type TGroupedIngredients = {
  [key in string]: number;  
}

type TCountedIngredientsInfo = {
  [key in string]: TIngredient & {count: number}
};

function OrderConsist() {
  const { ingredients: ingredientsList } = useSelector((store: RootState) => store.burgersConstructor);
  const { currentOrder } = useSelector((store: RootState) => store.ordersInfo);
  const [ info, setOrderInfo ] = useState<TOrder | null>(null);
  const [ error, setError ] = useState(false);
  const { number: numberFromPath } = useParams<{number: string}>();

  const statusName:TStatusName = {
    created: 'Создан',
    pending:  'Готовится',
    done: 'Выполнен'
  }

  useEffect(() => {
    getOrderInfo(numberFromPath ? numberFromPath : currentOrder.toString())
      .then(data => {
        if (data.orders[0]) {
          setOrderInfo(data.orders[0])
          return
        }
        throw new Error('Заказа не существует');
      })
      .catch(err => setError(true))
      /* eslint-disable */
  }, [])

  // группировка ингридентов и получение информации по ним
  const groupedIngredients = useMemo(() => {
    const countedIngredients = info?.ingredients.reduce((acc: TGroupedIngredients, item: string) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1;
      return acc
    }, {});
    const countedIngredientsInfo: TCountedIngredientsInfo = {};
    ingredientsList.forEach(item => {
      if (countedIngredients?.[item._id])
        countedIngredientsInfo[item._id] = item.type === 'bun' ? {...item, count: 2}
          : { ...item, count: countedIngredients[item._id] }
    })
    return countedIngredientsInfo
  }, [info, ingredientsList])

  const orderPrice = useMemo(() => {
    return groupedIngredients && Object.values(groupedIngredients)?.reduce((acc: number, item: TIngredient & {count: number}) => {
      return acc += item.price * item.count;
    }, 0)
  }, [groupedIngredients])

  if (error) {
    return <p className='text text_type_main-medium mt-30 mb-30'>Ошибка при загрузке информации о заказе</p>
  }

  if (!info) {
    return <p className='text text_type_main-medium mt-30 mb-30'>Загрузка информации о заказе...</p>
  }

  return (
    <div className={styles.order}>
      <span className='text text_type_digits-default mb-10'>#{info.number}</span>
      <h1 className={`text text_type_main-medium mb-3 ${styles['left-align']} ${styles['order-name']}`}>
        {info.name}
      </h1>
      <span className={`text text_type_main-default mb-15 ${styles['left-align']}`}>
        {statusName[info.status]}
      </span>
      <span className={`text text_type_main-medium mb-6 ${styles['left-align']}`}>
        Состав:
      </span>
      <ul className={styles.ingredients}>
        {Object.values(groupedIngredients).map((item, index) => (
          <li key={index} className={styles.ingredient}>
            <div className={styles['ingredient-preview']}>
              <div
                className={styles['image-box']}
                style={{
                  backgroundImage: `url("${item.image_mobile}")`
                }}
              />
              <span className='text text_type_main-default mr-4 ml-4'>{item.name}</span>
            </div>
            <div>
              <span className={`text text_type_digits-default ${styles.price}`}>
                {`${item.count} x ${item.price}`} <CurrencyIcon type='primary'/>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles['bottom-content']}`}>
        <span className='text text_type_main-default text_color_inactive'>{dateFormat(info.updatedAt)}</span>
        <div className={styles['order-price']}>
          <span className='text text_type_digits-default'>{orderPrice}</span>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
    </div>
  )
}

export default OrderConsist;

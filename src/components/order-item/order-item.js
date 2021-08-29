import React, {useMemo} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-item.module.css';
import { orderPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { dateFormat } from '../../utils/formating';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { WS_SET_ORDER } from '../../services/actions/ws-actions';

function OrderItem({ order, onClick }) {
  const { ingredients: ingredientsList } = useSelector((store) => store.burgersConstructor);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();

  const statusName = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }

  const ingredientsInfo = useMemo(() => {
    return order.ingredients.map(orderIngredient => {
      return ingredientsList?.find(ingredient => ingredient._id === orderIngredient)
    })
  }, [order.ingredients, ingredientsList])

  const visibleIngredientsInfo = useMemo(() => {
    return ingredientsInfo.slice(0, 6)
  },[ingredientsInfo])

  const hiddenIngredients = useMemo(() => {
    return order.ingredients.length - visibleIngredientsInfo.length
  }, [order.ingredients, visibleIngredientsInfo])

  const bunsCount = useMemo(() => {
    return ingredientsInfo.filter(item => item?.type === 'bun').length
  }, [ingredientsInfo])

  const orderPrice = useMemo(() => {
    return ingredientsInfo.reduce((acc, item) => {
      if (item?.type !== 'bun')
        return acc += item?.price

      return acc += bunsCount === 1 ? item?.price * 2 : item?.price;
    }, 0)
  }, [ingredientsInfo, bunsCount])

  const orderClickHandler = () => {
    history.push({
      pathname: `${path}/${order.number}`,
      state: {background: location, number: order.number}
    })
    dispatch({ type: WS_SET_ORDER, number: order.number })
    onClick();
  }

  return (
    <div className={styles.block} onClick={orderClickHandler}>
      <div className={styles.top}>
        <span className='text text_type_digits-default'># {order.number}</span>
        <span className='text text_type_main-default text_color_inactive'>{dateFormat(order.updatedAt)}</span>
      </div>
      <span className={`${styles.name} text text_type_main-medium mt-6`}>{order.name}</span>
      <span className='text text_type_main-default mt-2 mb-6'>{statusName[order.status]}</span>
      <div className={styles.bottom}>
        <div className={styles['image-boxes']}>
          {visibleIngredientsInfo.map((item, index) => (
            <div
              key={index}
              className={styles['image-box']}
              style={{
                backgroundImage: `url("${item?.image_mobile}")`
              }}
            >
              {index === visibleIngredientsInfo.length - 1 && hiddenIngredients
                ? <p className={`${styles['hidden-count']} text text_type_main-default`}>+{hiddenIngredients}</p>
                : null
              }
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>{orderPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  info: orderPropTypes
}

export default OrderItem;

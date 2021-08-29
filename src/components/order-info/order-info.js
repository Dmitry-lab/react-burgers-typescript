import React from 'react';
import doneImg from '../../images/done.png';
import orderStyles from './order-info.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderInfo } from '../../services/actions/burgers-constructor';
import { Redirect } from 'react-router-dom';

function OrderInfo({ ingredients }) {
  const { currentOrder, orderRequestFaild } = useSelector(store => store.burgersConstructor)
  const { info } = useSelector(store => store.userInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOrderInfo(ingredients.map(item => item._id)))
  }, [])

  if (!info.email)
    return <Redirect to='/login'/>

  return (
    <div className={orderStyles.order}>
      {currentOrder ?
        <>
          <p className={`${orderStyles.glow} text text_type_digits-large mt-30 mb-8`}>
            {currentOrder.number}
          </p>
          <h2 className='text text_type_main-medium'>идентификатор заказа</h2>
          <img className='mt-15 mb-15' src={doneImg} alt='изображение подтверждения заказа'/>
          <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </> : orderRequestFaild ?
        <p className={`${orderStyles.glow} text text_type_main-medium mt-30 mb-30`}>
          Ошибка =( Попробуйте повторить заказ.
        </p> :
        <p className={`${orderStyles.glow} text text_type_main-medium mt-30 mb-30`}>
          Формируем заказ...
        </p>
      }

    </div>
  )
}

OrderInfo.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default OrderInfo


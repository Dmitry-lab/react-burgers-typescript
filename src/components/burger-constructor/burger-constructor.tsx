import React, { FC, useMemo} from 'react';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../modal/modal';
import OrderInfo from '../order-info/order-info';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ORDER_INFO, CLEAR_PREV_ORDER } from '../../services/actions/burgers-constructor';
import { TIngredient } from '../../services/types/data';
import { RootState } from '../../services/types';


const BurgerConstructor: FC = () => {
  const [isModalOpened, setModalOpened] = React.useState(false);
  const { addedIngredients } = useSelector((store: RootState) => store.burgersConstructor);
  const dispatch = useDispatch();

  const orderSum = useMemo(() => {
    return addedIngredients.reduce((prev: number, item: TIngredient) => {
      return prev + item.price;
    }, 0)
  }, [addedIngredients])

  const bunAdded = useMemo(() => {
    return addedIngredients.some((item: TIngredient) => item?.type === 'bun')
  }, [addedIngredients])

  const handlerCloseModal = () => {
    dispatch({ type: CLEAR_ORDER_INFO });
    setModalOpened(false)
  }

  const handlerOpenModal = () => {
    dispatch({ type: CLEAR_PREV_ORDER })
    setModalOpened(true);
  }

  return (
    <div  className={constructorStyles.content}>
      <ConstructorList />
      <div className={`${constructorStyles['bottom-block']} mt-10 mr-4`}>
        <div className={`${constructorStyles['sum-block']} mr-10`}>
          <span className='text text_type_digits-medium'>{orderSum}</span>
          <CurrencyIcon type='primary'/>
        </div>
        {bunAdded ?
          <Button type="primary" size="large" onClick={handlerOpenModal}>Оформить заказ</Button> : null
        }
        {isModalOpened &&
          <Modal onCloseClick={handlerCloseModal}>
            <OrderInfo ingredients={addedIngredients}/>
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;


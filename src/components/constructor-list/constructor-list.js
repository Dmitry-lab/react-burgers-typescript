import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import MainConstructorItem from '../main-constructor-item/main-constructor-item';
import styles from './constructor-list.module.css';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT_IN_ORDER, REMOVE_INGREDIENT_FROM_ORDER } from '../../services/actions/burgers-constructor';

function ConstructorList() {
  const { addedIngredients } = useSelector(store => store.burgersConstructor);
  const dispatch = useDispatch();
  const [{ isOver, highlighted }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({ type: ADD_INGREDIENT_IN_ORDER, ingredient: item.info })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      highlighted: monitor.canDrop()
    })
  })

  const closeHandler = (index) => {
    dispatch({ type: REMOVE_INGREDIENT_FROM_ORDER, index})
  }

  const bun = React.useMemo(() => {
    return addedIngredients.find(item => item?.type === 'bun')
  }, [addedIngredients])

  const contentStyle = isOver || highlighted
    ? `${styles.content} ${styles.contrast} mt-5`
    : `${styles.content} mt-5`

  return (
    <div ref={dropTarget} className={contentStyle}>
      <div className={`${styles['bun-element']} ml-10 pl-2 mr-4`}>
        {bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + ' (верх)'}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
      </div>
      <div className={styles['main-block']}>
        {addedIngredients.length
          ? addedIngredients.map((item, index) => {
              if (item.type !== 'bun') {
                return (
                  <MainConstructorItem
                    key={index}
                    item={item}
                    onClose={closeHandler}
                    index = {index}
                  />
                )
              }
              return null
            })
          : <>
              <p className={`${styles.info} text text_type_main-default`}>
                Перетащите ингредиенты из списка слева в область конструктора.
              </p>
              <p className={`${styles.info} text text_type_main-default mt-5`}>
                Для продолжения оформления заказа в конструкторе обязательно должен быть выбран тип булки.
              </p>
            </>
        }
      </div>

      <div className={`${styles['bun-element']} ml-10 pl-2 mr-4`}>
        {bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + ' (низ)'}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
      </div>

    </div>
  )
}

export default ConstructorList;

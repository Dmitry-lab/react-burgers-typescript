import React, { FC, useMemo } from 'react';
import ingredientsStyles from './ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../services/types';
import { TIngredient } from '../../services/types/data';

type TIngredientProps = {
  info: TIngredient;
  onOpen: (info: TIngredient) => void
}

const Ingredient: FC<TIngredientProps> = ({ info, onOpen }) => {
  const { addedIngredients } = useSelector((store: RootState) => store.burgersConstructor)
  const [, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: {info},
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  }))
  const location = useLocation();

   const currentCount = useMemo(() => {
    return addedIngredients.filter(item => item._id === info._id).length
  }, [addedIngredients, info._id])

  return (
    <Link
      to={{
        pathname: `/ingredients/${info._id}`,
        state: {background: location}
      }}
      ref={dragRef}
      className={ingredientsStyles.content}
      onClick={() => onOpen(info)}>
        <img className='mb-1' src={info.image} alt={`ингридиент ${info.name}`} />
        <span className={`text text_type_digits-default mb-1 ${ingredientsStyles.price}`}>
          {info.price} <CurrencyIcon type="primary" />
        </span>
        <span className={`${ingredientsStyles.caption} text text_type_main-default`}>{info.name}</span>
        {currentCount ? <Counter count={currentCount} size={'default'}/> : null}
    </Link>
  )
}

export default Ingredient;

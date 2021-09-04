import React, {FC, useRef} from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-constructor-item.module.css';
import {useDrag, useDrop} from 'react-dnd';
import { useDispatch } from 'react-redux';
import { SORT_INGREDIENTS } from '../../services/actions/burgers-constructor';
import { TIngredient } from '../../services/types/data';

type TMainConstructorItemProps = {
  item: TIngredient;
  onClose: (index: number) => void;
  index: number;
}

const MainConstructorItem: FC<TMainConstructorItemProps> = ({ item, onClose, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: 'main',
    item: () => {
      return { index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [{isHovered}, drop] = useDrop({
    accept: 'main',
    collect: monitor => ({
      isHovered: monitor.isOver()
    }),
    hover(item: {index: number}, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!ref.current)
        return;

      if (dragIndex === hoverIndex)
        return;

      dispatch({ type: SORT_INGREDIENTS, dragIndex, hoverIndex})
      item.index = index;
    }
  })

  drag(drop(ref))

  const fullClassName = isHovered
    ? `${styles['main-element']} ${styles.ishovered} pl-4`
    : `${styles['main-element']} pl-4`

  return (
    <div ref={ref} className={fullClassName}>
      <DragIcon type='primary'/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => onClose(index)}
      />
    </div>
  )
}

export default MainConstructorItem;
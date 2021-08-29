import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-constructor-item.module.css';
import PropTypes from 'prop-types';
import {useDrag, useDrop} from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ingredientPropTypes } from '../../utils/prop-types'
import { SORT_INGREDIENTS } from '../../services/actions/burgers-constructor';

function MainConstructorItem({ item, onClose, index }) {
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
    hover(item, monitor) {
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
      <DragIcon />
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

MainConstructorItem.propTypes = {
  item: ingredientPropTypes,
  onClose: PropTypes.func,
  index: PropTypes.number
}

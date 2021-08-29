import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './orders-number-list.module.css';
import { orderPropTypes } from '../../utils/prop-types';

function OrdersNumberList({ list, name }) {
  const NUMBER_IN_COLUMN = 10;

  const columns = useMemo(() => {
    const result = [];
    let  startIndex = 0;
    while (startIndex < list.length) {
      result.push(list.slice(startIndex, startIndex + NUMBER_IN_COLUMN))
      startIndex += NUMBER_IN_COLUMN;
    }
    return result
  }, [list])

  return (
    <div className={styles.content}>
      <span className='text text_type_main-medium mb-6'>{name}</span>
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <ul key={index} className={styles.numbers}>
            {column.map(order => (
              <li key={order.number} className='mb-2 text text_type_digits-default'>
                {order.number}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

OrdersNumberList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired
}

export default OrdersNumberList;

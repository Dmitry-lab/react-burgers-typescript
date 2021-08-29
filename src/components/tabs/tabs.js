import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_SCROLL_TARGET } from '../../services/actions/burgers-constructor';

function Tabs() {
  const { currentTab } = useSelector((store) => store.burgersConstructor)

  const dispatch = useDispatch();

  const onClickHandler = (value) => {
    dispatch({ type: CHANGE_SCROLL_TARGET, target: value})
  }

  return (
    <div style={{ display: 'flex' }} className='mt-5 mb-10'>
      <Tab value="buns" active={currentTab === 'buns'} onClick={onClickHandler}>
        Булки
      </Tab>
      <Tab value="sauces" active={currentTab === 'sauces'} onClick={onClickHandler}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClick={onClickHandler}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;

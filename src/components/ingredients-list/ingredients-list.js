import React, { useState, useEffect, useRef } from 'react';
import Modal from '../modal/modal';
import Ingredient from '../ingredient/ingredient';
import listSyles from './ingredients-list.module.css';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  CHANGE_INGREDIENTS_GROUP,
  GET_TO_SCROLL_TARGET,
  SHOW_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO
 } from '../../services/actions/burgers-constructor';

function IngredientsList() {
  const [isModalOpened, setModalOpened] = useState(false);
  const { ingredients, currentTab, scrollTarget } = useSelector((store) => store.burgersConstructor)
  const dispatch = useDispatch();

  const listsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const specificList = (ingredients, type) => {
    return ingredients.filter(item => item.type === type)
  }

  let stopScrollCalc = false;

  const switchTabCheck = () => {
    const listPosition = listsRef.current.getBoundingClientRect().top;

    const delta1 = Math.trunc(Math.abs(listPosition - bunsRef.current.getBoundingClientRect().top));
    const delta2 = Math.trunc(Math.abs(listPosition - saucesRef.current.getBoundingClientRect().top));
    const delta3 = Math.trunc(Math.abs(listPosition - mainRef.current.getBoundingClientRect().top));
    const minDelta = Math.min(delta1, delta2, delta3);
    const newTab = delta1 === minDelta
      ? 'buns'
      : delta2 === minDelta
      ? 'sauces'
      : 'main'

    if (scrollTarget) {
      scrollTarget === newTab && dispatch({ type: GET_TO_SCROLL_TARGET, target: '', newTab});
    }
    else
      currentTab === newTab || dispatch({ type: CHANGE_INGREDIENTS_GROUP,  newTab})
  }

  const scrollHandler = () => {
    if (!stopScrollCalc) {
      switchTabCheck();
      stopScrollCalc = true;
      setTimeout(() => {
        switchTabCheck()
        stopScrollCalc = false;
      }, 50)
    }
  }

  const handlerCloseModal = () => {
    setModalOpened(false);
    dispatch({ type: HIDE_INGREDIENT_INFO })
  }

  const handlerOpenModal = (info) => {
    setModalOpened(true);
    dispatch({ type: SHOW_INGREDIENT_INFO, info})
  }

  useEffect(() => {
    if (!scrollTarget)
      return

    const scrollDelta = scrollTarget === 'buns'
      ? bunsRef.current.getBoundingClientRect().top - listsRef.current.getBoundingClientRect().top
      : scrollTarget === 'sauces'
      ? saucesRef.current.getBoundingClientRect().top - listsRef.current.getBoundingClientRect().top
      : mainRef.current.getBoundingClientRect().top - listsRef.current.getBoundingClientRect().top

    listsRef.current.scrollTo({ top: listsRef.current.scrollTop + scrollDelta, behavior: 'smooth' })
  }, [scrollTarget])

  return (
    <div ref={listsRef} className={listSyles.types} onScroll={scrollHandler}>
      <section className='mb-10'>
        <h2 ref={bunsRef} className='text text_type_main-medium mb-6'>Булки</h2>
        <div className={`${listSyles.list}`}>
          {specificList(ingredients, 'bun').map(item => (
            <Ingredient info={item} onOpen={handlerOpenModal} key={item._id}/>
          ))}
        </div>
      </section>
      <section className="mb-10">
        <h2 ref={saucesRef} className='text text_type_main-medium mb-6'>Соусы</h2>
        <div className={`${listSyles.list}`}>
          {specificList(ingredients, 'sauce').map(item => (
            <Ingredient info={item} onOpen={handlerOpenModal} key={item._id}/>
          ))}
        </div>
      </section>
      <section>
        <h2 ref={mainRef} className='text text_type_main-medium mb-6'>Основные ингридиенты</h2>
        <div className={`${listSyles.list}`}>
          {specificList(ingredients, 'main').map(item => (
            <Ingredient info={item} onOpen={handlerOpenModal} key={item._id}/>
          ))}
        </div>
      </section>
      {isModalOpened &&
        <Modal onCloseClick={handlerCloseModal} header='Детали ингридиента'>
          <IngredientDetails />
        </Modal>
      }
    </div>
  )
}

export default IngredientsList;

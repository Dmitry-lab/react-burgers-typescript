import Main from '../../components/main/main';
import React from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { RootState } from '../../services/types';

function HomePage() {
  const { ingredients } = useSelector((store: RootState) => store.burgersConstructor);

  return (
    ingredients.length
      ? <Main name='Соберите бургер'>
          <BurgerIngredients />
          <BurgerConstructor />
        </Main>
      : null
  )
}

export default HomePage;

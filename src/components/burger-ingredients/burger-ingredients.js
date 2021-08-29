import React from 'react';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredients-list/ingredients-list';
import ingredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients() {

  return (
    <div className={`${ingredientsStyles.content} mr-10`}>
      <Tabs />
      <IngredientsList />
    </div>
  )
}

export default BurgerIngredients;


